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
  // 提取 articles.ts 中每个 ArticleEntry 的 slug
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

async function scanEnPages(subdir) {
  const enDir = join(PAGES_DIR, 'en', subdir);
  try {
    const files = await readdir(enDir);
    return files.filter(f => f.endsWith('.astro') && f !== 'index.astro').map(f => f.replace('.astro', '')).sort();
  } catch {
    return [];
  }
}

function generateDiaryEnSkeleton(date) {
  const d = new Date(date);
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekday = weekdays[d.getDay()];
  const formatted = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  return `---
import BaseLayout from '../../../layouts/Base.astro';

const diaryJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Guanwu Diary | ${formatted}",
  "datePublished": "${formatted}",
  "dateModified": "${formatted}",
  "author": {
    "@type": "Person",
    "name": "Mr. Wu",
    "alternateName": "Guanwu"
  }
};
---

<BaseLayout title="Guanwu Diary | ${formatted}" jsonLd={diaryJsonLd} navActive="diary" lang="en">
  <article class="diary-entry">
    <header class="diary-header">
      <time datetime="${formatted}">${formatted}</time>
      <span class="diary-day">${weekday}</span>
    </header>

    <div class="diary-content">
      <!-- TODO: Translate content from Chinese version -->
      <p>Content to be translated from <a href="/diary/${date}/">Chinese version</a>.</p>
    </div>

    <footer class="diary-footer">
      <div class="diary-nav">
        <a href="/en/diary/" class="back">← Back to Diary</a>
      </div>
    </footer>
  </article>
</BaseLayout>

<style>
  .diary-entry {
    max-width: 720px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  .diary-header {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 32px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--color-border);
  }
  .diary-header time {
    font-family: var(--font-serif);
    font-size: 20px;
    font-weight: 500;
  }
  .diary-day {
    font-size: 13px;
    color: var(--color-text-light);
  }
  .diary-content p {
    font-size: 15px;
    line-height: 1.8;
    margin-bottom: 16px;
  }
  .diary-content a {
    color: var(--color-accent);
  }
  .diary-footer {
    margin-top: 48px;
    padding-top: 24px;
    border-top: 1px solid var(--color-border);
  }
  .diary-nav a {
    font-size: 14px;
    color: var(--color-accent);
    text-decoration: none;
  }
  .diary-nav a:hover {
    text-decoration: underline;
  }
</style>
`;
}

function generateArticleEnSkeleton(slug, title, date, tag, excerpt) {
  return `---
import BaseLayout from '../../../layouts/Base.astro';
import Citations from '../../../components/Citations.astro';

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${title || slug}",
  "datePublished": "${date}",
  "dateModified": "${date}",
  "author": {
    "@type": "Person",
    "name": "Mr. Wu",
    "alternateName": "Guanwu"
  },
  "publisher": {
    "@type": "Organization",
    "name": "BanbaiGuan AI"
  },
  "description": "${excerpt || ''}"
};
---

<BaseLayout title="${title || slug}" jsonLd={articleJsonLd} navActive="banbaiguan" lang="en">
  <article class="article-page">
    <header class="article-header">
      <div class="article-meta">
        <time datetime="${date}">${date}</time>
        <span class="article-tag">${tag || 'AI Industry'}</span>
      </div>
      <h1>${title || slug}</h1>
      <p class="article-subtitle">English translation in progress</p>
    </header>

    <div class="article-content">
      <!-- TODO: Translate content from Chinese version -->
      <p>Content to be translated from <a href="/banbaiguan/${slug}/">Chinese version</a>.</p>

      <div class="article-footer">
        <p>Follow "BanbaiGuan AI" — a 50-year-old AI practitioner sharing real-world AI adoption stories.</p>
        <a href="/en/banbaiguan/" class="back-link">← Back to Articles</a>
      </div>
    </div>
  </article>
</BaseLayout>

<style>
  .article-page {
    max-width: 720px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  .article-header {
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--color-border);
  }
  .article-meta {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 12px;
  }
  .article-meta time {
    font-size: 14px;
    color: var(--color-text-light);
  }
  .article-tag {
    font-size: 12px;
    padding: 2px 8px;
    background: var(--color-accent);
    color: #fff;
    border-radius: 4px;
  }
  .article-header h1 {
    font-family: var(--font-serif);
    font-size: 28px;
    margin: 0 0 8px;
    line-height: 1.4;
  }
  .article-subtitle {
    font-size: 16px;
    color: var(--color-text-light);
    margin: 0;
  }
  .article-content {
    font-size: 15px;
    line-height: 1.8;
  }
  .article-content p {
    margin-bottom: 16px;
  }
  .article-content a {
    color: var(--color-accent);
  }
  .article-footer {
    margin-top: 48px;
    padding-top: 24px;
    border-top: 1px solid var(--color-border);
  }
  .article-footer p {
    font-size: 14px;
    color: var(--color-text-light);
    font-style: italic;
  }
  .back-link {
    display: inline-block;
    font-size: 14px;
    color: var(--color-accent);
    text-decoration: none;
    margin-top: 16px;
  }
  .back-link:hover {
    text-decoration: underline;
  }
</style>
`;
}

