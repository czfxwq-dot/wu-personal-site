import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../../../chunks/Base_C123y-OE.mjs';
import { d as diaries } from '../../../chunks/diaries_Cp2V_aAK.mjs';
/* empty css                                        */
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://ban-bai.com");
function getStaticPaths() {
  return diaries.map((diary) => ({
    params: { date: diary.date },
    props: { diary }
  }));
}
const $$date = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$date;
  const { diary } = Astro2.props;
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const diaryDate = /* @__PURE__ */ new Date(diary.date + "T00:00:00+08:00");
  const dayName = dayNames[diaryDate.getDay()];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const formattedDate = `${monthNames[diaryDate.getMonth()]} ${diaryDate.getDate()}, ${diaryDate.getFullYear()}`;
  const title = diary.titleEn || diary.title;
  const summary = diary.summaryEn || diary.summary;
  const category = diary.categoryEn || diary.category || "";
  const currentIndex = diaries.findIndex((d) => d.date === diary.date);
  const prevDiary = currentIndex < diaries.length - 1 ? diaries[currentIndex + 1] : null;
  const nextDiary = currentIndex > 0 ? diaries[currentIndex - 1] : null;
  const diaryJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": `Guanwu Diary | ${diary.date}`,
    "description": summary,
    "datePublished": diary.date,
    "dateModified": diary.date,
    "author": {
      "@type": "Person",
      "name": "Mr. Wu",
      "alternateName": "Guanwu"
    },
    "url": `https://www.ban-bai.com/en/diary/${diary.date}/`
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": `Guanwu Diary | ${diary.date} \u2014 ${title}`, "jsonLd": diaryJsonLd, "ogDescription": summary, "navActive": "diary", "lang": "en", "data-astro-cid-qc5wur6b": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="diary-entry" data-astro-cid-qc5wur6b> <header class="diary-header" data-astro-cid-qc5wur6b> <time${addAttribute(diary.date, "datetime")} data-astro-cid-qc5wur6b>${formattedDate}</time> <span class="diary-day" data-astro-cid-qc5wur6b>${dayName}</span> ${category && renderTemplate`<span class="diary-category" data-astro-cid-qc5wur6b>${category}</span>`} </header> <div class="diary-content" data-astro-cid-qc5wur6b> <h2 data-astro-cid-qc5wur6b>${title}</h2> <p class="diary-summary" data-astro-cid-qc5wur6b>${summary}</p> <div class="content-notice" data-astro-cid-qc5wur6b> <p data-astro-cid-qc5wur6b>📝 Full diary content is available in Chinese. English translation of the body will be added soon.</p> </div> <div class="chinese-content" data-astro-cid-qc5wur6b> <p data-astro-cid-qc5wur6b><em data-astro-cid-qc5wur6b>Original Chinese diary entry preserved for historical record.</em></p> </div> </div> <footer class="diary-footer" data-astro-cid-qc5wur6b> <div class="diary-nav" data-astro-cid-qc5wur6b> ${prevDiary ? renderTemplate`<a${addAttribute(`/en/diary/${prevDiary.date}/`, "href")} class="prev" data-astro-cid-qc5wur6b>← ${prevDiary.date}</a>` : renderTemplate`<span class="disabled" data-astro-cid-qc5wur6b>← First Entry</span>`} <a href="/en/diary/" class="back" data-astro-cid-qc5wur6b>← All Entries</a> ${nextDiary ? renderTemplate`<a${addAttribute(`/en/diary/${nextDiary.date}/`, "href")} class="next" data-astro-cid-qc5wur6b>${nextDiary.date} →</a>` : renderTemplate`<span class="disabled" data-astro-cid-qc5wur6b>Latest Entry →</span>`} </div> </footer> </article> ` })} `;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/en/diary/[date].astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/en/diary/[date].astro";
const $$url = "/en/diary/[date]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$date,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
