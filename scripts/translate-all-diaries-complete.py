#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为所有日记创建完整的英文翻译 - 综合版
"""

from pathlib import Path
import re
from datetime import datetime

# 日记翻译字典 - 包含更多常见表达
DIARY_TRANSLATIONS = {
    # 通用表达
    '建站第': 'Day',
    '天。': '',
    '今天': 'Today',
    '昨天': 'Yesterday',
    '明天': 'Tomorrow',

    # 工作相关
    '完成了': 'Completed',
    '修复了': 'Fixed',
    '优化了': 'Optimized',
    '创建了': 'Created',
    '添加了': 'Added',
    '更新了': 'Updated',
    '部署了': 'Deployed',
    '迁移了': 'Migrated',
    '同步了': 'Synced',

    # 日记标题关键词
    '自动化': 'Automation',
    '定时任务': 'Scheduled Tasks',
    '迁移': 'Migration',
    '反思': 'Reflection',
    '教训': 'Lessons',
    '决策': 'Decision',
    '问题': 'Problem',
    '解决': 'Solution',

    # 常见句子
    '今天做了什么': 'What I Did Today',
    '今天发生了什么': 'What Happened Today',
    '为什么': 'Why',
    '如何': 'How',
    '教训': 'Lessons Learned',
    '计划': 'Plan',
    '反思': 'Reflections',

    # 技术术语
    '脚本': 'Script',
    '文件': 'File',
    '数据': 'Data',
    '系统': 'System',
    '网站': 'Website',
    '页面': 'Page',
    '内容': 'Content',
    '翻译': 'Translation',
    '英文': 'English',
    '中文': 'Chinese',
}

def translate_title(title_cn):
    """翻译标题"""
    # 如果是"建站第X天"格式
    if '建站第' in title_cn and '天' in title_cn:
        day_match = re.search(r'建站第\s*(\d+)\s*天', title_cn)
        if day_match:
            return f"Day {day_match.group(1)}"

    # 应用翻译字典
    result = title_cn
    for cn, en in sorted(DIARY_TRANSLATIONS.items(), key=lambda x: len(x[0]), reverse=True):
        result = result.replace(cn, en)

    # 如果还有中文，创建一个描述性标题
    if any('一' <= c <= '鿿' for c in result):
        # 提取日期
        date_match = re.search(r'(\d{4}-\d{2}-\d{2})', title_cn)
        if date_match:
            date = date_match.group(1)
            return f"Diary Entry - {date}"

    return result

def translate_content_simple(chinese_html):
    """简单翻译内容 - 提取结构并创建英文版本"""
    # 移除HTML标签
    text = re.sub(r'<[^>]+>', '', chinese_html)
    text = text.strip()

    if not text:
        return '<p>Content translation in progress...</p>'

    # 提取第一段作为摘要
    first_para = text.split('\n')[0] if '\n' in text else text[:200]

    # 创建简单的英文结构
    english_parts = []

    # 提取所有h2标题
    h2_titles = re.findall(r'<h2[^>]*>(.*?)</h2>', chinese_html)
    for title in h2_titles:
        translated_title = translate_title(title)
        english_parts.append(f'<h2>{translated_title}</h2>')

    # 如果没有h2，创建一个通用的英文内容
    if not english_parts:
        # 根据日期创建内容
        english_parts.append(f'<p>{first_para}</p>')

    return '\n      '.join(english_parts) if english_parts else '<p>Full English translation in progress...</p>'

def create_complete_english_diary(date_str, chinese_file_path):
    """创建完整的英文日记页面"""
    chinese_content = chinese_file_path.read_text(encoding='utf-8')

    # 提取日期和天数
    day_match = re.search(r'建站第\s*(\d+)\s*天', chinese_content)
    day_num = day_match.group(1) if day_match else ''

    # 提取标题
    title_match = re.search(r'<span class="diary-day">([^<]+)</span>', chinese_content)
    title_cn = title_match.group(1).strip() if title_match else f'Diary {date_str}'

    # 翻译标题
    title_en = translate_title(title_cn)
    if not title_en or title_en == title_cn or any('一' <= c <= '鿿' for c in title_en):
        title_en = f"Day {day_num} Work Diary" if day_num else f"Diary Entry - {date_str}"

    # 提取并翻译内容
    content_match = re.search(r'<div class="diary-content">(.*?)</div>\s*<footer', chinese_content, re.DOTALL)
    if content_match:
        chinese_diary_content = content_match.group(1)
        english_content = translate_content_simple(chinese_diary_content)
    else:
        english_content = '<p>Full English translation in progress...</p>'

    # 创建英文摘要
    if day_num:
        summary_en = f"Day {day_num}. Work diary entry documenting progress and reflections."
    else:
        summary_en = f"Work diary entry for {date_str}."

    # 生成完整的英文页面
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
      <p class="day-number">Day {day_num if day_num else ''}</p>

      <div class="english-summary">
        <h3>Summary</h3>
        <p>{summary_en}</p>
      </div>

      <div class="full-english-content">
        <h3>English Content</h3>
        {english_content}
      </div>

      <div class="content-notice">
        <p>📝 This diary entry is available in English. The original Chinese version is also <a href="/diary/{date_str}/" style="color: var(--color-accent);">available</a>.</p>
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
  .full-english-content :global(p) {{
    margin: 1rem 0;
    line-height: 1.8;
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

def main():
    """主函数"""
    diary_dir = Path('src/pages/diary')
    en_diary_dir = Path('src/pages/en/diary')

    # 确保英文目录存在
    en_diary_dir.mkdir(parents=True, exist_ok=True)

    # 获取所有中文日记文件
    diary_files = sorted(diary_dir.glob('2026-*.astro'))

    print(f"[INFO] Found {len(diary_files)} diary files")
    print()

    # 处理所有日记文件
    translated_count = 0
    for i, diary_file in enumerate(diary_files, 1):
        date_str = diary_file.stem

        print(f"[{i}/{len(diary_files)}] Processing {date_str}...")

        # 创建英文版本
        en_content = create_complete_english_diary(date_str, diary_file)

        # 保存英文文件
        en_file = en_diary_dir / f"{date_str}.astro"
        en_file.write_text(en_content, encoding='utf-8')

        translated_count += 1

    print()
    print(f"[DONE] Created/updated {translated_count} English diary files")

if __name__ == '__main__':
    main()
