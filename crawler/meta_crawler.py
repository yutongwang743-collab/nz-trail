"""元爬虫 v2：通过 DuckDuckGo 聚合新西兰旅行内容。
DuckDuckGo 对自动化浏览器的限制比 Bing/Google 宽松得多。
"""

import asyncio
import json
import random
import re
import os
from dataclasses import dataclass, asdict
from playwright.async_api import async_playwright

OUTPUT_DIR = os.path.dirname(__file__)

SEARCH_QUERIES = [
    # === 景区/景点 (15个) ===
    "新西兰 皇后镇 攻略 site:mafengwo.cn",
    "新西兰 米尔福德峡湾 攻略",
    "新西兰 特卡波湖 攻略",
    "新西兰 南岛 必去景点",
    "新西兰 最美景点 推荐",
    "新西兰 国家公园 攻略",
    "新西兰 北岛 景点 推荐",
    "新西兰 瓦纳卡 攻略",
    "新西兰 霍比屯 攻略",
    "新西兰 库克山 攻略",
    "新西兰 罗托鲁瓦 攻略",
    "新西兰 福克斯冰川 攻略",
    "新西兰 怀托摩 萤火虫",
    "新西兰 箭镇 攻略",
    "新西兰 普卡基湖",
    # === 美食/餐厅 (8个) ===
    "新西兰 美食 推荐 site:mafengwo.cn",
    "皇后镇 餐厅 推荐",
    "新西兰 必吃 美食 清单",
    "奥克兰 美食 攻略",
    "新西兰 海鲜 推荐",
    "新西兰 特色 美食",
    "新西兰 咖啡店 推荐",
    "新西兰 葡萄酒 庄园",
    # === 打卡拍照 (5个) ===
    "新西兰 网红 打卡 拍照",
    "新西兰 最美 拍照 地点",
    "新西兰 星空 拍摄 地点",
    "新西兰 最美 公路",
    "新西兰 隐藏 景点",
    # === 户外活动 (8个) ===
    "新西兰 跳伞 攻略",
    "新西兰 徒步 路线 推荐",
    "新西兰 冰川 徒步 攻略",
    "新西兰 滑雪 场 推荐",
    "新西兰 蹦极 攻略",
    "新西兰 观鲸 攻略",
    "新西兰 骑行 路线",
    "新西兰 温泉 推荐",
    # === 人文文化 (5个) ===
    "新西兰 毛利 文化 体验",
    "新西兰 小镇 推荐",
    "新西兰 节日 集市",
    "新西兰 博物馆 推荐",
    "新西兰 艺术 活动",
    # === 自驾/行程 (5个) ===
    "新西兰 自驾 攻略 site:mafengwo.cn",
    "新西兰 南岛 环线 行程",
    "新西兰 7天 行程 攻略",
    "新西兰 10天 深度游",
    "新西兰 省钱 攻略 花费",
]


@dataclass
class TravelPost:
    source_platform: str = ""
    source_url: str = ""
    title: str = ""
    raw_content: str = ""
    category: str = ""
    likes: int = 0
    source_published_at: str = ""


def detect_platform(url: str) -> str:
    for kw, name in [
        ("mafengwo", "马蜂窝"), ("qyer", "穷游网"), ("xiaohongshu", "小红书"),
        ("ctrip", "携程"), ("zhihu", "知乎"), ("dianping", "大众点评"),
        ("weibo", "微博"), ("douyin", "抖音"), ("bilibili", "B站"),
        ("newzealand.com", "新西兰旅游局"), ("wikivoyage", "Wikivoyage"),
    ]:
        if kw in url:
            return name
    return "其他"


def categorize(text: str) -> str:
    rules = [
        (["美食","餐厅","海鲜","牛排","甜品","咖啡","必吃","葡萄酒","早午餐","小吃"], "美食"),
        (["跳伞","徒步","滑雪","冰川","蹦极","观鲸","骑行","划船","户外","骑马","温泉","高尔夫","冲浪"], "户外活动"),
        (["打卡","拍照","网红","星空","极光","最美","隐藏","海滩","湖泊","日出","日落"], "打卡地"),
        (["文化","毛利","博物馆","集市","节日","艺术","小镇","历史","教堂"], "人文活动"),
        (["自驾","行程","路线","环线","花费","省钱","签证","住宿","交通","机票","机场"], "攻略"),
    ]
    for keywords, cat in rules:
        if any(kw in text for kw in keywords):
            return cat
    return "景点"


