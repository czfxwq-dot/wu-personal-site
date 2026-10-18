#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
从半百观 .astro 文件提取文章数据，生成完整的 articles.ts
"""

import re
import os
import sys
from datetime import datetime

if sys.platform.startswith('win'):
    sys.stdout.reconfigure(encoding='utf-8')

ARTICLE_DIR = "src/pages/banbaiguan"
OUTPUT_FILE = "src/data/articles.ts.complete"

def extract_from_astro(filepath):
    """从 .astro 文件提取文章数据"""
    filename = os.path.basename(filepath)

    # 从文件名提取 slug（去掉 .astro）
    slug = filename.replace('.astro', '')

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 提取日期
    date_str = ""
    date_patterns = [
        r"const date = '(\d{4}-\d{2}-\d{2})'",
        r"const pubDate = '(\d{4}-\d{2}-\d{2})'",
        r'"datePublished":\s*"(\d{4}-\d{2}-\d{2})"',
        r'datetime="(\d{4}-\d{2}-\d{2})"',
    ]
    for pattern in date_patterns:
        match = re.search(pattern, content)
        if match:
            date_str = match.group(1)
            break

    if not date_str:
        return None

    # 提取标题
    title = slug.replace('-', ' ').title()
    title_patterns = [
        r"const title = '([^']+)'",
        r"const title = `([^`]+)`",
        r"const title = \"([^\"]+)\"",
        r'"headline":\s*"([^"]+)"',
        r'<h1[^>]*>(.*?)</h1>',
    ]
    for pattern in title_patterns:
        match = re.search(pattern, content, re.DOTALL)
        if match:
            title = match.group(1).strip()
            title = re.sub(r'<[^>]+>', '', title)  # 移除HTML标签
            break

    # 提取摘要
    excerpt = ""
    excerpt_patterns = [
        r"const excerpt = `([^`]+)`",
        r"const excerpt = '([^']+)'",
        r"const description = '([^']+)'",
        r'ogDescription="([^"]+)"',
        r'"description":\s*[`"]([^`"]+)[`"]',
    ]
    for pattern in excerpt_patterns:
        match = re.search(pattern, content, re.DOTALL)
        if match:
            excerpt = match.group(1).strip()
            break

    # 如果没有摘要，从第一段提取
    if not excerpt:
        p_match = re.search(r'<p[^>]*>(.*?)</p>', content, re.DOTALL)
        if p_match:
            excerpt = re.sub(r'<[^>]+>', '', p_match.group(1)).strip()

    # 清理摘要
    excerpt = excerpt.replace('\n', ' ').replace('`', "'")
    if len(excerpt) > 200:
        excerpt = excerpt[:197] + "..."

    # 提取标签
    tag = "半百观AI"
    tag_patterns = [
        r"const tag = '([^']+)'",
        r"const category = '([^']+)'",
    ]
    for pattern in tag_patterns:
        match = re.search(pattern, content)
        if match:
            tag = match.group(1)
            break

    return {
        'slug': slug,
        'date': date_str,
        'title': title.replace('`', "'"),
        'excerpt': excerpt,
        'tag': tag
    }

def main():
    # 扫描所有 .astro 文件
    article_files = sorted([f for f in os.listdir(ARTICLE_DIR) if f.endswith('.astro')])
    print(f"📁 找到 {len(article_files)} 个文章文件")

    # 提取数据
    entries = []
    failed = []
    for filename in article_files:
        filepath = os.path.join(ARTICLE_DIR, filename)
        try:
            data = extract_from_astro(filepath)
            if data:
                entries.append(data)
            else:
                failed.append(filename)
        except Exception as e:
            print(f"  ❌ {filename}: {e}")
            failed.append(filename)

    # 按日期降序排序
    entries.sort(key=lambda x: x['date'], reverse=True)

    print(f"✅ 成功提取 {len(entries)} 条文章数据")
    if failed:
        print(f"⚠️  失败 {len(failed)} 个: {', '.join(failed[:5])}...")

    # 生成新的 articles.ts
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write("// 文章数据 — 完整版本（" + str(len(entries)) + "条）\n")
        f.write("// 生成时间: " + datetime.now().strftime('%Y-%m-%d %H:%M:%S') + "\n")
        f.write("export interface ArticleEntry {\n")
        f.write("  slug: string;\n")
        f.write("  date: string;\n")
        f.write("  title: string;\n")
        f.write("  titleEn?: string;\n")
        f.write("  excerpt: string;\n")
        f.write("  excerptEn?: string;\n")
        f.write("  tag: string;\n")
        f.write("  tagEn?: string;\n")
        f.write("}\n\n")
        f.write("export const articles: ArticleEntry[] = [\n")

        for entry in entries:
            f.write("  {\n")
            f.write(f"    slug: '{entry['slug']}',\n")
            f.write(f"    date: '{entry['date']}',\n")
            f.write(f"    title: `{entry['title']}`,\n")
            f.write(f"    titleEn: `{entry['title']}`,\n")
            f.write(f"    excerpt: `{entry['excerpt']}`,\n")
            f.write(f"    excerptEn: `{entry['excerpt']}`,\n")
            f.write(f"    tag: '{entry['tag']}',\n")
            f.write(f"    tagEn: '{entry['tag']}'\n")
            f.write("  },\n")

        f.write("];\n")

    print(f"\n✅ 完整数据文件: {OUTPUT_FILE}")
    print(f"\n⚠️  下一步：")
    print(f"   mv {OUTPUT_FILE} src/data/articles.ts")
    print(f"   npm run build")

if __name__ == '__main__':
    main()