async function fixEnPages() {
  console.log('\n🌐 Checking English page skeletons...');

  // Check diary pages
  const zhDiaries = await scanDiaryPages();
  const enDiaries = await scanEnPages('diary');
  const missingDiaryEn = zhDiaries.filter(d => !enDiaries.includes(d));

  for (const date of missingDiaryEn) {
    console.log(`  📄 Creating English skeleton for diary: ${date}`);
    const skeleton = generateDiaryEnSkeleton(date);
    const enPath = join(PAGES_DIR, 'en', 'diary', `${date}.astro`);
    await writeFile(enPath, skeleton, 'utf-8');
    console.log(`  ✅ Created ${enPath}`);
  }

  // Check article pages
  const zhArticles = await scanArticlePages();
  const enArticles = await scanEnPages('banbaiguan');
  const missingArticleEn = zhArticles.filter(s => !enArticles.includes(s));

  for (const slug of missingArticleEn) {
    console.log(`  📄 Creating English skeleton for article: ${slug}`);
    // Try to get metadata from articles.ts
    const articlesContent = await readFile(join(DATA_DIR, 'articles.ts'), 'utf-8');
    const titleMatch = articlesContent.match(new RegExp(`slug:\\s*['"]${slug}['"][\\\\s\\\\S]*?title:\\s*['"]([^'"]+)['"]`));
    const dateMatch = articlesContent.match(new RegExp(`slug:\\s*['"]${slug}['"][\\\\s\\\\S]*?date:\\s*['"]([^'"]+)['"]`));
    const tagMatch = articlesContent.match(new RegExp(`slug:\\s*['"]${slug}['"][\\\\s\\\\S]*?tag:\\s*['"]([^'"]+)['"]`));
    const excerptMatch = articlesContent.match(new RegExp(`slug:\\s*['"]${slug}['"][\\\\s\\\\S]*?excerpt:\\s*['"]([^'"]+)['"]`));

    // Also try zh page frontmatter as fallback
    const zhPagePath = join(PAGES_DIR, 'banbaiguan', `${slug}.astro`);
    const zhPageContent = await readFile(zhPagePath, 'utf-8');
    const zhTitle = titleMatch ? titleMatch[1] : (zhPageContent.match(/title:\\s*['"]([^'"]+)['"]/)?.[1] || slug);
    const zhDate = dateMatch ? dateMatch[1] : (zhPageContent.match(/date:\\s*['"]([^'"]+)['"]/)?.[1] || zhPageContent.match(/pubDate:\\s*['"]([^'"]+)['"]/)?.[1] || new Date().toISOString().split('T')[0]);
    const zhTag = tagMatch ? tagMatch[1] : (zhPageContent.match(/tag:\\s*['"]([^'"]+)['"]/)?.[1] || 'AI Industry');
    const zhExcerpt = excerptMatch ? excerptMatch[1] : (zhPageContent.match(/excerpt:\\s*['"]([^'"]+)['"]/)?.[1] || '');

    const skeleton = generateArticleEnSkeleton(slug, zhTitle, zhDate, zhTag, zhExcerpt);
    const enPath = join(PAGES_DIR, 'en', 'banbaiguan', `${slug}.astro`);
    await writeFile(enPath, skeleton, 'utf-8');
    console.log(`  ✅ Created ${enPath}`);
  }

  if (missingDiaryEn.length === 0 && missingArticleEn.length === 0) {
    console.log('  ✅ All English page skeletons exist');
  }
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
    
    // 尝试从页面文件提取标题和日期
    const pagePath = join(PAGES_DIR, 'banbaiguan', `${slug}.astro`);
    const pageContent = await readFile(pagePath, 'utf-8');
    
    // 提取 frontmatter 中的标题和日期
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
    
    // 插入到 articles.ts 的数组开头
    const articlesPath = join(DATA_DIR, 'articles.ts');
    let content = await readFile(articlesPath, 'utf-8');
    
    // 找到 articles: ArticleEntry[] = [ 后面的位置
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
    
    // 从页面文件提取标题和摘要（支持 const 和 frontmatter 两种格式）
    const pagePath = join(PAGES_DIR, 'diary', `${date}.astro`);
    const pageContent = await readFile(pagePath, 'utf-8');
    
    const titleMatch = pageContent.match(/const\s+title\s*=\s*['"]([^'"]+)['"]/)
                    || pageContent.match(/title:\s*['"]([^'"]+)['"]/);
    const summaryMatch = pageContent.match(/const\s+summary\s*=\s*['"]([^'"]+)['"]/)
                      || pageContent.match(/summary:\s*['"]([^'"]+)['"]/);
    
    const title = titleMatch ? titleMatch[1] : date;
    const summary = summaryMatch ? summaryMatch[1] : '';
    
    // 计算 Day 编号
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
      console.log('\n✅ 修复完成！');
      break;
      
    case 'deploy':
      console.log('🚀 部署前检查 + 自动修复...');
      const beforeFix = await runCheck();
      if (beforeFix > 0) {
        console.log('\n⚠️ 发现未注册项，开始自动修复...');
        await fixDiaries();
        await fixArticles();
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
