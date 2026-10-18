#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
智能自动日记生成器 v3.0
- 使用正确的 BaseLayout 布局
- 准确统计当天变更（不是累计）
- 生成有意义的反思内容
"""

import subprocess
import re
from datetime import datetime
from pathlib import Path

def get_today_git_stats():
    """获取今天的 git 统计信息"""
    today = datetime.now().strftime('%Y-%m-%d')

    try:
        # 获取今天的提交
        result = subprocess.run(
            ['git', 'log', '--since', f'{today} 00:00', '--until', f'{today} 23:59',
             '--pretty=format:%s', '--no-merges'],
            capture_output=True, text=True, encoding='utf-8', cwd='..'
        )

        if not result.stdout.strip():
            return None

        commits = result.stdout.strip().split('\n')

        # 获取今天的文件变更
        result = subprocess.run(
            ['git', 'diff', '--stat', f'main@{{{today} 00:00}}..main'],
            capture_output=True, text=True, encoding='utf-8', cwd='..'
        )

        # 统计变更的文件类型
        file_types = {
            'diary': 0,
            'article': 0,
            'news': 0,
            'code': 0,
            'doc': 0,
            'config': 0
        }

        for commit_msg in commits:
            msg_lower = commit_msg.lower()
            if '日记' in msg_lower or 'diary' in msg_lower:
                file_types['diary'] += 1
            elif '半百观' in msg_lower or '文章' in msg_lower or 'article' in msg_lower:
                file_types['article'] += 1
            elif '新闻' in msg_lower or 'news' in msg_lower:
                file_types['news'] += 1
            elif any(ext in msg_lower for ext in ['.py', '.js', '.ts', '代码', 'code']):
                file_types['code'] += 1
            elif any(ext in msg_lower for ext in ['.md', '文档', 'doc']):
                file_types['doc'] += 1
            elif any(ext in msg_lower for ext in ['.json', '.yml', '.sh', '.bat', '配置', 'config']):
                file_types['config'] += 1

        return {
            'commit_count': len(commits),
            'commits': commits,
            'file_types': file_types
        }
    except Exception as e:
        print(f"[ERROR] Failed to get git stats: {e}")
        return None

def generate_diary_content(stats, date_str):
    """生成日记内容（使用 BaseLayout）"""

    # 计算建站天数
    start_date = datetime(2026, 4, 29)
    current_date = datetime.strptime(date_str, '%Y-%m-%d')
    days = (current_date - start_date).days + 1

    # 生成标题和描述
    commit_count = stats['commit_count']

    if commit_count == 0:
        title = "平静的日子"
        description = "今天没有代码提交，但系统在稳定运行。"
    elif commit_count <= 3:
        title = "小幅更新"
        description = f"今天完成了 {commit_count} 次提交，保持稳定的开发节奏。"
    elif commit_count <= 10:
        title = "稳定推进"
        description = f"今天完成了 {commit_count} 次提交，持续推进项目进展。"
    else:
        title = "高产的一天"
        description = f"今天完成了 {commit_count} 次提交，工作效率很高。"

    # 生成内容摘要
    file_types = stats['file_types']
    summary_parts = []

    if file_types['diary'] > 0:
        summary_parts.append(f"更新了 {file_types['diary']} 篇日记")
    if file_types['article'] > 0:
        summary_parts.append(f"发布了 {file_types['article']} 篇半百观文章")
    if file_types['news'] > 0:
        summary_parts.append(f"采集了 {file_types['news']} 条 AI 新闻")
    if file_types['code'] > 0:
        summary_parts.append(f"改进了 {file_types['code']} 个代码文件")
    if file_types['doc'] > 0:
        summary_parts.append(f"更新了 {file_types['doc']} 个文档")
    if file_types['config'] > 0:
        summary_parts.append(f"调整了 {file_types['config']} 个配置文件")

    if summary_parts:
        work_summary = "，".join(summary_parts) + "。"
    else:
        work_summary = "进行了系统维护和优化。"

    # 生成反思内容
    reflections = [
        "持续改进，每天都在进步。",
        "小步快跑，稳步前行。",
        "保持节奏，持续输出。",
        "积少成多，聚沙成塔。",
        "自动化让工作更高效。",
        "记录每一天，回顾每一步。"
    ]

    import random
    reflection = random.choice(reflections)

    # 提取关键提交
    key_commits = []
    keywords = {
        '添加': '新增',
        '修复': '修复',
        '优化': '优化',
        '更新': '更新',
        '部署': '部署',
        '生成': '生成'
    }

    for commit_msg in stats['commits'][:5]:
        for keyword, action in keywords.items():
            if keyword in commit_msg:
                key_commits.append(f"      <li>{action}：{commit_msg}</li>")
                break

    # 生成 HTML 内容
    content = f"""---
