#!/usr/bin/env node
/**
 * 安全地为AI新闻添加分类英文翻译
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

// 为每个分类添加翻译
Object.entries(translations).forEach(([zh, en]) => {
  // 匹配 "category": "中文分类" 后跟换行和下一个字段
  const pattern = new RegExp(
    `("category": "${zh}")\\n(\\s+)("[^"]+":)`,
    'g'
  );

  content = content.replace(pattern, (match, categoryLine, indent, nextField) => {
    // 检查是否已经有categoryEn
    if (match.includes('categoryEn')) {
      return match;
    }
    // 添加categoryEn行
    return `${categoryLine},\n${indent}"categoryEn": "${en}",\n${indent}${nextField}`;
  });
});

// 写回文件
fs.writeFileSync(filePath, content, 'utf-8');
console.log('✓ 已添加分类英文翻译');
