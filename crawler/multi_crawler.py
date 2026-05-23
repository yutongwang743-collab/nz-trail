"""综合爬虫 v2：从可访问平台抓取新西兰旅行信息。
简化的内容提取——直接从页面文本中获取有意义段落。
数据源：穷游网 · Wikivoyage · 猫途鹰
"""

import asyncio
import json
import os
import random
import re
from dataclasses import dataclass, asdict
from playwright.async_api import async_playwright

OUTPUT_DIR = os.path.dirname(__file__)


@dataclass
class TravelPost:
    source_platform: str = ""
    source_url: str = ""
    title: str = ""
    raw_content: str = ""
    category: str = ""


def categorize(text: str) -> str:
    rules = [
        ("美食", ["美食","餐厅","海鲜","牛排","甜品","咖啡","必吃","葡萄酒","早午餐","小吃","海鲜市场","三文鱼","生蚝","龙虾","冰淇淋","汉堡"]),
        ("户外活动", ["跳伞","徒步","滑雪","冰川","蹦极","观鲸","骑行","划船","骑马","温泉","高尔夫","冲浪","皮划艇","漂流","攀岩","缆车"]),
        ("打卡地", ["打卡","拍照","网红","星空","极光","最美","隐藏","海滩","湖泊","灯塔","教堂","花园","日出","日落","峡湾"]),
        ("人文活动", ["文化","毛利","博物馆","集市","节日","艺术","历史","遗址","村落","市场","表演","大学"]),
        ("攻略", ["自驾","行程","路线","环线","花费","省钱","签证","住宿","交通","机票","机场","轮渡","租车","渡轮"]),
    ]
    for cat, keywords in rules:
        if any(kw in text for kw in keywords):
            return cat
    return "景点"


async def extract_page_content(page, url: str, title_prefix: str) -> list[TravelPost]:
    """通用的页面内容提取：获取正文中所有有意义的行"""
    posts = []
    try:
        await page.goto(url, wait_until="domcontentloaded", timeout=20000)
        await asyncio.sleep(2.5)

        # 获取页面标题
        page_title = await page.title()

        # 提取所有有意义的文本段落（长度 > 25 字符）
        body_text = await page.inner_text("body")
        lines = []
        for line in body_text.split("\n"):
            line = line.strip()
            # 过滤掉太短、纯数字、纯符号、导航文本等
            if len(line) > 25 and not re.match(r'^[\d\s\.\-\+\/\\|,，、。；;:：\?\！\!~\`@#$%\^&\*\(\)\[\]\{\}]+$', line):
                if not any(skip in line for skip in ["注册", "登录", "下载App", "打开App", "分享到", "举报", "反馈"]):
                    lines.append(line)

        # 去重相近的行
        seen = set()
        unique_lines = []
        for line in lines:
            key = line[:30]
            if key not in seen:
                seen.add(key)
                unique_lines.append(line)

        for line in unique_lines[:15]:  # 每页最多15条
            cat = categorize(line)
            posts.append(TravelPost(
                source_platform=title_prefix,
                source_url=url,
                title=page_title[:80] if page_title else title_prefix,
                raw_content=line[:1500],
                category=cat,
            ))

    except asyncio.TimeoutError:
        print(f"    超时: {url}", flush=True)
    except Exception as e:
        print(f"    错误: {e}", flush=True)

    return posts


