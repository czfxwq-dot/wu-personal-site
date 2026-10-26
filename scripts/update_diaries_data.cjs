#!/usr/bin/env node
/**
 * 将缺失的日记条目添加到 diaries.ts 数据文件
 */

const fs = require('fs');

// 需要补充的日期
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

// 读取 diaries.ts
const diariesPath = 'src/data/diaries.ts';
let content = fs.readFileSync(diariesPath, 'utf-8');

// 计算 dayNum
const startDate = new Date('2026-04-29');
function getDayNum(dateStr) {
  const date = new Date(dateStr);
  const diffTime = date - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
}

// 构建新条目
const newEntries = missingDates.map(date => {
  const dayNum = getDayNum(date);
  const dayOfWeek = ['日', '一', '二', '三', '四', '五', '六'][new Date(date).getDay()];

  return `  {
    date: '${date}',
    title: \`建站第 ${dayNum} 天\`,
    titleEn: \`Day ${dayNum}\`,
    summary: \`建站第${dayNum}天。周${dayOfWeek}。\`,
    summaryEn: \`Day ${dayNum}.\`,
    category: '日常',
    categoryEn: 'Daily'
  }`;
});

// 找到数组的末尾位置（在最后一个 }] 之前插入）
const lastEntryMatch = content.match(/\n\];\s*$/);
if (!lastEntryMatch) {
  console.error('无法找到数组末尾');
  process.exit(1);
}

// 在最后一个条目后插入新条目
const insertPos = content.lastIndexOf('  }');
const newContent = content.slice(0, insertPos + 3) + ',\n' + newEntries.join(',\n') + content.slice(insertPos + 3);

// 写回文件
fs.writeFileSync(diariesPath, newContent, 'utf-8');

console.log(`✅ 已添加 ${newEntries.length} 个日记条目到 diaries.ts`);
console.log('下一步: 运行 npm run build 测试构建');
