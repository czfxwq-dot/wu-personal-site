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
import os
import re
import subprocess
import sys
import time
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

REQUEST_TIMEOUT = 25
USER_AGENT = 'Mozilla/5.0 (compatible; ban-bai-news/2.0; +https://www.ban-bai.com)'

# 源清单：科技垂类官方 RSS。rsshub.app 公共实例实测直接 403，别再用。
# 全站 feed 不是问题——噪音拦截靠下面的标题级过滤，不靠源本身干净。
# 单个源失败不影响其它源，失败会写进日志。
#
# 已失效（2026-11-01 实测，返回 text/html 反爬验证页而不是 XML，属长期封禁，别再放回来）：
#   36氪 https://36kr.com/feed      机器之心 https://www.jiqizhixin.com/rss
RSS_FEEDS = [
    ('IT之家', 'https://www.ithome.com/rss/'),
    ('量子位', 'https://www.qbitai.com/feed'),
    ('开源中国', 'https://www.oschina.net/news/rss'),
    ('雷锋网', 'https://www.leiphone.com/feed'),
    ('极客公园', 'https://www.geekpark.net/rss'),
    ('InfoQ', 'https://www.infoq.cn/feed'),
]

# 源健康阈值（E011）：单源失败必须被看见，不能再「悄悄从 6 个源变成 5 个源」。
# 成功率低于 HEALTH_MIN_RATE，或 KEY_SOURCES 里任一源失败 → 判定降级：
# 写 NEEDS_ATTENTION.txt 标记文件 + 退出码 2，让计划任务的 Result 能被一眼看出。
HEALTH_MIN_RATE = 0.8
KEY_SOURCES = ('IT之家', '量子位')  # 关键源：漏了会明显影响当天质量
ATTENTION_FILE = LOG_DIR / 'NEEDS_ATTENTION.txt'
HEALTH_JSONL = LOG_DIR / 'source-health.jsonl'

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
    r'报名|评选|直播预告|开奖|'
    # 厂商稿与活动报道：雷锋网这类内容多，标题通常是「XX 如何让 AI 走进业务」「N 位嘉宾判断」
    r'如何让|怎么让|嘉宾|圆桌|专访|对谈|实录|闭门|沙龙|'
    # 厂商自家产品的更新贴，不是新闻（开源中国常出这种「本周更新：上线 XX 模块」）
    r'本周更新|产品更新|更新日志|版本更新说明'
)

# 分类：只输出这套规范值，别再让 category 长出 130 种写法
CATEGORY_RULES = [
    ('AI安全', 'AI Safety', r'安全|对齐|越狱|漏洞|攻击|监管|合规|伦理|隐私|法令|禁止|法规|政策'),
    ('AI芯片', 'AI Chips', r'芯片|GPU|TPU|HBM|算力|半导体|晶圆|制程'),
    ('机器人', 'Robotics', r'机器人|具身|人形|机械臂|灵巧手'),
    ('大模型', 'Large Models', r'大模型|语言模型|基础模型|推理模型|GPT|Claude|Gemini|LLM|Qwen|DeepSeek|Kimi|通义|文心|混元|豆包|智谱|MiniMax'),
    ('AI投融资', 'AI Investment & Financing', r'融资|估值|IPO|上市|收购|并购|募资|领投'),
    ('开源', 'Open Source', r'开源'),
    ('AI工具', 'AI Tools', r'工具|插件|编辑器|编程|代码|Copilot|IDE'),
    ('AI应用', 'AI Applications', r'应用|落地|产品|客户|收入|发布|上线'),
]
DEFAULT_CATEGORY = ('AI动态', 'AI Updates')

# 点评以前是 6 句固定套话按日期哈希轮转，每天必然产出空话（2026-11-01 废弃）。
# 现在：_llm_enrich() 调 DeepSeek 生成有观点的点评 + 全套英文；没 key 或调用失败时
# 用 _fallback_comment() 拼一句事实索引，虽然机械，但不会再说“竞争日趋激烈”。

# ---------------------------------------------------------------- 工具函数

