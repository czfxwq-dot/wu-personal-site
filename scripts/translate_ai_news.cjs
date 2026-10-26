#!/usr/bin/env node
/**
 * 批量翻译AI新闻内容
 * 使用本地CCSWITCH代理（Qwen模型）
 */

const fs = require('fs');
const path = require('path');

// CCSWITCH代理配置
const PROXY_URL = 'http://127.0.0.1:15721/v1/messages';
const MODEL = 'claude-sonnet-4-6'; // 通过代理映射到Qwen

// 使用Qwen翻译文本
async function translateText(text, context = 'AI news') {
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
    // Find the text block in the response (skip thinking block)
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

// 主函数
async function main() {
  console.log('='.repeat(60));
  console.log('开始翻译AI新闻内容');
  console.log('='.repeat(60));

  // 读取现有的翻译（如果有的话）
  let translations = [];
  if (fs.existsSync('scripts/translations_ai_news.json')) {
    translations = JSON.parse(fs.readFileSync('scripts/translations_ai_news.json', 'utf-8'));
    console.log(`已有 ${translations.length} 天的翻译`);
  }

  // 读取数据文件 - 使用require直接加载TypeScript
  const { dailyNewsSummaries } = require('../src/data/ai-news-summary.ts');

  console.log(`找到 ${dailyNewsSummaries.length} 天的AI新闻\n`);

  let translatedCount = translations.length;

  // 遍历每一天的新闻
  for (let i = 0; i < dailyNewsSummaries.length; i++) {
    const dayData = dailyNewsSummaries[i];
    const date = dayData.date;

    // 检查是否已翻译
    if (translations.find(t => t.date === date)) {
      console.log(`[${i + 1}/${dailyNewsSummaries.length}] 跳过已翻译: ${date}`);
      continue;
    }

    console.log(`\n[${i + 1}/${dailyNewsSummaries.length}] 翻译中: ${date}`);

    const translation = {
      date: date,
      titleEn: null,
      summaryEn: null,
      commentEn: null,
      newsItems: []
    };

    // 翻译标题
    console.log(`  翻译标题...`);
    translation.titleEn = await translateText(dayData.title, 'AI news daily title');
    if (!translation.titleEn) {
      console.log(`  ✗ 标题翻译失败`);
      continue;
    }

    // 翻译摘要
    console.log(`  翻译摘要...`);
    translation.summaryEn = await translateText(dayData.summary, 'AI news daily summary');
    if (!translation.summaryEn) {
      console.log(`  ✗ 摘要翻译失败`);
      continue;
    }

    // 翻译点评
    if (dayData.comment) {
      console.log(`  翻译点评...`);
      translation.commentEn = await translateText(dayData.comment, 'AI news one-line commentary');
    }

    // 翻译每条新闻
    for (let j = 0; j < dayData.newsItems.length; j++) {
      const item = dayData.newsItems[j];
      console.log(`  翻译新闻 ${j + 1}/${dayData.newsItems.length}...`);

      const itemTranslation = {
        titleEn: await translateText(item.title, 'AI news article title'),
        summaryEn: await translateText(item.summary, 'AI news article summary'),
        categoryEn: await translateText(item.category, 'AI news category')
      };

      if (!itemTranslation.titleEn || !itemTranslation.summaryEn) {
        console.log(`    ✗ 新闻翻译失败`);
        continue;
      }

      translation.newsItems.push(itemTranslation);

      // 避免API限流
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    translations.push(translation);
    translatedCount++;
    console.log(`  ✓ 翻译完成`);

    // 每5天保存一次
    if (translatedCount % 5 === 0) {
      fs.writeFileSync(
        'scripts/translations_ai_news.json',
        JSON.stringify(translations, null, 2)
      );
      console.log(`  💾 已保存进度 (${translatedCount} 天)`);
    }

    // 避免API限流
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // 最终保存
  fs.writeFileSync(
    'scripts/translations_ai_news.json',
    JSON.stringify(translations, null, 2)
  );

  console.log('\n' + '='.repeat(60));
  console.log('✓ AI新闻翻译完成!');
  console.log('='.repeat(60));
  console.log(`翻译完成: ${translatedCount} / ${dailyNewsSummaries.length} 天`);
  console.log('\n下一步: 运行 node scripts/update_ai_news_translations.cjs 更新数据文件');
}

main().catch(console.error);
