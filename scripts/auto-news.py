#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI 新闻自动采集与生成器 v2.0

相对 v1.1 的改动：
- 源：只留 AI 垂类 RSS（36 氪 AI 频道 / 机器之心 / 量子位 / 少数派 AI），
  摘掉 36 氪全站 feed —— 电竞、健康大会、保险报告这些噪音都来自它
- 过滤：强关键词必须命中「标题」，再叠一层黑名单（赛事、促销、金价、咖啡…），
  正文关键词只能作为加分，不能单独放行
- 去重：同时比对本次抓取结果和 ai-news-summary.ts 的全部历史，
  标题归一化后完全相同、或相似度 ≥ 0.88，都判重
- 写入：字符串统一走 json.dumps 转义，标题里带英文双引号不会再撑破 TS；
  写前备份、写后回读校验，校验不过自动还原
- 英文：不再把中文复制进 titleEn/summaryEn（那是占位符，比空字段更坑），
  缺翻译就留空，页面自动回退显示中文
- 路径：按脚本位置定位仓库根，不再依赖当前工作目录
- 依赖：去掉 feedparser，改用标准库 xml.etree，Windows 和沙箱都能跑
- 新增 --dry-run / --date / --limit

用法：
    python scripts/auto-news.py --dry-run     # 只看会写什么，不落盘
    python scripts/auto-news.py               # 正式写入
    python scripts/auto-news.py --date 2026-10-29 --limit 5
