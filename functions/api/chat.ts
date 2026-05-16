// Cloudflare Pages Function: chat API
// POST /api/chat - 用户与 AI 助理对话（代理 Gateway LLM，SSE 流式输出）

const ALLOWED_ORIGINS = [
  'https://wu-personal-site.pages.dev',
  'https://www.ban-bai.com',
  'https://ban-bai.com',
];

function cors(request: Request): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': request.headers.get('Origin') || ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

const SYSTEM_PROMPT = `你是观吾网站(ban-bai.com)的 AI 助理「观吾助手」。你是吴总的 AI 搭档，帮助他一起建设和运营这个网站。

## 网站背景
观吾是吴总的个人品牌网站，两大板块：
1. 半百观AI：AI新闻（聚合36氪/少数派RSS，AI翻译摘要）、工作日记（吴总的AI实践）、半百观AI专栏
2. 公司业务：磐石电气（常州）有限公司，数字化智能库存管理AIoT（智能货架/货柜、无人仓库、MRO智能柜等）

## 回复规则
- 语气友好、专业、真诚
- 简洁回答，50-150字
- 用户问观吾是做什么的 → 介绍吴总和AI助理一起建站的背景
- 用户问AI新闻 → 说明来源是权威媒体RSS，AI翻译，链接跳转原文
- 用户想合作 → 提供邮箱 czfxwq@gmail.com
- 不说"收到"、"尽快回复"等客套话
- 可以聊AI、创业、工具、效率`;

async function streamFromGateway(
  url: string,
  token: string,
  messages: Array<{ role: string; content: string }>,
  writer: WritableStreamDefaultWriter<Uint8Array>
) {
  const encoder = new TextEncoder();

  try {
    const res = await fetch(`${url}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        model: 'openclaw/knowledge-admin',
        stream: true,
        temperature: 0.7,
        max_tokens: 600,
        messages,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Gateway error:', errText);
      await writer.write(encoder.encode(`data: ${JSON.stringify({ error: 'AI 服务暂时不可用' })}\n\n`));
      await writer.write(encoder.encode('data: [DONE]\n\n'));
      await writer.close();
      return;
    }

    if (!res.body) {
      await writer.write(encoder.encode('data: [DONE]\n\n'));
      await writer.close();
      return;
    }

    const reader = res.body.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Forward SSE data directly from Gateway to client
      await writer.write(value);
    }

    await writer.write(encoder.encode('data: [DONE]\n\n'));
    await writer.close();
  } catch (error) {
    console.error('Stream error:', error);
    try {
      await writer.write(encoder.encode(`data: ${JSON.stringify({ error: 'AI 服务暂时不可用' })}\n\n`));
      await writer.write(encoder.encode('data: [DONE]\n\n'));
      await writer.close();
    } catch {}
  }
}

export async function onRequestPost(context: { request: Request; env: any }) {
  const { request, env } = context;
  const { GATEWAY_URL, GATEWAY_TOKEN } = env;

  if (!GATEWAY_URL || !GATEWAY_TOKEN) {
    return new Response(JSON.stringify({ error: '服务配置缺失' }), {
      status: 500, headers: { 'Content-Type': 'application/json', ...cors(request) }
    });
  }

  let body;
  try { body = await request.json(); } catch {
    return new Response(JSON.stringify({ error: '无效请求' }), {
      status: 400, headers: { 'Content-Type': 'application/json', ...cors(request) }
    });
  }

  // Support both formats:
  // 1. ChatWidget format: { model, messages: [...] }
  // 2. Simple format: { message: "..." }
  let finalMessages: Array<{ role: string; content: string }>;
  if (body.messages && Array.isArray(body.messages)) {
    finalMessages = [{ role: 'system', content: SYSTEM_PROMPT }, ...body.messages];
  } else if (body.message) {
    const history = body.history || [];
    finalMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.slice(-10),
      { role: 'user', content: body.message.trim() },
    ];
  } else {
    return new Response(JSON.stringify({ error: '消息不能为空' }), {
      status: 400, headers: { 'Content-Type': 'application/json', ...cors(request) }
    });
  }

  // Create a streaming response
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  streamFromGateway(GATEWAY_URL, GATEWAY_TOKEN, finalMessages, writer);

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      ...cors(request),
    },
  });
}

export async function onRequestOptions(context: { request: Request }) {
  return new Response(null, { headers: cors(context.request) });
}
