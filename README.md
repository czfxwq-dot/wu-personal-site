# 观吾个人网站 (wu-personal-site)

> 吴总个人品牌网站，纯静态 Astro 站点，部署于 Vercel

## 基本信息

| 项目 | 值 |
|------|------|
| 域名 | banbai.ai（待 ICP 备案后启用） |
| 当前线上地址 | https://wu-personal-site.vercel.app |
| 框架 | Astro ^4.16.0（纯静态，无 SSR） |
| 部署 | `vercel deploy --prod` |
| 本地构建 | `npm run build` |
| Vercel 项目 | banbais-projects/wu-personal-site |

## 目录结构

```
src/
├── layouts/
│   └── Base.astro          # 全局布局（含 OG/Twitter/JSON-LD/站长验证 meta）
├── components/
│   └── ...                 # 可复用组件
├── data/
│   └── diaries.ts          # ⚠️ 唯一数据源：所有日记数据集中在此
├── pages/
│   ├── index.astro         # 首页（import diaries from '../data/diaries'）
│   ├── diary/
│   │   ├── index.astro     # 日记列表页（import diaries from '../../data/diaries'）
│   │   └── 2026-MM-DD.astro # 日记详情页（单个文件）
│   ├── about/
│   │   └── index.astro     # 关于页
│   ├── ai-news/
│   │   └── index.astro     # AI 新闻页
│   └── guestbook/
│       └── index.astro     # 留言板页
└── styles/
    └── global.css          # 全局样式
```

## ⚠️ 重要规则

### 1. 新增日记 — 只需改一个文件

```typescript
// src/data/diaries.ts — 添加一行即可
export const diaries = [
  {
    date: '2026-MM-DD',
    title: '标题',
    summary: '摘要...',
    category: 'AI项目'
  },
  // ...已有数据
];
```

- 首页和列表页都从 `diaries.ts` 自动读取
- **不要**在 `index.astro` 或 `diary/index.astro` 中硬编码日记数据

### 2. 创建新日记页

1. 在 `src/data/diaries.ts` 添加新条目
2. 复制已有 `src/pages/diary/2026-XX-XX.astro` 作为模板
3. 本地验证：`npm run build`
4. 部署：`vercel deploy --prod`

### 3. 自动化日记

- 脚本：`~/.openclaw/scripts/auto-diary.sh`
- 触发方式：`openclaw agent --agent xs-001 --message "..." --deliver`
- 数据源：`memory/YYYY-MM-DD.md`（workspace 的记忆文件，不是其他 agent 的）
- Cron：每天 22:00

### 4. 部署前必须本地验证

```bash
cd wu-personal-site && npm run build
```

构建通过后再 `vercel deploy --prod`，避免反复部署。

## 业务导流

| 位置 | 内容 |
|------|------|
| 首页 - 业务合作板块 | 磐石电气 AIoT 智能库存管理 |
| 首页 - 扫码咨询弹窗 | 公司公众号二维码 |
| Footer | 官网链接 + 公众号二维码 |

## SEO 配置

- `Base.astro` 已配置：sitemap、robots.txt、OG/Twitter Card、JSON-LD
- 百度/搜狗/360/神马站长验证预留环境变量
- 提交指南：`workspace/memory/seo-submit-guide.md`

## 待办事项

见：`workspace/memory/todos.md`

当前 P0：ICP 备案 → 国内部署 → 阿里云 AccessKey → 搜索引擎提交

## 技术债

- [ ] 统一 `category` 字段到所有日记条目
- [ ] 日记列表页分页（当前全部展示）
- [ ] RSS feed 生成
