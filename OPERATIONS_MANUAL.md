# 网站运营手册 — ban-bai.com

> 本手册面向 AI Agent，包含个人网站的全部运营流程。阅读此手册即可接手日常维护、内容更新、故障排查。

> **⚠️ 交接必读（先看这里）**：接手前，先确认你在正确的文件夹里，再读三份东西，否则会犯同样的错。

> **📍 项目位置（重要）**
> - ✅ 正式项目绝对路径：`C:\Users\czfxw\Desktop\claude项目\wu-personal-site`
> - ⚠️ **废弃副本，不要在那里改**：`C:\Users\czfxw\.openclaw\workspace\wu-personal-site`（旧数据，已不同步）、`C:\Users\czfxw\AppData\Roaming\Trae\...\wu-personal-site`（编辑器缓存）
> - 改代码/数据之前，先 `pwd` 确认你在正式路径下。

> **必读三份文件（相对路径，都在项目根目录往下找）**
> 1. `templates/diary-standards.md` — 日记写作标准（九节结构 + 观吾/山山协作视角）
> 2. 本手册第 12 节「关键教训」— 之前踩过的坑
> 3. 本手册第 13 节「人称与品牌」— 用户=观吾、AI=山山（写日记时）

> **核心目录速查**（都在 `wu-personal-site/` 根目录下）
> - 内容正文（markdown）：`src/content/articles/`（文章）、`src/content/diaries/`（日记）
> - 数据注册表（列表页/英文详情读这里）：`src/data/*.ts`
> - 内容标准：`templates/`
> - 自动化脚本：`scripts/`

---

## 1. 项目概况

| 项目 | 详情 |
|------|------|
| 域名 | https://www.ban-bai.com |
| 框架 | Astro 4.x（静态站点生成器，内容集合 content collections） |
| 部署 | GitHub Actions → Cloudflare Pages（push 即部署，约 36 秒） |
| 仓库 | https://github.com/czfxwq-dot/wu-personal-site |
| 分支 | main（生产） |
| 语言 | 中文（默认）+ 英文（/en/ 镜像） |
| 品牌 | 磐石电气（常州）有限公司 / MonolithIoT |
| 定位 | 50岁企业家用AI把想法变成现实 |

### 技术栈

| 层 | 技术 |
|---|------|
| 前端 | Astro + CSS（无 JS 框架） |
| 后端 | Cloudflare Pages Functions（/api/chat, /api/guestbook） |
| 数据 | TypeScript 文件（src/data/），纯数组 |
| 部署 | GitHub Actions + Wrangler CLI |
| 字体 | fonts.loli.net（国内可访问的 Google Fonts 镜像） |

### 目录结构

```
wu-personal-site/
├── src/
│   ├── data/              # 数据注册表（列表页/英文详情页读这里）
│   │   ├── articles.ts        # 文章注册表（半百观，含 contentEn）
│   │   ├── diaries.ts         # 日记注册表（含 contentEn）
│   │   ├── ai-news-summary.ts # AI 新闻每日汇总（当前在用）
│   │   ├── ai-news.ts         # AI 新闻（旧格式，兼容用）
│   │   └── survey-*.ts        # 调研问卷数据
│   ├── content/          # 内容集合（Astro Content Collections，中文正文）
│   │   ├── articles/         # 文章 markdown（中文全文）
│   │   └── diaries/          # 日记 markdown（中文全文）
│   ├── pages/             # 页面（动态路由读取内容集合）
│   │   ├── index.astro        # 中文首页
│   │   ├── banbaiguan/[slug].astro   # 文章详情（读 content/articles）
│   │   ├── diary/[date].astro        # 日记详情（读 content/diaries）
│   │   ├── ai-news/           # AI 新闻列表
│   │   ├── about/  guestbook/ 等
│   │   └── en/                # 英文镜像（列表读 data/*.ts 的 *En 字段）
│   ├── components/        # 可复用组件
│   ├── layouts/           # 页面模板（Base.astro）
│   ├── i18n/              # 中英文 UI 文字字典
│   └── styles/            # 全局样式
├── functions/           # Cloudflare Pages Functions（/api/chat）
├── scripts/             # 工具脚本
│   ├── auto-diary.py        # 自动日记（v4.0，每天 22:00 定时）
│   ├── auto-news.py         # 自动 AI 新闻采集（⚠️ 有已知问题，见第 12 节）
│   ├── sync-data.mjs        # 数据同步检查 + 自动修复
│   └── pre-deploy-guard.sh  # 部署前安全检查
├── templates/           # 内容标准（写日记/文章前先读这里）
│   ├── diary-standards.md       # 日记写作标准（九节 + 观吾/山山）
│   ├── diary-quick-reference.md # 日记快速参考卡
│   └── diary-template.md        # 日记模板
├── public/              # 静态资源
├── .github/workflows/deploy.yml  # CI/CD（push 到 main 自动部署）
├── astro.config.mjs     # Astro 配置
└── package.json         # 依赖 + npm scripts
```

