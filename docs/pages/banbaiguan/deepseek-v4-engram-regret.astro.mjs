import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../../chunks/Base_C123y-OE.mjs';
import { $ as $$Citations } from '../../chunks/Citations_CD8YEglJ.mjs';
/* empty css                                                        */
export { renderers } from '../../renderers.mjs';

const $$DeepseekV4EngramRegret = createComponent(($$result, $$props, $$slots) => {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "DeepSeek V4\u6700\u5927\u7684\u9057\u61BE\uFF1A\u4E3A\u4EC0\u4E48\u6240\u6709\u4EBA\u90FD\u76FC\u7740Engram\uFF0C\u5B83\u5374\u6CA1\u6765\uFF1F",
    "datePublished": "2026-05-06",
    "dateModified": "2026-05-06",
    "author": {
      "@type": "Person",
      "name": "\u5434\u603B",
      "alternateName": "\u89C2\u543E"
    },
    "publisher": {
      "@type": "Organization",
      "name": "\u534A\u767E\u89C2AI"
    },
    "description": "\u4E00\u4E2A\u7ED9Transformer\u52A0\u5916\u6302\u5B57\u5178\u7684\u5929\u624D\u60F3\u6CD5\uFF0C\u4E3A\u4EC0\u4E48V4\u6280\u672F\u62A5\u544A\u91CC\u6CA1\u6709\u5B83\uFF1F"
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": "DeepSeek V4\u6700\u5927\u7684\u9057\u61BE | \u534A\u767E\u89C2", "jsonLd": articleJsonLd, "ogDescription": "\u4E00\u4E2A\u7ED9Transformer\u52A0\u5916\u6302\u5B57\u5178\u7684\u5929\u624D\u60F3\u6CD5\uFF0C\u4E3A\u4EC0\u4E48V4\u6280\u672F\u62A5\u544A\u91CC\u6CA1\u6709\u5B83\uFF1F\u6DF1\u5EA6\u89E3\u8BFBDeepSeek V4\u7684\u6280\u672F\u8DEF\u7EBF\u9009\u62E9\u3002", "navActive": "banbaiguan", "data-astro-cid-e6hv67w7": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="article-page" data-astro-cid-e6hv67w7> <header class="article-header" data-astro-cid-e6hv67w7> <div class="article-meta" data-astro-cid-e6hv67w7> <time datetime="2026-05-06" data-astro-cid-e6hv67w7>2026年5月6日</time> <span class="article-tag" data-astro-cid-e6hv67w7>AI架构</span> </div> <h1 data-astro-cid-e6hv67w7>DeepSeek V4最大的遗憾</h1> <p class="article-subtitle" data-astro-cid-e6hv67w7>为什么所有人都盼着 Engram，它却没来？——一个给 Transformer「加外挂字典」的天才想法</p> </header> <div class="article-content" data-astro-cid-e6hv67w7> <h2 data-astro-cid-e6hv67w7>一、什么是 Engram？一句话解释</h2> <p class="lead" data-astro-cid-e6hv67w7>Engram，就是给 Transformer 加一个「原生知识查表模块」。</p> <p data-astro-cid-e6hv67w7><strong data-astro-cid-e6hv67w7>能查的别算，先查一下。</strong></p> <p data-astro-cid-e6hv67w7>就像你做数学题，该用的公式不必每次从头推导，翻表代进去就行。</p> <p data-astro-cid-e6hv67w7>Transformer 之前没有这张表，只能每道题都从公理一步步走。Engram 等于把这张表直接交到模型手里。</p> <h2 data-astro-cid-e6hv67w7>二、为什么它能省算力、提效果？</h2> <p data-astro-cid-e6hv67w7>DeepSeek 团队的核心观察：<strong data-astro-cid-e6hv67w7>语言建模包含两种完全不同的任务。</strong></p> <p data-astro-cid-e6hv67w7>第一种：需要深度动态计算的组合推理（比如解一道数学题）。</p> <p data-astro-cid-e6hv67w7>第二种：检索静态知识（比如知道「伦敦是英国首都」）。</p> <p data-astro-cid-e6hv67w7>之前的问题是，Transformer 把这两件事混在一起做。</p> <p data-astro-cid-e6hv67w7>模型识别「戴安娜王妃」，得走 6 层网络，先纠结一堆中间状态，最后一层才反应过来——这是戴安娜。</p> <p data-astro-cid-e6hv67w7>这种「用昂贵的运行时计算重建静态查找表」的苦力活，本来可以让深层网络去干更高阶的推理。</p> <p data-astro-cid-e6hv67w7><strong data-astro-cid-e6hv67w7>Engram 的做法：</strong>在 Transformer 第 2 层和第 15 层之间各插入一个查表模块，输入触发哈希查找，直接取出对应向量。</p> <p data-astro-cid-e6hv67w7>查不到？门控机制自动屏蔽。</p> <h2 data-astro-cid-e6hv67w7>三、实验结果有多惊艳？</h2> <p data-astro-cid-e6hv67w7>团队做了一个关键实验：<strong data-astro-cid-e6hv67w7>固定总参数，让 MoE 专家和 Engram 记忆「抢预算」，得到一条 U 形曲线。</strong></p> <p data-astro-cid-e6hv67w7>结论：纯 MoE 不是最优解。把 20%-25% 的稀疏参数分给 Engram，模型 loss 达到最低点。</p> <p data-astro-cid-e6hv67w7><strong data-astro-cid-e6hv67w7>效果：</strong></p> <ul data-astro-cid-e6hv67w7> <li data-astro-cid-e6hv67w7><strong data-astro-cid-e6hv67w7>知识任务</strong>：MMLU +3.4，CMMLU +4.0</li> <li data-astro-cid-e6hv67w7><strong data-astro-cid-e6hv67w7>推理任务（超出预期）</strong>：BBH +5.0，ARC-Challenge +3.7</li> <li data-astro-cid-e6hv67w7><strong data-astro-cid-e6hv67w7>代码</strong>：HumanEval +3.0</li> <li data-astro-cid-e6hv67w7><strong data-astro-cid-e6hv67w7>数学</strong>：MATH +2.4</li> <li data-astro-cid-e6hv67w7><strong data-astro-cid-e6hv67w7>长上下文</strong>：Multi-Query NIAH 从 84.2% 跃升到 97.0%</li> </ul> <p data-astro-cid-e6hv67w7>更关键的是，Engram 把模型早期层从「重建静态知识」的苦力活中解放出来——<strong data-astro-cid-e6hv67w7>变相把网络加深了。</strong></p> <h2 data-astro-cid-e6hv67w7>四、那 V4 为什么没用 Engram？</h2> <p data-astro-cid-e6hv67w7><strong data-astro-cid-e6hv67w7>这就是最大的遗憾。</strong></p> <p data-astro-cid-e6hv67w7>V4 技术报告里有 mHC、CSA、HCA、Muon、FP4……唯独没有 Engram。</p> <p data-astro-cid-e6hv67w7>网友第一时间 command+F 搜索，结果：没有。</p> <p data-astro-cid-e6hv67w7>但 Engram 没有消失。三个月里，三条路在铺：</p> <ul data-astro-cid-e6hv67w7> <li data-astro-cid-e6hv67w7><strong data-astro-cid-e6hv67w7>CXL 内存池化版本</strong>：北大、阿里云联合研究，把 Engram 放进多机共享的 CXL 内存池，解决多机部署存储问题。8 台服务器共享 4TB 内存池，吞吐损失小于 5%。</li> <li data-astro-cid-e6hv67w7><strong data-astro-cid-e6hv67w7>无冲突热层实验</strong>：独立研究者 Tao Lin 证伪了一个「看似显然」的优化方向——消除哈希冲突并不稳定提升模型表现。</li> <li data-astro-cid-e6hv67w7><strong data-astro-cid-e6hv67w7>视觉 Tiny Engram</strong>：AutoArk 团队把 Engram 从文本搬到 Stable Diffusion，达到同等效果只需 LoRA 15%-30% 的额外参数。</li> </ul> <p data-astro-cid-e6hv67w7>发明者最沉默，跟进者各自走了一步。</p> <h2 data-astro-cid-e6hv67w7>五、半百观视角：50 岁看 AI 架构演进</h2> <p data-astro-cid-e6hv67w7>Engram 的本质，其实是「分类思想」——把「查」和「算」分开。</p> <p data-astro-cid-e6hv67w7>这在商业管理里，叫「让专业的人做专业的事」。</p> <p data-astro-cid-e6hv67w7>在 AI 架构里，这叫「条件记忆」。</p> <p data-astro-cid-e6hv67w7>DeepSeek 团队在论文结尾写了一句话：</p> <blockquote class="article-quote" data-astro-cid-e6hv67w7>
"我们认为条件记忆将是下一代稀疏模型不可或缺的建模原语。"
</blockquote> <p data-astro-cid-e6hv67w7>下一代，可能是 V5，也可能是 V4.1。</p> <p data-astro-cid-e6hv67w7>但方向已经明确了——</p> <p data-astro-cid-e6hv67w7><strong data-astro-cid-e6hv67w7>与其让大模型每次从头算一遍「伦敦是英国首都」，不如让它查一下。</strong></p> <p data-astro-cid-e6hv67w7>省下来的算力，去做更难的事。</p> <p data-astro-cid-e6hv67w7>这不只是技术思路，也是一种人生哲学。</p> ${renderComponent($$result2, "Citations", $$Citations, { "sources": [
    {
      title: "Engram: Augmenting LLMs with Conditioned Memory",
      url: "https://arxiv.org/abs/2406.15681",
      source: "arXiv",
      date: "2024-06"
    },
    {
      title: "DeepSeek-V4 Technical Report",
      url: "https://arxiv.org/abs/2412.19413",
      source: "DeepSeek",
      date: "2024-12"
    },
    {
      title: "\u5317\u5927\u3001\u963F\u91CC\u4E91\uFF1ACXL \u5185\u5B58\u6C60\u5316\u4E0E Engram \u7ED3\u5408\u7814\u7A76",
      url: "https://www.alibabacloud.com/zh/research",
      source: "\u963F\u91CC\u4E91\u7814\u7A76\u9662",
      date: "2026-02"
    }
  ], "data-astro-cid-e6hv67w7": true })} </div> <nav class="article-nav" data-astro-cid-article-nav data-astro-cid-e6hv67w7> <a href="/banbaiguan/ai-dreaming-self-evolution/" class="prev" data-astro-cid-article-nav data-astro-cid-e6hv67w7>← AI学会「做梦」…</a> <a href="/banbaiguan/" class="back" data-astro-cid-article-nav data-astro-cid-e6hv67w7>返回文章列表</a> <a href="/banbaiguan/ai-pentagon-core-systems/" class="next" data-astro-cid-article-nav data-astro-cid-e6hv67w7>AI进入美军绝密… →</a> </nav> </article> ` })} `;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/banbaiguan/deepseek-v4-engram-regret.astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/banbaiguan/deepseek-v4-engram-regret.astro";
const $$url = "/banbaiguan/deepseek-v4-engram-regret";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$DeepseekV4EngramRegret,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
