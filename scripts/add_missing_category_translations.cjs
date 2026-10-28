#!/usr/bin/env node
/**
 * 为AI新闻条目添加缺失的分类英文翻译
 */

const fs = require('fs');
const path = require('path');

// 分类中英文对照表
const categoryTranslations = {
  'AI动态': 'AI Updates',
  '大模型': 'Large Model',
  'AI应用': 'AI Applications',
  'AI硬件': 'AI Hardware',
  'AI视频': 'AI Video',
  'AI安全': 'AI Safety',
  'AI大模型': 'Large AI Models'
};

// 读取数据文件
const dataPath = 'src/data/ai-news-summary.ts';
let content = fs.readFileSync(dataPath, 'utf-8');

let updateCount = 0;

// 遍历每个分类并添加英文翻译
Object.entries(categoryTranslations).forEach(([zh, en]) => {
  // 查找所有包含这个分类的newsItems
  const pattern = new RegExp(`"category": "${zh}"`, 'g');
  const matches = [...content.matchAll(pattern)];

  matches.forEach(match => {
    // 检查是否已经有categoryEn
    const contextStart = Math.max(0, match.index - 50);
    const contextEnd = Math.min(content.length, match.index + 200);
    const context = content.substring(contextStart, contextEnd);

    if (!context.includes('categoryEn')) {
      // 在这个category后添加categoryEn
      const insertPos = match.index + match[0].length;
      content = content.substring(0, insertPos) +
        `,\n      "categoryEn": "${en}"` +
        content.substring(insertPos);
      updateCount++;
    }
  });
});

// 写回文件
fs.writeFileSync(dataPath, content, 'utf-8');

console.log(`✅ 已添加 ${updateCount} 个分类的英文翻译`);
