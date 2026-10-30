#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
智能自动日记生成器 v4.0
- 按 templates/diary-standards.md 生成九节协作格式（观吾/山山视角）
- 中英双语（中文写进 markdown，英文写进 diaries.ts 的 contentEn）
- frontmatter 含 mood / energy
- 生成后自动同步 src/data/diaries.ts
"""

import subprocess
import logging
import random
import json
from datetime import datetime
from pathlib import Path

# 配置日志
log_dir = Path(__file__).parent / 'logs'
log_dir.mkdir(exist_ok=True)
log_file = log_dir / f"auto-diary-{datetime.now().strftime('%Y-%m')}.log"

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(log_file, encoding='utf-8'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

START_DATE = datetime(2026, 4, 29)


def get_today_git_stats():
    """获取今天的 git 提交与文件类型统计"""
    today = datetime.now().strftime('%Y-%m-%d')
    logger.info(f"开始获取 {today} 的 git 统计信息")

    try:
        result = subprocess.run(
            ['git', 'log', '--since', f'{today} 00:00', '--until', f'{today} 23:59',
             '--pretty=format:%s', '--no-merges'],
            capture_output=True, text=True, encoding='utf-8', cwd='..'
        )

        commits = result.stdout.strip().split('\n') if result.stdout.strip() else []
        logger.info(f"找到 {len(commits)} 次提交")

        file_types = {
            'diary': 0, 'article': 0, 'news': 0, 'code': 0, 'doc': 0, 'config': 0
        }

        for msg in commits:
            m = msg.lower()
            if '日记' in m or 'diary' in m:
                file_types['diary'] += 1
            elif '半百观' in m or '文章' in m or 'article' in m:
                file_types['article'] += 1
            elif '新闻' in m or 'news' in m:
                file_types['news'] += 1
            elif any(x in m for x in ['.py', '.js', '.ts', '代码', 'code']):
                file_types['code'] += 1
            elif any(x in m for x in ['.md', '文档', 'doc']):
                file_types['doc'] += 1
            elif any(x in m for x in ['.json', '.yml', '.sh', '.bat', '配置', 'config']):
                file_types['config'] += 1

        return {'commit_count': len(commits), 'commits': commits, 'file_types': file_types}
    except Exception as e:
        logger.error(f"获取 git 统计信息失败: {e}", exc_info=True)
        return {'commit_count': 0, 'commits': [], 'file_types': dict.fromkeys(
            ['diary', 'article', 'news', 'code', 'doc', 'config'], 0)}


def _describe_work_zh(ft):
    """根据文件类型生成中文工作描述列表"""
    parts = []
    if ft['diary']:
        parts.append(f"更新了 {ft['diary']} 篇日记")
    if ft['article']:
        parts.append(f"发布了 {ft['article']} 篇半百观文章")
    if ft['news']:
        parts.append(f"采集了 {ft['news']} 条 AI 新闻")
    if ft['code']:
        parts.append(f"改进了 {ft['code']} 个代码文件")
    if ft['doc']:
        parts.append(f"更新了 {ft['doc']} 个文档")
    if ft['config']:
        parts.append(f"调整了 {ft['config']} 个配置文件")
    return parts


def _describe_work_en(ft):
    parts = []
    if ft['diary']:
        parts.append(f"updated {ft['diary']} diary entries")
    if ft['article']:
        parts.append(f"published {ft['article']} BanbaiGuan articles")
    if ft['news']:
        parts.append(f"collected {ft['news']} AI news items")
    if ft['code']:
        parts.append(f"improved {ft['code']} code files")
    if ft['doc']:
        parts.append(f"updated {ft['doc']} documents")
    if ft['config']:
        parts.append(f"adjusted {ft['config']} configuration files")
    return parts


def _key_commits(commits, limit=6):
    """从提交信息里挑关键提交，返回 (zh_list, en_list)"""
    zh, en = [], []
    mapping = {'修复': 'Fixed', '添加': 'Added', '优化': 'Optimized', '更新': 'Updated', '部署': 'Deployed'}
    for msg in commits[:limit]:
        action_en = 'Changed'
        for k, v in mapping.items():
            if k in msg:
                action_en = v
                break
        zh.append(msg)
        en.append(f"{action_en}: {msg}")
    return zh, en


def generate_diary(stats, date_str):
    """生成标准九节结构的日记（返回 dict）"""
    days = (datetime.strptime(date_str, '%Y-%m-%d') - START_DATE).days + 1
    n = stats['commit_count']
    ft = stats['file_types']
    zh_work = _describe_work_zh(ft)
    en_work = _describe_work_en(ft)
    zh_commits, en_commits = _key_commits(stats['commits'])

    # —— 标题 / 摘要 / mood / energy ——
    if n == 0:
        title, title_en = "平静的日子", "A Quiet Day"
        desc = "今天没有代码提交，但系统在稳定运行。"
        desc_en = "No code commits today, but the system is running stably."
        mood, energy = 6, 5
    elif n <= 3:
        title, title_en = "小幅更新", "Minor Updates"
        desc = f"今天完成了 {n} 次提交，保持稳定的节奏。"
        desc_en = f"Completed {n} commits today, maintaining a steady pace."
        mood, energy = 7, 6
    elif n <= 10:
        title, title_en = "稳定推进", "Steady Progress"
        desc = f"今天完成了 {n} 次提交，持续推进项目进展。"
        desc_en = f"Completed {n} commits today, steadily advancing the project."
        mood, energy = 7, 7
    else:
        title, title_en = "高产的一天", "A Productive Day"
        desc = f"今天完成了 {n} 次提交，工作效率很高。"
        desc_en = f"Completed {n} commits today, highly efficient work."
        mood, energy = 8, 8

    work_zh = ("，".join(zh_work) + "。") if zh_work else "进行了系统维护和优化。"
    work_en = (", ".join(en_work) + ".") if en_work else "Performed system maintenance and optimization."

    # —— 观吾的部分（根据文件类型推断方向）——
    guanwu_zh, guanwu_en = [], []
    if ft['diary'] or ft['article']:
        guanwu_zh.append("关注内容产出，让记录和表达保持温度")
        guanwu_en.append("kept an eye on content output, keeping the records and expression warm")
    if ft['news']:
        guanwu_zh.append("盯紧 AI 行业动态，确保资讯新鲜准确")
        guanwu_en.append("kept watch on AI industry news to keep information fresh and accurate")
    if ft['code'] or ft['config']:
        guanwu_zh.append("强调系统要稳定、自动化要可靠")
        guanwu_en.append("emphasized that the system must be stable and automation reliable")
    if not guanwu_zh:
        guanwu_zh.append("确认今天的节奏平稳，方向不变")
        guanwu_en.append("confirmed today's steady rhythm, direction unchanged")

    # —— 核心洞察（随机抽一条）——
    insights = [
        ("质量不是“有没有”，而是“对不对”。", "Quality is not whether it's there, but whether it's right."),
        ("把一件事做干净，比做很多件半成品更接近完成。", "Doing one thing cleanly beats doing many things halfway."),
        ("自动化省下的是重复，不能省掉的是判断。", "Automation saves repetition, but never judgment."),
        ("小步快跑，稳步前行。", "Small steps, steady progress."),
        ("有温度的记录，才能留住真实的每一天。", "Only warm records keep the real days alive."),
    ]
    insight_zh, insight_en = random.choice(insights)

    content_zh = f"""---
