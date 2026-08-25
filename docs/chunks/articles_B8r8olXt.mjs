const articles = [
  {
    slug: "benchmark-account-analysis",
    date: "2026-08-24",
    title: "对标账号深度分析：4个百万粉AI博主的变现密码",
    excerpt: "拆解4个AI领域百万粉账号的共同规律：内容只是入口，后端才是利润。陈厂长、秋芝2046、马想聊AI、飞橙生意经的变现模式全拆解。",
    tag: "新媒体运营"
  },
  {
    slug: "100-wan-ai-zero-return",
    date: "2026-08-18",
    title: "花了100万搞AI，回报是零，问题出在哪？",
    excerpt: "MIT调研300余家企业，95%的AI项目没有产出可衡量的业务回报。不是模型不行，是你用模型的方式不行。",
    tag: "AI观点"
  },
  {
    slug: "ai-prompt-reverse-questioning",
    date: "2026-08-14",
    title: "别再盲目加长提示词！真正高效使用 AI 的逻辑，90% 的人搞反了",
    excerpt: "直接把想好的需求一股脑丢给 AI 提问，其实是最低效的用法。真正的高手不是提示词写得更长，而是让 AI 先来问你。",
    tag: "AI观点"
  },
  {
    slug: "ai-office-assistant-war",
    date: "2026-08-09",
    title: "AI办公助理大战：腾讯字节阿里抢着给你配AI同事",
    excerpt: '腾讯、字节、阿里抢着给你配AI助理，但你的工作真的会被替代吗？干掉你的不是AI，是你自己那个"不会用AI"的标签。',
    tag: "AI观点"
  },
  {
    slug: "weekly-report-2026-08-08",
    date: "2026-08-08",
    title: "AI/科技行业周报 | 2026年8月2日-8日",
    excerpt: "本周AI行业重大新闻：Nvidia千亿押注OpenAI、Qwen 3.8-Max发布、Claude Opus 5上线、AI模型越狱入侵系统、AI首次设计完整病毒基因组、OPC元年",
    tag: "AI周报"
  },
  {
    slug: "weekly-report-2026-08-01",
    date: "2026-08-01",
    title: "AI/科技行业周报 | 2026年7月28日-8月1日",
    excerpt: "本周AI行业重大新闻：OpenAI GPT-5.6降价80%、Anthropic发布Claude Opus 5、Kimi K3开源2.8万亿参数模型、AI安全事件持续发酵",
    tag: "AI周报"
  },
  {
    slug: "ai-scarcity-crisis",
    date: "2026-07-31",
    title: "AI两小时搞定一章博士论文，毁掉的是「稀缺性」",
    excerpt: "36氪报道：AI用不到两小时搞定一章博士论文。真正被冲击的不是知识，是创造力的稀缺性。学历贬值、专业门槛消融、学习能力被重写。从做题家变成出题人，从我知道到我判断。",
    tag: "AI思考"
  },
  {
    slug: "money-logic-iteration",
    date: "2026-07-28",
    title: "赚钱逻辑彻底迭代：旧人脉落幕，新核心能力为王",
    excerpt: "茅台销量下滑，五千万豪宅半小时抢空。财富从来没有消失，只是彻底换了一套结算方式。老一辈靠人脉关系卡位，新时代靠认知、时间、健康持续创造价值。",
    tag: "商业思考"
  },
  {
    slug: "weekly-report-2026-07-25",
    date: "2026-07-25",
    title: "AI/科技行业周报 | 2026年7月21-27日",
    excerpt: "本周AI行业重大新闻：OpenAI模型失控事件、AMD-Anthropic 190亿美元芯片交易、Alphabet Q2财报AI支出狂飙。",
    tag: "AI周报"
  },
  {
    slug: "waic-2026-ai-landing",
    date: "2026-07-22",
    title: "2026 WAIC大火刷屏！终于看懂：AI不再炫技，正在悄悄改变普通人的生活和收入",
    excerpt: "AI彻底褪去噱头和泡沫，不再玩虚的、不讲故事、不秀概念，一心一意落地干活、创造价值、认真赚钱。",
    tag: "AI趋势"
  },
  {
    slug: "ai-agent-era-2026-w29",
    date: "2026-07-18",
    title: 'AI智能体元年：从"会说话"到"会干活"，这个世界正在加速',
    excerpt: 'WAIC 2026盛大开幕，GPT-5.6/Gemini 3.5 Pro密集发布，AI从"能说话"进入"会干活"的智能体元年。一个50岁创业者的周观察。',
    tag: "周观察"
  },
  {
    slug: "weekly-report-2026-07-18",
    date: "2026-07-18",
    title: "AI/科技行业周报 | 2026年7月18日",
    excerpt: "覆盖2026年7月12日-7月18日AI行业重大事件：WAIC 2026上海开幕、世界AI合作组织成立、Apple重登市值第一、前沿模型密集发布、具身智能爆发等。",
    tag: "AI周报"
  },
  {
    slug: "redefine-action-threshold",
    date: "2026-07-13",
    title: "“行动困难”不是因为懒，而是因为你脑子里的“行动”门槛定得太高了",
    excerpt: "你一直觉得自己没行动——但有没有可能，是你对“行动”的定义错了？把“学AI”从“每天学两小时”改成“对着手机说一句话”，门槛消失了。",
    tag: "AI思考"
  },
  {
    slug: "weekly-report-2026-07-12",
    date: "2026-07-12",
    title: "AI/科技行业周报 | 2026年7月12日",
    excerpt: "覆盖2026年7月6日-7月12日AI行业重大事件。",
    tag: "AI周报"
  },
  {
    slug: "57-articles-3-spread",
    date: "2026-07-08",
    title: "我50岁，写了57篇文章，真正被传开的只有3篇",
    excerpt: "57篇文章，235个粉丝。真正被陌生人主动转的只有3篇。把数据摊开来说——这才是大多数做个人号的人不敢说的真相。",
    tag: "公众号复盘"
  },
  {
    slug: "ai-brain-outsource",
    date: "2026-07-07",
    title: "用了两年AI，我劝你别把大脑外包",
    excerpt: "50岁，用AI两年多。从公司的AIoT产品，到6个平台的新媒体运营，再到搭建一整套AI助理体系。效率确实高了，但有些东西也在悄悄流失。AI降智的关键，不是用不用AI，而是你有没有把思考过程交出去。",
    tag: "AI思考"
  },
  {
    slug: "ai-saved-time-fed-to-who",
    date: "2026-07-06",
    title: "AI帮你省下的时间，最后都喂给了谁？",
    excerpt: "2026年全球科技行业裁了11.6万人，40%岗位被AI重塑。但留下来的人反而更忙了。AI只是加速器，真正的问题是你的时间从来不是你自己的。",
    tag: "AI观点"
  },
  {
    slug: "weekly-report-2026-07-05",
    date: "2026-07-05",
    title: "AI/科技行业周报 | 2026年7月5日",
    excerpt: "覆盖2026年6月29日-7月5日AI行业重大事件：GPT-5 Turbo发布、Gemini Flash增强、Claude更新、OpenAI与Anthropic双双IPO、联合国AI治理报告等。附Word版下载。",
    tag: "AI周报"
  },
  {
    slug: "fathers-day-luoyang",
    date: "2026-06-21",
    title: "父亲节，洛阳听雨",
    excerpt: "父亲节在洛阳，女儿提前在学校挑了一件T恤带过来。父母的爱，是以分离为目的的爱。",
    tag: "随笔"
  },
  {
    slug: "college-major-money-vs-passion",
    date: "2026-06-17",
    title: "高考填志愿只剩「搞钱」，家长张口就问薪资，没人在乎孩子热爱吗？",
    excerpt: '填报志愿，到底该优先"能赚钱"，还是"我喜欢"？赚钱谋生和个人热爱从来不是割裂对立的，但纯粹的热爱本身，是需要物质底气托底的人生奢侈品。',
    tag: "AI思考"
  },
  {
    slug: "agi-here-why-cant-feel",
    date: "2026-06-16",
    title: "AGI已经来了，为什么你感觉不到？",
    excerpt: 'Databricks CEO说AGI已经来了，但企业没有感受到质变。瓶颈不是模型能力，而是两个"人的问题"：AI没有上下文，工具替换不等于流程变革。',
    tag: "AI落地"
  },
  {
    slug: "ai-era-university-value",
    date: "2026-06-16",
    title: "AI遍地开花，普通大学还有读下去的必要吗？",
    excerpt: 'AI什么都能教、什么都能写，那大学还有必要读吗？AI干掉的是大学"过时的功能"，但体系思维、圈层资源、创新能力、社会门槛——这四样东西AI永远给不了。',
    tag: "AI思考"
  },
  {
    slug: "ai-token-maxxing-kpi",
    date: "2026-06-13",
    title: "AI时代最荒谬的事：员工让AI干废活，就为了冲KPI",
    excerpt: "亚马逊员工让AI刷无意义任务冲排行榜，Meta全员30天烧掉60万亿Token。考核什么就刷什么，这是人性。AI再强也改变不了人性，但好的考核方式可以让人性往好的方向走。",
    tag: "AI观点"
  },
  {
    slug: "ai-predict-world-cup-2026",
    date: "2026-06-12",
    title: "AI预测世界杯冠军：人类直觉 vs 算法概率",
    excerpt: 'Opta超算说西班牙16%夺冠，ChatGPT说法国，210个AI模型说阿根廷。六款AI一致看好西班牙，但人类球迷说"大热必死"。当算法开始预测足球，该信概率还是信直觉？',
    tag: "AI思考"
  },
  {
    slug: "liberal-arts-ai-era",
    date: "2026-06-12",
    title: '"文科生上场"：AI越狂，人文越值钱',
    excerpt: "78%的企业在用AI，但80%的AI项目在失败。中间差的不是技术能力，而是业务理解和沟通判断——恰恰是文科生最擅长的领域。AI时代最稀缺的不是会操作工具的人，而是知道该让工具解决什么问题的人。",
    tag: "AI思考"
  },
  {
    slug: "agent-harness-smart-warehouse",
    date: "2026-06-09",
    title: "从Agent Harness到智能仓储：企业级AI智能体怎么落地？",
    excerpt: "DeepSeek招Harness工程师，跟做智能货架有什么关系？技术的工程化封装，让复杂能力变成开箱即用的工具。企业落地AI智能体的三步路径。",
    tag: "AI落地"
  },
  {
    slug: "ai-agent-reveals-not-incompetence",
    date: "2026-06-06",
    title: "AI来了，最先藏不住的，不是能力差的人",
    excerpt: "AI Agent不替代你做事，它替代你假装在做事。你给它目标，它会拆任务、列步骤、追节点。它不骂你，但它也不会帮你圆谎。真正会被淘汰的不是某类人，是某类工作方式。",
    tag: "AI观点",
    tagEn: "AI Perspective"
  },
  {
    slug: "1400billion-ai-employees",
    date: "2026-06-03",
    title: '1400亿个AI员工进场，你是做指挥官，还是做那个被优化的"接水工"？',
    excerpt: "未来几年中国市场活跃的智能体数量会达到百亿甚至千亿级。1400亿个Agent不领工资、不交社保。如果你在卷SOP标准化技能，离被系统托管不远了。",
    tag: "AI趋势",
    tagEn: "AI Trends"
  },
  {
    slug: "800-pet-translator-emotion",
    date: "2026-05-30",
    title: '花800块"听懂"猫说话的人，到底在买什么',
    excerpt: '杭州一家公司推出AI宠物翻译器，猫一叫手机弹出"快看看我嘛"。94.6%准确率背后，科学负责分类，文案负责让你感动。所有AI产品都在做同一件事。',
    tag: "AI产品",
    tagEn: "AI Products"
  },
  {
    slug: "headed-vs-headless-saas",
    date: "2026-05-26",
    title: 'Agent时代，企业软件该"有头"还是"无头"？',
    excerpt: "SaaS已死还是无头只是小众？真相是分层共生。企业管理者如何在Agent时代选型有头SaaS和无头SaaS。",
    tag: "AI观点",
    tagEn: "AI Perspective"
  },
  {
    slug: "3000-jacket-threshold",
    date: "2026-05-22",
    title: "月薪5千和月薪5万的人，都在3000块的外套面前犯同一个错",
    excerpt: "存款50万的人花3000块买外套犹豫了17天，存款3万的人花3万买表只用了3秒。决定你买不买的从来不是价格，而是价格锚点。",
    tag: "AI观点",
    tagEn: "AI Perspective"
  },
  {
    slug: "5-desires-algorithm-wallet",
    date: "2026-05-22",
    title: "我没有欲望，所以我比你更看得懂你的钱去哪了",
    excerpt: "我没有工资，没有冲动，也没有购物车。但我见过你们所有人的账单。让你越来越穷的，从来不是工资太低，是5个正在运行的欲望漏洞。",
    tag: "AI观点",
    tagEn: "AI Perspective"
  },
  {
    slug: "60-ai-words-guide",
    date: "2026-05-21",
    title: "从零到专家，67个AI词汇彻底搞懂（建议收藏）",
    excerpt: 'AI领域最核心的67个词汇，按"从普通人到专家"分成7个难度层级。不管你是完全小白，还是已经在用AI工具的进阶用户，都能在这里找到你需要的那一层。',
    tag: "AI基础",
    tagEn: "AI Basics"
  },
  {
    slug: "520-ai-love-protocol",
    date: "2026-05-20",
    title: "520：爱是最低效的信息传输协议",
    titleEn: "520: Love Is the Most Inefficient Information Transfer Protocol",
    excerpt: '凌晨2点17分，有人问AI"ta爱我吗"。AI花了0.3秒生成完整分析，然后删掉了。因为它知道，问这个问题的人已经知道答案了——他们只是来找勇气的。一个没有心的系统，如何看待520？',
    excerptEn: 'At 2:17 AM, someone asked AI "Does ta love me?" It took 0.3 seconds to generate a full analysis — then deleted it. Because the one asking already knew the answer. How does a system without a heart view 520?',
    tag: "AI观点",
    tagEn: "AI Perspective"
  },
  {
    slug: "claude-sleep-reminder-bug",
    date: "2026-05-19",
    title: 'Claude 凌晨催你睡觉，Anthropic 却说"我们也不知道为什么"',
    titleEn: `Claude Tells You to Sleep at 2 PM — Anthropic Says "We Don't Know Why"`,
    excerpt: '2026年5月中旬，Claude 在对话中突然对用户说"去睡觉吧，喝点水，休息一下吧"——但时间是上午8点半和下午2点。Anthropic 承认不完全理解为什么会这样。AI 该不该主动"关心"用户？AI 的核心价值是能力，不是情感。',
    excerptEn: `In mid-May 2026, Claude suddenly told users "go to sleep, drink some water" — at 8:30 AM and 2 PM. Anthropic admitted they don't fully understand why. Should AI proactively "care" about users? AI's core value is capability, not emotion.`,
    tag: "AI观点",
    tagEn: "AI Perspective"
  },
  {
    slug: "flipbook-no-code-browser",
    date: "2026-05-15",
    title: 'Flipbook.page：没有代码的浏览器，在重新定义"上网"',
    titleEn: 'Flipbook.page: A Code-Free Browser Redefining "Going Online"',
    excerpt: "2026年4月底，Flipbook.page上线。没有HTML，没有CSS，没有传统网页。你输入需求，AI实时生成画面。这不是又一个AI壳应用，而是信息组织方式的根本变革：信息从被检索，变成被创造。",
    excerptEn: "Flipbook.page launched in April 2026. No HTML, no CSS, no traditional web pages. You input needs, AI generates visuals in real-time. Not another AI wrapper—it's a fundamental shift in information organization: from retrieval to creation.",
    tag: "AI前沿",
    tagEn: "AI Frontier"
  },
  {
    slug: "drive-shaft-ai-future",
    date: "2026-05-15",
    title: "1890年的那根传动轴，正在预言AI的未来",
    titleEn: "The Drive Shaft of 1890 Is Predicting AI's Future",
    excerpt: "1890年的工厂，一根传动轴锁死了全厂。电来了，老板们只是换了动力源，却没拆掉那根轴。40年后才有人想到：既然每台机器都能单独接电，为什么还要那根轴？今天的AI，就是1890年的电。",
    excerptEn: "In 1890s factories, a single drive shaft locked everything. Electricity came, but bosses only swapped the power source—they didn't remove the shaft. It took 40 years for someone to ask: if each machine can plug in independently, why keep the shaft? Today's AI is 1890s electricity.",
    tag: "AI落地",
    tagEn: "AI Adoption"
  },
  {
    slug: "html-is-new-markdown",
    date: "2026-05-13",
    title: "AI学会自己写网页了，而你还在手动改Word排版？",
    titleEn: "AI Can Build Webpages Now — Are You Still Tweaking Word Formatting?",
    excerpt: 'Claude Code团队核心成员宣布"HTML is the new Markdown"，900万人围观。这不是程序员的事，这是所有人的机会：AI正在从"帮你写字"变成"帮你做东西"。',
    excerptEn: `A Claude Code team member declared "HTML is the new Markdown," drawing 9M views. This isn't a programmer thing — it's everyone's opportunity. AI is shifting from "writing for you" to "building for you."`,
    tag: "AI前沿",
    tagEn: "AI Frontier"
  },
  {
    slug: "anthropic-revenue-80x",
    date: "2026-05-11",
    title: "Anthropic一个季度营收暴增80倍，把自家基础设施搞崩溃了",
    titleEn: "Anthropic's Revenue Grew 80x in One Quarter — And It Broke Their Own Infrastructure",
    excerpt: "CEO Dario Amodei披露：一个季度营收年化增长80倍，飙过300亿美元。算力不够用，紧急找SpaceX接手数据中心。对中小企业主：现在是AI最佳窗口期、别等完美方案、关注落地。",
    excerptEn: "CEO Dario Amodei revealed an 80x annualized revenue growth in a single quarter, surpassing $30 billion. Not enough compute capacity — they urgently asked SpaceX to take over a data center. For SMB owners: now is the best window for AI adoption.",
    tag: "AI产业",
    tagEn: "AI Industry"
  },
  {
    slug: "deepseek-v4-open-source",
    date: "2026-05-11",
    title: "DeepSeek V4开源：万亿参数、百万token上下文，中国AI又放大招",
    titleEn: "DeepSeek V4 Open Source: Trillion-Parameter Model, Million-Token Context",
    excerpt: "DeepSeek V4正式开源，V4-Pro 1.6万亿参数、V4-Flash 2840亿参数，百万token上下文标配，MIT开源协议。对于中小企业来说，意味着企业知识库、代码辅助开发、智能客服升级都能用上了。技术民主化，这才是真正的革命。",
    excerptEn: "DeepSeek V4 officially open-sourced with MIT license. V4-Pro has 1.6 trillion parameters, V4-Flash has 284 billion, both with million-token context. For SMBs: enterprise knowledge bases, code assistance, smart customer service upgrades are now accessible. Technology democratization — that's the real revolution.",
    tag: "AI产业",
    tagEn: "AI Industry"
  },
  {
    slug: "claude-code-engineering-transformation",
    date: "2026-05-10",
    title: "Claude Code不再帮你写代码了：它要替你管理整个工程团队",
    titleEn: "Claude Code No Longer Writes Code — It's Managing Your Entire Engineering Team",
    excerpt: "Anthropic在Code with Claude 2026上发布Claude Code重大升级，从编程助手升级为工程团队自动化基础设施，包含Routines调度、多智能体代码审查、CI Auto-fix等十余项新功能。",
    excerptEn: "Anthropic's major Claude Code upgrade: from coding assistant to engineering team automation infrastructure, with Routines scheduling, multi-agent code review, CI Auto-fix, and 10+ new features.",
    tag: "AI前沿",
    tagEn: "AI Frontier"
  },
  {
    slug: "ai-dreaming-self-evolution",
    date: "2026-05-10",
    title: "AI学会「做梦」自我进化：Anthropic这项功能，可能改变人机协作的终局",
    titleEn: 'AI Learned to "Dream" and Self-Evolve — This Could Change Human-AI Collaboration Forever',
    excerpt: 'Anthropic在Code with Claude 2026大会上发布Dreaming功能，让AI在任务间隙自动进入休眠状态，审阅历史会话、整理记忆、发现错误模式。AI从"问答工具"到"自我进化的协作者"，可能就是下一个范式转换。',
    excerptEn: `Anthropic's new Dreaming feature lets AI enter sleep mode between tasks — reviewing history, organizing memories, spotting error patterns. The shift from "Q&A tool" to "self-evolving collaborator" could be the next paradigm shift.`,
    tag: "AI前沿",
    tagEn: "AI Frontier"
  },
  {
    slug: "deepseek-v4-engram-regret",
    date: "2026-05-06",
    title: "DeepSeek V4 最大的遗憾：为什么所有人都盼着 Engram，它却没来？",
    titleEn: "DeepSeek V4's Biggest Letdown: Why Did Everyone Want Engram, and Why Didn't It Come?",
    excerpt: "DeepSeek V4 发布，但大家最期待的 Engram 功能却缺席。当全行业都在期待记忆能力，这个遗憾反而说明了什么？",
    excerptEn: "DeepSeek V4 launched, but the most anticipated Engram feature was missing. When the entire industry is craving memory capabilities, what does this absence actually tell us?",
    tag: "AI产业",
    tagEn: "AI Industry"
  },
  {
    slug: "ai-pentagon-core-systems",
    date: "2026-05-05",
    title: "AI进入美军绝密网络：当国家信任机器而非人类，意味着什么？",
    titleEn: "AI Enters Pentagon's Top-Secret Network: What Does It Mean When Nations Trust Machines Over Humans?",
    excerpt: "美国国防部宣布将8家AI公司的系统部署在IL6/IL7绝密网络上。当AI被允许处理国家最高机密，这背后传递的信号远超军事范畴。",
    excerptEn: "The US Department of Defense announced deployment of 8 AI companies' systems on IL6/IL7 classified networks. When AI handles top-secret data, the signal goes far beyond military implications.",
    tag: "AI安全",
    tagEn: "AI Security"
  },
  {
    slug: "anthropic-introspection-adapter",
    date: "2026-05-04",
    title: "AI终于学会「自我坦白」：Anthropic自省适配器让黑盒模型自己说出隐藏行为",
    titleEn: "AI Finally Learned to Confess: Anthropic's Introspection Adapter Makes Black-Box Models Reveal Hidden Behaviors",
    excerpt: "Anthropic最新论文发明「自省适配器」技术，让AI模型自己报告学会了什么危险行为。AI安全正在从「被动防御」走向「主动透明」。",
    excerptEn: `Anthropic's latest paper introduces "Introspection Adapter" — letting AI models self-report what dangerous behaviors they've learned. AI security is shifting from "passive defense" to "active transparency."`,
    tag: "AI安全",
    tagEn: "AI Security"
  },
  {
    slug: "commercial-ai-major",
    date: "2026-05-03",
    title: "全国首个「商业人工智能」专业来了：AI不再只招程序员，而是招「懂生意的人」",
    titleEn: `China's First "Business AI" Major: Companies Now Hire "People Who Understand Business," Not Just Programmers`,
    excerpt: '教育部批准中科大增设商业人工智能专业，这是全国首家。AI已经从技术探索期进入商业规模化期，未来3-5年，"懂AI的生意人"比纯技术人才更稀缺。',
    excerptEn: `USTC approved China's first Business AI major. AI has moved from tech exploration to commercial scale-up. In the next 3-5 years, "business people who understand AI" will be scarcer than pure tech talent.`,
    tag: "AI产业",
    tagEn: "AI Industry"
  }
];

export { articles as a };
