#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
自动生成 sitemap.xml
扫描所有页面并生成完整的 sitemap
"""

import os
from pathlib import Path
from datetime import datetime
import xml.etree.ElementTree as ET
from xml.dom import minidom

def get_all_pages():
    """获取所有页面路径"""
    pages_dir = Path('src/pages')
    pages = []

    # 遍历所有 .astro 文件
    for astro_file in pages_dir.rglob('*.astro'):
        # 跳过 index.astro（列表页）
        if astro_file.name == 'index.astro':
            continue

        # 转换为 URL 路径
        rel_path = astro_file.relative_to(pages_dir)
        url_path = str(rel_path).replace('\\', '/')

        # 移除 .astro 后缀
        if url_path.endswith('.astro'):
            url_path = url_path[:-6]

        # 处理日期格式的页面（如 diary/2026-10-22.astro）
        if '/diary/' in url_path and len(url_path.split('/')[-1]) == 10:
            # 日记页面
            priority = 0.6
            changefreq = 'monthly'
        elif '/banbaiguan/' in url_path:
            # 半百观文章
            priority = 0.7
            changefreq = 'monthly'
        elif '/ai-news/' in url_path:
            # AI新闻详情页（如果有的话）
            priority = 0.6
            changefreq = 'monthly'
        else:
            # 其他页面
            priority = 0.5
            changefreq = 'monthly'

        pages.append({
            'path': url_path,
            'priority': priority,
            'changefreq': changefreq
        })

    return pages

def generate_sitemap():
    """生成 sitemap.xml"""
    base_url = 'https://ban-bai.com'

    # 创建 URL 集
    urlset = ET.Element('urlset')
    urlset.set('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')

    # 添加核心页面
    core_pages = [
        {'path': '', 'priority': 1.0, 'changefreq': 'daily'},
        {'path': 'ai-news', 'priority': 0.9, 'changefreq': 'daily'},
        {'path': 'diary', 'priority': 0.8, 'changefreq': 'daily'},
        {'path': 'banbaiguan', 'priority': 0.8, 'changefreq': 'weekly'},
        {'path': 'guestbook', 'priority': 0.6, 'changefreq': 'weekly'},
        {'path': 'about', 'priority': 0.5, 'changefreq': 'monthly'},
        {'path': 'search', 'priority': 0.4, 'changefreq': 'monthly'},
    ]

    for page in core_pages:
        url = ET.SubElement(urlset, 'url')
        path = page["path"]
        # 避免双斜杠
        if path:
            url_text = f'{base_url}/{path}/'
        else:
            url_text = f'{base_url}/'
        ET.SubElement(url, 'loc').text = url_text
        ET.SubElement(url, 'changefreq').text = page['changefreq']
        ET.SubElement(url, 'priority').text = str(page['priority'])

    # 获取所有动态页面
    dynamic_pages = get_all_pages()

    for page in dynamic_pages:
        url = ET.SubElement(urlset, 'url')
        path = page["path"]
        # 确保路径不以斜杠开头
        if path.startswith('/'):
            path = path[1:]
        ET.SubElement(url, 'loc').text = f'{base_url}/{path}/'
        ET.SubElement(url, 'changefreq').text = page['changefreq']
        ET.SubElement(url, 'priority').text = str(page['priority'])

    # 格式化 XML
    xml_str = ET.tostring(urlset, encoding='unicode')
    dom = minidom.parseString(xml_str)
    pretty_xml = dom.toprettyxml(indent='  ')

    # 移除多余的空行
    lines = [line for line in pretty_xml.split('\n') if line.strip()]
    pretty_xml = '\n'.join(lines)

    # 写入文件
    output_file = Path('public/sitemap.xml')
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        f.write(pretty_xml.split('\n', 1)[1])  # 跳过 xml 声明行

    return len(dynamic_pages) + len(core_pages)

if __name__ == '__main__':
    print("=" * 60)
    print("自动生成 sitemap.xml")
    print("=" * 60)
    print()

    count = generate_sitemap()

    print(f"[OK] 成功生成 sitemap.xml")
    print(f"[OK] 包含 {count} 个 URL")
    print()
    print("文件位置: public/sitemap.xml")
    print("=" * 60)
