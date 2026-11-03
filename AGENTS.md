# AGENTS.md — 给任何 AI 编码工具的说明书

README 是给人看的，这一份是给 AI 代理看的。任何工具进来先读它。
Claude 专属补充见 `CLAUDE.md`；完整运营交接见 `OPERATIONS_MANUAL.md`；日记写作标准见 `templates/diary-standards.md`。

## 1. 这是什么

「半百观视界」个人站点（ban-bai.com），观吾的个人品牌站兼内容主站，中英双语。

- 技术栈：Astro（静态输出）+ TypeScript + Tailwind，构建产物在 `docs/`
- 托管：Cloudflare Pages，项目名 `wu-personal-site`
- 部署链：`git push origin main` → GitHub Actions（内容体检 → npm ci → build → wrangler pages deploy）→ 约 30–60 秒
- 内部分工：观吾决策，山山执行

## 2. 目录地图

| 路径 | 放什么 |
|---|---|
| `src/content/articles/*.md` | 文章中文全文 |
| `src/content/diaries/*.md` | 日记中文全文 |
| `src/data/articles.ts` | 文章索引 + 英文全文（`contentEn`） |
| `src/data/diaries.ts` | 日记索引 + 英文摘要 |
| `src/pages/`、`src/pages/en/` | 中英**两套独立页面**，改一处必须检查另一处 |
| `public/` | 静态资源（robots.txt、图片、验证文件） |
| `scripts/auto-news.py` | 新闻采集（分类由 `filter_noise` 关键词规则决定，提示词改不了） |
| `scripts/auto-diary.py` | 日记生成 |
| `docs/` | **构建产物，不要手改**（已被 gitignore，由 CI 重新生成） |

## 3. 常用命令

```bash
npm install
npm run dev            # 本地开发
npm run build          # 构建 + pagefind 索引 + 生成 sitemap
npm run check:data     # 数据一致性体检，改完内容必跑
npm run audit:content  # 内容质量审计
npm run guard          # 部署前守卫
```

部署只走 `git push`，不要本地 wrangler 直推。

## 4. 加内容必须成对登记

- 新文章：写 `src/content/articles/<slug>.md`，**并且**在 `src/data/articles.ts` 加条目（含 `titleEn`/`excerptEn`/`tagEn`/`contentEn`）。只加 md 会变成「半隐形文章」——正文页能开，列表页、英文版、首页都没有。
- 新日记：同理，md 文件 + `src/data/diaries.ts` 条目。
- 改完跑 `npm run check:data`，再确认首页、列表页、英文页三处都出现。

## 5. 硬红线

1. **本仓库是公开的**：任何私密内容（预算、内部判断、个人记忆、密钥）不得提交。个人记忆放在工作空间的 `.workbuddy/`（已 gitignore）。
2. **品牌名**：中文「半百观视界」，英文「BanbaiGuan Vision」。**URL 路径 `/banbaiguan/` 不能改**——改了会断站内链接和搜索索引。
3. **中英双版是两份代码**：不会自动同步，改中文页不代表英文页也改了。
4. **分支是 `main`**：仓库里还留着一条过期 `master`，推到它上面会静默空推、不报错、不触发 CI。推完必看有没有新的 CI run。
5. **文案里的数字不要写死**：能从数据算就用 `{articles.length}` 之类；写死的必须与真实数据核对。
6. **`.html` 直链会被 308**：Cloudflare Pages 把 `/x.html` 跳到 `/x`，别指望改 `_redirects` 去兜外部验证。
7. **百度收录不做**：CF 免费版大陆线路不通，重启成本是 ICP 备案 + 国内源站，别再建议「再验证一次」。
8. **微信文章抓取**：`curl`/`WebFetch` 会被拦（拿回空壳），唯一通路是真实浏览器。

## 6. 做完的定义

- `npm run build` 通过，`npm run check:data` 无错
- 中英两版旧文案 grep 归零
- 推送后 CI success，并 curl 线上对应页面确认 200 且内容正确——只看本地不算

## 7. 交接与边界

- 项目记忆（速览、日志、任务卡、交接文件）不在本仓库：在工作空间的 `.workbuddy/memory/`。开工先读 `MEMORY.md` → 当天日志 → 相关任务卡，不要靠历史会话猜现状。
- **先问后改**：范围外的事不顺手做。经批准的交付，自检通过即可提交部署；一旦发现必须连带改批准范围外的文件，先停下问。
- 踩过的坑记在个人错题本里，动手前先查一遍同类问题。