TAG_STRIP_RE = re.compile(r'<[^>]+>')
ENTITY_RE = re.compile(r'&[^;\s]{1,10};')
ZERO_WIDTH_RE = re.compile(r'[\u200b\u200c\u200d\u2060\ufeff]')
SPACE_RE = re.compile(r'\s+')


def clean_html(text):
    """去标签、去实体、去零宽字符、压空白"""
    if not text:
        return ''
    text = TAG_STRIP_RE.sub('', text)
    text = (text.replace('&nbsp;', ' ').replace('&amp;', '&')
                .replace('&quot;', '"').replace('&#39;', "'")
                .replace('&lt;', '<').replace('&gt;', '>'))
    text = ENTITY_RE.sub('', text)
    # 极客公园等源的 HTML 里夹着零宽空格/零宽连接符，粘到摘要里会变成看不见的乱码
    text = ZERO_WIDTH_RE.sub('', text)
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


# XML 1.0 不允许的控制字符：源端偶尔把二进制垃圾塞进 CDATA，expat 会直接罢工
INVALID_XML_RE = re.compile(r'[\x00-\x08\x0b\x0c\x0e-\x1f]')
XML_DECL_RE = re.compile(r'^\s*<\?xml[^>]*\?>')


def _decode_lenient(raw):
    """坏字节不抛异常：先试 UTF-8，再试 GB18030，最后替换掉解不了的部分。
    雷锋网 2026-11-02 就是吐了半截多字节字符，导致整源被丢弃。"""
    for enc in ('utf-8', 'gb18030'):
        try:
            return raw.decode(enc)
        except UnicodeDecodeError:
            continue
    return raw.decode('utf-8', errors='replace')


def _salvage_feed(text):
    """把「抓到一半」的 feed 救回来：切到最后一个完整条目，补上闭合标签。
    只在解析失败时兜底，正常源走不到这里。"""
    if '<item' in text:
        tag, tail = 'item', '</channel></rss>'
    elif '<entry' in text:
        tag, tail = 'entry', '</feed>'
    else:
        return ''
    end = text.rfind(f'</{tag}>')
    if end == -1:
        return ''
    return text[:end + len(tag) + 3] + tail


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
    """兼容 RSS 2.0 和 Atom，不依赖 feedparser。

    返回 (entries, repaired)。源端坏包有两类，都会让 ET 直接抛 ParseError：
      · 坏字节（半截 UTF-8 / 控制字符）→ 容错解码后重解析
      · 抓到一半（响应被截断）→ 切到最后一个完整条目再补闭合标签
    修好了就把 repaired 标记回传，让源健康表能看出「这个源吐过坏包」。
    """
    repaired = False
    try:
        root = ET.fromstring(raw)
    except ET.ParseError as first_err:
        text = INVALID_XML_RE.sub('', XML_DECL_RE.sub('', _decode_lenient(raw)))
        try:
            root = ET.fromstring(text)
            repaired = True
        except ET.ParseError:
            salvaged = _salvage_feed(text)
            if not salvaged:
                raise first_err from None
            root = ET.fromstring(salvaged)
            repaired = True

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
    return entries, repaired


def _err_brief(exc):
    """把异常压成一行，日志里好看"""
    if isinstance(exc, urllib.error.HTTPError):
        return f'HTTP {exc.code}'
    if isinstance(exc, urllib.error.URLError):
        return f'网络失败 {exc.reason}'
    if isinstance(exc, ET.ParseError):
        return f'XML 解析失败 {exc}'
    if isinstance(exc, (ConnectionError, TimeoutError, http.client.HTTPException)):
        return f'连接中断 {type(exc).__name__}'
    return f'{type(exc).__name__}: {exc}'


