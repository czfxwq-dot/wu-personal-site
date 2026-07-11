import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
import { $ as $$Base } from '../../chunks/Base_C38bZXr6.mjs';
/* empty css                                                            */
export { renderers } from '../../renderers.mjs';

const $$AgentHarnessSmartWarehouse = createComponent(($$result, $$props, $$slots) => {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "\u4ECEAgent Harness\u5230\u667A\u80FD\u4ED3\u50A8\uFF1A\u4F01\u4E1A\u7EA7AI\u667A\u80FD\u4F53\u600E\u4E48\u843D\u5730\uFF1F",
    "datePublished": "2026-06-09",
    "dateModified": "2026-06-09",
    "description": "DeepSeek\u62DBHarness\u5DE5\u7A0B\u5E08\uFF0C\u8DDF\u505A\u667A\u80FD\u8D27\u67B6\u6709\u4EC0\u4E48\u5173\u7CFB\uFF1F\u6280\u672F\u7684\u5DE5\u7A0B\u5316\u5C01\u88C5\uFF0C\u8BA9\u590D\u6742\u80FD\u529B\u53D8\u6210\u5F00\u7BB1\u5373\u7528\u7684\u5DE5\u5177\u3002\u4F01\u4E1A\u843D\u5730AI\u667A\u80FD\u4F53\u7684\u4E09\u6B65\u8DEF\u5F84\u3002",
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
    "keywords": ["AI Agent", "Harness", "\u667A\u80FD\u4ED3\u50A8", "\u5E93\u5B58\u7BA1\u7406", "\u534A\u767E\u89C2AI", "\u4F01\u4E1AAI\u843D\u5730", "DeepSeek"]
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "title": "\u4ECEAgent Harness\u5230\u667A\u80FD\u4ED3\u50A8 | \u534A\u767E\u89C2", "jsonLd": articleJsonLd, "ogDescription": "DeepSeek\u62DBHarness\u5DE5\u7A0B\u5E08\uFF0C\u8DDF\u505A\u667A\u80FD\u8D27\u67B6\u6709\u4EC0\u4E48\u5173\u7CFB\uFF1F\u4F01\u4E1A\u843D\u5730AI\u667A\u80FD\u4F53\u7684\u4E09\u6B65\u8DEF\u5F84\u3002", "navActive": "banbaiguan", "data-astro-cid-uzdbx2bm": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="article-page" data-astro-cid-uzdbx2bm> <header class="article-header" data-astro-cid-uzdbx2bm> <div class="article-meta" data-astro-cid-uzdbx2bm> <time datetime="2026-06-09" data-astro-cid-uzdbx2bm>2026年6月9日</time> <span class="article-tag" data-astro-cid-uzdbx2bm>AI落地</span> </div> <h1 data-astro-cid-uzdbx2bm>从Agent Harness到智能仓储</h1> <p class="article-subtitle" data-astro-cid-uzdbx2bm>企业级AI智能体怎么落地？用库存管理举个例子</p> <p class="article-subtitle" data-astro-cid-uzdbx2bm>文 / 半百观AI</p> </header> <div class="article-content" data-astro-cid-uzdbx2bm> <h2 data-astro-cid-uzdbx2bm>▎一、DeepSeek的野心和咱们的关系</h2> <p data-astro-cid-uzdbx2bm>上周DeepSeek招Harness工程师的事，很多人问我：一个AI公司招人，跟我做智能货架的有什么关系？</p> <p data-astro-cid-uzdbx2bm>我的回答是：关系就像当年云计算兴起时，你跟搞服务器的人说"这跟我的企业ERP有什么关系"一样——</p> <p data-astro-cid-uzdbx2bm><strong data-astro-cid-uzdbx2bm>看似不相关，底层是同一个逻辑：技术的工程化封装，让复杂能力变成开箱即用的工具。</strong></p> <hr data-astro-cid-uzdbx2bm> <h2 data-astro-cid-uzdbx2bm>▎二、拆解：一个仓储Agent需要什么能力</h2> <p data-astro-cid-uzdbx2bm>我们拿一个最基础的场景来拆解——智能货架库存管理。</p> <p data-astro-cid-uzdbx2bm>一个理想的库存管理Agent，需要具备以下能力：</p> <p data-astro-cid-uzdbx2bm><strong data-astro-cid-uzdbx2bm>感知层：</strong>实时读取货架传感器的数据，知道每个SKU的当前数量。</p> <p data-astro-cid-uzdbx2bm><strong data-astro-cid-uzdbx2bm>理解层：</strong>不是简单看数字，而是理解数据背后的含义——消耗量是否在正常范围？趋势是加速还是减速？</p> <p data-astro-cid-uzdbx2bm><strong data-astro-cid-uzdbx2bm>记忆层：</strong>记住历史数据，知道过去30天、90天的消耗规律，能做对比分析。</p> <p data-astro-cid-uzdbx2bm><strong data-astro-cid-uzdbx2bm>判断层：</strong>发现异常时，不只是报警，还能分析可能原因——是促销？是传感器故障？还是供应链出了问题？</p> <p data-astro-cid-uzdbx2bm><strong data-astro-cid-uzdbx2bm>执行层：</strong>能发起补货流程、发送预警通知、生成报表，不只是"说"，还要会"做"。</p> <p data-astro-cid-uzdbx2bm><strong data-astro-cid-uzdbx2bm>学习层：</strong>从每次决策结果中学习，不断优化自己的判断模型。</p> <hr data-astro-cid-uzdbx2bm> <h2 data-astro-cid-uzdbx2bm>▎三、Harness视角：这些能力如何组织</h2> <p data-astro-cid-uzdbx2bm>上面的六层能力，如果散落在不同的代码模块里，就变成了传统软件——能跑，但"傻"。Harness的作用，就是给这些能力装上一个统一的"驾驶舱"。</p> <p data-astro-cid-uzdbx2bm>传统的做法：规则引擎 + 定时任务 + 告警邮件。</p> <p data-astro-cid-uzdbx2bm>优点：可控、可预测、可审计。</p> <p data-astro-cid-uzdbx2bm>缺点：遇到没写进规则的情况就傻眼。比如某SKU消耗量突然翻倍——可能是促销，也可能是传感器故障。规则引擎只会按预设触发，不会判断。</p> <p data-astro-cid-uzdbx2bm>Harness的做法：给Agent一个统一的框架，让它既能按规则执行，又能用模型能力做"判断"。</p> <p data-astro-cid-uzdbx2bm><strong data-astro-cid-uzdbx2bm>遇到异常：</strong>Agent不只会报警，还能分析可能原因——"今日消耗量是过去30天均值的3.2倍，结合历史数据，70%概率为促销活动，建议暂不触发紧急补货，观察4小时"。</p> <p data-astro-cid-uzdbx2bm>这就是从"自动化"到"智能化"的跨越。</p> <hr data-astro-cid-uzdbx2bm> <h2 data-astro-cid-uzdbx2bm>▎四、企业落地的三步路径</h2> <p data-astro-cid-uzdbx2bm>基于Harness的思路，我建议企业分三步走：</p> <p data-astro-cid-uzdbx2bm><strong data-astro-cid-uzdbx2bm>第一步：先让数据"开口说话"</strong></p> <p data-astro-cid-uzdbx2bm>把智能货架、线边仓的传感器数据统一接入一个平台。不是简单存储，而是让Agent能实时读取、理解这些数据。这解决"感知"问题。</p> <p data-astro-cid-uzdbx2bm><strong data-astro-cid-uzdbx2bm>第二步：给Agent配上"工具"</strong></p> <p data-astro-cid-uzdbx2bm>对接WMS/ERP/邮件/企微通知。Agent发现问题后，不能只会"说"，还要会"做"——发起补货流程、发送预警、生成报表。这解决"执行"问题。</p> <p data-astro-cid-uzdbx2bm><strong data-astro-cid-uzdbx2bm>第三步：建立"安全护栏"</strong></p> <p data-astro-cid-uzdbx2bm>设定Agent的权限边界——哪些操作可以自主执行，哪些需要人工确认。建立审计日志，确保每一步操作可追溯。这解决"信任"问题。</p> <hr data-astro-cid-uzdbx2bm> <h2 data-astro-cid-uzdbx2bm>▎五、写在最后：别等，别怕</h2> <p data-astro-cid-uzdbx2bm>50岁的人创业，最怕两件事：一是赶不上趟，二是走错了路。</p> <p data-astro-cid-uzdbx2bm>Harness的出现告诉我们：AI智能体的工程化框架正在成熟。现在不是"等AI再聪明一点"的时候，而是——</p> <p data-astro-cid-uzdbx2bm><strong data-astro-cid-uzdbx2bm>趁框架还在成型期，把你的行业经验嵌进去的最佳时机。</strong></p> <p data-astro-cid-uzdbx2bm>因为最好的智能体，不是最聪明的模型，而是——</p> <p data-astro-cid-uzdbx2bm><strong data-astro-cid-uzdbx2bm>最懂你的行业的那一个。</strong></p> </div> <!-- 底部关注卡片 --> <div class="footer-cta" data-astro-cid-uzdbx2bm> <p class="cta-title" data-astro-cid-uzdbx2bm>📱 关注「半百观AI」</p> <p class="cta-desc" data-astro-cid-uzdbx2bm>50岁AI实践者的深度思考，每周更新</p> <div class="cta-platforms" data-astro-cid-uzdbx2bm> <span class="cta-badge" data-astro-cid-uzdbx2bm>📺 视频号</span> <span class="cta-badge" data-astro-cid-uzdbx2bm>📝 公众号</span> <span class="cta-badge" data-astro-cid-uzdbx2bm>🎵 抖音</span> <span class="cta-badge" data-astro-cid-uzdbx2bm>📕 小红书</span> </div> <p class="cta-link" data-astro-cid-uzdbx2bm>🌐 官网：<a href="https://ban-bai.com" data-astro-cid-uzdbx2bm>ban-bai.com</a></p> </div> <div class="article-source" data-astro-cid-uzdbx2bm> <p data-astro-cid-uzdbx2bm>选题来源：DeepSeek Agent Harness招聘信息（2026-05-20）</p> </div> </article> ` })} `;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/banbaiguan/agent-harness-smart-warehouse.astro", void 0);

const $$file = "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/pages/banbaiguan/agent-harness-smart-warehouse.astro";
const $$url = "/banbaiguan/agent-harness-smart-warehouse";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$AgentHarnessSmartWarehouse,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
