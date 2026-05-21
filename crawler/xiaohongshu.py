"""小红书旅行帖子抓取器。使用 Playwright 模拟浏览器搜索并采集帖子内容。"""

import asyncio
import json
import os
import time
from dataclasses import dataclass, asdict
from typing import Optional

from playwright.async_api import async_playwright, Page

KEYWORDS = [
    "新西兰自驾", "新西兰南岛环线", "新西兰7天", "新西兰10天",
    "皇后镇攻略", "Tekapo", "Milford Sound", "霍比屯", "Wanaka",
    "新西兰跳伞", "新西兰徒步", "新西兰滑雪", "新西兰冰川",
    "新西兰穷游", "新西兰花销", "新西兰省钱攻略",
    "新西兰学生签旅游", "澳洲去新西兰", "留学生新西兰",
]


@dataclass
class ScrapedPost:
    source_platform: str = "小红书"
    source_url: str = ""
    author_name: str = ""
    author_avatar: str = ""
    title: str = ""
    raw_content: str = ""
    screenshots: list[str] = None
    likes: int = 0
    saves: int = 0
    comments: int = 0
    source_published_at: str = ""

    def __post_init__(self):
        if self.screenshots is None:
            self.screenshots = []


def _build_search_url(keyword: str) -> str:
    encoded = keyword.replace(" ", "%20")
    return f"https://www.xiaohongshu.com/search_result?keyword={encoded}&type=51"


async def _scroll_page(page: Page, times: int = 3):
    for _ in range(times):
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await asyncio.sleep(1.5)


async def _parse_post_cards(page: Page) -> list[dict]:
    posts = []
    try:
        await page.wait_for_selector("section.note-item, .feeds-page .note-item", timeout=10000)
        cards = await page.query_selector_all("section.note-item, .feeds-page .note-item")
        for card in cards[:20]:
            try:
                title_el = await card.query_selector(".title, .note-title")
                title = await title_el.inner_text() if title_el else ""
                author_el = await card.query_selector(".author .name, .nickname")
                author = await author_el.inner_text() if author_el else ""
                link_el = await card.query_selector("a")
                href = await link_el.get_attribute("href") if link_el else ""
                url = f"https://www.xiaohongshu.com{href}" if href and href.startswith("/") else href
                likes = 0
                likes_el = await card.query_selector(".like, .count")
                if likes_el:
                    likes_text = await likes_el.inner_text()
                    likes = _parse_count(likes_text)
                if title and url:
                    posts.append({
                        "title": title.strip(),
                        "author_name": author.strip(),
                        "source_url": url,
                        "source_platform": "小红书",
                    })
            except Exception:
                continue
    except Exception:
        pass
    return posts


def _parse_count(text: str) -> int:
    text = text.strip()
    if not text:
        return 0
    try:
        if "万" in text:
            return int(float(text.replace("万", "")) * 10000)
        return int(text)
    except (ValueError, TypeError):
        return 0


async def _scrape_post_detail(page: Page, url: str) -> Optional[dict]:
    try:
        await page.goto(url, wait_until="domcontentloaded", timeout=15000)
        await asyncio.sleep(2)
        content = ""
        content_el = await page.query_selector(".note-content, .desc, .note-text")
        if content_el:
            content = await content_el.inner_text()
        published_at = ""
        date_el = await page.query_selector(".date, .bottom-date")
        if date_el:
            published_at = await date_el.inner_text()
        likes_el = await page.query_selector(".like-wrapper .count, .like-count")
        saves_el = await page.query_selector(".collect-wrapper .count, .collect-count")
        comments_el = await page.query_selector(".chat-wrapper .count, .comment-count")
        likes = _parse_count(await likes_el.inner_text()) if likes_el else 0
        saves = _parse_count(await saves_el.inner_text()) if saves_el else 0
        comments = _parse_count(await comments_el.inner_text()) if comments_el else 0
        return {
            "raw_content": content.strip(),
            "likes": likes,
            "saves": saves,
            "comments": comments,
            "source_published_at": published_at.strip(),
        }
    except Exception:
        return None


async def search_xiaohongshu(keywords: list[str] | None = None, max_per_keyword: int = 10) -> list[ScrapedPost]:
    if keywords is None:
        keywords = KEYWORDS
    all_posts: list[ScrapedPost] = []
    seen_urls: set[str] = set()

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": 390, "height": 844},
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
            locale="zh-CN",
        )
        page = await context.new_page()

        for keyword in keywords:
            try:
                search_url = _build_search_url(keyword)
                await page.goto(search_url, wait_until="domcontentloaded", timeout=20000)
                await asyncio.sleep(2)
                await _scroll_page(page, times=3)
                cards = await _parse_post_cards(page)
                print(f"  关键词 '{keyword}': 找到 {len(cards)} 个帖子")

                for card in cards:
                    if card["source_url"] in seen_urls:
                        continue
                    seen_urls.add(card["source_url"])
                    detail = await _scrape_post_detail(page, card["source_url"])
                    if detail:
                        post = ScrapedPost(
                            source_platform=card.get("source_platform", "小红书"),
                            source_url=card["source_url"],
                            author_name=card["author_name"],
                            title=card["title"],
                            raw_content=detail["raw_content"],
                            likes=detail["likes"],
                            saves=detail["saves"],
                            comments=detail["comments"],
                            source_published_at=detail["source_published_at"],
                        )
                        all_posts.append(post)
                        print(f"    ✓ {post.title[:40]}")
                    await asyncio.sleep(0.5)
            except Exception as e:
                print(f"  ✗ 关键词 '{keyword}' 失败: {e}")
                continue

        await browser.close()
    return all_posts


def save_posts(posts: list[ScrapedPost], output_path: str = "crawled_posts.json"):
    data = [asdict(p) for p in posts]
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"\n保存 {len(posts)} 个帖子到 {output_path}")
    return output_path


async def main():
    print("开始抓取小红书新西兰旅行帖子...\n")
    posts = await search_xiaohongshu()
    print(f"\n共抓取 {len(posts)} 个帖子")
    save_posts(posts)


if __name__ == "__main__":
    asyncio.run(main())
