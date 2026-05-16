// Cloudflare Pages Function: guestbook API
// POST /api/guestbook - 提交留言（创建 GitHub Issue）
// GET /api/guestbook - 获取留言列表（读取 GitHub Issues）
// GET /api/guestbook/admin/stats - 管理统计数据

const REPO = 'czfxwq-dot/wu-personal-site';
const ALLOWED_ORIGINS = [
  'https://wu-personal-site.pages.dev',
  'https://www.ban-bai.com',
  'https://ban-bai.com',
];

function getOrigin(request: Request): string {
  return request.headers.get('Origin') || ALLOWED_ORIGINS[0];
}

function corsHeaders(request: Request): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': getOrigin(request),
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

// ========== AI 自动分类 ==========

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'suggestion': ['建议', '想法', '可以', '希望', '应该', '能不能', '如果', '增加', '添加', '优化', '改进', '功能', 'feature'],
  'bug': ['bug', '错误', '问题', '不工作', '坏了', '打不开', '加载', '报错', '崩溃', '乱码'],
  'cooperation': ['合作', '联系', '商务', '项目', '定制', '咨询', '产品', '方案', '购买', '价格', '报价', 'demo', '试用'],
  'praise': ['好', '棒', '厉害', '喜欢', '赞', '优秀', '感谢', '谢谢', '支持', '不错', '牛', '强', '666'],
};

function autoCategorize(content: string): { category: string; label: string; emoji: string } {
  const text = (content + ' ').toLowerCase();

  // Check cooperation first (highest priority)
  for (const keyword of CATEGORY_KEYWORDS['cooperation']) {
    if (text.includes(keyword.toLowerCase())) {
      return { category: 'cooperation', label: '🤝 合作意向', emoji: '🤝' };
    }
  }

  // Check bug
  for (const keyword of CATEGORY_KEYWORDS['bug']) {
    if (text.includes(keyword.toLowerCase())) {
      return { category: 'bug', label: '🐛 问题反馈', emoji: '🐛' };
    }
  }

  // Check praise
  for (const keyword of CATEGORY_KEYWORDS['praise']) {
    if (text.includes(keyword.toLowerCase())) {
      return { category: 'praise', label: '❤️ 鼓励', emoji: '❤️' };
    }
  }

  // Check suggestion
  for (const keyword of CATEGORY_KEYWORDS['suggestion']) {
    if (text.includes(keyword.toLowerCase())) {
      return { category: 'suggestion', label: '💡 产品建议', emoji: '💡' };
    }
  }

  // Default
  return { category: 'discussion', label: '💬 讨论', emoji: '💬' };
}

// ========== AI 自动回复模板 ==========

function generateAutoReply(category: string, content: string): string {
  const replies: Record<string, string> = {
    'suggestion': `感谢你的建议！🎯\n\n你的建议已分类为「产品建议」，我会认真考虑并反馈给团队。如果有进一步的想法或方案，欢迎随时补充留言。`,
    'bug': `感谢反馈问题！🔧\n\n你报告的「问题反馈」已收到。我们会尽快排查并修复。如果方便的话，请补充具体的复现步骤，帮助我们更快定位。`,
    'cooperation': `感谢你的合作意向！🤝\n\n我们非常重视你的留言。我们会尽快通过你留下的联系方式与你取得联系。如有紧急事项，也可以发送邮件到 czfxwq@gmail.com。`,
    'praise': `谢谢你的鼓励！❤️\n\n你的支持是我们持续前进的动力。观吾会不断优化，带来更多有价值的内容和工具。`,
    'discussion': `收到你的留言！💬\n\nAI 助理已自动记录，我们会尽快回复你。如果你有具体问题，也可以直接在留言中补充，我们会更有针对性地回答。`,
  };
  return replies[category] || replies['discussion'];
}

// ========== POST: 提交留言 ==========

