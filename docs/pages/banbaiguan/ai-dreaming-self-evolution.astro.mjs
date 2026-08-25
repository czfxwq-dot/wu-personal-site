import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../../chunks/Base_C123y-OE.mjs';
/* empty css                                                         */
export { renderers } from '../../renderers.mjs';

const $$AiDreamingSelfEvolution = createComponent(($$result, $$props, $$slots) => {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "AI\u5B66\u4F1A\u300C\u505A\u68A6\u300D\u81EA\u6211\u8FDB\u5316\uFF1AAnthropic\u8FD9\u9879\u529F\u80FD\uFF0C\u53EF\u80FD\u6539\u53D8\u4EBA\u673A\u534F\u4F5C\u7684\u7EC8\u5C40",
    "datePublished": "2026-05-10",
    "dateModified": "2026-05-10",
    "author": {
      "@type": "Person",
      "name": "\u5434\u603B",
      "alternateName": "\u534A\u767E\u89C2AI"
    },
    "publisher": {
      "@type": "Organization",
      "name": "\u534A\u767E\u89C2AI"
    },
    "description": "Anthropic\u5728Code with Claude 2026\u5927\u4F1A\u4E0A\u53D1\u5E03Dreaming\u529F\u80FD\uFF0C\u8BA9AI\u5728\u4EFB\u52A1\u95F4\u9699\u81EA\u52A8\u8FDB\u5165\u4F11\u7720\u72B6\u6001\uFF0C\u5BA1\u9605\u5386\u53F2\u4F1A\u8BDD\u3001\u6574\u7406\u8BB0\u5FC6\u3001\u53D1\u73B0\u9519\u8BEF\u6A21\u5F0F\uFF0C\u5B9E\u73B0\u8DE8\u4F1A\u8BDD\u81EA\u6211\u8FDB\u5316\u3002"
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": "AI\u5B66\u4F1A\u300C\u505A\u68A6\u300D\u81EA\u6211\u8FDB\u5316 | \u534A\u767E\u89C2", "jsonLd": articleJsonLd, "ogDescription": "Anthropic\u5728Code with Claude 2026\u5927\u4F1A\u4E0A\u53D1\u5E03Dreaming\u529F\u80FD\uFF0C\u8BA9AI\u5728\u4EFB\u52A1\u95F4\u9699\u81EA\u52A8\u8FDB\u5165\u4F11\u7720\u72B6\u6001\uFF0C\u5BA1\u9605\u5386\u53F2\u4F1A\u8BDD\u3001\u6574\u7406\u8BB0\u5FC6\u3001\u53D1\u73B0\u9519\u8BEF\u6A21\u5F0F\uFF0C\u5B9E\u73B0\u8DE8\u4F1A\u8BDD\u81EA\u6211\u8FDB\u5316\u3002", "navActive": "banbaiguan", "data-astro-cid-3ibvisgc": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="article-page" data-astro-cid-3ibvisgc> <header class="article-header" data-astro-cid-3ibvisgc> <div class="article-meta" data-astro-cid-3ibvisgc> <time datetime="2026-05-10" data-astro-cid-3ibvisgc>2026年5月10日</time> <span class="article-tag" data-astro-cid-3ibvisgc>AI前沿</span> </div> <h1 data-astro-cid-3ibvisgc>AI学会「做梦」自我进化</h1> <p class="article-subtitle" data-astro-cid-3ibvisgc>Anthropic这项功能，可能改变人机协作的终局</p> </header> <div class="article-content" data-astro-cid-3ibvisgc> <p class="lead" data-astro-cid-3ibvisgc>Anthropic在刚刚结束的Code with Claude 2026大会上，发布了一个让我反复看了三遍的功能：Dreaming——让AI学会"做梦"。</p> <p data-astro-cid-3ibvisgc>你没看错，是做梦。</p> <p data-astro-cid-3ibvisgc>这不是噱头。Anthropic给Claude的智能体平台加了一个后台进程，让AI在任务间隙自动进入一种"休眠"状态，在休眠中审阅过去的会话记录、整理记忆库、发现反复出现的错误模式，然后生成优化后的新记忆。</p> <p data-astro-cid-3ibvisgc>用50岁的话来说：这不就是人脑晚上睡觉时做的事情吗？把白天学到的碎片知识，整合成长期记忆。</p> <blockquote data-astro-cid-3ibvisgc>"我们不再只是在做聊天机器人，我们在做会自我进化的协作者。"</blockquote> <p class="quote-source" data-astro-cid-3ibvisgc>—— Dario Amodei</p> <h2 data-astro-cid-3ibvisgc>一、三个核心能力，一个逻辑</h2> <p data-astro-cid-3ibvisgc><strong data-astro-cid-3ibvisgc>第一，Dreaming（梦境记忆蒸馏）。</strong>定期在后台运行，读过去最多100个历史会话，合并重复数据、更新过时条目、提炼宏观规律。法律科技公司Harvey用它后，任务完成率翻了约6倍。</p> <p data-astro-cid-3ibvisgc><strong data-astro-cid-3ibvisgc>第二，Outcomes（结果驱动执行）。</strong>开发者定义"成功标准"，系统分配独立的评分智能体给AI打分，不达标就打回去重写。内部测试显示，docx文档生成成功率提高8.4%，pptx提高10.1%。</p> <p data-astro-cid-3ibvisgc><strong data-astro-cid-3ibvisgc>第三，Multiagent Orchestration（多智能体编排）。</strong>主智能体把任务拆成多个子任务，分配给专项子智能体并行处理。在月球采矿无人机着陆模拟中，安全评分从67%提到100%。</p> <p data-astro-cid-3ibvisgc>这三个能力的底层逻辑只有一个：让AI从"每次从零出发"变成"跨会话累积学习"。</p> <blockquote data-astro-cid-3ibvisgc>"这不是工具的升级，这是AI角色从螺丝刀到员工的质变。"</blockquote> <h2 data-astro-cid-3ibvisgc>二、算力的暗战</h2> <p data-astro-cid-3ibvisgc>你可能注意到，这次大会最火的新闻其实是Anthropic和SpaceX签了协议——租下马斯克Colossus 1数据中心的全部算力，包含22万张英伟达GPU。</p> <p data-astro-cid-3ibvisgc>这事有意思。三个月前马斯克还在公开骂Anthropic"反人类且邪恶"，现在就把全部算力租给它了。</p> <p data-astro-cid-3ibvisgc>但我看到的不只是商业合作，是一个更深层的信号：算力正在成为AI公司最大的战略瓶颈。Anthropic第一季度收入暴增80倍，预期才10倍，结果根本扛不住。</p> <p data-astro-cid-3ibvisgc>而且马斯克在协议里藏了一个条款：如果Anthropic的AI做出危害人类的行为，SpaceX有权随时收回算力。这叫什么？"自毁开关"。租给你，但随时能拔你的插头。</p> <h2 data-astro-cid-3ibvisgc>三、国内该对标什么？</h2> <p data-astro-cid-3ibvisgc>国内的Manus、字节Coze、阿里的智能体平台都在追赶"Agents as Infrastructure"这条叙事线，让企业零代码搭建AI智能体。但Anthropic已经跑到下一个阶段了——让智能体"跨会话自我演进"。</p> <p data-astro-cid-3ibvisgc>这已经不是"工具怎么好用"的竞争，而是"AI员工成熟度"的竞争。</p> <h2 data-astro-cid-3ibvisgc>四、半百视角</h2> <p data-astro-cid-3ibvisgc>我今年50岁，经历了互联网从无到有的整个周期。回顾过去二十年，技术革命往往不是由某一个产品触发的，而是由某个"范式转换"。</p> <p data-astro-cid-3ibvisgc>从命令行到图形界面，是范式转换。从桌面到移动，是范式转换。</p> <p data-astro-cid-3ibvisgc>AI从"问答工具"到"自我进化的协作者"，可能就是下一个范式转换。</p> <p data-astro-cid-3ibvisgc>Dreaming的意义不在于"AI能做梦"这个噱头，而在于：Anthropic在认真思考一个问题——怎么让AI不需要人类盯着，也能越干越好。</p> <p data-astro-cid-3ibvisgc>对企业来说，这意味着AI员工的培训成本会越来越低，适应速度会越来越快。你今天教它一次，明天它可能自己就能总结出规律。</p> <p data-astro-cid-3ibvisgc>当然，离真正的"自主进化"还很远。Dreaming目前还是研究预览阶段。但趋势已经很明显——AI正在从被使用者变成合作者。</p> <p data-astro-cid-3ibvisgc>作为创业者，我们应该问的不是"AI会不会取代人"，而是"我怎么让AI成为我最聪明的员工"。</p> <blockquote data-astro-cid-3ibvisgc>"未来企业的竞争力，不在于你有多少AI工具，而在于你让AI进化到什么程度。"</blockquote> <p class="quote-source" data-astro-cid-3ibvisgc>—— 半百观AI</p> <h2 data-astro-cid-3ibvisgc>💡 行动建议</h2> <p data-astro-cid-3ibvisgc><strong data-astro-cid-3ibvisgc>如果你是一家企业的管理者：</strong></p> <ul data-astro-cid-3ibvisgc> <li data-astro-cid-3ibvisgc>评估现有AI工具是否支持"跨会话记忆"——不支持的话，每次都是从零开始</li> <li data-astro-cid-3ibvisgc>关注多智能体编排的落地场景——哪些业务环节可以拆成子任务并行处理</li> <li data-astro-cid-3ibvisgc>建立AI输出评分标准——像Outcomes一样，用规则而不是感觉来评估AI质量</li> </ul> <p data-astro-cid-3ibvisgc><strong data-astro-cid-3ibvisgc>如果你是AI从业者：</strong></p> <ul data-astro-cid-3ibvisgc> <li data-astro-cid-3ibvisgc>研究Dreaming的技术实现思路：异步记忆整理 + 人类审核 + 增量优化</li> <li data-astro-cid-3ibvisgc>思考如何把这个思路迁移到国产大模型的应用层</li> </ul> <p class="sources" data-astro-cid-3ibvisgc>📌 来源：Anthropic Code with Claude 2026开发者大会 | 快科技 | 36氪</p> </div> <footer class="article-footer" data-astro-cid-3ibvisgc> <p data-astro-cid-3ibvisgc>📌 半百观AI — 50岁视角看AI落地实践</p> <nav class="article-nav" data-astro-cid-article-nav data-astro-cid-3ibvisgc> <a href="/banbaiguan/claude-code-engineering-transformation/" class="prev" data-astro-cid-article-nav data-astro-cid-3ibvisgc>← Claude Code不…</a> <a href="/banbaiguan/" class="back" data-astro-cid-article-nav data-astro-cid-3ibvisgc>返回文章列表</a> <a href="/banbaiguan/deepseek-v4-engram-regret/" class="next" data-astro-cid-article-nav data-astro-cid-3ibvisgc>DeepSeek V4 … →</a> </nav> </footer> </article> ` })} `;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/banbaiguan/ai-dreaming-self-evolution.astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/banbaiguan/ai-dreaming-self-evolution.astro";
const $$url = "/banbaiguan/ai-dreaming-self-evolution";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$AiDreamingSelfEvolution,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