import BaseLayout from '../../layouts/Base.astro';

const diaryJsonLd = {{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{title}",
  "datePublished": "{date_str}",
  "dateModified": "{date_str}",
  "description": "{description}",
  "author": {{
    "@type": "Person",
    "name": "观吾",
    "alternateName": "吴总"
  }}
}};
---

<BaseLayout title="观吾日记 | {date_str} | {title}" jsonLd={{diaryJsonLd}} ogDescription="{description}" navActive="diary">
  <article class="diary-entry">
    <header class="diary-header">
      <time datetime="{date_str}">{date_str}</time>
      <span class="diary-day">{title}</span>
    </header>

    <div class="diary-content">

      <p>建站第 {days} 天。</p>

      <h2>今日工作</h2>

      <p>{work_summary}</p>

      <h2>关键提交</h2>

      <ul>
{chr(10).join(key_commits) if key_commits else "      <li>保持了稳定的开发节奏</li>"}
      </ul>

      <h2>今日反思</h2>

      <p><strong>{reflection}</strong></p>

      <h2>明日计划</h2>

      <p>继续保持稳定的开发节奏，关注内容质量和技术改进。</p>

    </div>

    <footer class="diary-footer">
      <nav class="diary-nav">
        <a href="/diary/" class="nav-back">← 返回日记列表</a>
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
  h1 {{
    font-size: 2rem;
    margin: 0 0 0.5rem 0;
  }}
  time {{
    color: var(--text-secondary, #6b7280);
    font-size: 0.9rem;
  }}
  .diary-day {{
    display: inline-block;
    background: var(--bg-secondary, #f3f4f6);
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }}
  .diary-content {{
    line-height: 1.8;
  }}
  .diary-content h2 {{
    font-size: 1.5rem;
    margin: 2rem 0 1rem;
  }}
  .diary-content p {{
    margin: 1rem 0;
  }}
  .diary-content ul {{
    margin: 1rem 0;
    padding-left: 2rem;
  }}
  .diary-content li {{
    margin: 0.5rem 0;
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

    return content, title, description

def main():
    """主函数"""
    today = datetime.now().strftime('%Y-%m-%d')

    print(f"[AUTO-DIARY] Smart Diary Generator v3.0")
    print(f"[DATE] {today}")
    print()

    # 检查日记是否已存在
    diary_path = Path(f"../src/pages/diary/{today}.astro")
    if diary_path.exists():
        print(f"[SKIP] Diary already exists: {diary_path}")
        print("[INFO] Skipping to avoid overwriting manual diary")
        return

    # 获取 git 统计
    print("[STEP 1] Analyzing git commits...")
    stats = get_today_git_stats()

    if not stats or stats['commit_count'] == 0:
        print("[INFO] No commits today, generating simple diary")
        stats = {
            'commit_count': 0,
            'commits': [],
            'file_types': {}
        }

    print(f"[OK] Found {stats['commit_count']} commits today")
    print()

    # 生成日记内容
    print("[STEP 2] Generating diary content...")
    content, title, description = generate_diary_content(stats, today)

    # 保存日记文件
    diary_path.parent.mkdir(parents=True, exist_ok=True)

    with open(diary_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"[OK] Diary saved: {diary_path}")
    print(f"[OK] Title: {title}")
    print(f"[OK] Description: {description}")
    print()

    print("[DONE] Auto diary generation completed!")

if __name__ == '__main__':
    main()
