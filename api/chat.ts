import type { APIRoute } from 'astro';

const GATEWAY_URL = 'https://gifts-wto-holmes-granted.trycloudflare.com/v1/chat/completions';
const GATEWAY_TOKEN = 'bd75b779368fc2b5d26797c610583681c8f968321993a7f2';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const resp = await fetch(GATEWAY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GATEWAY_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    if (body.stream && resp.ok) {
      return new Response(resp.body, {
        status: 200,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    const data = await resp.json();
    return new Response(JSON.stringify(data), {
      status: resp.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: '服务暂时不可用', detail: String(err) }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
