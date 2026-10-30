// 构建时生成的站内上下文快照，供 functions/api/chat.ts 注入给「山山」
// GET /api/site-context.json
// 说明：这是纯静态产物（Astro 构建时生成），不消耗任何运行时资源。

import type { APIRoute } from 'astro';
import { articles } from '../../data/articles';
import { diaries } from '../../data/diaries';
import { dailyNewsSummaries } from '../../data/ai-news-summary';

const take = 8;

export const GET: APIRoute = async () => {
  const topArticles = articles.slice(0, take).map((a) => ({
    title: a.title,
    date: a.date,
    url: `https://www.ban-bai.com/banbaiguan/${a.slug}/`,
    summary: (a.excerpt || '').replace(/\s+/g, ' ').slice(0, 60),
  }));

  const topDiaries = diaries.slice(0, 5).map((d: any) => ({
    date: d.date,
    title: d.title,
    url: `https://www.ban-bai.com/diary/${d.date}/`,
    summary: (d.summary || '').replace(/\s+/g, ' ').slice(0, 50),
  }));

  const topNews = dailyNewsSummaries.slice(0, 5).map((n) => ({
    date: n.date,
    title: (n.title || '').replace(/^AI新闻\s*\|\s*/, ''),
    url: 'https://www.ban-bai.com/ai-news/',
  }));

  const body = {
    generatedAt: new Date().toISOString().slice(0, 10),
    articles: topArticles,
    diaries: topDiaries,
    news: topNews,
  };

  return new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
