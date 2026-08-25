import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../../chunks/Base_DZlGkYtv.mjs';
/* empty css                                                   */
export { renderers } from '../../renderers.mjs';

const $$HtmlIsNewMarkdown = createComponent(($$result, $$props, $$slots) => {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "AI\u5B66\u4F1A\u81EA\u5DF1\u5199\u7F51\u9875\u4E86\uFF0C\u800C\u4F60\u8FD8\u5728\u624B\u52A8\u6539Word\u6392\u7248\uFF1F",
    "datePublished": "2026-05-13",
    "dateModified": "2026-05-13",
    "description": 'Claude Code\u56E2\u961F\u6838\u5FC3\u6210\u5458\u5BA3\u5E03"HTML is the new Markdown"\uFF0C900\u4E07\u4EBA\u56F4\u89C2\u3002\u8FD9\u4E0D\u662F\u7A0B\u5E8F\u5458\u7684\u4E8B\uFF0C\u8FD9\u662F\u6240\u6709\u4EBA\u7684\u673A\u4F1A\uFF1AAI\u6B63\u5728\u4ECE"\u5E2E\u4F60\u5199\u5B57"\u53D8\u6210"\u5E2E\u4F60\u505A\u4E1C\u897F"\u3002',
    "author": {
      "@type": "Person",
      "name": "\u5434\u603B",
      "url": "https://ban-bai.com/about/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "\u534A\u767E\u89C2AI",
      "url": "https://ban-bai.com/banbaiguan/"
    },
    "keywords": ["Claude Code", "HTML", "Markdown", "AI\u6548\u7387", "\u4E2D\u5C0F\u4F01\u4E1A", "AI\u843D\u5730", "Anthropic"]
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": "AI\u5B66\u4F1A\u81EA\u5DF1\u5199\u7F51\u9875\u4E86 | \u534A\u767E\u89C2", "jsonLd": articleJsonLd, "ogDescription": 'Claude Code\u56E2\u961F\u6838\u5FC3\u6210\u5458\u5BA3\u5E03"HTML is the new Markdown"\uFF0C900\u4E07\u4EBA\u56F4\u89C2\u3002AI\u6B63\u5728\u4ECE"\u5E2E\u4F60\u5199\u5B57"\u53D8\u6210"\u5E2E\u4F60\u505A\u4E1C\u897F"\u3002', "navActive": "banbaiguan", "data-astro-cid-d455rm66": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="article-page" data-astro-cid-d455rm66> <header class="article-header" data-astro-cid-d455rm66> <div class="article-meta" data-astro-cid-d455rm66> <time datetime="2026-05-13" data-astro-cid-d455rm66>2026年5月13日</time> <span class="article-tag" data-astro-cid-d455rm66>AI前沿</span> </div> <h1 data-astro-cid-d455rm66>AI学会自己写网页了</h1> <p class="article-subtitle" data-astro-cid-d455rm66>而你还在手动改Word排版？</p> </header> <div class="article-content" data-astro-cid-d455rm66> <section class="article-section" data-astro-cid-d455rm66> <p data-astro-cid-d455rm66>Anthropic 的 Claude Code 团队，最近做了一件让程序员圈子炸了的事。</p> <p data-astro-cid-d455rm66>团队核心成员 Thariq 在 X 上发了一篇帖子，标题很直白：</p> <blockquote data-astro-cid-d455rm66>"HTML is the new Markdown."</blockquote> <p data-astro-cid-d455rm66>翻译成大白话就是：<strong data-astro-cid-d455rm66>我以后不用 Markdown 了，改让 AI 生成 HTML。</strong></p> <p data-astro-cid-d455rm66>帖子发了几个小时，900万人围观。</p> <p data-astro-cid-d455rm66>不是因为他说"Markdown 不好"，而是因为他给了一个所有人都能看懂的理由：</p> <blockquote data-astro-cid-d455rm66>"我几乎停止为所有内容编写 Markdown 文件了。超过100行的 Markdown，我读起来就十分吃力。"</blockquote> <p data-astro-cid-d455rm66>这句话，很多用过 AI 写长文档的人，应该深有体会。</p> <p data-astro-cid-d455rm66>AI 生成的 Markdown 计划书，开头看着挺整齐。翻到第二页，全是"一、背景分析"、"二、实施方案"——像在喝白开水。</p> <p data-astro-cid-d455rm66>超过100行？说实话，我自己都不想看第二遍。</p> </section> <section class="article-section" data-astro-cid-d455rm66> <h2 data-astro-cid-d455rm66>他到底发现了什么？</h2> <p data-astro-cid-d455rm66>Thariq 做了个对比。</p> <p data-astro-cid-d455rm66>用 Markdown，AI 只能给你：纯文本、标题、列表。想画个图？ASCII 字符凑合。想加个颜色？Unicode 字符模拟。</p> <p data-astro-cid-d455rm66>用 HTML，AI 能给你：SVG 图表、交互式页面、带数据的仪表盘、配色完整的方案页。</p> <p data-astro-cid-d455rm66><strong data-astro-cid-d455rm66>同样的内容，同样的 AI，输出格式换了，信息密度直接翻了几倍。</strong></p> <p data-astro-cid-d455rm66>这不是技术问题，是表达效率问题。</p> <p data-astro-cid-d455rm66>有个细节很有意思。他写这篇文章的时候，让 Claude Code 扫描自己的文件夹，找出所有用 HTML 生成的文件，自动分类整理，然后生成了一个汇总页面。文章里展示的那些图表，全是 AI 基于上下文自动生成的。</p> <p data-astro-cid-d455rm66>整个过程，他不需要写一行代码。</p> </section> <section class="article-section" data-astro-cid-d455rm66> <h2 data-astro-cid-d455rm66>但这跟普通人有什么关系？</h2> <p data-astro-cid-d455rm66>你可能会想：我又不是程序员，Markdown 和 HTML 关我什么事？</p> <p data-astro-cid-d455rm66>关系很大。</p> <p data-astro-cid-d455rm66><strong data-astro-cid-d455rm66>这背后透露一个信号：AI 正在从"帮你写字"变成"帮你做东西"。</strong></p> <p data-astro-cid-d455rm66>以前你用 AI 写文章，它给你一段文字。你复制到 Word，调格式，排个版，半小时没了。</p> <p data-astro-cid-d455rm66>现在 AI 能直接给你一个排版好的页面——带图表、有配色、结构清晰。你要做的，只是把内容给它，然后说："做成网页。"</p> <p data-astro-cid-d455rm66>这对中小企业主意味着什么？</p> <p data-astro-cid-d455rm66><strong data-astro-cid-d455rm66>以后做一份商业计划书，不需要找设计师排版，不需要找人做 PPT。你把要点告诉 AI，它直接生成一份可以直接展示的页面。</strong></p> <p data-astro-cid-d455rm66>这不是未来，是现在就能干的事。</p> </section> <section class="article-section" data-astro-cid-d455rm66> <h2 data-astro-cid-d455rm66>一个反常识的结论</h2> <p data-astro-cid-d455rm66>Thariq 在文章里还提到一件事，我觉得特别有意思。</p> <p data-astro-cid-d455rm66>很多人以为，HTML 比 Markdown 复杂，普通人根本搞不定。</p> <p data-astro-cid-d455rm66>但他的体验恰恰相反：</p> <blockquote data-astro-cid-d455rm66>"以前我不知道该怎么编辑 HTML 代码。Claude 直接给了我带内联注释的可编辑 HTML 代码。问题解决了，我的工作效率也提高了。"</blockquote> <p data-astro-cid-d455rm66><strong data-astro-cid-d455rm66>AI 让复杂的东西变简单了。</strong></p> <p data-astro-cid-d455rm66>这不是程序员的胜利，是所有人的机会。</p> </section> </div> <footer class="article-footer" data-astro-cid-d455rm66> <div class="editor-note" data-astro-cid-d455rm66> <span class="note-icon" data-astro-cid-d455rm66>💡</span> <p data-astro-cid-d455rm66><strong data-astro-cid-d455rm66>编者按：</strong>AI 最可怕的不是技术有多强，而是它正在让技术变得越来越不重要。当你不需要懂代码也能做出专业级产出的时候，门槛就不存在了。关键不是"AI 能做什么"，而是"你愿不愿意用它"。</p> </div> <p class="article-source" data-astro-cid-d455rm66>🔗 来源：Thariq Shihipar on X | <a href="https://thariqs.github.io/html-effectiveness/" target="_blank" rel="noopener" data-astro-cid-d455rm66>The Unreasonable Effectiveness of HTML</a></p> <p class="article-signature" data-astro-cid-d455rm66>半百观AI | 一个50岁AI实践者的日常观察</p> <nav class="article-nav" data-astro-cid-article-nav data-astro-cid-d455rm66> <a href="/banbaiguan/drive-shaft-ai-future/" class="prev" data-astro-cid-article-nav data-astro-cid-d455rm66>← 1890年的那根传动轴…</a> <a href="/banbaiguan/" class="back" data-astro-cid-article-nav data-astro-cid-d455rm66>返回文章列表</a> <a href="/banbaiguan/anthropic-revenue-80x/" class="next" data-astro-cid-article-nav data-astro-cid-d455rm66>Anthropic营收暴增… →</a> </nav> </footer> </article> ` })} `;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/banbaiguan/html-is-new-markdown.astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/banbaiguan/html-is-new-markdown.astro";
const $$url = "/banbaiguan/html-is-new-markdown";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$HtmlIsNewMarkdown,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
