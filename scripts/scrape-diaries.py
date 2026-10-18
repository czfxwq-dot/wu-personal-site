#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
从线上网站抓取缺失的日记数据
生成 diaries.ts 条目和 .astro 页面文件
"""

import requests
import re
import os
import tempfile
import sys
from datetime import datetime
from html import unescape

# 设置输出编码
if sys.platform.startswith('win'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = "https://ban-bai.com"
OUTPUT_DIR = "src/pages/diary"
DIARIES_FILE = "src/data/diaries.ts"

def extract_diary_data(url):
    """从日记页面提取数据"""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        html = response.text
    except Exception as e:
        print(f"  ❌ 抓取失败: {e}")
        return None

    # 提取日期
    date_match = re.search(r'/diary/(\d{4}-\d{2}-\d{2})', url)
    if not date_match:
        return None
    date_str = date_match.group(1)

    # 提取标题 (从 <h1> 标签)
    title_match = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL)
    title = title_match.group(1).strip() if title_match else f"日记 {date_str}"
    # 清理 HTML 标签
    title = re.sub(r'<[^>]+>', '', title).strip()
    title = unescape(title)

    # 提取摘要 (从 meta description 或第一段)
    summary_match = re.search(r'<meta name="description" content="([^"]*)"', html)
    if summary_match:
        summary = unescape(summary_match.group(1))
    else:
        # 从第一段提取
        p_match = re.search(r'<article[^>]*>.*?<p>(.*?)</p>', html, re.DOTALL)
        summary = re.sub(r'<[^>]+>', '', p_match.group(1)).strip() if p_match else ""
        summary = unescape(summary)

    # 截断摘要到200字
    if len(summary) > 200:
        summary = summary[:197] + "..."

    # 提取分类 (从 URL 或内容推断)
    category = "AI项目"

    # 提取正文内容 (简化版)
    content_match = re.search(r'<article[^>]*>(.*?)</article>', html, re.DOTALL)
    content_html = content_match.group(1) if content_match else "<p>内容暂缺</p>"

    return {
        'date': date_str,
        'title': title,
        'title_en': title,  # 暂不翻译
        'summary': summary,
        'summary_en': summary,  # 暂不翻译
        'category': category,
        'category_en': "AI Projects",
        'content': content_html
    }

def generate_astro_file(data):
    """生成 .astro 页面文件"""
    date_str = data['date']
    date_obj = datetime.strptime(date_str, '%Y-%m-%d')

    # 计算建站天数
    start_date = datetime(2026, 4, 29)
    day_num = (date_obj - start_date).days + 1

    # 转义标题和摘要中的反引号
    title_escaped = data['title'].replace('`', '\\`')
    summary_escaped = data['summary'].replace('`', '\\`')

    content = """---
import Layout from '../../layouts/Base.astro';
const date = '""" + date_str + """';
const title = `""" + title_escaped + """`;
const summary = `""" + summary_escaped + """`;
const category = '""" + data['category'] + """';
const dayNum = """ + str(day_num) + """;
---

<Layout title={`日记 ${date} | 建站第${dayNum}天`}>
  <article class="diary-entry">
    <header class="diary-header">
      <div class="diary-meta">
        <time datetime={date}>{new Date(date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</time>
        <span class="diary-day">建站第 {dayNum} 天</span>
        <span class="diary-category">{category}</span>
      </div>
      <h1>{title}</h1>
    </header>

    <div class="diary-content">
      """ + data['content'] + """
    </div>

    <footer class="diary-footer">
      <nav class="diary-nav">
        <a href="/diary/" class="nav-back">← 返回日记列表</a>
      </nav>
    </footer>
  </article>
</Layout>

<style>
  .diary-entry {{
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }}
  .diary-header {{
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--border-color, #e5e7eb);
    padding-bottom: 1.5rem;
  }}
  .diary-meta {{
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    font-size: 0.875rem;
    color: var(--text-secondary, #6b7280);
    margin-bottom: 0.5rem;
  }}
  .diary-day, .diary-category {{
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
  .diary-content {{
    line-height: 1.8;
    font-size: 1.0625rem;
  }}
  .diary-content :global(p) {{
    margin: 1.5rem 0;
  }}
  .diary-footer {{
    margin-top: 3rem;
    padding-top: 1.5rem;
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
"""
    return content

def main():
    # 读取所有日期（使用临时文件）
    temp_dir = tempfile.gettempdir()
    dates_file = os.path.join(temp_dir, 'diary-dates.txt')

    if not os.path.exists(dates_file):
        print(f"❌ 找不到日期文件: {dates_file}")
        print("请先运行: curl -s 'https://ban-bai.com/diary/' | grep -oP '/diary/2026-\\d{{2}}-\\d{{2}}' | sort -u > " + dates_file)
        return

    with open(dates_file, 'r') as f:
        dates = [line.strip().replace('/diary/', '') for line in f if line.strip()]

    # 本地已有的日期（4月29日-5月13日）
    existing_dates = set()
    if os.path.exists(OUTPUT_DIR):
        for filename in os.listdir(OUTPUT_DIR):
            match = re.match(r'(\d{4}-\d{2}-\d{2})\.astro', filename)
            if match:
                existing_dates.add(match.group(1))

    # 需要抓取的日期（7月11日之后的）
    dates_to_fetch = [d for d in dates if d not in existing_dates and d >= '2026-07-11']

    print(f"📊 总共 {len(dates)} 篇日记")
    print(f"✅ 本地已有 {len(existing_dates)} 篇")
    print(f"🔄 需要抓取 {len(dates_to_fetch)} 篇（7月11日后）")
    print()

    if not dates_to_fetch:
        print("✅ 没有需要抓取的日记")
        return

    # 创建输出目录
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # 批量抓取
    diary_entries = []
    for i, date_str in enumerate(dates_to_fetch, 1):
        url = f"{BASE_URL}/diary/{date_str}"
        print(f"[{i}/{len(dates_to_fetch)}] 抓取 {date_str}...", end=' ')

        data = extract_diary_data(url)
        if data:
            # 生成 .astro 文件
            astro_content = generate_astro_file(data)
            output_path = os.path.join(OUTPUT_DIR, f"{date_str}.astro")
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(astro_content)

            diary_entries.append(data)
            print(f"✅ {data['title'][:30]}...")
        else:
            print("❌ 失败")

        # 避免请求过快
        if i % 10 == 0:
            print(f"  💤 暂停2秒...")
            import time
            time.sleep(2)

    print()
    print(f"✅ 成功抓取 {len(diary_entries)} 篇日记")
    print(f"📁 文件保存在 {OUTPUT_DIR}/")
    print()
    print("⚠️  下一步：手动更新 diaries.ts")
    print("   运行: python3 scripts/generate-diaries-ts.py")

if __name__ == '__main__':
    main()
