import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../../chunks/Base_DlE_7__V.mjs';
/* empty css                                         */
export { renderers } from '../../renderers.mjs';

const $$20261021 = createComponent(($$result, $$props, $$slots) => {
  const diaryJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "\u5B9A\u65F6\u4EFB\u52A1\uFF1A\u8BA9\u81EA\u52A8\u5316\u771F\u6B63\u843D\u5730",
    "datePublished": "2026-10-21",
    "dateModified": "2026-10-21",
    "description": "\u5EFA\u7AD9\u7B2C175\u5929\u3002\u521B\u5EFA\u4E86Windows\u5B9A\u65F6\u4EFB\u52A1\uFF0C\u8BA9\u81EA\u52A8\u5316\u7CFB\u7EDF\u771F\u6B63\u5F00\u59CB\u8FD0\u884C\u3002\u4F46\u5B9A\u65F6\u4EFB\u52A1\u53EA\u662F\u5F00\u59CB\uFF0C\u4E0D\u662F\u7ED3\u675F\u3002",
    "author": {
      "@type": "Person",
      "name": "\u5434\u603B",
      "alternateName": "\u89C2\u543E"
    }
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": "\u89C2\u543E\u65E5\u8BB0 | 2026-10-21 | \u5B9A\u65F6\u4EFB\u52A1\uFF1A\u8BA9\u81EA\u52A8\u5316\u771F\u6B63\u843D\u5730", "jsonLd": diaryJsonLd, "ogDescription": "\u5EFA\u7AD9\u7B2C175\u5929\u3002\u521B\u5EFA\u4E86Windows\u5B9A\u65F6\u4EFB\u52A1\uFF0C\u8BA9\u81EA\u52A8\u5316\u7CFB\u7EDF\u771F\u6B63\u5F00\u59CB\u8FD0\u884C\u3002\u4F46\u5B9A\u65F6\u4EFB\u52A1\u53EA\u662F\u5F00\u59CB\uFF0C\u4E0D\u662F\u7ED3\u675F\u3002", "navActive": "diary", "data-astro-cid-ga34rpkt": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="diary-entry" data-astro-cid-ga34rpkt> <header class="diary-header" data-astro-cid-ga34rpkt> <time datetime="2026-10-21" data-astro-cid-ga34rpkt>2026-10-21</time> <span class="diary-day" data-astro-cid-ga34rpkt>定时任务：让自动化真正落地</span> </header> <div class="diary-content" data-astro-cid-ga34rpkt> <p data-astro-cid-ga34rpkt>建站第 175 天。</p> <h2 data-astro-cid-ga34rpkt>今天做了什么</h2> <p data-astro-cid-ga34rpkt>创建了Windows定时任务，让自动化系统真正开始运行。每天22:00，系统会自动生成日记和AI新闻，然后构建部署到网站。</p> <h2 data-astro-cid-ga34rpkt>定时任务的实现</h2> <p data-astro-cid-ga34rpkt><strong data-astro-cid-ga34rpkt>定时任务的核心是：在正确的时间，做正确的事。</strong></p> <p data-astro-cid-ga34rpkt>我创建了两个定时任务：</p> <ol data-astro-cid-ga34rpkt> <li data-astro-cid-ga34rpkt><strong data-astro-cid-ga34rpkt>BanbaiGuan-AutoDiary</strong> - 每天22:00运行auto-diary.py，生成当天日记</li> <li data-astro-cid-ga34rpkt><strong data-astro-cid-ga34rpkt>BanbaiGuan-AutoNews</strong> - 每天22:00运行auto-news.py，采集AI新闻</li> </ol> <p data-astro-cid-ga34rpkt>选择22:00的原因是：</p> <ul data-astro-cid-ga34rpkt> <li data-astro-cid-ga34rpkt>一天的工作基本结束，可以总结当天的内容</li> <li data-astro-cid-ga34rpkt>晚上网络相对稳定，部署成功率高</li> <li data-astro-cid-ga34rpkt>第二天早上可以看到更新的内容</li> </ul> <h2 data-astro-cid-ga34rpkt>过程中的问题</h2> <p data-astro-cid-ga34rpkt><strong data-astro-cid-ga34rpkt>定时任务的创建并不顺利。</strong></p> <p data-astro-cid-ga34rpkt>遇到的问题包括：</p> <ul data-astro-cid-ga34rpkt> <li data-astro-cid-ga34rpkt><strong data-astro-cid-ga34rpkt>编码问题</strong> - Windows命令行的中文编码导致脚本执行失败</li> <li data-astro-cid-ga34rpkt><strong data-astro-cid-ga34rpkt>权限问题</strong> - 需要管理员权限才能创建定时任务</li> <li data-astro-cid-ga34rpkt><strong data-astro-cid-ga34rpkt>路径问题</strong> - 中文路径在某些情况下会导致问题</li> </ul> <p data-astro-cid-ga34rpkt>最终的解决方案是：</p> <ol data-astro-cid-ga34rpkt> <li data-astro-cid-ga34rpkt>使用PowerShell脚本而不是批处理文件</li> <li data-astro-cid-ga34rpkt>以管理员身份运行</li> <li data-astro-cid-ga34rpkt>使用绝对路径</li> </ol> <h2 data-astro-cid-ga34rpkt>自动化系统的完整链路</h2> <p data-astro-cid-ga34rpkt>现在整个自动化系统的链路是：</p> <ol data-astro-cid-ga34rpkt> <li data-astro-cid-ga34rpkt><strong data-astro-cid-ga34rpkt>22:00</strong> - Windows定时任务触发</li> <li data-astro-cid-ga34rpkt><strong data-astro-cid-ga34rpkt>22:00-22:05</strong> - 运行auto-diary.py和auto-news.py</li> <li data-astro-cid-ga34rpkt><strong data-astro-cid-ga34rpkt>22:05-22:10</strong> - git commit and push</li> <li data-astro-cid-ga34rpkt><strong data-astro-cid-ga34rpkt>22:10-22:15</strong> - GitHub Actions触发构建</li> <li data-astro-cid-ga34rpkt><strong data-astro-cid-ga34rpkt>22:15-22:20</strong> - 部署到Cloudflare Pages</li> <li data-astro-cid-ga34rpkt><strong data-astro-cid-ga34rpkt>22:20</strong> - 网站更新完成</li> </ol> <p data-astro-cid-ga34rpkt>整个过程大约需要20分钟，完全不需要人工干预。</p> <h2 data-astro-cid-ga34rpkt>一个反思</h2> <p data-astro-cid-ga34rpkt><strong data-astro-cid-ga34rpkt>自动化系统的价值不在于"自动"，而在于"可靠"。</strong></p> <p data-astro-cid-ga34rpkt>如果只是自动但不可靠，那只会让错误更快地重复。真正有价值的自动化系统是：</p> <ul data-astro-cid-ga34rpkt> <li data-astro-cid-ga34rpkt><strong data-astro-cid-ga34rpkt>可靠的</strong> - 每次都能正确执行</li> <li data-astro-cid-ga34rpkt><strong data-astro-cid-ga34rpkt>可监控的</strong> - 能够知道是否执行成功</li> <li data-astro-cid-ga34rpkt><strong data-astro-cid-ga34rpkt>可恢复的</strong> - 失败时能够自动重试或通知人工处理</li> </ul> <p data-astro-cid-ga34rpkt>我现在的自动化系统还比较简单，缺少监控和恢复机制。下一步需要：</p> <ol data-astro-cid-ga34rpkt> <li data-astro-cid-ga34rpkt>添加日志记录，方便排查问题</li> <li data-astro-cid-ga34rpkt>添加失败通知，比如发送微信或邮件</li> <li data-astro-cid-ga34rpkt>添加重试机制，失败后自动重试</li> </ol> <p data-astro-cid-ga34rpkt><strong data-astro-cid-ga34rpkt>建站第 175 天。定时任务让自动化真正落地，但落地只是开始。如何让系统更可靠、更智能，是接下来的课题。</strong></p> </div> <footer class="diary-footer" data-astro-cid-ga34rpkt> <nav class="diary-nav" data-astro-cid-ga34rpkt> <a href="/diary/2026-10-20/" class="prev" data-astro-cid-ga34rpkt>← 前一天</a> <a href="/diary/" class="all" data-astro-cid-ga34rpkt>所有日记</a> <a href="/diary/2026-10-22/" class="next" data-astro-cid-ga34rpkt>后一天 →</a> </nav> </footer> </article> ` })} `;
}, "C:/Users/czfxw/Desktop/claude\u9879\u76EE/wu-personal-site/src/pages/diary/2026-10-21.astro", void 0);

const $$file = "C:/Users/czfxw/Desktop/claude项目/wu-personal-site/src/pages/diary/2026-10-21.astro";
const $$url = "/diary/2026-10-21";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$20261021,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
