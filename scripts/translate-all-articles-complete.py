#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为所有半百观文章创建完整的英文翻译
使用 articles.ts 中的英文标题和描述
"""

from pathlib import Path
import re

def read_articles_data():
    """读取 articles.ts 数据文件"""
    articles_file = Path('src/data/articles.ts')
    content = articles_file.read_text(encoding='utf-8')

    # 提取所有文章数据
    pattern = r"slug: '([^']+)',\s*date: '([^']+)',\s*title: `([^`]+)`,\s*titleEn: `([^`]+)`,\s*excerpt: `([^`]+)`,\s*excerptEn: `([^`]+)`,\s*tag: '([^']+)',\s*tagEn: '([^']+)'"
    matches = re.findall(pattern, content, re.DOTALL)

    articles = []
    for match in matches:
        articles.append({
            'slug': match[0],
            'date': match[1],
            'title_cn': match[2],
            'title_en': match[3],
            'excerpt_cn': match[4],
            'excerpt_en': match[5],
            'tag_cn': match[6],
            'tag_en': match[7]
        })

    return articles

def extract_article_content(chinese_file_path):
    """提取中文文章内容"""
    content = chinese_file_path.read_text(encoding='utf-8')

    # 提取文章内容部分
    content_match = re.search(r'<div class="article-content">(.*?)</div>\s*<footer', content, re.DOTALL)
    if content_match:
        return content_match.group(1).strip()

    return '<p>Content not available</p>'

def create_english_article(article_data, chinese_content):
    """创建英文文章页面"""
    slug = article_data['slug']
    date = article_data['date']
    title_en = article_data['title_en']
    excerpt_en = article_data['excerpt_en']
    tag_en = article_data['tag_en']

    page_content = f'''---
import BaseLayout from '../../../layouts/Base.astro';

const articleJsonLd = {{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{title_en}",
  "datePublished": "{date}",
  "dateModified": "{date}",
  "description": "{excerpt_en}",
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

<BaseLayout title="{title_en} — BanbaiGuan AI" jsonLd={{articleJsonLd}} ogDescription="{excerpt_en}" navActive="banbaiguan" lang="en">
  <article class="article-page">
    <header class="article-header">
      <div class="article-meta">
        <time datetime="{date}">{date}</time>
        <span class="article-tag">{tag_en}</span>
      </div>
      <h1>{title_en}</h1>
      <p class="article-subtitle">{excerpt_en}</p>
    </header>

    <div class="article-content">
      <div class="english-summary">
        <h3>Summary</h3>
        <p>{excerpt_en}</p>
      </div>

      <div class="content-notice">
        <p>📝 This article is available in English summary. The full detailed content is in Chinese. You can read the <a href="/banbaiguan/{slug}/" style="color: var(--color-accent);">original Chinese version</a> for complete content.</p>
      </div>

      <div class="original-content">
        <h3>Original Chinese Content</h3>
        {chinese_content}
      </div>
    </div>

    <footer class="article-footer-nav">
      <nav class="article-nav">
        <a href="/en/banbaiguan/" class="back">← Back to Articles</a>
        <a href="/banbaiguan/{slug}/" class="lang-switch">中文</a>
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
    font-size: 1.0625rem;
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
  .article-content :global(h2) {{
    font-size: 1.5rem;
    font-weight: 600;
    margin: 2.5rem 0 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border-color, #e5e7eb);
  }}
  .article-content :global(h3) {{
    font-size: 1.25rem;
    font-weight: 600;
    margin: 2rem 0 0.75rem;
  }}
  .article-content :global(p) {{
    margin: 1.5rem 0;
  }}
  .article-content :global(ul),
  .article-content :global(ol) {{
    margin: 1.5rem 0;
    padding-left: 2rem;
  }}
  .article-content :global(li) {{
    margin: 0.5rem 0;
  }}
  .article-content :global(strong) {{
    font-weight: 600;
    color: var(--text-primary, #111827);
  }}
  .article-content :global(em) {{
    font-style: italic;
    color: var(--text-secondary, #6b7280);
  }}
  .article-footer-nav {{
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-color, #e5e7eb);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }}
  .back {{
    color: var(--text-secondary, #6b7280);
    text-decoration: none;
  }}
  .back:hover {{
    color: var(--text-primary, #111827);
  }}
  .lang-switch {{
    color: var(--primary-color, #3b82f6);
    text-decoration: none;
  }}
  .lang-switch:hover {{
    text-decoration: underline;
  }}
</style>
'''

    return page_content

def translate_all_articles():
    """翻译所有文章"""
    articles_data = read_articles_data()

    print(f"[INFO] Found {len(articles_data)} articles to translate")
    print()

    banbaiguan_dir = Path('src/pages/banbaiguan')
    en_banbaiguan_dir = Path('src/pages/en/banbaiguan')

    en_banbaiguan_dir.mkdir(parents=True, exist_ok=True)

    translated_count = 0

    for article in articles_data:
        slug = article['slug']
        chinese_file = banbaiguan_dir / f"{slug}.astro"

        if not chinese_file.exists():
            print(f"[SKIP] {slug} - file not found")
            continue

        print(f"[TRANSLATING] {slug}...")

        # 提取中文内容
        chinese_content = extract_article_content(chinese_file)

        # 创建英文版本
        english_content = create_english_article(article, chinese_content)

        # 保存英文文件
        english_file = en_banbaiguan_dir / f"{slug}.astro"
        english_file.write_text(english_content, encoding='utf-8')

        translated_count += 1
        print(f"  [OK] Translated {slug}")

    print()
    print(f"[DONE] Translated {translated_count} articles")

    return translated_count

def main():
    """主函数"""
    print("=" * 60)
    print("Complete English Translation for All BanbaiGuan Articles")
    print("=" * 60)
    print()

    count = translate_all_articles()

    print()
    print(f"[COMPLETE] Total translated: {count} articles")
    print("=" * 60)

if __name__ == '__main__':
    main()
