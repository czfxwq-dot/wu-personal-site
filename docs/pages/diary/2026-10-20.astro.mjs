import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../../chunks/Base_DlE_7__V.mjs';
/* empty css                                         */
export { renderers } from '../../renderers.mjs';

const $$20261020 = createComponent(($$result, $$props, $$slots) => {
  const diaryJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "\u81EA\u52A8\u5316\u7684\u7B2C\u4E00\u6B65\uFF1A\u8BA9\u7CFB\u7EDF\u81EA\u5DF1\u8DD1\u8D77\u6765",
    "datePublished": "2026-10-20",
    "dateModified": "2026-10-20",
    "description": "\u5EFA\u7AD9\u7B2C174\u5929\u3002\u8FC1\u79FB\u5B8C\u6210\u540E\uFF0C\u5F00\u59CB\u642D\u5EFA\u81EA\u52A8\u5316\u7CFB\u7EDF\u3002\u4F46\u81EA\u52A8\u5316\u4E0D\u662F\u76EE\u7684\uFF0C\u800C\u662F\u624B\u6BB5\u3002",
    "author": {
      "@type": "Person",
      "name": "\u5434\u603B",
      "alternateName": "\u89C2\u543E"
    }
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": "\u89C2\u543E\u65E5\u8BB0 | 2026-10-20 | \u81EA\u52A8\u5316\u7684\u7B2C\u4E00\u6B65\uFF1A\u8BA9\u7CFB\u7EDF\u81EA\u5DF1\u8DD1\u8D77\u6765", "jsonLd": diaryJsonLd, "ogDescription": "\u5EFA\u7AD9\u7B2C174\u5929\u3002\u8FC1\u79FB\u5B8C\u6210\u540E\uFF0C\u5F00\u59CB\u642D\u5EFA\u81EA\u52A8\u5316\u7CFB\u7EDF\u3002\u4F46\u81EA\u52A8\u5316\u4E0D\u662F\u76EE\u7684\uFF0C\u800C\u662F\u624B\u6BB5\u3002", "navActive": "diary", "data-astro-cid-3ydf7zay": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="diary-entry" data-astro-cid-3ydf7zay> <header class="diary-header" data-astro-cid-3ydf7zay> <time datetime="2026-10-20" data-astro-cid-3ydf7zay>2026-10-20</time> <span class="diary-day" data-astro-cid-3ydf7zay>自动化的第一步：让系统自己跑起来</span> </header> <div class="diary-content" data-astro-cid-3ydf7zay> <p data-astro-cid-3ydf7zay>建站第 174 天。</p> <h2 data-astro-cid-3ydf7zay>今天做了什么</h2> <p data-astro-cid-3ydf7zay>迁移完成后，开始搭建自动化系统。创建了自动日记和AI新闻的定时任务，让网站能够每天自动更新内容。</p> <h2 data-astro-cid-3ydf7zay>自动化的意义</h2> <p data-astro-cid-3ydf7zay><strong data-astro-cid-3ydf7zay>自动化不是目的，而是手段。</strong></p> <p data-astro-cid-3ydf7zay>很多人会问：为什么要自动化？是为了偷懒吗？</p> <p data-astro-cid-3ydf7zay>不完全是。自动化的真正意义在于：</p> <ol data-astro-cid-3ydf7zay> <li data-astro-cid-3ydf7zay><strong data-astro-cid-3ydf7zay>释放注意力</strong> - 把重复性工作交给机器，把精力放在创造性工作上</li> <li data-astro-cid-3ydf7zay><strong data-astro-cid-3ydf7zay>保持一致性</strong> - 人会偷懒，但机器不会。每天准时更新，形成习惯和节奏</li> <li data-astro-cid-3ydf7zay><strong data-astro-cid-3ydf7zay>降低心理负担</strong> - 知道系统在自动运行，就不会焦虑"今天还没更新"</li> </ol> <h2 data-astro-cid-3ydf7zay>但自动化也有陷阱</h2> <p data-astro-cid-3ydf7zay><strong data-astro-cid-3ydf7zay>自动化最容易让人陷入"虚假的勤奋"。</strong></p> <p data-astro-cid-3ydf7zay>系统每天自动生成日记和AI新闻，看起来很忙。但如果生成的内容质量不高，那只是"自动化地生产垃圾"。</p> <p data-astro-cid-3ydf7zay>所以自动化的前提是：</p> <ul data-astro-cid-3ydf7zay> <li data-astro-cid-3ydf7zay>有清晰的质量标准</li> <li data-astro-cid-3ydf7zay>有验证机制</li> <li data-astro-cid-3ydf7zay>有人工审查环节</li> </ul> <p data-astro-cid-3ydf7zay>我设置的自动化系统会每天生成基础内容，但我会在每周回顾时检查质量，必要时手动补充深度内容。</p> <h2 data-astro-cid-3ydf7zay>技术实现</h2> <p data-astro-cid-3ydf7zay>今天的自动化系统包括：</p> <ul data-astro-cid-3ydf7zay> <li data-astro-cid-3ydf7zay><strong data-astro-cid-3ydf7zay>auto-diary.py</strong> - 分析当天git提交，生成日记草稿</li> <li data-astro-cid-3ydf7zay><strong data-astro-cid-3ydf7zay>auto-news.py</strong> - 从RSS源采集AI新闻，生成新闻汇总</li> <li data-astro-cid-3ydf7zay><strong data-astro-cid-3ydf7zay>Windows定时任务</strong> - 每天22:00自动运行脚本</li> <li data-astro-cid-3ydf7zay><strong data-astro-cid-3ydf7zay>GitHub Actions</strong> - 自动构建和部署网站</li> </ul> <p data-astro-cid-3ydf7zay>整个链路是：定时任务触发脚本 → 生成内容 → git提交 → GitHub Actions构建 → 部署到Cloudflare Pages。</p> <h2 data-astro-cid-3ydf7zay>一个反思</h2> <p data-astro-cid-3ydf7zay><strong data-astro-cid-3ydf7zay>自动化是放大器，不是替代品。</strong></p> <p data-astro-cid-3ydf7zay>如果你的工作流本身有问题，自动化只会让问题更快地重复。如果你的内容质量不高，自动化只会让你更快地生产低质量内容。</p> <p data-astro-cid-3ydf7zay>所以，在自动化之前，先确保你的工作流是正确的，你的标准是清晰的。</p> <p data-astro-cid-3ydf7zay>今天的自动化系统，建立在之前几个月的手动实践基础上。我知道什么样的日记是有价值的，什么样的AI新闻是值得关注的。这些判断标准，是自动化的前提。</p> <p data-astro-cid-3ydf7zay><strong data-astro-cid-3ydf7zay>建站第 174 天。自动化不是终点，而是新的起点。让系统跑起来，但不要忘记为什么出发。</strong></p> </div> <footer class="diary-footer" data-astro-cid-3ydf7zay> <nav class="diary-nav" data-astro-cid-3ydf7zay> <a href="/diary/2026-10-19/" class="prev" data-astro-cid-3ydf7zay>← 前一天</a> <a href="/diary/" class="all" data-astro-cid-3ydf7zay>所有日记</a> <a href="/diary/2026-10-21/" class="next" data-astro-cid-3ydf7zay>后一天 →</a> </nav> </footer> </article> ` })} `;
}, "C:/Users/czfxw/Desktop/claude\u9879\u76EE/wu-personal-site/src/pages/diary/2026-10-20.astro", void 0);

const $$file = "C:/Users/czfxw/Desktop/claude项目/wu-personal-site/src/pages/diary/2026-10-20.astro";
const $$url = "/diary/2026-10-20";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$20261020,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
