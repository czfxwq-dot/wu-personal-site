import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../chunks/Base_DZlGkYtv.mjs';
import { d as diaries } from '../chunks/diaries_Cp2V_aAK.mjs';
import { d as dailyNewsSummaries } from '../chunks/ai-news-summary_BXsYL6Cd.mjs';
import { a as articles } from '../chunks/articles_B8r8olXt.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Guanwu | 50-Year-Old Using AI to Get Things Done",
    "description": "50-year-old entrepreneur uses AI to turn ideas into reality \u2014 co-founder of MonolithIoT, sharing AI tool practices, AIoT solutions, and digital smart inventory management",
    "url": "https://banbai.ai/en/",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Guanwu",
      "url": "https://banbai.ai"
    },
    "about": {
      "@type": "Person",
      "name": "Mr. Wu",
      "alternateName": "Guanwu",
      "jobTitle": "Co-founder",
      "worksFor": {
        "@type": "Organization",
        "name": "MonolithIoT (Changzhou) Co., Ltd."
      }
    },
    "keywords": ["AI tools", "AI adoption", "BanbaiGuan AI", "AIoT", "digital inventory", "learn AI at 50", "AI productivity"]
  };
  const latest = diaries[0];
  const latestSummary = dailyNewsSummaries[0];
  const latestArticle = articles[0];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "jsonLd": homeJsonLd, "navActive": "home", "lang": "en", "data-astro-cid-dhfotatx": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="hero" data-astro-cid-dhfotatx> <div class="hero-bg" data-astro-cid-dhfotatx> <div class="hero-gradient-1" data-astro-cid-dhfotatx></div> <div class="hero-gradient-2" data-astro-cid-dhfotatx></div> <div class="hero-grain" data-astro-cid-dhfotatx></div> </div> <div class="container hero-content" data-astro-cid-dhfotatx> <div class="hero-eyebrow" data-astro-cid-dhfotatx> <span class="eyebrow-dot" data-astro-cid-dhfotatx></span> <span data-astro-cid-dhfotatx>AI Practitioner · BanbaiGuan AI</span> </div> <h1 class="hero-title" data-astro-cid-dhfotatx>
