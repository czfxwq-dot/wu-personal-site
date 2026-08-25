import { d as createAstro, c as createComponent, m as maybeRenderHead, b as addAttribute, a as renderTemplate } from './astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                            */

const $$Astro = createAstro("https://ban-bai.com");
const $$Citations = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Citations;
  const { sources, title, lang = "zh" } = Astro2.props;
  const defaultTitle = lang === "en" ? "References" : "\u5F15\u7528\u6765\u6E90";
  const displayTitle = title || defaultTitle;
  const note = lang === "en" ? "All sources cited in this article are from public reports for further reading." : "\u672C\u6587\u5F15\u7528\u7684\u6765\u6E90\u5747\u4E3A\u516C\u5F00\u62A5\u9053\uFF0C\u4F9B\u8BFB\u8005\u8FDB\u4E00\u6B65\u9605\u8BFB\u3002";
  return renderTemplate`${maybeRenderHead()}<section class="citations"${addAttribute(defaultTitle, "aria-label")} data-astro-cid-eqo3tkq5> <h3 class="citations-title" data-astro-cid-eqo3tkq5>📚 ${displayTitle}</h3> <ul class="citations-list" data-astro-cid-eqo3tkq5> ${sources.map((s) => renderTemplate`<li class="citation-item" data-astro-cid-eqo3tkq5> <a${addAttribute(s.url, "href")} target="_blank" rel="noopener noreferrer" class="citation-link" data-astro-cid-eqo3tkq5> <span class="citation-source" data-astro-cid-eqo3tkq5>${s.source}</span> <span class="citation-title" data-astro-cid-eqo3tkq5>${s.title}</span> ${s.date && renderTemplate`<time class="citation-date"${addAttribute(s.date, "datetime")} data-astro-cid-eqo3tkq5>${s.date}</time>`} </a> </li>`)} </ul> <p class="citations-note" data-astro-cid-eqo3tkq5> ${note} </p> </section> `;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/components/Citations.astro", void 0);

export { $$Citations as $ };
