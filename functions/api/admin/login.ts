// POST /api/admin/login — 管理员登录
// 通过环境变量 SURVEY_ADMIN_PASSWORD 验证密码

interface Env {
  SURVEY_ADMIN_PASSWORD: string;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context;
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const body = await request.json();
    const password = body.password || '';

    const expectedPassword = env.SURVEY_ADMIN_PASSWORD || '20070731';

    if (password === expectedPassword) {
      // Return a simple token (in production use proper JWT)
      const token = btoa(password + ':' + Date.now());
      return new Response(JSON.stringify({ success: true, token }), { status: 200, headers: corsHeaders });
    } else {
      return new Response(JSON.stringify({ success: false, error: '密码错误' }), { status: 401, headers: corsHeaders });
    }
  } catch {
    return new Response(JSON.stringify({ success: false, error: '请求失败' }), { status: 400, headers: corsHeaders });
  }
}

export async function onRequestOptions(context: { request: Request }) {
  const { request } = context;
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': request.headers.get('Origin') || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