export async function onRequestPost(context: { request: Request; env: any }) {
  const { request, env } = context;

  const GITHUB_TOKEN = env.GITHUB_TOKEN;
  if (!GITHUB_TOKEN) {
    return new Response(JSON.stringify({ error: '服务配置缺失' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(request) }
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: '无效的请求格式' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(request) }
    });
  }

  const { content, contact = '' } = body;
  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    return new Response(JSON.stringify({ error: '留言内容不能为空' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(request) }
    });
  }
  if (content.length > 1000) {
    return new Response(JSON.stringify({ error: '留言内容超过 1000 字限制' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(request) }
    });
  }

  const category = autoCategorize(content);
  const autoReply = generateAutoReply(category.category, content);

  const title = `${category.emoji} ${content.substring(0, 50)}${content.length > 50 ? '…' : ''}`;

  const issueBody = [
    `## 📝 留言内容\n\n${content}`,
    contact ? `## 📮 联系方式\n\n${contact}` : '## 📮 联系方式\n\n*用户未留联系方式*',
    `## 🤖 AI 分类\n\n**${category.label}**\n\n类别: \`${category.category}\``,
    `## 🤖 AI 自动回复\n\n${autoReply}`,
    `---\n\n> 此 Issue 由观吾留言板自动创建`,
  ].join('\n\n');

  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/issues`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'Guanwu-Guestbook/1.0',
      },
      body: JSON.stringify({
        title,
        body: issueBody,
        labels: ['guestbook', category.category],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('GitHub API error:', errText);
      return new Response(JSON.stringify({ error: '留言提交失败，请稍后重试' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(request) }
      });
    }

    const issue = await res.json();

    return new Response(JSON.stringify({
      success: true,
      issueId: issue.number,
      issueUrl: issue.html_url,
      category,
      autoReply,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(request) }
    });
  } catch (error) {
    console.error('Guestbook error:', error);
    return new Response(JSON.stringify({ error: '留言提交失败，请稍后重试' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(request) }
    });
  }
}

// ========== GET: 获取留言列表 ==========

export async function onRequestGet(context: { request: Request; env: any }) {
  const { request, env } = context;
  const url = new URL(request.url);
  const isAdmin = url.searchParams.get('admin') === 'true';
  const GITHUB_TOKEN = env.GITHUB_TOKEN;

  if (!GITHUB_TOKEN) {
    return new Response(JSON.stringify({ error: '服务配置缺失' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(request) }
    });
  }

  try {
    // 获取所有 guestbook 标签的 issues
    let apiUrl = `https://api.github.com/repos/${REPO}/issues?labels=guestbook&state=all&per_page=50&sort=created&direction=desc`;

    // 管理模式下支持按分类筛选
    if (isAdmin) {
      const category = url.searchParams.get('category');
      if (category && category !== 'all') {
        apiUrl = `https://api.github.com/repos/${REPO}/issues?labels=guestbook,${category}&state=all&per_page=100&sort=created&direction=desc`;
      }
    }

    const res = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Guanwu-Guestbook/1.0',
      },
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: '获取留言失败' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(request) }
      });
    }

    const issues = await res.json();

    // 解析留言数据
    const messages = issues
      .filter((issue: any) => !issue.pull_request) // 排除 PR
      .map((issue: any) => {
        const body = issue.body || '';

        // 提取内容
        const contentMatch = body.match(/## 📝 留言内容\n\n([\s\S]*?)(?:\n\n##|$)/);
        const contactMatch = body.match(/## 📮 联系方式\n\n([\s\S]*?)(?:\n\n##|$)/);
        const categoryMatch = body.match(/类别: `([^`]+)`/);
        const replyMatch = body.match(/## 🤖 AI 自动回复\n\n([\s\S]*?)\n\n---/);

        const categoryLabel = body.match(/\*\*(🔘[^*]+)\*\*/);

        return {
          id: issue.number,
          title: issue.title,
          content: contentMatch ? contentMatch[1].trim() : '',
          contact: contactMatch ? contactMatch[1].trim() : '',
          category: categoryMatch ? categoryMatch[1] : 'discussion',
          categoryLabel: categoryLabel ? categoryLabel[1] : '💬 讨论',
          aiReply: replyMatch ? replyMatch[1].trim() : '',
          createdAt: issue.created_at,
          updatedAt: issue.updated_at,
          comments: issue.comments,
          state: issue.state,
          url: issue.html_url,
          labels: issue.labels?.map((l: any) => l.name) || [],
        };
      });

    // 公开模式：隐藏联系方式
    if (!isAdmin) {
      messages.forEach((m: any) => { m.contact = ''; });
    }

    // 统计
    const stats = {
      total: messages.length,
      open: messages.filter((m: any) => m.state === 'open').length,
      closed: messages.filter((m: any) => m.state === 'closed').length,
      byCategory: {
        suggestion: messages.filter((m: any) => m.category === 'suggestion').length,
        bug: messages.filter((m: any) => m.category === 'bug').length,
        cooperation: messages.filter((m: any) => m.category === 'cooperation').length,
        praise: messages.filter((m: any) => m.category === 'praise').length,
        discussion: messages.filter((m: any) => m.category === 'discussion').length,
      },
      withContact: messages.filter((m: any) => m.contact && m.contact !== '*用户未留联系方式*').length,
    };

    return new Response(JSON.stringify({ messages, stats }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(request) }
    });
  } catch (error) {
    console.error('Guestbook get error:', error);
    return new Response(JSON.stringify({ error: '获取留言失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(request) }
    });
  }
}

// ========== OPTIONS ==========

export async function onRequestOptions(context: { request: Request }) {
  return new Response(null, { headers: corsHeaders(context.request) });
}
