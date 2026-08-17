// AI新闻汇总数据 — 每天一条汇总型，包含多条新闻整合
// 格式：date, title(汇总标题), summary(汇总摘要), newsItems(具体新闻列表), comment(一句话点评)
export interface NewsItem {
  title: string;
  titleEn?: string;
  summary: string;
  summaryEn?: string;
  source: string;
  category: string;
  categoryEn?: string;
  url?: string; // 原始新闻链接
}

export interface DailyNewsSummary {
  date: string;
  title: string;
  titleEn?: string;
  summary: string;
  summaryEn?: string;
  newsItems: NewsItem[];
  comment: string;
  commentEn?: string;
}

export const dailyNewsSummaries: DailyNewsSummary[] = [
{
  "date": "2026-08-18",
  "title": "AI新闻 | GLM-5.3发布称最强开源编程模型 + Stripe 70亿美元收购OpenRouter + OpenAI发8400万美元Codex额度 + 软银2亿美元投建筑机器人 + DeepSeek峰谷定价生效",
  "summary": "今日AI行业五大看点：智谱发布GLM-5.3，通过极致后训练Scaling大幅提升编程能力，号称编程能力最强开源模型；支付巨头Stripe以超70亿美元收购AI模型路由平台OpenRouter，三个月估值暴涨50倍；OpenAI宣布通过ChatGPT提供8400万美元Codex额度，加速AI编程落地；软银向建筑机器人公司Gravis Robotics投资2亿美元，为建筑机器人领域最大A轮；DeepSeek V4峰谷定价方案正式生效，高峰时段价格翻倍。",
  "newsItems": [
    {
      "title": "智谱发布GLM-5.3：号称编程能力最强开源模型",
      "summary": "智谱正式发布GLM-5.3，基座模型未变但通过极致后训练Scaling大幅提升智能上界。采用数十倍长程任务环境、更丰富的环境类型和超长后训练时间，编程能力号称开源最强。GLM Coding Plan全员额度今日13:00重置。",
      "source": "开源中国",
      "category": "大模型",
      "url": "https://www.oschina.net/news/501931"
    },
    {
      "title": "Stripe以超70亿美元收购AI模型路由平台OpenRouter",
      "summary": "支付巨头Stripe敲定协议以超70亿美元收购AI网关公司OpenRouter。仅三个月前OpenRouter估值仅1.3亿美元，估值暴涨超50倍。OpenRouter是AI模型路由和网关领域的头部平台，此次收购标志支付基础设施与AI算力调度的深度融合。",
      "source": "开源中国",
      "category": "AI投融资",
      "url": "https://www.oschina.net/news/501951/stripe-nears-deal-to-buy-ai-firm-openrouter-for-over-7-billion"
    },
    {
      "title": "OpenAI将通过ChatGPT提供8400万美元Codex额度",
      "summary": "OpenAI宣布通过ChatGPT向用户提供总计8400万美元的Codex编程额度。此举旨在加速AI编程工具在开发者群体中的普及，进一步巩固OpenAI在AI编程赛道的市场地位。",
      "source": "36氪",
      "category": "AI编程",
      "url": "https://www.36kr.com/newsflashes/3943615318506627"
    },
    {
      "title": "软银向建筑机器人公司Gravis Robotics投资2亿美元",
      "summary": "建筑机器人公司Gravis Robotics完成2亿美元A轮融资，由软银投资，为建筑机器人领域规模最大的A轮融资。资金将用于推进重型工程机械自动化，并在全球建筑工地扩大部署。Gravis成立于2022年，由苏黎世联邦理工学院孵化。",
      "source": "36氪",
      "category": "机器人",
      "url": "https://www.36kr.com/newsflashes/3944217400393088"
    },
    {
      "title": "DeepSeek V4峰谷定价方案正式生效，高峰时段价格翻倍",
      "summary": "北京时间8月17日零时起，DeepSeek V4全系列正式切换到峰谷定价模式。高峰时段价格翻倍，空闲时段价格为高峰时段的一半。这是DeepSeek V4系列发布后最大的价格动作，标志着中国AI定价策略走向成熟。",
      "source": "开源中国",
      "category": "大模型",
      "url": "https://www.oschina.net/news/501961"
    }
  ],
  "comment": "GLM-5.3卷编程、Stripe天价买路由、OpenAI撒钱推Codex——AI竞争正从模型本身扩散到工具链和基础设施，谁能把模型能力变成开发者触手可及的生产力，谁就掌握下一轮增长引擎。"
},
{
  "date": "2026-08-17",
  "title": "AI新闻 | DeepSeek V4调价标志定价成熟 + Anthropic CEO发长文回应质疑 + OpenAI解散风险防范团队 + 人形机器人运动会参赛翻倍 + 百度库库AI月活2500万",
  "summary": "今日AI行业五大看点：DeepSeek V4全系列凌晨调价，中国AI定价策略走向成熟，正把\"智能\"变成工业品；Anthropic CEO在2万亿估值IPO前罕见发长文回应质疑，预告AI将在5-10年内治愈多数疾病；OpenAI筹备IPO之际解散风险防范团队，安全架构持续调整；第二届世界人形机器人运动会即将开幕，参赛规模较首届翻倍；百度AI办公智能体官宣中文名\"库库AI\"，月活已超2500万。",
  "newsItems": [
    {
      "title": "DeepSeek V4全系列凌晨调价，中国AI定价走向成熟",
      "summary": "8月17日零点，DeepSeek V4全系列新的峰谷价格正式生效。过去一年多中国模型不断压低前沿智能价格，在OpenRouter样本中中国模型Token份额已超过美国。分析认为DeepSeek涨价标志着中国正把\"智能\"变成一种工业品，AI定价策略走向成熟。",
      "source": "虎嗅",
      "category": "大模型",
      "url": "https://www.huxiu.com/article/4883517.html"
    },
    {
      "title": "Anthropic CEO罕见发长文回应质疑，预告5-10年AI将治愈多数疾病",
      "summary": "Anthropic CEO达里奥·阿莫迪在IPO估值被推到2万亿美元的节骨眼上，罕见发布长文正面回应硅谷质疑。他预告未来5-10年AI将治愈多数疾病，并回应了关于Anthropic安全理念的争议。这是该公司史上最大规模IPO前的重要信号。",
      "source": "IT之家",
      "category": "产业",
      "url": "https://www.ithome.com/0/990/373.htm"
    },
    {
      "title": "OpenAI筹备IPO之际解散风险防范团队",
      "summary": "据金融时报报道，OpenAI已于上月末解散旗下风险防范团队。该团队核心工作是评估模型是否存在重大风险并制定缓解措施。相关职责已按生物安全、网络安全等细分领域拆分并入现有业务团队。此前OpenAI已先后解散AGI筹备团队与超级对齐团队。",
      "source": "IT之家",
      "category": "AI安全",
      "url": "https://www.ithome.com/0/990/406.htm"
    },
    {
      "title": "第二届世界人形机器人运动会即将开幕，参赛规模翻倍",
      "summary": "第二届世界人形机器人运动会将于8月22日在北京国家速滑馆开幕，共51个项目1301场比赛。来自六大洲16个国家的666支队伍、2056台机器人参赛，队伍数量较首届增长138%，机器人数量翻了两番。各队伍已进入冲刺训练阶段。",
      "source": "IT之家",
      "category": "机器人",
      "url": "https://www.ithome.com/0/990/389.htm"
    },
    {
      "title": "百度AI办公智能体GenFlow官宣中文名\"库库AI\"，月活超2500万",
      "summary": "百度AI Day开放日上，百度文库网盘旗下通用智能体GenFlow正式官宣中文名\"库库AI\"，同步公布AI办公月活用户超2500万。分析认为库库AI是百度把十几年的内容家底和存储家底用AI外壳重新打包，标志着AI办公赛道竞争加剧。",
      "source": "虎嗅",
      "category": "AI应用",
      "url": "https://www.huxiu.com/article/4883487.html"
    }
  ],
  "comment": "DeepSeek调价、Anthropic冲刺2万亿、OpenAI拆安全团队——AI行业正同时经历商业化加速和治理体系重构，\"便宜好用\"和\"安全可控\"的天平如何平衡，将决定下一阶段的行业走向。"
},
{
  "date": "2026-08-16",
  "title": "AI新闻 | SpaceX 600亿美元收购Cursor + Anthropic 2万亿估值冲刺史上最大IPO + 宇树科技中签率0.018% + 千问办公上线GLM-5.3和DeepSeek V4 Pro + 黄仁勋推AI算力残值担保",
  "summary": "今日AI行业五大看点：SpaceX正式完成对Cursor母公司Anysphere的收购，成交价600亿美元，马斯克拿下AI编程赛道最重要棋子；Anthropic最快10月上市，投资者给出2万亿美元估值，将超越SpaceX成史上最大IPO；宇树科技科创板IPO中签率0.0181%创历史新低，场外暗盘部分中介出价520元/股；阿里千问办公首发上线GLM-5.3和DeepSeek V4 Pro两大模型；黄仁勋联手华尔街六大资管巨头推AI算力残值担保机制，将AI算力打造为独立资产类别。",
  "newsItems": [
    {
      "title": "SpaceX正式完成收购Cursor母公司Anysphere，成交价600亿美元",
      "summary": "8月14日，SpaceX正式完成对AI编程公司Anysphere（Cursor母公司）的收购，成交金额600亿美元。这家成立仅四年的AI Coding公司成为SpaceX全资子公司，也是马斯克迄今最大的一笔AI收购，标志着AI编程工具赛道格局巨变。",
      "source": "虎嗅",
      "category": "AI编程",
      "url": "https://www.huxiu.com/article/4883385.html"
    },
    {
      "title": "Anthropic最快10月上市，估值2万亿美元或成史上最大IPO",
      "summary": "据英国金融时报报道，全球头部AI企业Anthropic最快将于今年10月正式上市，投资者给出的上市估值已达2万亿美元，将超越马斯克的SpaceX（上市前估值1.77万亿美元），刷新史上最大IPO纪录。",
      "source": "虎嗅",
      "category": "产业",
      "url": "https://www.huxiu.com/article/4883363.html"
    },
    {
      "title": "宇树科技IPO中签率0.0181%创科创板新低，场外暗盘火爆",
      "summary": "宇树科技科创板IPO发行结果：978.46万户投资者参与申购，中签率仅0.0181%创科创板历史新低，弃购率低至万分之九。场外暗盘交易悄然兴起，部分中介出价520元/股（发行价150.8元/股），溢价超2.4倍。",
      "source": "36氪",
      "category": "机器人",
      "url": "https://www.36kr.com/newsflashes/3940284903701895"
    },
    {
      "title": "千问办公首发上线GLM-5.3和DeepSeek V4 Pro两款前沿模型",
      "summary": "阿里旗下Agent产品千问办公首发上线GLM-5.3和DeepSeek V4 Pro两款模型，加上此前上线的Qwen3.8-Max，千问办公已支持三大前沿模型。用户可在产品首页直接选用，AI办公Agent竞争加剧。",
      "source": "36氪",
      "category": "大模型",
      "url": "https://www.36kr.com/newsflashes/3940346809810055"
    },
    {
      "title": "黄仁勋联手华尔街巨头推AI算力残值担保，打造独立资产类别",
      "summary": "黄仁勋携手六位华尔街资管巨头为将AI算力打造为独立资产类别背书，英伟达可能为单个投资项目提供最高25%的残值支持机制。分析认为这是黄仁勋践行词元经济学，标志着AI热潮从技术竞赛延伸至资本竞赛，但也引发投资者对循环融资的担忧。",
      "source": "36氪",
      "category": "AI算力",
      "url": "https://www.36kr.com/newsflashes/3940579113713025"
    }
  ],
  "comment": "Cursor被马斯克收入囊中、Anthropic冲刺2万亿估值、宇树万人抢签——AI行业正从技术比拼全面转入资本博弈，谁掌握工具、模型和硬件入口，谁就掌握下一个十年的定价权。"
},
{
  "date": "2026-08-15",
  "title": "AI新闻 | 中国医生用GPT-5.6破解22年数学猜想 + 具身智能半年融资935亿 + 华强北AI眼镜销量翻倍 + DeepSeek Harness架构革新 + 谷歌AI人才大地震",
  "summary": "今日AI行业五大看点：北京协和医院金山木医生用GPT-5.6仅16小时证明了困扰数学界22年的Crouzeix猜想，开创AI辅助数学证明先河；具身智能赛道持续火爆，2026上半年国内融资总额突破935亿元同比增长5倍；华强北AI眼镜销量激增100%，AI产品全品类销售额增长55%；DeepSeek Harness发布引发架构讨论，探索AI自我修改能力；谷歌首席科学家Jeff Dean离职，DeepMind重组，前沿AI研发面临动荡。",
  "newsItems": [
    {
      "title": "中国医生用GPT-5.6破解22年数学难题，Crouzeix本人确认正确",
      "summary": "北京协和医院神经外科博士后金山木利用OpenAI的GPT-5.6-Sol模型，仅用约16小时就成功证明了自2004年以来困扰数学界长达22年的Crouzeix猜想。康奈尔大学数学家Townsend与华盛顿大学教授Greenbaum公开发表文章披露了这一突破性成果，Crouzeix本人已确认证明正确。这标志着AI在数学证明领域取得里程碑式进展。",
      "source": "IT之家",
      "category": "AI突破",
      "url": "https://www.ithome.com/0/989/952.htm"
    },
    {
      "title": "2026上半年超935亿元涌入具身智能赛道，同比增长5倍",
      "summary": "机器人加速进厂打工，资本用真金白银押注具身智能赛道。2026年上半年国内具身智能赛道融资总额突破935亿元，同比增长5倍。从工厂物流到制造业产线，具身智能正在从实验室走向真实产业场景，成为AI落地的下一个主战场。",
      "source": "36氪",
      "category": "机器人",
      "url": "https://www.36kr.com/newsflashes/3939323205746051"
    },
    {
      "title": "华强北AI眼镜销量暴涨100%，AI产品全品类增长55%",
      "summary": "今年前7个月华强北AI产品全品类销售额同比增长55%以上，其中AI眼镜销量激增100%，无人机和机器人销量增长60%至70%。翻译耳机、3D打印设备、智能穿戴等成为吸引海内外游客的闪亮名片，华强北跑出上午设计、下午打样、次日量产、一周出海的科创速度，电子产品出口覆盖全球190多个国家。",
      "source": "36氪",
      "category": "AI硬件",
      "url": "https://www.36kr.com/newsflashes/3939337442770306"
    },
    {
      "title": "DeepSeek Harness架构革新：探索AI能否修改自己",
      "summary": "DeepSeek发布Harness架构，将模型、工具、记忆、Skill、Session、Sandbox、调度和Agent loop统一抽象为插件体系。其核心赌注不在于插件本身，而在于探索AI能否修改自己的能力。基于Cordis理论框架，Harness尝试构建可逆effect和动态组合机制，为AI Agent架构提供全新思路。",
      "source": "虎嗅",
      "category": "大模型",
      "url": "https://www.huxiu.com/article/4883295.html"
    },
    {
      "title": "谷歌AI人才大地震：首席科学家Jeff Dean离职，DeepMind重组",
      "summary": "谷歌遭遇AI人才巨震。8月5日在谷歌工作27年的首席科学家Jeff Dean宣布离职，同日母公司Alphabet宣布重组DeepMind。SemiAnalysis发表报告称谷歌已放弃前沿AI，金融时报和路透社爆料DeepMind内部剧烈震荡，Demis Hassabis面临前所未有的内部压力。谷歌前沿AI研发战略面临重大转折。",
      "source": "虎嗅",
      "category": "产业",
      "url": "https://www.huxiu.com/article/4883275.html"
    }
  ],
  "comment": "AI正在从两个方向同时突破：向上用数学证明展示推理天花板，向下用眼镜和机器人渗透日常生活——而谷歌的内乱提醒我们，技术竞争的本质是人才竞争。"
},
  {
    date: '2026-08-14',
    title: 'AI新闻 | 腾讯AI年资本开支直奔2000亿 + 谷歌联合创始人督战Gemini研发 + 中美开源模型大会师五模横评 + DeepSeek-V4-Pro正式版上线 + Zed发布多人协作AI编程环境Delta',
    summary: '今日AI行业五大看点：腾讯Q2财报显示AI投入从保守转向激进，单季资本开支528亿元，自由现金流首次转负至-138亿元，马化腾提出构建AI生态新战略，年化AI资本开支直奔2000亿；谷歌因算力受限导致大模型迭代缓慢，联合创始人谢尔盖布林亲自督战Gemini研发，推动资源向递归自我改进方向倾斜；中美开源模型密集发布，Kimi K3、Qwen3.8-Max、DeepSeek V4 Pro、Meta Muse Glimmer、英伟达Nemotron 3.5 Lightning五大模型同台竞技；DeepSeek-V4-Pro正式版上线，Agent能力大幅提升；Zed编辑器发布Delta多人协作AI编程环境，标志着AI编程从单人工具走向团队协作。',
    newsItems: [
      {
        title: '腾讯换快船，AI年资本开支直奔2000亿',
        summary: '腾讯发布2026年Q2财报，AI投入态度从一贯保守彻底转向激进。单季资本开支高达528亿元，直接将季度自由现金流干到-138亿元，这是腾讯历史上首次出现负自由现金流。马化腾首次提出要构建AI生态新战略，年化AI资本开支直奔2000亿元，打破以往谨慎叙事，远超市场预期。',
        source: '虎嗅',
        category: '产业',
        url: 'https://www.huxiu.com/article/4883007.html'
      },
      {
        title: '算力受限累谷歌大模型迭代，谷歌联合创始人督战Gemini大模型研发',
        summary: '谷歌大模型因算力受限与内部分歧等因素迭代缓慢。谷歌联合创始人谢尔盖布林敦促核心AI员工全力投入Gemini大模型研发，不断向AI核心员工强调必须追上行业前沿水平。知情人士表示布林推动资源向递归自我改进方向倾斜，该技术目标是实现AI无需人为干预即可自我迭代升级。',
        source: '36氪',
        category: '大模型',
        url: 'https://www.36kr.com/newsflashes/3937901669547140'
      },
      {
        title: '中美开源模型大会师：Kimi、Qwen、DeepSeek、Meta和英伟达五模大横评',
        summary: '开源模型最近密集发布，七月底到八月中，Kimi K3、Qwen3.8-Max先后放出权重，DeepSeek V4 Pro正式版上线。与此同时美国开源也回归，Meta拿出Muse Glimmer，英伟达跟上Nemotron 3.5 Lightning。五大模型同台竞技，开源生态迎来前所未有的繁荣局面。',
        source: '虎嗅',
        category: '大模型',
        url: 'https://www.huxiu.com/article/4882974.html'
      },
      {
        title: 'DeepSeek-V4-Pro正式版上线，Agent能力大幅提升',
        summary: 'DeepSeek V4 Pro正式版已发布，同步在APP、网页端和API更新上线。用户可以通过APP或网页端选择专家模式使用全新的V4 Pro正式版模型。此次升级重点提升了Agent能力，为开发者和用户提供更强的智能体任务执行能力。',
        source: '开源中国',
        category: '大模型',
        url: 'https://www.oschina.net/news/501923'
      },
      {
        title: 'Zed推出多人协作AI编程环境Delta',
        summary: 'Zed编辑器团队正式发布Delta，一个面向AI Agent编程的多人协作环境。这标志着Zed从最好的代码编写工具进入最好的代码讨论工具的第二阶段战略。Delta的核心理念是将代码和对话保持连接，允许开发者在工作树的任意一行进行协作。',
        source: '开源中国',
        category: '应用',
        url: 'https://www.oschina.net/news/501922'
      }
    ],
    comment: '今日关键词豪赌与开源。腾讯单季资本开支528亿、自由现金流首次转负，是All in AI最激进的表态；谷歌联合创始人亲自督战Gemini研发，说明大厂在AI竞赛中已容不得半点松懈；中美五大开源模型同台竞技，开源生态迎来最繁荣时刻；Zed Delta的发布则预示AI编程正从单人工具走向团队协作新范式。'
  },
  {
    date: '2026-08-13',
    title: 'AI新闻 | 鸿海Q4出货英伟达Vera Rubin平台 + 腾讯AI开始算回报 + Agent拼生产系统 + 攻击性蒸馏暴露思维链漏洞 + 荣耀发布首款机器人手机',
    summary: '今日AI行业五大看点：鸿海宣布第四季度开始出货英伟达新一代Vera Rubin AI平台，大规模AI Agent工作负载下可实现最高10倍吞吐量提升；腾讯Q2财报显示AI算力投入开始看到回报，刘炽平称多款新应用表现良好；虎嗅深度分析指出Agent竞争正从Skill转向生产系统整合；美国前沿模型厂商暴露攻击性蒸馏漏洞，思维链可被低成本提取；荣耀发布首款机器人手机Robot Phone，9999元起售。',
    newsItems: [
      {
        title: '鸿海第四季度将开始出货英伟达Vera Rubin AI平台',
        summary: '鸿海宣布将于今年第四季度开始出货英伟达新一代Vera Rubin AI平台。英伟达此前宣布Vera Rubin已进入全面量产阶段，相较上一代Grace Blackwell，Vera Rubin在大规模AI Agent工作负载下可实现最高10倍吞吐量提升。这标志着英伟达AI芯片迭代速度持续加快。',
        source: '36氪',
        category: '硬件',
        url: 'https://www.36kr.com/newsflashes/3936498690604417'
      },
      {
        title: '腾讯AI开始算回报：从增强旧业务，到寻找下一门新生意',
        summary: '腾讯Q2最反常的一组数字来自现金流。本土游戏收入同比增长17%，营销服务增长22%，总收入达2047.85亿元同比增长11%。腾讯总裁刘炽平在业绩电话会上表示，公司正在算力上进行大规模投入，已看到明显的回报上行空间，多款新应用表现良好，算力云上租赁业务也有望带来可观收入增长。',
        source: '虎嗅',
        category: '产业',
        url: 'https://www.huxiu.com/article/4882704.html'
      },
      {
        title: 'Skill不够了，Agent需要拼"生产系统"',
        summary: '近期常能听到一种说法：Skill要被Harness替代了。但Skill解决的问题依然存在且越来越重要：怎样把团队做事的方法、行业经验、岗位流程交给Agent。真正被证明行不通的，是把正确步骤写进一份Markdown就想让Agent完美执行的做法。Agent竞争正从单点Skill转向生产系统的整体整合能力。',
        source: '虎嗅',
        category: '大模型',
        url: 'https://www.huxiu.com/article/4882713.html'
      },
      {
        title: '攻击性蒸馏，只是"思维链漏洞"的表层故事',
        summary: '美国前沿模型厂商暴露出一个重要安全漏洞。"攻击者"只需几步操作，就可能把模型刻意藏起来的思维链"扒"出来，其中不仅有模型能力的秘密，还可能夹带用户隐私甚至危险信息。比较直觉的解读是这为攻击性蒸馏提供了更低成本的路径，但真正值得警惕的可能是思维链本身的安全边界问题。',
        source: '虎嗅',
        category: '大模型',
        url: 'https://www.huxiu.com/article/4882699.html'
      },
      {
        title: '首款机器人手机荣耀Robot Phone正式发布，9999元起售',
        summary: '荣耀正式发布首款机器人手机Robot Phone，价格9999元起，最高12999元。这是手机行业首次以"机器人"命名的产品形态，将AI能力与手机硬件深度融合，标志着AI终端设备从软件层向硬件形态层延伸。',
        source: '36氪',
        category: '硬件',
        url: 'https://www.36kr.com/newsflashes/3936535940021638'
      }
    ],
    comment: '今日关键词"回报与系统"。鸿海Q4出货Vera Rubin平台说明英伟达芯片迭代不停；腾讯首次为AI支付影响资本配置的现金账单并开始算回报；Agent竞争从Skill转向生产系统整合；攻击性蒸馏漏洞提醒我们模型安全仍有盲区。AI行业正从"投入期"走向"算账期"，能算清回报的公司才能走下一程。'
  },
  {
    date: '2026-08-12',
    title: 'AI新闻 | 国产大模型集体涨价美国降价 + IBM与Together AI签2.4亿美元算力协议 + 微信灰度上线AI帮写 + 扎克伯格万字长文定义超级智能 + DeepSeek招土木工程师建数据中心',
    summary: '今日AI行业五大看点：国产大模型集体涨价（DeepSeek、智谱、月之暗面相继上调API价格），而美国模型却在降价（Anthropic取消Claude Sonnet 5涨价计划），token定价逻辑出现分化；IBM与Together AI签署2.4亿美元协议，将在IBM Cloud部署英伟达HGX B300推理集群；微信灰度上线"AI帮写"和"AI点评"功能，朋友圈AI化正式启动；扎克伯格在Meta官网发表万字哲学宣言，探讨超级智能归属问题；DeepSeek招聘土木工程师，AI基础设施扩张向传统资源领域延伸。',
    newsItems: [
      {
        title: '国产模型涨价，美国模型降价，token价值规律',
        summary: '国产大模型正在集体涨价：DeepSeek预告API即将提价且"预计涨幅较大"，智谱年内数次上调API价格，月之暗面推出Kimi-K3后也将旗舰API价格上调。与此同时，Anthropic取消了Claude Sonnet 5原定50%的涨价计划。中美大模型在token定价上出现分化趋势，背后反映的是成本结构、竞争格局和商业模式差异。',
        source: '虎嗅',
        category: '大模型',
        url: 'https://www.huxiu.com/article/4882396.html'
      },
      {
        title: 'IBM与Together AI签署2.4亿美元云服务协议',
        summary: 'IBM与Together AI签署为期多年、价值2.4亿美元的协议，将在IBM Cloud上部署大规模英伟达HGX B300推理集群，预计2027年第一季度投入使用。Together AI将利用该集群为企业客户提供开源模型推理服务，标志着AI算力基础设施投资持续升温。',
        source: '36氪',
        category: '硬件',
        url: 'https://www.36kr.com/newsflashes/3935098902166661'
      },
      {
        title: '微信灰度上线"AI帮写"和"AI点评"功能',
        summary: '微信近日灰度上线两项AI功能："AI帮写"可在发朋友圈时根据照片和草稿生成文案；"AI点评"可针对好友评论给出回复建议。两项功能仍需用户手动确认最终发布和回复内容。微信迈出了AI化的重要一步，12亿用户基数的AI化改造将深刻影响社交体验。',
        source: '虎嗅',
        category: '应用',
        url: 'https://www.huxiu.com/article/4882362.html'
      },
      {
        title: '扎克伯格发表万字长文，重新定义"超级智能应该属于谁"',
        summary: '8月10日，扎克伯格在Meta官网发表超过8000字的哲学宣言《The Future is for Everyone》，核心问题是：当超级智能变得比人类更强，它应该被谁掌控？这不是产品发布公告或技术路线说明，而是Meta CEO对AI未来归属问题的系统性表态，彰显科技巨头在AI治理话语权上的争夺。',
        source: '开源中国',
        category: '产业',
        url: 'https://www.oschina.net/news/492836/meta-zuck-thefutureisforeveryone'
      },
      {
        title: 'DeepSeek招土木工程师，科技大厂争锋延伸至传统资源领域',
        summary: 'DeepSeek官网出现招聘信息，招聘土木工程、电气、暖通等专业人才。从招聘土木人才到大手笔布局智算中心，AI正在推动科技公司的资产边界向土地、电力和数据中心延伸。这一微妙信号表明，AI竞争已从算法和模型层面扩展到物理基础设施层面。',
        source: '36氪',
        category: '产业',
        url: 'https://www.36kr.com/newsflashes/3935011899178377'
      }
    ],
    comment: '今日关键词"分化"。国产模型涨价、美国模型降价——大模型token定价正从"价格战"走向"价值战"；IBM 2.4亿美元算力订单、DeepSeek招土木工程师——AI竞争从算法层向物理基础设施层延伸；微信AI化、扎克伯格万字宣言——AI正从技术圈走向全民议题。分化意味着行业正在从"一窝蜂"走向"各找定位"，这是成熟的信号。'
  },
  {
    date: '2026-08-11',
    title: 'AI新闻 | 英伟达牵头组建5000亿美元AI算力融资平台 + Anthropic联手麦格理GIC建数据中心 + OpenAI完成70亿美元员工持股回购估值达8520亿 + 200位AI专家联名警告经济冲击风险 + 灵巧手半年融资250亿仍未跑出标准手',
    summary: '今日AI行业五大看点：英伟达宣布与阿波罗、贝莱德、黑石等6家顶尖金融机构合作，打造可调动5000亿美元的AI计算基础设施融资平台，从芯片供应商向算力金融巨头转型；Anthropic与麦格理、新加坡主权基金GIC联手成立Theseus Infrastructure数据中心平台；OpenAI完成70亿美元员工持股回购，估值达8520亿美元；斯坦福大学发起公开声明，200位AI专家和经济学家（含16位诺奖得主）联名警告AI可能带来的经济剧变风险；人形机器人灵巧手赛道半年融资250亿元，但仍未形成统一标准。',
    newsItems: [
      {
        title: 'NVIDIA牵头组建5000亿美元人工智能计算基础设施融资平台',
        summary: '英伟达宣布与阿波罗、贝莱德、黑石、布鲁克菲尔德、高盛、KKR六家顶尖金融机构签署谅解备忘录，共同打造一个可调动5000亿美元的AI计算基础设施融资平台。英伟达正从芯片供应商向算力金融巨头转型，深度参与全球AI基础设施投融资格局。',
        source: 'IT之家',
        category: '硬件',
        url: 'https://www.ithome.com/0/988/104.htm'
      },
      {
        title: 'Anthropic、麦格理、GIC宣布数据中心合资项目Theseus Infrastructure',
        summary: 'Anthropic宣布与资产管理企业麦格理、新加坡主权财富基金GIC建立战略合作伙伴关系，三方共同打造Theseus Infrastructure数据中心平台。AI公司正加速锁定算力基础设施资源，确保模型训练和推理的长期扩展能力。',
        source: 'IT之家',
        category: '产业',
        url: 'https://www.ithome.com/0/988/099.htm'
      },
      {
        title: 'OpenAI完成70亿美元员工持股回购，估值达8520亿美元',
        summary: '彭博社报道，OpenAI已完成一轮总额约70亿美元的股票要约回购交易，交易对象为现任和前任员工。此次交易基于8520亿美元估值，反映AI行业头部公司估值仍在持续攀升，员工持股变现需求旺盛。',
        source: 'IT之家',
        category: '投资',
        url: 'https://www.ithome.com/0/988/107.htm'
      },
      {
        title: 'AI带来的最大风险：200位AI专家及经济学家联名警告经济剧变',
        summary: '斯坦福大学数字经济实验室发起公开声明，200多位经济学家和AI专家（含16位诺贝尔经济学奖得主）联名呼吁各国政府、企业和社会立即采取行动，为AI可能带来的经济剧变做好准备。声明聚焦AI对就业、收入分配和社会结构的深层冲击风险。',
        source: '虎嗅',
        category: '产业',
        url: 'https://www.huxiu.com/article/4882126.html'
      },
      {
        title: '半年融资250亿，灵巧手还没跑出"标准手"',
        summary: '人形机器人灵巧手赛道半年融资达250亿元，但仍未形成统一的"标准手"产品。摩根士丹利测算灵巧手在特斯拉Optimus物料成本中占约17.3%，硬件成本占整个本体10%以上。灵巧手被视为人形机器人最后、也最难啃的一块短板，量产元年与泡沫之争并存。',
        source: '虎嗅',
        category: '硬件',
        url: 'https://www.huxiu.com/article/4882124.html'
      }
    ],
    comment: '今日关键词"算力金融化"。英伟达5000亿美元融资平台、Anthropic联手主权基金建数据中心——AI算力正从"技术竞赛"进入"金融竞赛"阶段，资本规模决定算力规模、算力规模决定模型能力。200位专家联名警告经济冲击，则提醒我们：AI的颠覆速度可能远超社会适应速度。'
  },
  {
    date: '2026-08-10',
    title: 'AI新闻 | 苹果测试长鑫存储芯片 + 首个全国产10万卡AI超集群投用 + 摩尔线程半年营收暴增147% + 创始人模式挽救谷歌AI + AI制药新痛点',
    summary: '今日AI行业五大看点：苹果被曝正在iPhone和MacBook中测试长鑫存储芯片，以缓解AI热潮引发的内存短缺，中美芯片供应链深度交织；我国首个全国产10万卡人工智能超集群正式投用，全国算力"一张网"加速成形；国产GPU龙头摩尔线程上半年营收17.36亿元，同比大增147%，已超2025年全年；虎嗅深度分析称"创始人模式"才能挽救谷歌AI，揭示谷歌内部算力分配困局与Anthropic合作内幕；AI制药领域面临模型可解释性不足的新痛点，制约AI药物最终成药率。',
    newsItems: [
      {
        title: '苹果被曝正在测试长鑫科技存储芯片，用于iPhone和MacBook',
        summary: '据《华尔街日报》报道，苹果正在iPhone和MacBook等产品线中测试长鑫存储（CXMT）的存储芯片，以缓解因AI热潮引发的内存短缺问题。苹果已与中国最大芯片制造商长鑫存储就零部件供应展开初步洽谈，标志着中美芯片供应链的深度融合。',
        source: '36氪',
        category: '硬件',
        url: 'https://www.36kr.com/newsflashes/3932875348868225'
      },
      {
        title: '首个全国产10万卡AI超集群投用，全国算力"一张网"加速成形',
        summary: '据国家发展改革委消息，我国首个全国产10万卡人工智能超集群正式投用，标志着算力基础设施建设迈入10万卡级部署新阶段。全国多个算力节点迎来新一轮扩容，算力底座进一步夯实，全国算力"一张网"加速成形。',
        source: '36氪',
        category: '硬件',
        url: 'https://www.36kr.com/newsflashes/3931758095089026'
      },
      {
        title: '摩尔线程上半年营收大幅增长147.42%，S5000智算集群实现规模化销售',
        summary: '国产GPU龙头摩尔线程发布2026年半年度报告，上半年实现营收17.36亿元，同比大增147.42%，已超2025年全年营收；毛利总额9.89亿元，同比增长103.78%。S5000智算集群实现规模化销售，盈利能力显著改善。',
        source: '36氪',
        category: '硬件',
        url: 'https://www.36kr.com/newsflashes/3932023616306563'
      },
      {
        title: '创始人模式才能挽救谷歌AI',
        summary: '虎嗅深度分析谷歌AI困局：Jeff Dean决定辞职创业，谷歌内部算力优先给Anthropic挣钱，又从马斯克SpaceX高价租借算力。文章认为只有"创始人模式"的创业文化才能挽救谷歌在AI竞赛中的颓势，揭示了大公司内部创新的两难。',
        source: '虎嗅',
        category: '产业',
        url: 'https://www.huxiu.com/article/4881815.html'
      },
      {
        title: 'AI制药，新痛点',
        summary: '2026BPD生物药工艺发展大会上，多位制药业人士指出AI制药面临模型可解释性不足的新痛点，制约AI药物的最终成药率。AI制药虽然能加速分子筛选和工艺优化，但"黑箱"问题让监管审批和临床转化面临更大挑战。',
        source: '虎嗅',
        category: '应用',
        url: 'https://www.huxiu.com/article/4881816.html'
      }
    ],
    comment: '今日关键词"算力自主"。苹果测试国产芯片、10万卡超集群投用、摩尔线程营收翻倍——中国AI算力供应链正在从"卡脖子"走向"自主可控"，而谷歌的困局则提醒我们：算力之外，组织文化同样是AI竞赛的胜负手。'
  },
  {
    date: '2026-08-09',
    title: 'AI新闻 | Apple Intelligence接入阿里千问 + 腾讯WorkBuddy成最高优先级AI产品 + Cloudflare称AI机器人流量已超人类 + 亚马逊数据中心或成美国最大碳排放源 + 湖北首家宇树科技产业学院成立',
    summary: '今日AI行业五大看点：苹果官网显示Apple Intelligence可配合阿里千问模型工作，国行AI落地再进一步；腾讯WorkBuddy被曝为AI应用战略优先级最高产品，马化腾亲自参与产品会议，内部"一路绿灯"；Cloudflare披露AI机器人流量已于5月正式超过人类流量，预计五年后人机流量比达1:1000；亚马逊在得州筹建数据中心配套天然气发电厂，获批年排3300万吨CO₂，或成美国最大碳排放源；湖北省首家宇树科技产业学院成立，聚焦机器人调试运维人才培育。',
    newsItems: [
      {
        title: 'Apple智能可配合阿里千问模型工作',
        summary: '苹果官网显示，Apple Intelligence可配合阿里巴巴千问模型工作。这意味着苹果国行AI功能正式落地，选择了阿里通义千问作为中国大陆地区的AI合作伙伴，标志着国际科技巨头与国内大模型厂商的深度合作。',
        source: '36氪',
        category: '应用',
        url: 'https://www.36kr.com/newsflashes/3930655950060672'
      },
      {
        title: '内部"一路绿灯"：WorkBuddy已成腾讯AI应用战略优先级最高产品之一',
        summary: '腾讯WorkBuddy正经历近年来少见的饱和式产品投放，从北京知春路铺到深圳高新园。据CSIG人士透露，WorkBuddy已成为腾讯AI应用中战略优先级最高的产品之一，马化腾亲自参与产品会议，团队提出的算力、技术和市场资源需求大多能快速获批。',
        source: 'IT之家',
        category: '产业',
        url: 'https://www.ithome.com/0/987/446.htm'
      },
      {
        title: 'Cloudflare：AI机器人流量已超越人类，预计五年后人机流量比达1:1000',
        summary: 'Cloudflare在Q2财报电话会议披露，AI机器人等非人类流量已于2026年5月正式超过人类流量，比CEO此前预测的2027年底大幅提前。Cloudflare进一步预测五年后非人类流量将达人类流量的1000倍，人类将成为"互联网上四舍五入的误差"。',
        source: 'IT之家',
        category: '产业',
        url: 'https://www.ithome.com/0/987/438.htm'
      },
      {
        title: '亚马逊筹建得州数据中心，配套发电厂或成美国最大碳排放源',
        summary: '亚马逊正在得克萨斯州佩科斯县筹建数据中心，并计划投资建设配套天然气发电厂。该发电厂已获准每年排放3300万吨CO₂，将超过美国目前任何一座发电厂。数据中心面临的政治阻力正因其碳排放和电价影响而加大。',
        source: 'IT之家',
        category: '硬件',
        url: 'https://www.ithome.com/0/987/453.htm'
      },
      {
        title: '湖北首家宇树科技产业学院成立，聚焦机器人人才培育',
        summary: '湖北省首家宇树科技产业学院在长江工程职业技术学院成立，实行"企业专家任院长、校内教授任执行副院长"双院长制，聚焦机器人调试、运维、技术支持等市场紧缺岗位，精准培育具身智能领域紧缺人才。',
        source: '36氪',
        category: '产业',
        url: 'https://www.36kr.com/newsflashes/3930542821277061'
      }
    ],
    comment: '今日关键词"AI全面渗透"。苹果牵手千问落地国行、腾讯All in WorkBuddy、AI流量超越人类——AI正从工具变成基础设施，而数据中心碳排放和机器人人才缺口则提醒我们：基础设施的代价和人才培养的紧迫同样不容忽视。'
  },
  {
    date: '2026-08-08',
    title: 'AI新闻 | 千禧对冲基金联手Anthropic打造智能风控 + SpaceX与英伟达合作发射百万颗卫星建天基超算 + 美国政府砸110亿美元成AI最猛投资人 + Jeff DeanYC访谈谈AI 1%原则 + Prime Agent开源编程Agent超越人类专家基线',
    summary: '今日AI行业五大看点：千禧管理对冲基金与Anthropic合作开发AI驱动风险分析师，从不同资产类别挖掘风险洞见，标志顶级金融机构全面拥抱大模型；SpaceX与英伟达联手打造Starmind天基超算系统，计划发射100万颗配备Rubin和Vera CPU的AI卫星；美国政府已向Intel等11家AI芯片公司投入约110.5亿美元股权或准股权投资，成为AI领域最激进投资人；Jeff Dean在YC最新访谈中分享"构建AI的1%原则"；Prime Intellect开源Prime Agent编程Agent，在ARC-AGI 3基准测试上超越人类专家基线。',
    newsItems: [
      {
        title: '千亿美元级对冲基金入局AI：联手Anthropic打造"智能风控大脑"',
        summary: '千禧管理（Millennium Management）正与Anthropic展开合作，共同开发一款由AI驱动的风险分析师，并扩大Anthropic模型在这家顶级对冲基金中的应用范围。该工具将帮助人类风险管理人员提供信息，并从不同资产类别中挖掘新的风险洞见。',
        source: '36氪',
        category: '产业',
        url: 'https://www.36kr.com/newsflashes/3929430069755016'
      },
      {
        title: '马斯克与黄仁勋联手：SpaceX将与英伟达合作发射100万颗AI卫星建天基超算',
        summary: 'SpaceX将与英伟达合作开发天基超算系统Starmind，计划发射100万颗卫星，每颗配备英伟达Rubin和Vera CPU，实现数据中心级别算力。两位科技巨头联手将AI算力推向太空，构建前所未有的天基计算基础设施。',
        source: '虎嗅',
        category: '硬件',
        url: 'https://www.huxiu.com/article/4881565.html'
      },
      {
        title: '一年砸下110亿美元，白宫才是AI圈最猛投资人',
        summary: '美国政府针对Intel、GlobalFoundries、xLight等11家AI芯片及上游基础设施公司，已公布总额约110.5亿美元的股权或准股权投资安排，仅Intel一家就获89亿美元。美国政府正成为AI领域最激进的投资人之一。',
        source: '虎嗅',
        category: '投资',
        url: 'https://www.huxiu.com/article/4881555.html'
      },
      {
        title: 'Jeff Dean最新YC现场访谈：构建人工智能的1%原则',
        summary: '从MapReduce到TensorFlow再到TPU芯片，Jeff Dean的名字几乎出现在谷歌每一个技术突破中。在YC最新访谈中，他分享了构建AI系统的核心原则与思考框架，强调持续改进1%的长期主义方法论。',
        source: '虎嗅',
        category: '大模型',
        url: 'https://www.huxiu.com/article/4881552.html'
      },
      {
        title: 'Prime Agent开源发布：能自我改进的编程Agent，ARC-AGI 3超越人类专家基线',
        summary: 'Prime Intellect发布Prime Agent，一个开源编程Agent Harness，核心设计围绕Recursive Language Model和Continual Harness两个抽象。在ARC-AGI 3基准测试上，Prime Agent超越人类专家基线，展示了AI编程能力的最新突破。',
        source: '开源中国',
        category: '应用',
        url: 'https://www.oschina.net/news/489878/primeintellect-prime-agent'
      }
    ],
    comment: '今日关键词"资本涌入与能力跃迁"。从千禧对冲基金到白宫110亿美元，资本正以前所未有的速度涌入AI赛道；SpaceX百万颗AI卫星把算力送上太空，想象力拉满；Prime Agent在ARC-AGI 3超越人类专家基线，则提醒我们AI编程能力正在快速逼近甚至超越顶尖人类水平。'
  },
  {
    date: '2026-08-07',
    title: 'AI新闻 | 字节跳动讨论训练5万亿参数模型 + 特斯拉168亿美元建AI芯片工厂 + 阿里云Wan3.0视频模型公测 + ChatGPT接入Adobe全套创意工具 + 高盛上调AI服务器PCB市场预测至840亿美元',
    summary: '今日AI行业五大看点：字节跳动正在讨论训练参数规模超5万亿的大模型，超越阿里Qwen和月之暗面K3，成为国内已知最大参数模型；SpaceX与特斯拉首期投入168亿美元在得州建设Terafab先进AI芯片制造基地，马斯克誓言把尖端制造带回美国；阿里云视频生成模型Wan3.0开启公测，单次可生成30秒视频并首次支持文档格式输入；OpenAI与Adobe扩大合作，ChatGPT可直接调用Photoshop、Lightroom等70多款创意工具；高盛大幅上调AI服务器PCB市场预测，2028年规模将达840亿美元，复合增长率148%。',
    newsItems: [
      {
        title: '字节跳动讨论训练超5万亿参数模型，国内已知最大规模',
        summary: '字节跳动正在讨论训练一个参数规模超5万亿的模型，超过阿里的Qwen 3.8-Max（2.4万亿参数）和月之暗面的K3（2.8万亿参数），成为国内已知参数规模最大的模型。该计划仍处于早期阶段，将由Seed Foundation负责人项亮主导。为此Seed团队正在重新梳理组织架构，划分职责并分配资源。',
        source: '36氪',
        category: '大模型',
        url: 'https://www.36kr.com/newsflashes/3928046064416900'
      },
      {
        title: '特斯拉Terafab晶圆厂落地得州，SpaceX与特斯拉投168亿美元建AI芯片基地',
        summary: 'SpaceX宣布将与特斯拉首期投入168亿美元在得克萨斯州建设Terafab先进AI芯片制造基地。项目由马斯克规划，旨在满足两家公司未来快速增长的芯片需求。双方预计未来数年所需算力将远超现有全球芯片供应规模，合计算力需求预计突破1太瓦。',
        source: 'IT之家',
        category: '硬件',
        url: 'https://www.ithome.com/0/986/766.htm'
      },
      {
        title: '阿里云视频生成模型Wan3.0开启公测，支持文档格式输入',
        summary: '阿里云宣布视频生成模型Wan3.0开启公测，单次可生成30秒视频，首次支持doc、xls、ppt、pdf、md等文档格式输入。480P/720P/1080P的API价格分别为0.3/0.6/1.2元/秒，API接口将于近期全量开放。',
        source: '36氪',
        category: '应用',
        url: 'https://www.36kr.com/newsflashes/3928029719607680'
      },
      {
        title: 'ChatGPT可调用Adobe Photoshop、Lightroom等70多款创意工具',
        summary: 'Adobe借助OpenAI的Apps SDK将合作范围进一步扩大，用户安装插件后可直接在ChatGPT中调用Photoshop、Premiere、Acrobat、Lightroom、Illustrator和InDesign等70多款Adobe工具，实现AI驱动的专业创意工作流。',
        source: 'IT之家',
        category: '应用',
        url: 'https://www.ithome.com/0/986/769.htm'
      },
      {
        title: '高盛大幅上调AI服务器PCB市场预测，2028年将达840亿美元',
        summary: '高盛在最新报告中大幅上调AI服务器相关市场规模预测。全球AI服务器PCB市场2027年预计达375亿美元（上调38%），2028年增至840亿美元；CCL市场2028年有望达480亿美元。2026至2028年复合年增长率分别达148%和161%。',
        source: '36氪',
        category: '产业',
        url: 'https://www.36kr.com/newsflashes/3928039823735177'
      }
    ],
    comment: '今日关键词"规模竞赛与全栈整合"。字节5万亿参数模型刷新国内纪录，特斯拉168亿美元自建芯片工厂，说明AI竞争已从模型层延伸至算力基础设施层；Wan3.0公测和ChatGPT接入Adobe全套工具，则表明AI正加速渗透内容创作和生产力工具链；高盛上调PCB市场预测至840亿美元，从供应链侧印证AI硬件需求仍在指数级增长。'
  },
  {
    date: '2026-08-06',
    title: 'AI新闻 | 谷歌AI巨震Jeff Dean离职创业 + Anthropic为Claude组建内部芯片团队 + 谷歌洽谈15亿美元收购AI编码Agent公司Mechanize + 阶跃星辰确立大模型与智能体终端双线战略 + Cloudflare开源AI智能体平台Cloudflare OS',
    summary: '今日AI行业五大看点：谷歌AI遭遇人事巨震，首席科学家Jeff Dean宣布离职，与Sanjay Ghemawat、Oriol Vinyals等三位大牛出走创业，Gemini负责人Demis Hassabis转任主席；Anthropic确认正在为Claude组建内部芯片团队，加速自研算力布局；谷歌正与AI编码代理初创公司Mechanize洽谈超15亿美元收购交易；阶跃星辰内部确立大模型与智能体终端两条战略线，手机业务独立运营并将进入海外市场；Cloudflare宣布开源面向AI智能体和企业工作流程的平台Cloudflare OS。',
    newsItems: [
      {
        title: '谷歌AI一夜巨震：Gemini换帅，首席科学家Jeff Dean带三个大牛出走创业',
        summary: 'Google DeepMind负责人Demis Hassabis宣布卸下日常管理职责，转任DeepMind主席兼Alphabet首席科学家。几乎同一时间，谷歌灵魂人物、首席科学家Jeff Dean宣布离职，将与Sanjay Ghemawat、Oriol Vinyals等三位AI大牛共同创业。这是谷歌AI团队近年来最大规模的人事震荡。',
        source: '虎嗅',
        category: '大模型',
        url: 'https://www.huxiu.com/article/4880992.html'
      },
      {
        title: 'Anthropic确认正在为Claude组建一支内部芯片团队',
        summary: '据报道，Anthropic确认正在为Claude组建内部芯片团队，加速自研AI芯片布局。此举标志头部AI公司正从依赖英伟达GPU转向自研算力方案，以降低对外部供应链的依赖并优化推理成本。继谷歌TPU、亚马逊Trainium之后，Anthropic也加入芯片自研阵营。',
        source: '36氪',
        category: '硬件',
        url: 'https://www.36kr.com/newsflashes/3926632308553861'
      },
      {
        title: '谷歌正与AI编码代理初创公司Mechanize洽谈超15亿美元收购交易',
        summary: '据报道，谷歌正与人工智能编码代理初创公司Mechanize洽谈一项价值超过15亿美元的收购交易。Mechanize专注于AI编码代理技术，此举反映谷歌在AI开发工具领域的加速布局，也显示AI编码Agent赛道估值持续攀升。',
        source: '36氪',
        category: '投资',
        url: 'https://www.36kr.com/newsflashes/3926597105367424'
      },
      {
        title: '阶跃星辰确立大模型与智能体终端双线战略，手机业务独立运营',
        summary: '阶跃星辰内部正按两条战略线推进：一条以大模型为核心，另一条以智能体终端为核心。手机业务已放入新公司独立运营，正在搭建海外商业化团队，计划向海外销售大模型API并以语音模型为主。大模型和手机都将进入海外市场，两条业务线相互促进。',
        source: 'IT之家',
        category: '大模型',
        url: 'https://www.ithome.com/0/986/233.htm'
      },
      {
        title: 'Cloudflare宣布开源Cloudflare OS：面向AI智能体和企业工作的开放平台',
        summary: 'Cloudflare宣布开源名为"Cloudflare OS"的AI平台项目，定位为面向智能体、应用程序及企业工作流程的开放平台。该平台并非传统操作系统，而是一套用于组织内部AI协作和任务执行的基础平台，用户可为工作空间设定目标，平台能调用组织已有的知识和技能自动执行任务。',
        source: 'IT之家',
        category: '应用',
        url: 'https://www.ithome.com/0/986/252.htm'
      }
    ],
    comment: '今日关键词"人事震荡与Agent崛起"。谷歌AI遭遇Jeff Dean离职等巨震，一个时代落幕；Anthropic自研芯片、谷歌15亿美元收购Mechanize，说明AI公司正从"模型竞赛"转向"全栈能力竞赛"——芯片、Agent工具、平台生态缺一不可；阶跃星辰把手机作为大模型触达用户的载体，Cloudflare开源AI Agent平台，则预示AI正从云端走向终端、从工具走向协作平台。'
  },
  {
    date: '2026-08-05',
    title: 'AI新闻 | Anthropic签100亿美元算力协议 + 韩国2.5万亿韩元建AI算力中心 + 台积电CoWoS封装产能告急 + OpenAI内部模型Astra破解数学难题 + 灵光App闪应用创作者超400万',
    summary: '今日AI行业五大看点：Anthropic与一家AI云初创公司签署价值100亿美元的算力协议，AI算力军备竞赛持续升温；由三星SDS牵头的韩国国家人工智能算力中心正式开工，总投资2.5万亿韩元，预计2028年竣工；英伟达GPU订单挤爆台积电CoWoS封装产线，台积电被迫将核心封装产能进一步外包给日月光等厂商；OpenAI内部模型Astra在数学及理论计算机科学领域解出10个悬疑多年的开放难题；灵光App宣布"闪应用"创作者超400万人，绝大多数为无编程背景的普通用户，AI应用生态持续扩展。',
    newsItems: [
      {
        title: 'Anthropic与AI云初创公司签署价值100亿美元算力协议',
        summary: '据报道，Anthropic与一家人工智能云初创公司签署了一项价值100亿美元的算力协议。此举标志AI算力军备竞赛持续升温，头部AI公司正通过大额长期合同锁定算力资源，以确保模型训练和推理的持续扩展能力。',
        source: '36氪',
        category: '产业',
        url: 'https://www.36kr.com/newsflashes/3925172170324099'
      },
      {
        title: '由三星SDS牵头的韩国国家人工智能算力中心正式开工',
        summary: '韩国科学技术信息通信部宣布，总投资2.5万亿韩元的人工智能算力中心正式开工。项目占地约4.8万平方米，预计2028年竣工。去年三星SDS联合NAVER云、Kakao等组建联合体中标该项目，旨在增强韩国AI技术竞争力。',
        source: '36氪',
        category: '硬件',
        url: 'https://www.36kr.com/newsflashes/3925199434611072'
      },
      {
        title: 'CoWoS封装产能告急，台积电进一步扩大外包产能',
        summary: '英伟达GPU订单把台积电CoWoS封装产线挤到极限，台积电决定将CoW（晶圆上芯片）封装产能进一步外包给日月光等封测厂商。CoWoS是台积电用于AI芯片的2.5D封装技术，AI处理器位于中心，HBM环绕四周通过中介层连接。',
        source: '36氪',
        category: '硬件',
        url: 'https://www.36kr.com/newsflashes/3925154441787525'
      },
      {
        title: 'OpenAI内部模型Astra解出10个数学开放难题，引发"数学基础危机"讨论',
        summary: 'OpenAI内部模型Astra在数学及理论计算机科学领域取得重大突破，解出了10个悬疑多年的开放难题或取得实质性进展，涵盖高维几何、编码理论、算术电路复杂度、群论等领域。求解这些问题至少需要10位数学家，引发业界对AI是否正在制造"数学基础危机"的深度讨论。',
        source: '虎嗅',
        category: '大模型',
        url: 'https://www.huxiu.com/article/4880664.html'
      },
      {
        title: '灵光App闪应用创作者超400万人，AI应用生态持续扩展',
        summary: '灵光App宣布平台"闪应用"创作者已超400万人，其中绝大多数为无编程背景的普通用户，包括学生、教师、心理疗愈师等。游戏化是当前最活跃趋势，"模拟器"成为上半年最热门类型，诞生近万个相关应用。AI应用生态正在进一步扩展。',
        source: '36氪',
        category: '应用',
        url: 'https://www.36kr.com/newsflashes/3925163486034309'
      }
    ],
    comment: '今日关键词"算力饥渴与AI破圈"。Anthropic 100亿美元算力协议、韩国国家级算力中心开工、台积电CoWoS产能告急——三条新闻共同指向AI算力的全球性短缺已从芯片蔓延到封装和基础设施；OpenAI内部模型破解10个数学难题，说明AI正在突破人类智力边界；而灵光App 400万无编程背景的创作者，则展示了AI工具正在让"做应用"变成人人可为的事。'
  },
  {
    date: '2026-08-04',
    title: 'AI新闻 | 中国AI产业规模超1.2万亿同比增40% + 韩国AI芯片独角兽DeepX估值飙至22亿美元 + 摩根士丹利预计云计算支出2027年达1.2万亿美元 + Genspark发布全功能AI办公套件GenOffice + AI基建催生环保新赛道',
    summary: '今日AI行业五大看点：中国信通院测算2025年我国人工智能产业规模超1.2万亿元，同比增长40%，AI企业超6600家；韩国AI芯片设计企业DeepX估值暴涨4倍至22亿美元，反映AI芯片投资热度不减；摩根士丹利将全球云计算资本支出预期上调至2027年1.2万亿美元，AI需求持续超过供应；Genspark创始人景鲲发布全功能AI办公套件GenOffice，免费开源且1周开发完成；AI基建快速扩张催生环保新需求，水处理、节能改造等方向成为新增长点。',
    newsItems: [
      {
        title: '中国信通院：2025年我国人工智能产业规模超1.2万亿元，同比增长40%',
        summary: '中国信息通信研究院测算，2025年我国人工智能产业规模超1.2万亿元，同比增长40%。截至2026年6月，AI企业数量超6600家，全球占比达15%，已形成覆盖基础底座、模型框架、行业应用的完整产业体系。',
        source: '36氪',
        category: '产业',
        url: 'https://www.36kr.com/newsflashes/3923769935444355'
      },
      {
        title: '韩国芯片独角兽DeepX估值飙升4倍至22亿美元',
        summary: '韩国AI芯片设计企业DeepX完成新一轮融资，估值较上一轮暴涨约4倍至22亿美元。公司从现有投资方获得420亿韩元资金，反映出市场对AI产业链相关公司的投资热情依旧高涨。',
        source: '36氪',
        category: '投资',
        url: 'https://www.36kr.com/newsflashes/3923786103404676'
      },
      {
        title: '摩根士丹利预计云计算支出2027年将激增至1.2万亿美元',
        summary: '摩根士丹利预计全球云计算资本支出将在2027年达1.2万亿美元，同比增长30%，较此前估算高出1700亿美元。美国四大超大规模云服务提供商仍面临容量限制，AI需求持续超过供应。Alphabet、Amazon和Meta均上调了2026年资本支出指引。',
        source: '36氪',
        category: '产业',
        url: 'https://www.36kr.com/newsflashes/3923764104460416'
      },
      {
        title: '对话景鲲：AI产品的All in One，是上下文的All in One',
        summary: 'Genspark首次亮相AGI Playground，创始人景鲲发布全功能AI办公套件GenOffice，免费开源，支持PC和Mac双端，开发周期仅1名工程师、1周时间。景鲲认为AI产品的All in One本质是上下文的All in One，而非简单功能堆砌。',
        source: '虎嗅',
        category: '应用',
        url: 'https://www.huxiu.com/article/4880378.html'
      },
      {
        title: 'AI基建正长出新一轮环保增量，4个方向值得关注',
        summary: '算力中心越密集，水处理、节能改造、能源协同和安全退役的新需求就越多。环保行业正从AI基建的旁观者变为参与者，当算力设施从建设期走向运行期，环保与AI的连接正在形成新的产业增量。',
        source: '虎嗅',
        category: '产业',
        url: 'https://www.huxiu.com/article/4880385.html'
      }
    ],
    comment: '今日关键词"AI的规模效应"。中国AI产业规模破1.2万亿、云计算支出预计达1.2万亿美元，数字背后是AI从实验室走向基础设施的不可逆趋势。韩国AI芯片独角兽估值4倍暴涨，说明资本仍在加速押注上游算力。而Genspark用1人1周做出AI办公套件，则展示了AI工具本身的效率革命——当开发门槛降到这个程度，"做产品"的定义正在被重写。'
  },
  {
    date: '2026-08-03',
    title: 'AI新闻 | 谷歌地球叫停AI生图防假信息 + AI产业扩张致内存芯片短缺波及MacBook Air + 特斯拉拆汽车产线为Optimus机器人腾位 + AI医疗诊断一分钟出报告90%无需修改 + AI不会成世界主人但AI公司可能会',
    summary: '今日AI行业五大看点：谷歌地球推出AI图像生成功能不到48小时即被叫停，因可将虚构场景叠加在真实卫星图像上散播假信息；AI产业快速扩张导致全球内存芯片短缺，已从Mac mini蔓延至MacBook Air，部分型号需等待至8月下旬；特斯拉拆除弗里蒙特工厂Model S/X产线，为首代Optimus人形机器人产线腾出空间，标志从汽车公司向机器人公司转型；AI医疗诊断工具实现一分钟出报告、90%无需修改，大幅提升诊断效率；虎嗅深度分析指出AI本身不会统治世界，但AI公司可能通过控制数据和算力获得前所未有的权力。',
    newsItems: [
      {
        title: '谷歌地球紧急叫停AI生图：虚构场景可叠加卫星图散播假信息',
        summary: '谷歌推出谷歌地球AI图像生成功能不到48小时后宣布暂停服务。专家警告该工具可将虚构场景叠加在真实卫星图像上，容易被用于散播假信息。谷歌表示将加强安全防护后再重新上线，凸显AI生成内容在真实地理场景中的应用风险。',
        source: '36氪',
        category: '应用',
        url: 'https://www.36kr.com/newsflashes/3922077104664199'
      },
      {
        title: 'AI产业扩张引发内存芯片短缺，苹果MacBook Air出现供应紧张',
        summary: '据彭博社古尔曼报道，全球内存芯片短缺正影响苹果Mac产品供应。AI企业大量采购高性能存储芯片挤压了消费电子市场，Mac mini和Mac Studio已出现供应限制，如今问题扩展至MacBook Air，部分型号需等待至8月下旬才能发货。',
        source: 'IT之家',
        category: '硬件',
        url: 'https://www.ithome.com/0/984/822.htm'
      },
      {
        title: '汽车回血AI烧钱，特斯拉拆汽车产线为Optimus机器人腾位',
        summary: '2026年Q2特斯拉拆除弗里蒙特工厂原有Model S/X生产线，安装首代Optimus人形机器人产线。同日第1000万辆特斯拉在该工厂下线。从汽车产量破千万到产线为机器人腾空间，特斯拉正完成从汽车公司向机器人公司的战略性转型。',
        source: '虎嗅',
        category: '产业',
        url: 'https://www.huxiu.com/article/4880103.html'
      },
      {
        title: '一分钟出报告、90%无需修改，AI把医疗诊断效率拉满了',
        summary: '上海影禾医脉智能科技首席医疗官孟滔介绍，其AI医疗数据治理系统可将诊断报告生成时间缩短至一分钟，且90%的报告无需医生修改。该系统通过标准化数据治理，将原本混沌的医疗数据转化为可治理、可应用的结构化数据。',
        source: '虎嗅',
        category: '应用',
        url: 'https://www.huxiu.com/article/4880091.html'
      },
      {
        title: 'AI不会成为世界的主人，但AI公司可能会',
        summary: '虎嗅深度分析指出，近期AI连续推翻数学猜想（Erdős单位距离猜想、雅可比猜想等）预示深层危机：AI本身不会统治世界，但掌握数据和算力的AI公司可能获得前所未有的权力。文章呼吁关注AI权力集中带来的社会结构性风险。',
        source: '虎嗅',
        category: '产业',
        url: 'https://www.huxiu.com/article/4880099.html'
      }
    ],
    comment: '今日关键词"AI的边界与代价"。谷歌地球AI生图48小时即被叫停，说明AI能力越强、滥用风险越大；内存芯片短缺从数据中心蔓延到消费端，AI的"饥饿"正在挤压普通消费者的利益；特斯拉拆汽车产线给机器人腾位，是产业转型的标志性一幕；AI医疗一分钟出报告展示了落地价值，而"AI公司可能成为世界主人"的警告则提醒我们：技术本身中性，但掌控技术的权力结构需要被审视。'
  },
  {
    date: '2026-08-02',
    title: 'AI新闻 | 美企换上中国大模型降本 + OpenAI IPO或推迟至明年 + 浙江定AI OPC标准 + 韩国半导体出口暴增179% + WPS展示AI Agent灵犀',
    summary: '今日AI行业五大看点：部分美国企业开始转向中国大模型以降低成本，Coinbase使用Kimi K3、Airbnb采用阿里Qwen模型，中国AI模型性价比获全球认可；OpenAI因投资者对现金消耗速度的担忧及Anthropic的竞争压力，IPO或推迟至明年；浙江实施人工智能OPC术语团体标准，将AI一人公司纳入规范定义；韩国7月半导体出口暴增179%至410亿美元，AI数据中心投资持续推动芯片需求；金山办公首次参展ChinaJoy展示AI Agent灵犀及WPS Comate。',
    newsItems: [
      {
        title: '部分美国企业换上中国大模型以降低成本',
        summary: '据美联社报道，加密货币交易所Coinbase正转向中国AI模型以降低成本，Airbnb采用阿里巴巴Qwen模型并称赞其"快速且便宜"。《华尔街日报》称月之暗面Kimi K3撼动资本市场，马斯克赞其"令人印象深刻"。中国大模型正以高性价比打开海外市场。',
        source: '36氪',
        category: '大模型',
        url: 'https://www.36kr.com/newsflashes/3920583026929281'
      },
      {
        title: '报道称OpenAI面临投资者担忧与竞争压力，IPO或推迟至明年',
        summary: '据报道OpenAI可能将IPO推迟到明年。部分大投资者对现金消耗速度过快表示担忧，其他投资者已通过向Anthropic投入资金来对冲。Anthropic营收增长近期已超OpenAI，估值也更高，正加速秋季IPO计划。AI行业竞争格局正在发生深刻变化。',
        source: '36氪',
        category: '产业',
        url: 'https://www.36kr.com/newsflashes/3920415886061193'
      },
      {
        title: '浙江实施人工智能OPC术语团体标准：由1名核心自然人主导',
        summary: '浙江省编制的《人工智能OPC术语》团体标准8月1日起实施，将AI OPC（一人公司）界定为由1名核心自然人主导、员工不超过10人、以AI技术研究开发应用或服务为主营业务的公司。这是国内首个对AI一人公司进行规范定义的团体标准。',
        source: '36氪',
        category: '产业',
        url: 'https://www.36kr.com/newsflashes/3920435807923841'
      },
      {
        title: '韩国7月出口飙升创历史第二高，半导体出口同比暴增近180%',
        summary: '韩国7月出口同比飙升近63%至989.9亿美元，创历史第二高。半导体出口暴增179%至410亿美元，连续两个月突破400亿大关。AI数据中心投资项目推动对美出口额激增68.7%达174亿美元，全球AI算力需求持续重塑芯片产业格局。',
        source: '36氪',
        category: '硬件',
        url: 'https://www.36kr.com/newsflashes/3920386651319944'
      },
      {
        title: '金山办公WPS新版本上线，首次参展ChinaJoy展示AI Agent灵犀',
        summary: '金山办公首次参展ChinaJoy，现场展示独立AI办公Agent灵犀和面向研发场景的WPS Comate。同日WPS新版本正式上线，新增统一"存储管理"入口，集中磁盘占用查看、缓存清理和存储路径调整等功能，安装路径可分别设置。',
        source: '36氪',
        category: '应用',
        url: 'https://www.36kr.com/newsflashes/3920632482491776'
      }
    ],
    comment: '今日关键词"中国模型出海与OpenAI困局"。美国企业开始用中国大模型降本，说明性价比才是硬道理；OpenAI IPO推迟、Anthropic加速上市，AI行业格局正在从"一家独大"走向"双雄对峙"；浙江定义AI一人公司标准、韩国半导体因AI需求暴增179%，AI的影响正从软件层渗透到组织形态和全球贸易格局。'
  },
];
