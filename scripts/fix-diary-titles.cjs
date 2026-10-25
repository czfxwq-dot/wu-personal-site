#!/usr/bin/env node
/**
 * 修复日记标题：从diaries.ts读取正确标题并更新markdown文件
 */

const fs = require('fs');
const path = require('path');
const {diaries} = require('../src/data/diaries.ts');

const CONTENT_DIR = 'src/content/diaries';
const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));

console.log(`找到 ${files.length} 个日记文件`);

let fixed = 0;
files.forEach(file => {
  const filePath = path.join(CONTENT_DIR, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // 提取日期
  const dateMatch = content.match(/^date:\s*(.+)$/m);
  if (!dateMatch) return;
  const date = dateMatch[1].trim();

  // 从diaries.ts查找正确的标题
  const diary = diaries.find(d => d.date === date);
  if (!diary || !diary.title) return;

  // 检查当前标题是否只是日期
  const titleMatch = content.match(/^title:\s*(.+)$/m);
  if (!titleMatch) return;
  const currentTitle = titleMatch[1].trim();

  // 如果标题等于日期，需要修复
  if (currentTitle === date || currentTitle === `"${date}"`) {
    const newTitle = diary.title.replace(/"/g, '\\"');
    content = content.replace(/^title:\s*.+$/m, `title: "${newTitle}"`);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ ${date}: ${currentTitle} → ${diary.title.substring(0, 30)}...`);
    fixed++;
  }
});

console.log(`\n修复完成: ${fixed} 个文件`);