# ============================================================
# 穷游网 URLs
# ============================================================
QIYER_URLS = [
    ("穷游网", "新西兰概览", "https://place.qyer.com/new-zealand/"),
    ("穷游网", "皇后镇攻略", "https://place.qyer.com/queenstown/"),
    ("穷游网", "奥克兰攻略", "https://place.qyer.com/auckland/"),
    ("穷游网", "基督城攻略", "https://place.qyer.com/christchurch/"),
    ("穷游网", "罗托鲁瓦攻略", "https://place.qyer.com/rotorua/"),
    ("穷游网", "惠灵顿攻略", "https://place.qyer.com/wellington/"),
    ("穷游网", "但尼丁攻略", "https://place.qyer.com/dunedin/"),
    ("穷游网", "特卡波湖攻略", "https://place.qyer.com/lake-tekapo/"),
    ("穷游网", "瓦纳卡攻略", "https://place.qyer.com/wanaka/"),
    ("穷游网", "米尔福德峡湾", "https://place.qyer.com/milford-sound/"),
    ("穷游网", "凯库拉攻略", "https://place.qyer.com/kaikoura/"),
    ("穷游网", "汤加里罗", "https://place.qyer.com/tongariro/"),
    ("穷游网", "阿贝尔塔斯曼", "https://place.qyer.com/abel-tasman/"),
    ("穷游网", "福克斯冰川", "https://place.qyer.com/fox-glacier/"),
    ("穷游网", "新西兰南岛", "https://place.qyer.com/south-island/"),
    ("穷游网", "新西兰北岛", "https://place.qyer.com/north-island/"),
    ("穷游网", "新西兰购物", "https://place.qyer.com/new-zealand/shopping/"),
]


# ============================================================
# Wikivoyage URLs
# ============================================================
WIKIVOYAGE_URLS = [
    ("Wikivoyage", "新西兰总览", "https://en.wikivoyage.org/wiki/New_Zealand"),
    ("Wikivoyage", "新西兰北岛", "https://en.wikivoyage.org/wiki/North_Island"),
    ("Wikivoyage", "新西兰南岛", "https://en.wikivoyage.org/wiki/South_Island"),
    ("Wikivoyage", "皇后镇", "https://en.wikivoyage.org/wiki/Queenstown_(New_Zealand)"),
    ("Wikivoyage", "奥克兰", "https://en.wikivoyage.org/wiki/Auckland"),
    ("Wikivoyage", "基督城", "https://en.wikivoyage.org/wiki/Christchurch"),
    ("Wikivoyage", "罗托鲁瓦", "https://en.wikivoyage.org/wiki/Rotorua"),
    ("Wikivoyage", "惠灵顿", "https://en.wikivoyage.org/wiki/Wellington"),
    ("Wikivoyage", "但尼丁", "https://en.wikivoyage.org/wiki/Dunedin"),
    ("Wikivoyage", "瓦纳卡", "https://en.wikivoyage.org/wiki/Wanaka"),
    ("Wikivoyage", "汤加里罗国家公园", "https://en.wikivoyage.org/wiki/Tongariro_National_Park"),
    ("Wikivoyage", "阿贝尔塔斯曼", "https://en.wikivoyage.org/wiki/Abel_Tasman_National_Park"),
    ("Wikivoyage", "凯库拉", "https://en.wikivoyage.org/wiki/Kaikoura"),
    ("Wikivoyage", "米尔福德峡湾", "https://en.wikivoyage.org/wiki/Milford_Sound"),
    ("Wikivoyage", "尼尔森", "https://en.wikivoyage.org/wiki/Nelson_(New_Zealand)"),
    ("Wikivoyage", "陶波", "https://en.wikivoyage.org/wiki/Taupo"),
    ("Wikivoyage", "霍比屯", "https://en.wikivoyage.org/wiki/Matamata"),
]


