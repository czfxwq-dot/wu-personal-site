#!/usr/bin/env node
/**
 * 修复AI新闻的英文点评
 * 从 translations_ai_news.json 读取 commentEn
 * 更新到 ai-news-summary.ts
 */

const fs = require('fs');

// 读取翻译文件
const translations = JSON.parse(fs.readFileSync('scripts/translations_ai_news.json', 'utf-8'));
console.log(`读取到 ${translations.length} 天的翻译`);

// 读取数据文件
const dataPath = 'src/data/ai-news-summary.ts';
let content = fs.readFileSync(dataPath, 'utf-8');

let updatedCount = 0;

// 遍历每个翻译
translations.forEach(trans => {
  const date = trans.date;
  const commentEn = trans.commentEn;

  if (!commentEn) {
    console.log(`跳过 ${date}：没有英文点评`);
    return;
  }

  // 查找这一天的 comment 字段
  // 格式： "date": "2026-10-25", ... "comment": "..."
  const datePattern = new RegExp(`"date":\\s*"${date}"[\\s\\S]*?"comment":\\s*"([^"]*)"`, 'm');
  const match = content.match(datePattern);

  if (!match) {
    console.log(`未找到 ${date} 的 comment 字段`);
    return;
  }

  const chineseComment = match[1];

  // 检查是否已经有 commentEn
  const fullBlockPattern = new RegExp(`"date":\\s*"${date}"[\\s\\S]*?"comment":\\s*"${chineseComment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'm');
  const fullBlockMatch = content.match(fullBlockPattern);

  if (!fullBlockMatch) {
    console.log(`未找到 ${date} 的完整块`);
    return;
  }

  const fullBlock = fullBlockMatch[0];

  // 如果已经有 commentEn，跳过
  if (fullBlock.includes('commentEn')) {
    console.log(`${date} 已有 commentEn，跳过`);
    return;
  }

  // 在 comment 后添加 commentEn
  const newBlock = fullBlock.replace(
    /"comment":\s*"([^"]*)"/,
    `"comment": "$1",\n  "commentEn": "${commentEn.replace(/"/g, '\\"')}"`
  );

  // 替换原内容
  content = content.replace(fullBlock, newBlock);
  updatedCount++;
  console.log(`✓ 更新 ${date}`);
});

// 写回文件
fs.writeFileSync(dataPath, content, 'utf-8');
console.log(`\n✅ 完成！更新了 ${updatedCount} 天的英文点评`);
