#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
完整修复所有日记的英文字段
"""

from pathlib import Path
import re
from datetime import datetime

def calculate_day_number(date_str):
    """计算建站天数"""
    start_date = datetime(2026, 4, 29)
    current_date = datetime.strptime(date_str, '%Y-%m-%d')
    return (current_date - start_date).days + 1

def fix_all_diaries():
    """修复所有日记的英文字段"""
    diaries_file = Path('src/data/diaries.ts')
    content = diaries_file.read_text(encoding='utf-8')

    # 先移除重复的titleEn和summaryEn行
    content = re.sub(r'(titleEn: `[^\n]+`\n)\s*titleEn:', r'\1    titleEn:', content)
    content = re.sub(r'(summaryEn: `[^\n]+`\n)\s*summaryEn:', r'\1    summaryEn:', content)

    # 查找所有缺少英文字段的条目
    # 模式：有date和title，但没有titleEn
    pattern = r"(\{\s*date: '(\d{4}-\d{2}-\d{2})',\s*title: ([^,\n]+),\s*summary: ([^,\n]+),)"

    def add_english(match):
        full_match = match.group(1)
        date = match.group(2)
        title = match.group(3)
        summary = match.group(4)

        day_num = calculate_day_number(date)
        title_en = f"`Day {day_num}`"
        summary_en = f"`Work diary for {date}.`"

        # 构建新的条目，添加英文字段
        new_entry = f"""{{
    date: '{date}',
    title: {title},
    titleEn: {title_en},
    summary: {summary},
    summaryEn: {summary_en},"""

        return new_entry

    # 替换所有匹配项
    new_content = re.sub(pattern, add_english, content, flags=re.MULTILINE)

    # 写回文件
    diaries_file.write_text(new_content, encoding='utf-8')

    # 统计
    total = len(re.findall(r"date: '\d{4}-\d{2}-\d{2}'", content))
    with_en = len(re.findall(r"titleEn:", new_content))

    print(f"[OK] Total diaries: {total}")
    print(f"[OK] With English: {with_en}")
    print(f"[OK] Fixed: {with_en - len(re.findall(r'titleEn:', content))}")

    return total, with_en

if __name__ == '__main__':
    print("=" * 60)
    print("Complete Diary English Fix")
    print("=" * 60)
    print()

    total, with_en = fix_all_diaries()

    print()
    print(f"[DONE] {total} total, {with_en} with English")
    print("=" * 60)
