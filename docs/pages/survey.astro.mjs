import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../chunks/Base_C123y-OE.mjs';
import { $ as $$SurveyApp } from '../chunks/SurveyApp_CU_N4nRT.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": "\u6A21\u62DF\u60C5\u5883\u4E0B\u7684\u5BB6\u957F\u51B3\u7B56\u4E0E\u5FC3\u7406\u611F\u53D7\u8C03\u67E5", "navActive": "about", "lang": "zh" }, { "default": ($$result2) => renderTemplate`
import '../styles/survey.css';
${renderComponent($$result2, "SurveyApp", $$SurveyApp, { "lang": "zh" })} ` })}`;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/survey/index.astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/survey/index.astro";
const $$url = "/survey";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
