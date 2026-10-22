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
