import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../../chunks/Base_C123y-OE.mjs';
import { d as diaries } from '../../chunks/diaries_Cp2V_aAK.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const diaryListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Guanwu Diary",
    "description": "Daily work diary from a 50-year-old AI practitioner",
    "url": "https://banbai.ai/en/diary/",
    "author": {
      "@type": "Person",
      "name": "Mr. Wu",
      "alternateName": "Guanwu"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MonolithIoT (Changzhou) Co., Ltd."
    },
    "hasPart": diaries.map((diary, i) => ({
      "@type": "BlogPosting",
      "headline": `Day ${diaries.length - i}: ${diary.titleEn || diary.title}`,
      "datePublished": new Date(diary.date).toISOString(),
      "dateModified": new Date(diary.date).toISOString(),
      "description": diary.summaryEn || diary.summary,
      "url": `https://banbai.ai/en/diary/${diary.date}/`,
      "author": {
        "@type": "Person",
        "name": "Mr. Wu"
      }
    }))
  };
  const allDates = diaries.map((d) => d.date);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "lang": "en", "title": "Guanwu Diary", "jsonLd": diaryListJsonLd, "navActive": "diary", "data-astro-cid-ruxqrson": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="page-section" data-astro-cid-ruxqrson> <h1 data-astro-cid-ruxqrson>Guanwu Diary</h1> <p class="subtitle" data-astro-cid-ruxqrson>
Daily work records — AI implementation, problem-solving, project progress
</p> <!-- 搜索+日期筛选栏 --> <div class="search-bar" data-astro-cid-ruxqrson> <div class="search-input-wrap" data-astro-cid-ruxqrson> <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-ruxqrson> <circle cx="11" cy="11" r="8" data-astro-cid-ruxqrson></circle><path d="m21 21-4.3-4.3" data-astro-cid-ruxqrson></path> </svg> <input type="text" id="diary-search" class="search-input" placeholder="Search title or content..." data-astro-cid-ruxqrson> </div> <select id="diary-date-filter" class="date-filter" data-astro-cid-ruxqrson> <option value="" data-astro-cid-ruxqrson>All dates</option> ${allDates.map((d) => renderTemplate`<option${addAttribute(d, "value")} data-astro-cid-ruxqrson>${d}</option>`)} </select> <span id="diary-count" class="result-count" data-astro-cid-ruxqrson>${diaries.length} entries</span> </div> <div id="diary-list" data-astro-cid-ruxqrson> ${diaries.map((diary, i) => renderTemplate`<a${addAttribute(`/en/diary/${diary.date}/`, "href")} class="card"${addAttribute(diary.date, "data-date")}${addAttribute(`${(diary.titleEn || diary.title) + " " + (diary.summaryEn || diary.summary)}`.toLowerCase(), "data-search")} data-astro-cid-ruxqrson> <div class="card-date" data-astro-cid-ruxqrson>${diary.date}</div> <h2 data-astro-cid-ruxqrson><span class="day-badge" data-astro-cid-ruxqrson>Day ${diaries.length - i}</span>${diary.titleEn || diary.title}</h2> <p data-astro-cid-ruxqrson>${diary.summaryEn || diary.summary}</p> </a>`)} </div> <div id="diary-no-result" class="no-result" style="display:none;" data-astro-cid-ruxqrson> <p data-astro-cid-ruxqrson>🔍 No matching diary found</p> </div> </section> <div class="diary-footer-text" data-astro-cid-ruxqrson>
More diary entries coming soon...
</div> ` })}  `;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/en/diary/index.astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/en/diary/index.astro";
const $$url = "/en/diary";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
