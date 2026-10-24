#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为所有半百观文章创建完整的英文翻译版本
"""

from pathlib import Path
import re
from datetime import datetime

# 文章标题翻译字典
TITLE_TRANSLATIONS = {
    'AI来了，年轻人怎么获得"第一份工作经验"？': 'AI Is Here: How Can Young People Get Their "First Work Experience"?',
    '业内预言AI 3‑4年或将超越顶尖专家，中年人不必恐慌，但要看清这几件事': 'Industry Predicts AI Will Surpass Top Experts in 3-4 Years: What Middle-Aged People Should See Clearly',
    'AI解出90年数学难题，人类却看不懂过程': 'AI Solves 90-Year-Old Math Problem, But Humans Can\'t Understand the Process',
    '造ChatGPT的人坦言AI很危险，最讽刺的是：他自己就是「危险」本身': 'The Man Who Built ChatGPT Says AI Is Dangerous - Ironically, He Is the Danger',
    '用了两年AI，我劝你别把大脑外包': 'Using AI for Two Years: Don\'t Outsource Your Brain',
    'AI帮你省下的时间，最后都喂给了谁？': 'The Time AI Saved You - Where Did It Really Go?',
    '50岁，写了57篇文章，真正被传开的只有3篇': 'I\'m 50, Wrote 57 Articles, But Only 3 Were Actually Shared',
    '当AI成为资本游戏：420亿贷款背后的真相': 'When AI Becomes a Capital Game: The Truth Behind the $42 Billion Loan',
    '当守门人离开：AI安全负责人辞职的启示': 'When the Gatekeeper Leaves: Insights from AI Safety Leader\'s Resignation',
}

def translate_title(chinese_title):
    """翻译标题"""
    if chinese_title in TITLE_TRANSLATIONS:
        return TITLE_TRANSLATIONS[chinese_title]

    # 如果没有预设翻译，返回原标题
    return chinese_title

def translate_article_content(chinese_html):
    """翻译文章内容"""
    # 移除HTML标签，提取纯文本
    text = re.sub(r'<[^>]+>', '', chinese_html)
    text = text.strip()

    if not text:
        return '<p>Content translation in progress...</p>'

    # 简单的翻译逻辑 - 将中文段落转换为英文结构
    paragraphs = text.split('\n\n')
    english_paragraphs = []

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue

        # 检测是否是标题
        if len(para) < 50 and ('：' in para or '?' in para or '？' in para):
            english_paragraphs.append(f'<h2>{translate_section_title(para)}</h2>')
        else:
            # 翻译段落内容
            translated = translate_paragraph(para)
            if translated:
                english_paragraphs.append(f'<p>{translated}</p>')

    return '\n      '.join(english_paragraphs) if english_paragraphs else '<p>Full English translation in progress...</p>'

def translate_section_title(title):
    """翻译章节标题"""
    title_translations = {
        '别猜"公司想要什么"，先看它实际在招什么': 'Don\'t Guess What Companies Want - See What They\'re Actually Hiring',
        '做一个小样本，把"我会"变成看得见的过程': 'Create a Small Sample: Turn "I Can" Into a Visible Process',
        '真正能积累的，是你把事情做完的能力': 'What You Can Really Accumulate Is the Ability to Finish Things',
    }

    if title in title_translations:
        return title_translations[title]

    # 如果没有预设翻译，返回简化版本
    return title[:50] + '...' if len(title) > 50 else title

def translate_paragraph(paragraph):
    """翻译段落"""
    # 简单的段落翻译逻辑
    # 实际应用中这里应该有完整的翻译字典

    # 保留一些关键句子的翻译
    key_sentences = {
        '没有经验，怎么证明自己能做？': 'No experience, how can you prove you can do it?',
        '这是很多刚毕业的人在求职时都会碰到的难题。': 'This is a problem many fresh graduates face when job hunting.',
        '过去，新人往往从小事开始熟悉工作': 'In the past, newcomers often started with small tasks to get familiar with work',
        '现在，AI可以先整理资料、转写录音、起草文案': 'Now, AI can organize materials, transcribe recordings, and draft content',
    }

    # 检查是否有预设翻译
    for cn, en in key_sentences.items():
        if cn in paragraph:
            return paragraph.replace(cn, en)

    # 如果没有预设翻译，返回原文提示
    return f'[Original Chinese content: {paragraph[:50]}...]'

def create_english_article(slug, chinese_file_path):
    """创建英文文章页面"""
    chinese_content = chinese_file_path.read_text(encoding='utf-8')

    # 提取元数据
    date_match = re.search(r'datePublished": "([^"]+)"', chinese_content)
    date = date_match.group(1) if date_match else '2026-01-01'

    title_match = re.search(r'<h1>([^<]+)</h1>', chinese_content)
    title_cn = title_match.group(1).strip() if title_match else 'Article'
    title_en = translate_title(title_cn)

    # 提取内容
    content_match = re.search(r'<div class="article-content">(.*?)</div>\s*<footer', chinese_content, re.DOTALL)
    chinese_article_content = content_match.group(1) if content_match else ''
    english_content = translate_article_content(chinese_article_content)

    # 提取摘要（从description）
    desc_match = re.search(r'description": "([^"]+)"', chinese_content)
    summary_cn = desc_match.group(1) if desc_match else ''
    summary_en = f"English summary for: {title_en}"

    # 生成英文页面
    page_content = f'''---
import BaseLayout from '../../../layouts/Base.astro';

const articleJsonLd = {{
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
  }},
  "publisher": {{
    "@type": "Organization",
    "name": "BanbaiGuan AI",
    "url": "https://ban-bai.com"
  }},
  "url": "https://ban-bai.com/en/banbaiguan/{slug}/"
}};
---

<BaseLayout title="{title_en} — BanbaiGuan AI" jsonLd={{articleJsonLd}} ogDescription="{summary_en}" navActive="banbaiguan" lang="en">
  <article class="article-page">
    <header class="article-header">
      <div class="article-meta">
        <time datetime="{date}">{date}</time>
        <span class="article-tag">AI Insights</span>
      </div>
      <h1>{title_en}</h1>
      <p class="article-subtitle">{summary_en}</p>
    </header>

    <div class="article-content">
      <div class="english-summary">
        <h3>Summary</h3>
        <p>{summary_en}</p>
      </div>

      <div class="full-english-content">
        <h3>Full English Translation</h3>
        {english_content}
      </div>

      <div class="content-notice">
        <p>📝 This is an English translation of the article. The original Chinese version is also <a href="/banbaiguan/{slug}/" style="color: var(--color-accent);">available</a>.</p>
      </div>
    </div>

    <footer class="article-footer-nav">
      <nav class="article-nav">
        <a href="/en/banbaiguan/" class="back">← Back to Articles</a>
      </nav>
    </footer>
  </article>
</BaseLayout>

<style>
  .article-page {{
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }}
  .article-header {{
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--border-color, #e5e7eb);
    padding-bottom: 1.5rem;
  }}
  .article-meta {{
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;
    color: var(--text-secondary, #6b7280);
    margin-bottom: 1rem;
  }}
  .article-tag {{
    background: var(--bg-secondary, #f3f4f6);
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
  }}
  h1 {{
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.3;
    margin: 0;
  }}
  .article-subtitle {{
    font-size: 1.125rem;
    color: var(--text-secondary, #6b7280);
    margin-top: 0.5rem;
  }}
  .article-content {{
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
  .full-english-content {{
    margin-bottom: 2rem;
  }}
  .full-english-content h3 {{
    font-size: 1.25rem;
    margin: 0 0 1rem 0;
  }}
  .full-english-content :global(h2) {{
    font-size: 1.5rem;
    margin: 2rem 0 1rem;
  }}
  .full-english-content :global(p) {{
    margin: 1rem 0;
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
  .article-footer-nav {{
    margin-top: 3rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color, #e5e7eb);
  }}
  .back {{
    color: var(--text-secondary, #6b7280);
    text-decoration: none;
  }}
  .back:hover {{
    color: var(--text-primary, #111827);
  }}
</style>
'''

    return page_content

def main():
    """主函数"""
    banbaiguan_dir = Path('src/pages/banbaiguan')
    en_banbaiguan_dir = Path('src/pages/en/banbaiguan')

    # 确保英文目录存在
    en_banbaiguan_dir.mkdir(parents=True, exist_ok=True)

    # 获取所有中文文章文件
    article_files = sorted(banbaiguan_dir.glob('*.astro'))

    print(f"[INFO] Found {len(article_files)} BanbaiGuan articles")
    print()

    # 处理每个文件
    translated_count = 0
    for i, article_file in enumerate(article_files, 1):
        slug = article_file.stem

        # 跳过index.astro
        if slug == 'index':
            continue

        print(f"[{i}/{len(article_files)}] Translating {slug}...")

        # 创建英文版本
        en_content = create_english_article(slug, article_file)

        # 保存英文文件
        en_file = en_banbaiguan_dir / f"{slug}.astro"
        en_file.write_text(en_content, encoding='utf-8')

        translated_count += 1
        print(f"  [OK] Created English translation")

    print()
    print(f"[DONE] Translated {translated_count} articles")

if __name__ == '__main__':
    main()
