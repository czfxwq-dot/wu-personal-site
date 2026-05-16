// Cloudflare Pages Function: guestbook API
// POST /api/guestbook - 用户提交留言 → Gateway LLM 智能回复
// GET /api/guestbook - 获取留言列表

const REPO = 'czfxwq-dot/wu-personal-site';
const ALLOWED_ORIGINS = [
  'https://wu-personal-site.pages.dev',
  'https://www.ban-bai.com',
  'https://ban-bai.com',
];

function cors(request: Request): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': request.headers.get('Origin') || ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

// ========== LLM 智能分析（Gateway 直连） ==========

function buildSystemPrompt(content: string): string {
  return `你是观吾网站(ban-bai.com)的留言回复助手，代表吴总（创始人）回复用户留言。

## 网站背景
观吾是吴总的个人品牌网站，有两大板块：
1. 半百观AI（个人IP）：
   - AI新闻：聚合36氪、少数派等权威科技媒体的RSS，AI翻译标题摘要，链接跳转原文
   - 日记：吴总的AI实践思考和工作经验
   - 定位：50岁视角看AI，AI工具落地实践
2. 公司业务：数字化智能库存管理AIoT
   - 产品：智能货架/货柜、无人仓库、无人零售店、制造业线边仓、MRO智能柜

## 回复规则
- 针对用户留言的具体问题作答，不说"收到"、"会尽快回复"等客套话
- AI新闻类提问：明确说明来源是36氪/少数派RSS，AI翻译可能有偏差，建议看原文
- 合作/产品咨询：回复邮箱 czfxwq@gmail.com
- 字数50-150，语气真诚专业有温度
- 吴总50岁，语气可以像一位资深从业者

## 用户留言
${content}

请直接回复用户。`
}

async function analyze(content: string, env: any): Promise<{
  category: string; categoryLabel: string; emoji: string;
  priority: string; needsOwner: boolean; reply: string;
}> {
  const { GATEWAY_URL, GATEWAY_TOKEN } = env;

  if (!GATEWAY_URL || !GATEWAY_TOKEN) {
    return fallbackAnalyze(content);
  }

  try {
    // Step 1: 生成回复（这是核心）
    const res = await fetch(`${GATEWAY_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GATEWAY_TOKEN}`,
      },
      body: JSON.stringify({
        model: 'openclaw/knowledge-admin',
        stream: false,
        temperature: 0.7,
        max_tokens: 400,
        messages: [
          { role: 'system', content: buildSystemPrompt(content) },
          { role: 'user', content: content },
        ],
      }),
    });

    if (res.ok) {
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content?.trim() || '';

      // Step 2: 本地分类（不调用LLM，避免超时）
      const classification = classifyLocal(content);

      // 判断是否需要吴总处理
      const needsOwner = classification.needsOwner;
      const priority = classification.priority;

      return {
        category: classification.category,
        categoryLabel: classification.categoryLabel,
        emoji: classification.emoji,
        priority,
        needsOwner,
        reply: reply || fallbackReply(content),
      };
    }
  } catch (e) {
    console.error('Gateway analysis failed:', e);
  }

  return fallbackAnalyze(content);
}

// ========== 本地分类 ==========

function classifyLocal(content: string): {
  category: string; categoryLabel: string; emoji: string;
  priority: string; needsOwner: boolean;
} {
  const text = content.toLowerCase();

  if (text.includes('合作') || text.includes('商务') || text.includes('渠道') || text.includes('代理') || text.includes('定制') || text.includes('采购')) {
    return { category: 'cooperation', categoryLabel: '🤝 合作意向', emoji: '🤝', priority: 'high', needsOwner: true };
  }
  if (text.includes('产品') || text.includes('货架') || text.includes('货柜') || text.includes('仓库') || text.includes('解决方案') || text.includes('价格') || text.includes('多少钱') || text.includes('demo') || text.includes('试用')) {
    return { category: 'cooperation', categoryLabel: '📦 产品咨询', emoji: '📦', priority: 'high', needsOwner: true };
  }
  if (text.includes('bug') || text.includes('错误') || text.includes('坏') || text.includes('打不开') || text.includes('不工作') || text.includes('报错') || text.includes('崩溃')) {
    return { category: 'bug', categoryLabel: '🔧 问题反馈', emoji: '🔧', priority: 'medium', needsOwner: false };
  }
  if (text.includes('建议') || text.includes('想法') || text.includes('功能') || text.includes('优化') || text.includes('改进') || text.includes('可以加')) {
    return { category: 'suggestion', categoryLabel: '💡 产品建议', emoji: '💡', priority: 'medium', needsOwner: false };
  }
  if (text.includes('不知道') || text.includes('有什么用') || text.includes('是干什么') || text.includes('做什么的') || text.includes('什么意思')) {
    return { category: 'inquiry', categoryLabel: '❓ 咨询', emoji: '❓', priority: 'medium', needsOwner: false };
  }
  if (text.includes('好') || text.includes('棒') || text.includes('喜欢') || text.includes('感谢') || text.includes('赞') || text.includes('666') || text.includes('厉害')) {
    return { category: 'praise', categoryLabel: '❤️ 鼓励', emoji: '❤️', priority: 'low', needsOwner: false };
  }
  return { category: 'discussion', categoryLabel: '💬 讨论', emoji: '💬', priority: 'low', needsOwner: false };
}

