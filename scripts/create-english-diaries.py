#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量创建英文日记文件
读取中文日记，提取内容，创建对应的英文版本
"""

from pathlib import Path
import re
from datetime import datetime

# 简单的翻译字典（常用词汇）
TRANSLATIONS = {
    '建站第': 'Day',
    '天': '',
    '今天': 'Today',
    '昨天': 'Yesterday',
    '明天': 'Tomorrow',
    '发生了什么': 'What Happened',
    '为什么': 'Why',
    '事情会失控': 'Things Got Out of Control',
    '第一个错误': 'First Mistake',
    '第二个错误': 'Second Mistake',
    '第三个错误': 'Third Mistake',
    '学到的教训': 'Lessons Learned',
    '关于': 'About',
    '的反思': ' Reflection',
    '自动化': 'Automation',
    '明天的计划': 'Plan for Tomorrow',
    '核心问题': 'Core Issue',
    '不是技术': 'Not Technology',
    '而是惯性': 'But Inertia',
    '迁移': 'Migration',
    '过程中的': ' in the Process',
    '意外发现': 'Unexpected Discoveries',
    '技术决策': 'Technical Decisions',
    '背后的思考': ' Behind',
    '选择': 'Choice',
    ' Claude Code ': ' Claude Code ',
    '而不是': ' Instead of',
    '继续用': ' Continuing with',
    '本地': 'Local',
    '云端': 'Cloud',
    '控制权': 'Control',
    '和成本': ' and Cost',
    '零额外成本': 'Zero additional cost',
    '只需要电费': 'only electricity needed',
    '完全的数据控制': 'Complete data control',
    '所有文件都在本地': 'all files are local',
    '更快的响应速度': 'Faster response speed',
    '不需要网络往返': 'no network round trips',
    '更简单的调试': 'Simpler debugging',
    '所有日志都在本地': 'all logs are local',
    '代价': 'Cost',
    '需要手动管理备份和同步': 'requires manual backup and sync management',
    '个人项目': 'personal project',
    '值得的': 'worth it',
}

def translate_text(text):
    """简单翻译（基于字典替换）"""
    result = text
    # 按长度排序，优先替换长词组
    sorted_keys = sorted(TRANSLATIONS.keys(), key=len, reverse=True)
    for key in sorted_keys:
        result = result.replace(key, TRANSLATIONS[key])
    return result

def extract_diary_content(file_path):
    """从.astro文件中提取日记内容"""
    content = file_path.read_text(encoding='utf-8')

    # 提取标题
    title_match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
    title = title_match.group(1).strip() if title_match else ''

    # 提取日期
    date_match = re.search(r'datetime="(\d{4}-\d{2}-\d{2})"', content)
    date = date_match.group(1) if date_match else file_path.stem

    # 提取日记正文内容
    content_match = re.search(r'<div class="diary-content">(.*?)</div>', content, re.DOTALL)
    diary_content = content_match.group(1).strip() if content_match else ''

    return date, title, diary_content

def create_english_diary(date, chinese_title, chinese_content):
    """创建英文日记文件"""

    # 简单翻译标题和内容
    english_title = translate_text(chinese_title)
    english_content = translate_text(chinese_content)

    # 计算建站天数
    start_date = datetime(2026, 4, 29)
    current_date = datetime.strptime(date, '%Y-%m-%d')
    day_num = (current_date - start_date).days + 1

    # 生成英文日记文件内容
    file_content = f'''---
import BaseLayout from '../../../layouts/Base.astro';

const diaryJsonLd = {{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{english_title}",
  "datePublished": "{date}",
  "dateModified": "{date}",
  "description": "Day {day_num} work diary",
  "author": {{
    "@type": "Person",
    "name": "Mr. Wu",
    "alternateName": "Guanwu"
  }}
}};
---

<BaseLayout title="Guanwu Diary | {date} | {english_title}" jsonLd={{diaryJsonLd}} ogDescription="Day {day_num} work diary" navActive="diary" lang="en">
  <article class="diary-entry">
    <header class="diary-header">
      <time datetime="{date}">{date}</time>
      <span class="diary-day">{english_title}</span>
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
    font-size: 0.875rem;
    color: var(--text-secondary, #6b7280);
    margin-top: 0.5rem;
  }}
  .diary-content {{
    line-height: 1.8;
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

    # 处理最近的10篇日记（先做一批看看效果）
    recent_files = diary_files[-10:]

    for i, diary_file in enumerate(recent_files, 1):
        date = diary_file.stem
        print(f"[{i}/{len(recent_files)}] Processing {date}...")

        # 提取内容
        date_str, title, content = extract_diary_content(diary_file)

        # 创建英文版本
        en_content = create_english_diary(date_str, title, content)

        # 保存英文文件
        en_file = en_diary_dir / f"{date_str}.astro"
        en_file.write_text(en_content, encoding='utf-8')

        print(f"  ✓ Created {en_file}")

    print()
    print(f"[DONE] Created {len(recent_files)} English diary files")

if __name__ == '__main__':
    main()
