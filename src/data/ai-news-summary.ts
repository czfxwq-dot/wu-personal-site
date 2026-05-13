// AI新闻汇总数据 — 每天一条汇总型，包含多条新闻整合
// 格式：date, title(汇总标题), summary(汇总摘要), newsItems(具体新闻列表), comment(一句话点评)
export interface NewsItem {
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  source: string;
  category: string;
  categoryEn: string;
}

export interface DailyNewsSummary {
  date: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  newsItems: NewsItem[];
  comment: string;
  commentEn: string;
}

export const dailyNewsSummaries: DailyNewsSummary[] = [
  {
    date: '2026-05-07',
    title: 'AI新闻 | MiroThinker暂停中国服务 + 康宁英伟达5亿美元合作 + Arm涨超13%',
    titleEn: 'AI News | MiroThinker Suspends China Services + Corning-NVIDIA $500M Partnership + Arm Surges 13%+',
    summary: '今日AI行业三大看点：陈天桥旗下AI公司MiroMind暂停中国大陆服务、康宁与英伟达达成5亿美元股权融资深化合作、美股Arm涨超13%带动AI芯片板块集体走强。',
    summaryEn: 'Three major AI highlights: MiroMind (founded by Chen Tianqiao) suspends mainland China services, Corning and NVIDIA reach $500M equity financing deal, US stock Arm surges 13%+ driving AI chip sector rally.',
    newsItems: [
      {
        title: 'MiroMind暂停中国大陆及港澳地区服务',
        titleEn: 'MiroMind Suspends Services in Mainland China, Hong Kong and Macau',
        summary: 'MiroMind公司宣布，旗下MiroThinker智能体服务（dr.miromind.ai网页版与MiroMind移动应用）将于2026年5月12日起暂停向中国大陆、香港、澳门地区提供，恢复时间待定。MiroMind是盛大集团创始人陈天桥创办的AI研究公司。官网不受影响。',
        summaryEn: 'MiroMind announced that its MiroThinker agent services will be suspended in mainland China, Hong Kong, and Macau starting May 12, 2026. MiroMind is an AI research company founded by Shanda Group founder Chen Tianqiao.',
        source: '36氪/第一财经',
        category: '大模型',
        categoryEn: 'LLM'
      },
      {
        title: '康宁与英伟达达成5亿美元股权融资协议',
        titleEn: 'Corning and NVIDIA Reach $500M Equity Financing Agreement',
        summary: '康宁公司与英伟达签署证券购买协议，康宁向英伟达发行总价5亿美元的认股权证。英伟达获得可购买最多1500万股康宁普通股的认股权证，行权价每股180美元；另获300万股预融资认股权证，行权价每股0.0001美元。此举旨在深化双方在光通信等领域的长期合作。',
        summaryEn: 'Corning signed a securities purchase agreement with NVIDIA, issuing $500M in warrants. NVIDIA receives warrants to purchase up to 15M Corning shares at $180/share, plus 3M prefunded warrants at $0.0001/share.',
        source: '36氪/界面',
        category: '产业',
        categoryEn: 'Industry'
      },
      {
        title: '苹果多款高性能Mac遭下架，疑因内存供应紧张',
        titleEn: 'Apple Removes Multiple High-Performance Macs, Suspected Memory Supply Shortage',
        summary: '苹果在线商店下架了多款配备32GB和64GB内存的高性能Mac设备，高规格内存版本短缺尤为严峻。知情人士透露，苹果之前未预计到需求如此火爆，供应调整需要时间。AI时代带来的内存需求增长正蔓延至消费端。',
        summaryEn: 'Apple\'s online store removed multiple high-performance Macs with 32GB and 64GB memory. Insiders say Apple didn\'t anticipate such strong demand. AI-era memory demand is spreading to consumer products.',
        source: '36氪/澎湃新闻',
        category: '硬件',
        categoryEn: 'Hardware'
      },
      {
        title: '美股Arm涨超13%，AI芯片板块集体走强',
        titleEn: 'US Stock Arm Surges 13%+, AI Chip Sector Broadly Strengthens',
        summary: '美股三大指数集体收涨，大型科技股普涨。Arm涨超13%，英伟达涨超5%，带动AI芯片板块表现强势。热门中概股多数走强，百度涨超11%，阿里巴巴涨超6%。',
        summaryEn: 'All three US indices closed higher. Arm surged 13%+, NVIDIA up 5%+, driving AI chip sector strength. Popular Chinese stocks mostly rose: Baidu up 11%+, Alibaba up 6%+.',
        source: '36氪',
        category: '投资',
        categoryEn: 'Investment'
      }
    ],
    comment: 'AI基础设施需求持续爆发——从芯片到内存全面吃紧，巨头用真金白银（英伟达5亿投资）押注供应链安全。同时，AI智能体出海也面临地缘挑战（MiroMind暂停服务）。',
    commentEn: 'AI infrastructure demand continues to surge — from chips to memory, all tight. Giants bet on supply chain security with real money (NVIDIA\'s $500M investment). Meanwhile, AI agent expansion faces geopolitical challenges.'
  },
  {
    date: '2026-05-06',
    title: 'AI新闻 | OpenAI与Anthropic合资收购AI服务公司 + 贝宝裁员20%转投AI + Anthropic发布金融AI智能体',
    titleEn: 'AI News | OpenAI & Anthropic JV Acquires AI Services Co. + PayPal Cuts 20% for AI + Anthropic Launches Financial AI Agents',
    summary: '今日AI行业三大看点：OpenAI与Anthropic分别与PE成立合资企业洽谈收购AI服务公司、贝宝宣布裁员20%加速AI转型、Anthropic发布面向金融服务的10款AI智能体。',
    summaryEn: 'Three highlights: OpenAI and Anthropic each form PE-backed JVs to acquire AI service companies, PayPal announces 20% layoffs to accelerate AI转型, Anthropic releases 10 financial service AI agents.',
    newsItems: [
      {
        title: 'OpenAI与Anthropic合资企业洽谈收购AI服务公司',
        titleEn: 'OpenAI & Anthropic JVs in Talks to Acquire AI Services Companies',
        summary: 'OpenAI和Anthropic分别与私募股权公司成立合资企业，正在洽谈收购帮助企业管理AI系统的服务公司。OpenAI的合资企业Deployment Company已筹集约40亿美元，估值达100亿美元，目前有三笔交易进入后期阶段。Anthropic则通过其合资企业筹集约15亿美元，投资者包括黑石集团、高盛等。此举标志着两家AI巨头从模型研发向大规模商业部署延伸。',
        summaryEn: 'OpenAI and Anthropic each formed PE-backed JVs negotiating acquisitions of AI system management companies. OpenAI\'s Deployment Company raised ~$4B at $10B valuation with 3 deals in late stages. Anthropic raised ~$1.5B with investors including Blackstone and Goldman Sachs.',
        source: '36氪/新浪财经',
        category: '产业',
        categoryEn: 'Industry'
      },
      {
        title: '贝宝推进转型重组，计划裁员20%加速AI落地',
        titleEn: 'PayPal Advances Restructuring, Plans 20% Layoffs to Accelerate AI',
        summary: '贝宝计划在未来两至三年内裁员20%，共计4760个岗位。CEO恩里克・洛雷斯表示公司过往在技术平台投入不足，已落后于其他金融科技同行，计划砍掉冗余管理层级，把更多资源投向人工智能研发，力争成为行业技术领军者。',
        summaryEn: 'PayPal plans to cut 20% of workforce (4,760 positions) over 2-3 years. CEO says the company lagged behind fintech peers in tech investment and will redirect resources to AI R&D.',
        source: '新浪财经',
        category: '产业',
        categoryEn: 'Industry'
      },
      {
        title: 'Coinbase裁员14%转向AI优先模式',
        titleEn: 'Coinbase Cuts 14% Staff, Shifts to AI-First Model',
        summary: '美国最大加密货币交易所Coinbase宣布将裁减约14%的员工，约660至700人受影响。CEO Brian Armstrong表示此举旨在应对加密市场波动与AI技术变革的双重压力，打造"更精简、更快速、更高效"的AI原生组织。',
        summaryEn: 'Coinbase announced ~14% workforce reduction (660-700 employees). CEO Brian Armstrong cites crypto market volatility and AI transformation pressures.',
        source: '新浪财经',
        category: '产业',
        categoryEn: 'Industry'
      },
      {
        title: 'Anthropic发布面向金融服务的新型AI智能体',
        titleEn: 'Anthropic Launches New AI Agents for Financial Services',
        summary: 'Anthropic推出10款新的AI智能体，旨在处理更广泛的金融服务任务，包括撰写客户会议演示文稿、审核财务报表、合规审查等。目标用户是银行、保险、资产管理和金融科技领域的专业人士。CEO Dario Amodei将与摩根大通CEO Jamie Dimon共同出席AI活动。',
        summaryEn: 'Anthropic released 10 new AI agents for financial services tasks including client presentations, financial statement review, and compliance. Target users: banking, insurance, asset management, and fintech professionals.',
        source: '财联社',
        category: '大模型',
        categoryEn: 'LLM'
      },
      {
        title: '多家出版商起诉Meta盗用版权作品训练AI',
        titleEn: 'Multiple Publishers Sue Meta for Copyright Infringement in AI Training',
        summary: '圣智学习、阿歇特出版、麦克米伦、麦格劳等出版商及作家对Meta提起集体诉讼，指控其非法使用受版权保护的作品训练AI模型，要求启动陪审团庭审审理版权侵权诉求。',
        summaryEn: 'Publishers including Cengage, Hachette, Macmillan, and McGraw Hill filed a class action against Meta for using copyrighted works to train AI models.',
        source: '新浪财经',
        category: '产业',
        categoryEn: 'Industry'
      }
    ],
    comment: 'OpenAI和Anthropic通过PE合资企业大举并购，AI行业从"卖模型"走向"卖服务"；贝宝和Coinbase同时裁员转AI，传统企业AI转型进入深水区。',
    commentEn: 'OpenAI and Anthropic\'s PE-backed M&A marks AI industry shift from "selling models" to "selling services"; PayPal and Coinbase simultaneous AI pivots show traditional enterprise AI transformation entering deep waters.'
  },
  {
    date: '2026-05-05',
    title: 'AI新闻 | 诺奖得主谈AI与就业 + 具身智能催生百万新职业 + 第九届数字中国峰会AI亮点',
    titleEn: 'AI News | Nobel Laureate on AI & Employment + Embodied AI Creates Million New Jobs + Digital China Summit AI Highlights',
    summary: '今日AI行业三大看点：诺奖得主布林约尔松提出AI应赋能而非替代人类、具身智能数据采集员等新职业预计新增超百万岗位、第九届数字中国建设峰会集中展示AI最新应用。',
    summaryEn: 'Three highlights: Nobel laureate Brynjolfsson says AI should empower not replace humans, embodied AI data collectors and new roles expected to add over a million jobs, Digital China Summit showcases latest AI applications.',
    newsItems: [
      {
        title: '诺奖得主布林约尔松：AI不应替代人类，而应拓展人的能力边界',
        titleEn: 'Nobel Laureate Brynjolfsson: AI Should Empower Humans, Not Replace Them',
        summary: '斯坦福大学数字经济实验室主任、2024年诺贝尔经济学奖得主布林约尔松提出"图灵陷阱"概念，批评AI行业一味追求机器模仿和替代人类的思路，主张转向借助技术拓展人的能力边界，让人完成从前无法实现的事。据世界经济论坛统计，过去两年全球新增约130万个AI相关岗位，到2030年AI有望创造1.7亿个全新就业。',
        summaryEn: 'Stanford\'s Brynjolfsson, 2024 Nobel Economics laureate, proposes the "Turing Trap" concept, criticizing AI\'s focus on machine imitation and human replacement. WEF stats: 1.3M new AI jobs in past 2 years, 170M new jobs expected by 2030.',
        source: '中新网',
        category: '产业',
        categoryEn: 'Industry'
      },
      {
        title: '机器人"启蒙老师"新职业爆发，预计五年新增岗位超百万',
        titleEn: 'Robot "Trainer" New Profession Explodes, Over 1M New Jobs Expected in 5 Years',
        summary: '具身智能发展催生"数据采集员""机器人训练师"等新职业群体。全国联动集群累计沉淀本土化真实数据突破2000万条，2026年前4个月新增超800万条，同比增长120%以上。预计未来五年我国具身智能市场规模将达4000亿元，新增就业岗位超100万个。',
        summaryEn: 'Embodied AI催生 new roles like "data collectors" and "robot trainers". 20M+ localized data points accumulated, 8M+ added in first 4 months of 2026. China\'s embodied AI market expected to reach 400B yuan with 1M+ new jobs in 5 years.',
        source: '央视网',
        category: '产业',
        categoryEn: 'Industry'
      },
      {
        title: 'AI"秒级匹配"成寻根新钥匙，大模型赋能传统文化',
        titleEn: 'AI "Second-Level Matching" Becomes New Key for Root-Seeking, LLMs Empower Traditional Culture',
        summary: '第九届数字中国建设峰会现场，福建网龙网络公司展示依托AI生成的"华夏宗亲大福树"应用，输入姓氏即可生成3D宗族树。基于大模型的"侨脉智联"平台能将数周人工考证压缩至分秒之间，AI古文字修复与图片识别技术帮助海外华侨精准定位祖籍地。',
        summaryEn: 'Digital China Summit: NetDragon demonstrates AI-generated "Chinese Family Tree" app. LLM-powered platform compresses weeks of manual research to seconds for overseas Chinese tracing ancestral roots.',
        source: '中新网',
        category: '大模型',
        categoryEn: 'LLM'
      },
      {
        title: '马达加斯加10万人投身AI行业，AI训练创造新就业',
        titleEn: 'Madagascar 100K Enter AI Industry, AI Training Creates New Jobs',
        summary: '在全球最贫困国家之一的马达加斯加，AI浪潮催生数据标注行业，截至2025年底已有约10万人从事AI相关行业。当地AI数据标注员月薪120欧元，比80欧元的平均薪资高出50%，大批年轻人投身人工智能行业。',
        summaryEn: 'In Madagascar, one of the world\'s poorest nations, AI wave creates data labeling industry. ~100K employed in AI-related fields by end of 2025. Data labelers earn €120/month vs €80 average.',
        source: '中新网',
        category: '产业',
        categoryEn: 'Industry'
      },
      {
        title: '直播电商十年：从"人海战术"到AI"人机协同"',
        titleEn: 'Live Commerce Decade: From "Human Wave" to AI "Human-Machine Collaboration"',
        summary: '直播电商行业走过十年，正从依赖大量人工主播的模式转向AI人机协同。AI技术在智能选品、虚拟主播、自动化运营等环节深度介入，大幅降低人力成本，提升转化效率。',
        summaryEn: 'Live commerce industry shifts from human主播 reliance to AI human-machine collaboration. AI intervenes in product selection, virtual hosts, automated operations, reducing labor costs and boosting conversion.',
        source: '中新网',
        category: '产业',
        categoryEn: 'Industry'
      }
    ],
    comment: 'AI从"替代焦虑"走向"赋能协作"——诺奖得主的观点给产业界吃下定心丸，具身智能新职业更是证明AI在创造就业而非消灭就业。',
    commentEn: 'AI moves from "replacement anxiety" to "empowerment collaboration" — Nobel laureate\'s view reassures the industry, embodied AI new jobs prove AI is creating employment, not eliminating it.'
  },
  {
    date: '2026-05-04',
    title: 'AI新闻 | 苹果Siri升级为独立App + 黄仁勋称英伟达中国市场份额归零 + DeepSeek V4 Pro成本暴降',
    titleEn: 'AI News | Apple Siri Upgrades to Standalone App + Huang: NVIDIA China Market Share at Zero + DeepSeek V4 Pro Costs Plummet',
    summary: '今日AI行业三大看点：苹果iOS 27重心转向AI、英伟达中国市场份额归零、DeepSeek V4 Pro成本仅8.7美分/百万token。',
    summaryEn: 'Three highlights: Apple iOS 27 pivots to AI, NVIDIA China market share hits zero, DeepSeek V4 Pro costs only 8.7 cents/million tokens.',
    newsItems: [
      {
        title: '苹果iOS 27将重心转向AI，Siri升级为独立App',
        titleEn: 'Apple iOS 27 Pivots to AI, Siri Upgrades to Standalone App',
        summary: 'iOS 27将重心转向AI，Siri将重塑为独立App并支持多任务指令，Apple Intelligence的照片搜索等功能深度整合到相机应用中。',
        summaryEn: 'iOS 27 pivots to AI, Siri becomes standalone app with multi-task commands, Apple Intelligence photo search integrated into Camera.',
        source: 'IT之家',
        category: '硬件',
        categoryEn: 'Hardware'
      },
      {
        title: '黄仁勋：英伟达在中国市场份额已降为零',
        titleEn: 'Huang: NVIDIA China Market Share Has Dropped to Zero',
        summary: '黄仁勋公开表示英伟达在中国AI芯片市场的份额已归零，受美国出口管制政策影响，英伟达失去中国这一全球最大的AI市场。',
        summaryEn: 'Huang publicly states NVIDIA China AI chip market share is zero, losing the world\'s largest AI market due to US export controls.',
        source: '新浪财经',
        category: '硬件',
        categoryEn: 'Hardware'
      },
      {
        title: 'DeepSeek V4 Pro成本仅8.7美分/百万token，为行业1/1700',
        titleEn: 'DeepSeek V4 Pro Costs Only 8.7 Cents/Million Tokens, 1/1700 of Industry',
        summary: 'DeepSeek V4 Pro推理成本大幅降低，仅需8.7美分/百万token，仅为Anthropic Sonnet（15美元）的1/1700，引发行业对开源模型成本优势的热议。',
        summaryEn: 'DeepSeek V4 Pro inference costs drop to just 8.7 cents/million tokens, only 1/1700 of Anthropic Sonnet ($15), sparking debate on open-source cost advantage.',
        source: '新浪财经',
        category: '大模型',
        categoryEn: 'LLM'
      },
      {
        title: '腾讯云宣布5月9日起AI算力相关产品涨价5%',
        titleEn: 'Tencent Cloud Announces 5% Price Hike on AI Computing Products from May 9',
        summary: '腾讯云宣布自5月9日起，AI算力、容器服务、EMR等相关产品价格上调5%，成为继阿里云之后第二家宣布涨价的云厂商。',
        summaryEn: 'Tencent Cloud announces 5% price increase on AI computing, container services, EMR from May 9, second after Alibaba Cloud.',
        source: '雪球',
        category: '产业',
        categoryEn: 'Industry'
      }
    ],
    comment: 'AI应用落地的最大障碍是成本，DeepSeek把价格打到1/1700，中小企业用AI的门槛几乎消失。',
    commentEn: 'The biggest barrier to AI adoption is cost. DeepSeek drives prices to 1/1700, almost eliminating the barrier for SMEs.' 
  },
  {
    date: '2026-05-03',
    title: 'AI新闻 | 伯克希尔AI三原则 + DeepMind万字硬核访谈 + Meta收购机器人公司',
    titleEn: 'AI News | Berkshire AI Three Principles + DeepMind 10K-Word Interview + Meta Acquires Robotics Company',
    summary: '今日AI行业三大看点：巴菲特接班人确立AI落地三原则、DeepMind CEO万字访谈指出物理AI才是未来、Meta完成人形机器人公司收购。',
    summaryEn: 'Three highlights: Buffett successor establishes AI implementation principles, DeepMind CEO interview says physical AI is the future, Meta completes humanoid robotics company acquisition.',
    newsItems: [
      {
        title: '伯克希尔股东大会：阿贝尔确立AI落地三原则',
        titleEn: 'Berkshire Shareholder Meeting: Abel Establishes AI Implementation Three Principles',
        summary: '伯克希尔CEO格雷格·阿贝尔在年度股东大会上表示不会为了AI而AI，确立三大应用原则：引进高端人才、坚守安全治理底线、坚持人类主导核心决策。',
        summaryEn: 'Berkshire CEO Greg Abel states at annual meeting the company won\'t do AI for AI\'s sake, establishing three principles: recruit top talent, maintain safety governance, keep humans in core decisions.',
        source: '新浪AI热点',
        category: '产业',
        categoryEn: 'Industry'
      },
      {
        title: 'DeepMind CEO万字访谈：当前AI只是"前菜"，物理AI与具身智能才是未来',
        titleEn: 'DeepMind CEO Interview: Current AI is Just "Appetizer", Physical AI & Embodied Intelligence Are the Future',
        summary: '诺贝尔化学奖得主、DeepMind CEO Demis Hassabis接受万字硬核访谈，指出当前AI仍处于早期阶段，物理AI和具身智能才是真正的未来方向。',
        summaryEn: 'Nobel chemistry laureate and DeepMind CEO Demis Hassabis says current AI is still in early stages, physical AI and embodied intelligence are the true future.',
        source: '图灵人工智能',
        category: '大模型',
        categoryEn: 'LLM'
      },
      {
        title: 'Meta完成收购机器人AI公司Assured Robot Intelligence',
        titleEn: 'Meta Completes Acquisition of Robotics AI Company Assured Robot Intelligence',
        summary: 'Meta于5月1日完成对人形机器人AI初创公司Assured Robot Intelligence的收购，加速其人形机器人技术研发进程。',
        summaryEn: 'Meta completed its acquisition of humanoid robotics AI startup Assured Robot Intelligence on May 1, accelerating its humanoid robotics R&D.',
        source: '环球市场播报',
        category: '投资',
        categoryEn: 'Investment'
      },
      {
        title: '杨斌：为什么提"AI次方变革"',
        titleEn: 'Yang Bin: Why "AI-Powered Transformation"',
        summary: '清华经管学院教授杨斌在全民阅读周大会上发表演讲，指出将AI仅仅当作技术问题会给企业带来大麻烦，AI不是"+AI"，而是AI驱动的内容生产体系重构。',
        summaryEn: 'Tsinghua professor Yang Bin says treating AI as merely a technical problem will trouble enterprises. AI is not "+AI" but AI-driven content production system restructuring.',
        source: 'New Economist',
        category: '产业',
        categoryEn: 'Industry'
      }
    ],
    comment: '伯克希尔的AI三原则值得企业参考——务实落地、安全治理、人类决策主导。磐石电气的AIoT落地也可借鉴。',
    commentEn: 'Berkshire\'s AI three principles are worth referencing — pragmatic implementation, safety governance, human decision leadership.'
  },
  {
    date: '2026-05-02',
    title: 'AI新闻 | DeepSeek上线多模态 + 苹果M4 Mac新品 + 软通动力携手华为',
    titleEn: 'AI News | DeepSeek Launches Multimodal + Apple M4 Mac New Products + iSoftStone Partners with Huawei',
    summary: '今日AI行业三大看点：DeepSeek V4上线识图功能、苹果M4 Mac系列全面上市、软通动力与华为联合发布OPC产业赋能方案。',
    summaryEn: 'Three highlights: DeepSeek V4 launches image recognition, Apple M4 Mac series launches, iSoftStone and Huawei jointly release OPC industry enablement solution.',
    newsItems: [
      {
        title: 'DeepSeek上线多模态能力，支持识图功能',
        titleEn: 'DeepSeek Launches Multimodal Capabilities with Image Recognition',
        summary: 'DeepSeek在发布V4后悄悄上线多模态功能，目前处于灰度公测阶段，用户可在聊天窗口看到识图模式，并开源了多模态新范式技术。',
        summaryEn: 'DeepSeek quietly launched multimodal features after V4 release, currently in gray-scale public beta with image recognition in chat window, open-sourced multimodal new paradigm technology.',
        source: '图灵人工智能',
        category: '大模型',
        categoryEn: 'LLM'
      },
      {
        title: '苹果发布M4 Mac系列新品，旧款正式退市',
        titleEn: 'Apple Releases M4 Mac Series, Old Models Officially Discontinued',
        summary: '苹果发布多款搭载M4芯片的Mac新品，包括新iMac、Mac mini和MacBook Pro。M2 Mac mini等旧款正式从官网下架，新款Mac mini尺寸大幅缩小。',
        summaryEn: 'Apple releases multiple M4 Mac products including new iMac, Mac mini, and MacBook Pro. M2 Mac mini and older models officially discontinued, new Mac mini significantly smaller.',
        source: '新浪科技',
        category: '硬件',
        categoryEn: 'Hardware'
      },
      {
        title: '软通动力携手华为发布OPC方案，打通Token价值快车道',
        titleEn: 'iSoftStone Partners with Huawei to Release OPC Solution',
        summary: '第九届数字中国建设峰会期间，软通动力与华为等伙伴联合发布OPC产业赋能解决方案，与平潭智算中心联合展示睿动AI智能体云平台。',
        summaryEn: 'During Digital China Summit, iSoftStone and Huawei partners jointly release OPC industry enablement solution, demonstrate Ruidong AI cloud platform with Pingtan Computing Center.',
        source: '软通动力',
        category: '产业',
        categoryEn: 'Industry'
      }
    ],
    comment: '国产大模型在多模态领域持续突破，但DeepSeek的幻觉问题也提醒我们：AI生成内容必须人工审核。',
    commentEn: 'Chinese LLMs continue breakthroughs in multimodal, but DeepSeek\'s hallucination issues remind us: AI-generated content must be human-reviewed.'
  },
  {
    date: '2026-05-01',
    title: 'AI新闻 | GPT-5正式发布 + Claude 4安全创纪录 + Qwen-Max 3.0降价',
    titleEn: 'AI News | GPT-5 Official Release + Claude 4 Security Record + Qwen-Max 3.0 Price Cut',
    summary: '今日AI行业三大看点：OpenAI正式发布GPT-5多模态版、Anthropic Claude 4通过红队测试、阿里云Qwen-Max 3.0推理能力提升5倍且降价40%。',
    summaryEn: 'Three highlights: OpenAI officially releases GPT-5 multimodal, Anthropic Claude 4 passes red team testing, Alibaba Cloud Qwen-Max 3.0 reasoning ability up 5x with 40% price cut.',
    newsItems: [
      {
        title: 'OpenAI 发布 GPT-5，支持多模态实时对话',
        titleEn: 'OpenAI Releases GPT-5 with Real-Time Multimodal Conversation',
        summary: 'OpenAI 正式发布 GPT-5，支持文本、图像、音频的实时多模态交互，响应速度比 GPT-4 提升 10 倍。',
        summaryEn: 'OpenAI officially releases GPT-5, supporting real-time multimodal interaction with text, images, and audio, 10x faster response than GPT-4.',
        source: 'OpenAI 官方博客',
        category: '大模型',
        categoryEn: 'LLM'
      },
      {
        title: 'Anthropic Claude 4 通过红队测试，安全性创历史新高',
        titleEn: 'Anthropic Claude 4 Passes Red Team Testing, Security at Record High',
        summary: 'Anthropic 宣布 Claude 4 模型通过独立安全机构 1000+ 项红队测试，在拒绝有害请求方面准确率达 99.7%。',
        summaryEn: 'Anthropic announces Claude 4 passed 1000+ red team tests by independent security org, 99.7% accuracy in rejecting harmful requests.',
        source: 'Anthropic Blog',
        category: '大模型',
        categoryEn: 'LLM'
      },
      {
        title: '阿里云通义千问推出 Qwen-Max 3.0，推理能力提升 5 倍',
        titleEn: 'Alibaba Cloud Launches Qwen-Max 3.0, 5x Reasoning Improvement',
        summary: '阿里云发布通义千问 Qwen-Max 3.0，数学推理和代码生成能力大幅提升，价格下降 40%。',
        summaryEn: 'Alibaba Cloud releases Qwen-Max 3.0 with significant math reasoning and code generation improvements, 40% price reduction.',
        source: '阿里云',
        category: '大模型',
        categoryEn: 'LLM'
      },
      {
        title: '英伟达发布新一代 AI 芯片 Blackwell Ultra，算力翻倍',
        titleEn: 'NVIDIA Releases Next-Gen AI Chip Blackwell Ultra, Doubling Compute',
        summary: '英伟达在 GTC 大会上发布 Blackwell Ultra GPU，单卡算力达到 20 PFLOPS，专为大规模 AI 训练设计。',
        summaryEn: 'NVIDIA unveils Blackwell Ultra GPU at GTC, single-card compute reaches 20 PFLOPS, designed for large-scale AI training.',
        source: 'NVIDIA GTC 2026',
        category: '硬件',
        categoryEn: 'Hardware'
      }
    ],
    comment: '多模态交互从"能听懂"进化到"能看懂+能听到"，AI 助理的体验门槛进一步降低。',
    commentEn: 'Multimodal interaction evolves from "can understand speech" to "can see and hear", lowering the experience barrier for AI assistants.'
  }
];
