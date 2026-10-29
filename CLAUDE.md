# CLAUDE.md — 接手本项目的 AI 必读

这是「半百观AI」个人网站（ban-bai.com）的仓库。接手任何任务前，按顺序做三件事：

## 1. 先读运营手册（完整交接文档）

`OPERATIONS_MANUAL.md` —— 项目全貌、内容更新流程、部署、双语规则、故障排查、关键教训都在里面。

## 2. 写日记前读标准

`templates/diary-standards.md` —— 日记有九节硬性结构 + 协作视角，**先读再写**。
快速参考：`templates/diary-quick-reference.md`。

## 3. 记住人称

- **用户 = 观吾（Guanwu，思考者/决策者）**
- **AI = 山山（Shanshan，执行者）**
- 写日记时一律用观吾/山山，**不要写「吴总/Wu」**（这是日记写作视角；对外文章署名才用「吴总」）。

## 关键红线（容易踩的坑）

- **项目路径**：正式仓库在 `C:\Users\czfxw\Desktop\claude项目\wu-personal-site`。别在 `.openclaw/workspace/` 或 Trae 缓存里改（旧副本）。
- **修数据要扫全量**：用户指出的往往只是一处，实际是同一模式大面积问题（重复字段/占位符/中文泄漏/语法错误）。先写脚本扫，别只修被点名的那一行。
- **"有"≠"对"**：占位符（如 `titleEn: "AI industry news"`）比空字段更难发现。校验要看内容质量，不只是看字段填没填。
- **中文正文在 markdown，英文正文在 `contentEn`**：`src/content/articles/*.md` / `src/content/diaries/*.md` 放中文全文，`src/data/*.ts` 里的 `contentEn` 放英文全文。
- **部署**：commit 到 main 分支并 push，GitHub Actions 自动构建部署到 Cloudflare Pages。
- **数据坏了先查根因脚本**：`scripts/auto-news.py` 抓 36 氪全站 RSS（会混入非 AI 内容）、`scripts/auto-diary.py`（v4.0）。
