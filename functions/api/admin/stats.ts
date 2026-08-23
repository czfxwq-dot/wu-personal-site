// GET /api/admin/stats — 获取调查统计数据

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
    // Total responses
    const totalResult = await env.SURVEY_DB.prepare('SELECT COUNT(*) as count FROM responses').first();
    const total = totalResult?.count || 0;

    // Average duration
    const durResult = await env.SURVEY_DB.prepare('SELECT AVG(duration_sec) as avg_dur FROM responses WHERE duration_sec > 0').first();
    const avgDuration = Math.round((durResult?.avg_dur || 0));

    // Math check pass rate (answer = 83)
    const mathResult = await env.SURVEY_DB.prepare(
      'SELECT COUNT(*) as pass FROM math_test WHERE answer = 83'
    ).first();
    const mathPassRate = total > 0 ? Math.round(((mathResult?.pass || 0) / total) * 100) : 0;

    // Decision choice distribution per question
    const decResult = await env.SURVEY_DB.prepare(
      'SELECT question_no, choice, COUNT(*) as cnt FROM decisions GROUP BY question_no, choice ORDER BY question_no, choice'
    ).all();

    // Demographics
    const genderResult = await env.SURVEY_DB.prepare(
      'SELECT gender, COUNT(*) as cnt FROM demographics GROUP BY gender ORDER BY cnt DESC'
    ).all();

    const ageResult = await env.SURVEY_DB.prepare(
      'SELECT age_group, COUNT(*) as cnt FROM demographics GROUP BY age_group ORDER BY cnt DESC'
    ).all();

    const eduResult = await env.SURVEY_DB.prepare(
      'SELECT education, COUNT(*) as cnt FROM demographics GROUP BY education ORDER BY cnt DESC'
    ).all();

    const childResult = await env.SURVEY_DB.prepare(
      'SELECT has_child, COUNT(*) as cnt FROM demographics GROUP BY has_child ORDER BY cnt DESC'
    ).all();

    // PANAS averages
    const panasResult = await env.SURVEY_DB.prepare(
      'SELECT item, AVG(score) as avg_score FROM panas GROUP BY item ORDER BY item'
    ).all();

    // Confidence & happiness averages
    const confResult = await env.SURVEY_DB.prepare(
      'SELECT question_no, AVG(confidence) as avg_conf, AVG(happiness) as avg_hap FROM decisions GROUP BY question_no ORDER BY question_no'
    ).all();

    // Recent submissions
    const recentResult = await env.SURVEY_DB.prepare(
      'SELECT id, session_id, lang, created_at, duration_sec FROM responses ORDER BY created_at DESC LIMIT 10'
    ).all();

    // Lang distribution
    const langResult = await env.SURVEY_DB.prepare(
      'SELECT lang, COUNT(*) as cnt FROM responses GROUP BY lang'
    ).all();

    return new Response(JSON.stringify({
      total,
      avgDuration,
      mathPassRate,
      decisions: decResult.results,
      demographics: {
        gender: genderResult.results,
        age: ageResult.results,
        education: eduResult.results,
        hasChild: childResult.results,
      },
      panas: panasResult.results,
      confidence: confResult.results,
      recent: recentResult.results,
      langDistribution: langResult.results,
    }), { status: 200, headers: corsHeaders });
  } catch (err) {
    console.error('Stats error:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch stats' }), { status: 500, headers: corsHeaders });
  }
}
