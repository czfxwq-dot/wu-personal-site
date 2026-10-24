#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为所有日记创建真正的英文摘要
基于中文摘要和标题生成有意义的英文版本
"""

from pathlib import Path
import re

def create_english_summary(chinese_title, chinese_summary, date):
    """基于中文内容创建英文摘要"""

    # 提取关键信息
    day_match = re.search(r'建站第(\d+)天', chinese_summary)
    day_num = day_match.group(1) if day_match else ''

    # 根据标题和摘要内容生成英文摘要
    title_lower = chinese_title.lower()

    # 针对不同主题的摘要生成
    if '自动化' in chinese_title or '定时任务' in chinese_title:
        if '代价' in chinese_title:
            return f"Day {day_num}. Reflecting on automation mistakes and the importance of minimal intervention when fixing problems."
        elif '定时任务' in chinese_title:
            return f"Day {day_num}. Implemented Windows scheduled tasks for automated diary and AI news generation. Automation reliability is key."
        elif '第一步' in chinese_title:
            return f"Day {day_num}. Started building the automation system. Automation is a means, not a goal - it amplifies our capabilities."
        else:
            return f"Day {day_num}. Work on automation and scheduled tasks for the website."

    elif '迁移' in chinese_title or '云端' in chinese_title:
        if '云端回到本地' in chinese_title:
            return f"Day {day_num}. Completed migration from OpenClaw (cloud) to Claude Code (local). Simplification and control are progress."
        else:
            return f"Day {day_num}. Migration work and architecture decisions."

    elif '安全' in chinese_title or '守门人' in chinese_title:
        if '守门人' in chinese_title:
            return f"Day {day_num}. Reflections on AI safety leaders resigning and the importance of human oversight in AI systems."
        else:
            return f"Day {day_num}. AI safety and governance considerations."

    elif '资本' in chinese_title or '贷款' in chinese_title:
        return f"Day {day_num}. Analysis of AI industry capital flows and investment trends."

    elif 'AI新闻' in chinese_title or '新闻' in chinese_title:
        return f"Day {day_num}. AI industry news and developments summary."

    elif '反思' in chinese_title or '教训' in chinese_title:
        return f"Day {day_num}. Deep reflection on lessons learned and mistakes made."

    else:
        # 默认摘要
        if day_num:
            return f"Day {day_num}. Daily work diary and project progress."
        else:
            return f"Work diary for {date}."

def update_diary_summaries():
    """更新所有日记的英文摘要"""
    diaries_file = Path('src/data/diaries.ts')
    content = diaries_file.read_text(encoding='utf-8')

    # 匹配所有日记条目
    pattern = r"(\{\s*date: '(\d{4}-\d{2}-\d{2})',\s*title: `([^`]+)`,\s*titleEn: `([^`]+)`,\s*summary: `([^`]+)`,\s*summaryEn: `[^`]*`,)"

    def replace_summary(match):
        full_match = match.group(1)
        date = match.group(2)
        title_cn = match.group(3)
        title_en = match.group(4)
        summary_cn = match.group(5)

        # 生成新的英文摘要
        new_summary_en = create_english_summary(title_cn, summary_cn, date)

        # 替换 summaryEn
        new_match = re.sub(
            r'summaryEn: `[^`]*`,',
            f'summaryEn: `{new_summary_en}`,',
            full_match
        )

        return new_match

    # 替换所有匹配项
    new_content = re.sub(pattern, replace_summary, content, flags=re.DOTALL)

    # 写回文件
    diaries_file.write_text(new_content, encoding='utf-8')

    # 统计
    updated_count = len(re.findall(pattern, content, flags=re.DOTALL))
    print(f"[OK] Updated {updated_count} diary summaries")

    return updated_count

if __name__ == '__main__':
    print("=" * 60)
    print("Creating Proper English Summaries for All Diaries")
    print("=" * 60)
    print()

    count = update_diary_summaries()

    print()
    print(f"[DONE] Updated {count} summaries")
    print("=" * 60)
