#!/usr/bin/env node
/**
 * 将AI新闻翻译结果写入数据文件
 * 读取 scripts/translations_ai_news.json
 * 更新 src/data/ai-news-summary.ts
 */

const fs = require('fs');
const path = require('path');

// 读取翻译文件
const translations = JSON.parse(fs.readFileSync('scripts/translations_ai_news.json', 'utf-8'));
console.log(`读取到 ${translations.length} 天的翻译`);

// 读取数据文件
const dataPath = 'src/data/ai-news-summary.ts';
let content = fs.readFileSync(dataPath, 'utf-8');

// 更新每一天的翻译
let updatedCount = 0;
translations.forEach(trans => {
  const date = trans.date;

  // 查找这一天的数据块
  // 格式: { "date": "2026-10-25", ... }
  const dateRegex = new RegExp(`"date":\\s*"${date}"`, 'g');
  const match = content.match(dateRegex);

  if (!match) {
    console.log(`✗ 未找到日期: ${date}`);
    return;
  }

  // 找到这一天的完整数据块
  const blockStart = content.indexOf(`"date": "${date}"`);
  if (blockStart === -1) {
    console.log(`✗ 无法定位日期: ${date}`);
    return;
  }

  // 找到这一天的结束位置（下一个 { 或文件结尾）
  let blockEnd = content.indexOf('{', blockStart + 1);
  if (blockEnd === -1) {
    blockEnd = content.indexOf('];', blockStart);
  }
  if (blockEnd === -1) {
    blockEnd = content.length;
  }

  // 提取这一天的完整块
  let dayBlock = content.substring(blockStart, blockEnd);

  // 更新标题翻译
  if (trans.titleEn && dayBlock.includes('"title":')) {
    if (dayBlock.includes('"titleEn":')) {
      // 替换现有的 titleEn
      dayBlock = dayBlock.replace(/"titleEn":\s*"[^"]*"/, `"titleEn": "${trans.titleEn.replace(/"/g, '\\"')}"`);
    } else {
      // 在 title 后添加 titleEn
      dayBlock = dayBlock.replace(
        /"title":\s*"([^"]*)"/,
        `"title": "$1",\n  "titleEn": "${trans.titleEn.replace(/"/g, '\\"')}"`
      );
    }
  }

  // 更新摘要翻译
  if (trans.summaryEn && dayBlock.includes('"summary":')) {
    if (dayBlock.includes('"summaryEn":')) {
      dayBlock = dayBlock.replace(/"summaryEn":\s*"[^"]*"/, `"summaryEn": "${trans.summaryEn.replace(/"/g, '\\"')}"`);
    } else {
      dayBlock = dayBlock.replace(
        /"summary":\s*"([^"]*)"/,
        `"summary": "$1",\n  "summaryEn": "${trans.summaryEn.replace(/"/g, '\\"')}"`
      );
    }
  }

  // 更新点评翻译
  if (trans.commentEn && dayBlock.includes('"comment":')) {
    if (dayBlock.includes('"commentEn":')) {
      dayBlock = dayBlock.replace(/"commentEn":\s*"[^"]*"/, `"commentEn": "${trans.commentEn.replace(/"/g, '\\"')}"`);
    } else {
      dayBlock = dayBlock.replace(
        /"comment":\s*"([^"]*)"/,
        `"comment": "$1",\n  "commentEn": "${trans.commentEn.replace(/"/g, '\\"')}"`
      );
    }
  }

  // 更新每条新闻的翻译
  if (trans.newsItems && trans.newsItems.length > 0) {
    // 找到 newsItems 数组
    const newsItemsMatch = dayBlock.match(/"newsItems":\s*\[([\s\S]*?)\]/);
    if (newsItemsMatch) {
      let newsItemsContent = newsItemsMatch[1];

      // 按顺序更新每条新闻
      trans.newsItems.forEach((itemTrans, idx) => {
        // 找到第 idx 条新闻的块
        let newsBlockStart = 0;
        let newsBlockCount = 0;

        for (let i = 0; i < newsItemsContent.length; i++) {
          if (newsItemsContent[i] === '{') {
            if (newsBlockCount === idx) {
              newsBlockStart = i;
              break;
            }
            newsBlockCount++;
          }
        }

        if (newsBlockStart > 0) {
          // 找到这条新闻的结束位置
          let braceCount = 1;
          let newsBlockEnd = newsBlockStart + 1;
          while (braceCount > 0 && newsBlockEnd < newsItemsContent.length) {
            if (newsItemsContent[newsBlockEnd] === '{') braceCount++;
            if (newsItemsContent[newsBlockEnd] === '}') braceCount--;
            newsBlockEnd++;
          }

          let newsBlock = newsItemsContent.substring(newsBlockStart, newsBlockEnd);

          // 更新标题翻译
          if (itemTrans.titleEn && newsBlock.includes('"title":')) {
            if (newsBlock.includes('"titleEn":')) {
              newsBlock = newsBlock.replace(/"titleEn":\s*"[^"]*"/, `"titleEn": "${itemTrans.titleEn.replace(/"/g, '\\"')}"`);
            } else {
              newsBlock = newsBlock.replace(
                /"title":\s*"([^"]*)"/,
                `"title": "$1",\n        "titleEn": "${itemTrans.titleEn.replace(/"/g, '\\"')}"`
              );
            }
          }

          // 更新摘要翻译
          if (itemTrans.summaryEn && newsBlock.includes('"summary":')) {
            if (newsBlock.includes('"summaryEn":')) {
              newsBlock = newsBlock.replace(/"summaryEn":\s*"[^"]*"/, `"summaryEn": "${itemTrans.summaryEn.replace(/"/g, '\\"')}"`);
            } else {
              newsBlock = newsBlock.replace(
                /"summary":\s*"([^"]*)"/,
                `"summary": "$1",\n        "summaryEn": "${itemTrans.summaryEn.replace(/"/g, '\\"')}"`
              );
            }
          }

          // 更新分类翻译
          if (itemTrans.categoryEn && newsBlock.includes('"category":')) {
            if (newsBlock.includes('"categoryEn":')) {
              newsBlock = newsBlock.replace(/"categoryEn":\s*"[^"]*"/, `"categoryEn": "${itemTrans.categoryEn.replace(/"/g, '\\"')}"`);
            } else {
              newsBlock = newsBlock.replace(
                /"category":\s*"([^"]*)"/,
                `"category": "$1",\n        "categoryEn": "${itemTrans.categoryEn.replace(/"/g, '\\"')}"`
              );
            }
          }

          // 替换回 newsItemsContent
          newsItemsContent = newsItemsContent.substring(0, newsBlockStart) + newsBlock + newsItemsContent.substring(newsBlockEnd);
        }
      });

      // 替换回 dayBlock
      dayBlock = dayBlock.replace(/"newsItems":\s*\[[\s\S]*?\]/, `"newsItems": [${newsItemsContent}]`);
    }
  }

  // 替换回原文件内容
  content = content.substring(0, blockStart) + dayBlock + content.substring(blockEnd);

  updatedCount++;
  console.log(`✓ 更新: ${date}`);
});

// 写回文件
fs.writeFileSync(dataPath, content, 'utf-8');
console.log(`\n✅ 数据文件更新完成！`);
console.log(`更新了 ${updatedCount} 天的AI新闻`);
