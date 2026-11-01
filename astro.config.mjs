import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ban-bai.com',
  outDir: 'docs',
  integrations: [
    // 之前全站没有 sitemap，500+ 页面（含中英日记）没被系统告知搜索引擎，
    // 这是「让更多人看到」最基础的一环，2026-11-01 补上。
    sitemap({
      i18n: {
        defaultLocale: 'zh',
        locales: {
          zh: 'zh-CN',
          en: 'en-US',
        },
      },
      // 后台页面不进索引
      filter: (page) =>
        !page.includes('/admin/') &&
        !page.includes('/guestbook/admin') &&
        !page.includes('/lobster/'),
    }),
  ],
  markdown: {
    // 允许 Markdown 文件中使用原始 HTML
    shikiConfig: {
      theme: 'github-dark',
    },
  },
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false, // 中文无 /zh/ 前缀
    },
  },
});
