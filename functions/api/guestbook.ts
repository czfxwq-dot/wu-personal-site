// Cloudflare Pages Function: guestbook API
// POST /api/guestbook - 提交留言（LLM 分类 + 回复 + GitHub Issue）
// GET /api/guestbook - 获取留言列表
// GET /api/guestbook/admin/stats - 管理数据

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

// ========== LLM 智能分析 ==========

const SYSTEM_PROMPT = `你是观吾网站的智能留言助理。观吾是一家专注于"数字化智能库存管理 AIoT"的公司，产品包括智能货架/货柜、无人仓库、无人零售店、制造业线边仓等。旗下还有个人 IP 品牌"半百观AI"，分享 AI 工具落地实践。

请分析用户留言，输出 JSON 格式：
{
  "category": 分类（suggestion/product/bug/cooperation/praise/discussion/inquiry）,
  "categoryLabel": 中文标签（如 "💡 产品建议" / "🤝 合作意向" / "🔧 问题反馈" / "❤️ 鼓励" / "💬 讨论" / "❓ 咨询"）,
  "emoji": 对应 emoji,
  "priority": "low" | "medium" | "high" | "urgent",
  "needsOwner": 是否需要负责人亲自处理（true/false）,
  "reply": 用中文直接回复用户，语气真诚、专业、有温度，不要套话，根据观吾的业务和实际情况回答（100字以内）
}

分类规则：
- suggestion: 产品功能建议
- product: 想了解产品/方案（有商业价值）
- bug: 报告问题或故障
- cooperation: 商务合作、投资、渠道
- praise: 鼓励、夸奖
- discussion: 一般讨论、观点交流
- inquiry: 好奇、不了解网站用途

优先级规则：
- urgent: 系统故障、安全事件
- high: 重要合作意向、大客户咨询
- medium: 产品建议、一般咨询
- low: 鼓励、普通讨论

注意：
- reply 必须是真诚的个性化回复，不要套话
- 如果是 inquiry（不了解网站），要清晰说明观吾做什么
- 如果是 cooperation 或 product，回复中提供联系方式 czfxwq@gmail.com
- needsOwner: cooperation/product 为 true，inquiry/bug high 为 true，其他为 false`;

async function llmAnalyze(content: string, env: any): Promise<{
  category: string;
  categoryLabel: string;
  emoji: string;
  priority: string;
  needsOwner: boolean;
  reply: string;
}> {
  const { GATEWAY_URL, GATEWAY_TOKEN } = env;

  if (!GATEWAY_URL || !GATEWAY_TOKEN) {
    // 降级：关键词分类
    return fallbackClassify(content);
  }

  try {
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
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: content },
        ],
      }),
    });

    if (!res.ok) throw new Error(`Gateway ${res.status}`);

    const data = await res.json();
    const replyText = data.choices?.[0]?.message?.content || '';

    // 解析 JSON 回复
    const jsonMatch = replyText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        category: parsed.category || 'discussion',
        categoryLabel: parsed.categoryLabel || '💬 讨论',
        emoji: parsed.emoji || '💬',
        priority: parsed.priority || 'low',
        needsOwner: !!parsed.needsOwner,
        reply: parsed.reply || defaultReply('discussion'),
      };
    }

    return fallbackClassify(content);
  } catch (e) {
    console.error('LLM analysis failed, using fallback:', e);
    return fallbackClassify(content);
  }
}

function fallbackClassify(content: string) {
  const text = content.toLowerCase();
  if (text.includes('合作') || text.includes('商务') || text.includes('渠道') || text.includes('代理')) {
    return { category: 'cooperation', categoryLabel: '🤝 合作意向', emoji: '🤝', priority: 'high', needsOwner: true, reply: defaultReply('cooperation') };
  }
  if (text.includes('bug') || text.includes('错误') || text.includes('坏') || text.includes('打不开')) {
    return { category: 'bug', categoryLabel: '🔧 问题反馈', emoji: '🔧', priority: 'medium', needsOwner: false, reply: defaultReply('bug') };
  }
  if (text.includes('建议') || text.includes('想法') || text.includes('功能')) {
    return { category: 'suggestion', categoryLabel: '💡 产品建议', emoji: '💡', priority: 'medium', needsOwner: false, reply: defaultReply('suggestion') };
  }
  if (text.includes('不知道') || text.includes('有什么用') || text.includes('是干什么')) {
    return { category: 'inquiry', categoryLabel: '❓ 咨询', emoji: '❓', priority: 'medium', needsOwner: false, reply: defaultReply('inquiry') };
  }
  if (text.includes('好') || text.includes('棒') || text.includes('喜欢') || text.includes('感谢')) {
    return { category: 'praise', categoryLabel: '❤️ 鼓励', emoji: '❤️', priority: 'low', needsOwner: false, reply: defaultReply('praise') };
  }
  return { category: 'discussion', categoryLabel: '💬 讨论', emoji: '💬', priority: 'low', needsOwner: false, reply: defaultReply('discussion') };
}

function defaultReply(category: string): string {
  const replies: Record<string, string> = {
    cooperation: '感谢你的合作意向！🤝 我们非常重视合作机会，请邮件联系 czfxwq@gmail.com，我们会尽快回复。',
    bug: '感谢反馈问题！🔧 我们会尽快排查修复。如果方便，请补充复现步骤。',
    suggestion: '感谢建议！💡 我们会认真考虑，持续优化产品体验。',
    inquiry: '观吾是一家专注于数字化智能库存管理的公司，提供智能货架、无人仓库、AIoT 解决方案。旗下还有「半百观AI」分享 AI 实践。欢迎了解更多！',
    praise: '谢谢你的鼓励！❤️ 你的支持是我们前进的动力。',
    discussion: '收到你的留言！💬 我们会尽快回复你。',
  };
  return replies[category] || replies['discussion'];
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

  // LLM 智能分析
  const analysis = await llmAnalyze(content, env);

  const title = `${analysis.emoji} ${content.substring(0, 50)}${content.length > 50 ? '…' : ''}`;

  // 优先级标签
  const priorityLabels: Record<string, string> = {
    urgent: '🔴 紧急',
    high: '🟠 重要',
    medium: '🟡 普通',
    low: '🟢 低优',
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
        'User-Agent': 'Guanwu-Guestbook/2.0',
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
    let apiUrl = `https://api.github.com/repos/${REPO}/issues?labels=guestbook&state=all&per_page=50&sort=created&direction=desc`;

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
        'User-Agent': 'Guanwu-Guestbook/2.0',
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