def fetch_ai_news(retry=2):
    """逐个源抓取，返回 (news, health)。health 就是源健康表的原始数据。

    重试 2 次（最多 3 次尝试）：雷锋网实测 502 很密——2026-11-03 20:50 连测两次，
    第一次就是 502，第二次才 200。只重试一次等于一半概率白丢一个源。
    重试后仍失败就跳过，绝不影响其它源。但失败**必须被记录**（E011）：源少了不能
    被日志里的一行 WARNING 带过去，收尾要出健康表。
    """
    news, health = [], []
    logger.info(f"开始采集 {len(RSS_FEEDS)} 个 AI 垂类源")
    for source, url in RSS_FEEDS:
        started = time.time()
        entries, last, attempts, repaired = None, None, 0, False
        for attempt in range(retry + 1):
            attempts = attempt + 1
            try:
                entries, repaired = parse_feed(http_get(url), source)
                break
            except Exception as e:  # noqa: BLE001 - 单源失败不能影响整体
                last = e
                if attempt < retry:
                    logger.warning(f"  {source}: 第 {attempt + 1} 次失败（{_err_brief(e)}），2 秒后重试")
                    time.sleep(2)
        elapsed = round(time.time() - started, 1)
        record = {
            'source': source,
            'url': url,
            'ok': entries is not None,
            'count': len(entries) if entries is not None else 0,
            'seconds': elapsed,
            'attempts': attempts,
            'repaired': repaired,
            'error': '' if entries is not None else _err_brief(last),
        }
        health.append(record)
        if entries is None:
            logger.warning(f"  {source}: {record['error']}（{url}）")
            continue
        suffix = '（修复坏包后解析成功）' if repaired else ''
        logger.info(f"  {source}: 取到 {len(entries)} 条{suffix}")
        news.extend(entries)
    return news, health


def _src_width(text, width):
    """按显示宽度补空格：中文按 2 列算，否则健康表在终端里会歪"""
    shown = sum(2 if ord(ch) > 0x2E80 else 1 for ch in text)
    return text + ' ' * max(1, width - shown)


def report_source_health(health):
    """打印源健康表、追加一条 JSONL 供事后看趋势，并在降级时落 NEEDS_ATTENTION 标记。
    返回 True 表示降级（调用方决定退出码）。"""
    total = len(health)
    ok = sum(1 for h in health if h['ok'])
    rate = ok / total if total else 0.0
    failed = [h for h in health if not h['ok']]
    key_failed = [h['source'] for h in failed if h['source'] in KEY_SOURCES]
    repaired = [h['source'] for h in health if h.get('repaired')]

    logger.info('源健康表：')
    logger.info(f"  {_src_width('源', 10)}{_src_width('状态', 8)}{'条数':>5}{'耗时':>8}  备注")
    for h in health:
        status = 'OK' if h['ok'] else 'FAIL'
        note = h['error'] or ('修复坏包' if h.get('repaired') else '')
        if h['ok'] and h['attempts'] > 1:
            note = f"第 {h['attempts']} 次才成功" + (f"；{note}" if note else '')
        logger.info(f"  {_src_width(h['source'], 10)}{_src_width(status, 8)}"
                    f"{h['count']:>5}{h['seconds']:>7.1f}s  {note}")
    logger.info(f"汇总：成功 {ok}/{total} 源（{rate:.0%}）"
                + (f"；失败：{'、'.join(h['source'] for h in failed)}" if failed else '')
                + (f"；坏包已修复：{'、'.join(repaired)}" if repaired else ''))

    degraded = rate < HEALTH_MIN_RATE or bool(key_failed)
    try:
        with HEALTH_JSONL.open('a', encoding='utf-8') as fh:
            fh.write(json.dumps({
                'run_at': datetime.now().isoformat(timespec='seconds'),
                'ok': ok, 'total': total, 'rate': round(rate, 3),
                'degraded': degraded, 'sources': health,
            }, ensure_ascii=False) + '\n')
    except OSError as e:
        logger.warning(f'健康快照写入失败：{e}')

    if degraded:
        reason = []
        if rate < HEALTH_MIN_RATE:
            reason.append(f'成功率 {rate:.0%} 低于阈值 {HEALTH_MIN_RATE:.0%}')
        if key_failed:
            reason.append(f"关键源失败：{'、'.join(key_failed)}")
        detail = '；'.join(reason)
        logger.error(f'源健康降级：{detail}')
        try:
            ATTENTION_FILE.write_text(
                f'{datetime.now().strftime("%Y-%m-%d %H:%M:%S")} 源健康降级：{detail}\n'
                + ''.join(f"  {h['source']}: {h['error']}\n" for h in failed),
                encoding='utf-8')
            logger.error(f'已写标记文件 {ATTENTION_FILE.relative_to(ROOT)}（下次健康时自动清除）')
        except OSError as e:
            logger.warning(f'标记文件写入失败：{e}')
    elif ATTENTION_FILE.exists():
        try:
            ATTENTION_FILE.unlink()
            logger.info('源健康恢复正常，已清除 NEEDS_ATTENTION 标记')
        except OSError as e:
            logger.warning(f'标记文件清除失败：{e}')
    return degraded


