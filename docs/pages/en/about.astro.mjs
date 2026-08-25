import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../../chunks/Base_C123y-OE.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "name": "About | Guanwu",
    "description": "Mr. Wu's personal profile \u2014 Co-founder of MonolithIoT, AIoT practitioner, BanbaiGuan AI founder",
    "url": "https://ban-bai.com/en/about/",
    "inLanguage": "en",
    "mainEntity": {
      "@type": "Person",
      "name": "Mr. Wu",
      "alternateName": "Guanwu",
      "image": "https://ban-bai.com/avatar.jpg",
      "jobTitle": "Co-founder",
      "worksFor": {
        "@type": "Organization",
        "name": "MonolithIoT (Changzhou) Co., Ltd.",
        "url": "https://www.monolithiot.com"
      },
      "description": "At 50, skilled in structured thinking and first-principles reasoning. Expert in AI applications, brand management, and new media operations.",
      "knowsAbout": ["AI Applications", "AIoT", "Digital Inventory Management", "Brand Management", "New Media Operations"],
      "url": "https://ban-bai.com/en/about/",
      "sameAs": [
        "https://ban-bai.com"
      ]
    }
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "lang": "en", "title": "About | Guanwu", "jsonLd": aboutJsonLd, "navActive": "about", "data-astro-cid-sm4g7ym7": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="page-section" data-astro-cid-sm4g7ym7> <h1 data-astro-cid-sm4g7ym7>About</h1> <div class="about-section" data-astro-cid-sm4g7ym7> <div class="section-title" data-astro-cid-sm4g7ym7>Guanwu</div> <p class="about-text" data-astro-cid-sm4g7ym7>
Pen name: "Guanwu" (观吾 — reflect on oneself).<br data-astro-cid-sm4g7ym7>
Co-founder of MonolithIoT (Changzhou) Co., Ltd.<br data-astro-cid-sm4g7ym7>
Focused on digital smart inventory management AIoT products and solutions.<br data-astro-cid-sm4g7ym7>
Founder of BanbaiGuan AI new media brand.
</p> <p class="about-text" data-astro-cid-sm4g7ym7>
Skilled in structured thinking and first-principles reasoning.<br data-astro-cid-sm4g7ym7>
Expert in AI applications, brand management, and new media operations.<br data-astro-cid-sm4g7ym7>
What I'm doing now: using AI to turn ideas into reality.
</p> </div> <div class="about-section" data-astro-cid-sm4g7ym7> <div class="section-title" data-astro-cid-sm4g7ym7>MonolithIoT (Changzhou) Co., Ltd.</div> <p class="about-text" data-astro-cid-sm4g7ym7>
National high-tech enterprise, specializing in digital intelligence solutions.
        MonolithIoT positions itself as an AI scenario solutions provider, built on three core technologies:
        multi-sensor fusion, AI-powered storage middleware, and multimodal algorithms.
        The smart work order system serves as the central hub, combined with AI prediction, visual monitoring,
        and intelligent action control — transforming complex business requirements into standardized,
        actionable, and traceable digital tasks across the entire industrial chain.
</p> <p class="about-text-light" data-astro-cid-sm4g7ym7>
Two core brands — MonolithIoT and Beirong — serve industrial and retail sectors,
        providing digital solutions for State Grid, Huawei, SF Express, DHL, and other leading enterprises.
</p> <p class="about-links" data-astro-cid-sm4g7ym7>
Company website: <a href="https://www.monolithiot.com/" target="_blank" data-astro-cid-sm4g7ym7>monolithiot.com</a> ｜
        YouTube: <a href="https://www.youtube.com/channel/UC6x3JFjaUw3nMOen2PXDtsw" target="_blank" data-astro-cid-sm4g7ym7>MonolithIoT</a> </p> <div class="about-qr-wrapper" data-astro-cid-sm4g7ym7> <img src="/company-qr.png" alt="MonolithIoT Social Media" data-astro-cid-sm4g7ym7> </div> </div> <div class="about-section" data-astro-cid-sm4g7ym7> <div class="section-title" data-astro-cid-sm4g7ym7>About This Website</div> <p class="about-text" data-astro-cid-sm4g7ym7>
This website was built by me and my AI assistant, together.<br data-astro-cid-sm4g7ym7>
I handle direction and content; AI handles technology and implementation.<br data-astro-cid-sm4g7ym7>
From product design to code development — no frontend engineer involved.
</p> </div> </section> ` })} `;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/en/about/index.astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/en/about/index.astro";
const $$url = "/en/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
