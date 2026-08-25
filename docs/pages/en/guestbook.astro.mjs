import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../../chunks/Base_DZlGkYtv.mjs';
import { promises } from 'fs';
import path from 'path';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const guestbookJsonLd = {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    "name": "Guestbook | Guanwu",
    "description": "Leave a message for Guanwu \u2014 AI will auto-reply to every message",
    "url": "https://ban-bai.com/en/guestbook/",
    "inLanguage": "en"
  };
  let messages = [];
  try {
    const DATA_FILE = path.resolve("./src/data/guestbook.json");
    const raw = await promises.readFile(DATA_FILE, "utf-8");
    messages = JSON.parse(raw).reverse();
  } catch {
  }
  function formatDate(iso) {
    const d = new Date(iso);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "lang": "en", "title": "Guestbook | Guanwu", "jsonLd": guestbookJsonLd, "navActive": "guestbook", "data-astro-cid-yaifzk4v": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="page-section" data-astro-cid-yaifzk4v> <h1 data-astro-cid-yaifzk4v>Guestbook</h1> <p class="subtitle" style="margin-bottom: 8px;" data-astro-cid-yaifzk4v>
Leave a message for Guanwu, AI will auto-reply ✍️
</p> <p style="font-size: 13px; color: var(--color-text-light); margin-bottom: 32px; font-style: italic;" data-astro-cid-yaifzk4v>
💡 Fully self-operated, no third-party platform dependency
</p> <!-- Form --> <div class="guestbook-form-card" data-astro-cid-yaifzk4v> <h3 style="margin-bottom: 16px;" data-astro-cid-yaifzk4v>✏️ Leave a Message</h3> <form id="guestbook-form" data-astro-cid-yaifzk4v> <div class="form-group" data-astro-cid-yaifzk4v> <label for="gb-name" data-astro-cid-yaifzk4v>Your Name</label> <input type="text" id="gb-name" name="name" placeholder="What should we call you?" required maxlength="20" data-astro-cid-yaifzk4v> </div> <div class="form-group" data-astro-cid-yaifzk4v> <label for="gb-email" data-astro-cid-yaifzk4v>Email (optional, for reply notifications)</label> <input type="email" id="gb-email" name="email" placeholder="example@email.com" data-astro-cid-yaifzk4v> </div> <div class="form-group" data-astro-cid-yaifzk4v> <label for="gb-content" data-astro-cid-yaifzk4v>Message</label> <textarea id="gb-content" name="content" rows="4" placeholder="What's on your mind?" required maxlength="500" data-astro-cid-yaifzk4v></textarea> <span class="char-count" data-astro-cid-yaifzk4v><span id="char-count" data-astro-cid-yaifzk4v>0</span>/500</span> </div> <button type="submit" id="submit-btn" class="submit-btn" data-astro-cid-yaifzk4v> <span class="btn-text" data-astro-cid-yaifzk4v>Submit</span> <span class="btn-loading" style="display: none;" data-astro-cid-yaifzk4v>Submitting...</span> </button> </form> <div id="form-success" class="success-msg" style="display: none;" data-astro-cid-yaifzk4v>
✅ Message submitted! AI assistant will reply as soon as possible 💬
</div> <div id="form-error" class="error-msg" style="display: none;" data-astro-cid-yaifzk4v></div> </div> <!-- Messages --> <div style="margin-top: 40px;" data-astro-cid-yaifzk4v> <h3 style="margin-bottom: 20px;" data-astro-cid-yaifzk4v>💬 Past Messages</h3> ${messages.length === 0 ? renderTemplate`<p class="empty-state" data-astro-cid-yaifzk4v>No messages yet — be the first to leave one ✍️</p>` : messages.map((msg) => renderTemplate`<div class="message-card" data-astro-cid-yaifzk4v> <div class="message-header" data-astro-cid-yaifzk4v> <span class="message-author" data-astro-cid-yaifzk4v>${msg.name}</span> <span class="message-date" data-astro-cid-yaifzk4v>${formatDate(msg.createdAt)}</span> </div> <p class="message-content" data-astro-cid-yaifzk4v>${msg.content}</p> ${msg.reply && renderTemplate`<div class="message-reply" data-astro-cid-yaifzk4v> <strong data-astro-cid-yaifzk4v>AI Reply: </strong>${msg.reply} </div>`} </div>`)} </div> </section> ` })}  `;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/en/guestbook/index.astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/en/guestbook/index.astro";
const $$url = "/en/guestbook";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
