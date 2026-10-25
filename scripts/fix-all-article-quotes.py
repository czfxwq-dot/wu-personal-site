#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复所有英文文章文件中的引号问题
"""

from pathlib import Path
import re

def fix_quotes_in_file(file_path):
    """修复单个文件中的引号问题"""
    content = file_path.read_text(encoding='utf-8')

    # 修复 JSON-LD 中的 headline 引号问题
    # 将 "headline": "...\"..." 改为 "headline": "..."
    def fix_headline(match):
        headline = match.group(1)
        # 移除内部的引号（包括中文引号和英文引号）
        headline = headline.replace('"', '').replace('"', '').replace('"', '')
        return f'"headline": "{headline}",'

    content = re.sub(r'"headline": "([^"]*(?:"[^"]*)*)",', fix_headline, content)

    # 修复 BaseLayout title 属性中的引号问题
    def fix_title(match):
        title = match.group(1)
        # 移除内部的引号
        title = title.replace('"', '').replace('"', '').replace('"', '')
        return f'title="{title}"'

    content = re.sub(r'title="([^"]*(?:"[^"]*)*)"', fix_title, content)

    # 修复 h1 标签中的引号问题
    def fix_h1(match):
        h1_content = match.group(1)
        # 移除内部的引号
        h1_content = h1_content.replace('"', '').replace('"', '').replace('"', '')
        return f'<h1>{h1_content}</h1>'

    content = re.sub(r'<h1>([^<]*(?:"[^<]*)*)</h1>', fix_h1, content)

    file_path.write_text(content, encoding='utf-8')
    return True

def main():
    """主函数"""
    en_banbaiguan_dir = Path('src/pages/en/banbaiguan')

    if not en_banbaiguan_dir.exists():
        print(f"[ERROR] Directory not found: {en_banbaiguan_dir}")
        return

    # 获取所有 .astro 文件（排除 index.astro）
    article_files = [f for f in en_banbaiguan_dir.glob('*.astro') if f.name != 'index.astro']

    print(f"[INFO] Found {len(article_files)} article files to fix")
    print()

    fixed_count = 0
    for article_file in article_files:
        try:
            fix_quotes_in_file(article_file)
            fixed_count += 1
            print(f"[OK] Fixed: {article_file.name}")
        except Exception as e:
            print(f"[ERROR] Failed to fix {article_file.name}: {e}")

    print()
    print(f"[DONE] Fixed {fixed_count} files")

if __name__ == '__main__':
    main()