date: {date_str}
title: {_yaml_str(title)}
titleEn: {_yaml_str(title_en)}
summary: {_yaml_str(desc)}
summaryEn: {_yaml_str(desc_en)}
category: 工作
categoryEn: Work
dayNum: {days}
mood: {mood}
energy: {energy}
---

<p>建站第 {days} 天。</p>

<h2>📍 今日心绪</h2>
<p>{'今天脚步不疾不徐，' if n <= 3 else '今天节奏饱满，'}一件件事按部就班地做完。系统在稳定运转，{work_zh}</p>

<h2>🎯 今天的足迹</h2>

<h3>观吾的部分</h3>
<p><strong>发现与方向：</strong></p>
<ul>
{''.join(f'<li>{x}</li>\n' for x in guanwu_zh)}</ul>

<h3>山山的部分</h3>
<p><strong>执行与实现：</strong></p>
<ul>
<li><strong>今日工作：</strong>{work_zh}</li>
</ul>
<p><strong>关键提交：</strong></p>
<ul>
{''.join(f'<li>{x}</li>\n' for x in zh_commits) if zh_commits else '<li>保持了稳定的节奏</li>\n'}</ul>

<h3>我们一起完成的</h3>
<p><strong>协作成果：</strong></p>
<ul>
<li>今天共完成 {n} 次提交，{work_zh}</li>
</ul>

<h2>💭 遇到的困惑与思考</h2>
<p><strong>观吾的思考：</strong>今天做的这些事，是不是真的在往目标靠近？</p>
<p><strong>山山的实现：</strong>在逐条处理时发现，很多问题不是孤立存在的，修好一个会带出下一个，但认真修下去也会连带清干净。</p>
<p><strong>我们共同的领悟：</strong>方向清晰，剩下的就是一件件做完。</p>

