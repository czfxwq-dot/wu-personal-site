export async function onRequest(context) {
  const { request } = context;

  // CORS
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await request.json();

    // Direct fetch to Gateway via Quick Tunnel
    const resp = await fetch("https://gifts-wto-holmes-granted.trycloudflare.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer bd75b779368fc2b5d26797c610583681c8f968321993a7f2",
      },
      body: JSON.stringify(body),
    });

    if (resp.ok && body.stream) {
      // SSE streaming
      const { readable, writable } = new TransformStream();
      resp.body.pipeTo(writable);
      return new Response(readable, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // JSON response
    const data = await resp.json();
    return new Response(JSON.stringify(data), {
      status: resp.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "proxy failed", detail: err.message, code: err.code }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
}
