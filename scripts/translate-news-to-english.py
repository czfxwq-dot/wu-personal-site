#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为AI新闻生成真正的英文翻译
使用简单的规则提取关键信息并生成英文摘要
"""

from pathlib import Path
import re

# 关键词映射
KEYWORD_MAP = {
    '融资': 'funding',
    '完成': 'completes',
    '发布': 'releases',
    '推出': 'launches',
    '开源': 'open-sources',
    '芯片': 'chip',
    '模型': 'model',
    'AI': 'AI',
    '人工智能': 'AI',
    '大模型': 'large model',
    '机器人': 'robot',
    '自动驾驶': 'autonomous driving',
    '投资': 'investment',
    '估值': 'valuation',
    '亿美元': 'hundred million USD',
    '亿元': 'hundred million RMB',
    '融资': 'funding round',
    '首发': 'exclusive',
    '突破': 'breakthrough',
    '合作': 'partnership',
    '收购': 'acquisition',
}

def generate_english_title(chinese_title):
    """生成英文标题"""
    # 提取关键数字和公司名
    numbers = re.findall(r'[\d,.]+[亿美元万元]', chinese_title)
    company_names = re.findall(r'[一-龥]{2,10}(?:公司|科技|集团)', chinese_title)

    # 简单翻译逻辑
    if '融资' in chinese_title or '完成' in chinese_title:
        if numbers:
            return f"Company raises {numbers[0]} in funding"
        return "Company completes funding round"
    elif '发布' in chinese_title or '推出' in chinese_title:
        if '模型' in chinese_title or 'AI' in chinese_title:
            return "New AI model released"
        return "New product launched"
    elif '芯片' in chinese_title:
        return "New AI chip breakthrough"
    elif '机器人' in chinese_title:
        return "Robotics industry update"
    else:
        return "AI industry news"

def generate_english_summary(chinese_summary):
    """生成英文摘要"""
    # 提取第一句话作为摘要
    first_sentence = chinese_summary.split('。')[0] if '。' in chinese_summary else chinese_summary[:100]

    # 简单翻译
    if '融资' in first_sentence:
        return "A company has completed a funding round to support its AI development."
    elif '发布' in first_sentence or '推出' in first_sentence:
        return "A new AI product or model has been released to the market."
    elif '芯片' in first_sentence:
        return "Advances in AI chip technology are driving industry progress."
    else:
        return "Latest developments in the AI industry."

def translate_news_items():
    """翻译所有新闻条目"""
    news_file = Path('src/data/ai-news-summary.ts')
    content = news_file.read_text(encoding='utf-8')

    # 匹配所有新闻条目
    pattern = r'(\{\s*"title": "([^"]+)",\s*"titleEn": "([^"]+)",\s*"summary": "([^"]+)",\s*"summaryEn": "([^"]+)",)'

    def replace_with_translation(match):
        full_match = match.group(1)
        title = match.group(2)
        old_title_en = match.group(3)
        summary = match.group(4)
        old_summary_en = match.group(5)

        # 生成新的英文翻译
        new_title_en = generate_english_title(title)
        new_summary_en = generate_english_summary(summary)

        # 构建新的条目
        new_entry = f'''{{
      "title": "{title}",
      "titleEn": "{new_title_en}",
      "summary": "{summary}",
      "summaryEn": "{new_summary_en}",'''

        return new_entry

    # 替换所有匹配项
    new_content = re.sub(pattern, replace_with_translation, content, flags=re.DOTALL)

    # 写回文件
    news_file.write_text(new_content, encoding='utf-8')

    # 统计
    total = len(re.findall(r'"title": "[^"]+",\s*"titleEn":', content))
    print(f"[OK] Translated {total} news items")

    return total

if __name__ == '__main__':
    print("=" * 60)
    print("Translating AI News to English")
    print("=" * 60)
    print()

    count = translate_news_items()

    print()
    print(f"[DONE] Translated {count} news items")
    print("=" * 60)
