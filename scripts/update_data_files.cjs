#!/usr/bin/env node
/**
 * 将翻译结果写入数据文件
 * 读取 translations_diaries.json 和 translations_articles.json
 * 更新 src/data/diaries.ts 和 src/data/articles.ts
 */

const fs = require('fs');
const path = require('path');

// 读取翻译文件
const diaryTranslations = JSON.parse(fs.readFileSync('scripts/translations_diaries.json', 'utf-8'));
const articleTranslations = JSON.parse(fs.readFileSync('scripts/translations_articles.json', 'utf-8'));

console.log(`读取到 ${diaryTranslations.length} 个日记翻译`);
console.log(`读取到 ${articleTranslations.length} 个文章翻译`);

// 读取 diaries.ts
const diariesPath = 'src/data/diaries.ts';
let diariesContent = fs.readFileSync(diariesPath, 'utf-8');

// 更新日记翻译
let updatedDiaryCount = 0;
diaryTranslations.forEach(trans => {
  const date = trans.date;
  const contentEn = trans.contentEn.replace(/`/g, '\\`').replace(/\$/g, '\\$');

  // 查找对应的日记条目
  const dateRegex = new RegExp(`date:\\s*['"\`]${date}['"\`]`);
  if (dateRegex.test(diariesContent)) {
    // 检查是否已有 contentEn
    const entryRegex = new RegExp(`(date:\\s*['"\`]${date}['"\`][\\s\\S]*?)(\\n\\s*},|\\n\\s*}\\s*$)`, 'm');
    const match = diariesContent.match(entryRegex);

    if (match) {
      const entry = match[1];
      const ending = match[2];

      // 如果已有 contentEn，替换它
      if (entry.includes('contentEn:')) {
        const updatedEntry = entry.replace(/contentEn:\s*`[^`]*`/, `contentEn: \`${contentEn}\``);
        diariesContent = diariesContent.replace(entry + ending, updatedEntry + ending);
      } else {
        // 否则添加 contentEn，确保前面有逗号
        let updatedEntry = entry;
        // 如果entry的最后一行没有逗号，添加逗号
        const lastLine = entry.trim().split('\n').pop();
        if (!lastLine.endsWith(',')) {
          updatedEntry = entry.replace(/(\n\s*[^,\s]+)(\s*)$/, '$1,$2');
        }
        updatedEntry = updatedEntry + `\n    contentEn: \`${contentEn}\``;
        diariesContent = diariesContent.replace(entry + ending, updatedEntry + ending);
      }

      updatedDiaryCount++;
      console.log(`✓ 更新日记: ${date}`);
    }
  } else {
    console.log(`✗ 未找到日记: ${date}`);
  }
});

// 写入 diaries.ts
fs.writeFileSync(diariesPath, diariesContent, 'utf-8');
console.log(`\n✓ 已更新 ${updatedDiaryCount} 个日记到 diaries.ts`);

// 读取 articles.ts
const articlesPath = 'src/data/articles.ts';
let articlesContent = fs.readFileSync(articlesPath, 'utf-8');

// 更新文章翻译
let updatedArticleCount = 0;
articleTranslations.forEach(trans => {
  const slug = trans.slug;
  const contentEn = trans.contentEn.replace(/`/g, '\\`').replace(/\$/g, '\\$');

  // 查找对应的文章条目
  const slugRegex = new RegExp(`slug:\\s*['"\`]${slug}['"\`]`);
  if (slugRegex.test(articlesContent)) {
    // 检查是否已有 contentEn
    const entryRegex = new RegExp(`(slug:\\s*['"\`]${slug}['"\`][\\s\\S]*?)(\\n\\s*},|\\n\\s*}\\s*$)`, 'm');
    const match = articlesContent.match(entryRegex);

    if (match) {
      const entry = match[1];
      const ending = match[2];

      // 如果已有 contentEn，替换它
      if (entry.includes('contentEn:')) {
        const updatedEntry = entry.replace(/contentEn:\s*`[^`]*`/, `contentEn: \`${contentEn}\``);
        articlesContent = articlesContent.replace(entry + ending, updatedEntry + ending);
      } else {
        // 否则添加 contentEn，确保前面有逗号
        let updatedEntry = entry;
        // 如果entry的最后一行没有逗号，添加逗号
        const lastLine = entry.trim().split('\n').pop();
        if (!lastLine.endsWith(',')) {
          updatedEntry = entry.replace(/(\n\s*[^,\s]+)(\s*)$/, '$1,$2');
        }
        updatedEntry = updatedEntry + `\n    contentEn: \`${contentEn}\``;
        articlesContent = articlesContent.replace(entry + ending, updatedEntry + ending);
      }

      updatedArticleCount++;
      console.log(`✓ 更新文章: ${slug}`);
    }
  } else {
    console.log(`✗ 未找到文章: ${slug}`);
  }
});

// 写入 articles.ts
fs.writeFileSync(articlesPath, articlesContent, 'utf-8');
console.log(`\n✓ 已更新 ${updatedArticleCount} 个文章到 articles.ts`);

console.log('\n✅ 数据文件更新完成！');
console.log('\n下一步:');
console.log('1. 检查 src/data/diaries.ts 和 src/data/articles.ts');
console.log('2. 运行 npm run dev 测试英文版本');
console.log('3. 继续翻译剩余内容（还有 ' + (155 - updatedDiaryCount) + ' 个日记和 ' + (52 - updatedArticleCount) + ' 个文章）');
