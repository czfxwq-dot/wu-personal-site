import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../chunks/Base_C38bZXr6.mjs';
import { a as articles } from '../chunks/articles_BAdDt4E5.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const articlesJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "\u534A\u767E\u89C2AI | \u6587\u7AE0",
    "description": "50\u5C81AI\u5B9E\u8DF5\u8005\u7684\u6DF1\u5EA6\u601D\u8003 \u2014 AI\u843D\u5730\u3001\u5546\u4E1A\u6D1E\u5BDF\u3001\u521B\u4E1A\u5FC3\u5F97",
    "url": "https://ban-bai.com/articles/",
    "author": {
      "@type": "Person",
      "name": "\u5434\u603B",
      "alternateName": "\u89C2\u543E"
    }
  };
  const allDates = articles.map((a) => a.date);
  const allTags = [...new Set(articles.map((a) => a.tag))];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": "\u534A\u767E\u89C2 | 50\u5C81AI\u5B9E\u8DF5\u8005\u7684\u6DF1\u5EA6\u601D\u8003", "jsonLd": articlesJsonLd, "ogDescription": "50\u5C81AI\u5B9E\u8DF5\u8005\u7684\u6DF1\u5EA6\u601D\u8003 \u2014 AI\u843D\u5730\u3001\u5546\u4E1A\u6D1E\u5BDF\u3001\u521B\u4E1A\u5FC3\u5F97\uFF0C\u534A\u767E\u89C2AI\u4E13\u680F\u6587\u7AE0\u5408\u96C6", "navActive": "banbaiguan", "data-astro-cid-4w2qvtwg": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="page-section" data-astro-cid-4w2qvtwg> <h1 data-astro-cid-4w2qvtwg>半百观</h1> <p class="subtitle" data-astro-cid-4w2qvtwg>
50岁AI实践者的深度思考 — AI落地、商业洞察、创业心得
</p> <!-- 搜索+筛选栏 --> <div class="search-bar" data-astro-cid-4w2qvtwg> <div class="search-input-wrap" data-astro-cid-4w2qvtwg> <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-4w2qvtwg> <circle cx="11" cy="11" r="8" data-astro-cid-4w2qvtwg></circle><path d="m21 21-4.3-4.3" data-astro-cid-4w2qvtwg></path> </svg> <input type="text" id="article-search" class="search-input" placeholder="搜索标题或摘要..." data-astro-cid-4w2qvtwg> </div> <select id="article-date-filter" class="date-filter" data-astro-cid-4w2qvtwg> <option value="" data-astro-cid-4w2qvtwg>全部日期</option> ${allDates.map((d) => renderTemplate`<option${addAttribute(d, "value")} data-astro-cid-4w2qvtwg>${d}</option>`)} </select> <select id="article-tag-filter" class="date-filter" data-astro-cid-4w2qvtwg> <option value="" data-astro-cid-4w2qvtwg>全部标签</option> ${allTags.map((t) => renderTemplate`<option${addAttribute(t, "value")} data-astro-cid-4w2qvtwg>${t}</option>`)} </select> <span id="article-count" class="result-count" data-astro-cid-4w2qvtwg>共 ${articles.length} 篇</span> </div> <div id="article-list" data-astro-cid-4w2qvtwg> ${articles.map((article) => {
    const readTime = Math.max(2, Math.ceil(article.excerpt.length / 200));
    return renderTemplate`<article class="article-card"${addAttribute(article.date, "data-date")}${addAttribute(article.tag, "data-tag")}${addAttribute(`${article.title} ${article.excerpt}`.toLowerCase(), "data-search")} data-astro-cid-4w2qvtwg> <div class="article-meta" data-astro-cid-4w2qvtwg> <span class="article-date" data-astro-cid-4w2qvtwg>${article.date}</span> <span class="article-tag"${addAttribute(article.tag, "data-tag")} data-astro-cid-4w2qvtwg>${article.tag}</span> <span class="read-time" data-astro-cid-4w2qvtwg>${readTime} min</span> </div> <h2 data-astro-cid-4w2qvtwg> <a${addAttribute(`/banbaiguan/${article.slug}/`, "href")} data-astro-cid-4w2qvtwg>${article.title}</a> </h2> <p class="article-excerpt" data-astro-cid-4w2qvtwg>${article.excerpt}</p> <a${addAttribute(`/banbaiguan/${article.slug}/`, "href")} class="read-more" data-astro-cid-4w2qvtwg>阅读全文 →</a> </article>`;
  })} </div> <div id="article-no-result" class="no-result" style="display:none;" data-astro-cid-4w2qvtwg> <p data-astro-cid-4w2qvtwg>🔍 没有找到匹配的文章</p> </div> </section> ` })}  `;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/banbaiguan/index.astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/banbaiguan/index.astro";
const $$url = "/banbaiguan";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
