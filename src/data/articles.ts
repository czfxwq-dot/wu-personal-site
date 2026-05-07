// 文章数据 — 新增文章时只需在这里添加
export interface ArticleEntry {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  tag: string;
}

export const articles: ArticleEntry[] = [
  {
    slug: 'deepseek-v4-engram-regret',
    date: '2026-05-06',
    title: 'DeepSeek V4 最大的遗憾：为什么所有人都盼着 Engram，它却没来？',
    excerpt: 'DeepSeek V4 发布，但大家最期待的 Engram 功能却缺席。当全行业都在期待记忆能力，这个遗憾反而说明了什么？',
    tag: 'AI产业'
  },
  {
    slug: 'ai-pentagon-core-systems',
    date: '2026-05-05',
    title: 'AI进入美军绝密网络：当国家信任机器而非人类，意味着什么？',
    excerpt: '美国国防部宣布将8家AI公司的系统部署在IL6/IL7绝密网络上。当AI被允许处理国家最高机密，这背后传递的信号远超军事范畴。',
    tag: 'AI安全'
  },
  {
    slug: 'anthropic-introspection-adapter',
    date: '2026-05-04',
    title: 'AI终于学会「自我坦白」：Anthropic自省适配器让黑盒模型自己说出隐藏行为',
    excerpt: 'Anthropic最新论文发明「自省适配器」技术，让AI模型自己报告学会了什么危险行为。AI安全正在从「被动防御」走向「主动透明」。',
    tag: 'AI安全'
  },
  {
    slug: 'commercial-ai-major',
    date: '2026-05-03',
    title: '全国首个「商业人工智能」专业来了：AI不再只招程序员，而是招「懂生意的人」',
    excerpt: '教育部批准中科大增设商业人工智能专业，这是全国首家。AI已经从技术探索期进入商业规模化期，未来3-5年，"懂AI的生意人"比纯技术人才更稀缺。',
    tag: 'AI产业'
  }
];
