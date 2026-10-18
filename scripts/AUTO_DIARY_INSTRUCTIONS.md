# 自动日记生成指令

> Claude Code 自动日记工作流 | 每天 22:00 触发

---

## 触发方式

**方式一：手动触发**
在 Claude Code 中说："更新网站" 或 "生成今天的日记"

**方式二：定时触发（需配置）**
使用 Claude Code 的 CronCreate 设置每天 22:00 自动执行

---

## 执行流程

### Step 1: 读取当天内容

从以下来源提取当天关键信息：
- 今天的会话记录（Claude Code 历史）
- `Desktop/banbaiguan-kb/DASHBOARD.md`（待办/成果）
- `Desktop/banbaiguan-kb/04-成品文章/`（新发布的文章）
- `Desktop/banbaiguan-kb/05-发布记录/`（新数据）

### Step 2: 生成日记内容

日记结构：
```markdown
---
date: YYYY-MM-DD
title: [自动生成的标题]
summary: [一句话摘要]
category: [AI项目/内容创作/学习思考/生活记录]
---

# [标题]

[正文 300-500 字]

## 今日成果
- 成果1
- 成果2

## 关键决策
- 决策1
- 决策2

## 明日待办
- [ ] 待办1
- [ ] 待办2

---

*自动生成于 YYYY-MM-DD 22:00*
```

### Step 3: 更新数据文件

编辑 `src/data/diaries.ts`，在数组开头添加：
```typescript
{
  date: 'YYYY-MM-DD',
  title: '标题',
  summary: '摘要',
  category: '分类'
}
```

### Step 4: 创建日记页面

复制模板 `src/pages/diary/2026-05-14.astro`，创建新页面：
- 路径：`src/pages/diary/YYYY-MM-DD.astro`
- 内容：根据日记内容生成

### Step 5: 构建和部署

```bash
cd ~/Desktop/claude项目/wu-personal-site
./scripts/auto-deploy.sh
```

---

## 分类规则

| 分类 | 适用场景 |
|------|---------|
| AI项目 | 磐石电气、iCabin、智慧储物相关工作 |
| 内容创作 | 半百观AI文章/选题/复盘 |
| 学习思考 | 学习新东西、想通的道理 |
| 生活记录 | 生活琐事、感悟 |

---

## 标题生成规则

优先使用当天最重要的成果/决策：
- "完成[项目]的[成果]"
- "关于[主题]的思考"
- "[数字]个关键决策"
- "从[问题]到[方案]"

---

## 注意事项

1. **不要生成空洞内容** — 如果没有实质内容，跳过今天
2. **保持简洁** — 300-500 字即可，不用长
3. **真实记录** — 不编造，不夸大
4. **检查构建** — build 失败要修复后再 push

---

*最后更新：2026-10-18*
