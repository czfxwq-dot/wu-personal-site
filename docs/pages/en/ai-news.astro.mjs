import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { t, $ as $$Base } from '../../chunks/Base_C123y-OE.mjs';
import { d as dailyNewsSummaries } from '../../chunks/ai-news-summary_BXsYL6Cd.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const allCategories = ["LLM", "Hardware", "Industry", "Investment", "Policy", "Research", "Tools"];
  const newsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AI News | Guanwu",
    "description": "Daily AI industry news roundup with one-line commentary",
    "url": "https://ban-bai.com/en/ai-news/",
    "inLanguage": "en",
    "author": {
      "@type": "Person",
      "name": "Mr. Wu",
      "alternateName": "Guanwu"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MonolithIoT (Changzhou) Co., Ltd."
    }
  };
  const allDates = dailyNewsSummaries.map((d) => d.date);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "lang": "en", "title": t("navAiNews", "en") + " | Guanwu", "jsonLd": newsJsonLd, "navActive": "ai-news", "data-astro-cid-cn33ptfn": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="page-section" data-astro-cid-cn33ptfn> <h1 data-astro-cid-cn33ptfn>${t("navAiNews", "en")}</h1> <p class="subtitle" data-astro-cid-cn33ptfn>
Daily AI industry news roundup with one-line commentary
</p> <!-- Search + filters --> <div class="search-bar" data-astro-cid-cn33ptfn> <div class="search-input-wrap" data-astro-cid-cn33ptfn> <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-cn33ptfn> <circle cx="11" cy="11" r="8" data-astro-cid-cn33ptfn></circle><path d="m21 21-4.3-4.3" data-astro-cid-cn33ptfn></path> </svg> <input type="text" id="news-search" class="search-input" placeholder="Search titles or content..." data-astro-cid-cn33ptfn> </div> <select id="news-date-filter" class="date-filter" data-astro-cid-cn33ptfn> <option value="" data-astro-cid-cn33ptfn>All Dates</option> ${allDates.map((d) => renderTemplate`<option${addAttribute(d, "value")} data-astro-cid-cn33ptfn>${d}</option>`)} </select> <select id="news-category-filter" class="date-filter" data-astro-cid-cn33ptfn> <option value="" data-astro-cid-cn33ptfn>All Categories</option> ${allCategories.map((c) => renderTemplate`<option${addAttribute(c, "value")} data-astro-cid-cn33ptfn>${c}</option>`)} </select> <span id="news-count" class="result-count" data-astro-cid-cn33ptfn>${dailyNewsSummaries.length} days total</span> </div> <div id="news-list" data-astro-cid-cn33ptfn> ${dailyNewsSummaries.map((day) => renderTemplate`<div class="news-day"${addAttribute(day.date, "data-date")}${addAttribute(`${day.titleEn || day.title} ${day.summaryEn || day.summary} ${day.commentEn || day.comment} ${day.newsItems.map((n) => `${n.titleEn || n.title} ${n.summaryEn || n.summary} ${n.source}`).join(" ")}`.toLowerCase(), "data-search")} data-astro-cid-cn33ptfn> <div class="news-day-header" data-astro-cid-cn33ptfn> <time${addAttribute(day.date, "datetime")} data-astro-cid-cn33ptfn>${day.date}</time> <span class="news-count" data-astro-cid-cn33ptfn>${day.newsItems.length} items</span> </div> <h2 class="news-day-title" data-astro-cid-cn33ptfn>${day.titleEn || day.title}</h2> <p class="news-day-summary" data-astro-cid-cn33ptfn>${day.summaryEn || day.summary}</p> <div class="news-items" data-astro-cid-cn33ptfn> ${day.newsItems.map((item) => renderTemplate`<div class="news-item"${addAttribute(item.categoryEn || item.category, "data-category")}${addAttribute(`${item.titleEn || item.title} ${item.summaryEn || item.summary} ${item.source}`.toLowerCase(), "data-item-search")} data-astro-cid-cn33ptfn> <div class="news-item-header" data-astro-cid-cn33ptfn> <span class="news-item-category"${addAttribute(item.categoryEn || item.category, "data-category")} data-astro-cid-cn33ptfn>${item.categoryEn || item.category}</span> <h3 data-astro-cid-cn33ptfn>${item.titleEn || item.title}</h3> </div> <p class="news-item-text" data-astro-cid-cn33ptfn>${item.summaryEn || item.summary}</p> <span class="news-item-source" data-astro-cid-cn33ptfn>${item.source}</span> </div>`)} </div> ${(day.commentEn || day.comment) && renderTemplate`<div class="news-comment" data-astro-cid-cn33ptfn> <strong data-astro-cid-cn33ptfn>One-line commentary: </strong>${day.commentEn || day.comment} </div>`} </div>`)} </div> <div id="news-no-result" class="no-result" style="display:none;" data-astro-cid-cn33ptfn> <p data-astro-cid-cn33ptfn>No matching news found</p> </div> <!-- Sources --> <div class="sources-note" data-astro-cid-cn33ptfn> <h3 data-astro-cid-cn33ptfn>News Sources</h3> <p data-astro-cid-cn33ptfn>AI news is curated daily from the following authoritative channels:</p> <div class="sources-list" data-astro-cid-cn33ptfn> <a href="https://techcrunch.com/tag/artificial-intelligence/" target="_blank" rel="noopener" data-astro-cid-cn33ptfn>TechCrunch AI</a> <a href="https://www.theverge.com/ai-artificial-intelligence" target="_blank" rel="noopener" data-astro-cid-cn33ptfn>The Verge AI</a> <a href="https://venturebeat.com/category/ai/" target="_blank" rel="noopener" data-astro-cid-cn33ptfn>VentureBeat AI</a> <a href="https://www.wired.com/tag/artificial-intelligence/" target="_blank" rel="noopener" data-astro-cid-cn33ptfn>WIRED AI</a> <a href="https://36kr.com/" target="_blank" rel="noopener" data-astro-cid-cn33ptfn>36Kr</a> <a href="https://www.jiqizhixin.com/" target="_blank" rel="noopener" data-astro-cid-cn33ptfn>Jiqizhixin</a> <a href="https://www.anthropic.com/news" target="_blank" rel="noopener" data-astro-cid-cn33ptfn>Anthropic News</a> <a href="https://openai.com/news" target="_blank" rel="noopener" data-astro-cid-cn33ptfn>OpenAI News</a> </div> </div> </section> ` })}  `;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/en/ai-news/index.astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/en/ai-news/index.astro";
const $$url = "/en/ai-news";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