# ---------------------------------------------------------------- 过滤与去重

def is_ai_title(title):
    return bool(STRONG_RE.search(title)) or bool(AI_RE.search(title))


def is_roundup_title(title):
    """合集型标题：一家源把几条新闻塞进同一个标题（极客公园那种「A；B；C」早报）。
    这种条目既不能当单条新闻用，摘要也会把三件事揉在一起，直接丢掉。"""
    parts = [s for s in re.split(r'[；;]', title) if len(s.strip()) >= 6]
    return len(parts) >= 2


# 消费电子硬件标题：含「芯片 / DAC」但本身不是 AI 新闻（2026-11-03 海贝 HiBy 播放器被分到「AI芯片」）
# 判据：命中下面任一词，且标题里没有任何 AI 强语境 → 丢弃。强语境兜底，避免误杀「AI 眼镜 / 大模型音箱」。
CONSUMER_HW_RE = re.compile(
    r'播放器|耳机|耳放|音箱|音响|功放|解码器|DAC|相机|镜头|手表|手环|键盘|鼠标|显示器|充电器|移动电源|电纸书'
)

# AI 强语境词：出现任何一个就认为这条确实在讲 AI，不按消费硬件丢弃
AI_CONTEXT_RE = re.compile(
    r'(?<![A-Za-z])AI(?![A-Za-z])|人工智能|大模型|语言模型|模型|算法|智能体|生成式|机器学习|深度学习|神经网络|训练|推理|算力'
)


def filter_noise(entries):
    kept, dropped = [], []
    for e in entries:
        title = e['title']
        if not is_ai_title(title):
            dropped.append(('非AI标题', title))
            continue
        if is_roundup_title(title):
            dropped.append(('合集标题', title))
            continue
        if CONSUMER_HW_RE.search(title) and not AI_CONTEXT_RE.search(title):
            dropped.append(('非AI消费硬件', title))
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


def _headline(title, limit=24):
    """一句话标题：去来源尾巴、切在第一个逗号处、超长加省略号"""
    t = SUFFIX_RE.sub('', title).strip()
    head = re.split(r'[，,：:｜|]', t)[0].strip()
    if len(head) >= 8:
        t = head
    if len(t) > limit:
        t = t[:limit] + '…'
    return t


LLM_MODEL = 'deepseek-chat'
LLM_URL = 'https://api.deepseek.com/v1/chat/completions'


def _llm_key():
    """DeepSeek key 读取顺序：
    1. Windows 凭据管理器（keyring，服务名 deepseek / 用户名 api_key）——推荐，DPAPI 加密
    2. 环境变量 DEEPSEEK_API_KEY / LLM_API_KEY
    3. 桌面 deepseek-key.txt / 仓库 .dev.vars（明文兜底，不推荐）
    存 key 命令：python -c "import keyring; keyring.set_password('deepseek', 'api_key', 'sk-xxx')"
    """
    try:
        import keyring
        v = (keyring.get_password('deepseek', 'api_key') or '').strip()
        if v.startswith('sk-'):
            return v
    except Exception:
        pass  # keyring 未安装或后端不可用，静默降级到下一来源
    for name in ('DEEPSEEK_API_KEY', 'LLM_API_KEY'):
        v = os.environ.get(name, '').strip()
        if v.startswith('sk-'):
            return v
    for p in (Path.home() / 'Desktop' / 'deepseek-key.txt', ROOT / '.dev.vars'):
        try:
            if not p.exists():
                continue
            for line in p.read_text(encoding='utf-8', errors='ignore').splitlines():
                line = line.strip().strip('"\'')
                if line.startswith('sk-'):
                    return line
                k, _, val = line.partition('=')
                val = val.strip().strip('"\'')
                if k.strip() in ('DEEPSEEK_API_KEY', 'LLM_API_KEY') and val.startswith('sk-'):
                    return val
        except OSError:
            continue
    return None


