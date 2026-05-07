export interface Env {
  GATEWAY_URL: string;
  GATEWAY_TOKEN: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    if (url.pathname !== '/api/chat' || request.method !== 'POST') {
      return new Response('Not Found', { status: 404, headers: corsHeaders });
    }
    
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), { 
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }
    
    // Forward to Gateway
    try {
      const gatewayResp = await fetch(`${env.GATEWAY_URL}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.GATEWAY_TOKEN}`,
        },
        body: JSON.stringify({
          model: 'openclaw/default',
          stream: true,
          messages: body.messages,
        }),
      });
      
      if (!gatewayResp.ok) {
        return new Response(JSON.stringify({ error: 'Gateway error' }), {
          status: gatewayResp.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      // Stream response
      const { readable, writable } = new TransformStream();
      gatewayResp.body!.pipeTo(writable);
      
      return new Response(readable, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
        }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Connection failed' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};
