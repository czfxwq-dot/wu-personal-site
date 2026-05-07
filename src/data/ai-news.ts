// AI新闻数据 — 新增新闻时只需在这里添加
// ⚠️ 2026-05-06 全量替换：经逐条查证，用真实新闻替换此前编造内容
export const aiNews = [
  // ─── 2026-05-05 ───
  {
    date: '2026-05-05',
    title: 'MIT研究：新训练方法可提升AI置信度估算，减少推理模型幻觉',
    summary: 'MIT研究人员开发了一种新的训练方法，可在不牺牲性能的前提下提升AI模型置信度估算的可靠性，解决推理模型产生幻觉的根本原因之一。',
    source: 'MIT News',
    category: '研究',
    comment: '幻觉问题一直是LLM落地的最大障碍之一。从置信度估算入手，比单纯堆参数更有效。'
  },
  {
    date: '2026-05-05',
    title: 'OpenAI发布GPT-5.5，修复"哥布林"泛滥问题',
    summary: 'OpenAI发布GPT-5.5版本，官方报告承认此前版本中模型频繁输出"哥布林"相关内容是奖励机制导致的bug，历经四个模型版本才彻底修复。',
    source: 'OpenAI',
    category: '大模型',
    comment: '奖励机制设计不当会导致模型行为失控，这对所有RLHF训练都是重要警示。'
  },
  {
    date: '2026-05-05',
    title: 'OpenAI Codex桌面版App上线，定位为"智能体指挥中心"',
    summary: 'OpenAI于2026年2月正式推出Codex App（macOS版），定位为智能体指挥中心，用户可通过桌面应用管理AI编程代理任务。',
    source: 'OpenAI',
    category: '工具',
    comment: 'AI编程工具正在从命令行走向桌面应用，开发者体验是竞争关键。'
  },

  // ─── 2026-05-04 ───
  {
    date: '2026-05-04',
    title: '苹果最新Mac产品线已搭载M5/M5 Pro/M5 Max芯片',
    summary: '苹果官网显示，MacBook Pro目前已搭载M5、M5 Pro或M5 Max芯片，拥有最长24小时电池续航和Liquid视网膜XDR显示屏。同时iOS最新版本为iOS 26，带来全新设计。',
    source: 'Apple官网',
    category: '硬件',
    comment: '苹果芯片迭代速度在加快，M5系列对AI本地部署是重大利好。注意当前最新版本是iOS 26而非iOS 27。'
  },
  {
    date: '2026-05-04',
    title: '腾讯云宣布5月9日起AI算力相关产品涨价5%',
    summary: '腾讯云于2026年4月9日发布公告，鉴于全球AI算力需求持续激增、核心硬件供应链成本大幅上涨，将于5月9日起对AI算力、容器服务及弹性MapReduce（EMR）相关产品刊例价统一上调5%。此前阿里云、百度智能云已加入涨价行列。',
    source: '腾讯云官方公告',
    category: '产业',
    link: 'https://cloud.tencent.com/announce/detail/2254',
    comment: '云计算20年降价史终结。AI算力需求爆发推高基础设施成本，中小企业需提前规划算力预算。'
  },
  {
    date: '2026-05-04',
    title: 'Kimi发布并开源K2.6编程模型',
    summary: '月之暗面（Moonshot AI）发布并开源Kimi K2.6编程模型，在Vibe Code Benchmark中以压倒性优势成为开源权重模型第一，超越Kimi K2.5及Gemini 3.1 Pro等闭源前沿模型。',
    source: '月之暗面',
    category: '大模型',
    comment: '国产编程模型正在快速追赶，开源策略有利于建立开发者生态。'
  },

  // ─── 2026-05-03 ───
  {
    date: '2026-05-03',
    title: 'OpenAI调整与微软合作关系，设置收入分成上限',
    summary: '2026年4月27日，OpenAI与微软宣布修订合作协议，允许OpenAI设置收入分成支付上限，并可直接向微软竞争企业的客户提供服务，标志着OpenAI进一步摆脱对微软的依赖。',
    source: 'CNBC',
    category: '产业',
    link: 'https://www.cnbc.com/2026/04/27/openai-microsoft-partnership-revenue-cap.html',
    comment: 'OpenAI正在争取更大独立性，这对AI行业格局有深远影响。'
  },
  {
    date: '2026-05-03',
    title: 'OpenAI刚融资1220亿美元，但二级市场"没人接盘"',
    summary: '2026年4月报道显示，OpenAI虽完成1220亿美元融资，但在二级市场遇冷。整个科技板块都面临类似情况，SpaceX、OpenAI和Anthropic集中IPO，市场资金难以消化。',
    source: '知乎',
    category: '投资',
    comment: 'AI融资热与二级市场冷并存，估值泡沫风险值得关注。'
  },
  {
    date: '2026-05-03',
    title: 'DeepSeek发布V4系列：100万tokens上下文，成本大幅降低',
    summary: '2026年4月24日，DeepSeek发布开源大模型DeepSeek-V4系列，包含V4-Pro与V4-Flash双版本，支持100万tokens上下文长度。采用Engram架构与mHC框架，实现高效长文本处理与低成本推理。在Vibe Code Benchmark中"以压倒性优势"成为开源权重模型第一。',
    source: 'DeepSeek',
    category: '大模型',
    comment: 'DeepSeek的开源策略和极致成本优势，正在重塑全球大模型竞争格局。'
  },

  // ─── 2026-05-02 ───
  {
    date: '2026-05-02',
    title: 'DeepSeek上线多模态识图功能，基于V4-Flash架构',
    summary: 'DeepSeek在发布V4后于4月29日上线多模态识图模式，目前处于灰度公测阶段。工程上基于DeepSeek-V4-Flash，将每4个visual tokens的KV cache压缩成1个entry，以较低图像token成本在计数、空间推理等专项benchmark上接近前沿闭源多模态模型。',
    source: '知乎',
    category: '大模型',
    comment: '国产大模型在多模态领域持续突破，但DeepSeek的幻觉问题也提醒我们：AI生成内容必须人工审核。'
  },
  {
    date: '2026-05-02',
    title: 'GPT-5.1发布：将GPT-5和GPT-5 Mini合并为自适应思考模型',
    summary: 'OpenAI发布GPT-5.1模型，将GPT-5和GPT-5 Mini合并为一个能根据问题难度自适应调整思考用量的模型，主打"更温暖""说人话"的交互体验。',
    source: '知乎/OpenAI',
    category: '大模型',
    comment: '自适应思考用量是实用化的重要方向——简单问题快答，复杂问题深思。'
  },

  // ─── 2026-05-01 ───
  {
    date: '2026-05-01',
    title: 'OpenAI Codex：基于云的软件工程代理正式发布',
    summary: 'OpenAI在官网宣布发布全新的基于云的软件工程代理"Codex"，定位为云端代码开发工具，可自主完成软件工程项目。',
    source: 'OpenAI官网',
    category: '工具',
    comment: 'AI编程代理从辅助工具进化为自主开发者，程序员角色正在重新定义。'
  },
  {
    date: '2026-05-01',
    title: '字节跳动豆包/Dola助手：AI+即时零售生态探索',
    summary: '字节跳动CEO梁汝波表示，短期内的"高峰"就是豆包/Dola助手。豆包正在内测AI电商功能，既是对AI大模型商业化路径的重要探索，也是字节打通"AI+即时零售"生态的关键一步。',
    source: '知乎',
    category: '产业',
    comment: 'AI+零售是值得关注的方向，我们的智能货柜业务也可借鉴AI助理思路。'
  },

  // ─── 2026-04-30 ───
  {
    date: '2026-04-30',
    title: '阿里百度腾讯集体加入AI算力涨价潮，云计算终结20年降价史',
    summary: '2026年4月，阿里云、百度智能云、腾讯云相继宣布AI算力价格上调，涨幅从5%到463%不等。这是近20年来云计算行业首次集体涨价，标志着AI算力成本全面上涨时代的到来。',
    source: '新浪财经/IT168/澎湃新闻',
    category: '产业',
    comment: '云计算从"降价换市场"转向"涨价保供给"，AI应用的成本结构需要重新评估。'
  },
  {
    date: '2026-04-30',
    title: 'DeepSeek V4实测：参数量翻1.6倍，成本压到海外模型5%-20%',
    summary: 'DeepSeek V4实测结果显示，参数量翻1.6倍、上下文升至1M。架构上通过MoE专家池扩容、稀疏注意力与高效训练把成本压到海外模型的5%-20%。实测中V4在中文理解方面表现优异。',
    source: 'MornAI',
    category: '大模型',
    comment: '成本控制是DeepSeek的核心竞争力，对国内企业来说性价比优势明显。'
  },

  // ─── 2026-04-29 ───
  {
    date: '2026-04-29',
    title: '美国AI三巨头围剿模型蒸馏，倒逼中国AI公司自研技术路线',
    summary: '2026年4月8日报道，美国OpenAI、Anthropic等公司联手围剿模型蒸馏技术。这可能倒逼中国AI公司更重视自研，探索不同于PPO的技术路线，如DeepSeek的GRPO就是典型例子。',
    source: '知乎',
    category: '产业',
    comment: '技术封锁反而激发自主创新，DeepSeek的GRPO就是不走老路、另辟蹊径的典型案例。'
  }
];
