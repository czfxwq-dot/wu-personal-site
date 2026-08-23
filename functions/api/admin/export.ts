// GET /api/admin/export — 导出 CSV 格式数据

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

export async function onRequestGet(context: { request: Request; env: Env }) {
  const { request, env } = context;

  if (!verifyToken(request, env)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    // Get all responses with joined data
    const responses = await env.SURVEY_DB.prepare(`
      SELECT r.id, r.session_id, r.lang, r.created_at, r.duration_sec,
             d.gender, d.age_group, d.education, d.has_child,
             m.answer as math_answer,
             o.content as open_text
      FROM responses r
      LEFT JOIN demographics d ON d.response_id = r.id
      LEFT JOIN math_test m ON m.response_id = r.id
      LEFT JOIN open_response o ON o.response_id = r.id
      ORDER BY r.created_at DESC
    `).all();

    const PANAS_ITEMS = ['interested', 'enthusiastic', 'proud', 'inspired', 'determined', 'distressed', 'nervous', 'afraid', 'guilty', 'hostile'];
    const QUESTION_NOS = [1, 3, 5, 6, 8, 9, 13, 14, 16, 17, 18, 21, 22];

    // Build CSV header
    const headers = [
      'ID', 'SessionID', 'Lang', 'CreatedAt', 'DurationSec', 'MathAnswer',
      'Gender', 'AgeGroup', 'Education', 'HasChild', 'OpenText',
      // PANAS
      ...PANAS_ITEMS.map(i => `panas_${i}`),
      // Decisions
      ...QUESTION_NOS.map(n => `Q${n}_choice`),
      ...QUESTION_NOS.map(n => `Q${n}_confidence`),
      ...QUESTION_NOS.map(n => `Q${n}_happiness`),
    ];

    const rows = [headers.join(',')];

    for (const resp of responses.results) {
      const r = resp as any;

      // Get PANAS scores
      const panasScores = await env.SURVEY_DB.prepare(
        'SELECT item, score FROM panas WHERE response_id = ?'
      ).bind(r.id).all();
      const panasMap: Record<string, number> = {};
      for (const p of panasScores.results) {
        panasMap[(p as any).item] = (p as any).score;
      }

      // Get decisions
      const decisionScores = await env.SURVEY_DB.prepare(
        'SELECT question_no, choice, confidence, happiness FROM decisions WHERE response_id = ?'
      ).bind(r.id).all();
      const decMap: Record<string, any> = {};
      for (const d of decisionScores.results) {
        decMap[(d as any).question_no] = d;
      }

      const row = [
        r.id,
        r.session_id,
        r.lang,
        r.created_at,
        r.duration_sec,
        r.math_answer,
        r.gender,
        r.age_group,
        r.education,
        r.has_child,
        '"' + (r.open_text || '').replace(/"/g, '""') + '"',
        ...PANAS_ITEMS.map(i => panasMap[i] || ''),
        ...QUESTION_NOS.map(n => decMap[n]?.choice || ''),
        ...QUESTION_NOS.map(n => decMap[n]?.confidence || ''),
        ...QUESTION_NOS.map(n => decMap[n]?.happiness || ''),
      ];

      rows.push(row.join(','));
    }

    const csv = '﻿' + rows.join('\n'); // BOM for Excel compatibility

    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="survey-export.csv"',
      }
    });
  } catch (err) {
    console.error('Export error:', err);
    return new Response(JSON.stringify({ error: 'Export failed' }), { status: 500 });
  }
}
