import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../../chunks/Base_C123y-OE.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": "\u8C03\u67E5\u7BA1\u7406\u540E\u53F0", "lang": "zh", "data-astro-cid-bhljryun": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="admin-app" data-astro-cid-bhljryun></div> ` })}  `;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/admin/survey/index.astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/admin/survey/index.astro";
const $$url = "/admin/survey";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
