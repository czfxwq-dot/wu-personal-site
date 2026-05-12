import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ban-bai.com',
  outDir: 'docs',
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false, // 中文无 /zh/ 前缀
    },
  },
});