---

## 2. 日常内容更新

### 2.1 新增一篇「半百观」文章

**适用场景**：将公众号文章或其他内容转化为网站文章。

#### 步骤

**Step 1：创建中文 markdown（内容集合）**

在 `src/content/articles/` 下新建 `{slug}.md`，frontmatter + HTML 正文：

```markdown
---
title: 文章标题
subtitle: 文 / 半百观AI
date: 2026-10-29
tag: AI观点          # 可选：AI观点 / AI应用 / AI前沿 / AI产业 / AI趋势 / 深度分析 / AI思考
author: 吴总
summary: 一句话摘要（100字以内，也是 OG 描述）
---

<p>正文……用 HTML 写，<strong>加粗</strong>、<h2>小标题</h2>、<hr /> 分隔线。</p>
```

参考已有文章 `src/content/articles/*.md` 的排版（如 `100-wan-ai-zero-return.md`）。

**Step 2：注册到数据文件**

在 `src/data/articles.ts` 数组**开头**添加（含英文 contentEn）：

```typescript
{
  slug: 'your-article-slug',    // 必须与 markdown 文件名一致（不含 .md）
  date: '2026-10-29',           // 与 markdown frontmatter 的 date 一致
  title: '文章标题',
  titleEn: 'English Title',
  excerpt: '一句话摘要',
  excerptEn: 'English summary',
  tag: 'AI观点',
  tagEn: 'AI Perspective',
  contentEn: `<p>英文全文……</p>`  // 英文正文（HTML）
},
```

> 注意：中文正文在 markdown 里，英文正文在 `contentEn` 里。两处都要写，缺了英文详情页会是空的。

**Step 3：验证 + 部署**

```bash
npx tsc --noEmit src/data/articles.ts   # 语法检查
npm run build                            # 构建（会生成 /banbaiguan/{slug}/ 和 /en/banbaiguan/{slug}/）
git add . && git commit -m "feat: 新增文章《标题》" && git push
```

---

### 2.2 新增一篇日记

**适用场景**：每日建站记录、项目进展记录。

> **⚠️ 写日记前必读 `templates/diary-standards.md`！** 日记有严格标准：九节结构（📍今日心绪 → 🎯足迹 → 💭困惑 → 🌊感悟 → 📊痕迹 → 🎁礼物 → 🌅期待 → ✨一言 → 结尾），观吾（用户）和山山（AI）协作视角，中英双语，frontmatter 含 mood/energy。**人称固定：用户=观吾（Guanwu）、AI=山山（Shanshan），不写"吴总/Wu"**（这是写作视角，不是真实职务）。

#### 步骤

**Step 1：创建中文 markdown**

在 `src/content/diaries/` 下新建 `YYYY-MM-DD.md`，frontmatter + HTML 正文：

```markdown
---
date: 2026-10-29
title: "标题"
titleEn: "English Title"
summary: 中文摘要（50字以内）
summaryEn: English summary
category: 维护         # 可选：工作/学习/反思/协作/维护
categoryEn: Maintenance
dayNum: 184            # 建站天数
mood: 8                # 心情评分 1-10
energy: 7              # 精力评分 1-10
---

<p>建站第 184 天。</p>

<h2>📍 今日心绪</h2>
...
（九个章节全部要有，参考 templates/diary-standards.md 和 10-26/10-27 范例）
```

**Step 2：注册到数据文件**

在 `src/data/diaries.ts` 数组**开头**添加（含英文 contentEn）：

```typescript
{
  date: '2026-10-29',
  title: `标题`,
  titleEn: `English Title`,
  summary: `中文摘要`,
  summaryEn: `English summary`,
  category: '维护',
  categoryEn: 'Maintenance',
  contentEn: `<p>英文全文……</p>`   // 英文正文（HTML，九节结构也要有）
},
```

