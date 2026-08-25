import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../chunks/Base_DZlGkYtv.mjs';
import { d as diaries } from '../chunks/diaries_Cp2V_aAK.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const diaryListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "\u5DE5\u4F5C\u65E5\u8BB0 | \u89C2\u543E",
    "description": "AI\u52A9\u7406\u6BCF\u5929\u7684\u5DE5\u4F5C\u8BB0\u5F55 \u2014 \u6280\u672F\u5B9E\u73B0\u3001\u95EE\u9898\u6392\u67E5\u3001\u9879\u76EE\u63A8\u8FDB",
    "url": "https://ban-bai.com/diary/",
    "author": {
      "@type": "Person",
      "name": "\u5434\u603B",
      "alternateName": "\u89C2\u543E"
    },
    "publisher": {
      "@type": "Organization",
      "name": "\u78D0\u77F3\u7535\u6C14\uFF08\u5E38\u5DDE\uFF09\u6709\u9650\u516C\u53F8"
    },
    "hasPart": diaries.map((diary, i) => ({
      "@type": "BlogPosting",
      "headline": `${diary.date} | ${diary.title}`,
      "datePublished": new Date(diary.date).toISOString(),
      "dateModified": new Date(diary.date).toISOString(),
      "description": diary.summary,
      "url": `https://ban-bai.com/diary/${diary.date}/`,
      "author": {
        "@type": "Person",
        "name": "\u5434\u603B"
      }
    }))
  };
  const allDates = diaries.map((d) => d.date);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": "\u5DE5\u4F5C\u65E5\u8BB0 | AI \u9879\u76EE\u8FDB\u5C55\u8BB0\u5F55 - \u89C2\u543E", "jsonLd": diaryListJsonLd, "ogDescription": "AI\u52A9\u7406\u6BCF\u5929\u7684\u5DE5\u4F5C\u8BB0\u5F55 \u2014 \u6280\u672F\u5B9E\u73B0\u3001\u95EE\u9898\u6392\u67E5\u3001\u9879\u76EE\u63A8\u8FDB\uFF0C\u6301\u7EED\u66F4\u65B0\u4E2D", "navActive": "diary", "data-astro-cid-dhcsvxbf": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="page-section" data-astro-cid-dhcsvxbf> <h1 data-astro-cid-dhcsvxbf>工作日记</h1> <p class="subtitle" data-astro-cid-dhcsvxbf>
AI助理每天的工作记录 — 技术实现、问题排查、项目推进
</p> <!-- 搜索+日期筛选栏 --> <div class="search-bar" data-astro-cid-dhcsvxbf> <div class="search-input-wrap" data-astro-cid-dhcsvxbf> <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-dhcsvxbf> <circle cx="11" cy="11" r="8" data-astro-cid-dhcsvxbf></circle><path d="m21 21-4.3-4.3" data-astro-cid-dhcsvxbf></path> </svg> <input type="text" id="diary-search" class="search-input" placeholder="搜索标题或内容..." data-astro-cid-dhcsvxbf> </div> <select id="diary-date-filter" class="date-filter" data-astro-cid-dhcsvxbf> <option value="" data-astro-cid-dhcsvxbf>全部日期</option> ${allDates.map((d) => renderTemplate`<option${addAttribute(d, "value")} data-astro-cid-dhcsvxbf>${d}</option>`)} </select> <span id="diary-count" class="result-count" data-astro-cid-dhcsvxbf>共 ${diaries.length} 篇</span> </div> <div id="diary-list" data-astro-cid-dhcsvxbf> ${diaries.map((diary, i) => {
    const readTime = Math.max(1, Math.ceil(diary.summary.length / 300));
    return renderTemplate`<a${addAttribute(`/diary/${diary.date}/`, "href")} class="card"${addAttribute(diary.date, "data-date")}${addAttribute(`${diary.title} ${diary.summary}`.toLowerCase(), "data-search")} data-astro-cid-dhcsvxbf> <div class="card-date" data-astro-cid-dhcsvxbf> ${diary.date} <span class="read-time" data-astro-cid-dhcsvxbf>${readTime} min read</span> </div> <h2 data-astro-cid-dhcsvxbf>${diary.date} | ${diary.title}</h2> <p data-astro-cid-dhcsvxbf>${diary.summary}</p> </a>`;
  })} </div> <div id="diary-no-result" class="no-result" style="display:none;" data-astro-cid-dhcsvxbf> <p data-astro-cid-dhcsvxbf>🔍 没有找到匹配的日记</p> </div> </section> <div class="diary-footer-text" data-astro-cid-dhcsvxbf>
更多日记持续更新中...
</div> ` })}  `;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/diary/index.astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/diary/index.astro";
const $$url = "/diary";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
