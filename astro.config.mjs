import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ban-bai.com',
  outDir: 'docs',
  integrations: [
    // 之前全站没有 sitemap，500+ 页面（含中英日记）没被系统告知搜索引擎，
    // 这是「让更多人看到」最基础的一环，2026-11-01 补上。
    // 注意版本：本项目是 Astro 4，必须用 @astrojs/sitemap@2.x；
    // 3.x 依赖 astro:routes:resolved（Astro 5 才有），装上会在 build:done 阶段
    // 报 "Cannot read properties of undefined (reading 'reduce')"。
    sitemap({
      // 后台页面、演示页不进索引
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
