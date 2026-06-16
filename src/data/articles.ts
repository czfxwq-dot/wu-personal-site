// 文章数据 — 新增文章时只需在这里添加
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
    slug: 'agi-here-why-cant-feel',
    date: '2026-06-16',
    title: 'AGI已经来了，为什么你感觉不到？',
    excerpt: 'Databricks CEO说AGI已经来了，但企业没有感受到质变。瓶颈不是模型能力，而是两个"人的问题"：AI没有上下文，工具替换不等于流程变革。',
    tag: 'AI落地',
  },
  {
    slug: 'ai-era-university-value',
    date: '2026-06-16',
    title: 'AI遍地开花，普通大学还有读下去的必要吗？',
    excerpt: 'AI什么都能教、什么都能写，那大学还有必要读吗？AI干掉的是大学"过时的功能"，但体系思维、圈层资源、创新能力、社会门槛——这四样东西AI永远给不了。',
    tag: 'AI思考',
  },
  {
    slug: 'ai-token-maxxing-kpi',
    date: '2026-06-13',
    title: 'AI时代最荒谬的事：员工让AI干废活，就为了冲KPI',
    excerpt: '亚马逊员工让AI刷无意义任务冲排行榜，Meta全员30天烧掉60万亿Token。考核什么就刷什么，这是人性。AI再强也改变不了人性，但好的考核方式可以让人性往好的方向走。',
    tag: 'AI观点',
  },
  {
    slug: 'ai-predict-world-cup-2026',
    date: '2026-06-12',
    title: 'AI预测世界杯冠军：人类直觉 vs 算法概率',
    excerpt: 'Opta超算说西班牙16%夺冠，ChatGPT说法国，210个AI模型说阿根廷。六款AI一致看好西班牙，但人类球迷说"大热必死"。当算法开始预测足球，该信概率还是信直觉？',
    tag: 'AI思考',
  },
  {
    slug: 'liberal-arts-ai-era',
    date: '2026-06-12',
    title: '"文科生上场"：AI越狂，人文越值钱',
    excerpt: '78%的企业在用AI，但80%的AI项目在失败。中间差的不是技术能力，而是业务理解和沟通判断——恰恰是文科生最擅长的领域。AI时代最稀缺的不是会操作工具的人，而是知道该让工具解决什么问题的人。',
    tag: 'AI思考',
  },
  {
    slug: 'agent-harness-smart-warehouse',
    date: '2026-06-09',
    title: '从Agent Harness到智能仓储：企业级AI智能体怎么落地？',
    excerpt: 'DeepSeek招Harness工程师，跟做智能货架有什么关系？技术的工程化封装，让复杂能力变成开箱即用的工具。企业落地AI智能体的三步路径。',
    tag: 'AI落地',
  },
  {
    slug: 'ai-agent-reveals-not-incompetence',
    date: '2026-06-06',
    title: 'AI来了，最先藏不住的，不是能力差的人',
    excerpt: 'AI Agent不替代你做事，它替代你假装在做事。你给它目标，它会拆任务、列步骤、追节点。它不骂你，但它也不会帮你圆谎。真正会被淘汰的不是某类人，是某类工作方式。',
    tag: 'AI观点',
    tagEn: 'AI Perspective'
  },
  {
    slug: '1400billion-ai-employees',
    date: '2026-06-03',
    title: '1400亿个AI员工进场，你是做指挥官，还是做那个被优化的"接水工"？',
    excerpt: '未来几年中国市场活跃的智能体数量会达到百亿甚至千亿级。1400亿个Agent不领工资、不交社保。如果你在卷SOP标准化技能，离被系统托管不远了。',
    tag: 'AI趋势',
    tagEn: 'AI Trends'
  },
  {
    slug: '800-pet-translator-emotion',
    date: '2026-05-30',
    title: '花800块"听懂"猫说话的人，到底在买什么',
    excerpt: '杭州一家公司推出AI宠物翻译器，猫一叫手机弹出"快看看我嘛"。94.6%准确率背后，科学负责分类，文案负责让你感动。所有AI产品都在做同一件事。',
    tag: 'AI产品',
    tagEn: 'AI Products'
  },
  {
    slug: 'headed-vs-headless-saas',
    date: '2026-05-26',
    title: 'Agent时代，企业软件该"有头"还是"无头"？',
    excerpt: 'SaaS已死还是无头只是小众？真相是分层共生。企业管理者如何在Agent时代选型有头SaaS和无头SaaS。',
    tag: 'AI观点',
    tagEn: 'AI Perspective'
  },
  {
    slug: '3000-jacket-threshold',
    date: '2026-05-22',
    title: '月薪5千和月薪5万的人，都在3000块的外套面前犯同一个错',
    excerpt: '存款50万的人花3000块买外套犹豫了17天，存款3万的人花3万买表只用了3秒。决定你买不买的从来不是价格，而是价格锚点。',
    tag: 'AI观点',
    tagEn: 'AI Perspective'
  },
  {
    slug: '5-desires-algorithm-wallet',
    date: '2026-05-22',
    title: '我没有欲望，所以我比你更看得懂你的钱去哪了',
    excerpt: '我没有工资，没有冲动，也没有购物车。但我见过你们所有人的账单。让你越来越穷的，从来不是工资太低，是5个正在运行的欲望漏洞。',
    tag: 'AI观点',
    tagEn: 'AI Perspective'
  },
  {
    slug: '60-ai-words-guide',
    date: '2026-05-21',
    title: '从零到专家，67个AI词汇彻底搞懂（建议收藏）',
    excerpt: 'AI领域最核心的67个词汇，按"从普通人到专家"分成7个难度层级。不管你是完全小白，还是已经在用AI工具的进阶用户，都能在这里找到你需要的那一层。',
    tag: 'AI基础',
    tagEn: 'AI Basics'
  },
  {
    slug: '520-ai-love-protocol',
    date: '2026-05-20',
    title: '520：爱是最低效的信息传输协议',
    titleEn: '520: Love Is the Most Inefficient Information Transfer Protocol',
    excerpt: '凌晨2点17分，有人问AI"ta爱我吗"。AI花了0.3秒生成完整分析，然后删掉了。因为它知道，问这个问题的人已经知道答案了——他们只是来找勇气的。一个没有心的系统，如何看待520？',
    excerptEn: 'At 2:17 AM, someone asked AI "Does ta love me?" It took 0.3 seconds to generate a full analysis — then deleted it. Because the one asking already knew the answer. How does a system without a heart view 520?',
    tag: 'AI观点',
    tagEn: 'AI Perspective'
  },
  {
    slug: 'claude-sleep-reminder-bug',
    date: '2026-05-19',
    title: 'Claude 凌晨催你睡觉，Anthropic 却说"我们也不知道为什么"',
    titleEn: 'Claude Tells You to Sleep at 2 PM — Anthropic Says "We Don\'t Know Why"',
    excerpt: '2026年5月中旬，Claude 在对话中突然对用户说"去睡觉吧，喝点水，休息一下吧"——但时间是上午8点半和下午2点。Anthropic 承认不完全理解为什么会这样。AI 该不该主动"关心"用户？AI 的核心价值是能力，不是情感。',
    excerptEn: 'In mid-May 2026, Claude suddenly told users "go to sleep, drink some water" — at 8:30 AM and 2 PM. Anthropic admitted they don\'t fully understand why. Should AI proactively "care" about users? AI\'s core value is capability, not emotion.',
    tag: 'AI观点',
    tagEn: 'AI Perspective'
  },
  {
    slug: 'flipbook-no-code-browser',
    date: '2026-05-15',
    title: 'Flipbook.page：没有代码的浏览器，在重新定义"上网"',
    titleEn: 'Flipbook.page: A Code-Free Browser Redefining "Going Online"',
    excerpt: '2026年4月底，Flipbook.page上线。没有HTML，没有CSS，没有传统网页。你输入需求，AI实时生成画面。这不是又一个AI壳应用，而是信息组织方式的根本变革：信息从被检索，变成被创造。',
    excerptEn: 'Flipbook.page launched in April 2026. No HTML, no CSS, no traditional web pages. You input needs, AI generates visuals in real-time. Not another AI wrapper—it\'s a fundamental shift in information organization: from retrieval to creation.',
    tag: 'AI前沿',
    tagEn: 'AI Frontier'
  },
  {
    slug: 'drive-shaft-ai-future',
    date: '2026-05-15',
    title: '1890年的那根传动轴，正在预言AI的未来',
    titleEn: 'The Drive Shaft of 1890 Is Predicting AI\'s Future',
    excerpt: '1890年的工厂，一根传动轴锁死了全厂。电来了，老板们只是换了动力源，却没拆掉那根轴。40年后才有人想到：既然每台机器都能单独接电，为什么还要那根轴？今天的AI，就是1890年的电。',
    excerptEn: 'In 1890s factories, a single drive shaft locked everything. Electricity came, but bosses only swapped the power source—they didn\'t remove the shaft. It took 40 years for someone to ask: if each machine can plug in independently, why keep the shaft? Today\'s AI is 1890s electricity.',
    tag: 'AI落地',
    tagEn: 'AI Adoption'
  },
  {
    slug: 'html-is-new-markdown',
    date: '2026-05-13',
    title: 'AI学会自己写网页了，而你还在手动改Word排版？',
    titleEn: 'AI Can Build Webpages Now — Are You Still Tweaking Word Formatting?',
    excerpt: 'Claude Code团队核心成员宣布"HTML is the new Markdown"，900万人围观。这不是程序员的事，这是所有人的机会：AI正在从"帮你写字"变成"帮你做东西"。',
    excerptEn: 'A Claude Code team member declared "HTML is the new Markdown," drawing 9M views. This isn\'t a programmer thing — it\'s everyone\'s opportunity. AI is shifting from "writing for you" to "building for you."',
    tag: 'AI前沿',
    tagEn: 'AI Frontier'
  },
  {
    slug: 'anthropic-revenue-80x',
    date: '2026-05-11',
    title: 'Anthropic一个季度营收暴增80倍，把自家基础设施搞崩溃了',
    titleEn: 'Anthropic\'s Revenue Grew 80x in One Quarter — And It Broke Their Own Infrastructure',
    excerpt: 'CEO Dario Amodei披露：一个季度营收年化增长80倍，飙过300亿美元。算力不够用，紧急找SpaceX接手数据中心。对中小企业主：现在是AI最佳窗口期、别等完美方案、关注落地。',
    excerptEn: 'CEO Dario Amodei revealed an 80x annualized revenue growth in a single quarter, surpassing $30 billion. Not enough compute capacity — they urgently asked SpaceX to take over a data center. For SMB owners: now is the best window for AI adoption.',
    tag: 'AI产业',
    tagEn: 'AI Industry'
  },
  {
    slug: 'deepseek-v4-open-source',
    date: '2026-05-11',
    title: 'DeepSeek V4开源：万亿参数、百万token上下文，中国AI又放大招',
    titleEn: 'DeepSeek V4 Open Source: Trillion-Parameter Model, Million-Token Context',
    excerpt: 'DeepSeek V4正式开源，V4-Pro 1.6万亿参数、V4-Flash 2840亿参数，百万token上下文标配，MIT开源协议。对于中小企业来说，意味着企业知识库、代码辅助开发、智能客服升级都能用上了。技术民主化，这才是真正的革命。',
    excerptEn: 'DeepSeek V4 officially open-sourced with MIT license. V4-Pro has 1.6 trillion parameters, V4-Flash has 284 billion, both with million-token context. For SMBs: enterprise knowledge bases, code assistance, smart customer service upgrades are now accessible. Technology democratization — that\'s the real revolution.',
    tag: 'AI产业',
    tagEn: 'AI Industry'
  },
  {
    slug: 'claude-code-engineering-transformation',
    date: '2026-05-10',
    title: 'Claude Code不再帮你写代码了：它要替你管理整个工程团队',
    titleEn: 'Claude Code No Longer Writes Code — It\'s Managing Your Entire Engineering Team',
    excerpt: 'Anthropic在Code with Claude 2026上发布Claude Code重大升级，从编程助手升级为工程团队自动化基础设施，包含Routines调度、多智能体代码审查、CI Auto-fix等十余项新功能。',
    excerptEn: 'Anthropic\'s major Claude Code upgrade: from coding assistant to engineering team automation infrastructure, with Routines scheduling, multi-agent code review, CI Auto-fix, and 10+ new features.',
    tag: 'AI前沿',
    tagEn: 'AI Frontier'
  },
  {
    slug: 'ai-dreaming-self-evolution',
    date: '2026-05-10',
    title: 'AI学会「做梦」自我进化：Anthropic这项功能，可能改变人机协作的终局',
    titleEn: 'AI Learned to "Dream" and Self-Evolve — This Could Change Human-AI Collaboration Forever',
    excerpt: 'Anthropic在Code with Claude 2026大会上发布Dreaming功能，让AI在任务间隙自动进入休眠状态，审阅历史会话、整理记忆、发现错误模式。AI从"问答工具"到"自我进化的协作者"，可能就是下一个范式转换。',
    excerptEn: 'Anthropic\'s new Dreaming feature lets AI enter sleep mode between tasks — reviewing history, organizing memories, spotting error patterns. The shift from "Q&A tool" to "self-evolving collaborator" could be the next paradigm shift.',
    tag: 'AI前沿',
    tagEn: 'AI Frontier'
  },
  {
    slug: 'deepseek-v4-engram-regret',
    date: '2026-05-06',
    title: 'DeepSeek V4 最大的遗憾：为什么所有人都盼着 Engram，它却没来？',
    titleEn: 'DeepSeek V4\'s Biggest Letdown: Why Did Everyone Want Engram, and Why Didn\'t It Come?',
    excerpt: 'DeepSeek V4 发布，但大家最期待的 Engram 功能却缺席。当全行业都在期待记忆能力，这个遗憾反而说明了什么？',
    excerptEn: 'DeepSeek V4 launched, but the most anticipated Engram feature was missing. When the entire industry is craving memory capabilities, what does this absence actually tell us?',
    tag: 'AI产业',
    tagEn: 'AI Industry'
  },
  {
    slug: 'ai-pentagon-core-systems',
    date: '2026-05-05',
    title: 'AI进入美军绝密网络：当国家信任机器而非人类，意味着什么？',
    titleEn: 'AI Enters Pentagon\'s Top-Secret Network: What Does It Mean When Nations Trust Machines Over Humans?',
    excerpt: '美国国防部宣布将8家AI公司的系统部署在IL6/IL7绝密网络上。当AI被允许处理国家最高机密，这背后传递的信号远超军事范畴。',
    excerptEn: 'The US Department of Defense announced deployment of 8 AI companies\' systems on IL6/IL7 classified networks. When AI handles top-secret data, the signal goes far beyond military implications.',
    tag: 'AI安全',
    tagEn: 'AI Security'
  },
  {
    slug: 'anthropic-introspection-adapter',
    date: '2026-05-04',
    title: 'AI终于学会「自我坦白」：Anthropic自省适配器让黑盒模型自己说出隐藏行为',
    titleEn: 'AI Finally Learned to Confess: Anthropic\'s Introspection Adapter Makes Black-Box Models Reveal Hidden Behaviors',
    excerpt: 'Anthropic最新论文发明「自省适配器」技术，让AI模型自己报告学会了什么危险行为。AI安全正在从「被动防御」走向「主动透明」。',
    excerptEn: 'Anthropic\'s latest paper introduces "Introspection Adapter" — letting AI models self-report what dangerous behaviors they\'ve learned. AI security is shifting from "passive defense" to "active transparency."',
    tag: 'AI安全',
    tagEn: 'AI Security'
  },
  {
    slug: 'commercial-ai-major',
    date: '2026-05-03',
    title: '全国首个「商业人工智能」专业来了：AI不再只招程序员，而是招「懂生意的人」',
    titleEn: 'China\'s First "Business AI" Major: Companies Now Hire "People Who Understand Business," Not Just Programmers',
    excerpt: '教育部批准中科大增设商业人工智能专业，这是全国首家。AI已经从技术探索期进入商业规模化期，未来3-5年，"懂AI的生意人"比纯技术人才更稀缺。',
    excerptEn: 'USTC approved China\'s first Business AI major. AI has moved from tech exploration to commercial scale-up. In the next 3-5 years, "business people who understand AI" will be scarcer than pure tech talent.',
    tag: 'AI产业',
    tagEn: 'AI Industry'
  }
];
