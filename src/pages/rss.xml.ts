import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { diaries } from '../data/diaries';
import { articles } from '../data/articles';

// 合并日记和文章，按日期排序
interface FeedItem {
  title: string;
  pubDate: Date;
  description: string;
  link: string;
}

export const GET: APIRoute = async (context) => {
  const items: FeedItem[] = [];

  // 添加日记
  diaries.forEach((diary) => {
    items.push({
      title: `工作日记 | ${diary.date}`,
      pubDate: new Date(diary.date),
      description: diary.summary || '今日工作记录与思考',
      link: `/diary/${diary.date}/`,
    });
  });

  // 添加文章
  articles.forEach((article) => {
    items.push({
      title: article.title,
      pubDate: new Date(article.date),
      description: article.summary || article.title,
      link: `/banbaiguan/${article.slug}/`,
    });
  });

  // 按日期倒序排序
  items.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  // 只取最新 50 条
  const latestItems = items.slice(0, 50);

  return rss({
    title: '观吾 | 50岁用AI做实事',
    description: 'AI工具落地实践 · 半百观AI · 吴总的工作日记与思考',
    site: context.site?.toString() || 'https://www.ban-bai.com',
    items: latestItems.map((item) => ({
      title: item.title,
      pubDate: item.pubDate,
      description: item.description,
      link: item.link,
    })),
    customData: `<language>zh-cn</language><copyright>Copyright 2026 观吾</copyright>`,
  });
};
