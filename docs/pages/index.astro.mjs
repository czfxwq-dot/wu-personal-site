import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../chunks/Base_DZlGkYtv.mjs';
import { d as diaries } from '../chunks/diaries_Cp2V_aAK.mjs';
import { d as dailyNewsSummaries } from '../chunks/ai-news-summary_BXsYL6Cd.mjs';
import { a as articles } from '../chunks/articles_B8r8olXt.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "\u89C2\u543E | 50\u5C81\u7528AI\u505A\u5B9E\u4E8B \u2014 AI\u5DE5\u5177\u843D\u5730\u5B9E\u8DF5 \xB7 \u534A\u767E\u89C2AI",
    "description": "\u89C2\u543E\uFF0C\u4E0D\u53EA\u662F\u4E00\u4E2A\u4EBA\u7684\u7F51\u7AD9\u2014\u2014\u8FD9\u662F\u6211\u548CAI\u52A9\u7406\u5171\u540C\u6210\u957F\u3001\u5171\u540C\u5B66\u4E60\u7684\u8BB0\u5F55\uFF0C\u4E5F\u662F50\u5C81\u7684\u521B\u4E1A\u8005\u5434\u603B\u501F\u52A9AI\u628A\u60F3\u6CD5\u53D8\u6210\u73B0\u5B9E\u7684\u771F\u5B9E\u6545\u4E8B",
    "url": "https://ban-bai.com",
    "isPartOf": {
      "@type": "WebSite",
      "name": "\u89C2\u543E",
      "url": "https://ban-bai.com"
    },
    "about": {
      "@type": "Person",
      "name": "\u5434\u603B",
      "alternateName": "\u89C2\u543E",
      "jobTitle": "\u8054\u5408\u521B\u59CB\u4EBA",
      "worksFor": {
        "@type": "Organization",
        "name": "\u78D0\u77F3\u7535\u6C14\uFF08\u5E38\u5DDE\uFF09\u6709\u9650\u516C\u53F8"
      }
    },
    "keywords": ["AI\u5DE5\u5177", "AI\u843D\u5730\u5B9E\u8DF5", "\u534A\u767E\u89C2AI", "AIoT", "\u6570\u5B57\u5316\u667A\u80FD\u5E93\u5B58", "50\u5C81\u5B66AI", "ChatGPT\u6559\u7A0B", "AI\u6548\u7387\u63D0\u5347"]
  };
  const latest = diaries[0];
  const latestSummary = dailyNewsSummaries[0];
  const latestArticle = articles[0];
  function truncate(str, maxLen) {
    if (!str) return "";
    if (str.length <= maxLen) return str;
    return str.slice(0, maxLen) + "\u2026";
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": "\u89C2\u543E | 50\u5C81\u7528AI\u505A\u5B9E\u4E8B \u2014 AI\u5DE5\u5177\u843D\u5730\u5B9E\u8DF5", "jsonLd": homeJsonLd, "ogDescription": "\u89C2\u543E\uFF0C\u4E0D\u53EA\u662F\u4E00\u4E2A\u4EBA\u7684\u7F51\u7AD9\u2014\u2014\u8FD9\u662F\u6211\u548CAI\u52A9\u7406\u5171\u540C\u6210\u957F\u3001\u5171\u540C\u5B66\u4E60\u7684\u8BB0\u5F55\uFF0C\u4E5F\u662F50\u5C81\u7684\u521B\u4E1A\u8005\u501F\u52A9AI\u628A\u60F3\u6CD5\u53D8\u6210\u73B0\u5B9E\u7684\u771F\u5B9E\u6545\u4E8B", "navActive": "home", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="hero" data-astro-cid-j7pv25f6> <div class="hero-bg" data-astro-cid-j7pv25f6> <div class="hero-gradient-1" data-astro-cid-j7pv25f6></div> <div class="hero-gradient-2" data-astro-cid-j7pv25f6></div> <div class="hero-grain" data-astro-cid-j7pv25f6></div> </div> <div class="container hero-content" data-astro-cid-j7pv25f6> <div class="hero-eyebrow" data-astro-cid-j7pv25f6> <span class="eyebrow-dot" data-astro-cid-j7pv25f6></span> <span data-astro-cid-j7pv25f6>AI 实践者 · 半百观AI主理人</span> </div> <h1 class="hero-title" data-astro-cid-j7pv25f6>
50岁，用AI<br data-astro-cid-j7pv25f6>把想法变成现实
</h1> <p class="hero-subtitle" data-astro-cid-j7pv25f6>
磐石电气联合创始人 · AIoT实践者 · 半百观AI主理人
</p> <p class="hero-description" data-astro-cid-j7pv25f6>
观吾，不只是一个人的网站——<br data-astro-cid-j7pv25f6>
这是我和AI助理共同成长、共同学习的记录，<br data-astro-cid-j7pv25f6>
也是我想与你分享的：一个50岁的创业者，如何借助AI把想法变成现实。
</p> <div class="hero-actions" data-astro-cid-j7pv25f6> <a href="/diary/" class="btn btn-primary" data-astro-cid-j7pv25f6>看工作日记 <span class="btn-arrow" data-astro-cid-j7pv25f6>→</span></a> <button class="btn btn-accent" id="hero-chat-btn" data-astro-cid-j7pv25f6>💬 和 AI 助理聊聊</button> <a href="/about/" class="btn btn-ghost" data-astro-cid-j7pv25f6>了解更多</a> </div> </div> <div class="hero-scroll-hint" data-astro-cid-j7pv25f6> <span class="scroll-line" data-astro-cid-j7pv25f6></span> <span class="scroll-text" data-astro-cid-j7pv25f6>向下滚动</span> </div> </section>  <section class="entry-section" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <div class="section-subtitle" data-astro-cid-j7pv25f6>你想了解什么？</div> <div class="entry-cards" data-astro-cid-j7pv25f6> <a href="/diary/" class="entry-card entry-learn" data-astro-cid-j7pv25f6> <span class="entry-icon" data-astro-cid-j7pv25f6>🛠️</span> <div class="entry-info" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>想学习 AI 工具</h3> <p data-astro-cid-j7pv25f6>看工作日记，每天记录真实实践</p> </div> <span class="entry-arrow" data-astro-cid-j7pv25f6>→</span> </a> <a href="/about/" class="entry-card entry-business" data-astro-cid-j7pv25f6> <span class="entry-icon" data-astro-cid-j7pv25f6>🏭</span> <div class="entry-info" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>想做企业 AI 落地</h3> <p data-astro-cid-j7pv25f6>了解磐石电气和 MonolithIoT 解决方案</p> </div> <span class="entry-arrow" data-astro-cid-j7pv25f6>→</span> </a> <a href="/banbaiguan/" class="entry-card entry-story" data-astro-cid-j7pv25f6> <span class="entry-icon" data-astro-cid-j7pv25f6>📖</span> <div class="entry-info" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>想看我如何用 AI 工作</h3> <p data-astro-cid-j7pv25f6>半百观AI文章 + AI 新闻 + 完整时间线</p> </div> <span class="entry-arrow" data-astro-cid-j7pv25f6>→</span> </a> </div> </div> </section>  <section class="content-grid" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <div class="grid-header" data-astro-cid-j7pv25f6> <div class="section-title" data-astro-cid-j7pv25f6>最近更新</div> <a href="/diary/" class="section-more" data-astro-cid-j7pv25f6>查看完整时间线 <span class="arrow" data-astro-cid-j7pv25f6>→</span></a> </div> <div class="grid-cards" data-astro-cid-j7pv25f6> <!-- 最新日记 --> <a href="/diary/" class="grid-card card-diary" data-astro-cid-j7pv25f6> <div class="card-label" data-astro-cid-j7pv25f6> <span class="label-icon" data-astro-cid-j7pv25f6>📓</span> <span class="label-text" data-astro-cid-j7pv25f6>工作日记</span> </div> <div class="card-date" data-astro-cid-j7pv25f6>${latest.date}</div> <h3 class="card-heading" data-astro-cid-j7pv25f6>${latest.title}</h3> <p class="card-excerpt" data-astro-cid-j7pv25f6>${truncate(latest.summary, 120)}</p> </a> <!-- AI新闻 --> <a href="/ai-news/" class="grid-card card-news" data-astro-cid-j7pv25f6> <div class="card-label" data-astro-cid-j7pv25f6> <span class="label-icon" data-astro-cid-j7pv25f6>📡</span> <span class="label-text" data-astro-cid-j7pv25f6>AI 新闻</span> </div> <div class="card-date" data-astro-cid-j7pv25f6>${latestSummary.date} · ${latestSummary.newsItems.length} 条</div> <h3 class="card-heading" data-astro-cid-j7pv25f6>${latestSummary.title}</h3> <p class="card-excerpt" data-astro-cid-j7pv25f6>${truncate(latestSummary.summary, 120)}</p> </a> <!-- 半百观 --> <a href="/banbaiguan/" class="grid-card card-article" data-astro-cid-j7pv25f6> <div class="card-label" data-astro-cid-j7pv25f6> <span class="label-icon" data-astro-cid-j7pv25f6>🎯</span> <span class="label-text" data-astro-cid-j7pv25f6>半百观AI</span> </div> <div class="card-date" data-astro-cid-j7pv25f6>${latestArticle.date} · ${articles.length} 篇</div> <h3 class="card-heading" data-astro-cid-j7pv25f6>${latestArticle.title}</h3> <p class="card-excerpt" data-astro-cid-j7pv25f6>${truncate(latestArticle.excerpt, 120)}</p> </a> </div> </div> </section>  <section class="page-section" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <div class="section-title" data-astro-cid-j7pv25f6>正在运行的 AI 实践</div> <div class="projects-grid" data-astro-cid-j7pv25f6> <div class="project-card" data-astro-cid-j7pv25f6> <span class="project-icon" data-astro-cid-j7pv25f6>🦞</span> <h3 data-astro-cid-j7pv25f6>山山 AI 助理</h3> <p data-astro-cid-j7pv25f6>基于 Gateway LLM 的智能对话系统，支持访客互动、知识库查询、内容推荐</p> <span class="project-status status-live" data-astro-cid-j7pv25f6>● 已上线</span> </div> <div class="project-card" data-astro-cid-j7pv25f6> <span class="project-icon" data-astro-cid-j7pv25f6>📰</span> <h3 data-astro-cid-j7pv25f6>自动化内容系统</h3> <p data-astro-cid-j7pv25f6>AI 新闻每日 07:00 自动采集、摘要、部署；飞书文档一键发布到网站</p> <span class="project-status status-live" data-astro-cid-j7pv25f6>● 已上线</span> </div> <div class="project-card" data-astro-cid-j7pv25f6> <span class="project-icon" data-astro-cid-j7pv25f6>📓</span> <h3 data-astro-cid-j7pv25f6>工作日记系统</h3> <p data-astro-cid-j7pv25f6>每日 22:00 自动生成工作日记，记录建站进展、经验教训、技术决策</p> <span class="project-status status-live" data-astro-cid-j7pv25f6>● 已上线</span> </div> <div class="project-card" data-astro-cid-j7pv25f6> <span class="project-icon" data-astro-cid-j7pv25f6>📊</span> <h3 data-astro-cid-j7pv25f6>AI 新闻系统</h3> <p data-astro-cid-j7pv25f6>多源 RSS + 国内搜索引擎采集，自动摘要、评论、发布到站点</p> <span class="project-status status-live" data-astro-cid-j7pv25f6>● 已上线</span> </div> <div class="project-card" data-astro-cid-j7pv25f6> <span class="project-icon" data-astro-cid-j7pv25f6>🔧</span> <h3 data-astro-cid-j7pv25f6>SKILL-A/B 内容生产</h3> <p data-astro-cid-j7pv25f6>选题决策 + 写作执行双流程，7问评分 + 18项自检，产出高质量半百观文章</p> <span class="project-status status-live" data-astro-cid-j7pv25f6>● 已上线</span> </div> </div> </div> </section>  <section class="page-section" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <div class="section-title" data-astro-cid-j7pv25f6>关于公司</div> <div class="company-card" data-astro-cid-j7pv25f6> <div class="company-badge" data-astro-cid-j7pv25f6>国家级高新技术企业</div> <h2 data-astro-cid-j7pv25f6>磐石电气（常州）有限公司</h2> <p class="company-desc" data-astro-cid-j7pv25f6>精准定位AI场景解决方案提供商。依托多传感器融合、智慧存储AI中台、多模态算法三大核心技术，打通场景数智化全链路。</p> <div class="company-clients" data-astro-cid-j7pv25f6> <span class="client-label" data-astro-cid-j7pv25f6>长期服务</span> <span class="client-name" data-astro-cid-j7pv25f6>国家电网</span> <span class="client-name" data-astro-cid-j7pv25f6>华为</span> <span class="client-name" data-astro-cid-j7pv25f6>顺丰</span> <span class="client-name" data-astro-cid-j7pv25f6>DHL</span> </div> <div class="company-actions" data-astro-cid-j7pv25f6> <a href="/about/" class="link-arrow" data-astro-cid-j7pv25f6>了解更多</a> <a href="https://www.monolithiot.com" class="link-arrow" target="_blank" rel="noopener" data-astro-cid-j7pv25f6>访问公司官网 →</a> </div> </div> </div> </section>  <section class="follow-section" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <div class="section-title" style="text-align: center;" data-astro-cid-j7pv25f6>关注「半百观AI」</div> <p class="follow-subtitle" data-astro-cid-j7pv25f6>50岁视角看AI工具落地实践</p> <div class="follow-qr-codes" data-astro-cid-j7pv25f6> <div class="follow-qr-item" data-astro-cid-j7pv25f6> <img src="/gzh-qr.jpg" alt="微信公众号 半百观AI" width="430" height="430" loading="lazy" data-astro-cid-j7pv25f6> <span class="follow-qr-label" data-astro-cid-j7pv25f6>微信公众号</span> </div> <div class="follow-qr-item" data-astro-cid-j7pv25f6> <img src="/dy-qr.jpg" alt="视频号 半百观AI" width="686" height="960" loading="lazy" data-astro-cid-j7pv25f6> <span class="follow-qr-label" data-astro-cid-j7pv25f6>视频号</span> </div> <div class="follow-qr-item" data-astro-cid-j7pv25f6> <img src="/douyin-qr.jpg" alt="抖音 半百观AI" width="1125" height="1385" loading="lazy" data-astro-cid-j7pv25f6> <span class="follow-qr-label" data-astro-cid-j7pv25f6>抖音</span> </div> </div> <p class="follow-search" data-astro-cid-j7pv25f6>也可在今日头条 · B站 · 西瓜视频 搜索「半百观AI」</p> </div> </section>  ` })} `;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/index.astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
