#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
完整翻译计划 - 为所有日记创建英文版本
按照月份分批处理
"""

from pathlib import Path
import re
from datetime import datetime

def read_chinese_diary(date_str):
    """读取中文日记内容"""
    diary_path = Path(f'src/pages/diary/{date_str}.astro')
    if not diary_path.exists():
        return None

    content = diary_path.read_text(encoding='utf-8')

    # 提取标题
    title_match = re.search(r'headline": "([^"]+)"', content)
    title_cn = title_match.group(1) if title_match else f'Diary {date_str}'

    # 提取描述
    desc_match = re.search(r'description": "([^"]+)"', content)
    desc_cn = desc_match.group(1) if desc_match else ''

    # 提取天数
    day_match = re.search(r'建站第\s*(\d+)\s*天', content)
    day_num = day_match.group(1) if day_match else ''

    return {
        'title_cn': title_cn,
        'desc_cn': desc_cn,
        'day_num': day_num,
        'content': content
    }

def translate_title_simple(title_cn):
    """简单翻译标题"""
    # 提取关键数字和主题
    if '建站第' in title_cn:
        day_match = re.search(r'建站第\s*(\d+)\s*天', title_cn)
        if day_match:
            day_num = day_match.group(1)
            # 提取冒号后的内容
            if '——' in title_cn:
                subtitle = title_cn.split('——')[-1].strip()
                return f"Day {day_num}: {translate_keywords(subtitle)}"
            return f"Day {day_num} Work Diary"

    return translate_keywords(title_cn)

def translate_keywords(text):
    """翻译关键词"""
    translations = {
        'AI': 'AI',
        '算力': 'Computing Power',
        '模型': 'Model',
        '芯片': 'Chip',
        '融资': 'Funding',
        '投资': 'Investment',
        '估值': 'Valuation',
        '亿美元': 'Billion USD',
        '亿港元': 'Billion HKD',
        '亿元': 'Billion RMB',
        '机器人': 'Robot',
        '自动驾驶': 'Autonomous Driving',
        '大模型': 'Large Model',
        '开源': 'Open Source',
        '价格战': 'Price War',
        '基础设施': 'Infrastructure',
        '数据中心': 'Data Center',
        '电池': 'Battery',
        '订单': 'Orders',
        '深水区': 'Deep Water',
        '工程化': 'Engineering',
        '产业化': 'Industrialization',
        '治理': 'Governance',
        '安全': 'Safety',
        '监管': 'Regulation',
        '政策': 'Policy',
        '对话': 'Dialogue',
        '收购': 'Acquisition',
        '发布': 'Release',
        '推出': 'Launch',
        '突破': 'Breakthrough',
        '创新': 'Innovation',
        '竞争': 'Competition',
        '市场': 'Market',
        '行业': 'Industry',
        '技术': 'Technology',
        '应用': 'Application',
        '场景': 'Scenario',
        '落地': 'Implementation',
        '产品': 'Product',
        '平台': 'Platform',
        '生态': 'Ecosystem',
    }

    result = text
    for cn, en in translations.items():
        result = result.replace(cn, en)

    return result

def create_english_diary_page(date_str, diary_info):
    """创建英文日记页面"""
    title_cn = diary_info['title_cn']
    desc_cn = diary_info['desc_cn']
    day_num = diary_info['day_num']

    # 翻译标题和描述
    title_en = translate_title_simple(title_cn)
    desc_en = translate_keywords(desc_cn)

    # 如果没有天数，使用日期
    if not day_num:
        date_obj = datetime.strptime(date_str, '%Y-%m-%d')
        start_date = datetime(2026, 4, 29)
        day_num = str((date_obj - start_date).days + 1)

    # 创建简单的英文内容
    content = f'''<p>Day {day_num}.</p>

    <p>{desc_en}</p>

    <div class="content-notice">
        <p>📝 This is a summary of the diary entry. The full detailed content is available in the <a href="/diary/{date_str}/" style="color: var(--color-accent);">Chinese version</a>.</p>
    </div>'''

    page_content = f'''---
import BaseLayout from '../../../layouts/Base.astro';

const diaryJsonLd = {{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{title_en}",
  "datePublished": "{date_str}",
  "dateModified": "{date_str}",
  "description": "{desc_en}",
  "author": {{
    "@type": "Person",
    "name": "Mr. Wu",
    "alternateName": "Guanwu"
  }}
}};
---

<BaseLayout title="Guanwu Diary | {date_str} | {title_en}" jsonLd={{diaryJsonLd}} ogDescription="{desc_en}" navActive="diary" lang="en">
  <article class="diary-entry">
    <header class="diary-header">
      <time datetime="{date_str}">{date_str}</time>
      <span class="diary-day">{title_en}</span>
    </header>

    <div class="diary-content">
      <p class="day-number">Day {day_num}</p>

      <div class="english-summary">
        <h3>Summary</h3>
        <p>{desc_en}</p>
      </div>

      <div class="full-english-content">
        <h3>English Content</h3>
        {content}
      </div>
    </div>

    <footer class="diary-footer">
      <nav class="diary-nav">
        <a href="/en/diary/" class="nav-back">← Back to Diary List</a>
      </nav>
    </footer>
  </article>
</BaseLayout>

<style>
  .diary-entry {{
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }}
  .diary-header {{
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--border-color, #e5e7eb);
    padding-bottom: 1rem;
  }}
  .diary-header time {{
    display: block;
    font-size: 0.875rem;
    color: var(--text-secondary, #6b7280);
    margin-bottom: 0.5rem;
  }}
  .diary-day {{
    display: inline-block;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary, #111827);
    margin-top: 0.5rem;
  }}
  .day-number {{
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-accent, #3b82f6);
    margin-bottom: 1.5rem;
  }}
  .diary-content {{
    line-height: 1.8;
  }}
  .english-summary {{
    background: var(--color-bg, #f9fafb);
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    border-left: 4px solid var(--color-accent, #3b82f6);
  }}
  .english-summary h3 {{
    font-size: 1.25rem;
    margin: 0 0 1rem 0;
    color: var(--color-accent, #3b82f6);
  }}
  .english-summary p {{
    margin: 0;
    font-size: 1rem;
    line-height: 1.6;
  }}
  .full-english-content {{
    margin-bottom: 2rem;
  }}
  .full-english-content h3 {{
    font-size: 1.25rem;
    margin: 0 0 1rem 0;
    color: var(--color-text, #111827);
  }}
  .full-english-content :global(p) {{
    margin: 1rem 0;
    line-height: 1.8;
  }}
  .content-notice {{
    background: #fef3c7;
    padding: 1rem 1.5rem;
    border-left: 4px solid #f59e0b;
    border-radius: 0 8px 8px 0;
    margin: 2rem 0;
  }}
  .content-notice p {{
    margin: 0;
    font-size: 0.875rem;
    color: #92400e;
  }}
  .diary-footer {{
    margin-top: 3rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color, #e5e7eb);
  }}
  .nav-back {{
    color: var(--text-secondary, #6b7280);
    text-decoration: none;
  }}
  .nav-back:hover {{
    color: var(--text-primary, #111827);
  }}
</style>
'''

    return page_content

def translate_month(month_prefix):
    """翻译一个月的日记"""
    diary_dir = Path('src/pages/diary')
    en_diary_dir = Path('src/pages/en/diary')

    # 获取该月的所有日记
    month_diaries = sorted(diary_dir.glob(f'{month_prefix}*.astro'))

    print(f"\n[INFO] Translating {len(month_diaries)} diaries for {month_prefix}")

    translated_count = 0
    for diary_file in month_diaries:
        date_str = diary_file.stem

        # 读取中文日记
        diary_info = read_chinese_diary(date_str)
        if not diary_info:
            print(f"  [SKIP] {date_str} - file not found")
            continue

        # 创建英文版本
        en_content = create_english_diary_page(date_str, diary_info)

        # 保存英文文件
        en_file = en_diary_dir / f"{date_str}.astro"
        en_file.write_text(en_content, encoding='utf-8')

        translated_count += 1
        print(f"  [OK] {date_str}")

    return translated_count

def main():
    """主函数 - 执行完整翻译计划"""
    print("=" * 60)
    print("Complete English Translation Plan")
    print("=" * 60)

    total_translated = 0

    # 按月份翻译
    months = [
        '2026-09',  # 9月（继续）
        '2026-08',  # 8月
        '2026-07',  # 7月
        '2026-06',  # 6月
        '2026-05',  # 5月
        '2026-04',  # 4月
    ]

    for month in months:
        count = translate_month(month)
        total_translated += count
        print(f"[DONE] {month}: {count} diaries translated")

    print()
    print("=" * 60)
    print(f"[COMPLETE] Total translated: {total_translated} diaries")
    print("=" * 60)

if __name__ == '__main__':
    main()