def _llm_enrich(chosen, date_str):
    """一次调用产出：中文点评 + 点评英文 + 日报标题/摘要英文 + 每条新闻英文。无 key 或失败返回 None。"""
    key = _llm_key()
    if not key:
        return None

    payload_items = [
        {'i': n, 'title': e['title'],
         'summary': first_sentence(e['summary'], limit=300), 'source': e['source']}
        for n, e in enumerate(chosen)
    ]
    prompt = (
        '你是中文科技媒体的编辑，读者是 50 岁左右的中小企业经营者。下面是今天的 AI 新闻。\n'
        '请完成三件事，只输出 JSON，不要解释、不要代码块标记：\n'
        '1. title：一句中文标题，格式严格为 "AI新闻 | A + B + C"，A/B/C 是三条最重要的新闻，'
        '每条压成 10-16 个字的短语，必须有具体信息（公司名、产品名或数字），不要用省略号，不要照搬原标题。\n'
        '2. comment：用一句中文点评这批新闻，要有判断和观点，看得出它们之间的联系或趋势；'
        '禁止“技术快速发展”“竞争日趋激烈”“创新层出不穷”这类空话；不超过 80 字。\n'
        '3. 英文版：commentEn、titleEn（形如 "AI News | ... + ... + ..."）、'
        'summaryEn（把前三条概述成 2-3 句英文）、items（数量与输入相同的数组，每项含 titleEn、summaryEn）。\n'
        '英文用 re-express（重新表达），不要逐字直译；人名机构名用通行英文写法。\n'
        'JSON 结构：{"title":"","comment":"","commentEn":"","titleEn":"","summaryEn":"","items":[{"titleEn":"","summaryEn":""}]}\n\n'
        f'日期：{date_str}\n新闻：{json.dumps(payload_items, ensure_ascii=False)}'
    )
    body = json.dumps({
        'model': LLM_MODEL,
        'messages': [
            {'role': 'system', 'content': '你输出严格合法的 JSON，不含任何额外文字。'},
            {'role': 'user', 'content': prompt},
        ],
        'temperature': 0.7,
        'response_format': {'type': 'json_object'},
    }).encode('utf-8')
    req = urllib.request.Request(LLM_URL, data=body, method='POST', headers={
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {key}',
    })
    try:
        with urllib.request.urlopen(req, timeout=90) as resp:
            data = json.loads(resp.read().decode('utf-8'))
        parsed = json.loads(data['choices'][0]['message']['content'])
    except Exception as exc:
        logger.warning(f'LLM 生成失败，回退到事实型点评：{exc}')
        return None

    if not isinstance(parsed, dict) or not str(parsed.get('comment', '')).strip():
        logger.warning('LLM 返回内容不完整，回退到事实型点评')
        return None
    logger.info(f'LLM 已生成点评与英文：{str(parsed["comment"])[:40]}')
    return parsed


def _fallback_comment(chosen):
    """无 LLM 时的兜底：点出今天落在哪些方向、头条是什么。
    不假装有观点，但句子完整、不截成半句，也不再是“竞争日趋激烈”那种套话。"""
    cats = []
    for e in chosen:
        zh, _ = categorize(e['title'], e['summary'])
        if zh not in cats:
            cats.append(zh)
    head = re.split(r'[，,：:｜|；;]', SUFFIX_RE.sub('', chosen[0]['title']))[0].strip()
    if len(head) > 36:
        head = head[:36] + '…'
    return f"今天 {len(chosen)} 条，方向：{'、'.join(cats[:4])}；头条是{head}。"


