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
    "@type": "WebPage",
    "name": "\u4E91\u534A\u767E\u5C0F\u9F99\u867E - \u5728\u7EBF\u4E1A\u52A1\u54A8\u8BE2",
    "description": "\u4E91\u534A\u767E\u5C0F\u9F99\u867E\u4E1A\u52A1\u5728\u7EBF\u54A8\u8BE2\u670D\u52A1\uFF0C\u4EA7\u54C1\u8BA2\u8D2D\u3001\u52A0\u76DF\u5408\u4F5C\u3001\u552E\u540E\u652F\u6301\u4E00\u7AD9\u5F0F\u670D\u52A1",
    "url": "https://ban-bai.com/lobster/"
  };
  return renderTemplate(_a || (_a = __template(["", "  <script>\n  function openLobsterChat(event, message) {\n    event.preventDefault();\n    var toggleBtn = document.getElementById('chat-toggle-btn');\n    if (toggleBtn) {\n      toggleBtn.click();\n      setTimeout(function() {\n        var input = document.getElementById('chat-input');\n        var sendBtn = document.getElementById('chat-send-btn');\n        if (input && sendBtn) {\n          input.value = message;\n          input.dispatchEvent(new Event('input'));\n          setTimeout(function() {\n            sendBtn.click();\n          }, 300);\n        }\n      }, 400);\n    }\n  }\n<\/script>"])), renderComponent($$result, "BaseLayout", $$Base, { "title": "\u4E91\u534A\u767E\u5C0F\u9F99\u867E - \u5728\u7EBF\u4E1A\u52A1\u54A8\u8BE2 | \u89C2\u543E", "jsonLd": pageJsonLd, "ogDescription": "\u4E91\u534A\u767E\u5C0F\u9F99\u867E\u4E1A\u52A1\u5728\u7EBF\u54A8\u8BE2\u670D\u52A1\uFF0C\u4EA7\u54C1\u8BA2\u8D2D\u3001\u52A0\u76DF\u5408\u4F5C\u3001\u552E\u540E\u652F\u6301\u4E00\u7AD9\u5F0F\u670D\u52A1", "navActive": "home", "data-astro-cid-dtlyosgt": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="hero" data-astro-cid-dtlyosgt> <div class="container" data-astro-cid-dtlyosgt> <span class="hero-tag" data-astro-cid-dtlyosgt>🦞 云半百小龙虾</span> <h1 data-astro-cid-dtlyosgt>
云半百小龙虾
<span data-astro-cid-dtlyosgt>新鲜·正宗·美味</span> </h1> <p class="subtitle" data-astro-cid-dtlyosgt>
点击右下角🦞按钮，立即咨询我们的业务顾问<br data-astro-cid-dtlyosgt>
产品订购、加盟合作、售后支持，一站式在线服务
</p> </div> </section>  <section class="page-section" data-astro-cid-dtlyosgt> <div class="container" data-astro-cid-dtlyosgt> <div class="section-title" data-astro-cid-dtlyosgt>我们的服务</div> <div class="services-grid" data-astro-cid-dtlyosgt> <div class="service-card" data-astro-cid-dtlyosgt> <div class="service-icon" data-astro-cid-dtlyosgt>🍤</div> <h3 data-astro-cid-dtlyosgt>产品订购</h3> <p data-astro-cid-dtlyosgt>多种口味小龙虾，麻辣、蒜香、十三香...新鲜配送到家</p> <a href="#" class="service-link" onclick="openLobsterChat(event, '我想订购小龙虾，有什么口味？')" data-astro-cid-dtlyosgt>在线咨询 →</a> </div> <div class="service-card" data-astro-cid-dtlyosgt> <div class="service-icon" data-astro-cid-dtlyosgt>🤝</div> <h3 data-astro-cid-dtlyosgt>加盟合作</h3> <p data-astro-cid-dtlyosgt>成熟的商业模式，完整的供应链支持，低门槛创业</p> <a href="#" class="service-link" onclick="openLobsterChat(event, '我想了解加盟政策')" data-astro-cid-dtlyosgt>了解详情 →</a> </div> <div class="service-card" data-astro-cid-dtlyosgt> <div class="service-icon" data-astro-cid-dtlyosgt>🚚</div> <h3 data-astro-cid-dtlyosgt>冷链配送</h3> <p data-astro-cid-dtlyosgt>全程冷链保鲜，同城当日达，全国48小时送达</p> <a href="#" class="service-link" onclick="openLobsterChat(event, '你们的配送范围和时间是怎样的？')" data-astro-cid-dtlyosgt>查询配送 →</a> </div> <div class="service-card" data-astro-cid-dtlyosgt> <div class="service-icon" data-astro-cid-dtlyosgt>📋</div> <h3 data-astro-cid-dtlyosgt>售后支持</h3> <p data-astro-cid-dtlyosgt>7天无理由退换，品质保证，24小时在线客服</p> <a href="#" class="service-link" onclick="openLobsterChat(event, '我需要售后服务')" data-astro-cid-dtlyosgt>联系售后 →</a> </div> </div> </div> </section>  <section class="page-section" data-astro-cid-dtlyosgt> <div class="container" data-astro-cid-dtlyosgt> <div class="section-title" data-astro-cid-dtlyosgt>品牌故事</div> <div class="brand-story" data-astro-cid-dtlyosgt> <h2 data-astro-cid-dtlyosgt>云半百小龙虾</h2> <p data-astro-cid-dtlyosgt>源自对品质的执着追求，每一只小龙虾都经过严格筛选，确保新鲜、安全、美味。我们致力于为消费者提供最优质的龙虾餐饮体验。</p> <div class="brand-stats" data-astro-cid-dtlyosgt> <div class="stat" data-astro-cid-dtlyosgt> <span class="stat-number" data-astro-cid-dtlyosgt>100%</span> <span class="stat-label" data-astro-cid-dtlyosgt>活虾现做</span> </div> <div class="stat" data-astro-cid-dtlyosgt> <span class="stat-number" data-astro-cid-dtlyosgt>24h</span> <span class="stat-label" data-astro-cid-dtlyosgt>在线客服</span> </div> <div class="stat" data-astro-cid-dtlyosgt> <span class="stat-number" data-astro-cid-dtlyosgt>7天</span> <span class="stat-label" data-astro-cid-dtlyosgt>无理由退换</span> </div> </div> </div> </div> </section>  <section class="page-section chat-cta" data-astro-cid-dtlyosgt> <div class="container" data-astro-cid-dtlyosgt> <div class="cta-card" data-astro-cid-dtlyosgt> <h2 data-astro-cid-dtlyosgt>💬 需要帮助？</h2> <p data-astro-cid-dtlyosgt>点击右下角的🦞按钮，与我们的AI业务顾问对话</p> <p class="cta-hint" data-astro-cid-dtlyosgt>支持产品咨询、订购引导、加盟合作、售后支持等</p> </div> </div> </section> ` }));
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/lobster/index.astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/lobster/index.astro";
const $$url = "/lobster";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
