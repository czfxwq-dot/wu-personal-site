#!/usr/bin/env node
/**
 * 翻译10月24号和25号的AI新闻条目
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
  console.log('开始翻译10月24号和25号的新闻条目...\n');

  const dataPath = 'src/data/ai-news-summary.ts';
  const content = fs.readFileSync(dataPath, 'utf-8');
  const match = content.match(/export const dailyNewsSummaries.*?=\s*(\[[\s\S]*?\n\]);/);

  if (!match) {
    console.error('无法提取数据');
    return;
  }

  const dailyNewsSummaries = new Function('return ' + match[1])();

  const dates = ['2026-10-24', '2026-10-25'];
  let translatedCount = 0;

  for (const date of dates) {
    const day = dailyNewsSummaries.find(d => d.date === date);
    if (!day) continue;

    console.log(`\n处理 ${date}，共 ${day.newsItems.length} 条`);

    for (let i = 0; i < day.newsItems.length; i++) {
      const item = day.newsItems[i];

      if (item.titleEn && item.summaryEn) {
        console.log(`  [${i}] 已翻译，跳过`);
        continue;
      }

      console.log(`  [${i}] 翻译: ${item.title.substring(0, 40)}...`);

      const titleEn = await translateText(item.title);
      if (!titleEn) continue;

      const summaryEn = await translateText(item.summary);
      if (!summaryEn) continue;

      const categoryEn = item.category ? await translateText(item.category) : null;

      item.titleEn = titleEn;
      item.summaryEn = summaryEn;
      if (categoryEn) item.categoryEn = categoryEn;

      translatedCount++;
      console.log(`    ✓ 完成`);

      await new Promise(r => setTimeout(r, 800));
    }
  }

  console.log(`\n✅ 翻译完成: ${translatedCount} 条`);

  fs.writeFileSync(
    'scripts/translations_news_items.json',
    JSON.stringify(dailyNewsSummaries, null, 2)
  );

  console.log('已保存到 scripts/translations_news_items.json');
}

main().catch(console.error);
