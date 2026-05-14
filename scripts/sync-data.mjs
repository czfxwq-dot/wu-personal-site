#!/usr/bin/env node
/**
 * sync-data.mjs
 *
 * 数据文件自动同步工具
 *
 * 用法：
 *   1. 检查当前状态：node scripts/sync-data.mjs check
 *   2. 自动修复：    node scripts/sync-data.mjs fix
 *   3. 部署前全套：  node scripts/sync-data.mjs deploy
 *
 * 功能：
 * - 自动扫描 banbaiguan/ 目录下的 .astro 页面，检查是否在 articles.ts 注册
 * - 自动扫描 diary/ 目录下的 .astro 页面，检查是否在 diaries.ts 注册
 * - 检查 ai-news-summary.ts 与 ai-news.ts（旧文件）的数据一致性
 * - 自动创建英文页面骨架（使用 *En 字段）
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC = join(ROOT, 'src');
const DATA_DIR = join(SRC, 'data');
const PAGES_DIR = join(SRC, 'pages');

// ========== 解析工具 ==========

function extractField(fileContent, fieldName) {
  const regex = new RegExp(`${fieldName}:\\s*['"]([^'"]+)['"]`, 'g');
  const results = [];
  let match;
  while ((match = regex.exec(fileContent)) !== null) {
    results.push(match[1]);
  }
  return results;
}

function extractArticleBlocks(content) {
  const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
  const slugs = [];
  let match;
  while ((match = slugRegex.exec(content)) !== null) {
    slugs.push(match[1]);
  }
  return slugs;
}

function extractDiaryDates(content) {
  const dateRegex = /date:\s*['"]([^'"]+)['"]/g;
  const dates = [];
  let match;
  while ((match = dateRegex.exec(content)) !== null) {
    dates.push(match[1]);
  }
  return dates;
}

// ========== 检查函数 ==========

async function scanDiaryPages() {
  const diaryDir = join(PAGES_DIR, 'diary');
  const files = await readdir(diaryDir);
  return files
    .filter(f => f.endsWith('.astro') && f !== 'index.astro')
    .map(f => f.replace('.astro', ''))
    .sort();
}

async function scanArticlePages() {
  const banbaiDir = join(PAGES_DIR, 'banbaiguan');
  const files = await readdir(banbaiDir);
  return files
    .filter(f => f.endsWith('.astro') && f !== 'index.astro')
    .map(f => f.replace('.astro', ''))
    .sort();
}

// ========== 英文页面同步 ==========
// 注意：英文详情页已改为动态路由 ([date].astro / [slug].astro)，
// 从 diaries.ts 和 articles.ts 的 *En 字段读取数据，无需逐个生成静态页面。

async function fixEnPages() {
  console.log('\n🌐 English detail pages use dynamic routes ([date].astro / [slug].astro).');
  console.log('   Ensure diaries.ts and articles.ts have *En fields for English translations.');
}

async function getRegisteredArticles() {
  const content = await readFile(join(DATA_DIR, 'articles.ts'), 'utf-8');
  return extractArticleBlocks(content);
}

async function getRegisteredDiaries() {
  const content = await readFile(join(DATA_DIR, 'diaries.ts'), 'utf-8');
  return extractDiaryDates(content);
}

// ========== 自动修复 ==========

async function fixArticles() {
  console.log('\n🔧 修复 articles.ts...');

  const pageFiles = await scanArticlePages();
  const registered = await getRegisteredArticles();

  const missing = pageFiles.filter(slug => !registered.includes(slug));

  if (missing.length === 0) {
    console.log('  ✅ 所有文章都已注册');
    return;
  }

  for (const slug of missing) {
    console.log(`  📄 发现未注册文章: ${slug}`);

    const pagePath = join(PAGES_DIR, 'banbaiguan', `${slug}.astro`);
    const pageContent = await readFile(pagePath, 'utf-8');

    const titleMatch = pageContent.match(/title:\s*['"]([^'"]+)['"]/);
    const dateMatch = pageContent.match(/pubDate:\s*['"]([^'"]+)['"]/) ||
                      pageContent.match(/date:\s*['"]([^'"]+)['"]/);
    const tagMatch = pageContent.match(/tag:\s*['"]([^'"]+)['"]/);
    const excerptMatch = pageContent.match(/excerpt:\s*['"]([^'"]+)['"]/);

    const title = titleMatch ? titleMatch[1] : slug;
    const date = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];
    const tag = tagMatch ? tagMatch[1] : 'AI产业';
    const excerpt = excerptMatch ? excerptMatch[1] : '';

    const entry = `  {
    slug: '${slug}',
    date: '${date}',
    title: '${title}',
    excerpt: '${excerpt}',
    tag: '${tag}'
  }`;

    const articlesPath = join(DATA_DIR, 'articles.ts');
    let content = await readFile(articlesPath, 'utf-8');

    const insertPoint = content.match(/export const articles:\s*ArticleEntry\[\]\s*=\s*\[/);
    if (insertPoint) {
      content = content.slice(0, insertPoint.index + insertPoint[0].length) +
                '\n' + entry + ',' +
                content.slice(insertPoint.index + insertPoint[0].length);
      await writeFile(articlesPath, content);
      console.log(`  ✅ 已添加 ${slug} 到 articles.ts`);
    } else {
      console.log(`  ❌ 无法解析 articles.ts 格式，请手动添加`);
    }
  }
}

async function fixDiaries() {
  console.log('\n🔧 修复 diaries.ts...');

  const pageFiles = await scanDiaryPages();
  const registered = await getRegisteredDiaries();

  const missing = pageFiles.filter(date => !registered.includes(date));

  if (missing.length === 0) {
    console.log('  ✅ 所有日记都已注册');
    return;
  }

  for (const date of missing) {
    console.log(`  📄 发现未注册日记: ${date}`);

    const pagePath = join(PAGES_DIR, 'diary', `${date}.astro`);
    const pageContent = await readFile(pagePath, 'utf-8');

    const titleMatch = pageContent.match(/const\s+title\s*=\s*['"]([^'"]+)['"]/)
                    || pageContent.match(/title:\s*['"]([^'"]+)['"]/);
    const summaryMatch = pageContent.match(/const\s+summary\s*=\s*['"]([^'"]+)['"]/)
                      || pageContent.match(/summary:\s*['"]([^'"]+)['"]/);

    const title = titleMatch ? titleMatch[1] : date;
    const summary = summaryMatch ? summaryMatch[1] : '';

    const dayNum = pageFiles.length - pageFiles.indexOf(date) + 1;

    const entry = `  {
    date: '${date}',
    title: '${title}',
    summary: '${summary}'
  }`;

    const diariesPath = join(DATA_DIR, 'diaries.ts');
    let content = await readFile(diariesPath, 'utf-8');

    const insertPoint = content.match(/export const diaries:\s*DiaryEntry\[\]\s*=\s*\[/);
    if (insertPoint) {
      content = content.slice(0, insertPoint.index + insertPoint[0].length) +
                '\n' + entry + ',' +
                content.slice(insertPoint.index + insertPoint[0].length);
      await writeFile(diariesPath, content);
      console.log(`  ✅ 已添加 ${date} 到 diaries.ts`);
    } else {
      console.log(`  ❌ 无法解析 diaries.ts 格式，请手动添加`);
    }
  }
}

// ========== 主流程 ==========

async function runCheck() {
  console.log('🔍 检查数据文件同步状态...');

  const diaryPages = await scanDiaryPages();
  const registeredDiaries = await getRegisteredDiaries();
  const missingDiaries = diaryPages.filter(d => !registeredDiaries.includes(d));

  const articlePages = await scanArticlePages();
  const registeredArticles = await getRegisteredArticles();
  const missingArticles = articlePages.filter(s => !registeredArticles.includes(s));

  console.log(`\n📖 日记：${diaryPages.length} 个页面，${registeredDiaries.length} 条记录`);
  if (missingDiaries.length > 0) {
    console.log(`  ⚠️ 未注册：${missingDiaries.join(', ')}`);
  } else {
    console.log('  ✅ 全部已注册');
  }

  console.log(`\n📝 文章：${articlePages.length} 个页面，${registeredArticles.length} 条记录`);
  if (missingArticles.length > 0) {
    console.log(`  ⚠️ 未注册：${missingArticles.join(', ')}`);
  } else {
    console.log('  ✅ 全部已注册');
  }

  return missingDiaries.length + missingArticles.length;
}

async function main() {
  const cmd = process.argv[2] || 'check';

  switch (cmd) {
    case 'check':
      const issues = await runCheck();
      process.exit(issues > 0 ? 1 : 0);
      break;

    case 'fix':
      console.log('🔧 开始自动修复...');
      await runCheck();
      await fixDiaries();
      await fixArticles();
      await fixEnPages();
      console.log('\n✅ 修复完成！');
      break;

    case 'deploy':
      console.log('🚀 部署前检查 + 自动修复...');
      const beforeFix = await runCheck();
      if (beforeFix > 0) {
        console.log('\n⚠️ 发现未注册项，开始自动修复...');
        await fixDiaries();
        await fixArticles();
        await fixEnPages();
        console.log('\n✅ 修复完成，重新检查...');
        const afterFix = await runCheck();
        if (afterFix === 0) {
          console.log('\n✅ 全部通过，可以部署！');
        } else {
          console.log('\n❌ 仍有未修复的问题，请手动检查');
          process.exit(1);
        }
      } else {
        console.log('\n✅ 全部通过，可以部署！');
      }
      break;

    default:
      console.log('用法：node scripts/sync-data.mjs [check|fix|deploy]');
      console.log('  check   - 检查数据文件同步状态');
      console.log('  fix     - 自动修复未注册的条目');
      console.log('  deploy  - 部署前检查 + 自动修复');
      process.exit(1);
  }
}

main().catch(err => {
  console.error('脚本执行失败:', err);
  process.exit(1);
});
