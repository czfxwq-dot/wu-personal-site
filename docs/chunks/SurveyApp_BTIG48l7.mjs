import { d as createAstro, c as createComponent, m as maybeRenderHead, b as addAttribute, a as renderTemplate } from './astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro("https://ban-bai.com");
const $$SurveyApp = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SurveyApp;
  const { lang = "zh" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div id="survey-app"${addAttribute(lang, "data-lang")}></div> `;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/components/SurveyApp.astro", void 0);

export { $$SurveyApp as $ };