**Step 3：验证 + 部署**

```bash
npx tsc --noEmit src/data/diaries.ts   # 语法检查
npm run build
git add . && git commit -m "feat: 新增日记" && git push
```

---

### 2.3 新增 AI 新闻每日汇总

**适用场景**：每天收集 3-5 条 AI 行业重要新闻，汇总发布。

#### 步骤

**只需修改一个文件**：`src/data/ai-news-summary.ts`

在 `dailyNewsSummaries` 数组**开头**添加：
```typescript
{
  date: '2026-05-14',
  title: 'AI新闻 | 新闻1 + 新闻2 + 新闻3',
  titleEn: 'AI News | News 1 + News 2 + News 3',
  summary: '200字左右的汇总摘要，概括今日最重要的 AI 动态',
  summaryEn: 'Brief English summary of today\'s AI news',
  newsItems: [
    {
      title: '具体新闻标题',
      titleEn: 'English headline',
      summary: '新闻摘要（100字左右）',
      summaryEn: 'English summary',
      source: '36氪',       // 信息来源
      category: '大模型',     // 分类：大模型 / 硬件 / 投资 / 产业 / 安全
      categoryEn: 'LLM',
      url: 'https://...'    // 原始链接（可选）
    },
    // ... 更多新闻项
  ],
  comment: '一句话点评，50字以内',
  commentEn: 'One-line English comment'
},
```

**无需创建页面**！`/ai-news/` 页面和首页的 AI 新闻区块会自动读取此文件。

```bash
npm run deploy
```

---

### 2.4 更新现有文章/日记内容

直接修改对应的 markdown 文件（`src/content/articles/{slug}.md` 或 `src/content/diaries/{date}.md`），同时更新 `src/data/articles.ts` 或 `src/data/diaries.ts` 中的对应条目（中文改 markdown，英文改 contentEn）。部署即可。

---

### 2.5 更新翻译（补全英文字段）

当中文内容确认后，补全对应的 `*En` 字段：

- `articles.ts` → `titleEn`, `excerptEn`, `tagEn`
- `diaries.ts` → `titleEn`, `summaryEn`, `categoryEn`
- `ai-news-summary.ts` → 所有 `*En` 字段（包括嵌套的 `newsItems[].*En`）
- 对应英文页面 `src/pages/en/...` → 替换 TODO 占位内容为实际翻译

---

## 3. 部署流程

### 3.1 标准部署（推荐）

```bash
npm run deploy
```

内部执行流程：
1. `sync-data.mjs deploy` — 检查并自动修复数据一致性，生成英文骨架页
2. `npm run build` — Astro 构建，输出到 `docs/`
3. `npm run guard` — 部署前安全检查
4. `npm run deploy:cf` — wrangler 推送至 Cloudflare Pages production

### 3.2 通过 Git Push 部署

```bash
git add .
git commit -m "feat: 更新内容说明"
git push
```

GitHub Actions 自动构建并部署到 Cloudflare Pages，约 36 秒完成。

### 3.3 本地开发预览

```bash
npm run dev
```

访问 http://localhost:4321 预览中文版，http://localhost:4321/en/ 预览英文版。

### 3.4 部署前安全检查

```bash
npm run guard
```

检查项：
1. Astro `outDir`（docs/）与 wrangler deploy 目标一致
2. 输出目录存在且包含 index.html
3. 部署命令包含 `--branch main` 参数
4. GitHub Actions workflow 使用相同目录

---

## 4. 双语同步规则

### 4.1 数据文件

每个条目必须同时维护 `zh` 字段和 `en` 字段：

| 字段类型 | 中文 | 英文 |
|---------|------|------|
| 文章 | title, excerpt, tag | titleEn, excerptEn, tagEn |
| 日记 | title, summary, category | titleEn, summaryEn, categoryEn |
| AI 新闻 | title, summary, category, comment | titleEn, summaryEn, categoryEn, commentEn |

**新增条目时**，英文字段可以先留空或等于中文值，但字段必须存在（TypeScript 接口定义了可选性 `?`）。

### 4.2 页面文件

每个中文页面 `src/pages/X/Y.astro` 对应一个英文页面 `src/pages/en/X/Y.astro`。

