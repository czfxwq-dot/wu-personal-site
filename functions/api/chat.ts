// Cloudflare Pages Function: POST /api/chat
// 代理请求到 OpenClaw Gateway
// Gateway URL 和 Token 通过环境变量传入

const ALLOWED_ORIGINS = [
  'https://wu-personal-site.pages.dev',
  'https://www.ban-bai.com',
  'https://ban-bai.com',
];

function getOrigin(request: Request) {
  return request.headers.get('Origin') || ALLOWED_ORIGINS[0];
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const GATEWAY_URL = env.GATEWAY_URL;
  const GATEWAY_TOKEN = env.GATEWAY_TOKEN;

  if (!GATEWAY_URL || !GATEWAY_TOKEN) {
    return new Response(JSON.stringify({ error: 'Gateway 配置缺失，请联系管理员' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: '无效的请求格式' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!body.messages || !Array.isArray(body.messages)) {
    return new Response(JSON.stringify({ error: '缺少 messages 字段' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const gatewayResponse = await fetch(`${GATEWAY_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GATEWAY_TOKEN}`,
      },
      body: JSON.stringify({
        model: 'openclaw/xs-001',
        stream: true,
        messages: body.messages,
      }),
    });

    if (!gatewayResponse.ok) {
      return new Response(JSON.stringify({ error: '服务暂时不可用' }), {
        status: gatewayResponse.status === 429 ? 429 : 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 流式转发
    const { readable, writable } = new TransformStream();
    gatewayResponse.body.pipeTo(writable);

    const origin = getOrigin(request);
    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Access-Control-Allow-Origin': origin,
        'Cache-Control': 'no-cache',
      }
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(JSON.stringify({ error: '服务连接失败' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestOptions(context: { request: Request }) {
  const { request } = context;
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': getOrigin(request),
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
