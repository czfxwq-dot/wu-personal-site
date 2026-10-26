#!/usr/bin/env node
/**
 * 补充缺失的日记条目
 */

const fs = require('fs');
const path = require('path');

// 需要补充的日期（排除 2026-10-05 到 2026-10-17）
const missingDates = [
  '2026-05-16',
  '2026-08-10',
  '2026-08-26',
  '2026-08-31',
  '2026-09-02',
  '2026-09-06',
  '2026-09-07',
  '2026-09-08',
  '2026-09-12',
  '2026-09-19',
  '2026-09-26'
];

// 读取现有日记数据文件
const diariesPath = 'src/data/diaries.ts';
let diariesContent = fs.readFileSync(diariesPath, 'utf-8');

// 从文件中提取现有日期列表
const dateMatches = diariesContent.matchAll(/date:\s*['"]([^'"]+)['"]/g);
const existingDates = new Set(Array.from(dateMatches).map(m => m[1]));

console.log(`现有日记数量: ${existingDates.size}`);
console.log(`需要补充: ${missingDates.length} 天\n`);

// 计算 dayNum
const startDate = new Date('2026-04-29');
function getDayNum(dateStr) {
  const date = new Date(dateStr);
  const diffTime = date - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
}

// 为每个缺失日期创建基础条目
const newEntries = [];
missingDates.forEach(date => {
  if (existingDates.has(date)) {
    console.log(`跳过 ${date} (已存在)`);
    return;
  }

  const dayNum = getDayNum(date);
  const dayOfWeek = ['日', '一', '二', '三', '四', '五', '六'][new Date(date).getDay()];

  const entry = {
    date,
    title: `建站第 ${dayNum} 天`,
    titleEn: `Day ${dayNum}`,
    summary: `建站第${dayNum}天。周${dayOfWeek}。`,
    summaryEn: `Day ${dayNum}.`,
    category: '日常',
    categoryEn: 'Daily',
    contentEn: `<p>Day ${dayNum} of building the website.</p>\n\n<p>Week ${dayOfWeek}.</p>`
  };

  newEntries.push(entry);
  console.log(`✓ 准备补充: ${date} (周${dayOfWeek}, 第${dayNum}天)`);
});

console.log(`\n共 ${newEntries.length} 个新条目`);

// 创建 markdown 文件
newEntries.forEach(entry => {
  const mdPath = `src/content/diaries/${entry.date}.md`;
  const mdContent = `---
date: ${entry.date}
title: "${entry.title}"
summary: ${entry.summary}
category: ${entry.category}
dayNum: ${entry.dayNum || getDayNum(entry.date)}
---

<p>${entry.summary}</p>
`;

  fs.writeFileSync(mdPath, mdContent, 'utf-8');
  console.log(`✓ 创建 markdown: ${entry.date}.md`);
});

console.log('\n✅ 已完成补充！');
console.log('下一步: 运行 npm run build 测试构建');