<h2>🌊 今天的感悟</h2>
<p><strong>核心洞察：</strong></p>
<blockquote>
<p>{insight_zh}</p>
</blockquote>

<h2>📊 今天的痕迹</h2>
<ul>
<li><strong>写下的文字：</strong>{work_zh}</li>
<li><strong>提交的变化：</strong>{n} 次代码提交</li>
<li><strong>度过的时光：</strong>一天</li>
</ul>

<h2>🎁 今天的礼物</h2>
<p><strong>技术上的收获：</strong>继续打磨自动化流程，让系统跑得更稳。</p>
<p><strong>心灵上的收获：</strong>稳步推进本身就是一种踏实。</p>
<p><strong>关系上的收获：</strong>观吾定方向、山山做执行，配合越来越顺。</p>

<h2>🌅 明天的期待</h2>
<p>明天想保持今天的节奏，把没做完的细节收尾。</p>
<p><strong>可能的挑战：</strong>琐碎的事情容易积压。</p>
<p><strong>应对的方式：</strong>列好优先级，一件一件来。</p>

<h2>✨ 今日一言</h2>
<p><strong>{insight_zh}</strong></p>

---

<p><em>记录于 {date_str} 18:00，自动生成</em></p>
<p><em>地点：办公室</em></p>
<p><em>身体：状态在线</em></p>
"""

    content_en = f"""<p>Day {days} of building the website.</p>

<h2>📍 Today's Mood</h2>
<p>{'Today moved at a calm, steady pace,' if n <= 3 else 'Today was full of rhythm,'} with tasks finished one by one. The system ran stably — {work_en}</p>

<h2>🎯 Today's Footprints</h2>

<h3>Guanwu's Part</h3>
<p><strong>Finding and direction:</strong></p>
<ul>
{''.join(f'<li>{x}</li>\n' for x in guanwu_en)}</ul>

<h3>Shanshan's Part</h3>
<p><strong>Execution and implementation:</strong></p>
<ul>
<li><strong>Today's work:</strong> {work_en}</li>
</ul>
<p><strong>Key commits:</strong></p>
<ul>
{''.join(f'<li>{x}</li>\n' for x in en_commits) if en_commits else '<li>Kept a steady rhythm</li>\n'}</ul>

<h3>What We Completed Together</h3>
<p><strong>Collaboration results:</strong></p>
<ul>
<li>{n} commits today — {work_en}</li>
</ul>

<h2>💭 Confusions and Thoughts</h2>
<p><strong>Guanwu's thinking:</strong> Is what we did today really moving us toward the goal?</p>
<p><strong>Shanshan's implementation:</strong> While handling things one by one, I found many problems aren't isolated — fixing one surfaces the next, but fixing them carefully also cleans them all up.</p>
<p><strong>Our shared understanding:</strong> When the direction is clear, the rest is just finishing things one by one.</p>

<h2>🌊 Today's Insight</h2>
<p><strong>Core insight:</strong></p>
<blockquote>
<p>{insight_en}</p>
</blockquote>

<h2>📊 Today's Traces</h2>
<ul>
<li><strong>Words written:</strong> {work_en}</li>
<li><strong>Changes committed:</strong> {n} commits</li>
<li><strong>Time spent:</strong> a day</li>
</ul>

<h2>🎁 Today's Gifts</h2>
<p><strong>Technical gains:</strong> kept polishing the automation so the system runs more smoothly.</p>
<p><strong>Spiritual gains:</strong> steady progress is itself a kind of reassurance.</p>
<p><strong>Relationship gains:</strong> Guanwu sets direction and Shanshan executes — the coordination is getting smoother.</p>

<h2>🌅 Tomorrow's Expectations</h2>
<p>Tomorrow we want to keep today's rhythm and finish the loose ends.</p>
<p><strong>Possible challenges:</strong> trivial tasks tend to pile up.</p>
<p><strong>How to handle it:</strong> set priorities and take them one at a time.</p>

<h2>✨ One Sentence Today</h2>
<p><strong>{insight_en}</strong></p>

---

