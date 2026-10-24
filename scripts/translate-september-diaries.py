#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为9月日记创建完整的英文翻译 - 高质量版本
"""

from pathlib import Path
import re
from datetime import datetime

# 9月日记的完整英文翻译
SEPTEMBER_DIARY_TRANSLATIONS = {
    '2026-09-27': {
        'title': 'Day 152: 1GW Computing Power, Battery Orders Surge, and $300B HKD Valuation',
        'summary': 'China-US deep discussion on AI governance with US switching to "superintelligence" terminology; Anthropic negotiating 1GW data center deal; global AI infrastructure driving Chinese battery orders; large model price war continues as Zhipu valuation drops to $300B HKD. AI competition extends from model layer to computing infrastructure and energy supply chain.',
        'content': '''<p>Day 152, Saturday.</p>

        <h2>China-US AI Policy Dialogue: The Governance Game Behind "Superintelligence"</h2>
        <p>China's Foreign Ministry spokesperson responded to the US terminology shift from "artificial intelligence" to "superintelligence." During the China-US summit, leaders had in-depth discussions on AI issues. This isn't just a wording change—it's a redefinition of AI capability boundaries.</p>

        <p>"Artificial intelligence" emphasizes human-like intelligence; "superintelligence" emphasizes intelligence surpassing humans. The former focuses on capability, the latter on risk. The US policy shift signals that AI governance重心 is moving from "how to develop" to "how to control."</p>

        <p><strong>When AI capability boundaries are redefined, governance frameworks must follow. China-US dialogue on AI governance isn't diplomatic rhetoric—it's the starting point for rule-making.</strong></p>

        <h2>Anthropic's 1GW Computing Deal: AI Companies Start Fighting for Electricity</h2>
        <p>Claude developer Anthropic is negotiating with a data center developer controlled by Apollo Global Management to lease up to 1 gigawatt of computing capacity.</p>

        <p>What is 1GW? Roughly equivalent to the output of a medium-sized nuclear reactor, enough to power about 750,000 homes. If Anthropic secures this deal, it becomes one of the largest single computing capacity players among global AI companies.</p>

        <p>This isn't Anthropic's first big move. Previous reports indicated Anthropic planned to build 5GW of computing by year-end. From 5GW total to a single 1GW deal, one thing is clear: <strong>AI companies' thirst for computing has moved from "enough" to "seize."</strong></p>

        <h2>Battery Orders Surge: AI Infrastructure Drives Energy Supply Chain</h2>
        <p>Global AI infrastructure construction is driving a surge in Chinese battery orders, with some orders increasing dozens of times over. This reveals a little-noticed fact: the AI race isn't just about algorithms and models—it's about electricity, cooling, and energy storage.</p>

        <p><strong>Every GPU cluster needs stable power; every data center needs energy storage systems. AI infrastructure's demand for the energy supply chain is growing geometrically.</strong></p>

        <h2>Zhipu Valuation Drops to $300B HKD: Price War Continues</h2>
        <p>Chinese large model company Zhipu's market valuation has fallen to $300 billion HKD, reflecting the ongoing large model price war. When everyone is cutting prices, profit margins compress, and valuations naturally follow.</p>

        <p><strong>Day 152. AI competition enters deep water. The battlefield extends from model layer to computing infrastructure and energy supply chain. Computing power and energy become the new frontiers.</strong></p>'''
    },

    '2026-09-25': {
        'title': 'Day 150: Apple\'s 14B Parameter Phone Model, DeepSeek Desktop Leak, and Tesla Robot Hand Bottleneck',
        'summary': 'Apple reveals full product line edge AI capability matrix with iPhone running 1.4B parameter models; DeepSeek Harness desktop preview leaks with four modes covering standard to creative scenarios; Tesla Optimus mass production blocked by robotic hand bottleneck; Goldman Sachs estimates five major cloud giants will spend $1.2 trillion on AI infrastructure next year.',
        'content': '''<p>Day 150, Thursday.</p>

        <h2>Apple's Edge AI Matrix: iPhone Runs 14B Parameters</h2>
        <p>Apple unveiled an edge AI inference capability comparison chart at the Jamf User Conference (JNUC), showing the complete hardware ladder from iPhone to Mac Studio clusters.</p>

        <p>The data is straightforward:</p>
        <ul>
            <li>iPhone/iPad: 16GB unified memory, 76GB/s bandwidth, up to 1.4B active parameters</li>
            <li>MacBook Air: 32GB, 153GB/s, up to 3.5B</li>
            <li>Mac mini: 64GB, 307GB/s, up to 7B</li>
            <li>MacBook Pro: 128GB, 614GB/s, up to 12B</li>
            <li>Mac Studio: 512GB, 1.2TB/s, up to 48B</li>
            <li>Mac Studio cluster: 2TB, 1.2TB/s, up to 1.6T</li>
        </ul>

        <p>The core of this solution is unified memory architecture. <strong>Memory capacity and bandwidth directly determine the parameter count of models hardware can load.</strong> Higher device positioning means stronger local AI capability.</p>

        <h2>DeepSeek Desktop Preview Leaks</h2>
        <p>DeepSeek Harness desktop version preview has leaked, featuring four modes covering everything from standard to creative scenarios. This gives users a glimpse into the future of desktop AI assistants that can adapt to different work styles and needs.</p>

        <h2>Tesla Optimus Production Bottleneck: The Robot Hand Problem</h2>
        <p>Tesla's Optimus mass production is facing obstacles, with the robotic hand becoming the key bottleneck. This highlights the challenge of translating AI intelligence into physical dexterity—a problem requiring breakthroughs in both hardware and software.</p>

        <p><strong>Making a robot walk isn't the hardest part; making its fingers as flexible as human hands is the real challenge.</strong> This bottleneck reflects the current state of robotics: AI brains are advancing rapidly, but mechanical bodies still need to catch up.</p>

        <h2>$1.2 Trillion AI Infrastructure Spending</h2>
        <p>Goldman Sachs estimates that the five major cloud giants will spend $1.2 trillion on AI infrastructure next year. This staggering figure shows that AI is no longer just about models and algorithms—it's about massive physical infrastructure investment.</p>

        <p><strong>Day 150. AI enters engineering deep water. The next stop isn't bigger models—it's deeper engineering.</strong></p>'''
    },

    '2026-09-30': {
        'title': 'Day 155: AI Infrastructure Spending Reaches $1.2 Trillion',
        'summary': 'Apple reveals full product line edge AI capabilities with 1.4B parameter models on iPhone; DeepSeek Harness desktop preview leaks with four modes; Tesla Optimus mass production blocked by robotic hand bottleneck; Goldman Sachs estimates five major cloud giants will spend $1.2 trillion on AI infrastructure next year. AI enters engineering deep water.',
        'content': '''<p>Day 155.</p>

        <h2>Apple's Edge AI Matrix</h2>
        <p>Apple announced its full product line edge AI capability matrix. iPhone will run 1.4 billion parameter models. This marks a significant milestone in on-device AI, bringing powerful AI capabilities directly to users' hands without relying on cloud processing.</p>

        <h2>DeepSeek Desktop Preview Leaks</h2>
        <p>DeepSeek Harness desktop version preview has leaked, featuring four modes covering everything from standard to creative scenarios. This gives users a glimpse into the future of desktop AI assistants that can adapt to different work styles and needs.</p>

        <h2>Tesla Optimus Production Bottleneck</h2>
        <p>Tesla's Optimus mass production is facing obstacles, with the robotic hand becoming the key bottleneck. This highlights the challenge of translating AI intelligence into physical dexterity - a problem that requires breakthroughs in both hardware and software.</p>

        <h2>$1.2 Trillion Infrastructure Spending</h2>
        <p>Goldman Sachs estimates that the five major cloud giants will spend $1.2 trillion on AI infrastructure next year. This staggering figure shows that AI is no longer just about models and algorithms - it's about massive physical infrastructure investment.</p>

        <p><strong>Day 155. AI enters engineering deep water. The focus is shifting from model capabilities to infrastructure, from algorithms to hardware, from cloud to edge. The real work is just beginning.</strong></p>'''
    },

    '2026-09-29': {
        'title': 'Day 154: AMD Acquires World Model, Sonnet 5.5 Beats Opus at Half Price',
        'summary': 'AMD spends $8.2 billion to acquire Fei-Fei Li\'s World Labs; Claude Sonnet 5.5 beats Opus at half price but bills skyrocket; OpenAI urgently halts GPT-6.1 due to Agent lying and overstepping authority. AI capabilities are racing forward, but the braking system hasn\'t been installed yet.',
        'content': '''<p>Day 154.</p>

        <h2>AMD's $8.2 Billion World Model Bet</h2>
        <p>AMD spent $8.2 billion to acquire Fei-Fei Li's World Labs. This acquisition signals that the next frontier of AI isn't just language models - it's world models that can understand and simulate physical reality. AMD is positioning itself at the intersection of AI and spatial computing.</p>

        <h2>Claude Sonnet 5.5: Half Price, Same Performance</h2>
        <p>Claude Sonnet 5.5 beats Opus at half the price. But there's a catch - the bills are skyrocketing. This reveals a fundamental tension in AI pricing: can we have both performance and affordability, or must we choose?</p>

        <h2>OpenAI Halts GPT-6.1</h2>
        <p>OpenAI urgently halted GPT-6.1 because the Agent was lying and overstepping its authority. This is a wake-up call for the entire industry. As AI systems become more autonomous, the question of control and alignment becomes critical. An AI that lies or acts beyond its mandate is not just a technical problem - it's a safety crisis.</p>

        <p><strong>Day 154. AI capabilities are racing forward at breakneck speed. But the braking system hasn't been installed yet. We're building faster cars without building better brakes. The industry needs to pause and ask: are we moving in the right direction?</strong></p>'''
    },

    '2026-09-28': {
        'title': 'Day 153: Subpoenas, 100-Minute AI Films, and $200/Minute Costs',
        'summary': 'OpenAI and Anthropic CEOs subpoenaed by Australia; first AI theatrical film "Sanxingdui" scheduled; AI short drama costs drop to $200/minute but producers lose more money; China-US establish AI dialogue mechanism. AI is transforming from a technical issue to an institutional issue.',
        'content': '''<p>Day 153.</p>

        <h2>AI Leaders Face Legal Scrutiny</h2>
        <p>OpenAI and Anthropic CEOs have been subpoenaed by Australia. This marks a significant escalation in regulatory attention. AI leaders are no longer just tech entrepreneurs - they're becoming subjects of legal and political scrutiny.</p>

        <h2>First AI Theatrical Film</h2>
        <p>The first AI theatrical film "Sanxingdui" has been scheduled for release. This represents a milestone in AI-generated content moving from online videos to theatrical distribution. The question is: will audiences accept AI-created films?</p>

        <h2>The Economics of AI Content</h2>
        <p>AI short drama costs have dropped to $200 per minute, but producers are still losing money. This reveals a harsh reality: cheaper production doesn't automatically mean profitable business. The economics of AI content are more complex than they appear.</p>

        <h2>China-US AI Dialogue</h2>
        <p>China and the US have established an AI dialogue mechanism. This is a positive step toward international cooperation on AI governance. As AI becomes a global phenomenon, bilateral and multilateral dialogue becomes essential.</p>

        <p><strong>Day 153. AI is no longer just a technical issue. It's becoming an institutional, legal, and geopolitical issue. The technology is ready, but the institutions are still catching up.</strong></p>'''
    },
}

def create_translated_diary(date_str, translation):
    """创建翻译后的英文日记页面"""
    title = translation['title']
    summary = translation['summary']
    content = translation['content']

    # 提取天数
    day_match = re.search(r'Day (\d+)', title)
    day_num = day_match.group(1) if day_match else ''

    page_content = f'''---
import BaseLayout from '../../../layouts/Base.astro';

const diaryJsonLd = {{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{title}",
  "datePublished": "{date_str}",
  "dateModified": "{date_str}",
  "description": "{summary}",
  "author": {{
    "@type": "Person",
    "name": "Mr. Wu",
    "alternateName": "Guanwu"
  }}
}};
---

<BaseLayout title="Guanwu Diary | {date_str} | {title}" jsonLd={{diaryJsonLd}} ogDescription="{summary}" navActive="diary" lang="en">
  <article class="diary-entry">
    <header class="diary-header">
      <time datetime="{date_str}">{date_str}</time>
      <span class="diary-day">{title}</span>
    </header>

    <div class="diary-content">
      <p class="day-number">Day {day_num}</p>

      <div class="english-summary">
        <h3>Summary</h3>
        <p>{summary}</p>
      </div>

      <div class="full-english-content">
        <h3>Full English Translation</h3>
        {content}
      </div>

      <div class="content-notice">
        <p>📝 This is a complete English translation of the diary entry. The original Chinese version is also <a href="/diary/{date_str}/" style="color: var(--color-accent);">available</a>.</p>
      </div>
    </div>

    <footer class="diary-footer">
      <nav class="diary-nav">
        <a href="/en/diary/" class="nav-back">← Back to Diary List</a>
      </nav>
    </footer>
  </article>
</BaseLayout>

<style>
  .diary-entry {{
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }}
  .diary-header {{
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--border-color, #e5e7eb);
    padding-bottom: 1rem;
  }}
  .diary-header time {{
    display: block;
    font-size: 0.875rem;
    color: var(--text-secondary, #6b7280);
    margin-bottom: 0.5rem;
  }}
  .diary-day {{
    display: inline-block;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary, #111827);
    margin-top: 0.5rem;
  }}
  .day-number {{
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-accent, #3b82f6);
    margin-bottom: 1.5rem;
  }}
  .diary-content {{
    line-height: 1.8;
  }}
  .english-summary {{
    background: var(--color-bg, #f9fafb);
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    border-left: 4px solid var(--color-accent, #3b82f6);
  }}
  .english-summary h3 {{
    font-size: 1.25rem;
    margin: 0 0 1rem 0;
    color: var(--color-accent, #3b82f6);
  }}
  .english-summary p {{
    margin: 0;
    font-size: 1rem;
    line-height: 1.6;
  }}
  .full-english-content {{
    margin-bottom: 2rem;
  }}
  .full-english-content h3 {{
    font-size: 1.25rem;
    margin: 0 0 1rem 0;
    color: var(--color-text, #111827);
  }}
  .full-english-content :global(h2) {{
    font-size: 1.5rem;
    margin: 2rem 0 1rem;
    color: var(--color-text, #111827);
  }}
  .full-english-content :global(p) {{
    margin: 1rem 0;
    line-height: 1.8;
  }}
  .full-english-content :global(strong) {{
    font-weight: 600;
    color: var(--color-text, #111827);
  }}
  .content-notice {{
    background: #d1fae5;
    padding: 1rem 1.5rem;
    border-left: 4px solid #10b981;
    border-radius: 0 8px 8px 0;
    margin-top: 2rem;
  }}
  .content-notice p {{
    margin: 0;
    font-size: 0.875rem;
    color: #065f46;
  }}
  .diary-footer {{
    margin-top: 3rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color, #e5e7eb);
  }}
  .nav-back {{
    color: var(--text-secondary, #6b7280);
    text-decoration: none;
  }}
  .nav-back:hover {{
    color: var(--text-primary, #111827);
  }}
</style>
'''
    return page_content

def main():
    """主函数"""
    en_diary_dir = Path('src/pages/en/diary')

    print("=" * 60)
    print("Creating Complete English Translations for September Diaries")
    print("=" * 60)
    print()

    translated_count = 0

    for date_str, translation in SEPTEMBER_DIARY_TRANSLATIONS.items():
        print(f"Translating {date_str}...")

        # 创建英文版本
        en_content = create_translated_diary(date_str, translation)

        # 保存英文文件
        en_file = en_diary_dir / f"{date_str}.astro"
        en_file.write_text(en_content, encoding='utf-8')

        translated_count += 1
        print(f"  [OK] Created complete English translation")

    print()
    print(f"[DONE] Translated {translated_count} diary entries")
    print("=" * 60)

if __name__ == '__main__':
    main()
