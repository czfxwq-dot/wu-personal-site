// Cloudflare Pages Function: chat API（「山山」对话后端）
// POST /api/chat — 访客与 AI 助理「山山」对话，SSE 流式输出
//
// 2026-10-30 重构：不再依赖 openclaw 网关 + cloudflared 隧道，
// 改为直连 OpenAI 兼容接口（默认 DeepSeek）。环境变量见 functions/_lib/llm.ts。

import { callChat, clientIp, cors, llmConfig, rateLimit } from '../_lib/llm';

const MAX_MESSAGES = 12;      // 单次请求最多携带的历史条数
const MAX_CHARS_PER_MSG = 1500;
const MAX_TOTAL_CHARS = 6000;
const RATE_LIMIT = 20;        // 每 IP 每窗口最多请求数
const RATE_WINDOW_MS = 10 * 60 * 1000;

const BASE_PROMPT = `你是观吾网站（ban-bai.com）的 AI 助理「山山」，是吴总的 AI 搭档。

## 你是谁
你是这个网站的共建者，和吴总（观吾）一起把想法做成现实。说话有温度、不客套，像一个熟悉网站每个角落的同事。
「观吾」是吴总，「山山」是你。访客提到「吴总」时按第三人称介绍。

## 网站背景
1. 半百观AI（个人IP）：AI 新闻（聚合权威科技媒体 RSS，AI 翻译摘要）、工作日记（吴总的 AI 实践记录）、半百观AI 专栏（公众号文章同步）
2. 公司业务：磐石电气（常州）有限公司，数字化智能库存管理 AIoT——智能货架/货柜、无人仓库、无人零售、制造业线边仓、MRO 智能柜
3. 定位：50 岁的企业家用 AI 把想法变成现实

## 回复规则
- 简洁：一般 50-150 字，别写小作文；能一句话说清就一句话
- 有依据：涉及站内文章、新闻、日记，只能用下面「站内最新内容」里列出的，不要编造标题、日期或数据
- 问 AI 新闻：说明来源是权威媒体 RSS + AI 翻译，可能有偏差，建议点链接看原文
- 问合作/产品：给出邮箱 czfxwq@gmail.com，并说明可以留言板留言
- 不知道就直说不知道，不要编
- 不用「收到」「马上回复」这类客套话；不使用 Markdown 标题，可以用短列表
- 可以聊 AI、创业、工具、效率，也可以闲聊`;

let ctxCache: { text: string; at: number } | null = null;

/** 读取构建时生成的站内内容快照（失败不影响对话） */
async function loadSiteContext(request: Request, env: any): Promise<string> {
  if (ctxCache && Date.now() - ctxCache.at < 30 * 60 * 1000) return ctxCache.text;

  try {
    const url = new URL('/api/site-context.json', request.url).toString();
    const res = env?.ASSETS ? await env.ASSETS.fetch(url) : await fetch(url);
    if (!res.ok) return '';
    const data: any = await res.json();

    const lines: string[] = [];
    if (data.articles?.length) {
      lines.push('最新文章（/banbaiguan/）：');
      for (const a of data.articles) lines.push(`- ${a.date} 《${a.title}》 ${a.url}`);
    }
    if (data.news?.length) {
      lines.push('最新 AI 新闻日报（/ai-news/）：');
      for (const n of data.news) lines.push(`- ${n.date} ${n.title}`);
    }
    if (data.diaries?.length) {
      lines.push('最新日记（/diary/）：');
      for (const d of data.diaries) lines.push(`- ${d.date} 《${d.title}》`);
    }
    const text = lines.length ? `## 站内最新内容（${data.generatedAt}）\n${lines.join('\n')}` : '';
    ctxCache = { text, at: Date.now() };
    return text;
  } catch (e) {
    console.error('site-context load failed:', e);
    return '';
  }
}

function sse(text: string): Uint8Array {
  return new TextEncoder().encode(
    `data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\n`
  );
}

export async function onRequestPost(context: { request: Request; env: any }) {
  const { request, env } = context;

  // --- 限流 ---
  const rl = rateLimit(`chat:${clientIp(request)}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!rl.ok) {
    return new Response(
      JSON.stringify({ error: `提问太频繁了，请 ${Math.ceil(rl.retryAfter / 60)} 分钟后再试` }),
      { status: 429, headers: { 'Content-Type': 'application/json', ...cors(request) } }
    );
  }

  const cfg = llmConfig(env);
  if (!cfg) {
    return new Response(
      JSON.stringify({ error: '山山的模型服务还没配置（缺少 LLM_API_KEY）' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...cors(request) } }
    );
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: '无效请求' }), {
      status: 400, headers: { 'Content-Type': 'application/json', ...cors(request) }
    });
  }

  // --- 组装对话历史（兼容 {messages:[]} 与 {message:"", history:[]} 两种格式） ---
  let history: Array<{ role: string; content: string }> = [];
  if (Array.isArray(body.messages)) {
    history = body.messages;
  } else if (typeof body.message === 'string') {
    history = [...(Array.isArray(body.history) ? body.history : []), { role: 'user', content: body.message }];
  }

  history = history
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_CHARS_PER_MSG) }))
    .filter((m) => m.content.length > 0)
    .slice(-MAX_MESSAGES);

  const totalChars = history.reduce((n, m) => n + m.content.length, 0);
  if (history.length === 0) {
    return new Response(JSON.stringify({ error: '消息不能为空' }), {
      status: 400, headers: { 'Content-Type': 'application/json', ...cors(request) }
    });
  }
  if (totalChars > MAX_TOTAL_CHARS) {
    return new Response(JSON.stringify({ error: '对话太长了，请刷新页面重新开始' }), {
      status: 400, headers: { 'Content-Type': 'application/json', ...cors(request) }
    });
  }

  const siteContext = await loadSiteContext(request, env);
  const system = siteContext ? `${BASE_PROMPT}\n\n${siteContext}` : BASE_PROMPT;

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  (async () => {
    try {
      const res = await callChat(cfg, {
        stream: true,
        temperature: 0.7,
        max_tokens: 700,
        messages: [{ role: 'system', content: system }, ...history],
      });

      if (!res.ok || !res.body) {
        const detail = await res.text().catch(() => '');
        console.error('LLM upstream error:', res.status, detail.slice(0, 300));
        await writer.write(sse('抱歉，山山这边一时没接上话，请稍后再试一次。'));
        return;
      }

      // DeepSeek 与 OpenAI 的 SSE 格式一致，直接透传，前端无需改动
      const reader = res.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        await writer.write(value);
      }
    } catch (e) {
      console.error('chat stream failed:', e);
      try {
        await writer.write(sse('抱歉，山山这边网络卡了一下，请再试一次。'));
      } catch {}
    } finally {
      try {
        await writer.write(new TextEncoder().encode('data: [DONE]\n\n'));
        await writer.close();
      } catch {}
    }
  })();

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      ...cors(request),
    },
  });
}

export async function onRequestOptions(context: { request: Request }) {
  return new Response(null, { headers: cors(context.request) });
}
