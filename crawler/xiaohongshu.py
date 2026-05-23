"""小红书旅行帖子抓取器 v2 — 支持登录态保存。

用法:
  python xiaohongshu.py login    # 打开浏览器手动登录，保存 cookie
  python xiaohongshu.py scrape   # 使用已保存的登录态自动抓取
"""

import asyncio
import json
import os
import random
import sys
from dataclasses import dataclass, asdict
from typing import Optional

from playwright.async_api import async_playwright, Page

AUTH_FILE = os.path.join(os.path.dirname(__file__), "xhs_auth.json")

# === 关键词（6大类，65个）===
KEYWORDS = [
    # --- 高赞景区 / 景点 ---
    "皇后镇攻略", "米尔福德峡湾", "特卡波湖", "瓦纳卡湖", "库克山徒步",
    "霍比屯", "罗托鲁瓦地热", "陶波湖", "福克斯冰川", "弗朗兹约瑟夫冰川",
    "格林诺奇", "峡湾国家公园", "汤加里罗国家公园", "阿贝尔塔斯曼",
    "凯库拉观鲸", "岛屿湾", "怀托摩萤火虫洞", "好牧羊人教堂",
    "箭镇秋天", "普卡基湖", "达尼丁旅游", "基督城景点",
    "新西兰南岛必去", "新西兰北岛景点",
    # --- 打卡地 / 网红拍照 ---
    "新西兰网红打卡", "新西兰拍照圣地", "新西兰最美公路",
    "皇后镇观景台", "瓦纳卡孤独的树", "新西兰极光",
    "新西兰星空保护", "新西兰最美海滩", "新西兰隐藏景点",
    # --- 餐厅 / 特色美食 ---
    "新西兰美食推荐", "皇后镇餐厅", "奥克兰美食",
    "新西兰海鲜", "新西兰牛排", "新西兰葡萄酒庄园",
    "新西兰咖啡店", "新西兰中餐", "新西兰必吃",
    "新西兰甜品", "新西兰早午餐",
    # --- 人文活动 ---
    "毛利文化体验", "新西兰集市", "新西兰节日",
    "新西兰博物馆", "新西兰艺术",
    # --- 户外活动 ---
    "新西兰跳伞", "新西兰徒步路线", "新西兰滑雪",
    "新西兰冰川徒步", "新西兰蹦极", "新西兰划船",
    "新西兰骑行", "新西兰温泉", "新西兰高尔夫", "新西兰骑马",
    # --- 自驾 / 行程攻略 ---
    "新西兰自驾", "新西兰南岛环线", "新西兰7天",
    "新西兰10天", "新西兰花销", "新西兰省钱攻略",
]


@dataclass
class ScrapedPost:
    source_platform: str = "小红书"
    source_url: str = ""
    author_name: str = ""
    title: str = ""
    raw_content: str = ""
    likes: int = 0
    saves: int = 0
    comments: int = 0
    source_published_at: str = ""


def _parse_count(text: str) -> int:
    text = text.strip()
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
    """打开浏览器让用户手动登录小红书，保存登录状态"""
    print("=" * 50)
    print("打开浏览器窗口，请手动登录小红书")
    print("登录成功后按 Enter 继续...")
    print("=" * 50)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False, args=["--no-sandbox"])
        context = await browser.new_context(
            viewport={"width": 1280, "height": 900},
            locale="zh-CN",
        )
        page = await context.new_page()
        await page.goto("https://www.xiaohongshu.com", wait_until="domcontentloaded")
        print("\n请在浏览器中完成登录...")
        print("登录后回到终端按 Enter")

        input()
        await asyncio.sleep(1)

        # 保存登录状态
        await context.storage_state(path=AUTH_FILE)
        print(f"登录状态已保存到 {AUTH_FILE}")

        await browser.close()


async def _scroll_page(page: Page, times: int = 5):
    for _ in range(times):
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await asyncio.sleep(random.uniform(1.0, 2.0))


async def _parse_search_cards(page: Page, max_cards: int = 20) -> list[dict]:
    """解析搜索结果页面的帖子卡片"""
    cards = []
    try:
        # 小红书搜索页面的帖子链接格式是 /explore/{note_id}
        await page.wait_for_timeout(2000)
        note_links = await page.query_selector_all("a[href*='/explore/'], a[href*='/discovery/item/']")
        for link in note_links[:max_cards]:
            try:
                href = await link.get_attribute("href") or ""
                if "/explore/" not in href and "/discovery/item/" not in href:
                    continue
                full_url = f"https://www.xiaohongshu.com{href}" if href.startswith("/") else href
                # 尝试获取标题(可能在父元素中)
                title = ""
                title_parent = await link.query_selector(".title, span.title, .note-title")
                if not title_parent:
                    title_parent = await link.evaluate("""
                        el => el.closest('[class*="note"]')?.querySelector('[class*="title"]')
                    """)
                if title_parent:
                    title = await title_parent.inner_text() if hasattr(title_parent, 'inner_text') else ""
                if not title:
                    title = await link.inner_text()

                cards.append({
                    "title": title.strip(),
                    "source_url": full_url,
                    "source_platform": "小红书",
                })
            except Exception:
                continue
    except Exception:
        pass
    return cards


