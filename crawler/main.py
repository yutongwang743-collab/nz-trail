"""爬虫入口：依次运行各平台爬虫，合并结果，调用 AI 管线处理。"""

import asyncio
import json
import sys
from pathlib import Path

from xiaohongshu import search_xiaohongshu, save_posts, ScrapedPost
from ai_pipeline import process_posts, save_to_db_format


async def main():
    print("=" * 60)
    print("NZ Travel Crawler — 新西兰旅行内容抓取")
    print("=" * 60)

    all_posts: list[ScrapedPost] = []

    print("\n[1/1] 小红书搜索...")
    xhs_posts = await search_xiaohongshu()
    all_posts.extend(xhs_posts)
    print(f"  小红书: {len(xhs_posts)} 条")

    print(f"\n总计抓取: {len(all_posts)} 条帖子")

    raw_path = "crawled_posts.json"
    save_posts(all_posts, raw_path)

    print("\n[AI Pipeline] 开始处理...")
    db_data = process_posts(all_posts)
    save_to_db_format(db_data, "db_import.json")
    print("AI 处理完成，数据保存至 db_import.json")

    print("\nDone.")


if __name__ == "__main__":
    asyncio.run(main())
