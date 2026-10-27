#!/usr/bin/env node
/**
 * 分批翻译AI新闻条目 - 简化版
 */

const fs = require('fs');

const PROXY_URL = 'http://127.0.0.1:15721/v1/messages';
const MODEL = 'claude-sonnet-4-6';

async function translateText(text) {
  if (!text || text.trim() === '') return '';

  try {
    const response = await fetch(PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'proxy-managed',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: `Translate to English: ${text}`
        }]
      })
    });

    const result = await response.json();
    const textBlock = result.content.find(b => b.type === 'text');
    return textBlock ? textBlock.text.trim() : null;
  } catch (error) {
    console.error('翻译错误:', error.message);
    return null;
  }
}

async function main() {
  // 读取数据文件
  const dataPath = 'src/data/ai-news-summary.ts';
  const content = fs.readFileSync(dataPath, 'utf-8');

  // 提取并解析数据
  const match = content.match(/export const dailyNewsSummaries.*?=\s*(\[[\s\S]*?\n\]);/);
  if (!match) {
    console.error('无法提取数据');
    return;
  }

  const dailyNewsSummaries = new Function('return ' + match[1])();

  // 找出需要翻译的条目
  const toTranslate = [];
  dailyNewsSummaries.forEach(day => {
    day.newsItems.forEach((item, idx) => {
      if (!item.titleEn || !item.summaryEn) {
        toTranslate.push({ day: day.date, itemIdx: idx, item });
      }
    });
  });

  console.log(`找到 ${toTranslate.length} 条需要翻译\n`);

  // 分批翻译（每批5条）
  const batchSize = 5;
  let translated = 0;

  for (let i = 0; i < toTranslate.length; i += batchSize) {
    const batch = toTranslate.slice(i, i + batchSize);
    console.log(`\n批次 ${Math.floor(i/batchSize) + 1}: 翻译 ${batch.length} 条`);

    for (const { day, itemIdx, item } of batch) {
      console.log(`  ${day}[${itemIdx}]: ${item.title.substring(0, 30)}...`);

      const titleEn = await translateText(item.title);
      if (!titleEn) continue;

      const summaryEn = await translateText(item.summary);
      if (!summaryEn) continue;

      const categoryEn = item.category ? await translateText(item.category) : null;

      // 直接更新原数据
      item.titleEn = titleEn;
      item.summaryEn = summaryEn;
      if (categoryEn) item.categoryEn = categoryEn;

      translated++;
      console.log(`    ✓ 完成`);

      // 延迟避免限流
      await new Promise(r => setTimeout(r, 800));
    }

    // 每批完成后保存进度
    fs.writeFileSync(
      'scripts/translations_news_items.json',
      JSON.stringify(dailyNewsSummaries, null, 2)
    );
    console.log(`💾 已保存进度 (${translated}/${toTranslate.length})`);
  }

  console.log(`\n✅ 翻译完成: ${translated}/${toTranslate.length}`);
}

main().catch(console.error);
