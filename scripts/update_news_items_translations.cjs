#!/usr/bin/env node
/**
 * 将翻译结果更新到 ai-news-summary.ts
 */

const fs = require('fs');

// 读取翻译文件
const translations = JSON.parse(fs.readFileSync('scripts/translations_news_items.json', 'utf-8'));

// 读取数据文件
const dataPath = 'src/data/ai-news-summary.ts';
let content = fs.readFileSync(dataPath, 'utf-8');

let updateCount = 0;

// 遍历每一天
translations.forEach(day => {
  day.newsItems.forEach((item, idx) => {
    // 只处理有英文翻译的条目
    if (!item.titleEn || !item.summaryEn) return;

    // 找到这个日期和条目
    const datePattern = new RegExp(`"date":\\s*"${day.date}"`);
    const dateMatch = content.match(datePattern);

    if (!dateMatch) return;

    // 找到这个条目的位置
    const itemPattern = new RegExp(
      `"title":\\s*"${item.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?"summary":\\s*"${item.summary.substring(0, 50).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`
    );
    const itemMatch = content.match(itemPattern);

    if (!itemMatch) return;

    // 在title后添加titleEn
    if (!content.includes(`"titleEn": "${item.titleEn.substring(0, 30)}`)) {
      const titlePos = content.indexOf(`"title": "${item.title}"`);
      if (titlePos > -1) {
        const lineEnd = content.indexOf('\n', titlePos);
        const indent = '      ';
        content = content.slice(0, lineEnd + 1) +
          `${indent}"titleEn": "${item.titleEn.replace(/"/g, '\\"')}",\n` +
          content.slice(lineEnd + 1);
        updateCount++;
      }
    }

    // 在summary后添加summaryEn
    if (!content.includes(`"summaryEn": "${item.summaryEn.substring(0, 30)}`)) {
      const summaryPos = content.indexOf(`"summary": "${item.summary.substring(0, 50)}`);
      if (summaryPos > -1) {
        const lineEnd = content.indexOf('\n', summaryPos);
        const indent = '      ';
        content = content.slice(0, lineEnd + 1) +
          `${indent}"summaryEn": "${item.summaryEn.replace(/"/g, '\\"')}",\n` +
          content.slice(lineEnd + 1);
        updateCount++;
      }
    }

    // 如果有categoryEn，也添加
    if (item.categoryEn && !content.includes(`"categoryEn": "${item.categoryEn}`)) {
      const categoryPos = content.indexOf(`"category": "${item.category}"`);
      if (categoryPos > -1) {
        const lineEnd = content.indexOf('\n', categoryPos);
        const indent = '      ';
        content = content.slice(0, lineEnd + 1) +
          `${indent}"categoryEn": "${item.categoryEn.replace(/"/g, '\\"')}",\n` +
          content.slice(lineEnd + 1);
        updateCount++;
      }
    }
  });
});

// 写回文件
fs.writeFileSync(dataPath, content, 'utf-8');

console.log(`✅ 更新完成: ${updateCount} 个字段`);
console.log('下一步: 运行 npm run build 测试构建');
