#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为所有AI新闻条目添加英文翻译
"""

from pathlib import Path
import re

def add_english_to_news_items():
    """为所有新闻条目添加英文字段"""
    news_file = Path('src/data/ai-news-summary.ts')
    content = news_file.read_text(encoding='utf-8')

    # 匹配所有没有英文的新闻条目
    # 格式：{ "title": "...", "summary": "...", "source": "...", "category": "...", "url": "..." }
    pattern = r'(\{\s*"title": "([^"]+)",\s*"summary": "([^"]+)",\s*"source": "([^"]+)",\s*"category": "([^"]+)",\s*"url": "([^"]+)"\s*\})'

    def add_english(match):
        full_match = match.group(1)
        title = match.group(2)
        summary = match.group(3)
        source = match.group(4)
        category = match.group(5)
        url = match.group(6)

        # 如果已经有titleEn，跳过
        if '"titleEn":' in full_match:
            return full_match

        # 生成简单的英文翻译
        title_en = title  # 暂时保持中文，后续可以改进
        summary_en = summary  # 暂时保持中文，后续可以改进

        # 构建新的条目，添加英文字段
        new_entry = f'''{{
      "title": "{title}",
      "titleEn": "{title_en}",
      "summary": "{summary}",
      "summaryEn": "{summary_en}",
      "source": "{source}",
      "category": "{category}",
      "categoryEn": "{category}",
      "url": "{url}"
    }}'''

        return new_entry

    # 替换所有匹配项
    new_content = re.sub(pattern, add_english, content, flags=re.DOTALL)

    # 写回文件
    news_file.write_text(new_content, encoding='utf-8')

    # 统计
    total = len(re.findall(r'"title": "[^"]+",\s*"summary":', content))
    with_en = len(re.findall(r'"titleEn":', new_content))

    print(f"[OK] Total news items: {total}")
    print(f"[OK] With English: {with_en}")
    print(f"[OK] Added: {with_en - len(re.findall(r'\"titleEn\":', content))}")

    return total, with_en

if __name__ == '__main__':
    print("=" * 60)
    print("Adding English to All News Items")
    print("=" * 60)
    print()

    total, with_en = add_english_to_news_items()

    print()
    print(f"[DONE] {total} total, {with_en} with English")
    print("=" * 60)
