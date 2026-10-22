#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
翻译最近3个月的重要文章
"""

import re
from pathlib import Path
from datetime import datetime

# 最近3个月文章的英文翻译
TRANSLATIONS = {
    'ai-first-work-experience': {
        'title_en': 'AI Is Here: How Can Young People Get Their "First Work Experience"?',
        'excerpt_en': 'No experience, but asked to get started quickly; AI has taken over some basic tasks. Where do newcomers start? Find a task from real job postings, make a small sample, and leave your own judgment and modifications.'
    },
    'ai-surpass-experts-3-4-years': {
        'title_en': 'Industry Predicts AI Will Surpass Top Experts in 3-4 Years: Why Middle-Aged People Should Not Panic',
        'excerpt_en': 'OpenAI co-founder John Schulman predicts AI may fully surpass top human experts in 3-4 years. Middle-aged people need not panic, but should see three things clearly: do not compete with AI on speed, use it wisely but know the boundaries, and keep trying.'
    },
    'ai-solves-90year-math-problem': {
        'title_en': 'AI Solves 90-Year-Old Math Problem, But Humans Cannot Understand the Process',
        'excerpt_en': 'OpenAI\'s unreleased internal model solved the Navier-Stokes existence and smoothness problem - a millennium prize problem that the smartest human minds could not prove in 90 years. But what really worth thinking is: if AI gives the answer but humans cannot understand the derivation process - does this count as "understanding"?'
    },
    'altman-ai-danger-monopoly': {
        'title_en': 'The Man Who Built ChatGPT Says AI Is Dangerous - Ironically, He Is the Danger',
        'excerpt_en': 'Altman says the biggest AI risk is power concentration in few hands, but he himself is the biggest monopolist. How can ordinary people break through?'
    },
    'benchmark-account-analysis': {
        'title_en': 'Benchmark Account Analysis: AI Performance Evaluation Methodology',
        'excerpt_en': 'A comprehensive analysis of how to evaluate AI model performance through benchmark testing and real-world applications.'
    },
    'weekly-report-2026-09-12': {
        'title_en': 'AI Weekly | September 12, 2026',
        'excerpt_en': 'This week\'s AI industry highlights: major model updates, industry trends, and technological breakthroughs.'
    },
    'weekly-report-2026-09-05': {
        'title_en': 'AI Weekly | September 5, 2026',
        'excerpt_en': 'Weekly roundup of AI industry developments, new releases, and market trends.'
    },
    'weekly-report-2026-08-29': {
        'title_en': 'AI Weekly | August 29, 2026',
        'excerpt_en': 'This week\'s AI news: model releases, industry moves, and technological advances.'
    },
    'fathers-day-luoyang': {
        'title_en': 'Father\'s Day in Luoyang: Listening to the Rain',
        'excerpt_en': 'On Father\'s Day in Luoyang, my daughter brought a T-shirt she picked at school. Parental love is love with separation as its purpose.'
    },
    'ai-agent-era-2026-w29': {
        'title_en': 'AI Agent Era: 2026 Week 29 Review',
        'excerpt_en': 'The rise of AI agents is changing how we work and interact with technology.'
    },
    'no-code-browser': {
        'title_en': 'The No-Code Browser: Democratizing Web Development',
        'excerpt_en': 'How no-code tools are making web development accessible to everyone.'
    },
    'commercial-ai-major': {
        'title_en': 'Commercial AI Major: The First of Its Kind in China',
        'excerpt_en': 'China\'s first commercial AI program marks a new era in AI education.'
    },
    'anthropic-introspection-adapter': {
        'title_en': 'Anthropic\'s Introspection Adapter: Understanding AI Self-Awareness',
        'excerpt_en': 'Exploring how AI systems can examine and explain their own reasoning processes.'
    },
    'ai-pentagon-core-systems': {
        'title_en': 'AI Pentagon Core Systems: Military AI Applications',
        'excerpt_en': 'An overview of AI systems being deployed in defense and military applications.'
    },
    'ai-dreaming-self-evolution': {
        'title_en': 'AI Dreaming and Self-Evolution: The Future of AI Development',
        'excerpt_en': 'How AI systems might evolve through self-reflection and autonomous improvement.'
    },
    'weekly-report-2026-08-22': {
        'title_en': 'AI Weekly | Stripe\'s Record-Breaking Acquisition of OpenRouter, AI Infrastructure\'s $3 Trillion Debt Warning',
        'excerpt_en': 'This week\'s AI industry highlights: major acquisitions, infrastructure investments, and market trends.'
    },
    '100-wan-ai-zero-return': {
        'title_en': '1 Million Wan AI Zero Return: Is the Large Model Race a Bubble?',
        'excerpt_en': 'Analyzing the phenomenon of zero returns in large model investments and what it means for the AI industry.'
    },
    'ai-prompt-reverse-questioning': {
        'title_en': 'Stop Blindly Adding Prompt Words: 90% of People Are Using AI Wrong',
        'excerpt_en': 'The logical fallacy of reverse questioning: why most people misunderstand how to use AI effectively.'
    },
    'ai-office-assistant-war': {
        'title_en': 'AI Office Assistant War: Tencent, ByteDance, and Alibaba Launch AI Assistants Simultaneously',
        'excerpt_en': 'The battle for AI office assistants heats up as major tech companies launch competing products.'
    },
    'weekly-report-2026-08-08': {
        'title_en': 'AI/Tech Industry Weekly | August 2-8, 2026',
        'excerpt_en': 'Weekly roundup of AI industry developments, new releases, and market trends.'
    },
    'weekly-report-2026-08-01': {
        'title_en': 'AI/Tech Industry Weekly | July 28 - August 1, 2026',
        'excerpt_en': 'This week\'s AI news: model releases, industry moves, and technological advances.'
    },
    'ai-scarcity-crisis': {
        'title_en': 'When AI Sets the Alarm Clock for a Scarcity Crisis: The Real "Scarcity" Is Coming',
        'excerpt_en': 'Exploring the paradox of AI-driven abundance creating new forms of scarcity.'
    },
    'money-logic-iteration': {
        'title_en': 'The Iteration of Money Logic: What Has Changed in the New Era of Making Money?',
        'excerpt_en': 'How the logic of making money has evolved in the AI era and what skills are now valuable.'
    },
    'weekly-report-2026-07-25': {
        'title_en': 'AI/Tech Industry Weekly | July 21-27, 2026',
        'excerpt_en': 'Weekly roundup of the most important AI industry news and developments.'
    },
    'waic-2026-ai-landing': {
        'title_en': '2026 WAIC Observation: AI Is Landing, But What Has Really Changed for Ordinary People?',
        'excerpt_en': 'Insights from the World Artificial Intelligence Conference on how AI is actually impacting daily life.'
    },
    'weekly-report-2026-07-18': {
        'title_en': 'AI/Tech Industry Weekly | July 18, 2026',
        'excerpt_en': 'This week\'s highlights from the AI and technology industry.'
    },
    'redefine-action-threshold': {
        'title_en': '"Action Threshold" Has Been Redefined: The Cost of "Doing" Is Too Low Now',
        'excerpt_en': 'How AI has lowered the barrier to action and what this means for productivity and creativity.'
    },
    'weekly-report-2026-07-12': {
        'title_en': 'AI/Tech Industry Weekly | July 12, 2026',
        'excerpt_en': 'Weekly summary of AI industry news and technological breakthroughs.'
    },
    '57-articles-3-spread': {
        'title_en': 'I\'m 50, Wrote 57 Articles, But Only 3 Were Actually Shared',
        'excerpt_en': '57 articles, 235 followers. Only 3 were genuinely shared by strangers. This is the truth most personal account creators dare not speak.'
    },
    'ai-brain-outsource': {
        'title_en': 'Using AI for Two Years, I Advise You Not to Outsource Your Brain',
        'excerpt_en': 'After 2+ years of using AI for everything from company AIoT products to new media operations, efficiency is up but something is quietly disappearing.'
    },
    'ai-saved-time-fed-to-who': {
        'title_en': 'The Time AI Saved You, Where Did It Really Go?',
        'excerpt_en': 'In 2026, the global tech industry laid off 116,000 people, 40% of jobs reshaped by AI. But those who remain are busier than ever.'
    },
    'weekly-report-2026-07-05': {
        'title_en': 'AI/Tech Industry Weekly',
        'excerpt_en': 'Weekly roundup of AI industry developments and market trends.'
    },
    'college-major-money-vs-passion': {
        'title_en': 'College Major Choices Only Care About Money: Parents Ask About Salary, No One Cares About Passion',
        'excerpt_en': 'The reality of college major selection in China: financial considerations overshadow personal interest.'
    },
    'agi-here-why-cant-feel': {
        'title_en': 'AGI Is Already Here, Why Can\'t You Feel It?',
        'excerpt_en': 'Exploring the gap between AGI announcements and everyday experience.'
    },
    'ai-era-university-value': {
        'title_en': 'AI Is Blooming Everywhere, Do Ordinary Universities Still Need to Exist?',
        'excerpt_en': 'Questioning the value proposition of traditional universities in the AI era.'
    },
    'ai-token-maxxing-kpi': {
        'title_en': 'In the AI Token Maxxing Era, Employees Let AI Do Junk Work Just to Meet KPIs',
        'excerpt_en': 'How AI metrics are creating perverse incentives in the workplace.'
    },
    'ai-predict-world-cup-2026': {
        'title_en': 'AI Predicts World Cup Champion: Brute Force vs Algorithmic Approach',
        'excerpt_en': 'Comparing different AI approaches to predicting the 2026 World Cup winner.'
    },
    'liberal-arts-ai-era': {
        'title_en': '"Liberal Arts Students Step Up": The More Powerful AI Becomes, the More Valuable Humanities Are',
        'excerpt_en': 'Why humanities skills become increasingly valuable as AI capabilities grow.'
    },
    'agent-harness-smart-warehouse': {
        'title_en': 'Agent Harness in Smart Warehouse: The Real Smart Warehouse Management',
        'excerpt_en': 'How AI agents are transforming warehouse management and logistics.'
    }
}

def translate_articles():
    """翻译文章标题和摘要"""
    articles_file = Path('src/data/articles.ts')
    content = articles_file.read_text(encoding='utf-8')

    translated_count = 0

    for slug, translation in TRANSLATIONS.items():
        # 查找文章条目
        pattern = rf"(slug: '{slug}'.*?titleEn: `)([^`]*)(`,.*?excerptEn: `)([^`]*)(`)"
        match = re.search(pattern, content, re.DOTALL)

        if match:
            # 替换 titleEn
            old_title_en = match.group(2)
            new_title_en = translation['title_en']

            # 替换 excerptEn
            old_excerpt_en = match.group(4)
            new_excerpt_en = translation['excerpt_en']

            # 构建新的内容
            new_content = (
                content[:match.start(2)] +
                new_title_en +
                content[match.end(2):match.start(4)] +
                new_excerpt_en +
                content[match.end(4):]
            )

            content = new_content
            translated_count += 1
            print(f"[OK] 已翻译: {slug}")
        else:
            print(f"[WARN] 未找到: {slug}")

    # 写回文件
    articles_file.write_text(content, encoding='utf-8')

    return translated_count

if __name__ == '__main__':
    print("=" * 60)
    print("翻译最近3个月的重要文章")
    print("=" * 60)
    print()

    count = translate_articles()

    print()
    print(f"[OK] 完成翻译 {count} 篇文章")
    print("=" * 60)