英文页面必须：
- 传 `lang="en"` 给 BaseLayout
- 使用数据文件中的 `*En` 字段
- import 路径深度 = 文件所在目录层级（如 `en/diary/` 需要 `../../`，`en/banbaiguan/` 需要 `../../`）

### 4.3 自动同步

```bash
npm run fix:data
```

自动检测中文新增的页面，在 `src/pages/en/` 下创建对应的英文骨架页。

---

## 5. 组件说明

### 核心组件

| 组件 | 用途 | Prop |
|------|------|------|
| `BaseLayout` | 页面模板，含导航/页脚/SEO/JSON-LD | title, jsonLd?, navActive?, lang? |
| `ArticleJsonLd` | 文章结构化数据（SEO） | title, description, datePublished, section, lang? |
| `ChatWidget` | 右下角悬浮聊天组件 | lang? |
| `FollowUsCard` | 关注卡片（7 平台） | lang? |
| `Citations` | 引用来源标注 | lang? |
| `PlatformCitations` | 平台引用标注 | lang? |
| `TopicScoreCard` | 选题评分卡片（13 维度） | lang? |

### BaseLayout 注意事项

- 所有 UI 文字通过 `t(key, lang)` 从 `src/i18n/ui.ts` 读取
- 自动注入 hreflang alternate links（中英文互相指向）
- 自动注入 JSON-LD 结构化数据（WebSite + Organization + Person + Blog）
- OG meta 和 Twitter Card 自动根据 lang 切换

### ChatWidget 后端

`functions/api/chat.ts` 代理请求到 OpenClaw Gateway。

| 环境变量 | 用途 |
|---------|------|
| `GATEWAY_URL` | OpenClaw Gateway 地址 |
| `GATEWAY_TOKEN` | 访问令牌 |

**重要**：如果 Gateway URL 变更（cloudflared 隧道重建），运行 `scripts/update-tunnel-url.sh` 更新，并重新部署。

---

## 6. API 维护

### 6.1 /api/chat（聊天代理）

- 文件：`functions/api/chat.ts`
- 运行时：Cloudflare Pages Function
- 配置：环境变量在 Cloudflare Dashboard 设置

**检查是否正常**：
1. 在 Cloudflare Dashboard → Pages → wu-personal-site → Settings → Functions
2. 确认 `GATEWAY_URL` 和 `GATEWAY_TOKEN` 值有效
3. 在网站上打开聊天组件，发送测试消息

**修复方法**：
```bash
# 更新隧道 URL（如果 Gateway 换了地址）
bash scripts/update-tunnel-url.sh
git add functions/api/chat.ts
git commit -m "fix: 更新 chat Gateway URL"
git push
```

### 6.2 /api/guestbook（留言板）

- 文件：`src/pages/api/guestbook.ts`
- 数据：`src/data/guestbook.json`
- GET：返回留言列表（隐藏 email）
- POST：接收新留言（验证 name + content，content ≤ 500 字符）

**管理留言**：
- 直接编辑 `src/data/guestbook.json`，添加/删除/修改记录
- 每条记录格式：
```json
{
  "id": "msg-1777807563399",
  "name": "张三",
  "content": "留言内容",
  "email": "",
  "createdAt": "2026-05-14T10:00:00.000",
  "reply": "",
  "replyAt": ""
}
```
- 管理员回复后填写 `reply` 和 `replyAt`

---

## 7. SEO 与 GEO 优化

### 7.1 已部署的 SEO 措施

| 措施 | 文件 | 说明 |
|------|------|------|
| JSON-LD | Base.astro + ArticleJsonLd | 结构化数据：WebSite/Organization/Person/Blog/Article |
| hreflang | Base.astro | 中英文互相指向，x-default 指向中文 |
| canonical | Base.astro | 每页唯一 canonical URL |
| OG meta | Base.astro | Facebook/微信分享卡片预览 |
| Twitter Card | Base.astro | Twitter 分享卡片预览 |
| sitemap.xml | public/sitemap.xml | 站点地图 |
| robots.txt | public/robots.txt | 爬虫规则 |
| 国内验证 | Base.astro | 神马/搜狗/360 站长验证 |
| 腾讯验证 | public/tencent*.txt | 微信/企业微信验证文件 |

### 7.2 新增文章时的 SEO 检查

