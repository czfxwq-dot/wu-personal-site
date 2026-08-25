import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../chunks/Base_C123y-OE.mjs';
import { d as dailyNewsSummaries } from '../chunks/ai-news-summary_BXsYL6Cd.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  function formatDate(dateStr) {
    const d = new Date(dateStr);
    const weekdays = ["\u5468\u65E5", "\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D"];
    return `${d.getFullYear()}\u5E74${d.getMonth() + 1}\u6708${d.getDate()}\u65E5 ${weekdays[d.getDay()]}`;
  }
  const newsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AI\u65B0\u95FB | \u89C2\u543E",
    "description": "\u6BCF\u5929AI\u884C\u4E1A\u91CD\u5927\u65B0\u95FB\u6C47\u603B + \u4E00\u53E5\u8BDD\u70B9\u8BC4",
    "url": "https://ban-bai.com/ai-news/",
    "author": {
      "@type": "Person",
      "name": "\u5434\u603B",
      "alternateName": "\u89C2\u543E"
    },
    "publisher": {
      "@type": "Organization",
      "name": "\u78D0\u77F3\u7535\u6C14\uFF08\u5E38\u5DDE\uFF09\u6709\u9650\u516C\u53F8"
    }
  };
  const allDates = dailyNewsSummaries.map((d) => d.date);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": "AI\u65B0\u95FB | \u6BCF\u5929AI\u884C\u4E1A\u91CD\u5927\u65B0\u95FB\u6C47\u603B - \u89C2\u543E", "jsonLd": newsJsonLd, "ogDescription": "\u6BCF\u5929AI\u884C\u4E1A\u91CD\u5927\u65B0\u95FB\u6C47\u603B + \u4E00\u53E5\u8BDD\u70B9\u8BC4\uFF0C\u8986\u76D6\u5927\u6A21\u578B\u3001\u786C\u4EF6\u3001\u4EA7\u4E1A\u3001\u6295\u8D44\u3001\u653F\u7B56\u7B49\u65B9\u5411", "navActive": "ai-news", "data-astro-cid-gjmz2glq": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="page-section" data-astro-cid-gjmz2glq> <h1 data-astro-cid-gjmz2glq>AI新闻</h1> <p class="subtitle" data-astro-cid-gjmz2glq>
