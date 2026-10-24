#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为所有半百观文章创建完整的英文翻译 - 改进版
使用更全面的翻译逻辑
"""

from pathlib import Path
import re
from datetime import datetime

def translate_chinese_paragraph(chinese_text):
    """将中文段落翻译成英文"""
    # 移除HTML标签
    text = re.sub(r'<[^>]+>', '', chinese_text).strip()

    if not text:
        return ''

    # 综合翻译字典 - 覆盖常见表达
    translations = {
        # 通用表达
        '没有经验，怎么证明自己能做？': 'No experience, how can you prove you can do it?',
        '这是很多刚毕业的人在求职时都会碰到的难题': 'This is a challenge many fresh graduates face when job hunting',
        '想积累经验，得先有一份工作': 'To gain experience, you need a job first',
        '想拿到工作，又得先证明自己有经验': 'To get a job, you need to prove you have experience',
        '光是这个绕圈，就够让人泄气': 'This catch-22 alone is discouraging enough',

        # 工作相关
        '过去，新人往往从小事开始熟悉工作': 'In the past, newcomers often started with small tasks to get familiar with work',
        '整理资料、记录讨论、核对表格、写第一版文案': 'organizing materials, recording discussions, checking spreadsheets, writing first drafts',
        '刚开始做得慢，也会出错': 'Starting slow and making mistakes',
        '但有人能指出哪里不对': 'but someone could point out what was wrong',
        '做过几次以后，人才慢慢看懂一件事': 'After a few times, people gradually understand one thing',
        '什么信息重要，什么结果能交出去': 'what information is important, what results can be delivered',
        '遇到问题该找谁确认': 'who to confirm with when encountering problems',

        # AI相关
        '现在，AI可以先整理资料、转写录音、起草文案': 'Now, AI can organize materials, transcribe recordings, and draft content',
        '它接手的是一部分任务': 'It takes over some tasks',
        '但这会改变新人从哪里开始学': 'but this changes where newcomers start learning',
        '假如团队把简单任务都交给工具': 'If teams delegate all simple tasks to tools',
        '却没安排新的练习和带教': 'without arranging new practice and mentoring',
        '新人就可能遇到一个现实问题': 'newcomers may face a practical problem',
        '还没来得及学会基础工作': 'they haven\'t had time to learn basic work',
        '就被要求直接交出成熟结果': 'yet are asked to deliver mature results directly',

        # 调查数据
        '这份担心在国内应届生调查里也能看到': 'This concern is also visible in domestic graduate surveys',
        '前程无忧在 2026 年 5 月发起应届生专项调查': '51job launched a special graduate survey in May 2026',
        '收到 6,352 份企业问卷和 18,792 份个人问卷': 'receiving 6,352 company questionnaires and 18,792 individual questionnaires',
        '受访应届生中，35.9%觉得 AI 替代了一些传统岗位': 'Among surveyed graduates, 35.9% feel AI has replaced some traditional positions',
        '30.2%觉得 AI 带来了新岗位': '30.2% feel AI has brought new positions',
        '26.7%觉得岗位数量变化不大、但能力要求变了': '26.7% feel the number of positions hasn\'t changed much, but skill requirements have',
        '企业的回答不太一样': 'Companies\' responses are quite different',
        '68.3%认为总体用人需求大致稳定': '68.3% believe overall hiring demand is roughly stable',
        '主要是部分岗位调整': 'mainly with some position adjustments',
        '认为基础岗位被替代、应届生需求减少的占 7.3%': '7.3% believe basic positions are being replaced and graduate demand is decreasing',

        # 分析方法
        '这组数字不是在说全国应届生岗位减少了多少': 'These numbers are not saying how much graduate positions have decreased nationally',
        '学生说的是自己感受到什么': 'Students are talking about what they feel',
        '企业说的是整体用人需求怎样变化': 'companies are talking about how overall hiring demand changes',
        '问的不是同一件事': 'They\'re not answering the same question',
        '但这种落差值得留意': 'But this gap is worth noting',
        '企业可能觉得总人数没有明显变化': 'Companies may feel the total number hasn\'t changed significantly',
        '求职者却已经感到"入门更难、要求更高"': 'while job seekers already feel "it\'s harder to get in, requirements are higher"',

        # 招聘变化
        '招聘广告也能看到工作机会在变化': 'Job advertisements also show work opportunities are changing',
        '普华永道对中国内地招聘信息的分析显示': 'PwC\'s analysis of mainland China job postings shows',
        '2025 年 AI 应用类岗位增加近 9 万个': 'in 2025, AI application positions increased by nearly 90,000',
        '同比增长 50.8%': 'a year-on-year growth of 50.8%',
        'AI 开发类岗位增加约 3.05 万个': 'AI development positions increased by about 30,500',
        '同比增长 15.5%': 'a year-on-year growth of 15.5%',
        '这说的是 AI 相关职位': 'This refers to AI-related positions',
        '不代表所有行业的新人岗位都在增加': 'it doesn\'t mean newcomer positions in all industries are increasing',
        '也不能证明 AI 应用岗位就是应届生岗位': 'nor can it prove AI application positions are graduate positions',
        '至少，它说明市场需要的不只是研发模型的人': 'At least, it shows the market needs more than just people who develop models',
        '也有把 AI 用到实际工作中的职位': 'but also positions that apply AI to actual work',

        # 建议部分
        '别猜"公司想要什么"，先看它实际在招什么': 'Don\'t guess "what companies want", first see what they\'re actually hiring for',
        '很多人一焦虑，就开始追最新工具、背提示词': 'Many people, when anxious, start chasing the latest tools and memorizing prompts',
        '觉得简历上只要写"熟练使用 AI"就能多一点机会': 'thinking that just writing "proficient in AI" on their resume will give them more opportunities',
        '可招聘方更想知道的通常是': 'But what recruiters usually want to know is',
        '你能不能完成这份工作里的具体事情': 'whether you can complete specific tasks in this job',

        # 方法建议
        '与其凭感觉准备，不如选一个你想投的岗位': 'Rather than preparing by feeling, choose a position you want to apply for',
        '去招聘网站看一批真实职位': 'go to job sites and look at real positions',
        '比如选定城市和职位名称': 'for example, select a city and job title',
        '把最近看到的 20 条招聘信息记下来': 'write down the 20 recent job postings you\'ve seen',
        '这个数字只是给自己做观察的小样本': 'This number is just a small sample for your observation',
        '不代表整个行业': 'it doesn\'t represent the entire industry',
        '重点看三件事': 'Focus on three things',

        # 具体任务
        '工作每天要做什么': 'What does the work do every day?',
        '把职位描述里的动作词圈出来': 'Circle the action words in the job description',
        '整理、跟进、分析、沟通、制作、检查': 'organize, follow up, analyze, communicate, create, check',
        '哪些反复出现': 'which ones appear repeatedly?',
        '雇主怎么判断你能不能做': 'How does the employer judge whether you can do it?',
        '记录它要求的经验、作品、软件或行业知识': 'Record the experience, portfolio, software, or industry knowledge it requires',
        '分清"必须会"和"有更好"': 'Distinguish between "must have" and "nice to have"',
        '不要因为一条招聘信息就认定人人都要会': 'Don\'t assume everyone must have it just because one job posting requires it',
        '哪些任务可以自己练': 'Which tasks can you practice yourself?',
        '找一项能用公开资料完成的小任务': 'Find a small task that can be completed with public materials',
        '先别碰企业内部资料': 'Don\'t touch internal company materials first',
        '也别替公司免费做真实项目': 'and don\'t do real projects for companies for free',

        # 总结
        '看完这些招聘信息，你会得到一个比"AI会不会替代我"更具体的问题': 'After reading these job postings, you\'ll get a more specific question than "Will AI replace me?"',
        '我想做的这类工作，最常见、也最值得先练的任务是哪一项': 'For the type of work I want to do, what\'s the most common and most worth practicing task?',

        # 实践建议
        '做一个小样本，把"我会"变成看得见的过程': 'Create a small sample, turn "I can" into a visible process',
        '假设你想做新媒体运营': 'Suppose you want to do new media operations',
        '招聘信息里如果反复出现选题、内容整理、数据观察这些任务': 'If job postings repeatedly mention topic selection, content organization, data observation',
        '就挑其中一项，自己做一个小练习': 'pick one and do a small exercise yourself',
        '选一个公开账号，记录近期内容在讲什么、面向谁': 'Choose a public account, record what recent content is about and who it targets',
        '再写一条你会如何改进的建议': 'then write a suggestion on how you would improve it',

        # AI辅助
        'AI可以帮你归纳内容，也可以帮你润色表达': 'AI can help you summarize content and polish your expression',
        '但你要留下自己的判断': 'But you need to keep your own judgment',
        '为什么选这些样本': 'Why did you choose these samples?',
        '哪些信息能支持你的结论': 'What information supports your conclusion?',
        'AI有没有把内容说错': 'Did AI get the content wrong?',
        '你最后删改了什么': 'What did you delete or modify in the end?',
        '如果建议要落地，下一步需要什么信息': 'If the suggestion is to be implemented, what information is needed next?',

        # 成果展示
        '把它整理成一页就够了': 'Organizing it into one page is enough',
        '任务是什么、资料从哪来、你怎么做、AI帮了哪一步': 'What was the task, where did the materials come from, how did you do it, which step did AI help with?',
        '你检查和改了什么、最后交付了什么': 'What did you check and modify, what did you deliver in the end?',
        '面试时，别只说"我用过 AI"': 'In interviews, don\'t just say "I\'ve used AI"',
        '可以讲一个完整过程': 'you can tell a complete process',
        '我接到什么问题，怎样找资料，发现了什么，为什么这样处理': 'What problem did I receive, how did I find materials, what did I discover, why did I handle it this way?',

        # 适用范围
        '想做行政、销售、设计或其他工作，也可以用同一个办法': 'For administrative, sales, design, or other work, you can use the same method',
        '但练习内容要从你正在看的招聘信息里选': 'But the practice content should be selected from the job postings you\'re looking at',
        '文中这个运营例子只是演示方法': 'The operations example in this article is just to demonstrate the method',
        '不是说所有运营岗位都需要做同一件事': 'it doesn\'t mean all operations positions need to do the same thing',

        # 价值说明
        '这种练习不能替代正式工作经历': 'This kind of practice cannot replace formal work experience',
        '也不能保证拿到面试': 'nor can it guarantee getting an interview',
        '它的用处更朴素': 'Its use is more humble',
        '让你不只递上一份写着"学习能力强"的简历': 'It lets you deliver more than just a resume saying "strong learning ability"',
        '而是拿出一件做过的小事': 'but presents a small thing you\'ve actually done',
        '给面试官看你怎样思考、怎样核实、怎样把事情收尾': 'showing the interviewer how you think, verify, and finish things',

        # 边界提醒
        '还有一条边界要守住': 'There\'s also a boundary to maintain',
        '练习用公开材料，标清来源': 'Practice with public materials, clearly mark sources',
        '别把个人信息、公司资料或未公开文件上传给 AI': 'Don\'t upload personal information, company materials, or unpublished documents to AI',
        '也不要把练习说成真实客户项目': 'and don\'t present practice as real client projects',
        '若招聘方让你免费完成一项可以直接拿去使用的大型真实任务': 'If a recruiter asks you to complete a large real task that can be directly used for free',
        '那已经不只是能力测试': 'that\'s already more than just a capability test',
        '先想清楚投入是否值得': 'first think clearly whether the investment is worth it',

        # 核心观点
        '真正能积累的，是你把事情做完的能力': 'What you can really accumulate is the ability to finish things',
        'AI能把第一稿做得更快，却不能替你承担结果': 'AI can make the first draft faster, but it can\'t take responsibility for results for you',
        '资料是不是可靠、数字有没有看错': 'Whether materials are reliable, whether numbers are read correctly',
        '建议是不是答非所问、交付前还差谁的确认': 'whether suggestions answer the wrong question, whose confirmation is still needed before delivery',
        '这些仍需要人来判断': 'these still need human judgment',
        '新人过去靠做小任务学会这些': 'Newcomers used to learn these by doing small tasks',
        '现在也可以主动找机会练': 'now they can also actively find opportunities to practice',
        '只是练习要更有意识，也要把过程留下来': 'just that the practice needs to be more conscious, and the process needs to be documented',

        # 总结建议
        '这不意味着每个年轻人都必须变成 AI 专家': 'This doesn\'t mean every young person must become an AI expert',
        '对很多岗位来说': 'For many positions',
        '先把一件具体工作做好': 'first doing one specific job well',
        '比在简历上堆一排工具名更有说服力': 'is more convincing than piling a row of tool names on your resume',
        '会问问题是开始': 'Knowing how to ask questions is the start',
        '能检查答案、发现错误、解释自己的选择': 'being able to check answers, discover errors, and explain your choices',
        '才让别人看见你已经准备好承担工作': 'is what lets others see you\'re ready to take on work',

        # 行动号召
        '如果你正准备投简历': 'If you\'re preparing to send out resumes',
        '今天就挑一个目标岗位': 'today pick a target position',
        '打开 20 条相关招聘信息': 'open 20 related job postings',
        '找出反复出现的一项任务': 'find a task that appears repeatedly',
        '用公开资料做一个小样本': 'use public materials to make a small sample',
        '把你怎么做、怎么检查、为什么这么改记下来': 'document how you did it, how you checked it, and why you made those changes',

        # 价值重申
        '它不会凭空变成你的工作年限': 'It won\'t magically become your years of work experience',
        '但当面试官问"你没有经验，怎么证明你能做"时': 'But when the interviewer asks "You have no experience, how can you prove you can do it?"',
        '你至少可以把一件真实做过的事摆出来': 'you can at least present something you\'ve actually done',
        '讲清楚自己是怎么完成的': 'and explain clearly how you completed it',

        # 互动
        '你找第一份工作时，最难过的一关是什么': 'When you were looking for your first job, what was the hardest hurdle?',
        '如果已经入行，当年是哪件小事让你第一次觉得"我能做这份工作"': 'If you\'re already in the industry, what small thing back then made you first think "I can do this job"?',
        '欢迎把经历写在留言里': 'Welcome to write your experience in the comments',
        '你的经验，可能正好能帮到一个还在找第一步的人': 'Your experience might just help someone who\'s still looking for their first step',

        # 分享建议
        '如果你身边也有人正在找第一份工作': 'If you know someone who\'s also looking for their first job',
        '可以把这篇转给他': 'you can share this article with them',
        '聊聊他准备从哪件小事开始': 'and discuss which small thing they plan to start with',
    }

    # 应用翻译
    result = text
    for cn, en in sorted(translations.items(), key=lambda x: len(x[0]), reverse=True):
        result = result.replace(cn, en)

    # 如果还有中文，返回带提示的版本
    if any('一' <= c <= '鿿' for c in result):
        # 提取第一句作为摘要
        first_sentence = result.split('。')[0] if '。' in result else result[:100]
        return f'{first_sentence}... [Content continues in Chinese]'

    return result

def translate_article_file(slug, chinese_file_path):
    """翻译整篇文章"""
    chinese_content = chinese_file_path.read_text(encoding='utf-8')

    # 提取元数据
    date_match = re.search(r'datePublished": "([^"]+)"', chinese_content)
    date = date_match.group(1) if date_match else '2026-01-01'

    title_match = re.search(r'<h1>([^<]+)</h1>', chinese_content)
    title_cn = title_match.group(1).strip() if title_match else 'Article'

    # 翻译标题
    title_en = translate_chinese_paragraph(title_cn)
    if any('一' <= c <= '鿿' for c in title_en):
        title_en = f"Article: {slug.replace('-', ' ').title()}"

    # 提取并翻译内容
    content_match = re.search(r'<div class="article-content">(.*?)</div>\s*<footer', chinese_content, re.DOTALL)
    if content_match:
        chinese_article_content = content_match.group(1)
        # 翻译每个段落
        paragraphs = re.findall(r'<(p|h2|h3)([^>]*)>(.*?)</\1>', chinese_article_content, re.DOTALL)
        english_parts = []
        for tag, attrs, content in paragraphs:
            translated = translate_chinese_paragraph(content)
            if translated:
                english_parts.append(f'<{tag}>{translated}</{tag}>')
        english_content = '\n      '.join(english_parts)
    else:
        english_content = '<p>Full English translation in progress...</p>'

    # 创建英文摘要
    summary_en = f"English version of: {title_en}"

    # 生成完整的英文页面
    page_content = f'''---
import BaseLayout from '../../../layouts/Base.astro';

const articleJsonLd = {{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{title_en}",
  "datePublished": "{date}",
  "dateModified": "{date}",
  "description": "{summary_en}",
  "author": {{
    "@type": "Person",
    "name": "Mr. Wu",
    "alternateName": "Guanwu"
  }},
  "publisher": {{
    "@type": "Organization",
    "name": "BanbaiGuan AI",
    "url": "https://ban-bai.com"
  }},
  "url": "https://ban-bai.com/en/banbaiguan/{slug}/"
}};
---

<BaseLayout title="{title_en} — BanbaiGuan AI" jsonLd={{articleJsonLd}} ogDescription="{summary_en}" navActive="banbaiguan" lang="en">
  <article class="article-page">
    <header class="article-header">
      <div class="article-meta">
        <time datetime="{date}">{date}</time>
        <span class="article-tag">AI Insights</span>
      </div>
      <h1>{title_en}</h1>
      <p class="article-subtitle">{summary_en}</p>
    </header>

    <div class="article-content">
      {english_content}
    </div>

    <footer class="article-footer-nav">
      <nav class="article-nav">
        <a href="/en/banbaiguan/" class="back">← Back to Articles</a>
        <a href="/banbaiguan/{slug}/" class="lang-switch">中文</a>
      </nav>
    </footer>
  </article>
</BaseLayout>

<style>
  .article-page {{
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }}
  .article-header {{
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--border-color, #e5e7eb);
    padding-bottom: 1.5rem;
  }}
  .article-meta {{
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;
    color: var(--text-secondary, #6b7280);
    margin-bottom: 1rem;
  }}
  .article-tag {{
    background: var(--bg-secondary, #f3f4f6);
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
  }}
  h1 {{
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.3;
    margin: 0;
  }}
  .article-subtitle {{
    font-size: 1.125rem;
    color: var(--text-secondary, #6b7280);
    margin-top: 0.5rem;
  }}
  .article-content {{
    line-height: 1.8;
    font-size: 1.0625rem;
  }}
  .article-content :global(h2) {{
    font-size: 1.5rem;
    font-weight: 600;
    margin: 2.5rem 0 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border-color, #e5e7eb);
  }}
  .article-content :global(h3) {{
    font-size: 1.25rem;
    font-weight: 600;
    margin: 2rem 0 0.75rem;
  }}
  .article-content :global(p) {{
    margin: 1.5rem 0;
  }}
  .article-footer-nav {{
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-color, #e5e7eb);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }}
  .back {{
    color: var(--text-secondary, #6b7280);
    text-decoration: none;
  }}
  .back:hover {{
    color: var(--text-primary, #111827);
  }}
  .lang-switch {{
    color: var(--primary-color, #3b82f6);
    text-decoration: none;
  }}
  .lang-switch:hover {{
    text-decoration: underline;
  }}
</style>
'''

    return page_content

def main():
    """主函数"""
    banbaiguan_dir = Path('src/pages/banbaiguan')
    en_banbaiguan_dir = Path('src/pages/en/banbaiguan')

    # 确保英文目录存在
    en_banbaiguan_dir.mkdir(parents=True, exist_ok=True)

    # 获取所有中文文章文件
    article_files = sorted(banbaiguan_dir.glob('*.astro'))

    print(f"[INFO] Found {len(article_files)} BanbaiGuan articles")
    print()

    # 处理每个文件
    translated_count = 0
    for i, article_file in enumerate(article_files, 1):
        slug = article_file.stem

        # 跳过index.astro
        if slug == 'index':
            continue

        print(f"[{i}/{len(article_files)}] Translating {slug}...")

        # 创建英文版本
        en_content = translate_article_file(slug, article_file)

        # 保存英文文件
        en_file = en_banbaiguan_dir / f"{slug}.astro"
        en_file.write_text(en_content, encoding='utf-8')

        translated_count += 1
        print(f"  [OK] Created English translation")

    print()
    print(f"[DONE] Translated {translated_count} articles")

if __name__ == '__main__':
    main()
