#!/usr/bin/env node
/**
 * pre-deploy-guard.mjs
 * 
 * 部署前自动检查脚本 — 防止"内容写了但没注册到数据文件"的问题再次发生
 * 
 * 检查项：
 * 1. diary 页面文件 vs diaries.ts 数据条目
 * 2. banbaiguan 页面文件 vs articles.ts 数据条目
 * 3. ai-news-summary.ts 最新日期 vs 当天日期
 * 4. ai-news.ts（旧文件）有内容但 ai-news-summary.ts 没有 → 报警
 * 
 * 用法：node scripts/pre-deploy-guard.mjs
 * 
 * 退出码：0=全部通过，1=有问题需要修复
 */

import { readdir, readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC = join(ROOT, 'src');
const DATA_DIR = join(SRC, 'data');
const PAGES_DIR = join(SRC, 'pages');

let errors = [];
let warnings = [];

function log(level, file, msg) {
  const icon = level === 'error' ? '❌' : level === 'warn' ? '⚠️' : '✅';
  console.log(`  ${icon} ${file}: ${msg}`);
}

// ========== 1. 检查日记页面 vs diaries.ts ==========
async function checkDiaries() {
  console.log('\n📖 检查日记...');
  
  // 获取 diary 目录下所有 .astro 页面文件（排除 index.astro）
  const diaryDir = join(PAGES_DIR, 'diary');
  let diaryFiles = [];
  try {
    const files = await readdir(diaryDir);
    diaryFiles = files
      .filter(f => f.endsWith('.astro') && f !== 'index.astro')
      .map(f => f.replace('.astro', ''))
      .sort()
      .reverse(); // 最新的在前
  } catch {
    errors.push('diary 目录不存在');
    return;
  }

  if (diaryFiles.length === 0) {
    errors.push('diary 目录没有 .astro 页面文件');
    return;
  }

  // 解析 diaries.ts
  const diariesPath = join(DATA_DIR, 'diaries.ts');
  let diariesData;
  try {
    diariesData = await readFile(diariesPath, 'utf-8');
  } catch {
    errors.push('diaries.ts 文件不存在');
    return;
  }

  // 提取所有 date 字段
  const dateRegex = /date:\s*['"]([^'"]+)['"]/g;
  const registeredDates = new Set();
  let match;
  while ((match = dateRegex.exec(diariesData)) !== null) {
    registeredDates.add(match[1]);
  }

  // 检查每个日记页面是否在数据文件中注册
  for (const date of diaryFiles) {
    if (registeredDates.has(date)) {
      log('ok', `diary/${date}.astro`, '已注册 ✓');
    } else {
      log('error', `diary/${date}.astro`, `页面存在但未在 diaries.ts 中注册！`);
      errors.push(`diary/${date}.astro 未在 diaries.ts 注册`);
    }
  }

  // 检查是否有孤立的条目（数据文件有但页面没有）
  for (const date of registeredDates) {
    const pageExists = diaryFiles.includes(date);
    if (!pageExists) {
      log('warn', `diaries.ts`, `有 ${date} 条目但对应页面不存在`);
      warnings.push(`diaries.ts 中的 ${date} 没有对应页面`);
    }
  }

  console.log(`  📊 共 ${diaryFiles.length} 篇日记页面，${registeredDates.size} 条数据记录`);
}

// ========== 2. 检查半百观文章 vs articles.ts ==========
async function checkArticles() {
  console.log('\n📝 检查半百观文章...');

  const banbaiDir = join(PAGES_DIR, 'banbaiguan');
  let articleFiles = [];
  try {
    const files = await readdir(banbaiDir);
    articleFiles = files
      .filter(f => f.endsWith('.astro') && f !== 'index.astro')
      .map(f => f.replace('.astro', ''))
      .sort()
      .reverse();
  } catch {
    errors.push('banbaiguan 目录不存在');
    return;
  }

  if (articleFiles.length === 0) {
    warnings.push('banbaiguan 目录没有 .astro 页面文件（可能是正常状态）');
    return;
  }

  const articlesPath = join(DATA_DIR, 'articles.ts');
  let articlesData;
  try {
    articlesData = await readFile(articlesPath, 'utf-8');
  } catch {
    errors.push('articles.ts 文件不存在');
    return;
  }

  // 提取所有 slug 字段
  const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
  const registeredSlugs = new Set();
  let match;
  while ((match = slugRegex.exec(articlesData)) !== null) {
    registeredSlugs.add(match[1]);
  }

  for (const slug of articleFiles) {
    if (registeredSlugs.has(slug)) {
      log('ok', `banbaiguan/${slug}.astro`, '已注册 ✓');
    } else {
      log('error', `banbaiguan/${slug}.astro`, `页面存在但未在 articles.ts 中注册！`);
      errors.push(`banbaiguan/${slug}.astro 未在 articles.ts 注册`);
    }
  }

  console.log(`  📊 共 ${articleFiles.length} 篇文章页面，${registeredSlugs.size} 条数据记录`);
}

// ========== 3. 检查 AI 新闻数据文件 ==========
async function checkAINews() {
  console.log('\n📰 检查 AI 新闻...');

  const summaryPath = join(DATA_DIR, 'ai-news-summary.ts');
  const oldPath = join(DATA_DIR, 'ai-news.ts');

  // 检查主数据文件
  let summaryData;
  try {
    summaryData = await readFile(summaryPath, 'utf-8');
  } catch {
    errors.push('ai-news-summary.ts 文件不存在');
    return;
  }

  // 提取最新日期
  const dateRegex = /date:\s*['"]([^'"]+)['"]/g;
  const dates = [];
  let match;
  while ((match = dateRegex.exec(summaryData)) !== null) {
    dates.push(match[1]);
  }

  if (dates.length === 0) {
    errors.push('ai-news-summary.ts 没有任何日期条目');
    return;
  }

  const latestDate = dates[0];
  const today = new Date().toISOString().split('T')[0];
  
  // 不强制要求当天有新闻，但如果是最近的日期就通过
  const latestDateObj = new Date(latestDate);
  const daysAgo = Math.floor((Date.now() - latestDateObj.getTime()) / (1000 * 60 * 60 * 24));

  if (daysAgo <= 3) {
    log('ok', 'ai-news-summary.ts', `最新日期 ${latestDate}（${daysAgo}天前），正常`);
  } else {
    log('warn', 'ai-news-summary.ts', `最新日期 ${latestDate}（${daysAgo}天前），可能需要更新`);
    warnings.push(`AI 新闻最新日期 ${latestDate}，距今 ${daysAgo} 天`);
  }

  console.log(`  📊 共 ${dates.length} 天新闻，最新：${latestDate}`);

  // 检查旧文件（ai-news.ts）是否被意外更新
  try {
    const oldData = await readFile(oldPath, 'utf-8');
    // 如果旧文件存在且有内容，发出警告（页面读的是 ai-news-summary.ts）
    const oldDates = [];
    let m;
    const oldRegex = /date:\s*['"]([^'"]+)['"]/g;
    while ((m = oldRegex.exec(oldData)) !== null) {
      oldDates.push(m[1]);
    }
    if (oldDates.length > 0) {
      log('warn', 'ai-news.ts', `此文件已废弃！页面读取的是 ai-news-summary.ts。如果更新了新内容，请确保写入了 ai-news-summary.ts`);
      warnings.push('ai-news.ts 已废弃，请勿直接编辑此文件');
    }
  } catch {
    // 文件不存在，OK
  }

  // 检查页面是否确实读取 ai-news-summary.ts
  const aiNewsPage = join(PAGES_DIR, 'ai-news', 'index.astro');
  try {
    const pageData = await readFile(aiNewsPage, 'utf-8');
    if (pageData.includes('ai-news-summary')) {
      log('ok', 'ai-news/index.astro', '读取 ai-news-summary.ts ✓');
    } else if (pageData.includes('ai-news\'') || pageData.includes('ai-news"')) {
      log('error', 'ai-news/index.astro', '读取的是旧文件 ai-news.ts！请改为 ai-news-summary.ts');
      errors.push('AI 新闻页面读取的是错误的旧数据文件');
    } else {
      log('warn', 'ai-news/index.astro', '无法确认读取的数据文件');
    }
  } catch {
    errors.push('ai-news/index.astro 页面不存在');
  }
}

// ========== 4. 首页最新日记入口检查 ==========
async function checkHomePage() {
  console.log('\n🏠 检查首页...');

  const indexPath = join(PAGES_DIR, 'index.astro');
  let indexData;
  try {
    indexData = await readFile(indexPath, 'utf-8');
  } catch {
    errors.push('index.astro 不存在');
    return;
  }

  // 检查首页是否导入了 diaries.ts
  if (indexData.includes("from '../data/diaries'") || indexData.includes('from \'../../data/diaries\'')) {
    log('ok', 'index.astro', '导入了 diaries.ts ✓');
  } else {
    log('warn', 'index.astro', '未导入 diaries.ts，首页可能不显示日记入口');
    warnings.push('首页未导入 diaries.ts');
  }
}

// ========== 主流程 ==========
async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔍 部署前自动检查');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  await checkDiaries();
  await checkArticles();
  await checkAINews();
  await checkHomePage();

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 检查结果');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ 全部通过，可以部署！');
    process.exit(0);
  }

  if (errors.length > 0) {
    console.log(`\n❌ 发现 ${errors.length} 个错误：`);
    errors.forEach((e, i) => console.log(`  ${i + 1}. ${e}`));
    console.log('\n🛑 请修复以上错误后再部署！');
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️ 发现 ${warnings.length} 个警告：`);
    warnings.forEach((w, i) => console.log(`  ${i + 1}. ${w}`));
  }

  // 有错误则阻止部署
  if (errors.length > 0) {
    process.exit(1);
  }
  
  // 只有警告，允许继续
  process.exit(0);
}

main().catch(err => {
  console.error('脚本执行失败:', err);
  process.exit(1);
});