async def _scrape_note_detail(page: Page, url: str) -> Optional[dict]:
    """抓取帖子详情"""
    try:
        await page.goto(url, wait_until="domcontentloaded", timeout=15000)
        await asyncio.sleep(2.5)

        # 标题
        title = ""
        for sel in ["#detail-title", ".title", ".note-title", "h1", ".interaction-title"]:
            el = await page.query_selector(sel)
            if el:
                title = await el.inner_text()
                if title.strip():
                    break

        # 正文
        content = ""
        for sel in ["#detail-desc", ".note-scroller .desc", ".note-text", "[class*='desc']", "[class*='content']"]:
            el = await page.query_selector(sel)
            if el:
                content = await el.inner_text()
                if len(content) > 30:
                    break

        if not content:
            # 尝试获取所有文本段落
            paras = await page.query_selector_all("span")
            text_parts = []
            for p in paras[:100]:
                t = await p.inner_text()
                if len(t) > 10:
                    text_parts.append(t)
            content = "\n".join(text_parts[:30])

        # 作者
        author = ""
        for sel in [".username", ".author-name", ".name", "[class*='nickname']"]:
            el = await page.query_selector(sel)
            if el:
                author = await el.inner_text()
                break

        # 互动数据
        likes = saves = comments = 0
        for sel in [".like-wrapper .count", ".like-count", "[class*='like'] span"]:
            el = await page.query_selector(sel)
            if el:
                likes = _parse_count(await el.inner_text())
                break

        # 发布时间
        date = ""
        for sel in [".date", ".bottom-date", ".publish-date", ".time"]:
            el = await page.query_selector(sel)
            if el:
                date = await el.inner_text()
                break

        return {
            "title": title.strip(),
            "raw_content": content.strip(),
            "author_name": author.strip(),
            "likes": likes,
            "saves": saves,
            "comments": comments,
            "source_published_at": date.strip(),
        }
    except Exception:
        return None


async def scrape_xiaohongshu(
    keywords: list[str] | None = None,
    max_per_keyword: int = 15
) -> list[ScrapedPost]:
    if not os.path.exists(AUTH_FILE):
        print(f"未找到登录状态文件 {AUTH_FILE}")
        print("请先运行: python xiaohongshu.py login")
        return []

    if keywords is None:
        keywords = KEYWORDS

    all_posts: list[ScrapedPost] = []
    seen_urls: set[str] = set()

    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            args=["--no-sandbox", "--disable-setuid-sandbox"]
        )
        # 加载已保存的登录状态
        context = await browser.new_context(
            viewport={"width": 390, "height": 844},
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
            locale="zh-CN",
            storage_state=AUTH_FILE,
        )
        page = await context.new_page()

        total = len(keywords)
        for idx, keyword in enumerate(keywords):
            if len(all_posts) >= 200:
                print(f"\n已收集 {len(all_posts)} 条，达到目标！")
                break

            try:
                encoded = keyword.replace(" ", "%20")
                search_url = f"https://www.xiaohongshu.com/search_result?keyword={encoded}&type=51"
                print(f"\n[{idx+1}/{total}] 搜索: {keyword}", flush=True)

                await page.goto(search_url, wait_until="domcontentloaded", timeout=20000)
                await _scroll_page(page, times=4)
                cards = await _parse_search_cards(page, max_cards=15)
                print(f"  找到 {len(cards)} 个卡片", flush=True)

                for card in cards:
                    if card["source_url"] in seen_urls:
                        continue
                    seen_urls.add(card["source_url"])

                    detail = await _scrape_note_detail(page, card["source_url"])
                    if detail and len(detail.get("raw_content", "")) > 20:
                        post = ScrapedPost(
                            source_platform="小红书",
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

                    # 延迟避免触发反爬
                    await asyncio.sleep(random.uniform(0.5, 1.2))

            except Exception as e:
                print(f"  x '{keyword}' 失败: {e}", flush=True)

        await browser.close()

    # 按点赞数排序
    all_posts.sort(key=lambda p: p.likes, reverse=True)
    return all_posts


def save_posts(posts: list[ScrapedPost], output_path: str = "xhs_posts.json"):
    data = []
    for p in posts:
        d = asdict(p)
        data.append(d)

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    high = sum(1 for p in posts if p.likes >= 100)
    print(f"\n{'='*50}")
    print(f"小红书: 保存 {len(posts)} 条到 {output_path}")
    print(f"  高赞(>=100): {high} 条")
    return output_path


async def asyncio_run_scrape():
    print("=" * 50)
    print("[XHS] 小红书新西兰旅行抓取")
    print(f"      关键词: {len(KEYWORDS)} 个")
    print("=" * 50)
    posts = await scrape_xiaohongshu()
    if posts:
        save_posts(posts)
    else:
        print("未抓取到任何帖子，请先运行 login 登录")


# ============================================================
# 主入口
# ============================================================
if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "scrape"

    if cmd == "login":
        asyncio.run(login_and_save())
    elif cmd == "scrape":
        asyncio.run(asyncio_run_scrape())
    else:
        print("用法: python xiaohongshu.py [login|scrape]")
