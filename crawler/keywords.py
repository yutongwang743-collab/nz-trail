"""按目的地（国家）集中管理各平台搜索关键词。

其它爬虫通过 resolve_keywords(country, platform, default) 获取关键词列表；
默认国家为「新西兰」，在 main.py / 各爬虫 CLI 传入「澳大利亚」即可切换。
新增目的地只需在下方补充对应平台的关键词。
"""

# ── 小红书 ──
XIAOHONGSHU_AU = [
    "塔斯马尼亚攻略", "霍巴特攻略", "MONA美术馆", "萨拉曼卡集市",
    "布鲁尼岛", "亚瑟港监狱", "酒杯湾", "火焰湾", "摇篮山", "朗塞斯顿",
    "卡塔拉特峡谷", "塔斯马尼亚自驾", "塔斯马尼亚东海岸", "塔斯马尼亚生蚝",
    "塔斯马尼亚袋熊", "塔斯马尼亚恶魔", "塔斯马尼亚薰衣草",
    "悉尼攻略", "墨尔本攻略", "大堡礁", "黄金海岸", "乌鲁鲁",
    "澳洲自驾", "澳洲美食", "澳洲海滩", "澳洲酒庄", "澳洲跳伞", "澳洲必去",
]

# ── 马蜂窝 ──
MAFENGWO_AU = [
    "塔斯马尼亚景点", "霍巴特攻略", "布鲁尼岛攻略", "酒杯湾攻略",
    "摇篮山攻略", "亚瑟港攻略", "火焰湾攻略", "朗塞斯顿攻略",
    "塔斯马尼亚美食", "塔斯马尼亚自驾", "塔斯马尼亚生蚝",
    "悉尼攻略", "墨尔本攻略", "大堡礁攻略", "黄金海岸攻略", "澳洲必去景点",
]

# ── 元爬虫（DuckDuckGo）──
META_AU = [
    "塔斯马尼亚 霍巴特 攻略 site:mafengwo.cn",
    "塔斯马尼亚 摇篮山 攻略",
    "塔斯马尼亚 布鲁尼岛 生蚝",
    "塔斯马尼亚 酒杯湾 攻略",
    "塔斯马尼亚 火焰湾 攻略",
    "塔斯马尼亚 亚瑟港 攻略",
    "塔斯马尼亚 朗塞斯顿 攻略",
    "塔斯马尼亚 自驾 环线",
    "悉尼 攻略 site:mafengwo.cn",
    "墨尔本 攻略 site:mafengwo.cn",
    "澳洲 大堡礁 攻略",
    "澳洲 黄金海岸 攻略",
    "澳洲 必去 景点",
]

# ── 综合爬虫（穷游网 / Wikivoyage / 猫途鹰）──
MULTI_AU_URLS = {
    "qyer": [
        ("穷游网", "塔斯马尼亚概览", "https://place.qyer.com/tasmania/"),
        ("穷游网", "霍巴特攻略", "https://place.qyer.com/hobart/"),
        ("穷游网", "朗塞斯顿攻略", "https://place.qyer.com/launceston/"),
        ("穷游网", "悉尼攻略", "https://place.qyer.com/sydney/"),
        ("穷游网", "墨尔本攻略", "https://place.qyer.com/melbourne/"),
    ],
    "wikivoyage": [
        ("Wikivoyage", "塔斯马尼亚", "https://en.wikivoyage.org/wiki/Tasmania"),
        ("Wikivoyage", "霍巴特", "https://en.wikivoyage.org/wiki/Hobart"),
        ("Wikivoyage", "悉尼", "https://en.wikivoyage.org/wiki/Sydney"),
        ("Wikivoyage", "墨尔本", "https://en.wikivoyage.org/wiki/Melbourne"),
        ("Wikivoyage", "摇篮山-圣克莱尔湖", "https://en.wikivoyage.org/wiki/Cradle_Mountain-Lake_St_Clair_National_Park"),
    ],
    "tripadvisor": [
        ("猫途鹰", "塔斯马尼亚必去景点", "https://www.tripadvisor.cn/Attractions-g255096-Activities-Tasmania.html"),
        ("猫途鹰", "霍巴特景点", "https://www.tripadvisor.cn/Attractions-g255097-Activities-Hobart_Greater_Hobart_Tasmania.html"),
        ("猫途鹰", "悉尼景点", "https://www.tripadvisor.cn/Attractions-g255060-Activities-Sydney_New_South_Wales.html"),
        ("猫途鹰", "墨尔本景点", "https://www.tripadvisor.cn/Attractions-g255100-Activities-Melbourne_Victoria.html"),
    ],
}

_AU_PLATFORM_KEYWORDS = {
    "xiaohongshu": XIAOHONGSHU_AU,
    "mafengwo": MAFENGWO_AU,
    "meta": META_AU,
}


def resolve_keywords(country: str, platform: str, default: list):
    """按国家+平台返回关键词列表。非「澳大利亚」时返回调用方默认（新西兰）。"""
    if country == "澳大利亚":
        return _AU_PLATFORM_KEYWORDS.get(platform, default)
    return default