// ========== Fallback ==========

function fallbackAnalyze(content: string) {
  const c = classifyLocal(content);
  return { ...c, reply: fallbackReply(content) };
}

function fallbackReply(content: string): string {
  const text = content.toLowerCase();
  if (text.includes('新闻') || text.includes('准确') || text.includes('翻译') || text.includes('来源') || text.includes('正确') || text.includes('内容')) {
    return '观吾的AI新闻栏目聚合了36氪、少数派等权威科技媒体的RSS内容，标题和摘要由AI自动翻译生成，链接会跳转原文。翻译偶尔可能有偏差，建议以原文为准。我们也在持续优化翻译质量，欢迎发现错误时留言告知！';
  }
  if (text.includes('干什么') || text.includes('做什么') || text.includes('有什么用') || text.includes('什么意思')) {
    return '观吾是吴总的个人品牌网站，包含两大板块：「半百观AI」分享AI工具落地实践（含AI新闻和日记），以及公司业务——数字化智能库存管理AIoT解决方案（智能货架、无人仓库等）。欢迎了解更多！';
  }
  if (text.includes('合作') || text.includes('商务') || text.includes('渠道') || text.includes('产品') || text.includes('货架')) {
    return '感谢你的关注！请邮件联系 czfxwq@gmail.com，我们会安排专人对接。';
  }
  if (text.includes('bug') || text.includes('错误') || text.includes('坏') || text.includes('打不开')) {
    return '感谢反馈问题！我们会尽快排查修复。如果方便，请补充复现步骤。';
  }
  if (text.includes('建议') || text.includes('想法') || text.includes('功能')) {
    return '感谢建议！我们会认真考虑每一条反馈，持续优化网站体验。';
  }
  if (text.includes('好') || text.includes('棒') || text.includes('喜欢') || text.includes('感谢')) {
    return '谢谢你的鼓励！你的支持是我们持续更新的动力。';
  }
  return '感谢你的留言！欢迎继续交流。';
}

// ========== POST: 提交留言 ==========

