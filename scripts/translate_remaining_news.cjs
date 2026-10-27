#!/usr/bin/env node
/**
 * 翻译所有剩余的AI新闻条目
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
  console.log('开始翻译所有剩余的AI新闻条目...\n');

  const dataPath = 'src/data/ai-news-summary.ts';
  const content = fs.readFileSync(dataPath, 'utf-8');
  const match = content.match(/export const dailyNewsSummaries.*?=\s*(\[[\s\S]*?\n\]);/);

  if (!match) {
    console.error('无法提取数据');
    return;
  }

  const dailyNewsSummaries = new Function('return ' + match[1])();

  // 找出所有需要翻译的条目
  const toTranslate = [];
  dailyNewsSummaries.forEach(day => {
    day.newsItems.forEach((item, idx) => {
      if (!item.titleEn || !item.summaryEn) {
        toTranslate.push({ date: day.date, itemIdx: idx, item });
      }
    });
  });

  console.log(`找到 ${toTranslate.length} 条需要翻译\n`);

  let translatedCount = 0;

  // 按日期排序，从最新到最旧
  toTranslate.sort((a, b) => b.date.localeCompare(a.date));

  for (const { date, itemIdx, item } of toTranslate) {
    console.log(`\n[${date}][${itemIdx}] ${item.title.substring(0, 40)}...`);

    const titleEn = await translateText(item.title);
    if (!titleEn) {
      console.log('  ✗ 标题翻译失败');
      continue;
    }

    const summaryEn = await translateText(item.summary);
    if (!summaryEn) {
      console.log('  ✗ 摘要翻译失败');
      continue;
    }

    const categoryEn = item.category ? await translateText(item.category) : null;

    // 直接更新原数据
    item.titleEn = titleEn;
    item.summaryEn = summaryEn;
    if (categoryEn) item.categoryEn = categoryEn;

    translatedCount++;
    console.log(`  ✓ 完成 (${translatedCount}/${toTranslate.length})`);

    // 延迟避免限流
    await new Promise(r => setTimeout(r, 800));
  }

  console.log(`\n✅ 翻译完成: ${translatedCount}/${toTranslate.length}`);

  // 保存结果
  fs.writeFileSync(
    'scripts/translations_news_items.json',
    JSON.stringify(dailyNewsSummaries, null, 2)
  );

  console.log('已保存到 scripts/translations_news_items.json');
  console.log('下一步: 运行 node scripts/update_news_items_translations.cjs 更新数据文件');
}

main().catch(console.error);
