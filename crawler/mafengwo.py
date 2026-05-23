"""马蜂窝爬虫：搜索新西兰旅行攻略、游记、景点、美食"""
import asyncio
import json
import random
import time
from dataclasses import dataclass, asdict
from playwright.async_api import async_playwright, Page

MAFENGWO_KEYWORDS = [
    # 景区/景点
    "新西兰南岛景点", "皇后镇攻略", "米尔福德峡湾攻略", "特卡波湖攻略",
    "瓦纳卡攻略", "库克山攻略", "霍比屯攻略", "罗托鲁瓦攻略",
    "新西兰必去景点", "新西兰国家公园",
    # 美食/餐厅
    "新西兰美食推荐", "皇后镇美食", "新西兰海鲜推荐",
    "新西兰必吃", "奥克兰美食攻略",
    # 打卡/拍照
    "新西兰网红打卡", "新西兰拍照圣地", "新西兰最美公路",
    # 户外活动
    "新西兰跳伞攻略", "新西兰徒步路线", "新西兰冰川攻略",
    "新西兰滑雪攻略", "新西兰户外活动",
    # 人文文化
    "新西兰毛利文化", "新西兰小镇推荐",
    # 行程攻略
    "新西兰自驾攻略", "新西兰南岛环线", "新西兰7天行程",
    "新西兰10天行程", "新西兰省钱攻略",
    # 住宿
    "新西兰特色住宿", "新西兰民宿推荐",
]


@dataclass
class TravelPost:
    source_platform: str = "马蜂窝"
    source_url: str = ""
    author_name: str = ""
    title: str = ""
    raw_content: str = ""
    category: str = ""
    likes: int = 0
    views: int = 0
    comments: int = 0
    source_published_at: str = ""


async def parse_search_results(page: Page, max_items: int = 15) -> list[dict]:
    """解析马蜂窝搜索结果页面"""
    items = []
    try:
        await page.wait_for_timeout(2000)
        await page.wait_for_selector("._j_search_item, .search-list>div, li.search-list-item", timeout=10000)
    except Exception:
        pass

    # 尝试多种选择器匹配搜索结果的标题链接
    selectors = [
        "._j_search_item a[href*='/i/']",
        ".search-list>div a[href*='/i/']",
        "a[href*='mafengwo.cn/i/']",
    ]

    for sel in selectors:
        links = await page.query_selector_all(sel)
        for link in links[:max_items]:
            try:
                href = await link.get_attribute("href")
                title = await link.inner_text()
                if href and title and title.strip():
                    full_url = href if href.startswith("http") else f"https://www.mafengwo.cn{href}"
                    items.append({
                        "title": title.strip(),
                        "source_url": full_url,
                        "source_platform": "马蜂窝",
                    })
            except Exception:
                continue

    return items[:max_items]


async def parse_travel_note(page: Page, url: str) -> dict | None:
    """解析马蜂窝游记/攻略详情页"""
    try:
        await page.goto(url, wait_until="domcontentloaded", timeout=20000)
        await asyncio.sleep(2)

        # 标题
        title = ""
        title_el = await page.query_selector("h1, .title, ._j_title, article h2")
        if title_el:
            title = await title_el.inner_text()

        # 正文内容
        content = ""
        content_selectors = [
            "._j_content, ._j_note_content, .vc_article_content",
            "article .content, .note-content, .travel-note-content",
            ".article-content",
        ]
        for sel in content_selectors:
            content_el = await page.query_selector(sel)
            if content_el:
                content = await content_el.inner_text()
                if len(content) > 100:
                    break

        # 如果正文为空，尝试获取所有段落
        if not content:
            paras = await page.query_selector_all("p, .para")
            content = "\n".join([await p.inner_text() for p in paras[:50]])

        # 作者
        author = ""
        author_el = await page.query_selector(".author-name, .username, ._j_author_name")
        if author_el:
            author = await author_el.inner_text()

        # 浏览量/赞
        views = 0
        views_el = await page.query_selector(".view-count, ._j_view, .browse-count")
        if views_el:
            views_text = await views_el.inner_text()
            views = _parse_num(views_text)

        likes = 0
        likes_el = await page.query_selector(".like-count, ._j_like, .praise-count")
        if likes_el:
            likes_text = await likes_el.inner_text()
            likes = _parse_num(likes_text)

        # 发布日期
        date = ""
        date_el = await page.query_selector(".date, .time, .publish-date")
        if date_el:
            date = await date_el.inner_text()

        return {
            "title": title.strip() if title else "",
            "raw_content": content.strip(),
            "author_name": author.strip(),
            "likes": likes,
            "views": views,
            "source_published_at": date.strip(),
        }
    except Exception as e:
        return None


def _parse_num(text: str) -> int:
    text = text.strip()
    if not text:
        return 0
    try:
        if "万" in text:
            return int(float(text.replace("万", "")) * 10000)
        if "k" in text.lower():
            return int(float(text.lower().replace("k", "")) * 1000)
        nums = "".join(c for c in text if c.isdigit())
        return int(nums) if nums else 0
    except (ValueError, TypeError):
        return 0


async def search_mafengwo(keywords: list[str] | None = None) -> list[TravelPost]:
    if keywords is None:
        keywords = MAFENGWO_KEYWORDS

    all_items: list[TravelPost] = []
    seen_urls: set[str] = set()

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True, args=["--no-sandbox"])
        context = await browser.new_context(
            viewport={"width": 1280, "height": 900},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0.0.0 Safari/537.36",
            locale="zh-CN",
        )
        page = await context.new_page()

        total = len(keywords)
        for idx, kw in enumerate(keywords):
            try:
                search_url = f"https://www.mafengwo.cn/search/s.php?q={kw}"
                print(f"[{idx+1}/{total}] 马蜂窝搜索: {kw}", flush=True)
                await page.goto(search_url, wait_until="domcontentloaded", timeout=20000)
                results = await parse_search_results(page, max_items=12)

                new_count = 0
                for r in results:
                    if r["source_url"] in seen_urls:
                        continue
                    seen_urls.add(r["source_url"])

                    detail = await parse_travel_note(page, r["source_url"])
                    if detail and len(detail.get("raw_content", "")) > 50:
                        post = TravelPost(
                            source_platform="马蜂窝",
                            source_url=r["source_url"],
                            author_name=detail.get("author_name", ""),
                            title=detail.get("title", r["title"]),
                            raw_content=detail["raw_content"][:3000],
                            likes=detail.get("likes", 0),
                            views=detail.get("views", 0),
                            comments=0,
                            source_published_at=detail.get("source_published_at", ""),
                        )
                        all_items.append(post)
                        new_count += 1
                        print(f"  [{len(all_items)}] {post.title[:50]}", flush=True)
                    await asyncio.sleep(random.uniform(0.5, 1.2))

                print(f"  -> 新入库: {new_count}", flush=True)

            except Exception as e:
                print(f"  x '{kw}' 失败: {e}", flush=True)

        await browser.close()

    all_items.sort(key=lambda p: p.views + p.likes * 10, reverse=True)
    return all_items


def save_posts(posts: list[TravelPost], output_path: str = "mafengwo_posts.json"):
    data = [asdict(p) for p in posts]
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"\n马蜂窝: 保存 {len(posts)} 条到 {output_path}")
    return output_path


async def main():
    print("=" * 50)
    print("马蜂窝 新西兰旅行内容抓取")
    print(f"关键词数: {len(MAFENGWO_KEYWORDS)}")
    print("=" * 50)
    posts = await search_mafengwo()
    save_posts(posts)


if __name__ == "__main__":
    asyncio.run(main())
