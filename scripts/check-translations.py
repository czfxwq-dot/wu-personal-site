#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
检查需要英文翻译的文章
"""

import re
import sys
from pathlib import Path

# 设置输出编码
if sys.platform.startswith('win'):
    sys.stdout.reconfigure(encoding='utf-8')

def check_translations():
    articles_file = Path('src/data/articles.ts')
    content = articles_file.read_text(encoding='utf-8')

    # 提取所有文章
    pattern = r"slug: '([^']+)',.*?title: `([^`]+)`.*?titleEn: `([^`]*)`"
    matches = re.findall(pattern, content, re.DOTALL)

    needs_translation = []
    for slug, title, title_en in matches:
        # 检查英文标题是否是中文的简单复制
        has_chinese = any('一' <= c <= '鿿' for c in title_en)
        if not title_en or title_en == title or has_chinese:
            needs_translation.append((slug, title))

    print(f'需要英文翻译的文章: {len(needs_translation)} 篇')
    print()

    # 按类别分组
    categories = {
        'AI观点': [],
        'AI前沿': [],
        'AI应用': [],
        'AI产业': [],
        'AI趋势': [],
        '其他': []
    }

    for slug, title in needs_translation:
        # 简单分类
        if '观点' in slug or 'opinion' in slug.lower():
            categories['AI观点'].append((slug, title))
        elif '前沿' in slug or 'frontier' in slug.lower() or 'breakthrough' in slug.lower():
            categories['AI前沿'].append((slug, title))
        elif '应用' in slug or 'application' in slug.lower() or 'use' in slug.lower():
            categories['AI应用'].append((slug, title))
        elif '产业' in slug or 'industry' in slug.lower():
            categories['AI产业'].append((slug, title))
        elif '趋势' in slug or 'trend' in slug.lower():
            categories['AI趋势'].append((slug, title))
        else:
            categories['其他'].append((slug, title))

    for category, articles in categories.items():
        if articles:
            print(f'[{category}] {len(articles)} 篇')
            for i, (slug, title) in enumerate(articles[:5], 1):
                # 截断标题避免编码问题
                safe_title = title.encode('ascii', 'ignore').decode('ascii')[:50]
                print(f'  {i}. {slug}')
            if len(articles) > 5:
                print(f'  ... 还有 {len(articles) - 5} 篇')
            print()

    return needs_translation

if __name__ == '__main__':
    check_translations()
