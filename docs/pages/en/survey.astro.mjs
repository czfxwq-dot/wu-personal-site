import { c as createComponent, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../../chunks/Base_DZlGkYtv.mjs';
import { $ as $$SurveyApp } from '../../chunks/SurveyApp_CU_N4nRT.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": "Parental Decision-Making & Psychological Responses Survey", "navActive": "about", "lang": "en" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SurveyApp", $$SurveyApp, { "lang": "en" })} ` })}`;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/en/survey/index.astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/en/survey/index.astro";
const $$url = "/en/survey";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
