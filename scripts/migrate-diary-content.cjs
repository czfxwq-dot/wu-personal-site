#!/usr/bin/env node
/**
 * 日记内容迁移脚本
 * 从静态 .astro 页面提取内容，保存到 src/content/diaries/*.md
 */

const fs = require('fs');
const path = require('path');

const STATIC_DIR = 'src/pages/diary';
const CONTENT_DIR = 'src/content/diaries';

// 确保输出目录存在
if (!fs.existsSync(CONTENT_DIR)) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

// 读取所有静态日记页面
const files = fs.readdirSync(STATIC_DIR).filter(f => f.match(/^\d{4}-\d{2}-\d{2}\.astro$/));

console.log(`找到 ${files.length} 个静态日记页面`);

let migrated = 0;
let skipped = 0;

files.forEach(file => {
  const filePath = path.join(STATIC_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const date = file.replace('.astro', '');

  try {
    // 提取标题（从 <h1> 标签）
    const titleMatch = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
    const title = titleMatch ? titleMatch[1].replace(/Day \d+[:：]\s*/, '').trim() : date;

    // 提取摘要（从 description 或第一个 <p>）
    const descMatch = content.match(/description["']:\s*["']([^"']+)["']/);
    const firstPMatch = content.match(/<div class="diary-content">[\s\S]*?<p>([^<]+)<\/p>/);
    const summary = descMatch ? descMatch[1] : (firstPMatch ? firstPMatch[1] : '');

    // 提取分类（从 card-tag）
    const tagMatch = content.match(/<span class="card-tag">([^<]+)<\/span>/);
    const category = tagMatch ? tagMatch[1] : '';

    // 提取完整HTML内容（从 diary-content div）
    const contentMatch = content.match(/<div class="diary-content">([\s\S]*?)<\/div>\s*<footer/);
    const htmlContent = contentMatch ? contentMatch[1].trim() : '';

    if (!htmlContent) {
      console.log(`⚠️  ${date}: 未找到内容，跳过`);
      skipped++;
      return;
    }

    // 计算天数（从建站日期 2026-04-29 开始）
    const startDate = new Date('2026-04-29');
    const currentDate = new Date(date);
    const dayNum = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    // 生成 markdown 文件
    const mdContent = `---
date: ${date}
title: ${title}
summary: ${summary.replace(/"/g, '\\"')}
category: ${category}
dayNum: ${dayNum}
---

${htmlContent}
`;

    const mdFile = path.join(CONTENT_DIR, `${date}.md`);
    fs.writeFileSync(mdFile, mdContent, 'utf-8');

    console.log(`✅ ${date}: ${title.substring(0, 30)}...`);
    migrated++;

  } catch (err) {
    console.error(`❌ ${date}: 错误 - ${err.message}`);
    skipped++;
  }
});

console.log(`\n迁移完成:`);
console.log(`  ✅ 成功: ${migrated}`);
console.log(`  ⚠️  跳过: ${skipped}`);
console.log(`  📁 输出目录: ${CONTENT_DIR}`);
