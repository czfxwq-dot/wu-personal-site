#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
直接从中文日记文件生成完整的英文版本
不依赖 diaries.ts 数据文件
"""

from pathlib import Path
import re
from datetime import datetime

def extract_diary_info(file_path):
    """从中文日记文件提取信息"""
    content = file_path.read_text(encoding='utf-8')

    # 提取日期
    date_match = re.search(r'datetime="(\d{4}-\d{2}-\d{2})"', content)
    date = date_match.group(1) if date_match else file_path.stem

    # 提取标题
    title_match = re.search(r'<span class="diary-day">([^<]+)</span>', content)
    title_cn = title_match.group(1).strip() if title_match else f'Diary {date}'

    # 提取建站天数
    day_match = re.search(r'<p>建站第\s*(\d+)\s*天。</p>', content)
    day_num = day_match.group(1) if day_match else ''

    # 提取第一段内容作为摘要基础
    first_para_match = re.search(r'<div class="diary-content">\s*<p[^>]*>(.*?)</p>', content, re.DOTALL)
    first_para = first_para_match.group(1).strip() if first_para_match else ''

    # 提取主要内容（h2标题）
    h2_titles = re.findall(r'<h2[^>]*>(.*?)</h2>', content)

    return {
        'date': date,
        'title_cn': title_cn,
        'day_num': day_num,
        'first_para': first_para,
        'h2_titles': h2_titles,
        'content': content
    }

def create_english_title(title_cn, date, day_num):
    """创建英文标题"""
    # 如果标题包含"建站第X天"，使用 Day X 格式
    if '建站第' in title_cn and '天' in title_cn:
        return f"Day {day_num}" if day_num else f"Diary {date}"

    # 否则翻译标题 - 完整翻译
    title_translations = {
        '自动化的代价：当我们试图修复问题时': 'The Cost of Automation: When We Try to Fix Problems',
        '定时任务：让自动化真正落地': 'Scheduled Tasks: Making Automation Real',
        '自动化的第一步：让系统自己跑起来': 'First Step of Automation: Let the System Run by Itself',
        '从云端回到本地：一次迟到的架构决策': 'From Cloud to Local: A Long-overdue Architecture Decision',
        '当守门人离开：AI安全负责人辞职的启示': 'When the Gatekeeper Leaves: Insights from AI Safety Leader\'s Resignation',
        '当AI成为资本游戏：420亿贷款背后的真相': 'When AI Becomes a Capital Game: The Truth Behind the $42 Billion Loan',
    }

    # 完全匹配
    if title_cn in title_translations:
        return title_translations[title_cn]

    # 部分匹配
    for cn, en in title_translations.items():
        if cn in title_cn:
            return en

    # 关键词翻译
    if '自动化' in title_cn:
        return f"Automation Diary - {date}"
    elif '定时任务' in title_cn:
        return f"Scheduled Tasks - {date}"
    elif '迁移' in title_cn:
        return f"Migration Diary - {date}"
    elif '安全' in title_cn:
        return f"Safety Reflections - {date}"
    elif '资本' in title_cn:
        return f"Capital Analysis - {date}"

    # 默认使用日期
    return f"Diary {date}"

def create_english_summary(info):
    """创建英文摘要"""
    day_num = info['day_num']
    h2_titles = info['h2_titles']
    title_cn = info['title_cn']

    # 基于标题和内容生成摘要
    if '自动化' in title_cn:
        if '代价' in title_cn:
            return f"Day {day_num}. Reflecting on automation mistakes and the importance of minimal intervention when fixing problems."
        elif '定时任务' in title_cn:
            return f"Day {day_num}. Implemented Windows scheduled tasks for automated diary and AI news generation. Automation reliability is key."
        elif '第一步' in title_cn:
            return f"Day {day_num}. Started building the automation system. Automation is a means, not a goal."
        else:
            return f"Day {day_num}. Work on automation and system reliability."

    elif '迁移' in title_cn or '云端' in title_cn:
        return f"Day {day_num}. Completed migration from cloud to local. Simplification and control are progress."

    elif '安全' in title_cn or '守门人' in title_cn:
        return f"Day {day_num}. Reflections on AI safety and the importance of human oversight."

    elif '资本' in title_cn or '贷款' in title_cn:
        return f"Day {day_num}. Analysis of AI industry capital flows and investment trends."

    elif h2_titles:
        # 使用第一个h2标题作为摘要线索
        first_h2 = h2_titles[0]
        return f"Day {day_num}. {first_h2}"

    else:
        return f"Day {day_num}. Daily work diary and project progress."

def create_english_diary_page(info):
    """创建英文日记页面"""
    date = info['date']
    title_cn = info['title_cn']
    day_num = info['day_num']

    title_en = create_english_title(title_cn, date, day_num)
    summary_en = create_english_summary(info)

    # 创建英文页面内容
    page_content = f'''---
import BaseLayout from '../../../layouts/Base.astro';

const diaryJsonLd = {{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{title_en}",
  "datePublished": "{date}",
  "dateModified": "{date}",
  "description": "{summary_en}",
  "author": {{
    "@type": "Person",
    "name": "Mr. Wu",
    "alternateName": "Guanwu"
  }}
}};
---

<BaseLayout title="Guanwu Diary | {date} | {title_en}" jsonLd={{diaryJsonLd}} ogDescription="{summary_en}" navActive="diary" lang="en">
  <article class="diary-entry">
    <header class="diary-header">
      <time datetime="{date}">{date}</time>
      <span class="diary-day">{title_en}</span>
    </header>

    <div class="diary-content">
      <p class="day-number">Day {day_num}</p>

      <div class="english-summary">
        <h3>Summary</h3>
        <p>{summary_en}</p>
      </div>

      <div class="content-notice">
        <p>📝 The full detailed content of this diary entry is in Chinese. Below is the original content for reference.</p>
      </div>

      <div class="original-content">
        <h3>Original Chinese Content</h3>
        {extract_english_friendly_content(info['content'])}
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

    return page_content

def extract_english_friendly_content(chinese_content):
    """提取对英文用户友好的内容（保留HTML结构）"""
    # 提取 diary-content 部分
    match = re.search(r'<div class="diary-content">(.*?)</div>\s*(?:<footer|<div class="diary-footer)', chinese_content, re.DOTALL)
    if match:
        content = match.group(1).strip()
        # 移除内联样式，保留结构
        content = re.sub(r'data-astro-cid="[^"]*"', '', content)
        return content
    return '<p>Content not available</p>'

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

    for i, diary_file in enumerate(diary_files, 1):
        date_str = diary_file.stem

        print(f"[{i}/{len(diary_files)}] Processing {date_str}...")

        # 提取日记信息
        info = extract_diary_info(diary_file)

        # 创建英文版本
        en_content = create_english_diary_page(info)

        # 保存英文文件
        en_file = en_diary_dir / f"{date_str}.astro"
        en_file.write_text(en_content, encoding='utf-8')

        created_count += 1
        print(f"  [OK] Created {en_file}")

    print()
    print(f"[DONE] Created {created_count} English diary files")

if __name__ == '__main__':
    main()