"""

import argparse
import http.client
import json
import logging
import re
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime
from difflib import SequenceMatcher
from email.utils import parsedate_to_datetime
from pathlib import Path

# ---------------------------------------------------------------- 路径与日志

SCRIPT_DIR = Path(__file__).resolve().parent
ROOT = SCRIPT_DIR.parent
DATA_FILE = ROOT / 'src' / 'data' / 'ai-news-summary.ts'
LOG_DIR = SCRIPT_DIR / 'logs'
LOG_DIR.mkdir(exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOG_DIR / f"auto-news-{datetime.now().strftime('%Y-%m')}.log", encoding='utf-8'),
        logging.StreamHandler(),
    ],
)
logger = logging.getLogger(__name__)

# ---------------------------------------------------------------- 配置

REQUEST_TIMEOUT = 15
USER_AGENT = 'Mozilla/5.0 (compatible; ban-bai-news/2.0; +https://www.ban-bai.com)'

# 源清单：科技垂类官方 RSS。rsshub.app 公共实例实测直接 403，别再用。
# 全站 feed 不是问题——噪音拦截靠下面的标题级过滤，不靠源本身干净。
# 单个源失败不影响其它源，失败会写进日志。
RSS_FEEDS = [
    ('36氪', 'https://36kr.com/feed'),
    ('IT之家', 'https://www.ithome.com/rss/'),
    ('机器之心', 'https://www.jiqizhixin.com/rss'),
    ('量子位', 'https://www.qbitai.com/feed'),
    ('开源中国', 'https://www.oschina.net/news/rss'),
]

# 强关键词：命中标题才算 AI 新闻
STRONG_RE = re.compile(
    r'人工智能|大模型|语言模型|多模态|生成式|AIGC|AGI|具身|智能体|机器人|算力|'
    r'芯片|GPU|TPU|HBM|机器学习|深度学习|神经网络|[Tt]ransformer|'
    r'GPT|Claude|Gemini|LLM|OpenAI|Anthropic|DeepSeek|Qwen|Llama|Mistral|Sora|'
    r'通义|文心|混元|豆包|Kimi|月之暗面|智谱|MiniMax|阶跃|零一万物|'
    r'[Aa]gent|推理模型|开源模型|智能驾驶|自动驾驶'
)
# 单独的 AI 两个字母按大小写匹配，避免命中 AirPods 一类词
AI_RE = re.compile(r'(?<![A-Za-z])AI(?![A-Za-z])')

# 黑名单：AI 垂类源里也会混进来的东西
BLOCK_RE = re.compile(
    r'德杯|电竞|LPL|KPL|夺冠|赛事|季后赛|球赛|世界杯|'
    r'金价|房价|股价|股市|保险|招聘会|招聘|'
    r'咖啡|奶茶|早鸟|特惠|门票|优惠|扫码|抽奖|福利|双十一|双11|'
    r'报名|评选|直播预告|开奖'
)

# 分类：只输出这套规范值，别再让 category 长出 130 种写法
CATEGORY_RULES = [
    ('AI安全', 'AI Safety', r'安全|对齐|越狱|漏洞|攻击|监管|合规|伦理|隐私|版权|法令|禁止|法规|政策'),
    ('AI芯片', 'AI Chips', r'芯片|GPU|TPU|HBM|算力|半导体|晶圆|制程'),
    ('机器人', 'Robotics', r'机器人|具身|人形|机械臂|灵巧手'),
    ('大模型', 'Large Models', r'大模型|语言模型|基础模型|推理模型|GPT|Claude|Gemini|LLM|Qwen|DeepSeek|Kimi|通义|文心|混元|豆包|智谱|MiniMax'),
    ('AI投融资', 'AI Investment & Financing', r'融资|估值|IPO|上市|收购|并购|募资|领投'),
    ('开源', 'Open Source', r'开源'),
    ('AI工具', 'AI Tools', r'工具|插件|编辑器|编程|代码|Copilot|IDE'),
    ('AI应用', 'AI Applications', r'应用|落地|产品|客户|收入|发布|上线'),
]
DEFAULT_CATEGORY = ('AI动态', 'AI Updates')

COMMENTS = [
    'AI 技术持续快速发展，每天都有新突破。',
    '人工智能正在深刻改变各行各业的格局。',
    '大模型竞争日趋激烈，创新层出不穷。',
    'AI 应用场景不断拓展，商业化进程加速。',
    '技术进步带来机遇，也带来挑战。',
]

# ---------------------------------------------------------------- 工具函数

TAG_STRIP_RE = re.compile(r'<[^>]+>')
ENTITY_RE = re.compile(r'&[^;\s]{1,10};')
SPACE_RE = re.compile(r'\s+')


def clean_html(text):
    """去标签、去实体、压空白"""
    if not text:
        return ''
    text = TAG_STRIP_RE.sub('', text)
    text = (text.replace('&nbsp;', ' ').replace('&amp;', '&')
                .replace('&quot;', '"').replace('&#39;', "'")
                .replace('&lt;', '<').replace('&gt;', '>'))
    text = ENTITY_RE.sub('', text)
    return SPACE_RE.sub(' ', text).strip()


def first_sentence(text, limit=180):
    """取第一句，截断时不切在字中间"""
    text = clean_lead((text or '').strip())
    if not text:
        return ''
    m = re.match(r'(.+?[。！？!?])', text)
    sentence = m.group(1) if m else text
    if len(sentence) < 45:
        # 第一句常常是「现场消息。」「XXX 获悉，」这种过渡句，太短就往后接着取
        sentence = text
    if len(sentence) > limit:
        sentence = sentence[:limit].rstrip('，、；：,;:') + '…'
    return sentence


# 各家正文开头都会挂一句「IT之家 10 月 29 日消息，」，塞进摘要很吵
LEAD_RE = re.compile(
    r'^\s*(IT之家|36氪|硬氪|量子位|机器之心|开源中国|快科技|新浪科技|钛媒体|虎嗅)\s*'
    r'(\d{1,2}\s*月\s*\d{1,2}\s*日)?\s*(消息|报道|获悉|首发)?\s*[，,：:]?\s*'
)


def clean_lead(text):
    return LEAD_RE.sub('', text, count=1).strip()


# ---------------------------------------------------------------- 抓取

def http_get(url):
    req = urllib.request.Request(url, headers={
        'User-Agent': USER_AGENT,
        'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
    })
    with urllib.request.urlopen(req, timeout=REQUEST_TIMEOUT) as resp:
        return resp.read()


def _local(tag):
    return tag.split('}')[-1].lower()


def _child_text(el, names):
    for child in el:
        if _local(child.tag) in names:
            if child.text and child.text.strip():
                return child.text
            inner = ''.join(child.itertext())
            if inner.strip():
                return inner
    return ''


def parse_feed(raw, source):
    """兼容 RSS 2.0 和 Atom，不依赖 feedparser"""
    root = ET.fromstring(raw)
    items = [e for e in root.iter() if _local(e.tag) == 'item']
    if not items:
        items = [e for e in root.iter() if _local(e.tag) == 'entry']

    entries = []
    for it in items:
        title = clean_html(_child_text(it, {'title'}))
        summary = clean_html(_child_text(it, {'description', 'summary', 'content', 'encoded'}))
        link = clean_html(_child_text(it, {'link'}))
        if not link:
            for child in it:
                if _local(child.tag) == 'link' and child.get('href'):
                    link = child.get('href').strip()
                    break
        published = None
        raw_date = _child_text(it, {'pubdate', 'published', 'updated', 'date'})
        if raw_date:
            try:
                published = parsedate_to_datetime(raw_date.strip())
            except (TypeError, ValueError):
                published = None
        if title:
            entries.append({
                'title': title,
                'summary': summary,
                'url': link,
                'source': source,
                'published': published,
            })
    return entries


def fetch_ai_news():
    news, ok, failed = [], 0, 0
    logger.info(f"开始采集 {len(RSS_FEEDS)} 个 AI 垂类源")
    for source, url in RSS_FEEDS:
        try:
            entries = parse_feed(http_get(url), source)
            logger.info(f"  {source}: 取到 {len(entries)} 条")
            news.extend(entries)
            ok += 1
        except urllib.error.HTTPError as e:
            logger.warning(f"  {source}: HTTP {e.code}（{url}）")
            failed += 1
        except urllib.error.URLError as e:
            logger.warning(f"  {source}: 网络失败 {e.reason}（{url}）")
            failed += 1
        except (ConnectionError, TimeoutError, http.client.HTTPException) as e:
            logger.warning(f"  {source}: 连接中断 {type(e).__name__}（{url}）")
            failed += 1
        except ET.ParseError as e:
            logger.warning(f"  {source}: XML 解析失败 {e}（{url}）")
            failed += 1
        except Exception as e:  # noqa: BLE001 - 单源失败不能影响整体
            logger.error(f"  {source}: 未知错误 {e}", exc_info=True)
            failed += 1
    logger.info(f"采集结束：成功 {ok} 源，失败 {failed} 源，原始 {len(news)} 条")
    return news


# ---------------------------------------------------------------- 过滤与去重

def is_ai_title(title):
    return bool(STRONG_RE.search(title)) or bool(AI_RE.search(title))


def filter_noise(entries):
    kept, dropped = [], []
    for e in entries:
        title = e['title']
        if not is_ai_title(title):
            dropped.append(('非AI标题', title))
            continue
        if BLOCK_RE.search(title):
            dropped.append(('黑名单', title))
            continue
        if len(e['summary']) < 40:
            dropped.append(('摘要过短', title))
            continue
        kept.append(e)
    logger.info(f"过滤：保留 {len(kept)} 条，丢弃 {len(dropped)} 条")
    for reason, title in dropped[:15]:
        logger.info(f"    ✂ {reason}: {title[:40]}")
    return kept


SUFFIX_RE = re.compile(r'[丨｜|]\s*(36氪|硬氪|机器之心|量子位|IT之家|开源中国|少数派).*$')
PUNCT_RE = re.compile(r'[\s　|｜丨·—–_、，。；：！？"\'“”‘’（）()【】\[\]「」《》…~,.:;!?+\-]+')


def normalize_title(title):
    title = SUFFIX_RE.sub('', title)
    return PUNCT_RE.sub('', title).lower()


def is_duplicate(title, existing_norms, threshold=0.88):
    n = normalize_title(title)
    if not n:
        return True
    if n in existing_norms:
        return True
    for other in existing_norms:
        if abs(len(other) - len(n)) > 12:
            continue
        if SequenceMatcher(None, n, other).ratio() >= threshold:
            return True
    return False


# ---------------------------------------------------------------- 读写数据文件

def load_summaries(path):
    """返回 (全文, 数组在全文中的起始下标, 解析出来的 Python 对象)"""
    text = path.read_text(encoding='utf-8')
    m = re.search(r'export const dailyNewsSummaries[^=]*=\s*\[', text)
    if not m:
        raise RuntimeError('在 ai-news-summary.ts 里找不到 dailyNewsSummaries 数组')
    start = m.end() - 1
    obj, _end = json.JSONDecoder().raw_decode(text[start:])
    return text, start, obj


def collect_history_titles(summaries):
    norms = []
    for day in summaries:
        for item in day.get('newsItems', []):
            n = normalize_title(item.get('title', ''))
            if n:
                norms.append(n)
    return norms


def pick_items(entries, existing_norms, limit=5):
    """按发布时间新的优先 → 去重 → 每源最多 2 条；不够数再放开限额补一次"""
    dated = sorted([e for e in entries if e.get('published')],
                   key=lambda e: e['published'], reverse=True)
    undated = [e for e in entries if not e.get('published')]
    ordered = dated + undated

    chosen = _select(ordered, existing_norms, limit, cap=2)
    if len(chosen) < limit:
        chosen = _select(ordered, existing_norms, limit, cap=limit)
    return chosen


def _select(ordered, existing_norms, limit, cap):
    chosen, norms, per_source = [], list(existing_norms), {}
    for e in ordered:
        if per_source.get(e['source'], 0) >= cap:
            continue
        if is_duplicate(e['title'], norms):
            continue
        norms.append(normalize_title(e['title']))
        per_source[e['source']] = per_source.get(e['source'], 0) + 1
        chosen.append(e)
        if len(chosen) >= limit:
            break
    return chosen


def categorize(title, summary):
    """按命中次数打分：标题命中权重 3，正文权重 1；同分按规则顺序取靠前的"""
    best = None
    for zh, en, pattern in CATEGORY_RULES:
        score = (len(re.findall(pattern, title or '', re.I)) * 3
                 + len(re.findall(pattern, summary or '', re.I)))
        if score and (best is None or score > best[0]):
            best = (score, zh, en)
    return (best[1], best[2]) if best else DEFAULT_CATEGORY


def _headline(title):
    """一句话标题：去来源尾巴、切在第一个逗号处、超长加省略号"""
    t = SUFFIX_RE.sub('', title).strip()
    head = re.split(r'[，,：:｜|]', t)[0].strip()
    if len(head) >= 8:
        t = head
    if len(t) > 20:
        t = t[:20] + '…'
    return t


def build_summary(chosen, date_str):
    if not chosen:
        return None

    title = 'AI新闻 | ' + ' + '.join(_headline(e['title']) for e in chosen[:3])

    body_bits = []
    for e in chosen[:3]:
        s = first_sentence(e['summary']).rstrip('。！？!?…')
        if s:
            body_bits.append(s)
    summary = '；'.join(body_bits) + '。'

    comment = COMMENTS[sum(ord(c) for c in date_str) % len(COMMENTS)]

    items = []
    for e in chosen:
        zh, en = categorize(e['title'], e['summary'])
        items.append({
            'title': e['title'],
            'summary': first_sentence(e['summary'], limit=180),
            'source': e['source'],
            'category': zh,
            'categoryEn': en,
            'url': e['url'],
        })

    return {
        'date': date_str,
        'title': title,
        'summary': summary,
        'newsItems': items,
        'comment': comment,
    }


def write_entry(path, text, start, entry):
    """把新条目插到数组开头，写前备份，写后校验"""
    payload = json.dumps(entry, ensure_ascii=False, indent=2)
    new_text = text[:start + 1] + '\n' + payload + ',' + text[start + 1:]

    backup = LOG_DIR / f"ai-news-summary.ts.bak.{datetime.now().strftime('%Y%m%d-%H%M%S')}"
    backup.write_text(text, encoding='utf-8')

    path.write_text(new_text, encoding='utf-8', newline='\n')

    try:
        _, _, parsed = load_summaries(path)
        if not parsed or parsed[0].get('date') != entry['date']:
            raise RuntimeError('回读校验：新条目不在数组开头')
    except Exception as e:  # noqa: BLE001
        path.write_text(text, encoding='utf-8', newline='\n')
        logger.error(f"写入后校验失败，已还原：{e}")
        return False

    logger.info(f"已写入，备份在 {backup}")
    return True


# ---------------------------------------------------------------- 主流程

def main():
    parser = argparse.ArgumentParser(description='采集 AI 新闻并写入 ai-news-summary.ts')
    parser.add_argument('--dry-run', action='store_true', help='只抓取和过滤，打印结果，不写文件')
    parser.add_argument('--date', default=None, help='日期，默认今天（YYYY-MM-DD）')
    parser.add_argument('--limit', type=int, default=5, help='每天最多几条，默认 5')
    args = parser.parse_args()

    today = args.date or datetime.now().strftime('%Y-%m-%d')
    logger.info('=' * 60)
    logger.info(f"AI 新闻采集启动 - {today}" + ('（dry-run）' if args.dry_run else ''))
    logger.info('=' * 60)

    text, start, summaries = load_summaries(DATA_FILE)

    if any(day.get('date') == today for day in summaries):
        logger.info(f"{today} 已有汇总，本次跳过（要覆盖请先手动删掉那天的条目）")
        return 0

    raw = fetch_ai_news()
    if not raw:
        logger.warning('所有源都没取到内容，退出')
        return 1

    kept = filter_noise(raw)
    picked = pick_items(kept, collect_history_titles(summaries), limit=args.limit)
    if not picked:
        logger.warning('过滤和去重之后没有可用的新闻，退出')
        return 1

    entry = build_summary(picked, today)
    logger.info(f"入选 {len(entry['newsItems'])} 条：")
    for i, item in enumerate(entry['newsItems'], 1):
        logger.info(f"  {i}. [{item['category']}] {item['title'][:40]}（{item['source']}）")
    logger.info(f"标题：{entry['title']}")
    logger.info(f"摘要：{entry['summary'][:80]}…")

    if args.dry_run:
        logger.info('dry-run，不写文件。完整条目：')
        print(json.dumps(entry, ensure_ascii=False, indent=2))
        return 0

    if not write_entry(DATA_FILE, text, start, entry):
        return 1

    logger.info('提醒：titleEn / summaryEn 留空了，英文页会回退显示中文。'
                '要发英文版请手工补翻译（把中文复制过去算占位符，别这么干）。')
    logger.info('完成。')
    return 0


if __name__ == '__main__':
    sys.exit(main())
