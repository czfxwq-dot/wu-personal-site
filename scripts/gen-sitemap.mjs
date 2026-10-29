#!/usr/bin/env node
/**
 * 构建后生成 sitemap.xml
 *
 * 以前 public/sitemap.xml 是手工维护的静态文件，改到后来和实际内容脱节：
 * 英文站的 /en/banbaiguan/[slug]/ 和 /en/diary/[date]/ 被当成字面量写死，
 * 英文静态页一条没有，/404/ 和 /guestbook/admin/ 反而被收了进去，
 * 最新几篇日记也不在里面。
 *
 * 现在改成扫构建产物 docs/ 下的 index.html，页面有哪些就写哪些，
 * 中英文都在里面，不用再手改。
 *
 * 用法：node scripts/gen-sitemap.mjs [distDir]
 */

import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://ban-bai.com';
const DIST = process.argv[2] || 'docs';

// 不该进 sitemap 的路径
const EXCLUDE = [
  /^\/404\/?$/,                  // 错误页
  /^\/en\/404\/?$/,              // 英文错误页（仅供 404 中间件回源，不是可索引页面）
  /(^|\/)admin\//,               // 各类后台/管理视图（/admin/survey/、/guestbook/admin/）
];

function collect(dir, base = '') {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // _astro / pagefind 是资源目录，不会命中 index.html，但直接跳过更省事
      if (entry.name === '_astro' || entry.name === 'pagefind') continue;
      out.push(...collect(abs, base + '/' + entry.name));
    } else if (entry.name === 'index.html') {
      out.push(base + '/');
    }
  }
  return out;
}

function rank(route) {
  if (route === '/') return { priority: '1.0', changefreq: 'daily' };
  if (/^\/(en\/)?ai-news\/$/.test(route)) return { priority: '0.9', changefreq: 'daily' };
  if (/^\/(en\/)?(diary|banbaiguan)\/$/.test(route)) return { priority: '0.8', changefreq: 'weekly' };
  if (/^\/(en\/)?guestbook\/$/.test(route)) return { priority: '0.6', changefreq: 'weekly' };
  if (/^\/(en\/)?(about|survey|lobster|search)\/$/.test(route)) return { priority: '0.5', changefreq: 'monthly' };
  if (/^\/diary\/\d{4}-\d{2}-\d{2}\/$/.test(route)) return { priority: '0.5', changefreq: 'monthly' };
  if (/^\/en\/diary\/\d{4}-\d{2}-\d{2}\/$/.test(route)) return { priority: '0.4', changefreq: 'monthly' };
  if (/^\/banbaiguan\/[^/]+\/$/.test(route)) return { priority: '0.6', changefreq: 'monthly' };
  if (/^\/en\/banbaiguan\/[^/]+\/$/.test(route)) return { priority: '0.5', changefreq: 'monthly' };
  return { priority: '0.5', changefreq: 'monthly' };
}

if (!fs.existsSync(DIST)) {
  console.error(`gen-sitemap: 找不到构建产物目录 ${DIST}`);
  process.exit(1);
}

const routes = collect(DIST)
  .filter((r) => !EXCLUDE.some((re) => re.test(r)))
  .sort();

const urls = routes
  .map((route) => {
    const { priority, changefreq } = rank(route);
    return [
      '  <url>',
      `    <loc>${SITE}${route}</loc>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      '  </url>',
    ].join('\n');
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml, 'utf8');
console.log(`gen-sitemap: ${routes.length} 条 URL → ${DIST}/sitemap.xml`);
