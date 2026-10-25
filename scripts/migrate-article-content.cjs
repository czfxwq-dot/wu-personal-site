#!/usr/bin/env node
/**
 * 文章内容迁移脚本
 * 从静态 .astro 页面提取内容，保存到 src/content/articles/*.md
 */

const fs = require('fs');
const path = require('path');

const STATIC_DIR = 'src/pages/banbaiguan';
const CONTENT_DIR = 'src/content/articles';

// 确保输出目录存在
if (!fs.existsSync(CONTENT_DIR)) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

// 读取所有静态文章页面
const files = fs.readdirSync(STATIC_DIR).filter(f => f.endsWith('.astro'));

console.log(`找到 ${files.length} 个静态文章页面`);

let migrated = 0;
let skipped = 0;

files.forEach(file => {
  const filePath = path.join(STATIC_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const slug = file.replace('.astro', '');

  try {
    // 提取标题（从 <h1> 标签）
    const titleMatch = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
    const title = titleMatch ? titleMatch[1].trim() : slug;

    // 提取副标题
    const subtitleMatch = content.match(/<p class="article-subtitle">([^<]+)<\/p>/);
    const subtitle = subtitleMatch ? subtitleMatch[1].trim() : '';

    // 提取摘要（从 description）
    const descMatch = content.match(/description["']:\s*["']([^"']+)["']/);
    const summary = descMatch ? descMatch[1] : '';

    // 提取发布日期
    const dateMatch = content.match(/datePublished["']:\s*["']([^"']+)["']/);
    const date = dateMatch ? dateMatch[1] : '';

    // 提取分类（从 article-tag）
    const tagMatch = content.match(/<span class="article-tag">([^<]+)<\/span>/);
    const tag = tagMatch ? tagMatch[1] : '';

    // 提取作者
    const authorMatch = content.match(/"name":\s*"([^"]+)"/);
    const author = authorMatch ? authorMatch[1] : '吴总';

    // 提取完整HTML内容（从 article-content div）
    // 尝试多种结束模式
    let htmlContent = '';
    const patterns = [
      /<div class="article-content">([\s\S]*?)<\/div>\s*<\/article>/,
      /<div class="article-content">([\s\S]*?)<\/div>\s*<footer/,
      /<div class="article-content">([\s\S]*?)<\/div>\s*<Citations/,
      /<div class="article-content">([\s\S]*?)<\/div>\s*<\/div>\s*<\/article>/,
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match && match[1].trim().length > 100) {
        htmlContent = match[1].trim();
        break;
      }
    }

    if (!htmlContent) {
      console.log(`⚠️  ${slug}: 未找到内容，跳过`);
      skipped++;
      return;
    }

    // 生成 markdown 文件
    const mdContent = `---
title: ${title}
subtitle: ${subtitle}
date: ${date}
tag: ${tag}
author: ${author}
summary: ${summary.replace(/"/g, '\\"')}
---

${htmlContent}
`;

    const mdFile = path.join(CONTENT_DIR, `${slug}.md`);
    fs.writeFileSync(mdFile, mdContent, 'utf-8');

    console.log(`✅ ${slug}: ${title.substring(0, 30)}...`);
    migrated++;

  } catch (err) {
    console.error(`❌ ${slug}: 错误 - ${err.message}`);
    skipped++;
  }
});

console.log(`\n迁移完成:`);
console.log(`  ✅ 成功: ${migrated}`);
console.log(`  ⚠️  跳过: ${skipped}`);
console.log(`  📁 输出目录: ${CONTENT_DIR}`);
