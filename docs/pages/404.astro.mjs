import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../chunks/Base_C38bZXr6.mjs';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "\u9875\u9762\u672A\u627E\u5230 | \u89C2\u543E",
    "description": "404 \u2014 \u4F60\u8BBF\u95EE\u7684\u9875\u9762\u4E0D\u5B58\u5728"
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": "404 | \u9875\u9762\u672A\u627E\u5230 \u2014 \u89C2\u543E", "jsonLd": jsonLd, "ogDescription": "404 \u2014 \u4F60\u8BBF\u95EE\u7684\u9875\u9762\u4E0D\u5B58\u5728", "navActive": "home", "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="not-found" data-astro-cid-zetdm5md> <div class="container not-found-content" data-astro-cid-zetdm5md> <div class="error-code" data-astro-cid-zetdm5md>404</div> <h1 data-astro-cid-zetdm5md>页面不存在</h1> <p class="not-found-text" data-astro-cid-zetdm5md>
你访问的页面可能已被移动、删除，或链接已失效。
</p> <div class="not-found-actions" data-astro-cid-zetdm5md> <a href="/" class="btn btn-primary" data-astro-cid-zetdm5md>返回首页 <span class="btn-arrow" data-astro-cid-zetdm5md>→</span></a> <a href="/diary/" class="btn btn-ghost" data-astro-cid-zetdm5md>查看工作日记</a> </div> </div> </section> ` })} `;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/404.astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
