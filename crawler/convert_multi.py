"""把 multi_crawler 的 nz_travel_data.json 转成 db_import.json（含 DeepSeek 提取）。"""

import json
from ai_pipeline import process_posts, save_to_db_format


class CompatPost:
    def __init__(self, d):
        self.source_platform = d.get("source_platform", "其他")
        self.source_url = d.get("source_url", "")
        self.author_name = ""
        self.title = d.get("title", "")
        self.raw_content = d.get("raw_content", "")
        self.likes = 0
        self.saves = 0
        self.comments = 0
        self.source_published_at = ""


with open("nz_travel_data.json", "r", encoding="utf-8") as f:
    raw = json.load(f)

posts = [CompatPost(d) for d in raw]
print(f"读取 {len(posts)} 条，开始 AI 提取...")
processed = process_posts(posts)
save_to_db_format(processed, "db_import.json")
print("完成，db_import.json 已生成")
