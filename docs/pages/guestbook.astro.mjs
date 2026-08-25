import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../chunks/Base_C123y-OE.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const guestbookJsonLd = {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    "name": "\u7559\u8A00\u677F | \u89C2\u543E",
    "description": "\u7ED9\u89C2\u543E\u7559\u53E5\u8BDD\uFF0CAI \u4F1A\u81EA\u52A8\u56DE\u590D\u4F60",
    "url": "https://ban-bai.com/guestbook/"
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": "\u7559\u8A00\u677F | \u7ED9\u89C2\u543E\u7559\u53E5\u8BDD", "jsonLd": guestbookJsonLd, "ogDescription": "\u60F3\u8BF4\u4EC0\u4E48\u76F4\u63A5\u5199\uFF0CAI \u4F1A\u81EA\u52A8\u56DE\u590D\u4F60\u3002\u533F\u540D\u7559\u8A00\uFF0C\u96F6\u95E8\u69DB\u3002", "navActive": "guestbook", "data-astro-cid-hvbrr6gx": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="page-section" data-astro-cid-hvbrr6gx> <h1 data-astro-cid-hvbrr6gx>留言板</h1> <p class="subtitle" style="margin-bottom: 8px;" data-astro-cid-hvbrr6gx>
想说什么直接写，AI 会自动回复你 ✍️
</p> <p style="font-size: 13px; color: var(--color-text-light); margin-bottom: 40px; font-style: italic;" data-astro-cid-hvbrr6gx>
匿名留言，零门槛 — 建议、合作、吐槽、鼓励，什么都可以
</p> <!-- 留言表单 — 极简设计 --> <div class="guestbook-card" id="guestbook-card" data-astro-cid-hvbrr6gx> <div class="input-area" data-astro-cid-hvbrr6gx> <div class="whiteboard" data-astro-cid-hvbrr6gx> <textarea id="gb-content" placeholder="想说点什么？

比如：
· 你们的 AI 新闻挺及时
· 建议加个暗色模式
· 有没有合作的可能" maxlength="1000" data-astro-cid-hvbrr6gx></textarea> <span id="char-count" class="char-count" data-astro-cid-hvbrr6gx>0/1000</span> </div> </div> <div class="contact-area" id="contact-area" data-astro-cid-hvbrr6gx> <button type="button" class="contact-toggle" id="contact-toggle" data-astro-cid-hvbrr6gx> <span class="toggle-icon" data-astro-cid-hvbrr6gx>+</span>
留个联系方式，方便回复你（可选）
</button> <div class="contact-fields" id="contact-fields" style="display: none;" data-astro-cid-hvbrr6gx> <input type="text" id="gb-contact" placeholder="微信 / 邮箱 / 手机号，怎么方便怎么留" maxlength="100" data-astro-cid-hvbrr6gx> </div> </div> <button type="button" class="submit-btn" id="submit-btn" data-astro-cid-hvbrr6gx> <span class="btn-text" data-astro-cid-hvbrr6gx>提交</span> <span class="btn-loading" style="display: none;" data-astro-cid-hvbrr6gx> <span class="spinner" data-astro-cid-hvbrr6gx></span>
AI 正在阅读你的留言…
</span> </button> </div> <!-- AI 即时回复卡片 --> <div id="reply-card" class="reply-card" style="display: none;" data-astro-cid-hvbrr6gx> <div class="reply-header" data-astro-cid-hvbrr6gx> <span class="reply-category" id="reply-category" data-astro-cid-hvbrr6gx></span> <span class="reply-time" id="reply-time" data-astro-cid-hvbrr6gx></span> </div> <div class="reply-content" id="reply-content" data-astro-cid-hvbrr6gx></div> <div class="reply-footer" data-astro-cid-hvbrr6gx> <button class="share-btn" id="share-btn" data-astro-cid-hvbrr6gx> <span data-astro-cid-hvbrr6gx>↗</span> 分享这条回复
</button> </div> </div> <!-- 往期留言 --> <div class="messages-section" id="messages-section" data-astro-cid-hvbrr6gx> <h3 style="margin-bottom: 20px; font-size: 16px;" data-astro-cid-hvbrr6gx>
近期留言
<span id="message-count" class="message-count" style="font-size: 13px; color: var(--color-text-light); font-weight: 400;" data-astro-cid-hvbrr6gx></span> </h3> <div id="messages-list" class="messages-list" data-astro-cid-hvbrr6gx> <div class="loading-placeholder" data-astro-cid-hvbrr6gx> <span class="spinner-small" data-astro-cid-hvbrr6gx></span>
加载中…
</div> </div> </div> </section> ` })}  `;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/guestbook/index.astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/guestbook/index.astro";
const $$url = "/guestbook";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
