#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re
import sys

if sys.platform.startswith('win'):
    sys.stdout.reconfigure(encoding='utf-8')

# 读取文件
with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 提取所有文章条目 - 更宽松的模式
entries = []
current_entry = {}

for line in content.split('\n'):
    slug_match = re.search(r"slug: '([^']+)'", line)
    date_match = re.search(r"date: '(\d{4}-\d{2}-\d{2})'", line)
    title_match = re.search(r"title: `([^`]+)`", line)
    title_match2 = re.search(r"title: '([^']+)'", line)
    excerpt_match = re.search(r"excerpt: `([^`]+)`", line)
    excerpt_match2 = re.search(r"excerpt: '([^']+)'", line)
    tag_match = re.search(r"tag: '([^']+)'", line)

    if slug_match:
        current_entry['slug'] = slug_match.group(1)
    if date_match:
        current_entry['date'] = date_match.group(1)
    if title_match:
        current_entry['title'] = title_match.group(1)
    elif title_match2:
        current_entry['title'] = title_match2.group(1)
    if excerpt_match:
        current_entry['excerpt'] = excerpt_match.group(1)
    elif excerpt_match2:
        current_entry['excerpt'] = excerpt_match2.group(1)
    if tag_match:
        current_entry['tag'] = tag_match.group(1)

    # 当遇到 '},' 时，保存当前条目
    if line.strip() == '},' and current_entry.get('slug'):
        entries.append(current_entry)
        current_entry = {}

# 按日期降序排序
entries.sort(key=lambda x: x.get('date', ''), reverse=True)

print(f'提取到 {len(entries)} 条文章')
if entries:
    print(f'最新: {entries[0].get("date")}')
    print(f'最旧: {entries[-1].get("date")}')

# 重新生成文件
with open('src/data/articles.ts', 'w', encoding='utf-8') as f:
    f.write(f'// 文章数据 — 完整版本（{len(entries)}条）\n')
    f.write('// 已按日期降序排序\n')
    f.write('export interface ArticleEntry {\n')
    f.write('  slug: string;\n')
    f.write('  date: string;\n')
    f.write('  title: string;\n')
    f.write('  titleEn?: string;\n')
    f.write('  excerpt: string;\n')
    f.write('  excerptEn?: string;\n')
    f.write('  tag: string;\n')
    f.write('  tagEn?: string;\n')
    f.write('}\n\n')
    f.write('export const articles: ArticleEntry[] = [\n')

    for entry in entries:
        f.write('  {\n')
        f.write(f"    slug: '{entry.get('slug', '')}',\n")
        f.write(f"    date: '{entry.get('date', '')}',\n")
        title = entry.get('title', '').replace('`', '\\`')
        f.write(f"    title: `{title}`,\n")
        f.write(f"    titleEn: `{title}`,\n")
        excerpt = entry.get('excerpt', '').replace('`', '\\`')
        f.write(f"    excerpt: `{excerpt}`,\n")
        f.write(f"    excerptEn: `{excerpt}`,\n")
        f.write(f"    tag: '{entry.get('tag', '半百观AI')}',\n")
        f.write(f"    tagEn: '{entry.get('tag', '半百观AI')}'\n")
        f.write('  },\n')

    f.write('];\n')

print('✅ 排序完成')
