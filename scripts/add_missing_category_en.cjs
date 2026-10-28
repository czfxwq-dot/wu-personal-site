#!/usr/bin/env node
/**
 * 为缺少categoryEn的AI新闻条目添加英文分类翻译
 */

const fs = require('fs');

// 分类翻译映射
const translations = {
  'AI动态': 'AI Updates',
  '大模型': 'Large Models',
  'AI应用': 'AI Applications',
  'AI硬件': 'AI Hardware',
  'AI视频': 'AI Video',
  'AI安全': 'AI Safety',
  'AI大模型': 'Large AI Models'
};

// 读取文件
const filePath = 'src/data/ai-news-summary.ts';
let lines = fs.readFileSync(filePath, 'utf-8').split('\n');

let fixCount = 0;

// 遍历每一行
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // 检查是否是 category 行
  for (const [zh, en] of Object.entries(translations)) {
    if (line.includes(`"category": "${zh}"`)) {
      // 检查下一行是否已经有 categoryEn
      const nextLine = lines[i + 1] || '';
      if (!nextLine.includes('categoryEn')) {
        // 获取缩进
        const indent = line.match(/^\s*/)[0];
        // 在当前行后插入 categoryEn 行
        lines.splice(i + 1, 0, `${indent}"categoryEn": "${en}",`);
        fixCount++;
        console.log(`✓ 在第 ${i + 1} 行后添加了 "${zh}" -> "${en}" 的翻译`);
        // 因为我们插入了一行，所以跳过下一行的检查
        i++;
      }
      break;
    }
  }
}

// 写回文件
fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
console.log(`\n✅ 总共添加了 ${fixCount} 个分类翻译`);
