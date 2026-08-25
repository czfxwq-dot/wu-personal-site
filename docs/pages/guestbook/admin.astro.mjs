import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../../chunks/Base_DZlGkYtv.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Admin = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": "\u7559\u8A00\u677F\u7BA1\u7406 | \u89C2\u543E", "jsonLd": { "@context": "https://schema.org", "@type": "WebPage", "name": "\u7559\u8A00\u677F\u7BA1\u7406" }, "lang": "zh", "data-astro-cid-ikeph5zy": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="admin-section" data-astro-cid-ikeph5zy> <div class="admin-header" data-astro-cid-ikeph5zy> <h1 data-astro-cid-ikeph5zy>留言板管理</h1> <div class="admin-meta" data-astro-cid-ikeph5zy> <span id="last-refresh" data-astro-cid-ikeph5zy>加载中…</span> <button class="refresh-btn" id="refresh-btn" data-astro-cid-ikeph5zy>↻ 刷新</button> </div> </div> <!-- 关键指标 --> <div class="stats-grid" id="stats-grid" data-astro-cid-ikeph5zy> <div class="stat-card stat-needs-owner" data-astro-cid-ikeph5zy> <span class="stat-number" id="stat-needs-owner" data-astro-cid-ikeph5zy>—</span> <span class="stat-label" data-astro-cid-ikeph5zy>🔔 需要你处理</span> </div> <div class="stat-card" data-astro-cid-ikeph5zy> <span class="stat-number" id="stat-total" data-astro-cid-ikeph5zy>—</span> <span class="stat-label" data-astro-cid-ikeph5zy>总留言</span> </div> <div class="stat-card stat-suggestion" data-astro-cid-ikeph5zy> <span class="stat-number" id="stat-suggestion" data-astro-cid-ikeph5zy>—</span> <span class="stat-label" data-astro-cid-ikeph5zy>💡 建议</span> </div> <div class="stat-card stat-bug" data-astro-cid-ikeph5zy> <span class="stat-number" id="stat-bug" data-astro-cid-ikeph5zy>—</span> <span class="stat-label" data-astro-cid-ikeph5zy>🔧 问题</span> </div> <div class="stat-card stat-cooperation" data-astro-cid-ikeph5zy> <span class="stat-number" id="stat-cooperation" data-astro-cid-ikeph5zy>—</span> <span class="stat-label" data-astro-cid-ikeph5zy>🤝 合作</span> </div> <div class="stat-card stat-praise" data-astro-cid-ikeph5zy> <span class="stat-number" id="stat-praise" data-astro-cid-ikeph5zy>—</span> <span class="stat-label" data-astro-cid-ikeph5zy>❤️ 鼓励</span> </div> </div> <!-- 快速筛选 --> <div class="filter-bar" data-astro-cid-ikeph5zy> <span class="filter-label" data-astro-cid-ikeph5zy>筛选：</span> <button class="filter-btn active" data-filter="all" data-astro-cid-ikeph5zy>全部</button> <button class="filter-btn" data-filter="needs-owner" style="border-color:#ef4444;color:#ef4444;" data-astro-cid-ikeph5zy>🔔 需你处理</button> <button class="filter-btn" data-filter="suggestion" data-astro-cid-ikeph5zy>💡 建议</button> <button class="filter-btn" data-filter="cooperation" data-astro-cid-ikeph5zy>🤝 合作</button> <button class="filter-btn" data-filter="bug" data-astro-cid-ikeph5zy>🔧 问题</button> <button class="filter-btn" data-filter="inquiry" data-astro-cid-ikeph5zy>❓ 咨询</button> </div> <!-- 留言列表 --> <div class="admin-messages" id="admin-messages" data-astro-cid-ikeph5zy> <div class="loading-state" data-astro-cid-ikeph5zy>加载中…</div> </div> </section> ` })}  `;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/guestbook/admin.astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/guestbook/admin.astro";
const $$url = "/guestbook/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