def build_summary(chosen, date_str):
    if not chosen:
        return None

    llm = _llm_enrich(chosen, date_str)
    title = 'AI新闻 | ' + ' + '.join(_headline(e['title']) for e in chosen[:3])
    # 模型给的标题更像人写的，但得兜住格式跑偏的情况
    llm_title = str((llm or {}).get('title', '')).strip()
    if llm_title.startswith('AI新闻') and 12 <= len(llm_title) <= 70:
        title = llm_title

    body_bits = []
    for e in chosen[:3]:
        s = first_sentence(e['summary']).rstrip('。！？!?…')
        if s:
            body_bits.append(s)
    summary = '；'.join(body_bits) + '。'

    comment = (llm or {}).get('comment') or _fallback_comment(chosen)

    items = []
    for n, e in enumerate(chosen):
        zh, en = categorize(e['title'], e['summary'])
        item = {
            'title': e['title'],
            'summary': first_sentence(e['summary'], limit=180),
            'source': e['source'],
            'category': zh,
            'categoryEn': en,
            'url': e['url'],
        }
        if llm:
            extra = (llm.get('items') or [])
            pair = extra[n] if n < len(extra) and isinstance(extra[n], dict) else {}
            for k, v in (('titleEn', pair.get('titleEn')), ('summaryEn', pair.get('summaryEn'))):
                if isinstance(v, str) and v.strip():
                    item[k] = v.strip()
        items.append(item)

    entry = {
        'date': date_str,
        'title': title,
        'summary': summary,
        'newsItems': items,
        'comment': comment,
    }
    if llm:
        for k in ('titleEn', 'summaryEn', 'commentEn'):
            v = llm.get(k)
            if isinstance(v, str) and v.strip():
                entry[k] = v.strip()
    return entry


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

def publish_today(entry):
    """数据写入后立刻 commit + push，当天新闻 06:05 就上线，不用等 22:30。

    只 add ai-news-summary.ts 这一个文件，不碰工作区其他改动。
    push 失败只记日志不抛错：commit 已落在本地，22:30 的 auto-push
    （它只推「已提交未推送」的提交）会兜底推掉。
    """
    rel = str(DATA_FILE.relative_to(ROOT))

    def run(args, timeout):
        return subprocess.run(['git'] + args, cwd=str(ROOT), timeout=timeout,
                              capture_output=True, text=True,
                              encoding='utf-8', errors='replace')

    try:
        lock = ROOT / '.git' / 'index.lock'
        if lock.exists() and lock.stat().st_size == 0:
            lock.unlink()
            logger.info('清理了残留的空 index.lock')

        if run(['diff', '--quiet', '--', rel], 30).returncode == 0:
            logger.info('数据文件与 HEAD 一致，无需提交')
            return

        run(['add', '--', rel], 30)
        n = len(entry.get('newsItems', []))
        msg = f"news: {entry['date']} AI 日报（{n} 条，06:00 自动采集+发布）"
        c = run(['commit', '-m', msg], 60)
        if c.returncode != 0:
            logger.warning(f'提交失败: {(c.stderr or c.stdout or "")[:300]}')
            return

        run(['fetch', '--quiet', 'origin'], 90)
        p = run(['push', 'origin', 'main'], 180)
        if p.returncode == 0:
            logger.info('已提交并推送，Cloudflare Pages 部署中，当天新闻即时上线')
        else:
            logger.warning(f'推送失败（提交已在本地，22:30 auto-push 兜底）: '
                           f'{(p.stderr or "")[:300]}')
    except Exception as e:
        logger.warning(f'发布步骤出错，跳过: {e}')


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

    raw, health = fetch_ai_news()
    degraded = report_source_health(health)
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
        return 2 if degraded else 0

    if not write_entry(DATA_FILE, text, start, entry):
        return 1

    if entry.get('summaryEn'):
        logger.info(f"英文由 DeepSeek 生成；点评：{entry['comment'][:50]}")
    else:
        logger.info('未配置 DeepSeek key 或调用失败：英文留空（英文页回退显示中文），'
                    '点评用事实型兜底。推荐把 sk- 开头的 key 存进 Windows 凭据管理器：'
                    'python -c "import keyring; keyring.set_password(\'deepseek\', \'api_key\', \'sk-xxx\')"；'
                    '也可用环境变量 DEEPSEEK_API_KEY 或桌面 deepseek-key.txt。')
    logger.info('完成。')
    publish_today(entry)
    if degraded:
        logger.error('注意：本次源健康降级，退出码 2（计划任务的 Result 会显示失败）')
    return 2 if degraded else 0


if __name__ == '__main__':
    sys.exit(main())
