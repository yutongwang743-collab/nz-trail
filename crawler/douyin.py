"""抖音旅行视频抓取器 — 支持登录态保存。

用法:
  python douyin.py login          # 打开浏览器手动登录抖音，保存 cookie
  python douyin.py scrape [国家]   # 使用已保存的登录态自动抓取
"""

import asyncio
import json
import os
import random
import sys
from dataclasses import dataclass, asdict
from typing import Optional

from playwright.async_api import async_playwright, Page

from keywords import resolve_keywords

AUTH_FILE = os.path.join(os.path.dirname(__file__), "douyin_auth.json")

KEYWORDS = [
    "塔斯马尼亚旅游", "塔斯马尼亚攻略", "霍巴特", "悉尼旅行", "墨尔本旅行",
    "大堡礁", "黄金海岸", "澳洲旅行", "新西兰旅行", "皇后镇",
]


@dataclass
class ScrapedPost:
    source_platform: str = "抖音"
    source_url: str = ""
    author_name: str = ""
    title: str = ""
    raw_content: str = ""
    likes: int = 0
    saves: int = 0
    comments: int = 0
    source_published_at: str = ""


def _parse_count(text: str) -> int:
    text = (text or "").strip()
    if not text:
        return 0
    try:
        if "万" in text:
            return int(float(text.replace("万", "")) * 10000)
        if "w" in text.lower():
            return int(float(text.lower().replace("w", "")) * 10000)
        return int(text)
    except (ValueError, TypeError):
        return 0


async def login_and_save():
    print("=" * 50)
    print("打开浏览器窗口，请手动登录抖音")
    print("登录成功后按 Enter 继续...")
    print("=" * 50)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False, args=["--no-sandbox"])
        context = await browser.new_context(
            viewport={"width": 1280, "height": 900},
            locale="zh-CN",
        )
        page = await context.new_page()
        await page.goto("https://www.douyin.com", wait_until="commit", timeout=60000)
        print("\n请在浏览器中完成登录（约 3 分钟内）...")
        print("登录完成后会自动保存 cookie，无需操作终端")

        await asyncio.sleep(180)
        await asyncio.sleep(1)

        await context.storage_state(path=AUTH_FILE)
        print(f"登录状态已保存到 {AUTH_FILE}")

        await browser.close()


async def _scroll_page(page: Page, times: int = 5):
    for _ in range(times):
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await asyncio.sleep(random.uniform(1.0, 2.0))


async def _parse_search_cards(page: Page, max_cards: int = 20) -> list[dict]:
    cards = []
    try:
        await page.wait_for_timeout(2500)
        # 抖音视频卡片链接（选择器可能随版本变化，抓不到就返回空）
        links = await page.query_selector_all("a[href*='/video/']")
        for link in links[:max_cards]:
            try:
                href = await link.get_attribute("href") or ""
                if "/video/" not in href:
                    continue
                full_url = f"https://www.douyin.com{href}" if href.startswith("/") else href
                title = ""
                title_el = await link.query_selector("[class*='title'], p, span")
                if title_el:
                    title = await title_el.inner_text()
                cards.append({"title": title.strip(), "source_url": full_url})
            except Exception:
                continue
    except Exception:
        pass
    return cards


async def _scrape_note_detail(page: Page, url: str) -> Optional[dict]:
    try:
        await page.goto(url, wait_until="commit", timeout=60000)
        await asyncio.sleep(2.5)

        title = ""
        for sel in ["h1", "[class*='title']", "[data-e2e='video-desc']", "p"]:
            el = await page.query_selector(sel)
            if el:
                title = await el.inner_text()
                if title.strip():
                    break

        author = ""
        for sel in ["[class*='author']", "[data-e2e='video-author-name']", "[class*='name']"]:
            el = await page.query_selector(sel)
            if el:
                author = await el.inner_text()
                break

        likes = 0
        for sel in ["[data-e2e='like-count']", "[class*='like'] span", "[class*='count']"]:
            el = await page.query_selector(sel)
            if el:
                likes = _parse_count(await el.inner_text())
                break

        return {
            "title": title.strip(),
            "raw_content": title.strip(),
            "author_name": author.strip(),
            "likes": likes,
            "saves": 0,
            "comments": 0,
            "source_published_at": "",
        }
    except Exception:
        return None


async def scrape_douyin(keywords: list[str] | None = None, max_per_keyword: int = 15) -> list[ScrapedPost]:
    if not os.path.exists(AUTH_FILE):
        print(f"未找到登录状态文件 {AUTH_FILE}")
        print("请先运行: python douyin.py login")
        return []

    if keywords is None:
        keywords = KEYWORDS

    all_posts: list[ScrapedPost] = []
    seen_urls: set[str] = set()

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True, args=["--no-sandbox", "--disable-setuid-sandbox"])
        context = await browser.new_context(
            viewport={"width": 390, "height": 844},
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
            locale="zh-CN",
            storage_state=AUTH_FILE,
        )
        page = await context.new_page()

        total = len(keywords)
        for idx, keyword in enumerate(keywords):
            if len(all_posts) >= 100:
                print(f"\n已收集 {len(all_posts)} 条，达到目标！")
                break

            try:
                search_url = f"https://www.douyin.com/search/{keyword}"
                print(f"\n[{idx+1}/{total}] 搜索: {keyword}", flush=True)
                await page.goto(search_url, wait_until="commit", timeout=60000)
                await _scroll_page(page, times=4)
                cards = await _parse_search_cards(page, max_cards=max_per_keyword)
                print(f"  找到 {len(cards)} 个视频卡片", flush=True)

                for card in cards:
                    if card["source_url"] in seen_urls:
                        continue
                    seen_urls.add(card["source_url"])

                    detail = await _scrape_note_detail(page, card["source_url"])
                    if detail and detail.get("title"):
                        post = ScrapedPost(
                            source_platform="抖音",
                            source_url=card["source_url"],
                            author_name=detail.get("author_name", ""),
                            title=detail.get("title", card["title"]),
                            raw_content=detail["raw_content"][:3000],
                            likes=detail.get("likes", 0),
                            saves=detail.get("saves", 0),
                            comments=detail.get("comments", 0),
                            source_published_at=detail.get("source_published_at", ""),
                        )
                        all_posts.append(post)
                        print(f"    [{len(all_posts)}] {post.title[:50]} likes={post.likes}", flush=True)

                    await asyncio.sleep(random.uniform(0.5, 1.2))

            except Exception as e:
                print(f"  x '{keyword}' 失败: {e}", flush=True)

        await browser.close()

    all_posts.sort(key=lambda p: p.likes, reverse=True)
    return all_posts


def save_posts(posts: list[ScrapedPost], output_path: str = "douyin_posts.json"):
    data = [asdict(p) for p in posts]
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"\n抖音: 保存 {len(posts)} 条到 {output_path}")
    return output_path


async def asyncio_run_scrape(country: str = "新西兰"):
    keywords = resolve_keywords(country, "douyin", KEYWORDS)
    print("=" * 50)
    print(f"[抖音] {country}旅行抓取")
    print(f"      关键词: {len(keywords)} 个")
    print("=" * 50)
    posts = await scrape_douyin(keywords=keywords)
    if posts:
        save_posts(posts)
    else:
        print("未抓取到任何帖子，请先运行 login 登录")


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "scrape"
    country = sys.argv[2] if len(sys.argv) > 2 else "新西兰"

    if cmd == "login":
        asyncio.run(login_and_save())
    elif cmd == "scrape":
        asyncio.run(asyncio_run_scrape(country))
    else:
        print("用法: python douyin.py [login|scrape] [国家]")
