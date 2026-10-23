#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量创建英文日记文件 - 实用版本
使用已有的英文标题和摘要，创建完整的英文日记页面
"""

from pathlib import Path
import re
from datetime import datetime

def get_english_metadata(date_str):
    """从diaries.ts获取英文元数据"""
    diaries_file = Path('src/data/diaries.ts')
    content = diaries_file.read_text(encoding='utf-8')

    # 查找该日期的条目
    pattern = rf"date: '{date_str}',\s*title: `([^`]+)`,\s*titleEn: `([^`]+)`,\s*summary: `([^`]+)`,\s*summaryEn: `([^`]+)`,"
    match = re.search(pattern, content, re.DOTALL)

    if match:
        return {
            'title_cn': match.group(1),
            'title_en': match.group(2),
            'summary_cn': match.group(3),
            'summary_en': match.group(4),
        }
    return None

def extract_chinese_content(file_path):
    """提取中文日记的HTML内容"""
    content = file_path.read_text(encoding='utf-8')

    # 尝试多种匹配模式
    # 模式1：diary-content到footer
    match = re.search(r'<div class="diary-content">(.*?)</div>\s*<footer', content, re.DOTALL)
    if match:
        return match.group(1).strip()

    # 模式2：diary-content到diary-footer
    match = re.search(r'<div class="diary-content">(.*?)</div>\s*<div class="diary-footer', content, re.DOTALL)
    if match:
        return match.group(1).strip()

    # 模式3：更宽松的匹配
    match = re.search(r'class="diary-content">(.*?)<footer', content, re.DOTALL)
    if match:
        return match.group(1).strip()

    return ''

def create_english_diary_page(date_str, metadata, chinese_content):
    """创建英文日记页面"""

    # 计算建站天数
    start_date = datetime(2026, 4, 29)
    current_date = datetime.strptime(date_str, '%Y-%m-%d')
    day_num = (current_date - start_date).days + 1

    # 将中文内容转换为英文版本
    # 保留HTML结构，但添加英文提示
    english_content = f'''
      <p class="day-number">Day {day_num}</p>

      <div class="english-summary">
        <h3>Summary</h3>
        <p>{metadata['summary_en']}</p>
      </div>

      <div class="content-notice">
        <p>📝 The full detailed content of this diary entry is in Chinese. Below is the original content for reference. Complete English translation will be added progressively.</p>
      </div>

      <div class="original-content">
        <h3>Original Chinese Content</h3>
        {chinese_content}
      </div>
    '''

    file_content = f'''---
import BaseLayout from '../../../layouts/Base.astro';

const diaryJsonLd = {{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{metadata['title_en']}",
  "datePublished": "{date_str}",
  "dateModified": "{date_str}",
  "description": "{metadata['summary_en']}",
  "author": {{
    "@type": "Person",
    "name": "Mr. Wu",
    "alternateName": "Guanwu"
  }}
}};
---

<BaseLayout title="Guanwu Diary | {date_str} | {metadata['title_en']}" jsonLd={{diaryJsonLd}} ogDescription="{metadata['summary_en']}" navActive="diary" lang="en">
  <article class="diary-entry">
    <header class="diary-header">
      <time datetime="{date_str}">{date_str}</time>
      <span class="diary-day">{metadata['title_en']}</span>
    </header>

    <div class="diary-content">
      {english_content}
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
  .content-notice {{
    background: #fef3c7;
    padding: 1rem 1.5rem;
    border-left: 4px solid #f59e0b;
    border-radius: 0 8px 8px 0;
    margin-bottom: 2rem;
  }}
  .content-notice p {{
    margin: 0;
    font-size: 0.875rem;
    color: #92400e;
  }}
  .original-content {{
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border-color, #e5e7eb);
  }}
  .original-content h3 {{
    font-size: 1.125rem;
    margin-bottom: 1rem;
    color: var(--text-secondary, #6b7280);
  }}
  .diary-content :global(h2) {{
    font-size: 1.5rem;
    margin: 2rem 0 1rem;
  }}
  .diary-content :global(p) {{
    margin: 1rem 0;
  }}
  .diary-content :global(ul),
  .diary-content :global(ol) {{
    margin: 1rem 0;
    padding-left: 2rem;
  }}
  .diary-content :global(li) {{
    margin: 0.5rem 0;
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

    return file_content

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
    created_count = 0
    skipped_count = 0

    for i, diary_file in enumerate(diary_files, 1):
        date_str = diary_file.stem

        # 检查是否已有英文文件
        en_file = en_diary_dir / f"{date_str}.astro"
        if en_file.exists():
            print(f"[{i}/{len(diary_files)}] Skipping {date_str} (already exists)")
            skipped_count += 1
            continue

        print(f"[{i}/{len(diary_files)}] Processing {date_str}...")

        # 获取英文元数据
        metadata = get_english_metadata(date_str)
        if not metadata:
            print(f"  [WARN] No metadata found, using defaults")
            metadata = {
                'title_cn': f'Diary {date_str}',
                'title_en': f'Diary {date_str}',
                'summary_cn': 'Work diary',
                'summary_en': 'Work diary',
            }

        # 提取中文内容
        chinese_content = extract_chinese_content(diary_file)
        if not chinese_content:
            print(f"  [WARN] No content found")
            continue

        # 创建英文版本
        en_content = create_english_diary_page(date_str, metadata, chinese_content)

        # 保存英文文件
        en_file.write_text(en_content, encoding='utf-8')
        created_count += 1

        print(f"  [OK] Created {en_file}")

    print()
    print(f"[DONE] Created {created_count} files, skipped {skipped_count} files")

if __name__ == '__main__':
    main()