<p><em>Recorded at 18:00 on {date_str}, auto-generated</em></p>
<p><em>Location: the office</em></p>
<p><em>Body: in good shape</em></p>"""

    return {
        'markdown': content_zh,
        'title': title,
        'title_en': title_en,
        'summary': desc,
        'summary_en': desc_en,
        'mood': mood,
        'energy': energy,
        'content_en': content_en,
    }


def _esc(s):
    """转义可能破坏 diaries.ts 反引号字符串的字符"""
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')


def _yaml_str(s):
    """把字符串安全地写成 YAML 双引号标量。
    摘要里出现「冒号+空格」「#」「引号」时，裸值会被 YAML 误解析（曾导致 CI 构建失败），
    统一用 JSON 编码（JSON 字符串是合法的 YAML 双引号标量）。"""
    return json.dumps(str(s), ensure_ascii=False)


def sync_diaries_ts(diary, date_str):
    """把日记登记进 src/data/diaries.ts（若尚未存在）"""
    ts_path = Path('../src/data/diaries.ts')
    src = ts_path.read_text(encoding='utf-8')

    if f"date: '{date_str}'" in src:
        logger.info(f"diaries.ts 已存在 {date_str}，跳过同步")
        return False

    entry = f"""  {{
    date: '{date_str}',
    title: `{_esc(diary['title'])}`,
    titleEn: `{_esc(diary['title_en'])}`,
    summary: `{_esc(diary['summary'])}`,
    summaryEn: `{_esc(diary['summary_en'])}`,
    category: '工作',
    categoryEn: 'Work',
    contentEn: `{_esc(diary['content_en'])}`
  }},
"""

    anchor = "export const diaries: DiaryEntry[] = [\n"
    if anchor not in src:
        logger.error("diaries.ts 找不到数组声明锚点，同步失败")
        return False

    src = src.replace(anchor, anchor + entry, 1)
    ts_path.write_text(src, encoding='utf-8')
    logger.info(f"已同步 diaries.ts: {date_str}")
    return True


def push_pending_commits():
    """把「已提交但未推送」的改动推上去。

    只推提交，工作区里未提交的改动（比如刚生成的机械稿）不会被带上线。
    这条任务本来就在观吾这台 Windows 上、用他的账号跑，凭据是现成的，
    所以夜间可以顺手把白天攒下的提交推掉，不需要人再点一次。
    任何失败都只记日志，不中断日记生成。
    """
    repo = Path(__file__).resolve().parent.parent
    try:
        lock = repo / '.git' / 'index.lock'
        if lock.exists() and lock.stat().st_size == 0:
            lock.unlink()
            logger.info("清理了残留的空 index.lock")

        subprocess.run(['git', 'fetch', '--quiet', 'origin'], cwd=str(repo),
                       timeout=90, capture_output=True)
        r = subprocess.run(['git', 'rev-list', '--count', 'origin/main..HEAD'],
                           cwd=str(repo), timeout=30, capture_output=True,
                           text=True, encoding='utf-8', errors='replace')
        ahead = int((r.stdout or '0').strip() or '0')
        if ahead <= 0:
            logger.info("没有待推送的提交")
            return

        p = subprocess.run(['git', 'push', 'origin', 'main'], cwd=str(repo),
                           timeout=180, capture_output=True,
                           text=True, encoding='utf-8', errors='replace')
        if p.returncode == 0:
            logger.info(f"已推送 {ahead} 个提交")
        else:
            logger.warning(f"推送失败（{ahead} 个待推）: {(p.stderr or '')[:300]}")
    except Exception as e:
        logger.warning(f"推送步骤出错，跳过: {e}")


def main():
    today = datetime.now().strftime('%Y-%m-%d')
    logger.info("=" * 60)
    logger.info(f"自动日记生成器 v4.0 启动 - {today}")
    logger.info("=" * 60)

    # 先推送白天攒下的提交，再生成今天的日记
    push_pending_commits()

    try:
        md_path = Path(f"../src/content/diaries/{today}.md")
        if md_path.exists():
            logger.info(f"日记已存在，跳过生成: {md_path}")
            return

        logger.info("步骤 1/3: 分析 git 提交...")
        stats = get_today_git_stats()
        logger.info(f"找到 {stats['commit_count']} 次提交")

        logger.info("步骤 2/3: 生成标准格式日记...")
        diary = generate_diary(stats, today)

        logger.info("步骤 3/3: 保存 markdown 并同步 diaries.ts...")
        md_path.parent.mkdir(parents=True, exist_ok=True)
        md_path.write_text(diary['markdown'], encoding='utf-8')
        logger.info(f"日记已保存: {md_path}")

        sync_diaries_ts(diary, today)

        logger.info(f"标题: {diary['title']} | mood: {diary['mood']} energy: {diary['energy']}")
        logger.info("=" * 60)
        logger.info("自动日记生成完成！")
        logger.info("=" * 60)

    except Exception as e:
        logger.error(f"自动日记生成失败: {e}", exc_info=True)
        raise


if __name__ == '__main__':
    main()