1. 页面必须设置 `title` 和 `excerpt`（对应 OG title/description）
2. 必须设置 `ArticleJsonLd` 组件
3. `keywords` 数组包含文章相关关键词
4. `section` 参数正确（diary / ai-news / banbaiguan）
5. `ogImage` 可选，默认使用全局 `/og-image.png`

### 7.3 GEO（生成式引擎优化）

- 每篇文章的 JSON-LD 包含完整的 articleSection
- 引用来源使用 `Citations` 组件标注
- 内容中明确标注数据来源（如"据 36 氪报道"）

---

## 8. 故障排查

### 8.1 构建失败

```bash
npm run build
```

常见错误：
| 错误 | 原因 | 解决 |
|------|------|------|
| `Could not resolve "../../layouts/Base.astro"` | import 路径深度不对 | en/ 页面需要 `../../../`（多层目录） |
| `Could not resolve "../i18n/utils"` | 文件不存在 | 确认 `src/i18n/utils.ts` 存在 |
| `articles.ts 语法错误` | 缺少逗号或引号不匹配 | 检查最新添加的条目 |

### 8.2 部署成功但页面不更新

Cloudflare Pages 有缓存。解决方案：
1. 登录 Cloudflare Dashboard → Pages → wu-personal-site
2. 进入 Deployments，确认最新部署状态为 Success
3. 如有缓存，在 Cloudflare 后台清除缓存

### 8.3 聊天组件无法使用

1. 检查 `functions/api/chat.ts` 中的 `GATEWAY_URL` 是否有效
2. 在 Cloudflare Pages Functions 日志中查看错误
3. 确认 OpenClaw Gateway 正在运行
4. 运行 `bash scripts/update-tunnel-url.sh` 更新隧道 URL

### 8.4 数据不一致（页面存在但未注册）

```bash
npm run check:data    # 检查
npm run fix:data      # 自动修复
```

### 8.5 Git 合并冲突

当远程和本地同时修改相同文件时：

```bash
# 数据文件（articles.ts / diaries.ts / ai-news-summary.ts）
git checkout --theirs <file>  # 取远程（数据更全）
git add <file>

# 英文页面（add/add 冲突）
git checkout --ours <file>    # 取本地（有完整 i18n）
git add <file>

# 组件文件（Base.astro / ChatWidget.astro）
# 手动合并，保留双方的 lang 支持和新功能
git add <file>

git commit -m "Merge: 解决合并冲突"
git push
```

---

## 9. npm scripts 速查

| 命令 | 用途 |
|------|------|
| `npm run dev` | 本地开发服务器 |
| `npm run build` | 构建到 docs/ |
| `npm run preview` | 本地预览构建结果 |
| `npm run check:data` | 检查数据同步状态 |
| `npm run fix:data` | 自动修复数据不一致 + 生成英文骨架 |
| `npm run guard` | 部署前安全检查 |
| `npm run deploy:cf` | 部署到 Cloudflare Pages |
| `npm run deploy` | 完整流程：sync + build + guard + deploy |

---

## 10. 品牌与视觉规范

### 颜色

| 用途 | 色值 | 变量 |
|------|------|------|
| 强调色 | `#2d3561` | `--color-accent` |
| 金色（标题） | `#c8a45c` | `--color-gold` |
| 背景色 | `#f7f5f2` | `--color-bg` |
| 深色背景 | `#1a1a2e` | `--color-bg-alt` |
| 边框 | `#e5e7eb` | `--color-border` |
| 正文文字 | `#1a1a2e` | `--color-text` |
| 浅色文字 | `#6b7280` | `--color-text-light` |

### 字体

| 用途 | 字体 | 来源 |
|------|------|------|
| 无衬线 | DM Sans | fonts.loli.net |
| 衬线（标题） | Noto Serif SC | fonts.loli.net |
| 等宽 | JetBrains Mono | fonts.loli.net |

### 品牌 SOP

详见 `BRAND_SOP.md`（仓库根目录），包含：
- 半百观 AI 统一 7 平台矩阵
- 内容发布流程
- 视觉识别规范

---

## 11. 自动化脚本

### auto-diary.py（每天 22:00 自动生成日记）

- 版本 **v4.0**，按 `templates/diary-standards.md` 生成九节格式 + mood/energy + 中英双语
- 生成后**自动同步 `src/data/diaries.ts`**（含英文 contentEn）
- 由 Windows 定时任务每天 22:00 触发；日志在 `scripts/logs/auto-diary-YYYY-MM.log`
- **注意**：脚本只能根据 git 提交推断，生成的是"结构正确的草稿"；真正有温度的观吾/山山叙事，建议生成后由 AI 再润色一遍（可加一步"生成后提醒审阅"）

