import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { diaries } from '../../data/diaries';
import { articles } from '../../data/articles';

// 英文站 RSS。只收录有英文标题的内容，避免英文读者点进去看到一屏中文。
interface FeedItem {
  title: string;
  pubDate: Date;
  description: string;
  link: string;
}

export const GET: APIRoute = async (context) => {
  const items: FeedItem[] = [];

  diaries.forEach((diary) => {
    if (!diary.titleEn) return;
    items.push({
      title: `Work Diary | ${diary.titleEn}`,
      pubDate: new Date(diary.date),
      description: diary.summaryEn || diary.titleEn,
      link: `/en/diary/${diary.date}/`,
    });
  });

  articles.forEach((article) => {
    if (!article.titleEn) return;
    items.push({
      title: article.titleEn,
      pubDate: new Date(article.date),
      description: article.excerptEn || article.titleEn,
      link: `/en/banbaiguan/${article.slug}/`,
    });
  });

  items.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  // 只取最新 50 条
  const latestItems = items.slice(0, 50);

  return rss({
    title: 'Guanwu | A 50-Year-Old Getting Things Done with AI',
    description: 'AI in practice — BanbaiGuan AI. Notes from a 50-year-old entrepreneur.',
    site: context.site?.toString() || 'https://ban-bai.com',
    items: latestItems.map((item) => ({
      title: item.title,
      pubDate: item.pubDate,
      description: item.description,
      link: item.link,
    })),
    customData: `<language>en-us</language><copyright>Copyright 2026 Guanwu</copyright>`,
  });
};
