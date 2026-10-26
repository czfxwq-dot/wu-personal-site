#!/usr/bin/env node
/**
 * 修复 diaries.ts 中的英文内容缩进
 */

const fs = require('fs');
const path = require('path');

const filePath = 'src/data/diaries.ts';
let content = fs.readFileSync(filePath, 'utf-8');

// 匹配 contentEn: `...` 模式（跨越多行）
const pattern = /contentEn: `([\s\S]*?)`/g;

let fixCount = 0;
content = content.replace(pattern, (match, contentEn) => {
  // 按行分割
  const lines = contentEn.split('\n');
  // 移除每行开头的空格
  const fixedLines = lines.map(line => line.trimStart());
  // 重新组合
  const fixedContent = fixedLines.join('\n');

  fixCount++;
  return `contentEn: \`${fixedContent}\``;
});

// 写回文件
fs.writeFileSync(filePath, content, 'utf-8');

console.log(`完成！共修复 ${fixCount} 个英文内容字段`);
