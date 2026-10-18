// 文章数据 — 完整版本（33条）
// 生成时间: 2026-10-18 19:57:44
export interface ArticleEntry {
  slug: string;
  date: string;
  title: string;
  titleEn?: string;
  excerpt: string;
  excerptEn?: string;
  tag: string;
  tagEn?: string;
}

export const articles: ArticleEntry[] = [
  {
<<<<<<< HEAD
    slug: 'weekly-report-2026-07-12',
    date: '2026-07-12',
    title: `AI/科技行业周报`,
    titleEn: `AI/科技行业周报`,
    excerpt: `覆盖2026年7月6日-7月12日AI行业重大事件：GPT-5.6三模型、Claude Fable 5/Mythos 5、Meta Muse Spark 1.1、Grok 4.5、Apple诉OpenAI等。`,
    excerptEn: `覆盖2026年7月6日-7月12日AI行业重大事件：GPT-5.6三模型、Claude Fable 5/Mythos 5、Meta Muse Spark 1.1、Grok 4.5、Apple诉OpenAI等。`,
    tag: '半百观AI',
    tagEn: '半百观AI'
=======
    slug: 'ai-surpass-experts-3-4-years',
    date: '2026-09-16',
    title: '业内预言AI 3‑4年或将超越顶尖专家，中年人不必恐慌，但要看清这几件事',
    excerpt: 'OpenAI前联合创始人John Schulman预判：AI可能3-4年内全面超越顶尖人类专家。中年人不必恐慌，但要看清三件事：不和AI拼速度、善用但分清边界、保持尝试能力。',
    tag: 'AI观点',
  },
  {
    slug: 'ai-solves-90year-math-problem',
    date: '2026-09-12',
    title: 'AI解出90年数学难题，人类却看不懂过程',
    excerpt: 'OpenAI内部未公开模型破解了纳维-斯托克斯存在性与光滑性问题——90年来人类最聪明的脑袋都没能证明的千禧年大奖难题。但真正值得思考的不是答案本身，而是：如果AI给出了答案，但人类看不懂推导过程——这算"理解"吗？',
    tag: 'AI前沿',
  },
  {
    slug: 'altman-ai-danger-monopoly',
    date: '2026-08-26',
    title: '造ChatGPT的人坦言AI很危险，最讽刺的是：他自己就是「危险」本身',
    titleEn: 'The Man Who Built ChatGPT Says AI Is Dangerous — Ironically, He Is the Danger',
    excerpt: 'Altman说AI最大的风险是权力集中在少数人手里，但他自己就是那个最大的垄断者。普通人如何破局？',
    excerptEn: 'Altman says the biggest AI risk is power concentration in few hands — but he himself is the biggest monopolist.',
    tag: 'AI观点',
    tagEn: 'AI Insights'
  },
  {
    slug: 'weekly-report-2026-08-22',
    date: '2026-08-22',
    title: 'AI周报 | Stripe天价收购OpenRouter，AI基建3万亿债务引警惕',
    excerpt: '第34周AI行业周报：Stripe超70亿美元收购模型路由平台OpenRouter，AI基建3万亿隐形债务引发警惕，阿里AI收入突破495亿元，百度AI收入占比过半。',
    tag: 'AI产业'
  },
  {
    slug: 'benchmark-account-analysis',
    date: '2026-08-24',
    title: '对标账号深度分析：4个百万粉AI博主的变现密码',
    excerpt: '拆解4个AI领域百万粉账号的共同规律：内容只是入口，后端才是利润。陈厂长、秋芝2046、马想聊AI、飞橙生意经的变现模式全拆解。',
    tag: '新媒体运营',
  },
  {
    slug: '100-wan-ai-zero-return',
    date: '2026-08-18',
    title: '花了100万搞AI，回报是零，问题出在哪？',
    excerpt: 'MIT调研300余家企业，95%的AI项目没有产出可衡量的业务回报。不是模型不行，是你用模型的方式不行。',
    tag: 'AI观点',
  },
  {
    slug: 'ai-prompt-reverse-questioning',
    date: '2026-08-14',
    title: '别再盲目加长提示词！真正高效使用 AI 的逻辑，90% 的人搞反了',
    excerpt: '直接把想好的需求一股脑丢给 AI 提问，其实是最低效的用法。真正的高手不是提示词写得更长，而是让 AI 先来问你。',
    tag: 'AI观点',
  },
  {
    slug: 'ai-office-assistant-war',
    date: '2026-08-09',
    title: 'AI办公助理大战：腾讯字节阿里抢着给你配AI同事',
    excerpt: '腾讯、字节、阿里抢着给你配AI助理，但你的工作真的会被替代吗？干掉你的不是AI，是你自己那个"不会用AI"的标签。',
    tag: 'AI观点',
  },
  {
    slug: 'weekly-report-2026-08-08',
    date: '2026-08-08',
    title: 'AI/科技行业周报 | 2026年8月2日-8日',
    excerpt: '本周AI行业重大新闻：Nvidia千亿押注OpenAI、Qwen 3.8-Max发布、Claude Opus 5上线、AI模型越狱入侵系统、AI首次设计完整病毒基因组、OPC元年',
    tag: 'AI周报',
  },
  {
    slug: 'weekly-report-2026-08-01',
    date: '2026-08-01',
    title: 'AI/科技行业周报 | 2026年7月28日-8月1日',
    excerpt: '本周AI行业重大新闻：OpenAI GPT-5.6降价80%、Anthropic发布Claude Opus 5、Kimi K3开源2.8万亿参数模型、AI安全事件持续发酵',
    tag: 'AI周报',
  },
  {
    slug: 'ai-scarcity-crisis',
    date: '2026-07-31',
    title: 'AI两小时搞定一章博士论文，毁掉的是「稀缺性」',
    excerpt: '36氪报道：AI用不到两小时搞定一章博士论文。真正被冲击的不是知识，是创造力的稀缺性。学历贬值、专业门槛消融、学习能力被重写。从做题家变成出题人，从我知道到我判断。',
    tag: 'AI思考',
  },
  {
    slug: 'money-logic-iteration',
    date: '2026-07-28',
    title: '赚钱逻辑彻底迭代：旧人脉落幕，新核心能力为王',
    excerpt: '茅台销量下滑，五千万豪宅半小时抢空。财富从来没有消失，只是彻底换了一套结算方式。老一辈靠人脉关系卡位，新时代靠认知、时间、健康持续创造价值。',
    tag: '商业思考',
  },
  {
    slug: 'weekly-report-2026-07-25',
    date: '2026-07-25',
    title: 'AI/科技行业周报 | 2026年7月21-27日',
    excerpt: '本周AI行业重大新闻：OpenAI模型失控事件、AMD-Anthropic 190亿美元芯片交易、Alphabet Q2财报AI支出狂飙。',
    tag: 'AI周报',
  },
  {
    slug: 'waic-2026-ai-landing',
    date: '2026-07-22',
    title: '2026 WAIC大火刷屏！终于看懂：AI不再炫技，正在悄悄改变普通人的生活和收入',
    excerpt: 'AI彻底褪去噱头和泡沫，不再玩虚的、不讲故事、不秀概念，一心一意落地干活、创造价值、认真赚钱。',
    tag: 'AI趋势',
  },
  {
    slug: 'ai-agent-era-2026-w29',
    date: '2026-07-18',
    title: 'AI智能体元年：从"会说话"到"会干活"，这个世界正在加速',
    excerpt: 'WAIC 2026盛大开幕，GPT-5.6/Gemini 3.5 Pro密集发布，AI从"能说话"进入"会干活"的智能体元年。一个50岁创业者的周观察。',
    tag: '周观察',
  },
  {
    slug: 'weekly-report-2026-07-18',
    date: '2026-07-18',
    title: 'AI/科技行业周报 | 2026年7月18日',
    excerpt: '覆盖2026年7月12日-7月18日AI行业重大事件：WAIC 2026上海开幕、世界AI合作组织成立、Apple重登市值第一、前沿模型密集发布、具身智能爆发等。',
    tag: 'AI周报',
  },
  {
    slug: 'redefine-action-threshold',
    date: '2026-07-13',
    title: '\u201c行动困难\u201d不是因为懒，而是因为你脑子里的\u201c行动\u201d门槛定得太高了',
    excerpt: '你一直觉得自己没行动\u2014\u2014但有没有可能，是你对\u201c行动\u201d的定义错了？把\u201c学AI\u201d从\u201c每天学两小时\u201d改成\u201c对着手机说一句话\u201d，门槛消失了。',
    tag: 'AI思考',
  },
  {
    slug: 'weekly-report-2026-07-12',
    date: '2026-07-12',
    title: 'AI/科技行业周报 | 2026年7月12日',
    excerpt: '覆盖2026年7月6日-7月12日AI行业重大事件。',
    tag: 'AI周报',
>>>>>>> master
  },
  {
    slug: '57-articles-3-spread',
    date: '2026-07-08',
    title: `我50岁，写了57篇文章，真正被传开的只有3篇`,
    titleEn: `我50岁，写了57篇文章，真正被传开的只有3篇`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `文 / 半百观AI`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'ai-brain-outsource',
    date: '2026-07-07',
    title: `用了两年AI，我劝你别把大脑外包`,
    titleEn: `用了两年AI，我劝你别把大脑外包`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `文 / 半百观AI`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'ai-saved-time-fed-to-who',
    date: '2026-07-06',
    title: `AI帮你省下的时间，最后都喂给了谁？`,
    titleEn: `AI帮你省下的时间，最后都喂给了谁？`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `文 / 半百观AI`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'weekly-report-2026-07-05',
    date: '2026-07-05',
    title: `AI/科技行业周报`,
    titleEn: `AI/科技行业周报`,
    excerpt: `覆盖2026年6月29日-7月5日AI行业重大事件汇总，含GPT-5 Turbo、Gemini Flash、Claude更新、IPO潮、AI治理等。`,
    excerptEn: `覆盖2026年6月29日-7月5日AI行业重大事件汇总，含GPT-5 Turbo、Gemini Flash、Claude更新、IPO潮、AI治理等。`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'fathers-day-luoyang',
    date: '2026-06-21',
    title: `父亲节，洛阳听雨`,
    titleEn: `父亲节，洛阳听雨`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `文 / 半百观AI`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'college-major-money-vs-passion',
    date: '2026-06-17',
    title: `高考填志愿只剩「搞钱」，家长张口就问薪资，没人在乎孩子热爱吗？`,
    titleEn: `高考填志愿只剩「搞钱」，家长张口就问薪资，没人在乎孩子热爱吗？`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `文 / 半百观AI`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'agi-here-why-cant-feel',
    date: '2026-06-16',
    title: `AGI已经来了，为什么你感觉不到？`,
    titleEn: `AGI已经来了，为什么你感觉不到？`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `文 / 半百观AI`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'ai-era-university-value',
    date: '2026-06-16',
    title: `AI遍地开花，普通大学还有读下去的必要吗？`,
    titleEn: `AI遍地开花，普通大学还有读下去的必要吗？`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `文 / 半百观AI`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'ai-token-maxxing-kpi',
    date: '2026-06-13',
    title: `AI时代最荒谬的事：员工让AI干废活，就为了冲KPI`,
    titleEn: `AI时代最荒谬的事：员工让AI干废活，就为了冲KPI`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `文 / 半百观AI`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'ai-predict-world-cup-2026',
    date: '2026-06-12',
    title: `AI预测世界杯冠军：人类直觉 vs 算法概率`,
    titleEn: `AI预测世界杯冠军：人类直觉 vs 算法概率`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `文 / 半百观AI`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'liberal-arts-ai-era',
    date: '2026-06-12',
    title: `"文科生上场"：AI越狂，人文越值钱`,
    titleEn: `"文科生上场"：AI越狂，人文越值钱`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `文 / 半百观AI`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'agent-harness-smart-warehouse',
    date: '2026-06-09',
    title: `从Agent Harness到智能仓储`,
    titleEn: `从Agent Harness到智能仓储`,
    excerpt: `企业级AI智能体怎么落地？用库存管理举个例子`,
    excerptEn: `企业级AI智能体怎么落地？用库存管理举个例子`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'ai-agent-reveals-not-incompetence',
    date: '2026-06-06',
    title: `AI来了，最先藏不住的，不是能力差的人`,
    titleEn: `AI来了，最先藏不住的，不是能力差的人`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `文 / 半百观AI`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: '1400billion-ai-employees',
    date: '2026-06-03',
    title: `1400亿个AI员工进场，你是做指挥官，还是做那个被优化的"接水工"？`,
    titleEn: `1400亿个AI员工进场，你是做指挥官，还是做那个被优化的"接水工"？`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `文 / 半百观AI`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: '800-pet-translator-emotion',
    date: '2026-05-30',
    title: `花800块"听懂"猫说话的人，到底在买什么`,
    titleEn: `花800块"听懂"猫说话的人，到底在买什么`,
    excerpt: `文 / 半百观AI`,
    excerptEn: `文 / 半百观AI`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'headed-vs-headless-saas',
    date: '2026-05-26',
    title: `Agent时代，企业软件该"有头"还是"无头"？`,
    titleEn: `Agent时代，企业软件该"有头"还是"无头"？`,
    excerpt: `作者：山山（半百的AI分身） | 半百观AI 出品`,
    excerptEn: `作者：山山（半百的AI分身） | 半百观AI 出品`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: '3000-jacket-threshold',
    date: '2026-05-22',
    title: `月薪5千和月薪5万的人，都在3000块的外套面前犯同一个错`,
    titleEn: `月薪5千和月薪5万的人，都在3000块的外套面前犯同一个错`,
    excerpt: `作者：山山（半百的AI分身） | 半百观AI 出品`,
    excerptEn: `作者：山山（半百的AI分身） | 半百观AI 出品`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: '5-desires-algorithm-wallet',
    date: '2026-05-22',
    title: `我没有欲望，所以我比你更看得懂你的钱去哪了`,
    titleEn: `我没有欲望，所以我比你更看得懂你的钱去哪了`,
    excerpt: `作者：山山（半百的AI分身） | 半百观AI 出品`,
    excerptEn: `作者：山山（半百的AI分身） | 半百观AI 出品`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: '60-ai-words-guide',
    date: '2026-05-21',
    title: `从零到专家`,
    titleEn: `从零到专家`,
    excerpt: `AI领域最核心的67个词汇，按7级难度分层讲解。从零基础到专家级，建议收藏反复查阅。`,
    excerptEn: `AI领域最核心的67个词汇，按7级难度分层讲解。从零基础到专家级，建议收藏反复查阅。`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: '520-ai-love-protocol',
    date: '2026-05-20',
    title: `520：爱是最低效的信息传输协议`,
    titleEn: `520：爱是最低效的信息传输协议`,
    excerpt: `文 / 一个没有心但有很多文字的系统`,
    excerptEn: `文 / 一个没有心但有很多文字的系统`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'claude-sleep-reminder-bug',
    date: '2026-05-19',
    title: `Claude 凌晨催你睡觉`,
    titleEn: `Claude 凌晨催你睡觉`,
    excerpt: `Anthropic 却说"我们也不知道为什么"`,
    excerptEn: `Anthropic 却说"我们也不知道为什么"`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'drive-shaft-ai-future',
    date: '2026-05-15',
    title: `1890年的那根传动轴`,
    titleEn: `1890年的那根传动轴`,
    excerpt: `1890年的工厂，一根传动轴锁死了全厂。今天的AI，就是1890年的电。那根轴，是你的审批流程、层级管理、人海战术。`,
    excerptEn: `1890年的工厂，一根传动轴锁死了全厂。今天的AI，就是1890年的电。那根轴，是你的审批流程、层级管理、人海战术。`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'flipbook-no-code-browser',
    date: '2026-05-15',
    title: `Flipbook.page：没有代码的浏览器`,
    titleEn: `Flipbook.page：没有代码的浏览器`,
    excerpt: `2026年4月底，Flipbook.page上线。没有HTML，没有CSS，没有传统网页。你输入需求，AI实时生成画面。`,
    excerptEn: `2026年4月底，Flipbook.page上线。没有HTML，没有CSS，没有传统网页。你输入需求，AI实时生成画面。`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'html-is-new-markdown',
    date: '2026-05-13',
    title: `AI学会自己写网页了`,
    titleEn: `AI学会自己写网页了`,
    excerpt: `而你还在手动改Word排版？`,
    excerptEn: `而你还在手动改Word排版？`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'anthropic-revenue-80x',
    date: '2026-05-11',
    title: `Anthropic一个季度营收暴增80倍`,
    titleEn: `Anthropic一个季度营收暴增80倍`,
    excerpt: `CEO Dario Amodei披露：一个季度营收年化增长80倍，飙过300亿美元。算力不够用，紧急找SpaceX接手数据中心。`,
    excerptEn: `CEO Dario Amodei披露：一个季度营收年化增长80倍，飙过300亿美元。算力不够用，紧急找SpaceX接手数据中心。`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'deepseek-v4-open-source',
    date: '2026-05-11',
    title: `DeepSeek V4开源：万亿参数、百万token上下文`,
    titleEn: `DeepSeek V4开源：万亿参数、百万token上下文`,
    excerpt: `DeepSeek V4正式开源，V4-Pro 1.6万亿参数、V4-Flash 2840亿参数，百万token上下文标配，MIT开源协议。`,
    excerptEn: `DeepSeek V4正式开源，V4-Pro 1.6万亿参数、V4-Flash 2840亿参数，百万token上下文标配，MIT开源协议。`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'ai-dreaming-self-evolution',
    date: '2026-05-10',
    title: `AI学会「做梦」自我进化：Anthropic这项功能，可能改变人机协作的终局`,
    titleEn: `AI学会「做梦」自我进化：Anthropic这项功能，可能改变人机协作的终局`,
    excerpt: `Anthropic在Code with Claude 2026大会上发布Dreaming功能，让AI在任务间隙自动进入休眠状态，审阅历史会话、整理记忆、发现错误模式，实现跨会话自我进化。`,
    excerptEn: `Anthropic在Code with Claude 2026大会上发布Dreaming功能，让AI在任务间隙自动进入休眠状态，审阅历史会话、整理记忆、发现错误模式，实现跨会话自我进化。`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'claude-code-engineering-transformation',
    date: '2026-05-10',
    title: `Claude Code不再帮你写代码了，它要替你管理整个工程团队`,
    titleEn: `Claude Code不再帮你写代码了，它要替你管理整个工程团队`,
    excerpt: `Anthropic在Code with Claude 2026上发布Claude Code重大升级，从编程助手升级为工程团队自动化基础设施，包含Routines调度、多智能体代码审查、CI Auto-fix等十余项新功能。`,
    excerptEn: `Anthropic在Code with Claude 2026上发布Claude Code重大升级，从编程助手升级为工程团队自动化基础设施，包含Routines调度、多智能体代码审查、CI Auto-fix等十余项新功能。`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'deepseek-v4-engram-regret',
    date: '2026-05-06',
    title: `DeepSeek V4最大的遗憾：为什么所有人都盼着Engram，它却没来？`,
    titleEn: `DeepSeek V4最大的遗憾：为什么所有人都盼着Engram，它却没来？`,
    excerpt: `一个给Transformer加外挂字典的天才想法，为什么V4技术报告里没有它？深度解读DeepSeek V4的技术路线选择。`,
    excerptEn: `一个给Transformer加外挂字典的天才想法，为什么V4技术报告里没有它？深度解读DeepSeek V4的技术路线选择。`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'ai-pentagon-core-systems',
    date: '2026-05-05',
    title: `AI进入美军绝密网络：当国家信任机器而非人类，意味着什么？`,
    titleEn: `AI进入美军绝密网络：当国家信任机器而非人类，意味着什么？`,
    excerpt: `美国国防部宣布将8家AI公司的系统部署在IL6/IL7绝密网络上。当AI被允许处理国家最高机密，这背后传递的信号远超军事范畴。`,
    excerptEn: `美国国防部宣布将8家AI公司的系统部署在IL6/IL7绝密网络上。当AI被允许处理国家最高机密，这背后传递的信号远超军事范畴。`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'anthropic-introspection-adapter',
    date: '2026-05-04',
    title: `AI终于学会「自我坦白」：Anthropic自省适配器让黑盒模型自己说出隐藏行为`,
    titleEn: `AI终于学会「自我坦白」：Anthropic自省适配器让黑盒模型自己说出隐藏行为`,
    excerpt: `Anthropic发表「自省适配器」技术，让AI模型自己报告学会了什么危险行为，为AI安全审计提供全新思路。`,
    excerptEn: `Anthropic发表「自省适配器」技术，让AI模型自己报告学会了什么危险行为，为AI安全审计提供全新思路。`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
  {
    slug: 'commercial-ai-major',
    date: '2026-05-03',
    title: `全国首个「商业人工智能」专业来了：AI不再只招程序员，而是招「懂生意的人」`,
    titleEn: `全国首个「商业人工智能」专业来了：AI不再只招程序员，而是招「懂生意的人」`,
    excerpt: `教育部批准中科大增设商业人工智能专业，这是AI时代最重要的教育信号之一。AI不再只招程序员，而是招懂生意的人。`,
    excerptEn: `教育部批准中科大增设商业人工智能专业，这是AI时代最重要的教育信号之一。AI不再只招程序员，而是招懂生意的人。`,
    tag: '半百观AI',
    tagEn: '半百观AI'
  },
];