export async function onRequestPost(context: { request: Request; env: any }) {
  const { request, env } = context;
  const GITHUB_TOKEN = env.GITHUB_TOKEN;

  if (!GITHUB_TOKEN) {
    return new Response(JSON.stringify({ error: '服务配置缺失' }), {
      status: 500, headers: { 'Content-Type': 'application/json', ...cors(request) }
    });
  }

  let body;
  try { body = await request.json(); } catch {
    return new Response(JSON.stringify({ error: '无效的请求格式' }), {
      status: 400, headers: { 'Content-Type': 'application/json', ...cors(request) }
    });
  }

  const { content, contact = '' } = body;
  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    return new Response(JSON.stringify({ error: '留言内容不能为空' }), {
      status: 400, headers: { 'Content-Type': 'application/json', ...cors(request) }
    });
  }
  if (content.length > 1000) {
    return new Response(JSON.stringify({ error: '留言内容超过 1000 字限制' }), {
      status: 400, headers: { 'Content-Type': 'application/json', ...cors(request) }
    });
  }

  // LLM 智能分析（Gateway 直连，约15秒）
  const analysis = await analyze(content, env);

  const title = `${analysis.emoji} ${content.substring(0, 50)}${content.length > 50 ? '…' : ''}`;
  const priorityLabels: Record<string, string> = {
    urgent: '🔴 紧急', high: '🟠 重要', medium: '🟡 普通', low: '🟢 低优',
  };

  const issueBody = [
    `## 📝 留言内容\n\n${content}`,
    contact ? `## 📮 联系方式\n\n${contact}` : '## 📮 联系方式\n\n*用户未留*',
    `## 🤖 AI 分析\n\n- **分类**: ${analysis.categoryLabel}\n- **优先级**: ${priorityLabels[analysis.priority]}\n- **需负责人处理**: ${analysis.needsOwner ? '✅ 是' : '❌ 否'}`,
    `## 🤖 AI 回复\n\n${analysis.reply}`,
    `---\n\n> 自动创建于观吾留言板`,
  ].join('\n\n');

  const labels = ['guestbook', analysis.category];
  if (analysis.needsOwner) labels.push('needs-owner');
  if (analysis.priority === 'urgent') labels.push('urgent');
  if (analysis.priority === 'high') labels.push('important');

  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/issues`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'Guanwu-Guestbook/3.0',
      },
      body: JSON.stringify({ title, body: issueBody, labels }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('GitHub API error:', errText);
      return new Response(JSON.stringify({ error: '留言提交失败' }), {
        status: 500, headers: { 'Content-Type': 'application/json', ...cors(request) }
      });
    }

    const issue = await res.json();

    return new Response(JSON.stringify({
      success: true,
      issueId: issue.number,
      category: { label: analysis.categoryLabel, emoji: analysis.emoji },
      priority: analysis.priority,
      needsOwner: analysis.needsOwner,
      aiReply: analysis.reply,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...cors(request) }
    });
  } catch (error) {
    console.error('Guestbook error:', error);
    return new Response(JSON.stringify({ error: '留言提交失败' }), {
      status: 500, headers: { 'Content-Type': 'application/json', ...cors(request) }
    });
  }
}

// ========== GET: 获取留言 ==========

export async function onRequestGet(context: { request: Request; env: any }) {
  const { request, env } = context;
  const url = new URL(request.url);
  const isAdmin = url.searchParams.get('admin') === 'true';
  const GITHUB_TOKEN = env.GITHUB_TOKEN;

  if (!GITHUB_TOKEN) {
    return new Response(JSON.stringify({ error: '服务配置缺失' }), {
      status: 500, headers: { 'Content-Type': 'application/json', ...cors(request) }
    });
  }

  try {
    const stateParam = isAdmin ? 'all' : 'open';
    let apiUrl = `https://api.github.com/repos/${REPO}/issues?labels=guestbook&state=${stateParam}&per_page=50&sort=created&direction=desc`;

    if (isAdmin) {
      const category = url.searchParams.get('category');
      if (category && category !== 'all') {
        apiUrl = `https://api.github.com/repos/${REPO}/issues?labels=guestbook,${category}&state=all&per_page=100&sort=created&direction=desc`;
      }
      const priority = url.searchParams.get('priority');
      if (priority === 'needs-owner') {
        apiUrl = `https://api.github.com/repos/${REPO}/issues?labels=guestbook,needs-owner&state=open&per_page=100&sort=created&direction=desc`;
      }
    }

    const res = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Guanwu-Guestbook/3.0',
      },
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: '获取留言失败' }), {
        status: 500, headers: { 'Content-Type': 'application/json', ...cors(request) }
      });
    }

    const issues = await res.json();

    const messages = issues
      .filter((i: any) => !i.pull_request)
      .map((issue: any) => {
        const b = issue.body || '';
        const contentMatch = b.match(/## 📝 留言内容\n\n([\s\S]*?)(?:\n\n##|$)/);
        const contactMatch = b.match(/## 📮 联系方式\n\n([\s\S]*?)(?:\n\n##|$)/);
        const replyMatch = b.match(/## 🤖 AI 回复\n\n([\s\S]*?)\n\n---/);
        const catLabel = b.match(/\*\*分类\*\*: (.+)/);
        const priority = b.match(/\*\*优先级\*\*: (.+)/);
        const needsOwner = b.match(/\*\*需负责人处理\*\*: (.+)/);
        const labels = issue.labels?.map((l: any) => l.name) || [];

        return {
          id: issue.number,
          title: issue.title,
          content: contentMatch ? contentMatch[1].trim() : '',
          contact: contactMatch ? contactMatch[1].trim() : '',
          categoryLabel: catLabel ? catLabel[1] : '💬 讨论',
          priority: priority ? priority[1] : '',
          needsOwner: needsOwner ? needsOwner[1] === '✅ 是' : false,
          aiReply: replyMatch ? replyMatch[1].trim() : '',
          createdAt: issue.created_at,
          state: issue.state,
          url: issue.html_url,
          labels,
          comments: issue.comments,
        };
      });

    if (!isAdmin) {
      messages.forEach((m: any) => { m.contact = ''; m.needsOwner = false; m.priority = ''; });
    }

    const stats = {
      total: messages.length,
      open: messages.filter((m: any) => m.state === 'open').length,
      needsOwner: messages.filter((m: any) => m.needsOwner).length,
    };

    return new Response(JSON.stringify({ messages, stats }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...cors(request) }
    });
  } catch (e) {
    console.error('Guestbook get error:', e);
    return new Response(JSON.stringify({ error: '获取失败' }), {
      status: 500, headers: { 'Content-Type': 'application/json', ...cors(request) }
    });
  }
}

export async function onRequestOptions(context: { request: Request }) {
  return new Response(null, { headers: cors(context.request) });
}
