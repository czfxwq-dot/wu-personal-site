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
    summary: '今日AI行业三大看点：百度正式发布文心大模型5.1，以同规模模型约6%的预训练成本达到基础效果领先；光帆科技全球首款带视觉感知的主动式AI耳机将于5月15日开售；乐享科技旗下Zeroth元点M1人形机器人成为全球首个接入腾讯OpenClaw的可量产人形机器人。',
    newsItems: [
      {
        title: '百度正式发布文心大模型5.1，登上LMArena搜索榜国内第一',
        summary: '百度正式发布新一代基础大模型文心大模型5.1。文心5.1采用"多维弹性预训练"技术，仅以业界同规模模型约6%的预训练成本，达到基础效果领先水平，登上LMArena搜索榜国内第一。',
        source: '36氪',
        category: '大模型'
      },
      {
        title: '光帆科技全球首款带视觉感知AI耳机将于5月15日开售',
        summary: '光帆科技官方发布发售预热海报，全球首款具备视觉感知能力的主动式AI耳机——光帆全感AI耳机，将于5月15日正式开售。该耳机集成摄像头，可实现视觉感知能力，拓展AI耳机的交互边界。',
        source: '36氪',
        category: '硬件'
      },
      {
        title: 'Zeroth元点M1成为全球首个接入OpenClaw的人形机器人',
        summary: '乐享科技正式官宣，旗下具身智能品牌Zeroth元点的M1人形机器人成为全球首款接入腾讯OpenClaw（小龙虾）的可量产人形机器人。乐享科技已与腾讯达成万台硬件终端接入的意向，M1计划于5月下旬正式上线，上半年启动预售。',
        source: '36氪',
        category: '硬件'
      },
      {
        title: '智源FlagSafe大模型安全平台正式发布',
        summary: '北京智源人工智能研究院联合北京大学、北邮、北航、上海交大、中科院信工所等机构，正式发布FlagSafe大模型安全平台。平台首批汇聚多个前沿大模型安全研究项目，围绕红队演练、蓝队防御、白盒透视三个核心方向，打造覆盖风险发现、防御治理与机理解释的安全平台。',
        source: '36氪',
        category: '大模型'
      },
      {
        title: 'DeepSeek与阿里谈崩？市场人士回应阿里未进行谈判',
        summary: '有消息称DeepSeek在4月展开巨额融资计划，同时吸引腾讯和阿里巴巴，但近期阿里和DeepSeek谈崩。市场人士回应称阿里应该没有进行谈判。DeepSeek此前已获得腾讯投资，融资动向备受关注。',
        source: '36氪/每经网',
        category: '投资'
      }
    ],
    comment: '文心5.1以6%的成本达到领先效果，说明大模型训练效率正在快速提升。AI硬件赛道持续升温——从AI耳机到人形机器人，AI正从软件走向实体。OpenClaw生态再添硬件伙伴，具身智能落地加速。'
  },
  {
    date: '2026-05-09',
    title: 'AI新闻 | 高盛：美国数据中心用电需求两年内翻倍 + 海光DCU适配混元大模型 + 浙江人形机器人签约2000台',
    summary: '今日AI行业三大看点：高盛预计美国数据中心电力需求将在两年内翻倍，AI基建持续扩张；海光信息完成深算3号DCU与腾讯混元Hy3 preview大模型深度适配；浙江人形机器人创新中心与杰克科技签约2000台服装场景定制机器人。',
    newsItems: [
      {
        title: '高盛：美国数据中心用电需求或在两年内翻倍',
        summary: '高盛预计，美国数据中心电力需求将从2025年的31GW增长至2026年的41GW，并在2027年进一步升至66GW。高盛认为，本轮AI数据中心扩张正在重塑美国地理格局。得州和佐治亚州正成为AI数据中心的重要聚集地，因为这些地区电力供应扩张更快，接入能力更强。',
        source: '36氪/财联社',
        category: '产业'
      },
      {
        title: '海光DCU完成与混元Hy3 preview大模型的深度适配',
        summary: '海光信息完成深算3号DCU与腾讯混元Hy3 preview大模型的深度适配。腾讯混元Hy3 preview是腾讯最新发布的大模型版本，具备295B总参数规模，并支持256K超长上下文，在复杂推理、Agent能力和代码生成等方面实现提升。',
        source: '36氪',
        category: '大模型'
      },
      {
        title: '浙江人形机器人创新中心与杰克科技签约2000台服装场景定制机器人',
        summary: '浙江人形机器人创新中心与杰克科技达成战略合作，签约2000台服装场景定制人形机器人。双方将共建产业生态，规划从2000台迈向百万台级服装人形机器人集群，以技术+场景创新推动服装柔性智造升级。',
        source: '36氪',
        category: '硬件'
      },
      {
        title: '通鼎互联拟设立合资公司投资8亿元建设光棒光纤项目',
        summary: '通鼎互联公告，拟与韶关市曲江区国资成立合资公司，注册资本8亿元，投资约8亿元建设年产600吨光棒及2000万芯公里光纤项目，公司及控股股东通鼎集团提供全额连带责任保证担保。',
        source: '36氪',
        category: '产业'
      }
    ],
    comment: 'AI基建仍在狂飙——高盛预测数据中心用电两年翻倍，得州和佐治亚成为新热点。国内芯片适配方面，海光DCU与腾讯混元大模型完成深度适配，295B参数规模值得关注。人形机器人也开始从实验室走向产线，2000台签约只是开始。'
  },
  {
    date: '2026-05-08',
    title: 'AI新闻 | 重庆出台L3+自动驾驶高速测试新规 + 美股科技股分化 + 越剑智能提示炒作风险',
    summary: '今日AI行业两大看点：重庆发布智能网联汽车高速公路测试管理细则，规范L3级以上自动驾驶测试；美股科技股涨跌互现，特斯拉涨超3%、英伟达涨超1%、英特尔跌3%。',
    newsItems: [
      {
        title: '重庆出台智能汽车高速公路测试新规，规范L3级以上自动驾驶测试',
        summary: '重庆市经济信息委联合市公安局、市交委印发《重庆市智能网联汽车高速公路测试管理细则（试行）》，进一步补齐高阶自动驾驶高速场景测试制度短板，规范L3级及以上智能网联汽车高速道路测试全流程管理，以安全可控、规范有序加速自动驾驶技术落地商业化应用。',
        source: '36氪/重庆日报',
        category: '产业'
      },
      {
        title: '美股科技股涨跌互现，AI芯片板块分化',
        summary: '5月7日美股三大指数集体收跌，道指跌0.63%，标普跌0.38%，纳指跌0.13%。大型科技股涨跌互现：特斯拉涨超3%，微软涨超1%，英伟达涨超1%，Meta小幅上涨；英特尔跌3%，亚马逊跌超1%。热门中概股普跌，小鹏跌超2%，百度、理想小幅下跌。',
        source: '36氪',
        category: '投资'
      },
      {
        title: '越剑智能提示炒作风险：智能验布机销售收入不足百万元',
        summary: '越剑智能发布股票交易风险提示公告，公司股票6个交易日中5个涨停，累计涨幅53.58%。公司表示智能验布机产品仍在市场推广前期阶段，2025年度销售收入不足百万元，占主营业务收入远低于1%，未来能否形成稳定收入存在重大不确定性。',
        source: '36氪',
        category: '产业'
      },
      {
        title: '英监管机构调查三大支付巨头涉嫌垄断行为',
        summary: '英国金融行为监管局对贝宝、万事达卡、维萨围绕贝宝数字钱包的相关行为启动反垄断调查，重点涉及贝宝数字钱包的使用及资金运作模式。',
        source: '36氪/新华社',
        category: '产业'
      }
    ],
    comment: '自动驾驶政策落地加速（重庆L3+高速测试新规）是好信号，但AI概念股炒作风险也不容忽视（越剑智能涨停5天收入不足百万）。英伟达股价仍在涨，但英特尔继续走弱，芯片板块内部分化加剧。'
  },
  {
    date: '2026-05-07',
    title: 'AI新闻 | MiroThinker暂停中国服务 + 康宁英伟达5亿美元合作 + Arm涨超13%',
    summary: '今日AI行业三大看点：陈天桥旗下AI公司MiroMind暂停中国大陆服务、康宁与英伟达达成5亿美元股权融资深化合作、美股Arm涨超13%带动AI芯片板块集体走强。',
    newsItems: [
      {
        title: 'MiroMind暂停中国大陆及港澳地区服务',
        summary: 'MiroMind公司宣布，旗下MiroThinker智能体服务（dr.miromind.ai网页版与MiroMind移动应用）将于2026年5月12日起暂停向中国大陆、香港、澳门地区提供，恢复时间待定。MiroMind是盛大集团创始人陈天桥创办的AI研究公司。官网不受影响。',
        source: '36氪/第一财经',
        category: '大模型'
      },
      {
        title: '康宁与英伟达达成5亿美元股权融资协议',
        summary: '康宁公司与英伟达签署证券购买协议，康宁向英伟达发行总价5亿美元的认股权证。英伟达获得可购买最多1500万股康宁普通股的认股权证，行权价每股180美元；另获300万股预融资认股权证，行权价每股0.0001美元。此举旨在深化双方在光通信等领域的长期合作。',
        source: '36氪/界面',
        category: '产业'
      },
      {
        title: '苹果多款高性能Mac遭下架，疑因内存供应紧张',
        summary: '苹果在线商店下架了多款配备32GB和64GB内存的高性能Mac设备，高规格内存版本短缺尤为严峻。知情人士透露，苹果之前未预计到需求如此火爆，供应调整需要时间。AI时代带来的内存需求增长正蔓延至消费端。',
        source: '36氪/澎湃新闻',
        category: '硬件'
      },
      {
        title: '美股Arm涨超13%，AI芯片板块集体走强',
        summary: '美股三大指数集体收涨，大型科技股普涨。Arm涨超13%，英伟达涨超5%，带动AI芯片板块表现强势。热门中概股多数走强，百度涨超11%，阿里巴巴涨超6%。',
        source: '36氪',
        category: '投资'
      }
    ],
    comment: 'AI基础设施需求持续爆发——从芯片到内存全面吃紧，巨头用真金白银（英伟达5亿投资）押注供应链安全。同时，AI智能体出海也面临地缘挑战（MiroMind暂停服务）。'
  },
  {
    date: '2026-05-06',
    title: 'AI新闻 | OpenAI与Anthropic合资收购AI服务公司 + 贝宝裁员20%转投AI + Anthropic发布金融AI智能体',
    summary: '今日AI行业三大看点：OpenAI与Anthropic分别与PE成立合资企业洽谈收购AI服务公司、贝宝宣布裁员20%加速AI转型、Anthropic发布面向金融服务的10款AI智能体。',
    newsItems: [
      {
        title: 'OpenAI与Anthropic合资企业洽谈收购AI服务公司',
        summary: 'OpenAI和Anthropic分别与私募股权公司成立合资企业，正在洽谈收购帮助企业管理AI系统的服务公司。OpenAI的合资企业Deployment Company已筹集约40亿美元，估值达100亿美元，目前有三笔交易进入后期阶段。Anthropic则通过其合资企业筹集约15亿美元，投资者包括黑石集团、高盛等。此举标志着两家AI巨头从模型研发向大规模商业部署延伸。',
        source: '36氪/新浪财经',
        category: '产业'
      },
      {
        title: '贝宝推进转型重组，计划裁员20%加速AI落地',
        summary: '贝宝计划在未来两至三年内裁员20%，共计4760个岗位。CEO恩里克・洛雷斯表示公司过往在技术平台投入不足，已落后于其他金融科技同行，计划砍掉冗余管理层级，把更多资源投向人工智能研发，力争成为行业技术领军者。',
        source: '新浪财经',
        category: '产业'
      },
      {
        title: 'Coinbase裁员14%转向AI优先模式',
        summary: '美国最大加密货币交易所Coinbase宣布将裁减约14%的员工，约660至700人受影响。CEO Brian Armstrong表示此举旨在应对加密市场波动与AI技术变革的双重压力，打造"更精简、更快速、更高效"的AI原生组织。',
        source: '新浪财经',
        category: '产业'
      },
      {
        title: 'Anthropic发布面向金融服务的新型AI智能体',
        summary: 'Anthropic推出10款新的AI智能体，旨在处理更广泛的金融服务任务，包括撰写客户会议演示文稿、审核财务报表、合规审查等。目标用户是银行、保险、资产管理和金融科技领域的专业人士。CEO Dario Amodei将与摩根大通CEO Jamie Dimon共同出席AI活动。',
        source: '财联社',
        category: '大模型'
      },
      {
        title: '多家出版商起诉Meta盗用版权作品训练AI',
        summary: '圣智学习、阿歇特出版、麦克米伦、麦格劳等出版商及作家对Meta提起集体诉讼，指控其非法使用受版权保护的作品训练AI模型，要求启动陪审团庭审审理版权侵权诉求。',
        source: '新浪财经',
        category: '产业'
      }
    ],
    comment: 'OpenAI和Anthropic通过PE合资企业大举并购，AI行业从"卖模型"走向"卖服务"；贝宝和Coinbase同时裁员转AI，传统企业AI转型进入深水区。'
  },
  {
    date: '2026-05-05',
    title: 'AI新闻 | 诺奖得主谈AI与就业 + 具身智能催生百万新职业 + 第九届数字中国峰会AI亮点',
    summary: '今日AI行业三大看点：诺奖得主布林约尔松提出AI应赋能而非替代人类、具身智能数据采集员等新职业预计新增超百万岗位、第九届数字中国建设峰会集中展示AI最新应用。',
    newsItems: [
      {
        title: '诺奖得主布林约尔松：AI不应替代人类，而应拓展人的能力边界',
        summary: '斯坦福大学数字经济实验室主任、2024年诺贝尔经济学奖得主布林约尔松提出"图灵陷阱"概念，批评AI行业一味追求机器模仿和替代人类的思路，主张转向借助技术拓展人的能力边界，让人完成从前无法实现的事。据世界经济论坛统计，过去两年全球新增约130万个AI相关岗位，到2030年AI有望创造1.7亿个全新就业。',
        source: '中新网',
        category: '产业'
      },
      {
        title: '机器人"启蒙老师"新职业爆发，预计五年新增岗位超百万',
        summary: '具身智能发展催生"数据采集员""机器人训练师"等新职业群体。全国联动集群累计沉淀本土化真实数据突破2000万条，2026年前4个月新增超800万条，同比增长120%以上。预计未来五年我国具身智能市场规模将达4000亿元，新增就业岗位超100万个。',
        source: '央视网',
        category: '产业'
      },
      {
        title: 'AI"秒级匹配"成寻根新钥匙，大模型赋能传统文化',
        summary: '第九届数字中国建设峰会现场，福建网龙网络公司展示依托AI生成的"华夏宗亲大福树"应用，输入姓氏即可生成3D宗族树。基于大模型的"侨脉智联"平台能将数周人工考证压缩至分秒之间，AI古文字修复与图片识别技术帮助海外华侨精准定位祖籍地。',
        source: '中新网',
        category: '大模型'
      },
      {
        title: '马达加斯加10万人投身AI行业，AI训练创造新就业',
        summary: '在全球最贫困国家之一的马达加斯加，AI浪潮催生数据标注行业，截至2025年底已有约10万人从事AI相关行业。当地AI数据标注员月薪120欧元，比80欧元的平均薪资高出50%，大批年轻人投身人工智能行业。',
        source: '中新网',
        category: '产业'
      },
      {
        title: '直播电商十年：从"人海战术"到AI"人机协同"',
        summary: '直播电商行业走过十年，正从依赖大量人工主播的模式转向AI人机协同。AI技术在智能选品、虚拟主播、自动化运营等环节深度介入，大幅降低人力成本，提升转化效率。',
        source: '中新网',
        category: '产业'
      }
    ],
    comment: 'AI从"替代焦虑"走向"赋能协作"——诺奖得主的观点给产业界吃下定心丸，具身智能新职业更是证明AI在创造就业而非消灭就业。'
  },
  {
    date: '2026-05-04',
    title: 'AI新闻 | 苹果Siri升级为独立App + 黄仁勋称英伟达中国市场份额归零 + DeepSeek V4 Pro成本暴降',
    summary: '今日AI行业三大看点：苹果iOS 27重心转向AI、英伟达中国市场份额归零、DeepSeek V4 Pro成本仅8.7美分/百万token。',
    newsItems: [
      {
        title: '苹果iOS 27将重心转向AI，Siri升级为独立App',
        summary: 'iOS 27将重心转向AI，Siri将重塑为独立App并支持多任务指令，Apple Intelligence的照片搜索等功能深度整合到相机应用中。',
        source: 'IT之家',
        category: '硬件'
      },
      {
        title: '黄仁勋：英伟达在中国市场份额已降为零',
        summary: '黄仁勋公开表示英伟达在中国AI芯片市场的份额已归零，受美国出口管制政策影响，英伟达失去中国这一全球最大的AI市场。',
        source: '新浪财经',
        category: '硬件'
      },
      {
        title: 'DeepSeek V4 Pro成本仅8.7美分/百万token，为行业1/1700',
        summary: 'DeepSeek V4 Pro推理成本大幅降低，仅需8.7美分/百万token，仅为Anthropic Sonnet（15美元）的1/1700，引发行业对开源模型成本优势的热议。',
        source: '新浪财经',
        category: '大模型'
      },
      {
        title: '腾讯云宣布5月9日起AI算力相关产品涨价5%',
        summary: '腾讯云宣布自5月9日起，AI算力、容器服务、EMR等相关产品价格上调5%，成为继阿里云之后第二家宣布涨价的云厂商。',
        source: '雪球',
        category: '产业'
      }
    ],
    comment: 'AI应用落地的最大障碍是成本，DeepSeek把价格打到1/1700，中小企业用AI的门槛几乎消失。' 
  },
  {
    date: '2026-05-03',
    title: 'AI新闻 | 伯克希尔AI三原则 + DeepMind万字硬核访谈 + Meta收购机器人公司',
    summary: '今日AI行业三大看点：巴菲特接班人确立AI落地三原则、DeepMind CEO万字访谈指出物理AI才是未来、Meta完成人形机器人公司收购。',
    newsItems: [
      {
        title: '伯克希尔股东大会：阿贝尔确立AI落地三原则',
        summary: '伯克希尔CEO格雷格·阿贝尔在年度股东大会上表示不会为了AI而AI，确立三大应用原则：引进高端人才、坚守安全治理底线、坚持人类主导核心决策。',
        source: '新浪AI热点',
        category: '产业'
      },
      {
        title: 'DeepMind CEO万字访谈：当前AI只是"前菜"，物理AI与具身智能才是未来',
        summary: '诺贝尔化学奖得主、DeepMind CEO Demis Hassabis接受万字硬核访谈，指出当前AI仍处于早期阶段，物理AI和具身智能才是真正的未来方向。',
        source: '图灵人工智能',
        category: '大模型'
      },
      {
        title: 'Meta完成收购机器人AI公司Assured Robot Intelligence',
        summary: 'Meta于5月1日完成对人形机器人AI初创公司Assured Robot Intelligence的收购，加速其人形机器人技术研发进程。',
        source: '环球市场播报',
        category: '投资'
      },
      {
        title: '杨斌：为什么提"AI次方变革"',
        summary: '清华经管学院教授杨斌在全民阅读周大会上发表演讲，指出将AI仅仅当作技术问题会给企业带来大麻烦，AI不是"+AI"，而是AI驱动的内容生产体系重构。',
        source: 'New Economist',
        category: '产业'
      }
    ],
    comment: '伯克希尔的AI三原则值得企业参考——务实落地、安全治理、人类决策主导。磐石电气的AIoT落地也可借鉴。'
  },
  {
    date: '2026-05-02',
    title: 'AI新闻 | DeepSeek上线多模态 + 苹果M4 Mac新品 + 软通动力携手华为',
    summary: '今日AI行业三大看点：DeepSeek V4上线识图功能、苹果M4 Mac系列全面上市、软通动力与华为联合发布OPC产业赋能方案。',
    newsItems: [
      {
        title: 'DeepSeek上线多模态能力，支持识图功能',
        summary: 'DeepSeek在发布V4后悄悄上线多模态功能，目前处于灰度公测阶段，用户可在聊天窗口看到识图模式，并开源了多模态新范式技术。',
        source: '图灵人工智能',
        category: '大模型'
      },
      {
        title: '苹果发布M4 Mac系列新品，旧款正式退市',
        summary: '苹果发布多款搭载M4芯片的Mac新品，包括新iMac、Mac mini和MacBook Pro。M2 Mac mini等旧款正式从官网下架，新款Mac mini尺寸大幅缩小。',
        source: '新浪科技',
        category: '硬件'
      },
      {
        title: '软通动力携手华为发布OPC方案，打通Token价值快车道',
        summary: '第九届数字中国建设峰会期间，软通动力与华为等伙伴联合发布OPC产业赋能解决方案，与平潭智算中心联合展示睿动AI智能体云平台。',
        source: '软通动力',
        category: '产业'
      }
    ],
    comment: '国产大模型在多模态领域持续突破，但DeepSeek的幻觉问题也提醒我们：AI生成内容必须人工审核。'
  },
  {
    date: '2026-05-01',
    title: 'AI新闻 | GPT-5正式发布 + Claude 4安全创纪录 + Qwen-Max 3.0降价',
    summary: '今日AI行业三大看点：OpenAI正式发布GPT-5多模态版、Anthropic Claude 4通过红队测试、阿里云Qwen-Max 3.0推理能力提升5倍且降价40%。',
    newsItems: [
      {
        title: 'OpenAI 发布 GPT-5，支持多模态实时对话',
        summary: 'OpenAI 正式发布 GPT-5，支持文本、图像、音频的实时多模态交互，响应速度比 GPT-4 提升 10 倍。',
        source: 'OpenAI 官方博客',
        category: '大模型'
      },
      {
        title: 'Anthropic Claude 4 通过红队测试，安全性创历史新高',
        summary: 'Anthropic 宣布 Claude 4 模型通过独立安全机构 1000+ 项红队测试，在拒绝有害请求方面准确率达 99.7%。',
        source: 'Anthropic Blog',
        category: '大模型'
      },
      {
        title: '阿里云通义千问推出 Qwen-Max 3.0，推理能力提升 5 倍',
        summary: '阿里云发布通义千问 Qwen-Max 3.0，数学推理和代码生成能力大幅提升，价格下降 40%。',
        source: '阿里云',
        category: '大模型'
      },
      {
        title: '英伟达发布新一代 AI 芯片 Blackwell Ultra，算力翻倍',
        summary: '英伟达在 GTC 大会上发布 Blackwell Ultra GPU，单卡算力达到 20 PFLOPS，专为大规模 AI 训练设计。',
        source: 'NVIDIA GTC 2026',
        category: '硬件'
      }
    ],
    comment: '多模态交互从"能听懂"进化到"能看懂+能听到"，AI 助理的体验门槛进一步降低。'
  }
];
