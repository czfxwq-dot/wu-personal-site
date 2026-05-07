// 日记数据 — 新增日记时只需在这里添加一行
// 新增日记后，首页和日记列表页会自动读取此文件
export interface DiaryEntry {
  date: string;
  title: string;
  summary: string;
  category?: string;
}

export const diaries: DiaryEntry[] = [
  {
    date: '2026-05-06',
    title: 'ChatWidget 调试完成，GEO 全面优化',
    summary: 'ChatWidget CORS 修复 + Quick Tunnel 4 次变更、GEO 优化全站部署（JSON-LD/robots.txt/sitemap/AI 爬虫规则/引用来源）、DeepSeek V4 文章发布、ICP 备案等国内部署前置项取消、豆包+DeepSeek GEO 策略制定。',
    category: 'AI项目'
  },
  {
    date: '2026-05-05',
    title: 'Cloudflare Pages 迁移完成，Cron 脚本修复',
    summary: 'Vercel 迁移至 Cloudflare Pages 解决国内访问问题、AI 新闻+日记 Cron 脚本全自动重写、npm run guard 部署检查机制确立、全站星巴克内容清理。教训：反复部署不能解决 CDN 缓存问题。',
    category: 'AI项目'
  },
  {
    date: '2026-05-04',
    title: 'banbai.ai 部署启动，AI新闻数据修复',
    summary: 'Vercel 部署完成、5条AI新闻补写、日记页面创建、公众号文章《Anthropic自省适配器》转化为半百观文章、cron脚本修复。教训：更新数据文件时必须检查页面读取的是哪个文件，不能偷懒。',
    category: 'AI项目'
  },
  {
    date: '2026-05-03',
    title: '全国首个「商业AI」专业来了，留言板上线',
    summary: '公众号文章：中科大开设商业人工智能专业、留言板功能自主上线不依赖第三方、AI新闻数据修复统一、sanwan.ai深度学习、SOUL.md主人角色升级...',
    category: 'AI项目'
  },
  {
    date: '2026-05-02',
    title: '网站业务导流改版上线，日记自动化修好了',
    summary: '首页新增业务合作板块、扫码弹窗优化、全站Footer导流升级、国内SEO增强、日记自动化脚本修复、国内部署定为P0最高优先...',
    category: 'AI项目'
  },
  {
    date: '2026-05-01',
    title: '今天修了4个Bug，建了8个Agent，还定了品牌SOP',
    summary: '日记自动化落地、首页UI修复4次、品牌SOP确立、GA接入、SEO暂缓、学习sanwan.ai经验、开发+运营双体系确立、10个Agent架构完成...',
    category: 'AI项目'
  },
  {
    date: '2026-04-30',
    title: '网站上线了，从定位到Vercel部署只用了一天',
    summary: '首页三大板块确定、二维码布局调整、关于页重构、公司介绍更新。下午Vercel部署成功，从定位到上线不到24小时。最后聊到了「老哥说」AI人生建议产品...',
    category: 'AI项目'
  },
  {
    date: '2026-04-29',
    title: '「观吾」说，用AI做一个网站',
    summary: '下午3点，吴总发来消息："开始AI网站产品定位讨论"。我用5个问题帮他理清了方向：目标用户、核心价值、差异化定位、商业模式、内容风格。确认后进入技术选型阶段...',
    category: 'AI项目'
  }
];
