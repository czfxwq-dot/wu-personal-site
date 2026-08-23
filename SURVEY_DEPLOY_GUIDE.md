# 家长决策调研问卷 — 部署文档

> 给 OpenClaw 小龙虾的部署指引。代码已在本地仓库 `C:\Users\czfxw\.openclaw\workspace\wu-personal-site` 中，需要推送到 GitHub 并配置 Cloudflare。

---

## 一、背景

吴总要做一个模拟情境家长决策调研，收集 100+ 份数据。问卷部署在 ban-bai.com 上，包含：
- 知情同意 → PANAS-10 情绪量表 → 13 道情景题（3页）→ 开放题 + 数学注意检查 + 人口统计
- 中英文双语：`/survey/`（中文）、`/en/survey/`（英文）
- 管理后台：`/admin/survey/`（密码 20070731，导航栏无入口）
- 数据存 Cloudflare D1，API 走 Cloudflare Pages Functions

---

## 二、新增文件清单（代码已在本地，待提交）

### 源代码（src/）
| 文件 | 说明 |
|------|------|
| `src/components/SurveyApp.astro` | 调查核心组件（6步客户端流程 + localStorage 缓存） |
| `src/data/survey-questions.ts` | 13 道情景题数据（中英双语） |
| `src/data/survey-text.ts` | PANAS/人口统计等所有文本 |
| `src/pages/survey/index.astro` | 中文调查页入口 |
| `src/pages/en/survey/index.astro` | 英文调查页入口 |
| `src/pages/admin/survey/index.astro` | 管理后台页面（登录 + 统计 + 记录 + CSV导出） |

### API（functions/）
| 文件 | 端点 | 说明 |
|------|------|------|
| `functions/api/survey/submit.ts` | POST `/api/survey/submit` | 接收并存储调查数据 |
| `functions/api/admin/login.ts` | POST `/api/admin/login` | 管理员密码验证 |
| `functions/api/admin/stats.ts` | GET `/api/admin/stats` | 统计数据（总数/均时/PANAS均值/选择分布等） |
| `functions/api/admin/responses.ts` | GET `/api/admin/responses` | 分页详细记录 |
| `functions/api/admin/export.ts` | GET `/api/admin/export` | CSV 导出 |

### 数据库 & 配置
| 文件 | 说明 |
|------|------|
| `schema.sql` | D1 数据库建表 SQL（6张表：responses/panas/decisions/open_response/math_test/demographics） |
| `wrangler.toml` | 已添加 D1 binding（`SURVEY_DB`），database_id 待替换 |

### 依赖变更
- 新增 `@astrojs/rss`（远程 master 新增了 RSS 功能，需要此包）
- `package.json` 和 `package-lock.json` 已更新

---

## 三、部署步骤

### 步骤 1：Git 提交并推送

```bash
cd C:\Users\czfxw\.openclaw\workspace\wu-personal-site

# 查看状态（应该能看到新增/修改的文件）
git status

# 全部提交
git add -A
git commit -m "feat: 添加家长决策调研问卷系统

- 调查页面（中英双语）：/survey/ 和 /en/survey/
- 管理后台：/admin/survey/（密码保护，无导航入口）
- 5个 Cloudflare Pages Functions API 端点
- D1 数据库 schema（6张表）
- 13道情景题 + PANAS-10 + 开放题 + 人口统计

Co-Authored-By: Claude <noreply@anthropic.com>"

# 推送（注意远程可能有更新，先 pull --rebase）
git pull --rebase origin master
git push origin master
```

> ⚠️ 如果 pull 时有冲突，docs/ 目录的冲突直接接受远程版本，然后重新 `npx astro build` 即可。源码文件不会冲突。

### 步骤 2：创建 Cloudflare D1 数据库

