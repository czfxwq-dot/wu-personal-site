// GET /api/admin/responses — 获取详细回答列表

interface Env {
  SURVEY_DB: D1Database;
  SURVEY_ADMIN_PASSWORD: string;
}

function verifyToken(request: Request, env: Env): boolean {
  const auth = request.headers.get('Authorization') || '';
  if (!auth.startsWith('Bearer ')) return false;
  const token = auth.slice(7);
  try {
    const decoded = atob(token);
    const [pwd] = decoded.split(':');
    return pwd === (env.SURVEY_ADMIN_PASSWORD || '20070731');
  } catch {
    return false;
  }
}

const ALLOWED_ORIGINS = [
  'https://wu-personal-site.pages.dev',
  'https://www.ban-bai.com',
  'https://ban-bai.com',
];

function getOrigin(request: Request) {
  return request.headers.get('Origin') || ALLOWED_ORIGINS[0];
}

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context;
  const origin = getOrigin(request);
  const corsHeaders = {
    'Access-Control-Allow-Origin': origin,
    'Content-Type': 'application/json',
  };

  if (!verifyToken(request, env)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
  }

  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = Math.min(parseInt(url.searchParams.get('pageSize') || '20'), 100);
    const offset = (page - 1) * pageSize;

    // Get paginated responses
    const responsesResult = await env.SURVEY_DB.prepare(
      'SELECT r.*, d.gender, d.age_group, d.education, d.has_child, m.answer as math_answer, o.content as open_text FROM responses r LEFT JOIN demographics d ON d.response_id = r.id LEFT JOIN math_test m ON m.response_id = r.id LEFT JOIN open_response o ON o.response_id = r.id ORDER BY r.created_at DESC LIMIT ? OFFSET ?'
    ).bind(pageSize, offset).all();

    // Total count
    const countResult = await env.SURVEY_DB.prepare('SELECT COUNT(*) as total FROM responses').first();
    const total = countResult?.total || 0;

    // Get decisions for these responses
    const responseIds = (responsesResult.results || []).map((r: any) => r.id);
    let decisions: any[] = [];
    if (responseIds.length > 0) {
      const placeholders = responseIds.map(() => '?').join(',');
      decisions = (await env.SURVEY_DB.prepare(
        `SELECT response_id, question_no, choice, confidence, happiness FROM decisions WHERE response_id IN (${placeholders}) ORDER BY response_id, question_no`
      ).bind(...responseIds).all()).results;
    }

    // Get PANAS for these responses
    let panas: any[] = [];
    if (responseIds.length > 0) {
      const placeholders = responseIds.map(() => '?').join(',');
      panas = (await env.SURVEY_DB.prepare(
        `SELECT response_id, item, score FROM panas WHERE response_id IN (${placeholders}) ORDER BY response_id`
      ).bind(...responseIds).all()).results;
    }

    return new Response(JSON.stringify({
      responses: responsesResult.results,
      decisions,
      panas,
      pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
    }), { status: 200, headers: corsHeaders });
  } catch (err) {
    console.error('Responses error:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch responses' }), { status: 500, headers: corsHeaders });
  }
}
