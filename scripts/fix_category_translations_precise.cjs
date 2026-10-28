#!/usr/bin/env node
/**
 * 修复AI新闻分类英文翻译 - 精确版
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
let content = fs.readFileSync(filePath, 'utf-8');

let fixCount = 0;

// 为每个缺少翻译的分类添加翻译
Object.entries(translations).forEach(([zh, en]) => {
  // 匹配 "category": "中文分类" 后面直接跟着 "url" 的情况（缺少 categoryEn）
  const pattern = new RegExp(
    `("category": "${zh}",\\n)(\\s+)("url":)`,
    'g'
  );

  const before = content;
  content = content.replace(pattern, (match, categoryLine, indent, urlLine) => {
    fixCount++;
    return `${categoryLine}${indent}"categoryEn": "${en}",\n${indent}${urlLine}`;
  });

  if (before !== content) {
    console.log(`✓ 为 "${zh}" 添加了 ${fixCount} 个翻译`);
  }
});

// 写回文件
fs.writeFileSync(filePath, content, 'utf-8');
console.log(`\n总共修复了 ${fixCount} 个分类翻译`);