**方式 A：CLI（需先 `npx wrangler login`）**
```bash
# 创建数据库
npx wrangler d1 create survey_db

# 记下返回的 database_id（格式：xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx）

# 替换 wrangler.toml 中的占位符
# 把 database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" 改成实际的 ID

# 执行建表 SQL
npx wrangler d1 execute survey_db --file=schema.sql

# 推送到远程（如果 wrangler 已关联 Cloudflare 项目，会自动同步）
git add wrangler.toml
git commit -m "chore: 更新 D1 database_id"
git push
```

**方式 B：Cloudflare Dashboard 手动操作**
1. 登录 [dash.cloudflare.com](https://dash.cloudflare.com)
2. 左侧 **Storage & Databases** → **D1 SQL Database**
3. 点 **Create database** → 名称填 `survey_db` → 创建
4. 创建后点进去 → **Console** 标签 → 粘贴执行 `schema.sql` 的全部内容
5. 记下 database_id（页面顶部显示）

### 步骤 3：配置 Cloudflare Pages 项目

1. 进入 Cloudflare Dashboard → **Workers & Pages** → 选 `wu-personal-site`
2. **Settings** → **Variables and Secrets**：
   - 添加变量 `SURVEY_ADMIN_PASSWORD`，值 `20070731`，类型 Secret
3. **Bindings**（同页面或 Functions 配置处）：
   - 添加 **D1 Database** binding
   - Variable name: `SURVEY_DB`
   - D1 database: 选择刚创建的 `survey_db`
4. 保存，Cloudflare Pages 会自动重新部署

> 如果 Functions 的 D1 binding 需要在 `wrangler.toml` 中配置（而不是 Dashboard），确保 wrangler.toml 中的 `database_id` 已替换为实际值并推送。

### 步骤 4：验证

推送并部署完成后：
1. 访问 `https://www.ban-bai.com/survey/` → 应看到调查介绍页
2. 访问 `https://www.ban-bai.com/en/survey/` → 英文版
3. 访问 `https://www.ban-bai.com/admin/survey/` → 管理后台登录页
4. 用密码 `20070731` 登录后台 → 应看到空数据面板

---

## 四、架构概览

```
用户访问 /survey/
    ↓
SurveyApp.astro 渲染客户端 JS
    ↓
用户填写 → localStorage 缓存每步
    ↓
最后一题提交 → POST /api/survey/submit
    ↓
Pages Function → 写入 D1（6张表）
    ↓
返回 success → 显示感谢页

管理员访问 /admin/survey/
    ↓
输入密码 → POST /api/admin/login → 返回 token
    ↓
GET /api/admin/stats → 统计数据 → 展示图表
GET /api/admin/responses → 分页记录
GET /api/admin/export → 下载 CSV
```

---

## 五、关键细节

- **调查隐藏**：导航栏不加入口，只有知道 URL 的人能访问
- **密码**：管理后台密码 `20070731`，通过环境变量 `SURVEY_ADMIN_PASSWORD` 配置
- **D1 binding 名称**：必须叫 `SURVEY_DB`（代码中硬编码引用）
- **题号**：13 题编号为 Q1, Q3, Q5, Q6, Q8, Q9, Q13, Q14, Q16, Q17, Q18, Q21, Q22
- **数学注意检查**：答案 37+46=83，后台统计通过率
- **localStorage key**：`survey_state`（缓存调查进度）、`survey_session`（会话ID）、`survey_token`（管理后台token）
- **数据保留**：无自动过期，手动管理

---

## 六、注意事项

- 如果 push 遇到冲突，`docs/` 目录是构建产物，直接 `npx astro build` 重新生成就行
- 远程 master 最近有自动日记生成的 commit，可能会改 docs/diary 相关文件，不影响 survey
- `schema.sql` 中的建表语句是 `CREATE TABLE IF NOT EXISTS`，重复执行不会报错
- PANAS 量表用 10 个情绪词（5正5负），5 级李克特量表
- 调查页是纯客户端渲染（SPA），所有步骤在一个页面内通过 JS 切换
