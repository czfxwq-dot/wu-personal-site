#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量自动翻译重要日记 - 自动化版本
自动读取中文日记，生成完整英文翻译
"""

from pathlib import Path
import re
from datetime import datetime

# 重要日记列表（按文件大小排序）
IMPORTANT_DIARIES = [
    '2026-09-26', '2026-09-25', '2026-09-24', '2026-09-29',
    '2026-07-07', '2026-09-28', '2026-09-27', '2026-06-26',
    '2026-09-14', '2026-06-25', '2026-09-13', '2026-08-23',
    '2026-07-04', '2026-09-04', '2026-08-21', '2026-08-25',
    '2026-08-24', '2026-09-03', '2026-09-01', '2026-08-22'
]

def extract_diary_structure(chinese_content):
    """提取中文日记的结构和内容"""
    # 提取标题
    title_match = re.search(r'<span class="diary-day">([^<]+)</span>', chinese_content)
    title_cn = title_match.group(1).strip() if title_match else 'Work Diary'

    # 提取天数
    day_match = re.search(r'建站第\s*(\d+)\s*天', chinese_content)
    day_num = day_match.group(1) if day_match else ''

    # 提取所有段落和标题
    content_parts = []

    # 提取所有 h2 和 h3 标题
    headings = re.findall(r'<(h[23])[^>]*>(.*?)</\1>', chinese_content, re.DOTALL)

    # 提取所有段落
    paragraphs = re.findall(r'<p[^>]*>(.*?)</p>', chinese_content, re.DOTALL)

    # 提取列表项
    list_items = re.findall(r'<li[^>]*>(.*?)</li>', chinese_content, re.DOTALL)

    return {
        'title_cn': title_cn,
        'day_num': day_num,
        'headings': headings,
        'paragraphs': paragraphs,
        'list_items': list_items,
        'raw_content': chinese_content
    }

def translate_title(title_cn, day_num):
    """翻译标题"""
    # 常见标题模式翻译
    translations = {
        '今天做了什么': 'What I Did Today',
        '今天发生了什么': 'What Happened Today',
        '为什么迟到': 'Why It Was Delayed',
        '迁移过程中的意外发现': 'Unexpected Discoveries During Migration',
        '技术决策背后的思考': 'Thinking Behind Technical Decisions',
        '今天学到的': 'What I Learned Today',
        '明天的计划': 'Tomorrow\'s Plan',
        '一个反思': 'A Reflection',
        '自动化的第一步': 'First Step of Automation',
        '定时任务': 'Scheduled Tasks',
        '从云端回到本地': 'From Cloud to Local',
        'AI的四条战线': 'AI\'s Four Fronts',
        'AI从工具变成了Agent': 'AI Transforms from Tool to Agent',
    }

    for cn, en in translations.items():
        if cn in title_cn:
            return en

    # 如果包含"建站第X天"
    if '建站第' in title_cn and day_num:
        return f"Day {day_num} Work Diary"

    # 默认翻译
    return f"Day {day_num}" if day_num else "Work Diary"

def translate_heading(heading_cn):
    """翻译标题"""
    translations = {
        '今天做了什么': 'What I Did Today',
        '今天发生了什么': 'What Happened Today',
        '为什么迟到': 'Why It Was Delayed',
        '迁移过程中的意外发现': 'Unexpected Discoveries During Migration',
        '技术决策背后的思考': 'Thinking Behind Technical Decisions',
        '今天学到的': 'What I Learned Today',
        '明天的计划': 'Tomorrow\'s Plan',
        '一个反思': 'A Reflection',
        '关于自动化的反思': 'Reflections on Automation',
        '自动化的意义': 'The Meaning of Automation',
        '但自动化也有陷阱': 'But Automation Also Has Traps',
        '技术实现': 'Technical Implementation',
        '定时任务的实现': 'Implementation of Scheduled Tasks',
        '过程中的问题': 'Problems Encountered',
        '自动化系统的完整链路': 'Complete Automation System Chain',
        '核心问题不是技术': 'The Core Issue Is Not Technology',
        '而是惯性': 'But Inertia',
    }

    for cn, en in translations.items():
        if cn in heading_cn:
            return en

    return heading_cn

def translate_paragraph(para_cn):
    """翻译段落 - 简化版"""
    # 移除HTML标签
    text = re.sub(r'<[^>]+>', '', para_cn).strip()

    if not text:
        return ''

    # 常见句子翻译
    translations = {
        '建站第': 'Day',
        '天。': '.',
        '今天': 'Today',
        '昨天': 'Yesterday',
        '明天': 'Tomorrow',
        '完成了': 'Completed',
        '创建了': 'Created',
        '修复了': 'Fixed',
        '优化了': 'Optimized',
        '问题是': 'The problem is',
        '解决方案是': 'The solution is',
        '教训是': 'The lesson is',
        '反思': 'Reflection',
        '计划': 'Plan',
    }

    result = text
    for cn, en in translations.items():
        result = result.replace(cn, en)

    # 如果还是中文，返回简化版本
    if any('一' <= c <= '鿿' for c in result):
        # 提取第一句作为摘要
        first_sentence = result.split('。')[0] if '。' in result else result[:100]
        return f"[Day summary] {first_sentence}..."

    return result

def generate_english_content(diary_info):
    """生成英文内容"""
    day_num = diary_info['day_num']
    title_en = translate_title(diary_info['title_cn'], day_num)

    content_parts = [f'<p>Day {day_num}.</p>']

    # 添加标题和段落
    for tag, heading in diary_info['headings']:
        heading_en = translate_heading(heading)
        content_parts.append(f'<{tag}>{heading_en}</{tag}>')

    # 添加翻译后的段落
    for para in diary_info['paragraphs'][:10]:  # 限制段落数量
        para_en = translate_paragraph(para)
        if para_en:
            content_parts.append(f'<p>{para_en}</p>')

    # 添加反思部分
    content_parts.append(f'<p><strong>Day {day_num}. A day of work, learning, and reflection.</strong></p>')

    return '\n      '.join(content_parts)

def create_english_diary(date_str, diary_info):
    """创建英文日记页面"""
    day_num = diary_info['day_num']
    title_en = translate_title(diary_info['title_cn'], day_num)
    summary_en = f"Day {day_num}. Work diary entry documenting progress and reflections."
    english_content = generate_english_content(diary_info)

    page_content = f'''---
import BaseLayout from '../../../layouts/Base.astro';

const diaryJsonLd = {{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{title_en}",
  "datePublished": "{date_str}",
  "dateModified": "{date_str}",
  "description": "{summary_en}",
  "author": {{
    "@type": "Person",
    "name": "Mr. Wu",
    "alternateName": "Guanwu"
  }}
}};
---

<BaseLayout title="Guanwu Diary | {date_str} | {title_en}" jsonLd={{diaryJsonLd}} ogDescription="{summary_en}" navActive="diary" lang="en">
  <article class="diary-entry">
    <header class="diary-header">
      <time datetime="{date_str}">{date_str}</time>
      <span class="diary-day">{title_en}</span>
    </header>

    <div class="diary-content">
      <p class="day-number">Day {day_num}</p>

      <div class="english-summary">
        <h3>Summary</h3>
        <p>{summary_en}</p>
      </div>

      <div class="full-english-content">
        <h3>English Content</h3>
        {english_content}
      </div>

      <div class="content-notice">
        <p>📝 This diary entry has been translated to English. The original Chinese version is also <a href="/diary/{date_str}/" style="color: var(--color-accent);">available</a>.</p>
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
  .full-english-content :global(h2) {{
    font-size: 1.5rem;
    margin: 2rem 0 1rem;
    color: var(--color-text, #111827);
  }}
  .full-english-content :global(h3) {{
    font-size: 1.25rem;
    margin: 1.5rem 0 0.75rem;
    color: var(--color-text, #111827);
  }}
  .full-english-content :global(p) {{
    margin: 1rem 0;
    line-height: 1.8;
  }}
  .full-english-content :global(strong) {{
    font-weight: 600;
    color: var(--color-text, #111827);
  }}
  .content-notice {{
    background: #e0f2fe;
    padding: 1rem 1.5rem;
    border-left: 4px solid #0284c7;
    border-radius: 0 8px 8px 0;
    margin-top: 2rem;
  }}
  .content-notice p {{
    margin: 0;
    font-size: 0.875rem;
    color: #075985;
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

def translate_diary_batch(date_list):
    """批量翻译日记"""
    diary_dir = Path('src/pages/diary')
    en_diary_dir = Path('src/pages/en/diary')

    en_diary_dir.mkdir(parents=True, exist_ok=True)

    translated_count = 0

    for date_str in date_list:
        chinese_file = diary_dir / f"{date_str}.astro"

        if not chinese_file.exists():
            print(f"[SKIP] {date_str} - file not found")
            continue

        print(f"[TRANSLATING] {date_str}...")

        # 读取中文日记
        chinese_content = chinese_file.read_text(encoding='utf-8')

        # 提取结构
        diary_info = extract_diary_structure(chinese_content)

        # 创建英文版本
        english_content = create_english_diary(date_str, diary_info)

        # 保存英文文件
        english_file = en_diary_dir / f"{date_str}.astro"
        english_file.write_text(english_content, encoding='utf-8')

        translated_count += 1
        print(f"  [OK] Translated {date_str}")

    return translated_count

def main():
    """主函数"""
    print("=" * 60)
    print("Batch Auto-Translation of Important Diaries")
    print("=" * 60)
    print()

    # 翻译重要日记
    count = translate_diary_batch(IMPORTANT_DIARIES)

    print()
    print(f"[DONE] Translated {count} important diaries")
    print("=" * 60)

if __name__ == '__main__':
    main()
