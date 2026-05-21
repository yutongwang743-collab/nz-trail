"""AI 结构化提取管线：用 Claude API 从帖子内容中提取路线结构化信息。"""

import json
import os
import time
from dataclasses import dataclass, asdict
from typing import Optional

from anthropic import Anthropic


SYSTEM_PROMPT = """你是一个新西兰旅行路线分析助手。你的任务是从社交媒体帖子内容中提取结构化的旅行信息。

请从帖子中提取以下字段，以 JSON 格式返回：

{
  "locations": ["地点1", "地点2"],
  "activities": ["活动1", "活动2"],
  "duration": "string",
  "budget": "string",
  "season": "string",
  "transport": "string",
  "key_tips": ["提示1", "提示2"],
  "route_type": ["标签1", "标签2"]
}

如果某个字段无法从帖子中提取，使用 "unknown" 或空数组。只返回 JSON，不要有其他内容。"""


@dataclass
class ProcessedPost:
    source_platform: str
    source_url: str
    author_name: str
    title: str
    raw_content: str
    ai_summary: dict
    likes: int
    saves: int
    comments: int
    source_published_at: str


def process_single_post(client: Anthropic, post) -> Optional[dict]:
    try:
        message = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=1024,
            temperature=0,
            system=SYSTEM_PROMPT,
            messages=[{
                "role": "user",
                "content": f"帖子标题: {post.title}\n\n帖子内容:\n{post.raw_content[:3000]}"
            }]
        )
        text = message.content[0].text
        text = text.strip()
        if text.startswith("```"):
            text = text.split("\n", 1)[1]
            if text.endswith("```"):
                text = text[:-3]
        return json.loads(text)
    except Exception as e:
        print(f"  AI 处理失败: {e}")
        return None


def process_posts(posts: list, batch_size: int = 5, delay: float = 1.0) -> list[ProcessedPost]:
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("警告: ANTHROPIC_API_KEY 未设置，跳过 AI 处理")
        return []

    client = Anthropic(api_key=api_key)
    results: list[ProcessedPost] = []

    for i, post in enumerate(posts):
        print(f"  处理 [{i+1}/{len(posts)}]: {post.title[:50]}...")
        ai_summary = process_single_post(client, post)
        if ai_summary is None:
            ai_summary = {
                "locations": [], "activities": [], "duration": "unknown",
                "budget": "unknown", "season": "unknown", "transport": "unknown",
                "key_tips": [], "route_type": []
            }
        processed = ProcessedPost(
            source_platform=post.source_platform,
            source_url=post.source_url,
            author_name=post.author_name,
            title=post.title,
            raw_content=post.raw_content,
            ai_summary=ai_summary,
            likes=post.likes,
            saves=post.saves,
            comments=post.comments,
            source_published_at=post.source_published_at,
        )
        results.append(processed)
        time.sleep(delay)
    return results


def save_to_db_format(posts: list[ProcessedPost], output_path: str = "db_import.json"):
    data = []
    for p in posts:
        data.append({
            "sourcePlatform": p.source_platform,
            "sourceUrl": p.source_url,
            "authorName": p.author_name,
            "title": p.title,
            "rawContent": p.raw_content,
            "aiSummary": json.dumps(p.ai_summary, ensure_ascii=False),
            "screenshots": "[]",
            "likes": p.likes,
            "saves": p.saves,
            "comments": p.comments,
            "sourcePublishedAt": p.source_published_at or "2024-01-01",
        })
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"保存 {len(data)} 条处理结果到 {output_path}")
    return output_path
