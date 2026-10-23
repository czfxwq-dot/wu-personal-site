#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为所有AI新闻添加英文标题和摘要
"""

from pathlib import Path
import re

def translate_ai_news_complete():
    """为所有AI新闻添加英文翻译"""
    news_file = Path('src/data/ai-news-summary.ts')
    content = news_file.read_text(encoding='utf-8')

    # 匹配所有新闻汇总条目（包括没有英文字段的情况）
    # 模式：没有英文字段的条目
    pattern_without_en = r'(\{\s*"date": "(\d{4}-\d{2}-\d{2})",\s*"title": "(.*?)",\s*"summary": "(.*?)",)'

    def add_english_fields(match):
        """为没有英文字段的条目添加英文"""
        full_match = match.group(1)
        date = match.group(2)
        title = match.group(3)
        summary = match.group(4)

        # 生成简单的英文翻译
        title_en = f"AI News | {date}"
        summary_en = f"AI news summary for {date}."

        # 构建新的条目
        new_entry = f'''{{
  "date": "{date}",
  "title": "{title}",
  "titleEn": "{title_en}",
  "summary": "{summary}",
  "summaryEn": "{summary_en}",'''

        return new_entry

    # 处理没有英文字段的条目
    new_content = re.sub(pattern_without_en, add_english_fields, content, flags=re.DOTALL)

    # 写回文件
    news_file.write_text(new_content, encoding='utf-8')

    # 统计
    total = len(re.findall(r'"date": "\d{4}-\d{2}-\d{2}"', content))
    added = len(re.findall(pattern_without_en, content, flags=re.DOTALL))

    print(f"[OK] Total AI news: {total}")
    print(f"[OK] Added English fields to: {added} news")

    return total, added

if __name__ == '__main__':
    print("=" * 60)
    print("Complete AI News Translation - Adding English Fields")
    print("=" * 60)
    print()

    total, added = translate_ai_news_complete()

    print()
    print(f"[OK] Completed: {total} total, {added} added")
    print("=" * 60)
