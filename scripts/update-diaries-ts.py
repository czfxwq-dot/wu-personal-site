#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
从 .astro 文件提取数据，生成 diaries.ts 条目
"""

import re
import os
import sys

if sys.platform.startswith('win'):
    sys.stdout.reconfigure(encoding='utf-8')

DIARY_DIR = "src/pages/diary"
OUTPUT_FILE = "src/data/diaries.ts.new"

def extract_from_astro(filepath):
    """从 .astro 文件提取日记数据"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 提取日期
    date_match = re.search(r"const date = '(\d{4}-\d{2}-\d{2})'", content)
    if not date_match:
        return None
    date_str = date_match.group(1)

    # 提取标题
    title_match = re.search(r"const title = `(.+?)`", content, re.DOTALL)
    title = title_match.group(1).strip() if title_match else f"日记 {date_str}"
    title = title.replace('`', '\\`').replace('\n', ' ')

    # 提取摘要
    summary_match = re.search(r"const summary = `(.+?)`", content, re.DOTALL)
    summary = summary_match.group(1).strip() if summary_match else ""
    summary = summary.replace('`', '\\`').replace('\n', ' ')

    # 截断摘要
    if len(summary) > 200:
        summary = summary[:197] + "..."

    # 提取分类
    category_match = re.search(r"const category = '(.+?)'", content)
    category = category_match.group(1) if category_match else "AI项目"

    return {
        'date': date_str,
        'title': title,
        'summary': summary,
        'category': category
    }

def main():
    # 读取现有 diaries.ts
    existing_entries = {}
    if os.path.exists("src/data/diaries.ts"):
        with open("src/data/diaries.ts", 'r', encoding='utf-8') as f:
            content = f.read()
        # 简单解析现有条目
        date_matches = re.findall(r"date: '(\d{4}-\d{2}-\d{2})'", content)
        print(f"📊 现有 diaries.ts 有 {len(date_matches)} 条记录")
        for date in date_matches:
            existing_entries[date] = True

    # 扫描所有 .astro 文件
    diary_files = sorted([f for f in os.listdir(DIARY_DIR) if f.endswith('.astro')])
    print(f"📁 找到 {len(diary_files)} 个日记文件")

    # 提取数据
    entries = []
    for filename in diary_files:
        filepath = os.path.join(DIARY_DIR, filename)
        data = extract_from_astro(filepath)
        if data:
            entries.append(data)

    # 按日期降序排序
    entries.sort(key=lambda x: x['date'], reverse=True)

    print(f"✅ 成功提取 {len(entries)} 条日记数据")

    # 生成新的 diaries.ts
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write("// 日记数据 — 新增日记时只需在这里添加一行\n")
        f.write("// 新增日记后，首页和日记列表页会自动读取此文件\n")
        f.write("export interface DiaryEntry {\n")
        f.write("  date: string;\n")
        f.write("  title: string;\n")
        f.write("  titleEn?: string;\n")
        f.write("  summary: string;\n")
        f.write("  summaryEn?: string;\n")
        f.write("  category?: string;\n")
        f.write("  categoryEn?: string;\n")
        f.write("}\n\n")
        f.write("export const diaries: DiaryEntry[] = [\n")

        for entry in entries:
            f.write("  {\n")
            f.write(f"    date: '{entry['date']}',\n")
            f.write(f"    title: `{entry['title']}`,\n")
            f.write(f"    titleEn: `{entry['title']}`,\n")
            f.write(f"    summary: `{entry['summary']}`,\n")
            f.write(f"    summaryEn: `{entry['summary']}`,\n")
            f.write(f"    category: '{entry['category']}',\n")
            f.write(f"    categoryEn: 'AI Projects'\n")
            f.write("  },\n")

        f.write("];\n")

    print(f"\n✅ 新文件已生成: {OUTPUT_FILE}")
    print(f"\n⚠️  下一步：")
    print(f"   1. 检查 {OUTPUT_FILE}")
    print(f"   2. 替换原文件: mv {OUTPUT_FILE} src/data/diaries.ts")
    print(f"   3. 构建验证: npm run build")

if __name__ == '__main__':
    main()
