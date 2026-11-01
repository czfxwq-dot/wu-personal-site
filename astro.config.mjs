import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ban-bai.com',
  outDir: 'docs',
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
