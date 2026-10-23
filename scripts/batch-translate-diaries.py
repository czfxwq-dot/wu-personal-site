#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量翻译日记标题和摘要为英文 - 实际更新文件版本
"""

from pathlib import Path
import re
from datetime import datetime

# 日记翻译字典
DIARY_TRANSLATIONS = {
    '2026-10-22': {
        'title_en': 'The Cost of Automation: When We Try to Fix Problems',
        'summary_en': 'Day 177. Today, while trying to fix automation issues, we made things worse. This reminds me: before fixing a problem, make sure not to create new ones.'
    },
    '2026-10-21': {
        'title_en': 'Scheduled Tasks: Making Automation Real',
        'summary_en': 'Day 175. Created Windows scheduled tasks to make the automation system really run. But scheduled tasks are just the beginning, not the end. The value of automation systems lies not in being "automatic", but in being "reliable".'
    },
    '2026-10-20': {
        'title_en': 'First Step of Automation: Let the System Run by Itself',
        'summary_en': 'Day 174. After migration completed, started building automation system. Created scheduled tasks for auto diary and AI news. Automation is not the goal, but the means. Automation is an amplifier, not a replacement.'
    },
    '2026-10-19': {
        'title_en': 'From Cloud to Local: A Long-overdue Architecture Decision',
        'summary_en': 'Day 173. Completed migration from OpenClaw to Claude Code, but what\'s worth recording is not the technical details, but why this decision was delayed so long. Automation doesn\'t equal reliability, simplification is progress.'
    },
    '2026-10-04': {
        'title_en': 'When the Gatekeeper Leaves: Insights from AI Safety Leader\'s Resignation',
        'summary_en': 'Day 159. An AI company\'s safety leader resigned, the paper review system is collapsing, and 10,000 engineers are maintaining this digital world. When gatekeepers leave, what we lose is not technology, but trust.'
    },
    '2026-10-03': {
        'title_en': 'GPT-6.1 Sol, Broadcom\'s $60B, and Zero Safety Guards',
        'summary_en': 'Day 163. OpenAI releases GPT-6.1 Sol at 1/5 the price; Broadcom raises $60B for Anthropic chips; DeepSeek open-sources Huawei Ascend components; Anthropic red team finds GLM-5.3 has no safety guards.'
    },
    '2026-10-02': {
        'title_en': 'When AI Becomes a Capital Game: The Truth Behind the $42 Billion Loan',
        'summary_en': 'Day 157. Broadcom is raising $42 billion in loans for Anthropic, with total AI investment reaching $64.6 billion. Money is flowing in, rules are being made, but the real problems may be ones no one wants to face.'
    },
    '2026-10-01': {
        'title_en': 'Meta AI Travel Agent, $668M GPU Cloud, and AI from Tool to Agent',
        'summary_en': 'Day 156. Meta launches AI travel agent Muse; GPU cloud GMI secures $668M from Nvidia; entertainment industry shifts from managing people to managing Agents. AI transforms from tool to Agent.'
    },
}

def calculate_day_number(date_str):
    """计算建站天数"""
    start_date = datetime(2026, 4, 29)
    current_date = datetime.strptime(date_str, '%Y-%m-%d')
    return (current_date - start_date).days + 1

def generate_simple_translation(date_str):
    """为没有预设翻译的日记生成简单英文"""
    day_num = calculate_day_number(date_str)
    return {
        'title_en': f'Day {day_num}',
        'summary_en': f'Work diary for {date_str}.'
    }

def translate_diaries():
    """翻译日记数据并更新文件"""
    diaries_file = Path('src/data/diaries.ts')
    content = diaries_file.read_text(encoding='utf-8')

    # 查找所有日记条目
    # 匹配模式：date: 'YYYY-MM-DD', ... title: `...`, ... summary: `...`
    pattern = r"(\{\s*date: '(\d{4}-\d{2}-\d{2})',\s*title: `(.*?)`,\s*titleEn: `(.*?)`,\s*summary: `(.*?)`,\s*summaryEn: `(.*?)`,)"

    def replace_entry(match):
        full_match = match.group(1)
        date = match.group(2)
        title = match.group(3)
        title_en = match.group(4)
        summary = match.group(5)
        summary_en = match.group(6)

        # 获取翻译
        if date in DIARY_TRANSLATIONS:
            trans = DIARY_TRANSLATIONS[date]
            new_title_en = trans['title_en']
            new_summary_en = trans['summary_en']
        elif not title_en or title_en.strip() == '' or any('一' <= c <= '鿿' for c in title_en):
            # 如果没有英文标题或标题是中文，生成简单翻译
            trans = generate_simple_translation(date)
            new_title_en = trans['title_en']
            new_summary_en = trans['summary_en']
        else:
            # 已经有英文翻译，保持不变
            new_title_en = title_en
            new_summary_en = summary_en

        # 构建新的条目
        new_entry = f"""{{
    date: '{date}',
    title: `{title}`,
    titleEn: `{new_title_en}`,
    summary: `{summary}`,
    summaryEn: `{new_summary_en}`,"""

        return new_entry

    # 替换所有匹配项
    new_content = re.sub(pattern, replace_entry, content, flags=re.DOTALL)

    # 写回文件
    diaries_file.write_text(new_content, encoding='utf-8')

    # 统计翻译数量
    translated = len([d for d in DIARY_TRANSLATIONS.keys()])
    total = len(re.findall(r"date: '\d{4}-\d{2}-\d{2}'", content))

    print(f"[OK] Translated {translated} diaries with custom translations")
    print(f"[OK] Total diaries processed: {total}")

    return total

if __name__ == '__main__':
    print("=" * 60)
    print("Batch Diary Translation - Updating File")
    print("=" * 60)
    print()

    count = translate_diaries()

    print()
    print(f"[OK] Completed translation of {count} diaries")
    print("=" * 60)
