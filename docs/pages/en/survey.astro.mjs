import { c as createComponent, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../../chunks/Base_DlE_7__V.mjs';
import { $ as $$SurveyApp } from '../../chunks/SurveyApp_UGUtlwpC.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": "Parental Decision-Making & Psychological Responses Survey", "navActive": "about", "lang": "en" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SurveyApp", $$SurveyApp, { "lang": "en" })} ` })}`;
}, "C:/Users/czfxw/Desktop/claude\u9879\u76EE/wu-personal-site/src/pages/en/survey/index.astro", void 0);

const $$file = "C:/Users/czfxw/Desktop/claude项目/wu-personal-site/src/pages/en/survey/index.astro";
const $$url = "/en/survey";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
