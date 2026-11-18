"""爬虫入口：依次运行各平台爬虫，合并结果，调用 AI 管线处理。

用法: python main.py [国家]   # 默认新西兰，可选「澳大利亚」
"""

import asyncio
import sys

from xiaohongshu import search_xiaohongshu, save_posts, ScrapedPost, KEYWORDS
from ai_pipeline import process_posts, save_to_db_format
from keywords import resolve_keywords


async def main(country: str = "新西兰"):
    print("=" * 60)
    print(f"Travel Crawler — {country}旅行内容抓取")
    print("=" * 60)

    all_posts: list[ScrapedPost] = []
    xhs_keywords = resolve_keywords(country, "xiaohongshu", KEYWORDS)

    print("\n[1/1] 小红书搜索...")
    xhs_posts = await search_xiaohongshu(keywords=xhs_keywords)
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
    country = sys.argv[1] if len(sys.argv) > 1 else "新西兰"
    asyncio.run(main(country))
