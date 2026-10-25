#!/usr/bin/env node
/**
 * 批量翻译日记和文章内容
 * 读取中文markdown文件，翻译内容，写入数据文件的contentEn字段
 */

const fs = require('fs');
const path = require('path');

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

// 翻译HTML内容（简化版，保留HTML标签）
function translateHtml(html) {
  // 这是一个简化版，实际应该调用翻译API
  // 暂时返回原文，后续需要集成翻译服务
  return html;
}

// 处理日记
function processDiaries() {
  const diariesDir = 'src/content/diaries';
  const files = fs.readdirSync(diariesDir).filter(f => f.endsWith('.md'));

  console.log(`找到 ${files.length} 个日记文件`);

  const results = [];
  files.forEach(file => {
    const filePath = path.join(diariesDir, file);
    const parsed = parseMarkdownFile(filePath);
    if (!parsed) return;

    const { data, body } = parsed;
    const date = data.date || file.replace('.md', '');

    // 翻译内容
    const contentEn = translateHtml(body);

    results.push({
      date,
      contentEn
    });

    console.log(`处理: ${date}`);
  });

  return results;
}

// 处理文章
function processArticles() {
  const articlesDir = 'src/content/articles';
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

  console.log(`找到 ${files.length} 个文章文件`);

  const results = [];
  files.forEach(file => {
    const filePath = path.join(articlesDir, file);
    const parsed = parseMarkdownFile(filePath);
    if (!parsed) return;

    const { data, body } = parsed;
    const slug = data.slug || file.replace('.md', '');

    // 翻译内容
    const contentEn = translateHtml(body);

    results.push({
      slug,
      contentEn
    });

    console.log(`处理: ${slug}`);
  });

  return results;
}

// 主函数
function main() {
  console.log('开始翻译内容...\n');

  // 处理日记
  const diaryTranslations = processDiaries();
  console.log(`\n日记翻译完成: ${diaryTranslations.length} 个\n`);

  // 处理文章
  const articleTranslations = processArticles();
  console.log(`\n文章翻译完成: ${articleTranslations.length} 个\n`);

  // 保存结果到临时文件
  fs.writeFileSync(
    'scripts/translations-diaries.json',
    JSON.stringify(diaryTranslations, null, 2)
  );

  fs.writeFileSync(
    'scripts/translations-articles.json',
    JSON.stringify(articleTranslations, null, 2)
  );

  console.log('翻译结果已保存到:');
  console.log('  - scripts/translations-diaries.json');
  console.log('  - scripts/translations-articles.json');
  console.log('\n下一步: 手动审核翻译结果，然后运行 update-data-files.js 更新数据文件');
}

main();
