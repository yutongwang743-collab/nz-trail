"""智能多标签分类器：为每条帖子分配多个标签"""

import json
import os

OUTPUT_DIR = os.path.dirname(__file__)
INPUT_FILE = os.path.join(OUTPUT_DIR, "nz_travel_data.json")
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "nz_travel_data_v3.json")

TAG_RULES = {
    "景点": [
        "山", "湖", "峡湾", "冰川", "国家公园", "岛", "海湾",
        "瀑布", "河流", "森林", "火山", "温泉", "岩", "洞",
    ],
    "美食": [
        "餐厅", "海鲜", "牛排", "甜品", "咖啡", "必吃", "葡萄酒",
        "三文鱼", "生蚝", "龙虾", "冰淇淋", "汉堡", "烧烤", "酒吧",
        "Fergburger", "cafe", "restaurant", "bakery", "brewery",
        "小吃", "烘焙", "啤酒", "巧克力", "奶酪", "料理", "食堂",
    ],
    "户外活动": [
        "跳伞", "徒步", "滑雪", "蹦极", "观鲸", "骑行", "划船",
        "骑马", "冲浪", "皮划艇", "漂流", "攀岩", "滑板车",
        "快艇", "步道", "Hiking", "trek", "trail", "bike",
        "喷射", "滑翔", "滑索", "四驱", "越野", "钓鱼",
        "浮潜", "潜水", "帆船", "游艇", "独木舟", "缆车",
        "skyline", "skydive", "bungee", "raft", "kayak",
    ],
    "打卡地": [
        "打卡", "拍照", "网红", "星空", "极光", "最美", "隐藏",
        "日出", "日落", "观景台", "灯塔", "lookout", "viewpoint",
        "镜湖", "萤火虫", "企鹅", "海豹", "孤独的树",
    ],
    "人文活动": [
        "毛利", "博物馆", "集市", "节日", "艺术", "历史", "遗址",
        "村落", "表演", "大学", "文化", "画廊", "纪念", "战争",
        "建筑", "展览", "土著", "传统", "教堂", "城堡",
        "Museum", "gallery", "historic", "heritage", "Maori",
    ],
    "攻略": [
        "自驾", "行程", "路线", "环线", "花费", "省钱", "签证",
        "住宿", "交通", "机票", "机场", "租车", "渡轮",
        "酒店", "民宿", "Airbnb", "天行程", "预算", "营地", "房车",
    ],
}


def get_tags(text: str) -> list[str]:
    tags = []
    text_lower = text.lower()
    for tag, keywords in TAG_RULES.items():
        score = sum(1 for kw in keywords if kw.lower() in text_lower)
        if score >= 1:
            tags.append(tag)
    if not tags:
        tags = ["景点"]
    return tags


def get_primary_tag(tags: list[str]) -> str:
    # 优先级: 美食 > 户外活动 > 人文活动 > 打卡地 > 攻略 > 景点
    priority = ["美食", "户外活动", "人文活动", "打卡地", "攻略", "景点"]
    for p in priority:
        if p in tags:
            return p
    return "景点"


def main():
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    print(f"处理 {len(data)} 条数据...")

    from collections import Counter
    primary_cats = Counter()
    tag_freq = Counter()

    for d in data:
        text = d.get("raw_content", "") + " " + d.get("title", "")
        tags = get_tags(text)
        d["tags"] = tags
        d["category"] = get_primary_tag(tags)
        primary_cats[d["category"]] += 1
        for t in tags:
            tag_freq[t] += 1

    print(f"\n主分类分布:")
    for k, v in primary_cats.most_common():
        print(f"  {k}: {v}")

    print(f"\n标签频率 (多标签):")
    for k, v in tag_freq.most_common():
        print(f"  {k}: {v}")

    # 保存
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"\n保存到 {OUTPUT_FILE}")

    # 显示每条帖子的标签分布
    avg = sum(len(d["tags"]) for d in data) / len(data)
    print(f"平均每条约 {avg:.1f} 个标签")


if __name__ == "__main__":
    main()
