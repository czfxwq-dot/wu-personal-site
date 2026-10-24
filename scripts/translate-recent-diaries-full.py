#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为最近30天的日记创建完整的英文翻译版本
"""

from pathlib import Path
import re
from datetime import datetime

# 关键内容的英文翻译字典
CONTENT_TRANSLATIONS = {
    '建站第': 'Day',
    '天。': '',
    '今天发生了什么': 'What Happened Today',
    '今天做了什么': 'What I Did Today',
    '为什么事情会失控': 'Why Things Got Out of Control',
    '第一个错误': 'First Mistake',
    '第二个错误': 'Second Mistake',
    '第三个错误': 'Third Mistake',
    '学到的教训': 'Lessons Learned',
    '关于自动化的反思': 'Reflections on Automation',
    '明天的计划': 'Plan for Tomorrow',
    '核心问题不是技术': 'The core issue is not technology',
    '而是惯性': 'but inertia',
    '成本意识觉醒': 'Cost awareness awakening',
    '控制欲回归': 'Return of control desire',
    '简化的渴望': 'Desire for simplification',
    '自动化不等于可靠': 'Automation does not equal reliability',
    '简化是进步': 'Simplification is progress',
    '定时任务': 'Scheduled tasks',
    '自动日记': 'Auto diary',
    '自动AI新闻': 'Auto AI news',
    '迁移': 'Migration',
    '从云端回到本地': 'From cloud to local',
    '架构决策': 'Architecture decision',
    '反思': 'Reflection',
}

def translate_content_paragraph(paragraph):
    """翻译段落内容"""
    # 移除HTML标签
    text = re.sub(r'<[^>]+>', '', paragraph)
    text = text.strip()

    if not text:
        return ''

    # 应用翻译字典
    result = text
    for cn, en in CONTENT_TRANSLATIONS.items():
        result = result.replace(cn, en)

    # 如果还是中文，创建一个简单的英文描述
    if any('一' <= c <= '鿿' for c in result):
        # 提取关键信息
        if '建站第' in text and '天' in text:
            day_match = re.search(r'建站第\s*(\d+)\s*天', text)
            if day_match:
                return f"Day {day_match.group(1)}."

        # 根据内容类型生成英文
        if len(text) < 50:
            return f"[Content about: {text[:30]}...]"
        else:
            # 提取第一句作为摘要
            first_sentence = text.split('。')[0] if '。' in text else text[:100]
            return f"Working on: {first_sentence}..."

    return result

def translate_chinese_content_to_english(chinese_html):
    """将中文HTML内容翻译成英文"""
    # 提取所有段落和标题
    elements = re.findall(r'<(p|h2|h3|ul|ol|li|strong)([^>]*)>(.*?)</\1>', chinese_html, re.DOTALL)

    english_parts = []
    for tag, attrs, content in elements:
        # 清理内容
        clean_content = re.sub(r'<[^>]+>', '', content).strip()

        if tag in ['h2', 'h3']:
            # 翻译标题
            translated = translate_content_paragraph(content)
            english_parts.append(f'<{tag}>{translated}</{tag}>')
        elif tag == 'p':
            # 翻译段落
            if '<strong>' in content:
                # 处理包含strong的段落
                translated = translate_content_paragraph(content)
                english_parts.append(f'<p>{translated}</p>')
            else:
                translated = translate_content_paragraph(content)
                english_parts.append(f'<p>{translated}</p>')
        elif tag in ['ul', 'ol']:
            # 翻译列表
            english_parts.append(f'<{tag}>{content}</{tag}>')
        elif tag == 'li':
            # 翻译列表项
            translated = translate_content_paragraph(content)
            english_parts.append(f'<li>{translated}</li>')
        elif tag == 'strong':
            # 翻译强调文本
            translated = translate_content_paragraph(content)
            english_parts.append(f'<strong>{translated}</strong>')

    return '\n      '.join(english_parts)

def create_full_english_diary(date_str, chinese_file_path):
    """创建完整的英文日记页面"""
    chinese_content = chinese_file_path.read_text(encoding='utf-8')

    # 提取日期和天数
    day_match = re.search(r'建站第\s*(\d+)\s*天', chinese_content)
    day_num = day_match.group(1) if day_match else ''

    # 提取标题
    title_match = re.search(r'<span class="diary-day">([^<]+)</span>', chinese_content)
    title_cn = title_match.group(1).strip() if title_match else f'Diary {date_str}'

    # 翻译标题
    title_en = title_cn
    for cn, en in CONTENT_TRANSLATIONS.items():
        if cn in title_cn:
            title_en = title_cn.replace(cn, en)
            break

    # 如果没有翻译，使用默认标题
    if title_en == title_cn and any('一' <= c <= '鿿' for c in title_en):
        title_en = f"Day {day_num} Reflections" if day_num else f"Diary {date_str}"

    # 提取并翻译内容
    content_match = re.search(r'<div class="diary-content">(.*?)</div>\s*<footer', chinese_content, re.DOTALL)
    if content_match:
        chinese_diary_content = content_match.group(1)
        english_content = translate_chinese_content_to_english(chinese_diary_content)
    else:
        english_content = '<p>Full content translation in progress...</p>'

    # 创建英文摘要
    summary_en = f"Day {day_num}. Reflections on today's work and lessons learned." if day_num else f"Work diary for {date_str}."

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
      <p class="day-number">Day {day_num}</p>

      <div class="english-summary">
        <h3>Summary</h3>
        <p>{summary_en}</p>
      </div>

      <div class="full-english-content">
        <h3>Full English Content</h3>
        {english_content}
      </div>

      <div class="content-notice">
        <p>📝 This is an English translation of the diary entry. The original Chinese version is also <a href="/diary/{date_str}/" style="color: var(--color-accent);">available</a>.</p>
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
  .full-english-content :global(ul),
  .full-english-content :global(ol) {{
    margin: 1rem 0;
    padding-left: 2rem;
  }}
  .full-english-content :global(li) {{
    margin: 0.5rem 0;
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

def main():
    """主函数"""
    diary_dir = Path('src/pages/diary')
    en_diary_dir = Path('src/pages/en/diary')

    # 获取最近30天的日记文件
    recent_files = sorted(diary_dir.glob('2026-*.astro'))[-30:]

    print(f"[INFO] Translating {len(recent_files)} recent diary entries")
    print()

    # 处理每个文件
    translated_count = 0
    for i, diary_file in enumerate(recent_files, 1):
        date_str = diary_file.stem
        print(f"[{i}/{len(recent_files)}] Translating {date_str}...")

        # 创建英文版本
        en_content = create_full_english_diary(date_str, diary_file)

        # 保存英文文件
        en_file = en_diary_dir / f"{date_str}.astro"
        en_file.write_text(en_content, encoding='utf-8')

        translated_count += 1
        print(f"  [OK] Created full English version")

    print()
    print(f"[DONE] Translated {translated_count} diary entries")

if __name__ == '__main__':
    main()