# ============================================================
# 猫途鹰 (TripAdvisor CN) URLs
# ============================================================
TRIPADVISOR_URLS = [
    ("猫途鹰", "新西兰必去景点", "https://www.tripadvisor.cn/Attractions-g255104-Activities-New_Zealand.html"),
    ("猫途鹰", "皇后镇景点", "https://www.tripadvisor.cn/Attractions-g255122-Activities-Queenstown_Otago_Region_South_Island.html"),
    ("猫途鹰", "奥克兰景点", "https://www.tripadvisor.cn/Attractions-g255106-Activities-Auckland_North_Island.html"),
    ("猫途鹰", "罗托鲁瓦景点", "https://www.tripadvisor.cn/Attractions-g255111-Activities-Rotorua_Bay_of_Plenty_Region_North_Island.html"),
    ("猫途鹰", "基督城景点", "https://www.tripadvisor.cn/Attractions-g255118-Activities-Christchurch_Canterbury_Region_South_Island.html"),
    ("猫途鹰", "新西兰餐厅推荐", "https://www.tripadvisor.cn/Restaurants-g255104-New_Zealand.html"),
    ("猫途鹰", "皇后镇餐厅", "https://www.tripadvisor.cn/Restaurants-g255122-Queenstown_Otago_Region_South_Island.html"),
]


# ============================================================
# 主流程
# ============================================================
def save_all(posts: list[TravelPost], path: str = "nz_travel_data.json"):
    data = [asdict(p) for p in posts]
    full_path = os.path.join(OUTPUT_DIR, path)
    with open(full_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    platforms = {}
    categories = {}
    for p in posts:
        platforms[p.source_platform] = platforms.get(p.source_platform, 0) + 1
        categories[p.category] = categories.get(p.category, 0) + 1

    print(f"\n{'='*60}")
    print(f"总计: {len(posts)} 条 -> {full_path}")
    print(f"平台分布:")
    for k, v in sorted(platforms.items(), key=lambda x: -x[1]):
        print(f"  {k}: {v}")
    print(f"分类分布:")
    for k, v in sorted(categories.items(), key=lambda x: -x[1]):
        print(f"  {k}: {v}")
    return full_path


async def main():
    print("=" * 60)
    print("NZ Travel Multi-Crawler v2")
    print(f"  穷游网: {len(QIYER_URLS)} 页")
    print(f"  Wikivoyage: {len(WIKIVOYAGE_URLS)} 页")
    print(f"  猫途鹰: {len(TRIPADVISOR_URLS)} 页")
    print(f"  总计: {len(QIYER_URLS) + len(WIKIVOYAGE_URLS) + len(TRIPADVISOR_URLS)} 页")
    print("=" * 60)

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

        all_posts = []

        # 1. 穷游网
        print("\n--- [穷游网] ---", flush=True)
        for platform, name, url in QIYER_URLS:
            posts = await extract_page_content(page, url, name)
            for p in posts:
                p.source_platform = platform
                p.title = name
            all_posts.extend(posts)
            print(f"  [{len(all_posts)}] {name}: +{len(posts)}", flush=True)
            await asyncio.sleep(random.uniform(0.5, 1.2))

        # 2. Wikivoyage
        print("\n--- [Wikivoyage] ---", flush=True)
        for platform, name, url in WIKIVOYAGE_URLS:
            posts = await extract_page_content(page, url, name)
            for p in posts:
                p.source_platform = platform
                p.title = name
            all_posts.extend(posts)
            print(f"  [{len(all_posts)}] {name}: +{len(posts)}", flush=True)
            await asyncio.sleep(random.uniform(0.5, 1.2))

        # 3. 猫途鹰
        print("\n--- [猫途鹰] ---", flush=True)
        for platform, name, url in TRIPADVISOR_URLS:
            posts = await extract_page_content(page, url, name)
            for p in posts:
                p.source_platform = platform
                p.title = name
            all_posts.extend(posts)
            print(f"  [{len(all_posts)}] {name}: +{len(posts)}", flush=True)
            await asyncio.sleep(random.uniform(0.5, 1.5))

        await browser.close()

    # 去重
    seen = set()
    unique = []
    for p in all_posts:
        key = p.raw_content[:50]
        if key not in seen:
            seen.add(key)
            unique.append(p)

    print(f"\n去重: {len(all_posts)} -> {len(unique)}", flush=True)
    save_all(unique)


if __name__ == "__main__":
    asyncio.run(main())
