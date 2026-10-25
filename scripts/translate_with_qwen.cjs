#!/usr/bin/env node
/**
 * 批量翻译日记和文章内容
 * 使用本地CCSWITCH代理（Qwen模型）
 */

const fs = require('fs');
const path = require('path');

// CCSWITCH代理配置
const PROXY_URL = 'http://127.0.0.1:15721/v1/messages';
const MODEL = 'claude-sonnet-4-6'; // 通过代理映射到Qwen

// 读取markdown文件，提取frontmatter和content
function parseMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;

  const frontmatter = match[1];
  const body = match[2].trim();

  // 解析frontmatter
  const data = {};
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      data[key] = value;
    }
  });

  return { data, body };
}

// 使用Qwen翻译HTML内容
async function translateHtml(html, content_type = 'diary') {
  const prompt = `You are a professional translator. Translate the following Chinese HTML content to English.

Requirements:
1. Keep all HTML tags exactly as they are
2. Only translate the text content between tags
3. Maintain the same HTML structure and formatting
4. Use natural, fluent English
5. Keep proper nouns (like website names, technical terms) as they are or use common English equivalents
6. The content is a ${content_type} entry from a personal website about AI and technology

Chinese HTML content:
${html}

Please provide only the translated English HTML content, without any explanation or additional text.`;

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
        max_tokens: 8192,
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

// 处理日记
async function processDiaries() {
  const diariesDir = 'src/content/diaries';
  const files = fs.readdirSync(diariesDir).filter(f => f.endsWith('.md'));

  // 检查已有的翻译
  let existingTranslations = [];
  if (fs.existsSync('scripts/translations_diaries.json')) {
    existingTranslations = JSON.parse(fs.readFileSync('scripts/translations_diaries.json', 'utf-8'));
  }

  const existingDates = new Set(existingTranslations.map(t => t.date));

  console.log(`找到 ${files.length} 个日记文件`);
  console.log(`已有 ${existingDates.size} 个翻译`);

  const results = [...existingTranslations];
  let newCount = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(diariesDir, file);
    const parsed = parseMarkdownFile(filePath);
    if (!parsed) continue;

    const { data, body } = parsed;
    const date = data.date || file.replace('.md', '');

    // 跳过已翻译的
    if (existingDates.has(date)) {
      console.log(`[${i + 1}/${files.length}] 跳过已翻译: ${date}`);
      continue;
    }

    console.log(`[${i + 1}/${files.length}] 翻译中: ${date}`);

    // 翻译内容
    const translated = await translateHtml(body, 'diary');

    if (translated) {
      results.push({
        date,
        contentEn: translated
      });
      newCount++;
      console.log(`  ✓ 翻译完成`);

      // 每5个保存一次
      if (newCount % 5 === 0) {
        fs.writeFileSync(
          'scripts/translations_diaries.json',
          JSON.stringify(results, null, 2)
        );
        console.log(`  💾 已保存进度 (${newCount} 个新翻译)`);
      }
    } else {
      console.log(`  ✗ 翻译失败`);
    }

    // 避免API限流
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return results;
}

// 处理文章
async function processArticles() {
  const articlesDir = 'src/content/articles';
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

  // 检查已有的翻译
  let existingTranslations = [];
  if (fs.existsSync('scripts/translations_articles.json')) {
    existingTranslations = JSON.parse(fs.readFileSync('scripts/translations_articles.json', 'utf-8'));
  }

  const existingSlugs = new Set(existingTranslations.map(t => t.slug));

  console.log(`找到 ${files.length} 个文章文件`);
  console.log(`已有 ${existingSlugs.size} 个翻译`);

  const results = [...existingTranslations];
  let newCount = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(articlesDir, file);
    const parsed = parseMarkdownFile(filePath);
    if (!parsed) continue;

    const { data, body } = parsed;
    const slug = data.slug || file.replace('.md', '');

    // 跳过已翻译的
    if (existingSlugs.has(slug)) {
      console.log(`[${i + 1}/${files.length}] 跳过已翻译: ${slug}`);
      continue;
    }

    console.log(`[${i + 1}/${files.length}] 翻译中: ${slug}`);

    // 翻译内容
    const translated = await translateHtml(body, 'article');

    if (translated) {
      results.push({
        slug,
        contentEn: translated
      });
      newCount++;
      console.log(`  ✓ 翻译完成`);

      // 每5个保存一次
      if (newCount % 5 === 0) {
        fs.writeFileSync(
          'scripts/translations_articles.json',
          JSON.stringify(results, null, 2)
        );
        console.log(`  💾 已保存进度 (${newCount} 个新翻译)`);
      }
    } else {
      console.log(`  ✗ 翻译失败`);
    }

    // 避免API限流
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return results;
}

// 主函数
async function main() {
  console.log('='.repeat(60));
  console.log('开始批量翻译内容（使用Qwen模型）');
  console.log('='.repeat(60));

  // 处理日记
  console.log('\n' + '='.repeat(60));
  console.log('处理日记');
  console.log('='.repeat(60));
  const diaryTranslations = await processDiaries();
  fs.writeFileSync(
    'scripts/translations_diaries.json',
    JSON.stringify(diaryTranslations, null, 2)
  );
  console.log(`\n日记翻译完成: ${diaryTranslations.length} 个\n`);

  // 处理文章
  console.log('='.repeat(60));
  console.log('处理文章');
  console.log('='.repeat(60));
  const articleTranslations = await processArticles();
  fs.writeFileSync(
    'scripts/translations_articles.json',
    JSON.stringify(articleTranslations, null, 2)
  );
  console.log(`\n文章翻译完成: ${articleTranslations.length} 个\n`);

  console.log('='.repeat(60));
  console.log('✓ 翻译完成!');
  console.log('='.repeat(60));
  console.log(`日记翻译: ${diaryTranslations.length} 个`);
  console.log(`文章翻译: ${articleTranslations.length} 个`);
  console.log('\n下一步: 运行 node scripts/update_data_files.cjs 更新数据文件');
}

main().catch(console.error);
