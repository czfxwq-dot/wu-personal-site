#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
从所有 .astro 文件提取日记数据，生成完整的 diaries.ts
"""

import re
import os
import sys
from datetime import datetime

if sys.platform.startswith('win'):
    sys.stdout.reconfigure(encoding='utf-8')

DIARY_DIR = "src/pages/diary"
OUTPUT_FILE = "src/data/diaries.ts.complete"

def extract_from_astro(filepath):
    """从 .astro 文件提取日记数据 - 增强版"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 提取日期
    date_match = re.search(r"const date = '(\d{4}-\d{2}-\d{2})'", content)
    if not date_match:
        return None
    date_str = date_match.group(1)

    # 提取标题（多种格式）
    title = f"日记 {date_str}"  # 默认标题

    # 尝试多种标题格式
    title_patterns = [
        r"const title = '([^']+)'",
        r"const title = `([^`]+)`",
        r"const title = \"([^\"]+)\"",
    ]
    for pattern in title_patterns:
        match = re.search(pattern, content)
        if match:
            title = match.group(1)
            break

    # 提取摘要（多种格式）
    summary = ""
    summary_patterns = [
        r"const summary = `([^`]+)`",
        r"const summary = '([^']+)'",
        r'const summary = "([^"]+)"',
        r'"description":\s*`([^`]+)`',
        r'"description":\s*"([^"]+)"',
    ]
    for pattern in summary_patterns:
        match = re.search(pattern, content, re.DOTALL)
        if match:
            summary = match.group(1).strip()
            break

    # 清理摘要
    summary = summary.replace('\n', ' ').replace('`', "'")
    if len(summary) > 200:
        summary = summary[:197] + "..."

    # 提取分类
    category = "AI项目"
    category_match = re.search(r"const category = '([^']+)'", content)
    if category_match:
        category = category_match.group(1)

    return {
        'date': date_str,
        'title': title.replace('`', "'"),
        'summary': summary,
        'category': category
    }

def main():
    # 扫描所有 .astro 文件
    diary_files = sorted([f for f in os.listdir(DIARY_DIR) if f.endswith('.astro')])
    print(f"📁 找到 {len(diary_files)} 个日记文件")

    # 提取数据
    entries = []
    failed = []
    for filename in diary_files:
        filepath = os.path.join(DIARY_DIR, filename)
        try:
            data = extract_from_astro(filepath)
            if data:
                entries.append(data)
            else:
                failed.append(filename)
        except Exception as e:
            print(f"  ❌ {filename}: {e}")
            failed.append(filename)

    # 按日期降序排序
    entries.sort(key=lambda x: x['date'], reverse=True)

    print(f"✅ 成功提取 {len(entries)} 条日记数据")
    if failed:
        print(f"⚠️  失败 {len(failed)} 个: {', '.join(failed[:5])}...")

    # 生成新的 diaries.ts
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write("// 日记数据 — 完整版本\n")
        f.write("// 生成时间: " + datetime.now().strftime('%Y-%m-%d %H:%M:%S') + "\n")
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

    print(f"\n✅ 完整数据文件已生成: {OUTPUT_FILE}")
    print(f"\n⚠️  下一步：")
    print(f"   mv {OUTPUT_FILE} src/data/diaries.ts")
    print(f"   npm run build")

if __name__ == '__main__':
    main()
