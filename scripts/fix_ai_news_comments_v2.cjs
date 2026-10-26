#!/usr/bin/env node
/**
 * 修复AI新闻的英文点评 - 改进版
 * 使用更安全的字符串替换
 */

const fs = require('fs');

// 读取翻译文件
const translations = JSON.parse(fs.readFileSync('scripts/translations_ai_news.json', 'utf-8'));
console.log(`读取到 ${translations.length} 天的翻译`);

// 读取数据文件
const dataPath = 'src/data/ai-news-summary.ts';
let content = fs.readFileSync(dataPath, 'utf-8');
let lines = content.split('\n');

let updatedCount = 0;

// 遍历每个翻译
translations.forEach(trans => {
  const date = trans.date;
  const commentEn = trans.commentEn;

  if (!commentEn) {
    return;
  }

  // 查找这一天的数据块
  // 格式：{ "date": "2026-10-25", ... "comment": "..." }
  const lines = content.split('\n');
  let startIndex = -1;
  let endIndex = -1;
  let inBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.includes(`"date": "${date}"`)) {
      startIndex = i;
      inBlock = true;
    }

    if (inBlock && line.trim() === '},') {
      endIndex = i;
      break;
    }
  }

  if (startIndex === -1 || endIndex === -1) {
    console.log(`未找到 ${date} 的数据块`);
    return;
  }

  // 提取数据块
  const block = lines.slice(startIndex, endIndex + 1).join('\n');

  // 检查是否已经有 commentEn
  if (block.includes('commentEn')) {
    return;
  }

  // 查找 comment 字段的位置
  let commentLineIndex = -1;
  for (let i = startIndex; i <= endIndex; i++) {
    if (lines[i].includes('"comment":')) {
      commentLineIndex = i;
      break;
    }
  }

  if (commentLineIndex === -1) {
    console.log(`未找到 ${date} 的 comment 字段`);
    return;
  }

  // 在 comment 行后插入 commentEn 行
  const commentLine = lines[commentLineIndex];
  const indent = commentLine.match(/^\s*/)[0];
  const escapedCommentEn = commentEn
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n');
  const commentEnLine = `${indent}"commentEn": "${escapedCommentEn}"`;

  // 确保 comment 行以逗号结尾
  if (!commentLine.trim().endsWith(',')) {
    lines[commentLineIndex] = commentLine.trimEnd() + ',';
  }

  // 插入 commentEn 行
  lines.splice(commentLineIndex + 1, 0, commentEnLine);

  updatedCount++;
  if (updatedCount % 10 === 0) {
    console.log(`已更新 ${updatedCount} 天...`);
  }
});

// 写回文件
content = lines.join('\n');
fs.writeFileSync(dataPath, content, 'utf-8');
console.log(`\n✅ 完成！更新了 ${updatedCount} 天的英文点评`);
