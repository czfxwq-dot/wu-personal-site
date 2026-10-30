// 共用 LLM 调用层（Cloudflare Pages Functions 运行时）
// 与已停用的 openclaw 网关解耦：直接调用 OpenAI 兼容接口，默认 DeepSeek。
//
// 需要的环境变量（在 Cloudflare Pages → Settings → Environment variables 配置）：
//   LLM_API_KEY   必填。DeepSeek 的 API Key（也接受 DEEPSEEK_API_KEY 这个别名）
//   LLM_BASE_URL  选填。默认 https://api.deepseek.com/v1
//   LLM_MODEL     选填。默认 deepseek-chat
// 换成通义/智谱等其它兼容服务时，只改这三个变量即可，无需改代码。

export interface LLMConfig {
  baseUrl: string;
  apiKey: string;
  model: string;
}

export function llmConfig(env: any): LLMConfig | null {
  const apiKey = (env?.LLM_API_KEY || env?.DEEPSEEK_API_KEY || '').trim();
  if (!apiKey) return null;
  const baseUrl = (env?.LLM_BASE_URL || 'https://api.deepseek.com/v1').trim().replace(/\/+$/, '');
  const model = (env?.LLM_MODEL || 'deepseek-chat').trim();
  return { baseUrl, apiKey, model };
}

function endpoint(cfg: LLMConfig): string {
  // DeepSeek 的 https://api.deepseek.com 和 https://api.deepseek.com/v1 都可用
  return `${cfg.baseUrl}/chat/completions`;
}

export function callChat(
  cfg: LLMConfig,
  body: Record<string, unknown>
): Promise<Response> {
  return fetch(endpoint(cfg), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cfg.apiKey}`,
    },
    body: JSON.stringify({ model: cfg.model, ...body }),
  });
}

/** 非流式调用，返回纯文本；失败返回 null（调用方自行降级） */
export async function llmComplete(
  cfg: LLMConfig,
  messages: Array<{ role: string; content: string }>,
  opts: { maxTokens?: number; temperature?: number } = {}
): Promise<string | null> {
  try {
    const res = await callChat(cfg, {
      stream: false,
      temperature: opts.temperature ?? 0.6,
      max_tokens: opts.maxTokens ?? 400,
      messages,
    });
    if (!res.ok) {
      console.error('LLM error:', res.status, (await res.text()).slice(0, 300));
      return null;
    }
    const data: any = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    return typeof text === 'string' && text.trim() ? text.trim() : null;
  } catch (e) {
    console.error('LLM request failed:', e);
    return null;
  }
}

// ---------------- 简易限流（单 isolate 内存计数，尽力而为） ----------------
// 用途：防止公开接口被脚本刷爆。Worker isolate 会被回收、多机房各自计数，
// 所以它是「削峰」而不是严格的全局配额。真要严格限额需接 KV/Durable Objects。

const buckets = new Map<string, { count: number; reset: number }>();

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  if (buckets.size > 5000) buckets.clear(); // 兜底，避免内存无限增长
  const b = buckets.get(key);
  if (!b || now > b.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  if (b.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((b.reset - now) / 1000) };
  }
  b.count += 1;
  return { ok: true, retryAfter: 0 };
}

export function clientIp(request: Request): string {
  return (
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

export const ALLOWED_ORIGINS = [
  'https://wu-personal-site.pages.dev',
  'https://www.ban-bai.com',
  'https://ban-bai.com',
];

export function cors(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin') || '';
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