At 50, I use AI<br data-astro-cid-dhfotatx>to turn ideas into reality
</h1> <p class="hero-subtitle" data-astro-cid-dhfotatx>
Co-founder of MonolithIoT · AIoT Practitioner · BanbaiGuan AI
</p> <p class="hero-description" data-astro-cid-dhfotatx>
This is not a typical personal website.<br data-astro-cid-dhfotatx>
My AI assistant and I built it from scratch, together.<br data-astro-cid-dhfotatx> <span style="font-size: 14px; color: var(--color-text-tertiary);" data-astro-cid-dhfotatx>AI tool practices · Digital smart inventory management · My honest 50-year-old AI learning journey</span> </p> <div class="hero-actions" data-astro-cid-dhfotatx> <a href="/en/diary/" class="btn btn-primary" data-astro-cid-dhfotatx>Read My Diary <span class="btn-arrow" data-astro-cid-dhfotatx>→</span></a> <a href="/en/about/" class="btn btn-ghost" data-astro-cid-dhfotatx>Learn More</a> </div> </div> <div class="hero-scroll-hint" data-astro-cid-dhfotatx> <span class="scroll-line" data-astro-cid-dhfotatx></span> <span class="scroll-text" data-astro-cid-dhfotatx>Scroll down</span> </div> </section>  <section class="content-grid" data-astro-cid-dhfotatx> <div class="container" data-astro-cid-dhfotatx> <div class="grid-header" data-astro-cid-dhfotatx> <div class="section-title" data-astro-cid-dhfotatx>Latest Updates</div> <a href="/en/diary/" class="section-more" data-astro-cid-dhfotatx>View Full Timeline <span class="arrow" data-astro-cid-dhfotatx>→</span></a> </div> <div class="grid-cards" data-astro-cid-dhfotatx> <!-- Latest Diary --> <a href="/en/diary/" class="grid-card card-diary" data-astro-cid-dhfotatx> <div class="card-label" data-astro-cid-dhfotatx> <span class="label-icon" data-astro-cid-dhfotatx>📓</span> <span class="label-text" data-astro-cid-dhfotatx>Diary</span> </div> <div class="card-date" data-astro-cid-dhfotatx>${latest.date}</div> <h3 class="card-heading" data-astro-cid-dhfotatx>${latest.titleEn}</h3> <p class="card-excerpt" data-astro-cid-dhfotatx>${latest.summaryEn}</p> </a> <!-- AI News --> <a href="/en/ai-news/" class="grid-card card-news" data-astro-cid-dhfotatx> <div class="card-label" data-astro-cid-dhfotatx> <span class="label-icon" data-astro-cid-dhfotatx>📡</span> <span class="label-text" data-astro-cid-dhfotatx>AI News</span> </div> <div class="card-date" data-astro-cid-dhfotatx>${latestSummary.date} · ${latestSummary.newsItems.length} items</div> <h3 class="card-heading" data-astro-cid-dhfotatx>${latestSummary.titleEn}</h3> <p class="card-excerpt" data-astro-cid-dhfotatx>${latestSummary.summaryEn}</p> <div class="card-comment" data-astro-cid-dhfotatx> <span class="comment-icon" data-astro-cid-dhfotatx>💡</span> ${latestSummary.commentEn} </div> </a> <!-- BanbaiGuan --> <a href="/en/banbaiguan/" class="grid-card card-article" data-astro-cid-dhfotatx> <div class="card-label" data-astro-cid-dhfotatx> <span class="label-icon" data-astro-cid-dhfotatx>🎯</span> <span class="label-text" data-astro-cid-dhfotatx>BanbaiGuan AI</span> </div> <div class="card-date" data-astro-cid-dhfotatx>${latestArticle.date} · ${articles.length} articles</div> <h3 class="card-heading" data-astro-cid-dhfotatx>${latestArticle.titleEn}</h3> <p class="card-excerpt" data-astro-cid-dhfotatx>${latestArticle.excerptEn}</p> </a> </div> </div> </section>  <section class="page-section" data-astro-cid-dhfotatx> <div class="container" data-astro-cid-dhfotatx> <div class="section-title" data-astro-cid-dhfotatx>AI Projects</div> <div class="placeholder-card" data-astro-cid-dhfotatx> <p data-astro-cid-dhfotatx>Coming soon <span class="placeholder-dots" data-astro-cid-dhfotatx>· · ·</span></p> </div> </div> </section>  <section class="page-section" data-astro-cid-dhfotatx> <div class="container" data-astro-cid-dhfotatx> <div class="section-title" data-astro-cid-dhfotatx>About the Company</div> <div class="company-card" data-astro-cid-dhfotatx> <div class="company-badge" data-astro-cid-dhfotatx>National High-Tech Enterprise</div> <h2 data-astro-cid-dhfotatx>MonolithIoT (Changzhou) Co., Ltd.</h2> <p class="company-desc" data-astro-cid-dhfotatx>An AI scenario solutions provider. Built on three core technologies: multi-sensor fusion, AI-powered storage middleware, and multimodal algorithms — digitizing the entire industrial chain.</p> <div class="company-clients" data-astro-cid-dhfotatx> <span class="client-label" data-astro-cid-dhfotatx>Trusted by</span> <span class="client-name" data-astro-cid-dhfotatx>State Grid</span> <span class="client-name" data-astro-cid-dhfotatx>Huawei</span> <span class="client-name" data-astro-cid-dhfotatx>SF Express</span> <span class="client-name" data-astro-cid-dhfotatx>DHL</span> </div> <div class="company-actions" data-astro-cid-dhfotatx> <a href="/en/about/" class="link-arrow" data-astro-cid-dhfotatx>Learn More</a> <a href="https://www.monolithiot.com" class="link-arrow" target="_blank" rel="noopener" data-astro-cid-dhfotatx>Visit Company Site →</a> </div> </div> </div> </section>  <section class="follow-section" data-astro-cid-dhfotatx> <div class="container" data-astro-cid-dhfotatx> <div class="section-title" style="text-align: center;" data-astro-cid-dhfotatx>Follow Us</div> <p class="follow-subtitle" data-astro-cid-dhfotatx>Search "BanbaiGuan AI" on all platforms to find us</p> <div class="follow-qr-codes" data-astro-cid-dhfotatx> <div class="follow-qr-item" data-astro-cid-dhfotatx> <img src="/gzh-qr.jpg" alt="WeChat BanbaiGuan AI" loading="lazy" data-astro-cid-dhfotatx> <span class="follow-qr-label" data-astro-cid-dhfotatx>WeChat</span> </div> <div class="follow-qr-item" data-astro-cid-dhfotatx> <img src="/dy-qr.jpg" alt="Video Account BanbaiGuan AI" loading="lazy" data-astro-cid-dhfotatx> <span class="follow-qr-label" data-astro-cid-dhfotatx>Video Account</span> </div> <div class="follow-qr-item" data-astro-cid-dhfotatx> <img src="/douyin-qr.jpg" alt="Douyin BanbaiGuan AI" loading="lazy" data-astro-cid-dhfotatx> <span class="follow-qr-label" data-astro-cid-dhfotatx>Douyin</span> </div> </div> </div> </section> ` })} `;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/en/index.astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/en/index.astro";
const $$url = "/en";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
