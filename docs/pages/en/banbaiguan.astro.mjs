import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../../chunks/Base_C38bZXr6.mjs';
import { a as articles } from '../../chunks/articles_BAdDt4E5.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const articlesJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "BanbaiGuan AI | Articles",
    "description": "Deep thinking from a 50-year-old AI practitioner \u2014 AI adoption, business insights, entrepreneurship",
    "url": "https://banbai.ai/en/banbaiguan/",
    "author": {
      "@type": "Person",
      "name": "Mr. Wu",
      "alternateName": "Guanwu"
    }
  };
  const allDates = articles.map((a) => a.date);
  const allTags = [...new Set(articles.map((a) => a.tagEn || a.tag))];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "lang": "en", "title": "BanbaiGuan AI", "jsonLd": articlesJsonLd, "navActive": "banbaiguan", "data-astro-cid-vwgd74h5": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="page-section" data-astro-cid-vwgd74h5> <h1 data-astro-cid-vwgd74h5>BanbaiGuan AI</h1> <p class="subtitle" data-astro-cid-vwgd74h5>
Deep thinking from a 50-year-old AI practitioner — AI adoption, business insights, entrepreneurship
</p> <!-- 搜索+筛选栏 --> <div class="search-bar" data-astro-cid-vwgd74h5> <div class="search-input-wrap" data-astro-cid-vwgd74h5> <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-vwgd74h5> <circle cx="11" cy="11" r="8" data-astro-cid-vwgd74h5></circle><path d="m21 21-4.3-4.3" data-astro-cid-vwgd74h5></path> </svg> <input type="text" id="article-search" class="search-input" placeholder="Search title or excerpt..." data-astro-cid-vwgd74h5> </div> <select id="article-date-filter" class="date-filter" data-astro-cid-vwgd74h5> <option value="" data-astro-cid-vwgd74h5>All dates</option> ${allDates.map((d) => renderTemplate`<option${addAttribute(d, "value")} data-astro-cid-vwgd74h5>${d}</option>`)} </select> <select id="article-tag-filter" class="date-filter" data-astro-cid-vwgd74h5> <option value="" data-astro-cid-vwgd74h5>All tags</option> ${allTags.map((t) => renderTemplate`<option${addAttribute(t, "value")} data-astro-cid-vwgd74h5>${t}</option>`)} </select> <span id="article-count" class="result-count" data-astro-cid-vwgd74h5>${articles.length} articles</span> </div> <div id="article-list" data-astro-cid-vwgd74h5> ${articles.map((article) => renderTemplate`<article class="article-card"${addAttribute(article.date, "data-date")}${addAttribute(article.tagEn || article.tag, "data-tag")}${addAttribute(`${(article.titleEn || article.title) + " " + (article.excerptEn || article.excerpt)}`.toLowerCase(), "data-search")} data-astro-cid-vwgd74h5> <div class="article-meta" data-astro-cid-vwgd74h5> <span class="article-date" data-astro-cid-vwgd74h5>${article.date}</span> <span class="article-tag"${addAttribute(article.tagEn || article.tag, "data-tag")} data-astro-cid-vwgd74h5>${article.tagEn || article.tag}</span> </div> <h2 data-astro-cid-vwgd74h5> <a${addAttribute(`/en/banbaiguan/${article.slug}/`, "href")} data-astro-cid-vwgd74h5>${article.titleEn || article.title}</a> </h2> <p class="article-excerpt" data-astro-cid-vwgd74h5>${article.excerptEn || article.excerpt}</p> <a${addAttribute(`/en/banbaiguan/${article.slug}/`, "href")} class="read-more" data-astro-cid-vwgd74h5>Read More →</a> </article>`)} </div> <div id="article-no-result" class="no-result" style="display:none;" data-astro-cid-vwgd74h5> <p data-astro-cid-vwgd74h5>🔍 No matching articles found</p> </div> </section> ` })}  `;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/en/banbaiguan/index.astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/en/banbaiguan/index.astro";
const $$url = "/en/banbaiguan";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
