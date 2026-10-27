#!/usr/bin/env node
/**
 * 翻译AI新闻的newsItems
 */

const fs = require('fs');

// CCSWITCH代理配置
const PROXY_URL = 'http://127.0.0.1:15721/v1/messages';
const MODEL = 'claude-sonnet-4-6';

async function translateText(text, context = 'AI news item') {
  if (!text || text.trim() === '') return '';

  const prompt = `You are a professional translator. Translate the following Chinese text to English.

Requirements:
1. Use natural, fluent English
2. Keep proper nouns (company names, product names, people's names) as they are or use common English equivalents
3. The context is: ${context}
4. Maintain the same meaning and tone
5. Keep it concise and clear

Chinese text:
${text}

Please provide only the translated English text, without any explanation or additional text.`;

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
        max_tokens: 2048,
        messages: [
          { role: 'user', content: prompt }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API错误: ${response.status} - ${errorText}`);
      return null;
    }

    const result = await response.json();
    const textBlock = result.content.find(block => block.type === 'text');
    if (!textBlock) {
      console.error('API响应中没有text块');
      return null;
    }
    return textBlock.text.trim();
  } catch (error) {
    console.error(`翻译错误: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('开始翻译AI新闻条目...\n');

  // 读取数据文件
  const dataPath = 'src/data/ai-news-summary.ts';
  let content = fs.readFileSync(dataPath, 'utf-8');

  // 提取dailyNewsSummaries
  const match = content.match(/export const dailyNewsSummaries.*?=\s*(\[[\s\S]*?\n\]);/);
  if (!match) {
    console.error('无法提取dailyNewsSummaries');
    return;
  }

  // 使用eval解析（注意：这只是因为文件格式特殊）
  let dailyNewsSummaries;
  try {
    const func = new Function('return ' + match[1]);
    dailyNewsSummaries = func();
  } catch (e) {
    console.error('解析失败:', e.message);
    return;
  }

  console.log(`找到 ${dailyNewsSummaries.length} 天的新闻\n`);

  let translatedCount = 0;
  let totalItems = 0;

  // 遍历每一天
  for (const day of dailyNewsSummaries) {
    const missingItems = day.newsItems.filter(item => !item.titleEn || !item.summaryEn);

    if (missingItems.length === 0) {
      continue;
    }

    console.log(`\n处理 ${day.date}，需要翻译 ${missingItems.length} 条`);

    for (const item of missingItems) {
      totalItems++;
      console.log(`  翻译: ${item.title.substring(0, 40)}...`);

      // 翻译标题
      const titleEn = await translateText(item.title, 'AI news title');
      if (!titleEn) {
        console.log(`    ✗ 标题翻译失败`);
        continue;
      }

      // 翻译摘要
      const summaryEn = await translateText(item.summary, 'AI news summary');
      if (!summaryEn) {
        console.log(`    ✗ 摘要翻译失败`);
        continue;
      }

      // 翻译分类
      const categoryEn = item.category ? await translateText(item.category, 'AI news category') : null;

      // 添加到item
      item.titleEn = titleEn;
      item.summaryEn = summaryEn;
      if (categoryEn) {
        item.categoryEn = categoryEn;
      }

      translatedCount++;
      console.log(`    ✓ 翻译完成`);

      // 避免API限流
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log(`\n翻译完成: ${translatedCount}/${totalItems} 条`);

  // 保存结果
  fs.writeFileSync(
    'scripts/translations_news_items.json',
    JSON.stringify(dailyNewsSummaries, null, 2)
  );

  console.log('\n翻译结果已保存到 scripts/translations_news_items.json');
  console.log('下一步: 运行 node scripts/update_news_items.cjs 更新数据文件');
}

main().catch(console.error);
