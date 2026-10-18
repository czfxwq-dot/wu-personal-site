// POST /api/survey/submit — 提交调查数据
import type { Request as CFRequest } from '@cloudflare/workers-types';

interface Env {
  SURVEY_DB: D1Database;
}

interface SurveyPayload {
  session_id: string;
  lang: string;
  duration_sec: number;
  start_time: number;
  panas: Record<string, number>;
  decisions: Record<string, { choice: string; confidence: number; happiness: number }>;
  open_text: string;
  math_answer: number;
  demographics: Record<string, string>;
}

const ALLOWED_ORIGINS = [
  'https://wu-personal-site.pages.dev',
  'https://www.ban-bai.com',
  'https://ban-bai.com',
];

function getOrigin(request: Request) {
  return request.headers.get('Origin') || ALLOWED_ORIGINS[0];
}

const PANAS_KEYS = ['interested', 'enthusiastic', 'proud', 'inspired', 'determined', 'distressed', 'nervous', 'afraid', 'guilty', 'hostile'];
const DEMO_KEYS = ['gender', 'age', 'edu', 'child'];

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context;
  const origin = getOrigin(request);
  const corsHeaders = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const payload: SurveyPayload = await request.json();

    // Basic validation
    if (!payload.session_id || !payload.lang) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), { status: 400, headers: corsHeaders });
    }

    // Check duplicate session
    const existing = await env.SURVEY_DB.prepare('SELECT id FROM responses WHERE session_id = ?').bind(payload.session_id).first();
    if (existing) {
      return new Response(JSON.stringify({ success: true, message: 'Already submitted' }), { status: 200, headers: corsHeaders });
    }

    const now = new Date().toISOString();

    // Insert main response
    const res = await env.SURVEY_DB.prepare(
      `INSERT INTO responses (session_id, lang, created_at, submitted_at, duration_sec)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(
      payload.session_id,
      payload.lang,
      now,
      now,
      payload.duration_sec || 0
    ).run();

    const responseId = res.meta.last_row_id;

    // Insert PANAS scores
    for (let i = 0; i < PANAS_KEYS.length; i++) {
      const score = payload.panas[String(i)] || payload.panas[PANAS_KEYS[i]] || 1;
      await env.SURVEY_DB.prepare(
        'INSERT INTO panas (response_id, item, score) VALUES (?, ?, ?)'
      ).bind(responseId, PANAS_KEYS[i], score).run();
    }

    // Insert decisions
    const questionNos = Object.keys(payload.decisions);
    for (const qNo of questionNos) {
      const d = payload.decisions[qNo];
      if (d && d.choice) {
        await env.SURVEY_DB.prepare(
          'INSERT INTO decisions (response_id, question_no, choice, confidence, happiness) VALUES (?, ?, ?, ?, ?)'
        ).bind(responseId, parseInt(qNo), d.choice, d.confidence || 4, d.happiness || 4).run();
      }
    }

    // Insert open response
    if (payload.open_text) {
      await env.SURVEY_DB.prepare(
        'INSERT INTO open_response (response_id, content) VALUES (?, ?)'
      ).bind(responseId, payload.open_text).run();
    }

    // Insert math answer
    await env.SURVEY_DB.prepare(
      'INSERT INTO math_test (response_id, answer) VALUES (?, ?)'
    ).bind(responseId, payload.math_answer || 0).run();

    // Insert demographics
    const demo = payload.demographics || {};
    await env.SURVEY_DB.prepare(
      'INSERT INTO demographics (response_id, gender, age_group, education, has_child) VALUES (?, ?, ?, ?, ?)'
    ).bind(
      responseId,
      demo.gender || '',
      demo.age || '',
      demo.edu || '',
      demo.child || ''
    ).run();

    return new Response(JSON.stringify({ success: true, response_id: responseId }), { status: 200, headers: corsHeaders });
  } catch (err) {
    console.error('Survey submit error:', err);
    return new Response(JSON.stringify({ success: false, error: 'Internal error' }), { status: 500, headers: corsHeaders });
  }
}

export async function onRequestOptions(context: { request: Request }) {
  const { request } = context;
  const origin = getOrigin(request);
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