async def search_duckduckgo(queries: list[str] | None = None) -> list[TravelPost]:
    if queries is None:
        queries = SEARCH_QUERIES

    posts: list[TravelPost] = []
    seen_urls: set[str] = set()

    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            args=["--no-sandbox", "--disable-blink-features=AutomationControlled"]
        )
        context = await browser.new_context(
            viewport={"width": 1366, "height": 900},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0.0.0 Safari/537.36",
            locale="zh-CN",
        )
        page = await context.new_page()

        for idx, query in enumerate(queries):
            if len(posts) >= 200:
                break

            try:
                # DuckDuckGo HTML version (no JS, less bot detection)
                ddg_url = f"https://html.duckduckgo.com/html/?q={query}"
                print(f"[{idx+1}/{len(queries)}] DDG: {query[:50]}", flush=True)

                await page.goto(ddg_url, wait_until="domcontentloaded", timeout=20000)
                await asyncio.sleep(random.uniform(1.0, 2.0))

                # DuckDuckGo HTML results selectors
                result_blocks = await page.query_selector_all(".result, .result__body, .web-result")
                if not result_blocks:
                    result_blocks = await page.query_selector_all(".result__a, a.result__url")
                if not result_blocks:
                    # Fallback: find any link with external URL
                    all_links = await page.query_selector_all("a.result__a, a.result__snippet, a[class*='result']")
                    result_blocks = all_links

                new_count = 0
                for block in result_blocks:
                    if len(posts) >= 200:
                        break

                    try:
                        link_el = await block.query_selector("a.result__a, a")
                        if not link_el:
                            link_el = block  # could be a direct <a>

                        url = await link_el.get_attribute("href") or ""
                        # Clean up DDG redirect URLs
                        if "duckduckgo.com" in url and "uddg=" in url:
                            import urllib.parse
                            parsed = urllib.parse.urlparse(url)
                            qs = urllib.parse.parse_qs(parsed.query)
                            url = qs.get("uddg", [url])[0]

                        title = (await link_el.inner_text()).strip() if link_el else ""

                        snippet_el = await block.query_selector(".result__snippet, .snippet, .result__body")
                        snippet = ""
                        if snippet_el:
                            snippet = (await snippet_el.inner_text()).strip()

                        if not url or not title or len(title) < 3:
                            continue
                        if url in seen_urls:
                            continue
                        seen_urls.add(url)

                        platform = detect_platform(url)
                        category = categorize(title + " " + snippet)
                        content = f"{title}\n{snippet}" if snippet else title

                        posts.append(TravelPost(
                            source_platform=platform,
                            source_url=url,
                            title=title,
                            raw_content=content,
                            category=category,
                        ))
                        new_count += 1
                    except Exception:
                        continue

                print(f"  -> +{new_count} 条 | 总计: {len(posts)}", flush=True)

            except Exception as e:
                print(f"  x 失败: {e}", flush=True)

            await asyncio.sleep(random.uniform(0.8, 1.5))

        await browser.close()

    return posts


def save_posts(posts: list[TravelPost], path: str = "nz_travel_posts.json"):
    data = [asdict(p) for p in posts]
    full_path = os.path.join(OUTPUT_DIR, path)
    with open(full_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    # 统计
    platforms = {}
    categories = {}
    for p in posts:
        platforms[p.source_platform] = platforms.get(p.source_platform, 0) + 1
        categories[p.category] = categories.get(p.category, 0) + 1

    print(f"\n{'='*50}")
    print(f"保存 {len(posts)} 条到 {full_path}")
    print(f"平台: {json.dumps(platforms, ensure_ascii=False)}")
    print(f"分类: {json.dumps(categories, ensure_ascii=False)}")


async def main():
    print("=" * 50)
    print("NZ Travel Meta Crawler (DuckDuckGo)")
    print(f"搜索词: {len(SEARCH_QUERIES)}")
    print("=" * 50)
    posts = await search_duckduckgo()
    save_posts(posts)


if __name__ == "__main__":
    asyncio.run(main())
