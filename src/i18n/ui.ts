export type Locale = 'zh' | 'en';

export const ui = {
  zh: {
    // Navigation
    siteName: '观吾',
    navHome: '首页',
    navDiary: '日记',
    navAiNews: 'AI新闻',
    navBanbaiguan: '半百观',
    navGuestbook: '留言板',
    navAbout: '关于',

    // Hero
    heroEyebrow: 'AI 实践者 · 半百观AI主理人',
    heroTitle: '50岁，用AI把想法变成现实',
    heroSubtitle: '磐石电气联合创始人 · AIoT实践者 · 半百观AI主理人',
    heroDescription1: '这不是一个普通的个人网站。',
    heroDescription2: '它是我和我的AI助理一起，从0到1建造出来的。',
    heroDescriptionSub: '分享AI工具落地实践 · 数字化智能库存管理 · 50岁学AI的真实故事',
    heroBtnDiary: '看工作日记',
    heroBtnAbout: '了解更多',
    heroScrollHint: '向下滚动',

    // Homepage sections
    sectionRecent: '最近更新',
    sectionRecentMore: '查看完整时间线',
    sectionAiProjects: 'AI 项目',
    sectionCompany: '关于公司',
    sectionFollow: '关注我们',
    sectionFollowSubtitle: '在各平台搜索「半百观AI」即可找到我们',

    // Card labels
    cardDiary: '工作日记',
    cardAiNews: 'AI 新闻',
    cardArticle: '半百观AI',

    // Company
    companyBadge: '国家级高新技术企业',
    companyName: '磐石电气（常州）有限公司',
    companyDesc: '精准定位AI场景解决方案提供商。依托多传感器融合、智慧存储AI中台、多模态算法三大核心技术，打通场景数智化全链路。',
    companyClientsLabel: '长期服务',
    companyLearnMore: '了解更多',
    companyVisit: '访问公司官网',

    // Footer
    footerBrand: '观吾',
    footerSubtitle: '磐石电气联合创始人 · AIoT实践者',
    footerCompanySite: '公司业务官网',
    footerQrHint: '扫码关注「半百观AI」',
    footerQrGzh: '公众号',
    footerQrDy: '视频号',
    footerCopy: '2026 观吾 · banbai.ai',
    footerCredit: '这个网站由AI助理开发并维护',

    // FollowUsCard
    followTitle: '关注「半百观AI」',
    followSubtitle: '50岁视角看AI工具落地实践',
    followPlatforms: [
      { icon: '💬', name: '微信公众号' },
      { icon: '🎥', name: '视频号' },
      { icon: '🎵', name: '抖音' },
      { icon: '📰', name: '今日头条' },
      { icon: '🍉', name: '西瓜视频' },
      { icon: '📺', name: 'B 站' },
      { icon: '📕', name: '小红书' },
    ],
    followSearch: '也可在今日头条 · B站 · 西瓜视频 搜索「半百观AI」',

    // ChatWidget
    chatTitle: '山山 AI 助理',
    chatStatus: '半百观AI · 在线',
    chatGreeting1: '你好！我是山山，半百观AI 的智能助理',
    chatGreeting2: '我可以帮你了解最新的 AI 资讯、工具推荐，也可以带你关注我们的各平台账号。',
    chatGreeting3: '你可以问我：',
    chatGreeting4: '最近有什么好用的 AI 工具？',
    chatGreeting5: '你们在哪些平台有账号？',
    chatGreeting6: '有什么值得看的 AI 文章？',
    chatPlaceholder: '问问山山...',
    chatBtnAiNews: '今日 AI',
    chatBtnFollow: '关注我们',
    chatBtnArticles: '最新文章',
    chatBtnGuestbook: '留言板',

    // ArticleJsonLd
    sectionDiary: '工作日记',
    sectionAiNews: 'AI 新闻',
    sectionBanbaiguan: '半百观 AI',

    // Citations
    citationsTitle: '参考资料',
    citationsNote: '以上内容基于以下来源整理',

    // PlatformCitations
    platformCta: '在以下平台搜索获取更多信息',

    // TopicScoreCard
    topicScoreTitle: '内容选题评分卡',
    topicScoreGuide: '13个维度综合评分，80分以上为优质选题',
  },

  en: {
    // Navigation
    siteName: 'Guanwu',
    navHome: 'Home',
    navDiary: 'Diary',
    navAiNews: 'AI News',
    navBanbaiguan: 'BanbaiGuan',
    navGuestbook: 'Guestbook',
    navAbout: 'About',

    // Hero
    heroEyebrow: 'AI Practitioner · Founder at 50',
    heroTitle: 'At 50, I use AI to turn ideas into reality',
    heroSubtitle: 'Co-founder of MonolithIoT · AIoT Practitioner · BanbaiGuan AI',
    heroDescription1: 'This is not a typical personal website.',
    heroDescription2: 'My AI assistant and I built it from scratch, together.',
    heroDescriptionSub: 'AI tool practices · Smart inventory management · My honest 50-year-old AI learning journey',
    heroBtnDiary: 'Read My Diary',
    heroBtnAbout: 'Learn More',
    heroScrollHint: 'Scroll down',

    // Homepage sections
    sectionRecent: 'Latest Updates',
    sectionRecentMore: 'View Full Timeline',
    sectionAiProjects: 'AI Projects',
    sectionCompany: 'About the Company',
    sectionFollow: 'Follow Us',
    sectionFollowSubtitle: 'Search "BanbaiGuan AI" on all platforms to find us',

    // Card labels
    cardDiary: 'Diary',
    cardAiNews: 'AI News',
    cardArticle: 'BanbaiGuan AI',

    // Company
    companyBadge: 'National High-Tech Enterprise',
    companyName: 'MonolithIoT (Changzhou) Co., Ltd.',
    companyDesc: 'An AI scenario solutions provider. Built on three core technologies: multi-sensor fusion, AI-powered storage middleware, and multimodal algorithms — digitizing the entire industrial chain.',
    companyClientsLabel: 'Trusted by',
    companyLearnMore: 'Learn More',
    companyVisit: 'Visit Company Site',

    // Footer
    footerBrand: 'Guanwu',
    footerSubtitle: 'Co-founder of MonolithIoT · AIoT Practitioner',
    footerCompanySite: 'Company Website',
    footerQrHint: 'Follow "BanbaiGuan AI"',
    footerQrGzh: 'WeChat',
    footerQrDy: 'Video Account',
    footerCopy: '2026 Guanwu · ban-bai.com',
    footerCredit: 'This site was built and maintained by an AI assistant',

    // FollowUsCard
    followTitle: 'Follow "BanbaiGuan AI"',
    followSubtitle: "A 50-year-old's honest take on AI tool adoption",
    followPlatforms: [
      { icon: '💬', name: 'WeChat Official Account' },
      { icon: '🎥', name: 'Video Account' },
      { icon: '🎵', name: 'Douyin' },
      { icon: '📰', name: 'Toutiao' },
      { icon: '🍉', name: 'Xigua Video' },
      { icon: '📺', name: 'Bilibili' },
      { icon: '📕', name: 'Xiaohongshu' },
    ],
    followSearch: 'Or search "半百观AI" on Bilibili · Xigua Video · Toutiao',

    // ChatWidget
    chatTitle: 'Shanshan AI Assistant',
    chatStatus: 'Online',
    chatGreeting1: 'Hi! I\'m Shanshan, the AI assistant for BanbaiGuan AI',
    chatGreeting2: 'I can help you with the latest AI news, tool recommendations, and our social media accounts.',
    chatGreeting3: 'You can ask me:',
    chatGreeting4: 'What AI tools are trending lately?',
    chatGreeting5: 'Where can I follow you?',
    chatGreeting6: 'Any recommended AI articles?',
    chatPlaceholder: 'Ask Shanshan...',
    chatBtnAiNews: 'AI News',
    chatBtnFollow: 'Follow Us',
    chatBtnArticles: 'Articles',
    chatBtnGuestbook: 'Guestbook',

    // ArticleJsonLd
    sectionDiary: 'Diary',
    sectionAiNews: 'AI News',
    sectionBanbaiguan: 'BanbaiGuan AI',

    // Citations
    citationsTitle: 'References',
    citationsNote: 'Content compiled from the following sources',

    // PlatformCitations
    platformCta: 'Search on the following platforms for more info',

    // TopicScoreCard
    topicScoreTitle: 'Content Topic Scorecard',
    topicScoreGuide: '13-dimension scoring, 80+ for high-quality topics',
  },
} as const;

export function t(key: string, lang: Locale = 'zh'): string {
  const keys = key.split('.');
  let value: unknown = ui[lang];
  for (const k of keys) {
    if (value && typeof value === 'object' && k in (value as Record<string, unknown>)) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  return typeof value === 'string' ? value : key;
}

export function getLocaleStrings(lang: Locale) {
  return ui[lang];
}
