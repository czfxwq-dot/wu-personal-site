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
