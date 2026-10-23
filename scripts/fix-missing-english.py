#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为所有缺少英文字段的日记和AI新闻添加英文翻译
"""

from pathlib import Path
import re
from datetime import datetime

def calculate_day_number(date_str):
    """计算建站天数"""
    start_date = datetime(2026, 4, 29)
    current_date = datetime.strptime(date_str, '%Y-%m-%d')
    return (current_date - start_date).days + 1

def fix_diaries():
    """修复日记的英文字段"""
    diaries_file = Path('src/data/diaries.ts')
    content = diaries_file.read_text(encoding='utf-8')

    # 匹配没有英文字段的日记条目
    # 格式：date: '...', title: `...`, summary: `...`, (没有titleEn和summaryEn)
    pattern = r"(\{\s*date: '(\d{4}-\d{2}-\d{2})',\s*title: (`[^`]+`|'[^']+'),\s*summary: (`[^`]+`|'[^']+'),)"

    def add_english(match):
        full_match = match.group(1)
        date = match.group(2)
        title = match.group(3)
        summary = match.group(4)

        day_num = calculate_day_number(date)
        title_en = f"Day {day_num}"
        summary_en = f"Work diary for {date}."

        # 构建新的条目，添加英文字段
        new_entry = f"""{{
    date: '{date}',
    title: {title},
    titleEn: `{title_en}`,
    summary: {summary},
    summaryEn: `{summary_en}`,"""

        return new_entry

    # 替换所有匹配项
    new_content = re.sub(pattern, add_english, content, flags=re.DOTALL)

    # 写回文件
    diaries_file.write_text(new_content, encoding='utf-8')

    # 统计
    total = len(re.findall(r"date: '\d{4}-\d{2}-\d{2}'", content))
    fixed = len(re.findall(pattern, content, flags=re.DOTALL))

    print(f"[DIARY] Total: {total}, Fixed: {fixed}")
    return fixed

def fix_ai_news():
    """修复AI新闻的英文字段"""
    news_file = Path('src/data/ai-news-summary.ts')
    content = news_file.read_text(encoding='utf-8')

    # 匹配没有英文字段的新闻条目
    pattern = r'(\{\s*"date": "(\d{4}-\d{2}-\d{2})",\s*"title": "([^"]+)",\s*"summary": "([^"]+)",)'

    def add_english(match):
        full_match = match.group(1)
        date = match.group(2)
        title = match.group(3)
        summary = match.group(4)

        title_en = f"AI News | {date}"
        summary_en = f"AI news summary for {date}."

        # 构建新的条目，添加英文字段
        new_entry = f'''{{
  "date": "{date}",
  "title": "{title}",
  "titleEn": "{title_en}",
  "summary": "{summary}",
  "summaryEn": "{summary_en}",'''

        return new_entry

    # 替换所有匹配项
    new_content = re.sub(pattern, add_english, content, flags=re.DOTALL)

    # 写回文件
    news_file.write_text(new_content, encoding='utf-8')

    # 统计
    total = len(re.findall(r'"date": "\d{4}-\d{2}-\d{2}"', content))
    fixed = len(re.findall(pattern, content, flags=re.DOTALL))

    print(f"[NEWS] Total: {total}, Fixed: {fixed}")
    return fixed

if __name__ == '__main__':
    print("=" * 60)
    print("Fixing Missing English Fields")
    print("=" * 60)
    print()

    diary_fixed = fix_diaries()
    news_fixed = fix_ai_news()

    print()
    print(f"[OK] Fixed {diary_fixed} diaries and {news_fixed} news")
    print("=" * 60)
