import { c as createComponent, a as renderTemplate, r as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../chunks/Base_DZlGkYtv.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "SearchAction",
    "name": "\u641C\u7D22 | \u89C2\u543E",
    "description": "\u641C\u7D22\u89C2\u543E\u7F51\u7AD9\u7684\u6240\u6709\u6587\u7AE0\u3001\u65E5\u8BB0\u548CAI\u65B0\u95FB"
  };
  return renderTemplate(_a || (_a = __template(["", ` <!-- Pagefind UI --> <link href="/pagefind/pagefind-ui.css" rel="stylesheet"> <script src="/pagefind/pagefind-ui.js"><\/script>  <script>
  // \u521D\u59CB\u5316 Pagefind
  window.addEventListener('DOMContentLoaded', () => {
    new PagefindUI({
      element: "#search-results",
      showSubResults: true,
      showImages: false,
      translations: {
        placeholder: "\u8F93\u5165\u5173\u952E\u8BCD...",
        clear_search: "\u6E05\u9664",
        search_empty: "\u6CA1\u6709\u627E\u5230\u76F8\u5173\u7ED3\u679C",
        search: {
          placeholder: "\u641C\u7D22",
          clear: "\u6E05\u9664",
          close: "\u5173\u95ED"
        }
      }
    });
  });
<\/script>`])), renderComponent($$result, "BaseLayout", $$Base, { "title": "\u641C\u7D22 | \u89C2\u543E", "jsonLd": pageJsonLd, "ogDescription": "\u641C\u7D22\u89C2\u543E\u7F51\u7AD9\u7684\u6240\u6709\u6587\u7AE0\u3001\u65E5\u8BB0\u548CAI\u65B0\u95FB", "navActive": "search", "data-astro-cid-sqekdmok": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="search-page" data-astro-cid-sqekdmok> <div class="search-header" data-astro-cid-sqekdmok> <h1 data-astro-cid-sqekdmok>🔍 站内搜索</h1> <p data-astro-cid-sqekdmok>搜索所有文章、日记和AI新闻</p> </div> <div class="search-box" data-astro-cid-sqekdmok> <input type="search" id="search-input" placeholder="输入关键词..." autocomplete="off" data-astro-cid-sqekdmok> <div id="search-results" class="search-results" data-astro-cid-sqekdmok></div> </div> </div> ` }));
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/search/index.astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/search/index.astro";
const $$url = "/search";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