每天AI行业重大新闻汇总 + 一句话点评
</p> <!-- 搜索+日期筛选栏 --> <div class="search-bar" data-astro-cid-gjmz2glq> <div class="search-input-wrap" data-astro-cid-gjmz2glq> <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-gjmz2glq> <circle cx="11" cy="11" r="8" data-astro-cid-gjmz2glq></circle><path d="m21 21-4.3-4.3" data-astro-cid-gjmz2glq></path> </svg> <input type="text" id="news-search" class="search-input" placeholder="搜索新闻标题或内容..." data-astro-cid-gjmz2glq> </div> <select id="news-date-filter" class="date-filter" data-astro-cid-gjmz2glq> <option value="" data-astro-cid-gjmz2glq>全部日期</option> ${allDates.map((d) => renderTemplate`<option${addAttribute(d, "value")} data-astro-cid-gjmz2glq>${d}</option>`)} </select> <select id="news-category-filter" class="date-filter" data-astro-cid-gjmz2glq> <option value="" data-astro-cid-gjmz2glq>全部类别</option> <option value="大模型" data-astro-cid-gjmz2glq>大模型</option> <option value="硬件" data-astro-cid-gjmz2glq>硬件</option> <option value="产业" data-astro-cid-gjmz2glq>产业</option> <option value="投资" data-astro-cid-gjmz2glq>投资</option> <option value="政策" data-astro-cid-gjmz2glq>政策</option> <option value="研究" data-astro-cid-gjmz2glq>研究</option> <option value="工具" data-astro-cid-gjmz2glq>工具</option> </select> <span id="news-count" class="result-count" data-astro-cid-gjmz2glq>共 ${dailyNewsSummaries.length} 天</span> </div> <div id="news-list" data-astro-cid-gjmz2glq> ${dailyNewsSummaries.map((day) => renderTemplate`<div class="news-day"${addAttribute(day.date, "data-date")}${addAttribute(`${day.title} ${day.summary} ${day.comment} ${day.newsItems.map((n) => `${n.title} ${n.summary} ${n.source}`).join(" ")}`.toLowerCase(), "data-search")} data-astro-cid-gjmz2glq> <div class="news-day-header" data-astro-cid-gjmz2glq> <time${addAttribute(day.date, "datetime")} data-astro-cid-gjmz2glq>${formatDate(day.date)}</time> <span class="news-count" data-astro-cid-gjmz2glq>${day.newsItems.length}条</span> <span class="read-time" data-astro-cid-gjmz2glq>${Math.max(1, Math.ceil(day.summary.length / 300))} min</span> </div> <h2 class="news-day-title" data-astro-cid-gjmz2glq>${day.title}</h2> <p class="news-day-summary" data-astro-cid-gjmz2glq>${day.summary}</p> <div class="news-items" data-astro-cid-gjmz2glq> ${day.newsItems.map((item) => renderTemplate`<div class="news-item"${addAttribute(item.category, "data-category")}${addAttribute(`${item.title} ${item.summary} ${item.source}`.toLowerCase(), "data-item-search")} data-astro-cid-gjmz2glq> <div class="news-item-header" data-astro-cid-gjmz2glq> <span class="news-item-category"${addAttribute(item.category, "data-category")} data-astro-cid-gjmz2glq>${item.category}</span> <h3 data-astro-cid-gjmz2glq> ${item.url ? renderTemplate`<a${addAttribute(item.url, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-gjmz2glq>${item.title}</a>` : item.title} </h3> </div> <p class="news-item-text" data-astro-cid-gjmz2glq>${item.summary}</p> <span class="news-item-source" data-astro-cid-gjmz2glq> ${item.source} ${item.url && renderTemplate`<a${addAttribute(item.url, "href")} target="_blank" rel="noopener noreferrer" class="news-item-link" data-astro-cid-gjmz2glq> → 原文</a>`} </span> </div>`)} </div> ${day.comment && renderTemplate`<div class="news-comment" data-astro-cid-gjmz2glq> <strong data-astro-cid-gjmz2glq>📝 一句话点评：</strong>${day.comment} </div>`} </div>`)} </div> <div id="news-no-result" class="no-result" style="display:none;" data-astro-cid-gjmz2glq> <p data-astro-cid-gjmz2glq>🔍 没有找到匹配的新闻</p> </div> <!-- GEO 优化：来源说明 --> <div class="sources-note" data-astro-cid-gjmz2glq> <h3 data-astro-cid-gjmz2glq>📰 新闻来源</h3> <p data-astro-cid-gjmz2glq>AI新闻来源于以下权威渠道，每天精选并汇总：</p> <div class="sources-list" data-astro-cid-gjmz2glq> <a href="https://techcrunch.com/tag/artificial-intelligence/" target="_blank" rel="noopener" data-astro-cid-gjmz2glq>TechCrunch AI</a> <a href="https://www.theverge.com/ai-artificial-intelligence" target="_blank" rel="noopener" data-astro-cid-gjmz2glq>The Verge AI</a> <a href="https://venturebeat.com/category/ai/" target="_blank" rel="noopener" data-astro-cid-gjmz2glq>VentureBeat AI</a> <a href="https://www.wired.com/tag/artificial-intelligence/" target="_blank" rel="noopener" data-astro-cid-gjmz2glq>WIRED AI</a> <a href="https://36kr.com/" target="_blank" rel="noopener" data-astro-cid-gjmz2glq>36氪</a> <a href="https://www.jiqizhixin.com/" target="_blank" rel="noopener" data-astro-cid-gjmz2glq>机器之心</a> <a href="https://www.anthropic.com/news" target="_blank" rel="noopener" data-astro-cid-gjmz2glq>Anthropic News</a> <a href="https://openai.com/news" target="_blank" rel="noopener" data-astro-cid-gjmz2glq>OpenAI News</a> </div> </div> </section> ` })}  `;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/ai-news/index.astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/ai-news/index.astro";
const $$url = "/ai-news";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
