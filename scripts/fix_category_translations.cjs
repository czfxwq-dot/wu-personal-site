#!/usr/bin/env node
/**
 * 修复AI新闻分类英文翻译
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

// 第一步：移除重复的 categoryEn
content = content.replace(/"categoryEn": "[^"]*",\s*\n\s*"categoryEn":/g, '"categoryEn":');

// 第二步：为每个缺少翻译的分类添加翻译
Object.entries(translations).forEach(([zh, en]) => {
  // 匹配 "category": "中文分类" 后面跟着 "url" 的情况（表示缺少 categoryEn）
  const pattern1 = new RegExp(
    `("category": "${zh}",)\\n(\\s+)("url":)`,
    'g'
  );

  content = content.replace(pattern1, (match, categoryLine, indent, urlLine) => {
    return `${categoryLine}\n${indent}"categoryEn": "${en}",\n${indent}${urlLine}`;
  });

  // 也匹配 "category": "中文分类" 后面跟着 "categoryEn" 但值不对的情况
  const pattern2 = new RegExp(
    `("category": "${zh}",)\\n(\\s+)("categoryEn": ")([^"]*)(")`,
    'g'
  );

  content = content.replace(pattern2, (match, categoryLine, indent, prefix, wrongValue, suffix) => {
    // 如果已经有正确的翻译，不替换
    if (wrongValue === en) {
      return match;
    }
    return `${categoryLine}\n${indent}${prefix}${en}${suffix}`;
  });
});

// 写回文件
fs.writeFileSync(filePath, content, 'utf-8');
console.log('✓ 已修复分类翻译');
