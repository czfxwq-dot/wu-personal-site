#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
自动日记生成脚本
每天 22:00 运行，生成当天日记并提交到网站
"""

import sys
import os
from datetime import datetime, timedelta
import re

if sys.platform.startswith('win'):
    sys.stdout.reconfigure(encoding='utf-8')

# 添加脚本路径到 sys.path
script_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, script_dir)

def get_today_diary_content():
    """生成今天的日记内容"""
    today = datetime.now()
    date_str = today.strftime('%Y-%m-%d')

    # 计算建站天数
    start_date = datetime(2026, 4, 29)
    days_since_start = (today - start_date).days + 1

    # 获取今天的工作摘要（从 git 提交记录）
    try:
        import subprocess
        result = subprocess.run(
            ['git', 'log', '--since=today', '--oneline', '--all'],
            capture_output=True, text=True, cwd=script_dir
        )
        commits = result.stdout.strip().split('\n') if result.stdout.strip() else []
        commit_count = len([c for c in commits if c])

        if commit_count > 0:
            summary = f"今天完成了 {commit_count} 个提交"
            if commit_count > 5:
                summary += "，工作量不小"
            summary += "。"
        else:
            summary = "今天比较平静，没有太多提交。"
    except Exception as e:
        summary = "今天的活动记录暂时无法获取。"

    # 生成日记内容
    content = f"""---
layout: ../../layouts/DiaryLayout.astro
title: "{date_str} 工作日记"
date: "{date_str}"
tags: ["日记", "AI项目"]
description: "建站第 {days_since_start} 天的工作记录"
---

# {date_str} 工作日记

建站第 {days_since_start} 天。

## 今日工作

{summary}

## 系统状态

- 日记总数：{{diary_count}} 篇
- 半百观文章：{{article_count}} 篇
- AI新闻：{{news_count}} 条

## 明日计划

继续完善系统，保持稳定运行。

---

*自动生成于 {today.strftime('%Y-%m-%d %H:%M')}*
"""

    return content, date_str, days_since_start

def update_diaries_ts(date_str, title, summary):
    """更新 diaries.ts 文件"""
    diaries_file = os.path.join(script_dir, '..', 'src', 'data', 'diaries.ts')

    with open(diaries_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 检查是否已存在
    if f"date: '{date_str}'" in content:
        print(f"⚠️  {date_str} 的日记已存在")
        return False

    # 生成新条目
    new_entry = f"""  {{
    date: '{date_str}',
    title: `{title}`,
    titleEn: `{title}`,
    summary: `{summary}`,
    summaryEn: `{summary}`,
    category: 'AI项目',
    categoryEn: 'AI Projects'
  }},
"""

    # 在数组开头插入（保持最新在前）
    # 找到 export const diaries 的位置
    match = re.search(r'export const diaries.*?\[\s*\n', content)
    if match:
        insert_pos = match.end()
        new_content = content[:insert_pos] + new_entry + content[insert_pos:]

        with open(diaries_file, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"✅ 已更新 diaries.ts")
        return True
    else:
        print(f"❌ 无法找到 diaries 数组位置")
        return False

def create_diary_page(date_str, content, days_since_start):
    """创建日记页面"""
    pages_dir = os.path.join(script_dir, '..', 'src', 'pages', 'diary')
    os.makedirs(pages_dir, exist_ok=True)

    page_file = os.path.join(pages_dir, f'{date_str}.astro')

    if os.path.exists(page_file):
        print(f"⚠️  {date_str}.astro 已存在")
        return False

    # 生成页面内容
    page_content = f"""---
import Layout from '../../layouts/Base.astro';
const date = '{date_str}';
const title = `建站第 {days_since_start} 天`;
const summary = `{date_str} 工作日记`;
const category = 'AI项目';
const dayNum = {days_since_start};
---

