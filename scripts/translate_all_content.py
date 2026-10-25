#!/usr/bin/env python3
"""
批量翻译日记和文章内容为英文
使用Anthropic Claude API进行翻译
"""

import os
import json
import re
from pathlib import Path
from anthropic import Anthropic

# 初始化Anthropic客户端
client = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

def extract_content_from_markdown(md_content):
    """从markdown文件中提取frontmatter和正文内容"""
    # 匹配frontmatter
    frontmatter_match = re.match(r'^---\n(.*?)\n---\n(.*)$', md_content, re.DOTALL)
    if not frontmatter_match:
        return None, None

    frontmatter_text = frontmatter_match.group(1)
    body_content = frontmatter_match.group(2).strip()

    # 解析frontmatter
    frontmatter = {}
    for line in frontmatter_text.split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            frontmatter[key.strip()] = value.strip()

    return frontmatter, body_content

def translate_html_content(html_content, content_type='diary'):
    """使用Claude API翻译HTML内容"""
    prompt = f"""You are a professional translator. Translate the following Chinese HTML content to English.

Requirements:
1. Keep all HTML tags exactly as they are
2. Only translate the text content between tags
3. Maintain the same HTML structure and formatting
4. Use natural, fluent English
5. Keep proper nouns (like website names, technical terms) as they are or use common English equivalents
6. The content is a {content_type} entry from a personal website about AI and technology

Chinese HTML content:
{html_content}

Please provide only the translated English HTML content, without any explanation or additional text."""

    try:
        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4096,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        return message.content[0].text.strip()
    except Exception as e:
        print(f"Translation error: {e}")
        return None

def process_diaries():
    """处理所有日记文件"""
    diaries_dir = Path('src/content/diaries')
    diary_files = sorted(diaries_dir.glob('*.md'))

    print(f"找到 {len(diary_files)} 个日记文件")

    translations = []
    for i, md_file in enumerate(diary_files, 1):
        print(f"\n[{i}/{len(diary_files)}] 处理: {md_file.name}")

        # 读取markdown文件
        with open(md_file, 'r', encoding='utf-8') as f:
            md_content = f.read()

        # 提取内容
        frontmatter, body = extract_content_from_markdown(md_content)
        if not body:
            print(f"  ⚠️ 无法提取内容，跳过")
            continue

        # 翻译内容
        print(f"  翻译中...")
        translated = translate_html_content(body, 'diary')

        if translated:
            translations.append({
                'date': frontmatter.get('date', md_file.stem),
                'contentEn': translated
            })
            print(f"  ✓ 翻译完成")
        else:
            print(f"  ✗ 翻译失败")

        # 每10个保存一次，防止中断丢失
        if i % 10 == 0:
            save_progress(translations, 'diaries')

    return translations

def process_articles():
    """处理所有文章文件"""
    articles_dir = Path('src/content/articles')
    article_files = sorted(articles_dir.glob('*.md'))

    print(f"找到 {len(article_files)} 个文章文件")

    translations = []
    for i, md_file in enumerate(article_files, 1):
        print(f"\n[{i}/{len(article_files)}] 处理: {md_file.name}")

        # 读取markdown文件
        with open(md_file, 'r', encoding='utf-8') as f:
            md_content = f.read()

        # 提取内容
        frontmatter, body = extract_content_from_markdown(md_content)
        if not body:
            print(f"  ⚠️ 无法提取内容，跳过")
            continue

        # 翻译内容
        print(f"  翻译中...")
        translated = translate_html_content(body, 'article')

        if translated:
            translations.append({
                'slug': frontmatter.get('slug', md_file.stem),
                'contentEn': translated
            })
            print(f"  ✓ 翻译完成")
        else:
            print(f"  ✗ 翻译失败")

        # 每10个保存一次
        if i % 10 == 0:
            save_progress(translations, 'articles')

    return translations

def save_progress(translations, content_type):
    """保存翻译进度"""
    filename = f'scripts/translations_{content_type}.json'
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(translations, f, ensure_ascii=False, indent=2)
    print(f"\n💾 已保存 {len(translations)} 个翻译到 {filename}")

def main():
    """主函数"""
    print("=" * 60)
    print("开始批量翻译内容")
    print("=" * 60)

    # 检查API密钥
    if not os.getenv('ANTHROPIC_API_KEY'):
        print("❌ 错误: 未设置ANTHROPIC_API_KEY环境变量")
        print("请先设置: export ANTHROPIC_API_KEY=your_api_key")
        return

    # 处理日记
    print("\n" + "=" * 60)
    print("处理日记")
    print("=" * 60)
    diary_translations = process_diaries()
    save_progress(diary_translations, 'diaries')

    # 处理文章
    print("\n" + "=" * 60)
    print("处理文章")
    print("=" * 60)
    article_translations = process_articles()
    save_progress(article_translations, 'articles')

    print("\n" + "=" * 60)
    print("✓ 翻译完成!")
    print("=" * 60)
    print(f"日记翻译: {len(diary_translations)} 个")
    print(f"文章翻译: {len(article_translations)} 个")
    print("\n下一步: 运行 update_data_files.py 将翻译结果写入数据文件")

if __name__ == '__main__':
    main()
