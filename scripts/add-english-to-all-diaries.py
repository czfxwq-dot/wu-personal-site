#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为所有日记添加英文标题和摘要
"""

from pathlib import Path
import re
from datetime import datetime

def calculate_day_number(date_str):
    """计算建站天数"""
    start_date = datetime(2026, 4, 29)
    current_date = datetime.strptime(date_str, '%Y-%m-%d')
    return (current_date - start_date).days + 1

def translate_diaries_complete():
    """为所有日记添加英文翻译"""
    diaries_file = Path('src/data/diaries.ts')
    content = diaries_file.read_text(encoding='utf-8')

    # 匹配所有日记条目（包括没有英文字段的情况）
    # 模式1：有英文字段的条目
    pattern_with_en = r"(\{\s*date: '(\d{4}-\d{2}-\d{2})',\s*title: `(.*?)`,\s*titleEn: `(.*?)`,\s*summary: `(.*?)`,\s*summaryEn: `(.*?)`,)"

    # 模式2：没有英文字段的条目
    pattern_without_en = r"(\{\s*date: '(\d{4}-\d{2}-\d{2})',\s*title: `(.*?)`,\s*summary: `(.*?)`,)"

    def add_english_fields(match):
        """为没有英文字段的条目添加英文"""
        full_match = match.group(1)
        date = match.group(2)
        title = match.group(3)
        summary = match.group(4)

        day_num = calculate_day_number(date)

        # 生成简单的英文翻译
        title_en = f"Day {day_num}"
        summary_en = f"Work diary for {date}."

        # 构建新的条目
        new_entry = f"""{{
    date: '{date}',
    title: `{title}`,
    titleEn: `{title_en}`,
    summary: `{summary}`,
    summaryEn: `{summary_en}`,"""

        return new_entry

    # 先处理没有英文字段的条目
    new_content = re.sub(pattern_without_en, add_english_fields, content, flags=re.DOTALL)

    # 写回文件
    diaries_file.write_text(new_content, encoding='utf-8')

    # 统计
    total = len(re.findall(r"date: '\d{4}-\d{2}-\d{2}'", content))
    added = len(re.findall(pattern_without_en, content, flags=re.DOTALL))

    print(f"[OK] Total diaries: {total}")
    print(f"[OK] Added English fields to: {added} diaries")

    return total, added

if __name__ == '__main__':
    print("=" * 60)
    print("Complete Diary Translation - Adding English Fields")
    print("=" * 60)
    print()

    total, added = translate_diaries_complete()

    print()
    print(f"[OK] Completed: {total} total, {added} added")
    print("=" * 60)