<Layout title={{title}}>
  <article class="diary-entry">
    <header class="diary-header">
      <h1>{{title}}</h1>
      <time datetime="{{date}}">{{new Date(date).toLocaleDateString('zh-CN', {{ year: 'numeric', month: 'long', day: 'numeric' }})}}</time>
    </header>

    <div class="diary-content">
      <p>建站第 {{{{dayNum}}}} 天。</p>
      <p>今天的工作记录已自动生成。</p>
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
    margin: 2rem auto;
    padding: 0 1rem;
  }}
  .diary-header {{
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--border-color, #e5e7eb);
    padding-bottom: 1rem;
  }}
  h1 {{
    font-size: 2rem;
    margin: 0 0 0.5rem 0;
  }}
  time {{
    color: var(--text-secondary, #6b7280);
    font-size: 0.9rem;
  }}
  .diary-content {{
    line-height: 1.8;
  }}
  .diary-content p {{
    margin: 1rem 0;
  }}
  .diary-footer {{
    margin-top: 3rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color, #e5e7eb);
  }}
  .nav-back {{
    color: var(--primary-color, #3b82f6);
    text-decoration: none;
  }}
  .nav-back:hover {{
    text-decoration: underline;
  }}
</style>
"""

    with open(page_file, 'w', encoding='utf-8') as f:
        f.write(page_content)

    print(f"✅ 已创建 {date_str}.astro")
    return True

def main():
    """主函数"""
    print("=" * 60)
    print("🤖 自动日记生成系统")
    print("=" * 60)
    print()

    try:
        # 生成日记内容
        print("📝 生成日记内容...")
        content, date_str, days_since_start = get_today_diary_content()
        print(f"✅ 日期：{date_str}")
        print(f"✅ 建站天数：{days_since_start}")
        print()

        # 获取当前统计数据
        try:
            import subprocess
            result = subprocess.run(
                ['grep', '-c', 'date:', '../src/data/diaries.ts'],
                capture_output=True, text=True, cwd=script_dir
            )
            diary_count = int(result.stdout.strip()) if result.stdout.strip() else 0

            result = subprocess.run(
                ['grep', '-c', 'slug:', '../src/data/articles.ts'],
                capture_output=True, text=True, cwd=script_dir
            )
            article_count = int(result.stdout.strip()) if result.stdout.strip() else 0

            result = subprocess.run(
                ['grep', '-c', 'date:', '../src/data/ai-news-summary.ts'],
                capture_output=True, text=True, cwd=script_dir
            )
            news_count = int(result.stdout.strip()) if result.stdout.strip() else 0

            content = content.replace('{{diary_count}}', str(diary_count))
            content = content.replace('{{article_count}}', str(article_count))
            content = content.replace('{{news_count}}', str(news_count))
        except Exception as e:
            print(f"⚠️  无法获取统计数据：{e}")
            content = content.replace('{{diary_count}}', '?')
            content = content.replace('{{article_count}}', '?')
            content = content.replace('{{news_count}}', '?')

        # 创建日记页面
        print("📄 创建日记页面...")
        create_diary_page(date_str, content, days_since_start)
        print()

        # 更新 diaries.ts
        print("📊 更新 diaries.ts...")
        title = f"建站第 {days_since_start} 天"
        summary = f"{date_str} 工作日记，自动生成的日常记录。"
        update_diaries_ts(date_str, title, summary)
        print()

        # 自动部署
        print("🚀 开始自动部署...")
        deploy_script = os.path.join(script_dir, 'auto-deploy.sh')
        if os.path.exists(deploy_script):
            import subprocess
            result = subprocess.run(['bash', deploy_script], cwd=script_dir)
            if result.returncode == 0:
                print()
                print("=" * 60)
                print("🎉 自动日记生成完成！")
                print("=" * 60)
            else:
                print()
                print("❌ 部署失败")
                sys.exit(1)
        else:
            print(f"⚠️  找不到部署脚本：{deploy_script}")
            print("请手动运行部署")

    except Exception as e:
        print(f"❌ 错误：{e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == '__main__':
    main()
