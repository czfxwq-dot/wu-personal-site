// 文章数据 — 新增文章时只需在这里添加
export interface ArticleEntry {
  slug: string;
  date: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  tag: string;
  tagEn: string;
}

export const articles: ArticleEntry[] = [
  {
    slug: 'deepseek-v4-engram-regret',
    date: '2026-05-06',
    title: 'DeepSeek V4 最大的遗憾：为什么所有人都盼着 Engram，它却没来？',
    titleEn: 'The Biggest Regret of DeepSeek V4: Why Everyone Expected Engram But It Never Came',
    excerpt: 'DeepSeek V4 发布，但大家最期待的 Engram 功能却缺席。当全行业都在期待记忆能力，这个遗憾反而说明了什么？',
    excerptEn: 'DeepSeek V4 launched, but the most anticipated Engram feature was absent. What does this tell us about the industry\'s expectations for AI memory?',
    tag: 'AI产业',
    tagEn: 'AI Industry'
  },
  {
    slug: 'ai-pentagon-core-systems',
    date: '2026-05-05',
    title: 'AI进入美军绝密网络：当国家信任机器而非人类，意味着什么？',
    titleEn: 'AI Enters Pentagon\'s Top-Secret Network: What Does It Mean When Nations Trust Machines Over Humans?',
    excerpt: '美国国防部宣布将8家AI公司的系统部署在IL6/IL7绝密网络上。当AI被允许处理国家最高机密，这背后传递的信号远超军事范畴。',
    excerptEn: 'The US DoD announced deployment of 8 AI company systems on IL6/IL7 classified networks. When AI is allowed to handle top secrets, the signal goes far beyond military scope.',
    tag: 'AI安全',
    tagEn: 'AI Security'
  },
  {
    slug: 'anthropic-introspection-adapter',
    date: '2026-05-04',
    title: 'AI终于学会「自我坦白」：Anthropic自省适配器让黑盒模型自己说出隐藏行为',
    titleEn: 'AI Finally Learns to "Confess": Anthropic\'s Introspection Adapter Lets Black-Box Models Report Hidden Behaviors',
    excerpt: 'Anthropic最新论文发明「自省适配器」技术，让AI模型自己报告学会了什么危险行为。AI安全正在从「被动防御」走向「主动透明」。',
    excerptEn: 'Anthropic\'s latest paper introduces the "Introspection Adapter" — a technique that lets AI models self-report learned dangerous behaviors. AI safety is moving from reactive defense to proactive transparency.',
    tag: 'AI安全',
    tagEn: 'AI Security'
  },
  {
    slug: 'commercial-ai-major',
    date: '2026-05-03',
    title: '全国首个「商业人工智能」专业来了：AI不再只招程序员，而是招「懂生意的人」',
    titleEn: 'China\'s First "Commercial AI" Major Arrives: AI No Longer Needs Just Programmers, But "People Who Understand Business"',
    excerpt: '教育部批准中科大增设商业人工智能专业，这是全国首家。AI已经从技术探索期进入商业规模化期，未来3-5年，"懂AI的生意人"比纯技术人才更稀缺。',
    excerptEn: 'The Ministry of Education approved USTC to add a Commercial AI major — the first in China. AI has moved from technical exploration to commercial scaling. In the next 3-5 years, "business people who understand AI" will be rarer than pure tech talent.',
    tag: 'AI产业',
    tagEn: 'AI Industry'
  }
];
