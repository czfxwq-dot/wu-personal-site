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
    date: '2026-05-14',
    title: 'AI新闻 | 中国累计868款生成式AI服务完成备案 + 思科AI相关订单超53亿美元 + 亚马逊Alexa购物版上线',
    summary: '今日AI行业三大看点：国家网信办数据显示截至4月30日累计868款生成式人工智能服务完成备案，530款应用完成登记；思科2026财年第三财季AI基础设施业务 momentum 显著提升，截至本财季末累计获得53亿美元AI相关订单，全年AI相关订单指引上调至90亿美元；亚马逊将Alexa Plus引入官网，推出AI购物助手Alexa购物版，支持智能推荐、降价提醒、自动复购等功能。',
    newsItems: [
      {
        title: '截至4月30日累计有868款生成式人工智能服务完成备案',
        summary: '据国家网信办消息，2026年3月至4月新增72款生成式人工智能服务完成备案，新增49款应用完成登记。截至4月30日，累计有868款生成式人工智能服务完成备案，530款生成式人工智能应用或功能完成登记，反映国内AI服务备案持续快速增长。',
        source: '36氪/网信中国',
        category: '产业',
        url: 'https://www.36kr.com/newsflashes/3807695701663496'
      },
      {
        title: '思科Q3财报：AI基础设施业务 momentum 显著提升，累计获得53亿美元AI相关订单',
        summary: '思科发布2026财年第三财季报告，营业总收入158.41亿美元，同比增长12%，归母净利润33.73亿美元，同比增长35%。AI基础设施业务 momentum 显著提升，截至本财季末已累计获得53亿美元AI相关订单，同时上调2026财年AI相关订单指引至90亿美元、AI相关营收指引至40亿美元。',
        source: 'IT之家',
        category: '硬件',
        url: 'https://www.ithome.com/0/950/073.htm'
      },
      {
        title: '亚马逊Alexa购物版上线，支持智能推荐、降价提醒、自动复购',
        summary: '亚马逊正将Alexa Plus引入官网，推出全新AI购物助手Alexa购物版，取代原有Rufus。支持设置降价提醒、商品对比、自动复购等功能，用户可自定义规则实现自动下单。依托多模型推理能力，可全网抓取信息并结合用户画像给出定制化购物建议。该服务面向所有美国亚马逊用户开放，无需注册Alexa账号。',
        source: 'IT之家',
        category: '应用',
        url: 'https://www.ithome.com/0/950/073.htm'
      },
      {
        title: '阿里财报：AI投资开始获得回报，MiniMax、智谱、月之暗面成印钞机',
        summary: '阿里公布截至2026年3月31日季度财报，利息收入和投资净收益同比增幅322%至875.12亿元，核心原因是投资的MiniMax、智谱于2026年上市且收入利润大幅增长。阿里云收入同比增长38%至416.26亿元，外部商业化收入增速提升至40%，为9个季度以来最快增速。',
        source: '虎嗅',
        category: '投资',
        url: 'https://www.huxiu.com/article'
      },
      {
        title: '美股大型科技股盘前涨跌不一，美光科技涨超4%',
        summary: '美股大型科技股盘前涨跌不一，美光科技涨超4%，英特尔涨超2%，英伟达涨超1%，特斯拉涨0.17%，Meta跌0.86%，微软跌0.61%，苹果跌0.17%。热门中概股盘前多数下跌，阿里巴巴跌超3%。',
        source: '36氪',
        category: '投资',
        url: 'https://www.36kr.com/newsflashes/3807719301242854'
      }
    ],
    comment: '国内AI服务备案突破868款，监管框架持续完善。思科AI订单指引大幅上调至90亿美元，企业AI基础设施建设需求持续爆发。亚马逊将AI深度整合购物场景，标志着AI从对话式交互走向交易式交互的新阶段。阿里AI投资开始兑现收益，一鱼两吃战略奏效。'
  },
  {
    date: '2026-05-13',
    title: 'AI新闻 | Anthropic洽谈融资300亿美元估值超9000亿 + 谷歌将Gemini植入安卓底层打造跨设备智能系统 + 首届香港具身智能产业峰会举行',
    titleEn: 'AI News | Anthropic $30B Funding at $900B Valuation + Google Gemini Deep in Android + Hong Kong Embodied AI Summit',
    summary: '今日AI行业三大看点：Anthropic正洽谈新一轮融资，拟募资至少300亿美元，投前估值超9000亿美元，或成迄今最大规模融资；谷歌在Google I/O前夕宣布将Gemini Intelligence深度植入安卓底层，从聊天机器人转型为跨手机、浏览器、汽车、笔记本的智能操作系统，苹果WWDC面临压力；首届香港具身智能产业峰会暨智元APC2026成功举行，聚焦具身智能产业化落地。',
    summaryEn: 'Three key stories today: Anthropic seeks $30B funding at $900B+ valuation; Google embeds Gemini deep into Android as a cross-device OS; first Hong Kong embodied AI summit focuses on commercialization.',
    newsItems: [
      {
        title: 'Anthropic洽谈融资300亿美元，估值超9000亿美元',
        titleEn: 'Anthropic Seeks $30B Funding, Valuation Over $900B',
        summary: '知情人士称，Anthropic PBC正与投资者展开初步磋商，计划募资至少300亿美元，讨论以超过9000亿美元的投前估值进行融资，最快可能在本月底完成。公司正考虑最早于10月进行IPO。OpenAI在3月完成的一轮融资中最新估值为8520亿美元。',
        summaryEn: 'Anthropic PBC is in early talks to raise at least $30B at a $900B+ pre-money valuation, potentially closing by end of month. IPO considered as early as October. OpenAI latest valued at $852B.',
        source: '新浪财经',
        category: '投资',
        categoryEn: 'Investment'
      },
      {
        title: '谷歌将Gemini植入安卓底层，打造跨设备智能系统',
        titleEn: 'Google Embeds Gemini Deep into Android for Cross-Device AI',
        summary: '谷歌在Google I/O前夕宣布将Gemini Intelligence从聊天机器人升级为横跨手机、浏览器、汽车和笔记本的操作系统级智能。Gemini可跨应用移动、理解屏幕内容、完成复杂任务，如从Gmail提取信息构建购物车并预订餐厅。该公司称正在从操作系统过渡到智能系统。该功能将从今夏开始分批推出，覆盖超过2.5亿辆搭载Android Auto的汽车。苹果WWDC面临压力。',
        summaryEn: 'Google upgrades Gemini from chatbot to OS-level intelligence across phones, browsers, cars, and laptops. Rolling out this summer to 250M+ Android Auto vehicles. Apple WWDC faces pressure.',
        source: '新浪财经',
        category: '大模型',
        categoryEn: 'LLM'
      },
      {
        title: '首届香港具身智能产业峰会暨智元APC2026成功举行',
        titleEn: 'First Hong Kong Embodied AI Summit Held',
        summary: '首届香港具身智能产业峰会暨智元APC2026于5月12日成功举行，聚焦具身智能技术的产业化落地。智元机器人等具身智能领域企业参展，展示人形机器人在工业制造、服务场景中的应用成果。',
        summaryEn: 'First Hong Kong embodied AI summit held May 12, focusing on commercialization. Companies showcased humanoid robots for industrial and service applications.',
        source: '新浪科技',
        category: '硬件',
        categoryEn: 'Hardware'
      },
      {
        title: '快手回应分拆可灵：或引入外部融资，拟议方案仍处初步阶段',
        titleEn: 'Kuaishou Confirms Potential Spin-off of Kling AI',
        summary: '快手回应分拆可灵AI业务事宜称，或引入外部融资，但拟议方案仍处于初步阶段。可灵是快手旗下的AI视频生成模型，此前已在多个平台引起广泛关注。',
        summaryEn: 'Kuaishou confirms it may bring in external funding for Kling AI spin-off, but plans are still preliminary. Kling is Kuaishou\'s AI video generation model.',
        source: '新浪财经',
        category: '大模型',
        categoryEn: 'LLM'
      },
      {
        title: 'OpenAI与微软达成合作协议，到2030年将节省970亿美元成本',
        titleEn: 'OpenAI & Microsoft Deal to Save $97B by 2030',
        summary: 'OpenAI通过与微软达成最新合作协议，计划到2030年节省970亿美元成本。这一深度合作将进一步巩固两家在AI算力基础设施领域的协同优势。',
        summaryEn: 'OpenAI and Microsoft reach cooperation deal to save $97B in costs by 2030, deepening collaboration on AI compute infrastructure.',
        source: '新浪财经',
        category: '产业',
        categoryEn: 'Industry'
      }
    ],
    comment: 'Anthropic 300亿美元融资若落地，将超过OpenAI的8520亿估值，AI大模型融资竞赛白热化。谷歌将Gemini深度植入安卓，标志着AI从应用层走向系统层，手机操作系统竞争范式转换。具身智能峰会落地香港，人形机器人产业加速从实验室走向商业场景。',
    commentEn: 'Anthropic\'s $30B funding would surpass OpenAI\'s $852B valuation — AI funding race intensifies. Google embedding Gemini into Android marks AI\'s shift from app layer to system layer. Embodied AI summit in Hong Kong signals humanoid robots accelerating from lab to market.'
  },
  {
    date: '2026-05-12',
    title: 'AI新闻 | 央行：人工智能行业将为经济高质量发展注入更多动能 + 欧盟欢迎OpenAI开放ChatGPT访问权限 + 存储芯片股集体创新高',
    summary: '今日AI行业三大看点：央行一季度货币政策执行报告指出人工智能行业将为经济高质量发展注入更多动能，技术迭代加速、产业融合向纵深发展、国际市场空间持续拓展；欧盟委员会欢迎OpenAI开放最新版ChatGPT模型访问权限；美股存储芯片股集体走强，高通涨超8%、美光涨超6%均创历史新高。',
    newsItems: [
      {
        title: '央行：人工智能行业将为经济高质量发展注入更多动能',
        summary: '央行发布2026年第一季度货币政策执行报告，展望未来指出人工智能行业将为经济高质量发展注入更多动能。技术迭代持续加速，国产大模型性能有望进一步提升；产业融合向纵深发展，AI将深度融入智能制造、金融、医疗、交通等关键领域；国际市场空间持续拓展，国内AI企业在东南亚、中东等新兴市场落地应用项目。',
        source: '36氪/中国人民银行',
        category: '产业'
      },
      {
        title: '欧盟委员会欢迎OpenAI开放ChatGPT模型访问权限',
        summary: '欧盟委员会发言人5月11日表示，欢迎OpenAI拟开放其最新版ChatGPT模型访问权限的意向，本周将与OpenAI展开进一步交流。同时指出与Anthropic就其Mythos模型进行的磋商处于不同阶段，正寻求达成类似解决方案。',
        source: '36氪/财联社',
        category: '大模型'
      },
      {
        title: '美股存储芯片股集体走强，多股创历史新高',
        summary: '5月11日美股收盘，存储芯片股集体走强，高通涨超8%，西部数据涨超7%，美光科技涨超6%，英特尔涨超3%，英伟达涨约2%，均创下历史收盘新高。热门中概股多数上涨，理想汽车涨近5%，百度、小鹏、蔚来涨超3%。',
        source: '36氪',
        category: '硬件'
      },
      {
        title: '央行：继续实施适度宽松货币政策，保持流动性充裕',
        summary: '央行一季度货币政策执行报告提出，继续实施适度宽松货币政策，灵活运用多种货币政策工具，保持流动性充裕和社会融资条件相对宽松。报告还提到改革完善LPR，提高报价质量，更真实反映贷款市场利率水平。',
        source: '36氪/中国人民银行',
        category: '产业'
      }
    ],
    comment: '央行在一季度货币政策报告中专门展望AI行业，指出技术迭代、产业融合、出海三大趋势，信号意义明显。欧盟加速与OpenAI、Anthropic的监管对话，全球AI治理进入实质性谈判阶段。存储芯片板块集体创新高，AI硬件需求持续拉动半导体景气周期。'
  },
  {
    date: '2026-05-11',
    title: 'AI新闻 | 脑机接口Q1融资超38亿元 + 算电协同写入政府工作报告 + 国家安全部发布蓝牙设备安全警示',
    summary: '今日AI行业三大看点：中国脑机接口领域一季度融资17起共38亿元，投资逻辑从看概念转向看落地；算电协同正式写入政府工作报告，西部多省推动绿电与算力协同布局；国家安全部发布蓝牙设备安全警示，智能穿戴设备存窃密风险。',
    newsItems: [
      {
        title: '脑机接口投融资逻辑生变：从看概念转向看落地',
        summary: '2026年一季度，中国脑机接口领域共发生17起融资事件，融资总额约38亿元，单季融资规模已超过去年全年。在2026全国脑机接口科技与产业融合创新大会上，多位专家表示行业关注点正从单纯押注前沿科技转向长期产业生态布局，投资逻辑从看概念卡位置逐步转向看落地看产业化能力。',
        source: '财联社/上证报',
        category: '投资'
      },
      {
        title: '算力绿电协同提速，算电协同写入政府工作报告',
        summary: '2026年算电协同被写入政府工作报告，十五五规划纲要明确提出推动绿色电力与算力协同布局。内蒙古、宁夏、贵州等新能源富集地区通过布局源网荷储一体化、绿电直连等重点项目，充分挖掘西部就地消纳潜力，促进新能源与算力设施的协同规划。',
        source: '36氪/新华社',
        category: '产业'
      },
      {
        title: '国家安全部发布蓝牙设备安全警示，智能穿戴设备存窃密风险',
        summary: '国家安全部发布安全提示，无线耳机、智能手表、无线键盘等蓝牙设备凭借一键连接便捷性广泛应用，但可能潜藏安全风险。不法分子可能利用蓝牙技术漏洞，非法获取个人信息甚至实施窃密行为，威胁公民隐私与国家秘密安全。',
        source: '财联社/国家安全部',
        category: '产业'
      },
      {
        title: '量子温度计可深入单细胞内测温',
        summary: '日本东京大学和千叶大学科学家研制出一种新型量子温度计，小到可深入单个活细胞，测量细胞核等微小区域的温度。该技术将帮助科学家在最小尺度上探究生命新陈代谢与化学反应。相关论文发表在科学进展杂志上。',
        source: '财联社',
        category: '硬件'
      },
      {
        title: '3纳米以下二氧化钛薄膜变身铁电材料，为低功耗芯片开辟新路径',
        summary: '美国科学家在科学杂志发表研究成果：将二氧化钛薄膜厚度降至3纳米以下，可将其转化为铁电材料。这一进展为大规模制造运行速度更快、功耗更低的计算芯片开辟全新路径。',
        source: '财联社',
        category: '硬件'
      }
    ],
    comment: '脑机接口融资火爆（Q1单季超去年全年），但行业共识已转向看落地——这与AI行业从炒作到务实的趋势一致。算电协同写入政府工作报告，说明算力基建与能源的协同已成国家战略。国家安全部的蓝牙安全警示提醒我们：智能设备普及越快，安全防护越要跟上。'
  },
  {
    date: '2026-05-10',
    title: 'AI新闻 | 百度文心大模型5.1发布 + 光帆AI耳机5月15日开售 + Zeroth M1人形机器人接入OpenClaw',
    titleEn: 'AI News | Baidu Wenxin 5.1 Released + Guangfan AI Earphones May 15 Launch + Zeroth M1 Humanoid Robot Connects to OpenClaw',
    summary: '今日AI行业三大看点：百度正式发布文心大模型5.1，以同规模模型约6%的预训练成本达到基础效果领先；光帆科技全球首款带视觉感知的主动式AI耳机将于5月15日开售；乐享科技旗下Zeroth元点M1人形机器人成为全球首个接入腾讯OpenClaw的可量产人形机器人。',
    summaryEn: 'Three highlights: Baidu releases Wenxin 5.1 at 6% pre-training cost of competitors; Guangfan\'s world\'s first vision-capable AI earphones launching May 15; Zeroth M1 humanoid robot becomes first to connect to Tencent OpenClaw.',
    newsItems: [
      {
        title: '百度正式发布文心大模型5.1，登上LMArena搜索榜国内第一',
        titleEn: 'Baidu Releases Wenxin 5.1, Tops LMArena Search Chart in China',
        summary: '百度正式发布新一代基础大模型文心大模型5.1。文心5.1采用"多维弹性预训练"技术，仅以业界同规模模型约6%的预训练成本，达到基础效果领先水平，登上LMArena搜索榜国内第一。',
        summaryEn: 'Baidu releases Wenxin 5.1 using "multi-dimensional elastic pre-training" at 6% the cost of comparable models, topping LMArena search chart in China.',
        source: '36氪',
        category: '大模型',
        categoryEn: 'LLM'
      },
      {
        title: '光帆科技全球首款带视觉感知AI耳机将于5月15日开售',
        titleEn: 'Guangfan\'s Vision-Capable AI Earphones Launch May 15',
        summary: '光帆科技官方发布发售预热海报，全球首款具备视觉感知能力的主动式AI耳机——光帆全感AI耳机，将于5月15日正式开售。该耳机集成摄像头，可实现视觉感知能力，拓展AI耳机的交互边界。',
        summaryEn: 'Guangfan\'s world\'s first proactive AI earphones with vision capability launching May 15. Built-in camera enables visual perception, expanding interaction boundaries.',
        source: '36氪',
        category: '硬件',
        categoryEn: 'Hardware'
      },
      {
        title: 'Zeroth元点M1成为全球首个接入OpenClaw的人形机器人',
        titleEn: 'Zeroth M1 Becomes First Humanoid Robot to Connect to OpenClaw',
        summary: '乐享科技正式官宣，旗下具身智能品牌Zeroth元点的M1人形机器人成为全球首款接入腾讯OpenClaw（小龙虾）的可量产人形机器人。乐享科技已与腾讯达成万台硬件终端接入的意向，M1计划于5月下旬正式上线，上半年启动预售。',
        summaryEn: 'Leshang Tech announces Zeroth M1 humanoid robot as first mass-producible model connected to Tencent OpenClaw. Intent for 10K terminal connections, M1 launching late May.',
        source: '36氪',
        category: '硬件',
        categoryEn: 'Hardware'
      },
      {
        title: '智源FlagSafe大模型安全平台正式发布',
        titleEn: 'FlagSafe LLM Security Platform Officially Released',
        summary: '北京智源人工智能研究院联合北京大学、北邮、北航、上海交大、中科院信工所等机构，正式发布FlagSafe大模型安全平台。平台首批汇聚多个前沿大模型安全研究项目，围绕红队演练、蓝队防御、白盒透视三个核心方向，打造覆盖风险发现、防御治理与机理解释的安全平台。',
        summaryEn: 'Beijing Academy of AI unites top universities to release FlagSafe LLM security platform covering red teaming, blue defense, and white-box transparency.',
        source: '36氪',
        category: '大模型',
        categoryEn: 'LLM'
      },
      {
        title: 'DeepSeek与阿里谈崩？市场人士回应阿里未进行谈判',
        titleEn: 'DeepSeek & Alibaba Talks Failed? Sources Say Alibaba Never Negotiated',
        summary: '有消息称DeepSeek在4月展开巨额融资计划，同时吸引腾讯和阿里巴巴，但近期阿里和DeepSeek谈崩。市场人士回应称阿里应该没有进行谈判。DeepSeek此前已获得腾讯投资，融资动向备受关注。',
        summaryEn: 'Rumors say DeepSeek\'s massive fundraising attracted both Tencent and Alibaba, but talks collapsed. Sources claim Alibaba never actually negotiated.',
        source: '36氪/每经网',
        category: '投资',
        categoryEn: 'Investment'
      }
    ],
    comment: '文心5.1以6%的成本达到领先效果，说明大模型训练效率正在快速提升。AI硬件赛道持续升温——从AI耳机到人形机器人，AI正从软件走向实体。OpenClaw生态再添硬件伙伴，具身智能落地加速。',
    commentEn: 'Wenxin 5.1 at 6% cost shows rapid training efficiency gains. AI hardware heating up — from earphones to humanoid robots, AI moves from software to physical. OpenClaw ecosystem gains another hardware partner.'
  },
  {
    date: '2026-05-09',
    title: 'AI新闻 | 高盛：美国数据中心用电需求两年内翻倍 + 海光DCU适配混元大模型 + 浙江人形机器人签约2000台',
    titleEn: 'AI News | Goldman: US Data Center Power Demand to Double in 2 Years + Hygon DCU Adapts Hunyuan + Zhejiang 2K Humanoid Robots Signed',
    summary: '今日AI行业三大看点：高盛预计美国数据中心电力需求将在两年内翻倍，AI基建持续扩张；海光信息完成深算3号DCU与腾讯混元Hy3 preview大模型深度适配；浙江人形机器人创新中心与杰克科技签约2000台服装场景定制机器人。',
    summaryEn: 'Three highlights: Goldman predicts US data center power demand to double in 2 years; Hygon DCU completes deep adaptation with Tencent Hunyuan Hy3 preview; Zhejiang signs 2K custom humanoid robots for garment industry.',
    newsItems: [
      {
        title: '高盛：美国数据中心用电需求或在两年内翻倍',
        titleEn: 'Goldman: US Data Center Power Demand May Double in 2 Years',
        summary: '高盛预计，美国数据中心电力需求将从2025年的31GW增长至2026年的41GW，并在2027年进一步升至66GW。高盛认为，本轮AI数据中心扩张正在重塑美国地理格局。得州和佐治亚州正成为AI数据中心的重要聚集地，因为这些地区电力供应扩张更快，接入能力更强。',
        summaryEn: 'Goldman predicts US data center power demand to grow from 31GW (2025) to 66GW (2027). Texas and Georgia becoming major AI data center hubs due to faster power expansion.',
        source: '36氪/财联社',
        category: '产业',
        categoryEn: 'Industry'
      },
      {
        title: '海光DCU完成与混元Hy3 preview大模型的深度适配',
        titleEn: 'Hygon DCU Completes Deep Adaptation with Hunyuan Hy3 Preview',
        summary: '海光信息完成深算3号DCU与腾讯混元Hy3 preview大模型的深度适配。腾讯混元Hy3 preview是腾讯最新发布的大模型版本，具备295B总参数规模，并支持256K超长上下文，在复杂推理、Agent能力和代码生成等方面实现提升。',
        summaryEn: 'Hygon completes deep adaptation of ShenSuan 3 DCU with Tencent Hunyuan Hy3 preview — 295B parameters, 256K context, improved reasoning and code generation.',
        source: '36氪',
        category: '大模型',
        categoryEn: 'LLM'
      },
      {
        title: '浙江人形机器人创新中心与杰克科技签约2000台服装场景定制机器人',
        titleEn: 'Zhejiang Innovation Center Signs 2K Custom Humanoid Robots for Garment Industry',
        summary: '浙江人形机器人创新中心与杰克科技达成战略合作，签约2000台服装场景定制人形机器人。双方将共建产业生态，规划从2000台迈向百万台级服装人形机器人集群，以技术+场景创新推动服装柔性智造升级。',
        summaryEn: 'Zhejiang humanoid robot innovation center partners with Jack Tech for 2K custom robots, planning to scale to 1 million for garment flexible manufacturing.',
        source: '36氪',
        category: '硬件',
        categoryEn: 'Hardware'
      },
      {
        title: '通鼎互联拟设立合资公司投资8亿元建设光棒光纤项目',
        titleEn: 'Tongding Interconnect Plans 800M RMB Optical Fiber Project',
        summary: '通鼎互联公告，拟与韶关市曲江区国资成立合资公司，注册资本8亿元，投资约8亿元建设年产600吨光棒及2000万芯公里光纤项目，公司及控股股东通鼎集团提供全额连带责任保证担保。',
        summaryEn: 'Tongding Interconnect announces 800M RMB joint venture for 600-ton optical fiber preform and 20M fiber-kilometer annual production.',
        source: '36氪',
        category: '产业',
        categoryEn: 'Industry'
      }
    ],
    comment: 'AI基建仍在狂飙——高盛预测数据中心用电两年翻倍，得州和佐治亚成为新热点。国内芯片适配方面，海光DCU与腾讯混元大模型完成深度适配，295B参数规模值得关注。人形机器人也开始从实验室走向产线，2000台签约只是开始。',
    commentEn: 'AI infrastructure booming — Goldman predicts power doubling. Hygon-Hunyuan adaptation at 295B params is notable. Humanoid robots moving from lab to production line.'
  },
  {
    date: '2026-05-08',
    title: 'AI新闻 | 重庆出台L3+自动驾驶高速测试新规 + 美股科技股分化 + 越剑智能提示炒作风险',
    titleEn: 'AI News | Chongqing L3+ Highway Testing Rules + US Tech Stocks Split + Yuejian Smart Warns of Hype Risk',
    summary: '今日AI行业两大看点：重庆发布智能网联汽车高速公路测试管理细则，规范L3级以上自动驾驶测试；美股科技股涨跌互现，特斯拉涨超3%、英伟达涨超1%、英特尔跌3%。',
    summaryEn: 'Two highlights: Chongqing releases highway testing rules for L3+ autonomous vehicles; US tech stocks mixed — Tesla +3%, Nvidia +1%, Intel -3%.',
    newsItems: [
      {
        title: '重庆出台智能汽车高速公路测试新规，规范L3级以上自动驾驶测试',
        titleEn: 'Chongqing Issues L3+ Highway Testing Rules for Smart Vehicles',
        summary: '重庆市经济信息委联合市公安局、市交委印发《重庆市智能网联汽车高速公路测试管理细则（试行）》，进一步补齐高阶自动驾驶高速场景测试制度短板，规范L3级及以上智能网联汽车高速道路测试全流程管理，以安全可控、规范有序加速自动驾驶技术落地商业化应用。',
        summaryEn: 'Chongqing issues highway testing management rules for L3+ smart connected vehicles, accelerating commercialization of autonomous driving technology.',
        source: '36氪/重庆日报',
        category: '产业',
        categoryEn: 'Industry'
      },
      {
        title: '美股科技股涨跌互现，AI芯片板块分化',
        titleEn: 'US Tech Stocks Mixed, AI Chip Sector Diverges',
        summary: '5月7日美股三大指数集体收跌，道指跌0.63%，标普跌0.38%，纳指跌0.13%。大型科技股涨跌互现：特斯拉涨超3%，微软涨超1%，英伟达涨超1%，Meta小幅上涨；英特尔跌3%，亚马逊跌超1%。热门中概股普跌，小鹏跌超2%，百度、理想小幅下跌。',
        summaryEn: 'US indices fell: Dow -0.63%, S&P -0.38%, Nasdaq -0.13%. Tesla +3%, Nvidia +1%, Intel -3%, Amazon -1%. Chinese ADRs mostly down.',
        source: '36氪',
        category: '投资',
        categoryEn: 'Investment'
      },
      {
        title: '越剑智能提示炒作风险：智能验布机销售收入不足百万元',
        titleEn: 'Yuejian Smart Warns of Hype Risk: Smart Fabric Inspector Revenue Under 1M RMB',
        summary: '越剑智能发布股票交易风险提示公告，公司股票6个交易日中5个涨停，累计涨幅53.58%。公司表示智能验布机产品仍在市场推广前期阶段，2025年度销售收入不足百万元，占主营业务收入远低于1%，未来能否形成稳定收入存在重大不确定性。',
        summaryEn: 'Yuejian Smart stock surged 53.58% in 6 days. Company warns smart fabric inspector product still in early promotion, 2025 revenue under 1M RMB, less than 1% of total.',
        source: '36氪',
        category: '产业',
        categoryEn: 'Industry'
      },
      {
        title: '英监管机构调查三大支付巨头涉嫌垄断行为',
        titleEn: 'UK Regulator Investigates PayPal, Mastercard, Visa for Antitrust',
        summary: '英国金融行为监管局对贝宝、万事达卡、维萨围绕贝宝数字钱包的相关行为启动反垄断调查，重点涉及贝宝数字钱包的使用及资金运作模式。',
        summaryEn: 'UK FCA launches antitrust investigation into PayPal, Mastercard, and Visa over PayPal digital wallet usage and fund operations.',
        source: '36氪/新华社',
        category: '产业',
        categoryEn: 'Industry'
      }
    ],
    comment: '自动驾驶政策落地加速（重庆L3+高速测试新规）是好信号，但AI概念股炒作风险也不容忽视（越剑智能涨停5天收入不足百万）。英伟达股价仍在涨，但英特尔继续走弱，芯片板块内部分化加剧。',
    commentEn: 'Autonomous driving policy accelerating (Chongqing L3+ rules) is positive, but AI stock hype risks不容忽视. Nvidia still rising, Intel weakening — chip sector divergence intensifying.'
  },
  {
    date: '2026-05-07',
    title: 'AI新闻 | MiroThinker暂停中国服务 + 康宁英伟达5亿美元合作 + Arm涨超13%',
    titleEn: 'AI News | MiroThinker Suspends China Service + Corning-Nvidia $500M Deal + Arm Surges 13%',
    summary: '今日AI行业三大看点：陈天桥旗下AI公司MiroMind暂停中国大陆服务、康宁与英伟达达成5亿美元股权融资深化合作、美股Arm涨超13%带动AI芯片板块集体走强。',
    summaryEn: 'Three highlights: MiroMind suspends mainland China service; Corning-Nvidia $500M equity financing; Arm surges 13% driving AI chip sector rally.',
    newsItems: [
      {
        title: 'MiroMind暂停中国大陆及港澳地区服务',
        titleEn: 'MiroMind Suspends Service in Mainland China, Hong Kong & Macau',
        summary: 'MiroMind公司宣布，旗下MiroThinker智能体服务（dr.miromind.ai网页版与MiroMind移动应用）将于2026年5月12日起暂停向中国大陆、香港、澳门地区提供，恢复时间待定。MiroMind是盛大集团创始人陈天桥创办的AI研究公司。官网不受影响。',
        summaryEn: 'MiroMind announces MiroThinker agent service suspended in mainland China, HK & Macau from May 12. MiroMind is founded by Shanda Group creator Chen Tianqiao.',
        source: '36氪/第一财经',
        category: '大模型',
        categoryEn: 'LLM'
      },
      {
        title: '康宁与英伟达达成5亿美元股权融资协议',
        titleEn: 'Corning & Nvidia Reach $500M Equity Financing Deal',
        summary: '康宁公司与英伟达签署证券购买协议，康宁向英伟达发行总价5亿美元的认股权证。英伟达获得可购买最多1500万股康宁普通股的认股权证，行权价每股180美元；另获300万股预融资认股权证，行权价每股0.0001美元。此举旨在深化双方在光通信等领域的长期合作。',
        summaryEn: 'Corning issues $500M warrants to Nvidia — 15M shares at $180 + 3M pre-funded warrants at $0.0001, deepening optical communication cooperation.',
        source: '36氪/界面',
        category: '产业',
        categoryEn: 'Industry'
      },
      {
        title: '苹果多款高性能Mac遭下架，疑因内存供应紧张',
        titleEn: 'Apple Removes High-Performance Macs, Suspected Memory Supply Shortage',
        summary: '苹果在线商店下架了多款配备32GB和64GB内存的高性能Mac设备，高规格内存版本短缺尤为严峻。知情人士透露，苹果之前未预计到需求如此火爆，供应调整需要时间。AI时代带来的内存需求增长正蔓延至消费端。',
        summaryEn: 'Apple removes 32GB/64GB Mac models from store. Sources say demand exceeded expectations, supply adjustment takes time. AI-era memory demand spreading to consumer side.',
        source: '36氪/澎湃新闻',
        category: '硬件',
        categoryEn: 'Hardware'
      },
      {
        title: '美股Arm涨超13%，AI芯片板块集体走强',
        titleEn: 'Arm Surges 13%+ in US Trading, AI Chip Sector Rallies',
        summary: '美股三大指数集体收涨，大型科技股普涨。Arm涨超13%，英伟达涨超5%，带动AI芯片板块表现强势。热门中概股多数走强，百度涨超11%，阿里巴巴涨超6%。',
        summaryEn: 'All three US indices rose. Arm +13%, Nvidia +5%, driving AI chip sector rally. Chinese ADRs mostly up: Baidu +11%, Alibaba +6%.',
        source: '36氪',
        category: '投资',
        categoryEn: 'Investment'
      }
    ],
    comment: 'AI基础设施需求持续爆发——从芯片到内存全面吃紧，巨头用真金白银（英伟达5亿投资）押注供应链安全。同时，AI智能体出海也面临地缘挑战（MiroMind暂停服务）。',
    commentEn: 'AI infrastructure demand exploding — from chips to memory, all tight. Giants betting real money (Nvidia $500M) on supply chain security. AI agent expansion faces geopolitical challenges (MiroMind suspension).'
  },
  {
    date: '2026-05-06',
    title: 'AI新闻 | OpenAI与Anthropic合资收购AI服务公司 + 贝宝裁员20%转投AI + Anthropic发布金融AI智能体',
    titleEn: 'AI News | OpenAI & Anthropic JV Acquisitions + PayPal Cuts 20% for AI + Anthropic Financial AI Agents',
    summary: '今日AI行业三大看点：OpenAI与Anthropic分别与PE成立合资企业洽谈收购AI服务公司、贝宝宣布裁员20%加速AI转型、Anthropic发布面向金融服务的10款AI智能体。',
    summaryEn: 'Three highlights: OpenAI & Anthropic each form PE JVs to acquire AI service companies; PayPal cuts 20% for AI transition; Anthropic releases 10 AI agents for financial services.',
    newsItems: [
      {
        title: 'OpenAI与Anthropic合资企业洽谈收购AI服务公司',
        titleEn: 'OpenAI & Anthropic JVs Negotiate AI Service Company Acquisitions',
        summary: 'OpenAI和Anthropic分别与私募股权公司成立合资企业，正在洽谈收购帮助企业管理AI系统的服务公司。OpenAI的合资企业Deployment Company已筹集约40亿美元，估值达100亿美元，目前有三笔交易进入后期阶段。Anthropic则通过其合资企业筹集约15亿美元，投资者包括黑石集团、高盛等。此举标志着两家AI巨头从模型研发向大规模商业部署延伸。',
        summaryEn: 'OpenAI\'s JV raised ~$4B at $10B valuation, 3 deals in late stage. Anthropic\'s JV raised ~$1.5B with BlackRock, Goldman investors. Signals shift from model R&D to commercial deployment.',
        source: '36氪/新浪财经',
        category: '产业',
        categoryEn: 'Industry'
      },
      {
        title: '贝宝推进转型重组，计划裁员20%加速AI落地',
        titleEn: 'PayPal Restructuring: 20% Layoffs to Accelerate AI',
        summary: '贝宝计划在未来两至三年内裁员20%，共计4760个岗位。CEO恩里克・洛雷斯表示公司过往在技术平台投入不足，已落后于其他金融科技同行，计划砍掉冗余管理层级，把更多资源投向人工智能研发，力争成为行业技术领军者。',
        summaryEn: 'PayPal plans to cut 20% (4,760 positions) over 2-3 years. CEO says company fell behind on tech investment, redirecting resources to AI R&D.',
        source: '新浪财经',
        category: '产业',
        categoryEn: 'Industry'
      },
      {
        title: 'Coinbase裁员14%转向AI优先模式',
        titleEn: 'Coinbase Cuts 14% to Shift to AI-First Model',
        summary: '美国最大加密货币交易所Coinbase宣布将裁减约14%的员工，约660至700人受影响。CEO Brian Armstrong表示此举旨在应对加密市场波动与AI技术变革的双重压力，打造"更精简、更快速、更高效"的AI原生组织。',
        summaryEn: 'Coinbase cuts ~14% (660-700 employees) to build an AI-native organization amid crypto volatility and AI transformation.',
        source: '新浪财经',
        category: '产业',
        categoryEn: 'Industry'
      },
      {
        title: 'Anthropic发布面向金融服务的新型AI智能体',
        titleEn: 'Anthropic Releases New AI Agents for Financial Services',
        summary: 'Anthropic推出10款新的AI智能体，旨在处理更广泛的金融服务任务，包括撰写客户会议演示文稿、审核财务报表、合规审查等。目标用户是银行、保险、资产管理和金融科技领域的专业人士。CEO Dario Amodei将与摩根大通CEO Jamie Dimon共同出席AI活动。',
        summaryEn: 'Anthropic launches 10 AI agents for financial services — presentations, statement review, compliance. Target: banking, insurance, fintech professionals.',
        source: '财联社',
        category: '大模型',
        categoryEn: 'LLM'
      },
      {
        title: '多家出版商起诉Meta盗用版权作品训练AI',
        titleEn: 'Publishers Sue Meta for Copyright Infringement in AI Training',
        summary: '圣智学习、阿歇特出版、麦克米伦、麦格劳等出版商及作家对Meta提起集体诉讼，指控其非法使用受版权保护的作品训练AI模型，要求启动陪审团庭审审理版权侵权诉求。',
        summaryEn: 'Cengage, Hachette, Macmillan, McGraw-Hill file class action against Meta for using copyrighted works to train AI models.',
        source: '新浪财经',
        category: '产业',
        categoryEn: 'Industry'
      }
    ],
    comment: 'OpenAI和Anthropic通过PE合资企业大举并购，AI行业从"卖模型"走向"卖服务"；贝宝和Coinbase同时裁员转AI，传统企业AI转型进入深水区。',
    commentEn: 'OpenAI & Anthropic acquiring via PE JVs — AI shifting from "selling models" to "selling services"; PayPal & Coinbase cutting for AI — traditional companies entering deep transformation.'
  },
  {
    date: '2026-05-05',
    title: 'AI新闻 | 诺奖得主谈AI与就业 + 具身智能催生百万新职业 + 第九届数字中国峰会AI亮点',
    titleEn: 'AI News | Nobel Laureate on AI & Jobs + Embodied AI Creates Million New Careers + Digital China Summit',
    summary: '今日AI行业三大看点：诺奖得主布林约尔松提出AI应赋能而非替代人类、具身智能数据采集员等新职业预计新增超百万岗位、第九届数字中国建设峰会集中展示AI最新应用。',
    summaryEn: 'Three highlights: Nobel laureate Brynjolfsson says AI should empower not replace humans; embodied AI expected to create 1M+ new jobs; Digital China Summit showcases latest AI applications.',
    newsItems: [
      {
        title: '诺奖得主布林约尔松：AI不应替代人类，而应拓展人的能力边界',
        titleEn: 'Nobel Laureate Brynjolfsson: AI Should Empower, Not Replace Humans',
        summary: '斯坦福大学数字经济实验室主任、2024年诺贝尔经济学奖得主布林约尔松提出"图灵陷阱"概念，批评AI行业一味追求机器模仿和替代人类的思路，主张转向借助技术拓展人的能力边界，让人完成从前无法实现的事。据世界经济论坛统计，过去两年全球新增约130万个AI相关岗位，到2030年AI有望创造1.7亿个全新就业。',
        summaryEn: 'Nobel laureate Brynjolfsson proposes "Turing Trap" concept — AI should extend human capabilities, not mimic/replace them. WEF: 1.3M AI jobs added in 2 years, 170M new jobs expected by 2030.',
        source: '中新网',
        category: '产业',
        categoryEn: 'Industry'
      },
      {
        title: '机器人"启蒙老师"新职业爆发，预计五年新增岗位超百万',
        titleEn: 'Robot "Teachers" New Career Boom, 1M+ Jobs Expected in 5 Years',
        summary: '具身智能发展催生"数据采集员""机器人训练师"等新职业群体。全国联动集群累计沉淀本土化真实数据突破2000万条，2026年前4个月新增超800万条，同比增长120%以上。预计未来五年我国具身智能市场规模将达4000亿元，新增就业岗位超100万个。',
        summaryEn: 'Embodied AI creates "data collectors" and "robot trainers" careers. 20M+ localized data points, 8M added in first 4 months. Market expected to reach 400B RMB, 1M+ new jobs.',
        source: '央视网',
        category: '产业',
        categoryEn: 'Industry'
      },
      {
        title: 'AI"秒级匹配"成寻根新钥匙，大模型赋能传统文化',
        titleEn: 'AI "Second-Level Matching" Becomes New Tool for Family Roots Discovery',
        summary: '第九届数字中国建设峰会现场，福建网龙网络公司展示依托AI生成的"华夏宗亲大福树"应用，输入姓氏即可生成3D宗族树。基于大模型的"侨脉智联"平台能将数周人工考证压缩至分秒之间，AI古文字修复与图片识别技术帮助海外华侨精准定位祖籍地。',
        summaryEn: 'Digital China Summit: NetDragon demonstrates AI-generated family tree app — enter surname, get 3D clan tree. LLM reduces weeks of genealogy research to seconds.',
        source: '中新网',
        category: '大模型',
        categoryEn: 'LLM'
      },
      {
        title: '马达加斯加10万人投身AI行业，AI训练创造新就业',
        titleEn: 'Madagascar: 100K People Enter AI Industry, Training Creates New Jobs',
        summary: '在全球最贫困国家之一的马达加斯加，AI浪潮催生数据标注行业，截至2025年底已有约10万人从事AI相关行业。当地AI数据标注员月薪120欧元，比80欧元的平均薪资高出50%，大批年轻人投身人工智能行业。',
        summaryEn: 'In Madagascar, AI wave creates data labeling industry — ~100K people in AI-related jobs by end of 2025. Monthly salary 120 EUR vs 80 EUR average.',
        source: '中新网',
        category: '产业',
        categoryEn: 'Industry'
      },
      {
        title: '直播电商十年：从"人海战术"到AI"人机协同"',
        titleEn: '10 Years of Live E-commerce: From "Human Wave" to AI Human-Machine Collaboration',
        summary: '直播电商行业走过十年，正从依赖大量人工主播的模式转向AI人机协同。AI技术在智能选品、虚拟主播、自动化运营等环节深度介入，大幅降低人力成本，提升转化效率。',
        summaryEn: 'Live e-commerce shifting from manual hosts to AI collaboration — smart product selection, virtual hosts, automated operations reducing labor costs.',
        source: '中新网',
        category: '产业',
        categoryEn: 'Industry'
      }
    ],
    comment: 'AI从"替代焦虑"走向"赋能协作"——诺奖得主的观点给产业界吃下定心丸，具身智能新职业更是证明AI在创造就业而非消灭就业。',
    commentEn: 'AI shifting from "replacement anxiety" to "empowered collaboration" — Nobel laureate\'s view reassures industry. Embodied AI careers prove AI creates jobs, not eliminates them.'
  },
  {
    date: '2026-05-04',
    title: 'AI新闻 | 苹果Siri升级为独立App + 黄仁勋称英伟达中国市场份额归零 + DeepSeek V4 Pro成本暴降',
    titleEn: 'AI News | Apple Siri as Standalone App + Nvidia China Market Share Zero + DeepSeek V4 Pro Cost Plummets',
    summary: '今日AI行业三大看点：苹果iOS 27重心转向AI、英伟达中国市场份额归零、DeepSeek V4 Pro成本仅8.7美分/百万token。',
    summaryEn: 'Three highlights: Apple iOS 27 shifts to AI with Siri as standalone app; Nvidia China market share drops to zero; DeepSeek V4 Pro costs only 8.7 cents per million tokens.',
    newsItems: [
      {
        title: '苹果iOS 27将重心转向AI，Siri升级为独立App',
        titleEn: 'Apple iOS 27 Shifts to AI, Siri Upgraded to Standalone App',
        summary: 'iOS 27将重心转向AI，Siri将重塑为独立App并支持多任务指令，Apple Intelligence的照片搜索等功能深度整合到相机应用中。',
        summaryEn: 'iOS 27 focuses on AI — Siri redesigned as standalone app with multi-task support, Apple Intelligence photo search integrated into Camera.',
        source: 'IT之家',
        category: '硬件',
        categoryEn: 'Hardware'
      },
      {
        title: '黄仁勋：英伟达在中国市场份额已降为零',
        titleEn: 'Jensen Huang: Nvidia China Market Share Dropped to Zero',
        summary: '黄仁勋公开表示英伟达在中国AI芯片市场的份额已归零，受美国出口管制政策影响，英伟达失去中国这一全球最大的AI市场。',
        summaryEn: 'Jensen Huang publicly states Nvidia\'s China AI chip market share has dropped to zero due to US export controls.',
        source: '新浪财经',
        category: '硬件',
        categoryEn: 'Hardware'
      },
      {
        title: 'DeepSeek V4 Pro成本仅8.7美分/百万token，为行业1/1700',
        titleEn: 'DeepSeek V4 Pro Costs 8.7 Cents/M Token, 1/1700 of Industry',
        summary: 'DeepSeek V4 Pro推理成本大幅降低，仅需8.7美分/百万token，仅为Anthropic Sonnet（15美元）的1/1700，引发行业对开源模型成本优势的热议。',
        summaryEn: 'DeepSeek V4 Pro inference cost slashed to 8.7 cents per million tokens — 1/1700 of Anthropic Sonnet ($15).',
        source: '新浪财经',
        category: '大模型',
        categoryEn: 'LLM'
      },
      {
        title: '腾讯云宣布5月9日起AI算力相关产品涨价5%',
        titleEn: 'Tencent Cloud Announces 5% AI Computing Price Increase',
        summary: '腾讯云宣布自5月9日起，AI算力、容器服务、EMR等相关产品价格上调5%，成为继阿里云之后第二家宣布涨价的云厂商。',
        summaryEn: 'Tencent Cloud announces 5% price increase on AI computing, container, and EMR products from May 9.',
        source: '雪球',
        category: '产业',
        categoryEn: 'Industry'
      }
    ],
    comment: 'AI应用落地的最大障碍是成本，DeepSeek把价格打到1/1700，中小企业用AI的门槛几乎消失。',
    commentEn: 'Biggest barrier to AI adoption is cost — DeepSeek at 1/1700 nearly eliminates the SMB threshold.'
  },
  {
    date: '2026-05-03',
    title: 'AI新闻 | 伯克希尔AI三原则 + DeepMind万字硬核访谈 + Meta收购机器人公司',
    titleEn: 'AI News | Berkshire AI Principles + DeepMind 10K-Word Interview + Meta Acquires Robot Company',
    summary: '今日AI行业三大看点：巴菲特接班人确立AI落地三原则、DeepMind CEO万字访谈指出物理AI才是未来、Meta完成人形机器人公司收购。',
    summaryEn: 'Three highlights: Berkshire\'s successor establishes AI implementation principles; DeepMind CEO interview says physical AI is the future; Meta completes humanoid robot company acquisition.',
    newsItems: [
      {
        title: '伯克希尔股东大会：阿贝尔确立AI落地三原则',
        titleEn: 'Berkshire Shareholder Meeting: Abel Sets AI Implementation Principles',
        summary: '伯克希尔CEO格雷格·阿贝尔在年度股东大会上表示不会为了AI而AI，确立三大应用原则：引进高端人才、坚守安全治理底线、坚持人类主导核心决策。',
        summaryEn: 'Berkshire CEO Greg Abel states no AI for AI\'s sake — three principles: hire top talent, maintain safety governance底线, keep humans in core decision-making.',
        source: '新浪AI热点',
        category: '产业',
        categoryEn: 'Industry'
      },
      {
        title: 'DeepMind CEO万字访谈：当前AI只是"前菜"，物理AI与具身智能才是未来',
        titleEn: 'DeepMind CEO 10K-Word Interview: Current AI is Just "Appetizer"',
        summary: '诺贝尔化学奖得主、DeepMind CEO Demis Hassabis接受万字硬核访谈，指出当前AI仍处于早期阶段，物理AI和具身智能才是真正的未来方向。',
        summaryEn: 'Nobel laureate and DeepMind CEO Demis Hassabis says current AI is still early stage — physical AI and embodied intelligence are the real future.',
        source: '图灵人工智能',
        category: '大模型',
        categoryEn: 'LLM'
      },
      {
        title: 'Meta完成收购机器人AI公司Assured Robot Intelligence',
        titleEn: 'Meta Completes Acquisition of Robot AI Company',
        summary: 'Meta于5月1日完成对人形机器人AI初创公司Assured Robot Intelligence的收购，加速其人形机器人技术研发进程。',
        summaryEn: 'Meta completes acquisition of humanoid robot AI startup Assured Robot Intelligence on May 1, accelerating humanoid R&D.',
        source: '环球市场播报',
        category: '投资',
        categoryEn: 'Investment'
      },
      {
        title: '杨斌：为什么提"AI次方变革"',
        titleEn: 'Yang Bin: Why "AI-Power Transformation"?',
        summary: '清华经管学院教授杨斌在全民阅读周大会上发表演讲，指出将AI仅仅当作技术问题会给企业带来大麻烦，AI不是"+AI"，而是AI驱动的内容生产体系重构。',
        summaryEn: 'Tsinghua professor Yang Bin: treating AI as merely a technical problem will bring trouble — AI is not "+AI" but a system-level restructuring.',
        source: 'New Economist',
        category: '产业',
        categoryEn: 'Industry'
      }
    ],
    comment: '伯克希尔的AI三原则值得企业参考——务实落地、安全治理、人类决策主导。磐石电气的AIoT落地也可借鉴。',
    commentEn: 'Berkshire\'s AI principles are worth noting — pragmatic implementation, safety governance, human-led decisions. Relevant for MonolithIoT too.'
  },
  {
    date: '2026-05-02',
    title: 'AI新闻 | DeepSeek上线多模态 + 苹果M4 Mac新品 + 软通动力携手华为',
    titleEn: 'AI News | DeepSeek Multimodal + Apple M4 Mac + iSoftStone Partners Huawei',
    summary: '今日AI行业三大看点：DeepSeek V4上线识图功能、苹果M4 Mac系列全面上市、软通动力与华为联合发布OPC产业赋能方案。',
    summaryEn: 'Three highlights: DeepSeek V4 launches image recognition; Apple M4 Mac series goes on sale; iSoftStone & Huawei release OPC industry empowerment solution.',
    newsItems: [
      {
        title: 'DeepSeek上线多模态能力，支持识图功能',
        titleEn: 'DeepSeek Launches Multimodal Capabilities with Image Recognition',
        summary: 'DeepSeek在发布V4后悄悄上线多模态功能，目前处于灰度公测阶段，用户可在聊天窗口看到识图模式，并开源了多模态新范式技术。',
        summaryEn: 'DeepSeek quietly launches multimodal features post-V4 release, currently in gray-scale beta. Open-sourced multimodal paradigm technology.',
        source: '图灵人工智能',
        category: '大模型',
        categoryEn: 'LLM'
      },
      {
        title: '苹果发布M4 Mac系列新品，旧款正式退市',
        titleEn: 'Apple Releases M4 Mac Series, Old Models Discontinued',
        summary: '苹果发布多款搭载M4芯片的Mac新品，包括新iMac、Mac mini和MacBook Pro。M2 Mac mini等旧款正式从官网下架，新款Mac mini尺寸大幅缩小。',
        summaryEn: 'Apple releases M4 Mac lineup — new iMac, Mac mini, MacBook Pro. M2 Mac mini discontinued. New Mac mini dramatically smaller.',
        source: '新浪科技',
        category: '硬件',
        categoryEn: 'Hardware'
      },
      {
        title: '软通动力携手华为发布OPC方案，打通Token价值快车道',
        titleEn: 'iSoftStone & Huawei Release OPC Solution for Token Value',
        summary: '第九届数字中国建设峰会期间，软通动力与华为等伙伴联合发布OPC产业赋能解决方案，与平潭智算中心联合展示睿动AI智能体云平台。',
        summaryEn: 'Digital China Summit: iSoftStone & Huawei partners release OPC industry empowerment solution with Pingtan AI cloud platform.',
        source: '软通动力',
        category: '产业',
        categoryEn: 'Industry'
      }
    ],
    comment: '国产大模型在多模态领域持续突破，但DeepSeek的幻觉问题也提醒我们：AI生成内容必须人工审核。',
    commentEn: 'Chinese LLMs continue multimodal breakthroughs, but DeepSeek hallucination issues remind us: AI-generated content needs human review.'
  },
  {
    date: '2026-05-01',
    title: 'AI新闻 | GPT-5正式发布 + Claude 4安全创纪录 + Qwen-Max 3.0降价',
    titleEn: 'AI News | GPT-5 Released + Claude 4 Security Record + Qwen-Max 3.0 Price Cut',
    summary: '今日AI行业三大看点：OpenAI正式发布GPT-5多模态版、Anthropic Claude 4通过红队测试、阿里云Qwen-Max 3.0推理能力提升5倍且降价40%。',
    summaryEn: 'Three highlights: OpenAI releases GPT-5 multimodal; Anthropic Claude 4 passes red team testing; Alibaba Qwen-Max 3.0 improves reasoning 5x with 40% price cut.',
    newsItems: [
      {
        title: 'OpenAI 发布 GPT-5，支持多模态实时对话',
        titleEn: 'OpenAI Releases GPT-5 with Multimodal Real-Time Conversation',
        summary: 'OpenAI 正式发布 GPT-5，支持文本、图像、音频的实时多模态交互，响应速度比 GPT-4 提升 10 倍。',
        summaryEn: 'OpenAI releases GPT-5 — supports text, image, audio real-time interaction, 10x faster than GPT-4.',
        source: 'OpenAI 官方博客',
        category: '大模型',
        categoryEn: 'LLM'
      },
      {
        title: 'Anthropic Claude 4 通过红队测试，安全性创历史新高',
        titleEn: 'Anthropic Claude 4 Passes Red Team Testing, Security Record',
        summary: 'Anthropic 宣布 Claude 4 模型通过独立安全机构 1000+ 项红队测试，在拒绝有害请求方面准确率达 99.7%。',
        summaryEn: 'Anthropic announces Claude 4 passes 1000+ red team tests, 99.7% accuracy in rejecting harmful requests.',
        source: 'Anthropic Blog',
        category: '大模型',
        categoryEn: 'LLM'
      },
      {
        title: '阿里云通义千问推出 Qwen-Max 3.0，推理能力提升 5 倍',
        titleEn: 'Alibaba Qwen-Max 3.0: 5x Reasoning Improvement',
        summary: '阿里云发布通义千问 Qwen-Max 3.0，数学推理和代码生成能力大幅提升，价格下降 40%。',
        summaryEn: 'Alibaba releases Qwen-Max 3.0 — major improvements in math reasoning and code generation, 40% price reduction.',
        source: '阿里云',
        category: '大模型',
        categoryEn: 'LLM'
      },
      {
        title: '英伟达发布新一代 AI 芯片 Blackwell Ultra，算力翻倍',
        titleEn: 'Nvidia Releases Next-Gen AI Chip Blackwell Ultra',
        summary: '英伟达在 GTC 大会上发布 Blackwell Ultra GPU，单卡算力达到 20 PFLOPS，专为大规模 AI 训练设计。',
        summaryEn: 'Nvidia releases Blackwell Ultra GPU at GTC — 20 PFLOPS per card, designed for large-scale AI training.',
        source: 'NVIDIA GTC 2026',
        category: '硬件',
        categoryEn: 'Hardware'
      }
    ],
    comment: '多模态交互从"能听懂"进化到"能看懂+能听到"，AI 助理的体验门槛进一步降低。',
    commentEn: 'Multimodal interaction evolves from "hearing" to "seeing+hearing" — AI assistant experience barrier further lowered.'
  }
];
