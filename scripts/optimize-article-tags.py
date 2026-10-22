#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
文章标签优化脚本
根据文章标题和内容自动分配更合适的标签
"""

import re
from pathlib import Path

# 标签分类规则
TAG_RULES = [
    {
        'tag': 'AI观点',
        'keywords': ['观点', '看法', '思考', '反思', '为什么', '怎么看', '应该', '不必', '恐慌'],
        'priority': 1
    },
    {
        'tag': 'AI前沿',
        'keywords': ['突破', '新模型', '发布', '推出', '首个', '首次', '创新', '前沿', '难题'],
        'priority': 2
    },
    {
        'tag': 'AI应用',
        'keywords': ['应用', '使用', '工具', '实战', '案例', '落地', '实践', '教程', '如何'],
        'priority': 3
    },
    {
        'tag': 'AI产业',
        'keywords': ['产业', '行业', '市场', '投资', '融资', '公司', '企业', '商业', '竞争'],
        'priority': 4
    },
    {
        'tag': 'AI趋势',
        'keywords': ['趋势', '未来', '预测', '发展', '方向', '走向', '将', '会'],
        'priority': 5
    },
    {
        'tag': 'AI周报',
        'keywords': ['周报', '周刊', '一周', '本周'],
        'priority': 6
    },
    {
        'tag': 'AI思考',
        'keywords': ['思考', '思维', '认知', '理解', '洞察', '启示'],
        'priority': 7
    },
    {
        'tag': '深度分析',
        'keywords': ['深度', '分析', '解读', '剖析', '全面', '详细'],
        'priority': 8
    }
]

def categorize_article(title, excerpt):
    """根据标题和摘要判断文章类别"""
    text = (title + ' ' + excerpt).lower()

    # 按优先级检查每个标签规则
    for rule in sorted(TAG_RULES, key=lambda x: x['priority']):
        for keyword in rule['keywords']:
            if keyword.lower() in text:
                return rule['tag']

    # 默认标签
    return 'AI观点'

def optimize_tags():
    """优化所有文章的标签"""
    articles_file = Path('src/data/articles.ts')

    with open(articles_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 提取所有文章条目
    pattern = r"\{\s*slug: '([^']+)',\s*date: '([^']+)',\s*title: `([^`]+)`.*?excerpt: `([^`]+)`.*?tag: '([^']+)',"
    matches = re.findall(pattern, content, re.DOTALL)

    updated_count = 0
    tag_stats = {}

    for match in matches:
        slug, date, title, excerpt, old_tag = match

        # 判断新标签
        new_tag = categorize_article(title, excerpt)

        # 统计
        tag_stats[new_tag] = tag_stats.get(new_tag, 0) + 1

        # 如果标签不同，更新
        if old_tag != new_tag:
            # 替换标签
            old_pattern = f"slug: '{slug}',.*?tag: '{old_tag}',"
            new_text = re.sub(
                old_pattern,
                lambda m: m.group(0).replace(f"tag: '{old_tag}'", f"tag: '{new_tag}'"),
                content,
                flags=re.DOTALL
            )
            content = new_text
            updated_count += 1

    # 写回文件
    with open(articles_file, 'w', encoding='utf-8') as f:
        f.write(content)

    return updated_count, tag_stats

if __name__ == '__main__':
    print("=" * 60)
    print("文章标签优化")
    print("=" * 60)
    print()

    updated_count, tag_stats = optimize_tags()

    print(f"[OK] 更新了 {updated_count} 篇文章的标签")
    print()
    print("标签分布:")
    for tag, count in sorted(tag_stats.items(), key=lambda x: x[1], reverse=True):
        print(f"  {tag}: {count} 篇")
    print()
    print("=" * 60)
