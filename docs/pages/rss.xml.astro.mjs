import rss from '@astrojs/rss';
import { d as diaries } from '../chunks/diaries_Bsl5PvER.mjs';
import { a as articles } from '../chunks/articles_BAdDt4E5.mjs';
export { renderers } from '../renderers.mjs';

const GET = async (context) => {
  const items = [];
  diaries.forEach((diary) => {
    items.push({
      title: `工作日记 | ${diary.date}`,
      pubDate: new Date(diary.date),
      description: diary.summary || "今日工作记录与思考",
      link: `/diary/${diary.date}/`
    });
  });
  articles.forEach((article) => {
    items.push({
      title: article.title,
      pubDate: new Date(article.date),
      description: article.summary || article.title,
      link: `/banbaiguan/${article.slug}/`
    });
  });
  items.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
  const latestItems = items.slice(0, 50);
  return rss({
    title: "观吾 | 50岁用AI做实事",
    description: "AI工具落地实践 · 半百观AI · 吴总的工作日记与思考",
    site: context.site?.toString() || "https://www.ban-bai.com",
    items: latestItems.map((item) => ({
      title: item.title,
      pubDate: item.pubDate,
      description: item.description,
      link: item.link
    })),
    customData: `<language>zh-cn</language><copyright>Copyright 2026 观吾</copyright>`
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
