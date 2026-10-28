#!/usr/bin/env node
/**
 * 为AI新闻条目添加缺失的分类英文翻译 - 安全版本
 */

const fs = require('fs');

// 分类中英文对照表
const categoryTranslations = {
  'AI动态': 'AI Updates',
  '大模型': 'Large Models',
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
  // 使用正则表达式匹配 "category": "中文分类" 的模式
  const pattern = new RegExp(`"category": "${zh}"`, 'g');

  let match;
  while ((match = pattern.exec(content)) !== null) {
    // 检查这个category后面是否已经有categoryEn
    const afterPos = match.index + match[0].length;
    const nextLines = content.substring(afterPos, afterPos + 200);

    // 如果下一行已经有categoryEn，跳过
    if (nextLines.includes('"categoryEn"')) {
      continue;
    }

    // 在category行后插入categoryEn行
    const lineEnd = content.indexOf('\n', match.index);
    if (lineEnd === -1) continue;

    // 获取缩进
    const lineStart = content.lastIndexOf('\n', match.index) + 1;
    const line = content.substring(lineStart, lineEnd);
    const indent = line.match(/^\s*/)[0];

    // 插入新的categoryEn行
    const newLine = `${indent}"categoryEn": "${en}"`;
    content = content.substring(0, lineEnd) + ',\n' + newLine + content.substring(lineEnd);

    updateCount++;

    // 重新创建正则表达式（因为content已经改变了）
    pattern.lastIndex = 0;
  }
});

// 写回文件
fs.writeFileSync(dataPath, content, 'utf-8');

console.log(`✅ 已添加 ${updateCount} 个分类的英文翻译`);
console.log('下一步: 运行 npm run build 测试构建');
