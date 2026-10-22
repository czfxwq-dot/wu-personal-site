#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI新闻自动采集与生成器 v1.1
- 从 RSS 源采集 AI 相关新闻
- 生成每日新闻汇总
- 更新 ai-news-summary.ts 数据文件
- 添加完整日志记录
- 优化网络超时处理
"""

import feedparser
import requests
from datetime import datetime
from pathlib import Path
import re
import random
import logging

# 配置日志
log_dir = Path(__file__).parent / 'logs'
log_dir.mkdir(exist_ok=True)
log_file = log_dir / f"auto-news-{datetime.now().strftime('%Y-%m')}.log"

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(log_file, encoding='utf-8'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# 网络请求超时设置（秒）
REQUEST_TIMEOUT = 10

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

def clean_html(text):
    """清理 HTML 标签"""
    # 移除 HTML 标签
    clean = re.sub(r'<[^>]+>', '', text)
    # 移除 HTML 实体
    clean = re.sub(r'&[^;]+;', '', clean)
    # 移除多余空白
    clean = re.sub(r'\s+', ' ', clean).strip()
    return clean

def fetch_ai_news():
    """从 RSS 源采集 AI 新闻"""
    news_items = []
    success_count = 0
    fail_count = 0

    logger.info(f"开始从 {len(RSS_FEEDS)} 个 RSS 源采集新闻")

    for feed_url in RSS_FEEDS:
        try:
            logger.info(f"正在采集: {feed_url}")

            # 使用 requests 先获取内容，设置超时
            response = requests.get(feed_url, timeout=REQUEST_TIMEOUT)
            response.raise_for_status()

            # 解析 RSS
            feed = feedparser.parse(response.content)

            entry_count = 0
            for entry in feed.entries[:10]:  # 每个源取前10条
                title = entry.get('title', '')
                summary = entry.get('summary', '')
                link = entry.get('link', '')

                # 检查是否包含 AI 关键词
                if any(keyword.lower() in (title + summary).lower() for keyword in AI_KEYWORDS):
                    news_items.append({
                        'title': clean_html(title),
                        'summary': clean_html(summary)[:200],  # 限制摘要长度
                        'source': feed.feed.get('title', '未知来源'),
                        'url': link
                    })
                    entry_count += 1

            logger.info(f"成功采集 {entry_count} 条相关新闻")
            success_count += 1

        except requests.exceptions.Timeout:
            logger.warning(f"采集超时 ({REQUEST_TIMEOUT}s): {feed_url}")
            fail_count += 1
        except requests.exceptions.RequestException as e:
            logger.warning(f"网络请求失败: {feed_url} - {e}")
            fail_count += 1
        except Exception as e:
            logger.error(f"采集失败: {feed_url} - {e}", exc_info=True)
            fail_count += 1

    logger.info(f"采集完成: 成功 {success_count} 个源, 失败 {fail_count} 个源")

    # 去重（按标题）
    seen_titles = set()
    unique_news = []
    for item in news_items:
        if item['title'] not in seen_titles:
            seen_titles.add(item['title'])
            unique_news.append(item)

    logger.info(f"去重后共 {len(unique_news)} 条新闻，返回前 10 条")
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
        logger.info(f"开始更新文件: {file_path}")

        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # 检查是否已存在该日期的新闻
        if f'"date": "{news_summary["date"]}"' in content:
            logger.info(f"新闻已存在: {news_summary['date']}")
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

            logger.info("文件更新成功")
            return True
        else:
            logger.error("无法找到插入位置")
            return False

    except Exception as e:
        logger.error(f"更新文件失败: {e}", exc_info=True)
        return False

def main():
    """主函数"""
    today = datetime.now().strftime('%Y-%m-%d')

    logger.info("=" * 60)
    logger.info(f"AI新闻采集器启动 - {today}")
    logger.info("=" * 60)

    try:
        # 采集新闻
        logger.info("步骤 1/3: 从 RSS 源采集 AI 新闻...")
        news_items = fetch_ai_news()

        if not news_items:
            logger.warning("今天没有找到 AI 新闻")
            return

        logger.info(f"找到 {len(news_items)} 条 AI 新闻")

        # 生成汇总
        logger.info("步骤 2/3: 生成新闻汇总...")
        news_summary = generate_news_summary(news_items, today)

        if not news_summary:
            logger.error("生成新闻汇总失败")
            return

        logger.info(f"标题: {news_summary['title']}")
        logger.info(f"新闻数量: {len(news_summary['newsItems'])}")

        # 更新数据文件
        logger.info("步骤 3/3: 更新 ai-news-summary.ts...")
        file_path = Path('../src/data/ai-news-summary.ts')

        if update_ai_news_file(news_summary, file_path):
            logger.info(f"文件已更新: {file_path}")
        else:
            logger.warning("文件未更新（可能已存在或出错）")

        logger.info("=" * 60)
        logger.info("AI新闻采集完成！")
        logger.info("=" * 60)

    except Exception as e:
        logger.error(f"AI新闻采集失败: {e}", exc_info=True)
        raise

if __name__ == '__main__':
    main()