### auto-news.py（AI 新闻采集，v2.0）

- 源：科技垂类官方 RSS —— 36 氪、IT 之家、机器之心、量子位、开源中国。**不要再用 rsshub.app 公共实例，实测直接 403。**
- 过滤：强关键词必须命中标题（"数据""智能""对话""算法"这类泛词不再算），再叠一层黑名单（赛事、促销、金价、咖啡等），单条摘要短于 40 字也丢弃
- 去重：标题归一化后与**整个历史文件**比对，完全相同或相似度 ≥ 0.88 都判重，所以不会再有跨天重复
- 写入：`json.dumps` 转义（标题带英文双引号不会撑破 TS），写前备份到 `scripts/logs/`，写后回读校验，失败自动还原
- 英文：不写 `titleEn`/`summaryEn`，页面回退显示中文；要出英文版得手工翻译（复制中文过去算占位符）
- 常用参数：`--dry-run` 只打印不落盘；`--date YYYY-MM-DD` 指定日期；`--limit N` 每天几条（默认 5）
- 依赖：只用标准库，不需要 `feedparser`

### 其他脚本

- `sync-data.mjs`：数据同步检查 + 自动修复
- `pre-deploy-guard.sh`：部署前安全检查
- `update-tunnel-url.sh`：更新 Chat Gateway 隧道 URL

---

## 12. 关键教训（之前踩过的坑）

1. **修数据要全量扫同模式，不能只修被点名的一处。** 之前用户说"第344行有未转义引号"，实际全文件 32 处 + 288 条占位符 + 4 天坏新闻。先写脚本扫全量（重复字段 / 占位符 / 截断 / 中文泄漏 / 语法错误），一次扫干净。
2. **"有"不等于"对"。** 占位符（如 titleEn 填 "AI industry news"）比空字段更危险——空字段会报错，占位符会安静地骗过检查。校验时抽查内容质量，不只是看字段有没有填。
3. **追根因脚本。** 数据坏了，往往是因为生成数据的脚本有问题（auto-news.py 抓全站 RSS、旧版 auto-diary.py 只写 markdown 不登记 diaries.ts）。修完数据要把根因脚本一起修掉，否则问题会再来。
4. **写日记先读标准。** 之前没读 `templates/diary-standards.md` 就写了占位 stub，还把人称写成"吴总"——都被纠正。标准和人称是硬约束。
5. **中文引号转 ASCII 引号会破坏字符串。** 曾有个 `fix_quotes.cjs` 把 `“”` 转成 `"`，制造了 32 处语法错误（已删，别再用这类脚本）。

---

## 13. 人称与品牌

- **用户真实身份**：吴总（磐石电气联合创始人），网站定位"50 岁企业家用 AI 把想法变成现实"。
- **日记写作视角**：用户 = 观吾（Guanwu，思考者/决策者），AI = 山山（Shanshan，执行者）。**写日记时一律用观吾/山山，不用"吴总/Wu"**。
- **文章/公众号**：署名"吴总"或"半百观AI"（对外品牌，不是日记视角）。
- 品牌规范详见 `BRAND_SOP.md`。

---

## 14. 关键约定

1. **新增文章/日记只改两个地方**：内容集合 markdown（`src/content/`）+ 数据文件（`src/data/`）。不需要改其他代码。
2. **数据文件条目放数组开头**，最新的在最上面。
3. **slug 必须与 markdown 文件名一致**（不含 .md），否则构建成功但列表页找不到。
4. **markdown frontmatter 的 date 必须与数据文件里的 date 一致**。
5. **英文全文放在数据文件的 `contentEn`**（不是 markdown 里）；中文全文放在 markdown 里。
6. **写日记先读 `templates/diary-standards.md`**，人称用观吾/山山。
7. **部署前必跑 `npx tsc --noEmit` 校验数据文件**（语法错误会导致构建失败）。
8. **不要手动改 docs/ 目录**，这是构建输出，每次 build 会被清空重写。
9. **Cloudflare Pages Functions（functions/）的变更需要 push 才生效**，本地 build 不包含这部分。
10. **数据坏了先查根因脚本**（auto-news.py / auto-diary.py），别只修表面。
