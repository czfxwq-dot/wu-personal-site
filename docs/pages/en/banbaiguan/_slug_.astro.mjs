import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, b as addAttribute, m as maybeRenderHead } from '../../../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../../../chunks/Base_DZlGkYtv.mjs';
import { a as articles } from '../../../chunks/articles_B8r8olXt.mjs';
/* empty css                                        */
export { renderers } from '../../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://ban-bai.com");
function getStaticPaths() {
  return articles.map((article) => ({
    params: { slug: article.slug },
    props: { article }
  }));
}
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { article } = Astro2.props;
  const title = article.titleEn || article.title;
  const excerpt = article.excerptEn || article.excerpt;
  const tag = article.tagEn || article.tag;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "datePublished": article.date,
    "dateModified": article.date,
    "author": {
      "@type": "Person",
      "name": "Mr. Wu",
      "alternateName": "Guanwu"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BanbaiGuan AI"
    },
    "description": excerpt
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": `${title} \u2014 BanbaiGuan AI`, "jsonLd": articleJsonLd, "ogDescription": excerpt, "navActive": "banbaiguan", "lang": "en", "data-astro-cid-c52vh34l": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([' <script type="application/json" id="article-data">\n    {JSON.stringify(articles.map(a => ({ slug: a.slug, title: a.title, titleEn: a.titleEn })))}\n  <\/script> ', '<article class="article-page" data-astro-cid-c52vh34l> <header class="article-header" data-astro-cid-c52vh34l> <div class="article-meta" data-astro-cid-c52vh34l> <time', " data-astro-cid-c52vh34l>", '</time> <span class="article-tag" data-astro-cid-c52vh34l>', "</span> </div> <h1 data-astro-cid-c52vh34l>", '</h1> <p class="article-subtitle" data-astro-cid-c52vh34l>', `</p> </header> <div class="article-content" data-astro-cid-c52vh34l> <div class="content-notice" data-astro-cid-c52vh34l> <p data-astro-cid-c52vh34l>\u{1F4DD} Full article content is available in Chinese. English translation of the body will be added soon.</p> </div> <p class="article-lead" data-astro-cid-c52vh34l><em data-astro-cid-c52vh34l>The full article is written in Chinese. Here's a summary:</em></p> <p data-astro-cid-c52vh34l>`, '</p> </div> <footer class="article-footer-nav" data-astro-cid-c52vh34l> <nav class="article-nav" data-astro-cid-c52vh34l> <a href="#prev" class="prev" id="nav-prev" data-astro-cid-c52vh34l>\u2190 Previous</a> <a href="/en/banbaiguan/" class="back" data-astro-cid-c52vh34l>\u2190 Back to Articles</a> <a href="#next" class="next" id="nav-next" data-astro-cid-c52vh34l>Next \u2192</a> </nav> </footer> </article>  '])), maybeRenderHead(), addAttribute(article.date, "datetime"), article.date, tag, title, excerpt, excerpt) })} `;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/en/banbaiguan/[slug].astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/en/banbaiguan/[slug].astro";
const $$url = "/en/banbaiguan/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
