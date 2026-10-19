#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI新闻自动采集与生成器 v1.0
- 从 RSS 源采集 AI 相关新闻
- 生成每日新闻汇总
- 更新 ai-news-summary.ts 数据文件
"""

import feedparser
import requests
from datetime import datetime
from pathlib import Path
import re
import random

# AI 新闻 RSS 源
RSS_FEEDS = [
    'https://www.36kr.com/feed',
    'https://rsshub.app/36kr/motif/ai',
    'https://rsshub.app/sspai/tag/AI',
    'https://rsshub.app/jiqizhixin/daily',
]

# AI 相关关键词
AI_KEYWORDS = [
    'AI', '人工智能', '大模型', 'GPT', 'Claude', 'Gemini', 'LLM',
    '机器学习', '深度学习', '神经网络', 'OpenAI', 'Anthropic', 'Google',
    '智能', '算法', '数据', '算力', '芯片', 'GPU', 'Transformer',
    'AIGC', '生成式', '对话', '语言模型', '视觉模型'
]

def fetch_ai_news():
    """从 RSS 源采集 AI 新闻"""
    news_items = []

    for feed_url in RSS_FEEDS:
        try:
            print(f"[RSS] Fetching: {feed_url}")
            feed = feedparser.parse(feed_url)

            for entry in feed.entries[:10]:  # 每个源取前10条
                title = entry.get('title', '')
                summary = entry.get('summary', '')
                link = entry.get('link', '')

                # 检查是否包含 AI 关键词
                if any(keyword.lower() in (title + summary).lower() for keyword in AI_KEYWORDS):
                    news_items.append({
                        'title': title,
                        'summary': summary[:200],  # 限制摘要长度
                        'source': feed.feed.get('title', '未知来源'),
                        'url': link
                    })
        except Exception as e:
            print(f"[WARN] Failed to fetch {feed_url}: {e}")

    # 去重（按标题）
    seen_titles = set()
    unique_news = []
    for item in news_items:
        if item['title'] not in seen_titles:
            seen_titles.add(item['title'])
            unique_news.append(item)

    return unique_news[:10]  # 最多返回10条

def categorize_news(title, summary):
    """为新闻分类"""
    text = (title + summary).lower()

    if any(k in text for k in ['模型', 'gpt', 'claude', 'llm', '语言模型']):
        return '大模型'
    elif any(k in text for k in ['芯片', 'gpu', '算力', '硬件']):
        return 'AI硬件'
    elif any(k in text for k in ['视频', '图像', '生成', 'aigc']):
        return 'AI生成'
    elif any(k in text for k in ['应用', '落地', '商业', '产品']):
        return 'AI应用'
    elif any(k in text for k in ['研究', '论文', '学术', 'arxiv']):
        return 'AI研究'
    elif any(k in text for k in ['政策', '监管', '伦理', '安全']):
        return 'AI治理'
    else:
        return 'AI动态'

def generate_news_summary(news_items, date_str):
    """生成新闻汇总"""

    if not news_items:
        return None

    # 生成标题
    top_news = news_items[0]['title']
    if len(top_news) > 30:
        top_news = top_news[:30] + '...'

    title = f"AI新闻 | {top_news}"

    # 生成摘要
    summaries = [item['summary'][:50] for item in news_items[:5]]
    summary = '；'.join(summaries) + '。'

    # 生成点评
    comments = [
        "AI技术持续快速发展，每天都有新突破。",
        "人工智能正在深刻改变各行各业的格局。",
        "大模型竞争日趋激烈，创新层出不穷。",
        "AI应用场景不断拓展，商业化进程加速。",
        "技术进步带来机遇，也带来挑战。"
    ]
    comment = random.choice(comments)

    # 生成 newsItems 数组
    news_items_formatted = []
    for item in news_items:
        category = categorize_news(item['title'], item['summary'])
        news_items_formatted.append({
            'title': item['title'],
            'titleEn': item['title'],
            'summary': item['summary'],
            'summaryEn': item['summary'],
            'source': item['source'],
            'category': category,
            'categoryEn': category,
            'url': item.get('url', '')
        })

    return {
        'date': date_str,
        'title': title,
        'titleEn': title,
        'summary': summary,
        'summaryEn': summary,
        'newsItems': news_items_formatted,
        'comment': comment,
        'commentEn': comment
    }

def update_ai_news_file(news_summary, file_path):
    """更新 ai-news-summary.ts 文件"""

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # 检查是否已存在该日期的新闻
        if f'"date": "{news_summary["date"]}"' in content:
            print(f"[SKIP] News already exists for {news_summary['date']}")
            return False

        # 生成新的新闻条目
        new_entry = f""",
{{
  "date": "{news_summary['date']}",
  "title": "{news_summary['title']}",
  "summary": "{news_summary['summary']}",
  "newsItems": [
"""

        for i, item in enumerate(news_summary['newsItems']):
            new_entry += f"""    {{
      "title": "{item['title']}",
      "summary": "{item['summary']}",
      "source": "{item['source']}",
      "category": "{item['category']}",
      "url": "{item.get('url', '')}"
    }}"""
            if i < len(news_summary['newsItems']) - 1:
                new_entry += ","
            new_entry += "\n"

        new_entry += f"""  ],
  "comment": "{news_summary['comment']}"
}}"""

        # 在数组开头插入（保持最新在前）
        # 找到 export const dailyNewsSummaries 的位置
        match = re.search(r'export const dailyNewsSummaries.*?\[\s*\n', content)
        if match:
            insert_pos = match.end()
            new_content = content[:insert_pos] + new_entry + content[insert_pos:]

            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)

            return True
        else:
            print("[ERROR] Could not find insertion point")
            return False

    except Exception as e:
        print(f"[ERROR] Failed to update file: {e}")
        return False

def main():
    """主函数"""
    today = datetime.now().strftime('%Y-%m-%d')

    print(f"[AUTO-NEWS] AI News Auto-Generator v1.0")
    print(f"[DATE] {today}")
    print()

    # 采集新闻
    print("[STEP 1] Fetching AI news from RSS feeds...")
    news_items = fetch_ai_news()

    if not news_items:
        print("[WARN] No AI news found today")
        return

    print(f"[OK] Found {len(news_items)} AI news items")
    print()

    # 生成汇总
    print("[STEP 2] Generating news summary...")
    news_summary = generate_news_summary(news_items, today)

    if not news_summary:
        print("[ERROR] Failed to generate summary")
        return

    print(f"[OK] Title: {news_summary['title']}")
    print(f"[OK] Items: {len(news_summary['newsItems'])}")
    print()

    # 更新数据文件
    print("[STEP 3] Updating ai-news-summary.ts...")
    file_path = Path('../src/data/ai-news-summary.ts')

    if update_ai_news_file(news_summary, file_path):
        print(f"[OK] File updated: {file_path}")
    else:
        print("[SKIP] No update needed")

    print()
    print("[DONE] AI news generation completed!")

if __name__ == '__main__':
    main()
