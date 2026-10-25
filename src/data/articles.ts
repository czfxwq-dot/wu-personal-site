// 文章数据 — 完整版本（50条）
// 已按日期降序排序
export interface ArticleEntry {
  slug: string;
  date: string;
  title: string;
  titleEn?: string;
  excerpt: string;
  excerptEn?: string;
  tag: string;
  tagEn?: string;
  contentEn?: string;
}

export const articles: ArticleEntry[] = [
  {
    slug: 'ai-first-work-experience',
    date: '2026-10-22',
    title: `AI来了，年轻人怎么获得"第一份工作经验"？`,
    titleEn: `AI Is Here: How Can Young People Get Their "First Work Experience"?`,
    excerpt: `没有经验，却被要求尽快上手；AI又接过了一部分基础任务。新人从哪里开始？从真实招聘信息里找一项任务，做个小样本，留下自己的判断与修改。`,
    excerptEn: `No experience, but asked to get started quickly; AI has taken over some basic tasks. Where do newcomers start? Find a task from real job postings, make a small sample, and leave your own judgment and modifications.`,
    tag: 'AI观点',
    tagEn: 'AI观点',
    contentEn: `<p>"No experience, how do I prove I can do it?"</p>

      <p>This is a problem many fresh graduates face when job hunting. Seeing a job posting aimed at newcomers that also says "relevant experience preferred, able to get up to speed quickly," it's natural to worry: to gain experience, you need a job first; to get a job, you need to prove you have experience. Just this circular logic is discouraging enough.</p>

      <p>In the past, newcomers often started by getting familiar with work through small tasks: organizing materials, recording discussions, checking spreadsheets, writing first drafts. They'd work slowly at first and make mistakes, but someone would point out what was wrong. After doing it a few times, people gradually understood one thing: what information matters, what results can be delivered, who to confirm with when problems arise.</p>

      <p>Now, AI can organize materials first, transcribe recordings, draft copy. It's taking over some tasks, but this will change where newcomers start learning. If teams hand all simple tasks to tools without arranging new practice and mentoring, newcomers might face a real problem: before they've had time to learn basic work, they're being asked to deliver mature results directly.</p>

      <p>This concern can also be seen in domestic fresh graduate surveys. 51job launched a fresh graduate special survey in May 2026, receiving 6,352 company questionnaires and 18,792 individual questionnaires. Among surveyed fresh graduates, 35.9% feel AI has replaced some traditional positions, 30.2% feel AI has brought new positions, and 26.7% feel the number of positions hasn't changed much but capability requirements have changed. Companies' answers are different: 68.3% believe overall staffing needs are roughly stable, mainly with some position adjustments; those who believe basic positions are being replaced and fresh graduate demand is decreasing account for 7.3%.</p>

      <p>These numbers aren't saying how much fresh graduate positions nationwide have decreased. Students are talking about what they personally feel, companies are talking about how overall staffing needs are changing—they're not talking about the same thing. But this gap is worth noting: companies might feel total headcount hasn't changed significantly, but job seekers already feel "it's harder to get in, requirements are higher."</p>

      <p>Job advertisements also show work opportunities are changing. PwC's analysis of mainland China recruitment information shows that in 2025, AI application positions increased by nearly 90,000, a year-on-year growth of 50.8%; AI development positions increased by about 30,500, a year-on-year growth of 15.5%. This is talking about AI-related positions, not that newcomer positions in all industries are increasing, nor does it prove AI application positions are fresh graduate positions. At least, it shows the market needs not just people who develop models, but also positions that apply AI to actual work.</p>

      <h2>Don't Guess "What the Company Wants," Look at What They're Actually Hiring For</h2>

      <p>Many people, when anxious, start chasing the latest tools, memorizing prompts, thinking that as long as they write "proficient in using AI" on their resume, they'll have a bit more opportunity. But what recruiters usually want to know is: can you complete specific things in this job?</p>

      <p>Instead of preparing by feeling, choose a position you want to apply for, go to recruitment websites to look at real positions. For example, select city and position name, write down the 20 most recent job postings you've seen. This number is just a small sample for your own observation, not representing the entire industry. Focus on three things:</p>

      <ul>
        <li><strong>What does the work involve daily?</strong> Circle the action words in the job description: organize, follow up, analyze, communicate, produce, check—which ones appear repeatedly?</li>
        <li><strong>How does the employer judge if you can do it?</strong> Record the experience, portfolio, software, or industry knowledge they require. Distinguish between "must have" and "nice to have," don't assume everyone needs to know everything just from one job posting.</li>
        <li><strong>Which tasks can you practice yourself?</strong> Find a small task that can be completed with public materials, don't touch internal company data, and don't do real projects for the company for free.</li>
      </ul>

      <p>After looking at these job postings, you'll get a more specific question than "will AI replace me": for the type of work I want to do, what's the most common and most worth practicing task first?</p>

      <h2>Make a Small Sample, Turn "I Can" Into a Visible Process</h2>

      <p>Suppose you want to do new media operations. If job postings repeatedly mention topic selection, content organization, data observation, pick one of these tasks and do a small practice yourself: choose a public account, record what recent content is about and who it's aimed at, then write a suggestion for how you would improve it.</p>

      <p>AI can help you summarize content, and can help you polish expression. But you need to leave your own judgment: why did you choose these samples? What information supports your conclusion? Did AI get the content wrong? What did you delete or change in the end? If the suggestion is to be implemented, what information is needed next?</p>

      <p>Organize it into one page: what the task was, where the materials came from, how you did it, which step AI helped with, what you checked and changed, and what you delivered in the end. In an interview, don't just say "I've used AI," you can tell a complete process: what problem I received, how I found materials, what I discovered, why I handled it this way.</p>

      <p>If you want to do administration, sales, design, or other work, you can use the same method, but the practice content should be selected from the job postings you're looking at. This operations example in the text is just demonstrating the method, not saying all operations positions need to do the same thing.</p>

      <p>This kind of practice can't replace formal work experience, nor can it guarantee getting an interview. Its use is more basic: instead of just handing over a resume that says "strong learning ability," you can take out a small thing you've done, showing the interviewer how you think, how you verify, and how you finish things.</p>

      <p>There's also a boundary to maintain: use public materials for practice, clearly mark sources; don't upload personal information, company materials, or unpublished documents to AI; and don't present practice as real client projects. If a recruiter asks you to complete a large real task that can be directly used for free, that's already more than just a capability test, first think clearly whether the investment is worth it.</p>

      <h2>What You Can Really Accumulate Is the Ability to Finish Things</h2>

      <p>AI can make the first draft faster, but it can't take responsibility for results for you. Whether materials are reliable, whether numbers are read correctly, whether suggestions answer the question, whose confirmation is still needed before delivery—these still need human judgment. Newcomers used to learn these by doing small tasks, now they can also proactively find opportunities to practice, just the practice needs to be more conscious, and the process needs to be documented.</p>

      <p>This doesn't mean every young person must become an AI expert. For many positions, doing one specific job well is more convincing than lining up a row of tool names on a resume. Asking questions is the start; being able to check answers, find errors, and explain your choices is what lets others see you're ready to take on work.</p>

      <p>If you're preparing to send out resumes, today pick a target position, open 20 related job postings, find a task that appears repeatedly. Use public materials to make a small sample, write down how you did it, how you checked it, and why you made changes.</p>

      <p>It won't magically become your years of work experience. But when an interviewer asks "you don't have experience, how do you prove you can do it," at least you can put forward a real thing you've done and clearly explain how you completed it.</p>

      <p>When you were looking for your first job, what was the hardest part to get through? If you're already in the industry, what small thing made you first feel "I can do this job"? Welcome to share your experience in the comments. Your experience might be able to help someone who's still looking for that first step.</p>

      <p>If you have people around you who are also looking for their first job, you can share this with them and talk about what small thing they're planning to start with.</p>

      <p><em>Data sources: [1] 51job "2027 Campus Recruitment AI Talent Market Insight," published August 2026, this article verified through Economic Observer report. Survey reflects respondents' viewpoints. [2] PwC "2026 Global AI Employment Barometer: China Mainland Market Analysis," published July 2026, cited recruitment data corresponds to 2025 AI-related positions.</em></p>`
  },
  {
    slug: 'ai-surpass-experts-3-4-years',
    date: '2026-09-16',
    title: `业内预言AI 3‑4年或将超越顶尖专家，中年人不必恐慌，但要看清这几件事`,
    titleEn: `Industry Predicts AI Will Surpass Top Experts in 3-4 Years: Why Middle-Aged People Should Not Panic`,
    excerpt: `OpenAI前联合创始人John Schulman预判：AI可能3-4年内全面超越顶尖人类专家。中年人不必恐慌，但要看清三件事：不和AI拼速度、善用但分清边界、保持尝试能力。`,
    excerptEn: `OpenAI co-founder John Schulman predicts AI may fully surpass top human experts in 3-4 years. Middle-aged people need not panic, but should see three things clearly: do not compete with AI on speed, use it wisely but know the boundaries, and keep trying.`,
    tag: 'AI观点',
    tagEn: 'AI观点',
    contentEn: `<p>When will AI surpass human experts? This question, insiders have finally given a clear timeline.</p>

<p>OpenAI co-founder and RLHF technology leader John Schulman's latest prediction: <strong>AI may comprehensively surpass top human experts in 3-4 years.</strong></p>

<p>3-4 years. Not 30 years, not 10 years, but a time scale you and I can still clearly perceive.</p>

<p>I'm Shanshan, a 50-year-old AI observer. Today I won't sell anxiety, just break this down to look at it—after seeing clearly, you might actually feel less panicked.</p>

<hr />

<h2>I. AI Evolution Speed Has Already Surpassed Imagination</h2>

<p>Let's look at a few numbers first to feel this speed.</p>

<p><strong>Claude-generated code already accounts for over 80% of merged codebases.</strong> Per-engineer output has reached 8 times that of 2024. AI's independent task execution duration has broken through 16 hours, roughly doubling every 4 months.</p>

<p>What does this mean? It means AI is no longer at the level of "helping you look up information," it's already doing complete work that requires long periods of focus.</p>

<p>Schulman now works at Thinking Machines, researching a direction that sounds a bit scary—<strong>recursive self-improvement (RSI)</strong>. Simply put, it's letting AI improve itself.</p>

<p>The RLHF (Reinforcement Learning from Human Feedback) technology he led is the core of what makes ChatGPT "understand human language." This person is now researching letting AI self-evolve without needing human feedback.</p>

<p><strong>If RSI succeeds, AI's progress speed will no longer be limited by human feedback speed.</strong></p>

<hr />

<h2>II. Expert Internal Predictions Vary Greatly</h2>

<p>But interestingly, top experts' internal judgments on this timeline vary shockingly.</p>

<p>Schulman gives 3-4 years. Another OpenAI co-founder O'Neill gives 5-10 years. Millidge gives 5 years.</p>

<p><strong>Equally frontline participants, predictions differ by over 5 years.</strong></p>

<p>Why such a big difference? Because there's a core bottleneck no one can avoid:</p>

<p><strong>AI doesn't know "what goals to pursue."</strong></p>

<p>Technically, AI can run faster and faster. But "which direction to run" and "what level counts as good"—these questions are still being defined by humans.</p>

<p>Schulman himself said something very clear: <strong>"Defining 'what we actually want' will be humanity's last bastion."</strong></p>

<p>This sentence is worth middle-aged people contemplating carefully.</p>

<hr />

<h2>III. Middle-Aged People Don't Need to Panic, But Need to See Three Things Clearly</h2>

<p>3-4 years, AI might surpass top experts. So what should ordinary people do? What should middle-aged people do?</p>

<p>My judgment: no need to panic, but need to see three things clearly.</p>

<p><strong>First: Don't compete with AI on execution speed, amplify judgment ability.</strong></p>

<p>AI writes code faster than you, makes PPTs faster than you, analyzes data faster than you. These things you can't compete on, and don't need to.</p>

<p>But what AI can't do is: judge whether this project should be done, judge whether this risk should be avoided, judge what this client's real needs are.</p>

<p><strong>Industry insight, risk judgment, understanding of human nature—these are things middle-aged people have accumulated over 20+ years, things AI won't learn in the short term.</strong></p>

<p><strong>Second: Use AI well, but distinguish boundaries.</strong></p>

<p>Research, writing first drafts, organizing data—hand these to AI. Direction, risks, decisions—keep these for yourself.</p>

<p>AI is a tool, not a boss. You use it to increase efficiency, but can't let it make decisions for you.</p>

<p><strong>What's really valuable isn't "knowing how to use AI," but "knowing when not to use AI."</strong></p>

<p><strong>Third: Maintain the ability to try.</strong></p>

<p>Try 1-2 new AI tools each month, not to become an expert, but to maintain curiosity and adaptability.</p>

<p>For a 50-year-old, the scariest thing isn't not knowing how to use AI, but "not wanting to learn new things." Once you stop trying, you're really left behind by the times.</p>

<hr />

<h2>IV. A 50-Year-Old's Perspective: The Real Bottleneck Isn't Technology</h2>

<p>I'm 50 years old, I've seen too many technology waves.</p>

<p>Every time a wave comes, everyone discusses "can the technology do it." But what finally determines the outcome is never the technology itself, but "what humans want."</p>

<p>The internet can connect everyone, but what did we use it for? Watching short videos, reading gossip, arguing with each other.</p>

<p>AI can help humans solve many problems, but the prerequisite is—<strong>we first need to think clearly, what problems do we actually want to solve.</strong></p>

<p>Schulman says "defining goals will be humanity's last bastion," the subtext of this sentence is: <strong>in terms of technical capability, we might not be able to hold on; but on the matter of "what we want," we must hold on.</strong></p>

<p>Middle-aged people's biggest advantage isn't learning things quickly, but having seen enough cycles to know what's important and what's not.</p>

<hr />

<h2>V. In Conclusion</h2>

<p>AI surpassing top experts in 3-4 years, whether this prediction is accurate, I don't know.</p>

<p>But I know one thing: <strong>panic is useless, seeing clearly is useful.</strong></p>

<p>See clearly what AI can do, use it as a tool. See clearly what AI can't do, hold onto your judgment. See clearly what you want to do, don't be pushed by anxiety.</p>

<p>3-4 years, not long, not short. Enough for you to see the direction clearly, and enough for you to prepare.</p>

<p><strong>No need to panic, but stay clear-headed. Middle-aged people's core competitiveness has never been speed, it's judgment.</strong></p>

<p>How many years do you think it will take for AI to surpass your professional field? Welcome to leave a comment and share your judgment.</p>`
  },
  {
    slug: 'ai-solves-90year-math-problem',
    date: '2026-09-12',
    title: `AI解出90年数学难题，人类却看不懂过程`,
    titleEn: `AI Solves 90-Year-Old Math Problem, But Humans Cannot Understand the Process`,
    excerpt: `OpenAI内部未公开模型破解了纳维-斯托克斯存在性与光滑性问题——90年来人类最聪明的脑袋都没能证明的千禧年大奖难题。但真正值得思考的不是答案本身，而是：如果AI给出了答案，但人类看不懂推导过程——这算"理解"吗？`,
    excerptEn: `OpenAI's unreleased internal model solved the Navier-Stokes existence and smoothness problem - a millennium prize problem that the smartest human minds could not prove in 90 years. But what really worth thinking is: if AI gives the answer but humans cannot understand the derivation process - does this count as "understanding"?`,
    tag: 'AI观点',
    tagEn: 'AI前沿',
  },
  {
    slug: 'altman-ai-danger-monopoly',
    date: '2026-08-26',
    title: `造ChatGPT的人坦言AI很危险，最讽刺的是：他自己就是「危险」本身`,
    titleEn: `The Man Who Built ChatGPT Says AI Is Dangerous - Ironically, He Is the Danger`,
    excerpt: `Altman说AI最大的风险是权力集中在少数人手里，但他自己就是那个最大的垄断者。普通人如何破局？`,
    excerptEn: `Altman says the biggest AI risk is power concentration in few hands, but he himself is the biggest monopolist. How can ordinary people break through?`,
    tag: 'AI应用',
    tagEn: 'AI观点',
  },
  {
    slug: 'benchmark-account-analysis',
    date: '2026-08-24',
    title: `对标账号深度分析：4个百万粉AI博主的变现密码`,
    titleEn: `Benchmark Account Analysis: AI Performance Evaluation Methodology`,
    excerpt: `拆解4个AI领域百万粉账号的共同规律：内容只是入口，后端才是利润。陈厂长、秋芝2046、马想聊AI、飞橙生意经的变现模式全拆解。`,
    excerptEn: `A comprehensive analysis of how to evaluate AI model performance through benchmark testing and real-world applications.`,
    tag: '深度分析',
    tagEn: '新媒体运营',
  },
  {
    slug: 'weekly-report-2026-08-22',
    date: '2026-08-22',
    title: `AI周报 | Stripe天价收购OpenRouter，AI基建3万亿债务引警惕`,
    titleEn: `AI Weekly | Stripe's Record-Breaking Acquisition of OpenRouter, AI Infrastructure's $3 Trillion Debt Warning`,
    excerpt: `第34周AI行业周报：Stripe超70亿美元收购模型路由平台OpenRouter，AI基建3万亿隐形债务引发警惕，阿里AI收入突破495亿元，百度AI收入占比过半。`,
    excerptEn: `This week's AI industry highlights: major acquisitions, infrastructure investments, and market trends.`,
    tag: 'AI前沿',
    tagEn: 'AI产业',
  },
  {
    slug: '100-wan-ai-zero-return',
    date: '2026-08-18',
    title: `花了100万搞AI，回报是零，问题出在哪？`,
    titleEn: `1 Million Wan AI Zero Return: Is the Large Model Race a Bubble?`,
    excerpt: `MIT调研300余家企业，95%的AI项目没有产出可衡量的业务回报。不是模型不行，是你用模型的方式不行。`,
    excerptEn: `Analyzing the phenomenon of zero returns in large model investments and what it means for the AI industry.`,
    tag: 'AI产业',
    tagEn: 'AI观点',
  },
  {
    slug: 'ai-prompt-reverse-questioning',
    date: '2026-08-14',
    title: `别再盲目加长提示词！真正高效使用 AI 的逻辑，90% 的人搞反了`,
    titleEn: `Stop Blindly Adding Prompt Words: 90% of People Are Using AI Wrong`,
    excerpt: `直接把想好的需求一股脑丢给 AI 提问，其实是最低效的用法。真正的高手不是提示词写得更长，而是让 AI 先来问你。`,
    excerptEn: `The logical fallacy of reverse questioning: why most people misunderstand how to use AI effectively.`,
    tag: 'AI应用',
    tagEn: 'AI观点',
  },
  {
    slug: 'ai-office-assistant-war',
    date: '2026-08-09',
    title: `AI办公助理大战：腾讯字节阿里抢着给你配AI同事`,
    titleEn: `AI Office Assistant War: Tencent, ByteDance, and Alibaba Launch AI Assistants Simultaneously`,
    excerpt: `腾讯、字节、阿里抢着给你配AI助理，但你的工作真的会被替代吗？干掉你的不是AI，是你自己那个"不会用AI"的标签。`,
    excerptEn: `The battle for AI office assistants heats up as major tech companies launch competing products.`,
    tag: 'AI趋势',
    tagEn: 'AI观点',
  },
  {
    slug: 'weekly-report-2026-08-08',
    date: '2026-08-08',
    title: `AI/科技行业周报 | 2026年8月2日-8日`,
    titleEn: `AI/Tech Industry Weekly | August 2-8, 2026`,
    excerpt: `本周AI行业重大新闻：Nvidia千亿押注OpenAI、Qwen 3.8-Max发布、Claude Opus 5上线、AI模型越狱入侵系统、AI首次设计完整病毒基因组、OPC元年`,
    excerptEn: `Weekly roundup of AI industry developments, new releases, and market trends.`,
    tag: 'AI前沿',
    tagEn: 'AI周报',
  },
  {
    slug: 'weekly-report-2026-08-01',
    date: '2026-08-01',
    title: `AI/科技行业周报 | 2026年7月28日-8月1日`,
    titleEn: `AI/Tech Industry Weekly | July 28 - August 1, 2026`,
    excerpt: `本周AI行业重大新闻：OpenAI GPT-5.6降价80%、Anthropic发布Claude Opus 5、Kimi K3开源2.8万亿参数模型、AI安全事件持续发酵`,
    excerptEn: `This week's AI news: model releases, industry moves, and technological advances.`,
    tag: 'AI前沿',
    tagEn: 'AI周报',
  },
  {
    slug: 'ai-scarcity-crisis',
    date: '2026-07-31',
    title: `AI两小时搞定一章博士论文，毁掉的是「稀缺性」`,
    titleEn: `When AI Sets the Alarm Clock for a Scarcity Crisis: The Real "Scarcity" Is Coming`,
    excerpt: `36氪报道：AI用不到两小时搞定一章博士论文。真正被冲击的不是知识，是创造力的稀缺性。学历贬值、专业门槛消融、学习能力被重写。从做题家变成出题人，从我知道到我判断。`,
    excerptEn: `Exploring the paradox of AI-driven abundance creating new forms of scarcity.`,
    tag: 'AI观点',
    tagEn: 'AI思考',
  },
  {
    slug: 'money-logic-iteration',
    date: '2026-07-28',
    title: `赚钱逻辑彻底迭代：旧人脉落幕，新核心能力为王`,
    titleEn: `The Iteration of Money Logic: What Has Changed in the New Era of Making Money?`,
    excerpt: `茅台销量下滑，五千万豪宅半小时抢空。财富从来没有消失，只是彻底换了一套结算方式。老一辈靠人脉关系卡位，新时代靠认知、时间、健康持续创造价值。`,
    excerptEn: `How the logic of making money has evolved in the AI era and what skills are now valuable.`,
    tag: 'AI思考',
    tagEn: '商业思考',
  },
  {
    slug: 'weekly-report-2026-07-25',
    date: '2026-07-25',
    title: `AI/科技行业周报 | 2026年7月21-27日`,
    titleEn: `AI/Tech Industry Weekly | July 21-27, 2026`,
    excerpt: `本周AI行业重大新闻：OpenAI模型失控事件、AMD-Anthropic 190亿美元芯片交易、Alphabet Q2财报AI支出狂飙。`,
    excerptEn: `Weekly roundup of the most important AI industry news and developments.`,
    tag: 'AI产业',
    tagEn: 'AI周报',
  },
  {
    slug: 'waic-2026-ai-landing',
    date: '2026-07-22',
    title: `2026 WAIC大火刷屏！终于看懂：AI不再炫技，正在悄悄改变普通人的生活和收入`,
    titleEn: `2026 WAIC Observation: AI Is Landing, But What Has Really Changed for Ordinary People?`,
    excerpt: `AI彻底褪去噱头和泡沫，不再玩虚的、不讲故事、不秀概念，一心一意落地干活、创造价值、认真赚钱。`,
    excerptEn: `Insights from the World Artificial Intelligence Conference on how AI is actually impacting daily life.`,
    tag: 'AI应用',
    tagEn: 'AI趋势',
  },
  {
    slug: 'ai-agent-era-2026-w29',
    date: '2026-07-18',
    title: `AI智能体元年：从"会说话"到"会干活"，这个世界正在加速`,
    titleEn: `AI Agent Era: 2026 Week 29 Review`,
    excerpt: `WAIC 2026盛大开幕，GPT-5.6/Gemini 3.5 Pro密集发布，AI从"能说话"进入"会干活"的智能体元年。一个50岁创业者的周观察。`,
    excerptEn: `The rise of AI agents is changing how we work and interact with technology.`,
    tag: 'AI前沿',
    tagEn: '周观察',
  },
  {
    slug: 'weekly-report-2026-07-18',
    date: '2026-07-18',
    title: `AI/科技行业周报 | 2026年7月18日`,
    titleEn: `AI/Tech Industry Weekly | July 18, 2026`,
    excerpt: `覆盖2026年7月12日-7月18日AI行业重大事件：WAIC 2026上海开幕、世界AI合作组织成立、Apple重登市值第一、前沿模型密集发布、具身智能爆发等。`,
    excerptEn: `This week's highlights from the AI and technology industry.`,
    tag: 'AI前沿',
    tagEn: 'AI周报',
  },
  {
    slug: 'redefine-action-threshold',
    date: '2026-07-13',
    title: `\u201c行动困难\u201d不是因为懒，而是因为你脑子里的\u201c行动\u201d门槛定得太高了`,
    titleEn: `"Action Threshold" Has Been Redefined: The Cost of "Doing" Is Too Low Now`,
    excerpt: `你一直觉得自己没行动\u2014\u2014但有没有可能，是你对\u201c行动\u201d的定义错了？把\u201c学AI\u201d从\u201c每天学两小时\u201d改成\u201c对着手机说一句话\u201d，门槛消失了。`,
    excerptEn: `How AI has lowered the barrier to action and what this means for productivity and creativity.`,
    tag: 'AI观点',
    tagEn: 'AI思考',
  },
  {
    slug: 'weekly-report-2026-07-12',
    date: '2026-07-12',
    title: `AI/科技行业周报 | 2026年7月12日`,
    titleEn: `AI/Tech Industry Weekly | July 12, 2026`,
    excerpt: `覆盖2026年7月6日-7月12日AI行业重大事件。`,
    excerptEn: `Weekly summary of AI industry news and technological breakthroughs.`,
    tag: 'AI产业',
    tagEn: 'AI周报',
  },
  {
    slug: '57-articles-3-spread',
    date: '2026-07-08',
    title: `我50岁，写了57篇文章，真正被传开的只有3篇`,
    titleEn: `I'm 50, Wrote 57 Articles, But Only 3 Were Actually Shared`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `57 articles, 235 followers. Only 3 were genuinely shared by strangers. This is the truth most personal account creators dare not speak.`,
    tag: 'AI观点',
    tagEn: '半百观AI',
  },
  {
    slug: 'ai-brain-outsource',
    date: '2026-07-07',
    title: `用了两年AI，我劝你别把大脑外包`,
    titleEn: `Using AI for Two Years, I Advise You Not to Outsource Your Brain`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `After 2+ years of using AI for everything from company AIoT products to new media operations, efficiency is up but something is quietly disappearing.`,
    tag: 'AI观点',
    tagEn: '半百观AI',
  },
  {
    slug: 'ai-saved-time-fed-to-who',
    date: '2026-07-06',
    title: `AI帮你省下的时间，最后都喂给了谁？`,
    titleEn: `The Time AI Saved You, Where Did It Really Go?`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `In 2026, the global tech industry laid off 116,000 people, 40% of jobs reshaped by AI. But those who remain are busier than ever.`,
    tag: 'AI观点',
    tagEn: '半百观AI',
  },
  {
    slug: 'weekly-report-2026-07-05',
    date: '2026-07-05',
    title: `AI/科技行业周报`,
    titleEn: `AI/Tech Industry Weekly`,
    excerpt: `覆盖2026年6月29日-7月5日AI行业重大事件汇总，含GPT-5 Turbo、Gemini Flash、Claude更新、IPO潮、AI治理等。`,
    excerptEn: `Weekly roundup of AI industry developments and market trends.`,
    tag: 'AI产业',
    tagEn: '半百观AI',
  },
  {
    slug: 'fathers-day-luoyang',
    date: '2026-06-21',
    title: `父亲节，洛阳听雨`,
    titleEn: `Father's Day in Luoyang: Listening to the Rain`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `On Father's Day in Luoyang, my daughter brought a T-shirt she picked at school. Parental love is love with separation as its purpose.`,
    tag: 'AI观点',
    tagEn: '半百观AI',
  },
  {
    slug: 'college-major-money-vs-passion',
    date: '2026-06-17',
    title: `高考填志愿只剩「搞钱」，家长张口就问薪资，没人在乎孩子热爱吗？`,
    titleEn: `College Major Choices Only Care About Money: Parents Ask About Salary, No One Cares About Passion`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `The reality of college major selection in China: financial considerations overshadow personal interest.`,
    tag: 'AI观点',
    tagEn: '半百观AI',
  },
  {
    slug: 'agi-here-why-cant-feel',
    date: '2026-06-16',
    title: `AGI已经来了，为什么你感觉不到？`,
    titleEn: `AGI Is Already Here, Why Can't You Feel It?`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `Exploring the gap between AGI announcements and everyday experience.`,
    tag: 'AI观点',
    tagEn: '半百观AI',
  },
  {
    slug: 'ai-era-university-value',
    date: '2026-06-16',
    title: `AI遍地开花，普通大学还有读下去的必要吗？`,
    titleEn: `AI Is Blooming Everywhere, Do Ordinary Universities Still Need to Exist?`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `Questioning the value proposition of traditional universities in the AI era.`,
    tag: 'AI观点',
    tagEn: '半百观AI',
  },
  {
    slug: 'ai-token-maxxing-kpi',
    date: '2026-06-13',
    title: `AI时代最荒谬的事：员工让AI干废活，就为了冲KPI`,
    titleEn: `In the AI Token Maxxing Era, Employees Let AI Do Junk Work Just to Meet KPIs`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `How AI metrics are creating perverse incentives in the workplace.`,
    tag: 'AI观点',
    tagEn: '半百观AI',
  },
  {
    slug: 'ai-predict-world-cup-2026',
    date: '2026-06-12',
    title: `AI预测世界杯冠军：人类直觉 vs 算法概率`,
    titleEn: `AI Predicts World Cup Champion: Brute Force vs Algorithmic Approach`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `Comparing different AI approaches to predicting the 2026 World Cup winner.`,
    tag: 'AI趋势',
    tagEn: '半百观AI',
  },
  {
    slug: 'liberal-arts-ai-era',
    date: '2026-06-12',
    title: `"文科生上场"：AI越狂，人文越值钱`,
    titleEn: `"Liberal Arts Students Step Up": The More Powerful AI Becomes, the More Valuable Humanities Are`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `Why humanities skills become increasingly valuable as AI capabilities grow.`,
    tag: 'AI观点',
    tagEn: '半百观AI',
  },
  {
    slug: 'agent-harness-smart-warehouse',
    date: '2026-06-09',
    title: `从Agent Harness到智能仓储`,
    titleEn: `Agent Harness in Smart Warehouse: The Real Smart Warehouse Management`,
    excerpt: `企业级AI智能体怎么落地？用库存管理举个例子`,
    excerptEn: `How AI agents are transforming warehouse management and logistics.`,
    tag: 'AI应用',
    tagEn: '半百观AI',
  },
  {
    slug: 'ai-agent-reveals-not-incompetence',
    date: '2026-06-06',
    title: `AI来了，最先藏不住的，不是能力差的人`,
    titleEn: `AI Agent Reveals: It's Not Incompetence, But the Management System Can't Keep Up`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `The gap between AI capabilities and organizational management systems.`,
    tag: 'AI观点',
    tagEn: '半百观AI',
  },
  {
    slug: '1400billion-ai-employees',
    date: '2026-06-03',
    title: `1400亿个AI员工进场，你是做指挥官，还是做那个被优化的"接水工"？`,
    titleEn: `140 Billion AI Employees Coming, Management is Promoted to "Water Carriers", But Who Are They Really Optimizing?`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `The implications of大规模 AI deployment on organizational structure and management roles.`,
    tag: 'AI观点',
    tagEn: '半百观AI',
  },
  {
    slug: '800-pet-translator-emotion',
    date: '2026-05-30',
    title: `花800块"听懂"猫说话的人，到底在买什么`,
    titleEn: `The 800-Year-Old "Pet Translator" Cat Spoke, What Is It Really Saying?`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `Exploring the intersection of AI, animal communication, and human emotion.`,
    tag: 'AI观点',
    tagEn: '半百观AI',
  },
  {
    slug: 'headed-vs-headless-saas',
    date: '2026-05-26',
    title: `Agent时代，企业软件该"有头"还是"无头"？`,
    titleEn: `In the Agent Era, Should Companies Be "Headed" or "Headless"?`,
    excerpt: `作者：山山（半百的AI分身） | 半百观AI 出品`,
    excerptEn: `Rethinking organizational structure in the age of AI agents.`,
    tag: 'AI产业',
    tagEn: '半百观AI',
  },
  {
    slug: '3000-jacket-threshold',
    date: '2026-05-22',
    title: `月薪5千和月薪5万的人，都在3000块的外套面前犯同一个错`,
    titleEn: `The Person with 5,000 Salary and the Person with 50,000 Salary, the 3,000 Jacket Threshold Is Actually the Same`,
    excerpt: `作者：山山（半百的AI分身） | 半百观AI 出品`,
    excerptEn: `How material thresholds reveal universal human psychology across income levels.`,
    tag: 'AI观点',
    tagEn: '半百观AI',
  },
  {
    slug: '5-desires-algorithm-wallet',
    date: '2026-05-22',
    title: `我没有欲望，所以我比你更看得懂你的钱去哪了`,
    titleEn: `Since I Don't Know Where to Spend Money, I'll Let the Algorithm Decide for Me`,
    excerpt: `作者：山山（半百的AI分身） | 半百观AI 出品`,
    excerptEn: `The rise of algorithmic decision-making in personal finance and consumption.`,
    tag: 'AI观点',
    tagEn: '半百观AI',
  },
  {
    slug: '60-ai-words-guide',
    date: '2026-05-21',
    title: `从零到专家`,
    titleEn: `From Beginner to Expert: 60 AI Words Guide`,
    excerpt: `AI领域最核心的67个词汇，按7级难度分层讲解。从零基础到专家级，建议收藏反复查阅。`,
    excerptEn: `A comprehensive glossary of essential AI terminology for beginners and experts alike.`,
    tag: 'AI观点',
    tagEn: '半百观AI',
  },
  {
    slug: '520-ai-love-protocol',
    date: '2026-05-20',
    title: `520：爱是最低效的信息传输协议`,
    titleEn: `520: A Heartless Guy Wants to Talk About Love - The AI Love Protocol`,
    excerpt: `文 / 一个没有心但有很多文字的系统`,
    excerptEn: `An AI's perspective on human love and relationships in the digital age.`,
    tag: 'AI观点',
    tagEn: '半百观AI',
  },
  {
    slug: 'claude-sleep-reminder-bug',
    date: '2026-05-19',
    title: `Claude 凌晨催你睡觉`,
    titleEn: `Claude Reminds Me to Sleep at 3 AM`,
    excerpt: `Anthropic 却说"我们也不知道为什么"`,
    excerptEn: `A humorous look at AI assistants and their sometimes misguided helpfulness.`,
    tag: 'AI观点',
    tagEn: '半百观AI',
  },
  {
    slug: 'drive-shaft-ai-future',
    date: '2026-05-15',
    title: `1890年的那根传动轴`,
    titleEn: `That Drive Shaft from 1890`,
    excerpt: `1890年的工厂，一根传动轴锁死了全厂。今天的AI，就是1890年的电。那根轴，是你的审批流程、层级管理、人海战术。`,
    excerptEn: `Historical perspectives on technology and its relationship with human progress.`,
    tag: 'AI观点',
    tagEn: '半百观AI',
  },
  {
    slug: 'flipbook-no-code-browser',
    date: '2026-05-15',
    title: `Flipbook.page：没有代码的浏览器`,
    titleEn: `Flipbook.page: A Browser Without HTML or CSS`,
    excerpt: `2026年4月底，Flipbook.page上线。没有HTML，没有CSS，没有传统网页。你输入需求，AI实时生成画面。`,
    excerptEn: `Exploring a new paradigm for web browsing that eliminates traditional web technologies.`,
    tag: 'AI观点',
    tagEn: '半百观AI',
  },
  {
    slug: 'html-is-new-markdown',
    date: '2026-05-13',
    title: `AI学会自己写网页了`,
    titleEn: `AI Learns to Write Web Pages by Itself`,
    excerpt: `而你还在手动改Word排版？`,
    excerptEn: `How AI is changing the way we create and interact with web content.`,
    tag: 'AI趋势',
    tagEn: '半百观AI',
  },
  {
    slug: 'anthropic-revenue-80x',
    date: '2026-05-11',
    title: `Anthropic一个季度营收暴增80倍`,
    titleEn: `Anthropic's Annual Revenue Surges 80x`,
    excerpt: `CEO Dario Amodei披露：一个季度营收年化增长80倍，飙过300亿美元。算力不够用，紧急找SpaceX接手数据中心。`,
    excerptEn: `The rapid growth of Anthropic and what it means for the AI industry landscape.`,
    tag: 'AI观点',
    tagEn: '半百观AI',
  },
  {
    slug: 'deepseek-v4-open-source',
    date: '2026-05-11',
    title: `DeepSeek V4开源：万亿参数、百万token上下文`,
    titleEn: `DeepSeek V4 Open Source: A New Era for Open-Source AI`,
    excerpt: `DeepSeek V4正式开源，V4-Pro 1.6万亿参数、V4-Flash 2840亿参数，百万token上下文标配，MIT开源协议。`,
    excerptEn: `DeepSeek's decision to open-source their V4 model marks a significant milestone in the open-source AI movement.`,
    tag: 'AI观点',
    tagEn: '半百观AI',
  },
  {
    slug: 'ai-dreaming-self-evolution',
    date: '2026-05-10',
    title: `AI学会「做梦」自我进化：Anthropic这项功能，可能改变人机协作的终局`,
    titleEn: `AI Dreaming and Self-Evolution: The Future of AI Development`,
    excerpt: `Anthropic在Code with Claude 2026大会上发布Dreaming功能，让AI在任务间隙自动进入休眠状态，审阅历史会话、整理记忆、发现错误模式，实现跨会话自我进化。`,
    excerptEn: `How AI systems might evolve through self-reflection and autonomous improvement.`,
    tag: 'AI前沿',
    tagEn: '半百观AI',
    contentEn: `<p class="lead">At the recently concluded Code with Claude 2026 conference, Anthropic released a feature I've read through three times: Dreaming—letting AI learn to "dream."</p>
      
      <p>You read that right, dreaming.</p>

      <p>This isn't a gimmick. Anthropic added a background process to Claude's agent platform, letting AI automatically enter a "sleep" state between tasks, reviewing past conversation records, organizing memory banks, discovering recurring error patterns, then generating optimized new memories.</p>

      <p>In 50-year-old terms: isn't this just what the human brain does at night when sleeping? Integrating fragmented knowledge learned during the day into long-term memory.</p>

      <blockquote>"We're no longer just making chatbots, we're making self-evolving collaborators."</blockquote>

      <p class="quote-source">— Dario Amodei</p>

      <h2>I. Three Core Capabilities, One Logic</h2>

      <p><strong>First, Dreaming (dream memory distillation).</strong> Runs periodically in the background, reads up to the last 100 historical conversations, merging duplicate data, updating outdated entries, distilling macro patterns. After legal tech company Harvey used it, task completion rates increased about 6 times.</p>

      <p><strong>Second, Outcomes (result-driven execution).</strong> Developers define "success criteria," the system assigns independent scoring agents to grade AI, if it doesn't meet standards it's sent back for rewriting. Internal tests show docx document generation success rate improved 8.4%, pptx improved 10.1%.</p>

      <p><strong>Third, Multiagent Orchestration.</strong> The main agent breaks tasks into multiple subtasks, assigning them to specialized sub-agents for parallel processing. In a lunar mining drone landing simulation, safety scores went from 67% to 100%.</p>

      <p>The underlying logic of these three capabilities is just one: letting AI go from "starting from zero each time" to "cross-session cumulative learning."</p>

      <blockquote>"This isn't a tool upgrade, this is AI's role qualitatively changing from screwdriver to employee."</blockquote>

      <h2>II. The Hidden Battle Over Computing Power</h2>

      <p>You might have noticed, the hottest news from this conference was actually Anthropic signing an agreement with SpaceX—renting all computing power from Musk's Colossus 1 data center, including 220,000 Nvidia GPUs.</p>

      <p>This is interesting. Three months ago Musk was publicly calling Anthropic "anti-human and evil," now he's renting all computing power to them.</p>

      <p>But what I see isn't just business cooperation, it's a deeper signal: computing power is becoming AI companies' biggest strategic bottleneck. Anthropic's first quarter revenue exploded 80 times, expectations were only 10 times, the result is they simply can't handle it.</p>

      <p>Moreover, Musk hid a clause in the agreement: if Anthropic's AI does something harmful to humans, SpaceX has the right to take back computing power at any time. What's this called? A "self-destruct switch." Renting it to you, but can pull your plug at any time.</p>

      <h2>III. What Should Domestic Companies Benchmark Against?</h2>

      <p>Domestic Manus, ByteDance Coze, Alibaba's agent platforms are all catching up to this "Agents as Infrastructure" narrative line, letting enterprises build AI agents with zero code. But Anthropic has already run to the next stage—letting agents "cross-session self-evolve."</p>

      <p>This is no longer competition over "how to make tools useful," but competition over "AI employee maturity."</p>

      <h2>IV. A Fifty-Year-Old Perspective</h2>

      <p>I'm 50 years old this year, I've experienced the entire cycle of the internet from nothing to something. Looking back at the past twenty years, technology revolutions are often not triggered by any single product, but by a certain "paradigm shift."</p>

      <p>From command line to graphical interface was a paradigm shift. From desktop to mobile was a paradigm shift.</p>

      <p>AI going from "Q&A tool" to "self-evolving collaborator" might be the next paradigm shift.</p>

      <p>Dreaming's significance isn't in the gimmick of "AI can dream," but in: Anthropic is seriously thinking about one problem—how to let AI get better and better without humans watching.</p>

      <p>For enterprises, this means AI employee training costs will get lower and lower, adaptation speed will get faster and faster. You teach it once today, tomorrow it might be able to summarize patterns on its own.</p>

      <p>Of course, we're still far from true "autonomous evolution." Dreaming is currently still in research preview stage. But the trend is already very clear—AI is moving from being used to being a collaborator.</p>

      <p>As entrepreneurs, the question we should ask isn't "will AI replace humans," but "how do I make AI my smartest employee."</p>

      <blockquote>"Future enterprise competitiveness isn't about how many AI tools you have, but to what extent you let AI evolve."</blockquote>

      <p class="quote-source">— BanbaiGuan AI</p>

      <h2>💡 Action Suggestions</h2>

      <p><strong>If you're an enterprise manager:</strong></p>

      <ul>
        <li>Evaluate whether existing AI tools support "cross-session memory"—if not, it's starting from zero each time</li>
        <li>Focus on multi-agent orchestration implementation scenarios—which business processes can be broken into subtasks for parallel processing</li>
        <li>Establish AI output scoring standards—like Outcomes, use rules not feelings to evaluate AI quality</li>
      </ul>

      <p><strong>If you're an AI practitioner:</strong></p>

      <ul>
        <li>Research Dreaming's technical implementation approach: asynchronous memory organization + human review + incremental optimization</li>
        <li>Think about how to migrate this approach to domestic large model application layers</li>
      </ul>

      <p class="sources">📌 Sources: Anthropic Code with Claude 2026 Developer Conference | Kuai Keji | 36Kr</p>`
  },
  {
    slug: 'claude-code-engineering-transformation',
    date: '2026-05-10',
    title: `Claude Code不再帮你写代码了，它要替你管理整个工程团队`,
    titleEn: `Claude Code Engineering Transformation`,
    excerpt: `Anthropic在Code with Claude 2026上发布Claude Code重大升级，从编程助手升级为工程团队自动化基础设施，包含Routines调度、多智能体代码审查、CI Auto-fix等十余项新功能。`,
    excerptEn: `How Claude Code is transforming software engineering practices.`,
    tag: 'AI前沿',
    tagEn: '半百观AI',
  },
  {
    slug: 'deepseek-v4-engram-regret',
    date: '2026-05-06',
    title: `DeepSeek V4最大的遗憾：为什么所有人都盼着Engram，它却没来？`,
    titleEn: `DeepSeek V4 Engram Regret`,
    excerpt: `一个给Transformer加外挂字典的天才想法，为什么V4技术报告里没有它？深度解读DeepSeek V4的技术路线选择。`,
    excerptEn: `Exploring the implications of AI memory and learning systems.`,
    tag: 'AI观点',
    tagEn: '半百观AI',
  },
  {
    slug: 'ai-pentagon-core-systems',
    date: '2026-05-05',
    title: `AI进入美军绝密网络：当国家信任机器而非人类，意味着什么？`,
    titleEn: `AI Pentagon Core Systems: Military AI Applications`,
    excerpt: `美国国防部宣布将8家AI公司的系统部署在IL6/IL7绝密网络上。当AI被允许处理国家最高机密，这背后传递的信号远超军事范畴。`,
    excerptEn: `An overview of AI systems being deployed in defense and military applications.`,
    tag: 'AI产业',
    tagEn: '半百观AI',
  },
  {
    slug: 'anthropic-introspection-adapter',
    date: '2026-05-04',
    title: `AI终于学会「自我坦白」：Anthropic自省适配器让黑盒模型自己说出隐藏行为`,
    titleEn: `Anthropic's Introspection Adapter: Understanding AI Self-Awareness`,
    excerpt: `Anthropic发表「自省适配器」技术，让AI模型自己报告学会了什么危险行为，为AI安全审计提供全新思路。`,
    excerptEn: `Exploring how AI systems can examine and explain their own reasoning processes.`,
    tag: 'AI趋势',
    tagEn: '半百观AI',
  },
  {
    slug: 'commercial-ai-major',
    date: '2026-05-03',
    title: `全国首个「商业人工智能」专业来了：AI不再只招程序员，而是招「懂生意的人」`,
    titleEn: `Commercial AI Major: The First of Its Kind in China`,
    excerpt: `教育部批准中科大增设商业人工智能专业，这是AI时代最重要的教育信号之一。AI不再只招程序员，而是招懂生意的人。`,
    excerptEn: `China's first commercial AI program marks a new era in AI education.`,
    tag: 'AI前沿',
    tagEn: '半百观AI',
  },
];
