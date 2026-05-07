#!/usr/bin/env node
// CORS proxy for OpenClaw Gateway - runs on port 18790
// Quick Tunnel points to this, adds CORS headers for browser access
const http = require('http');

const PORT = 18790;
const GATEWAY_TOKEN = 'bd75b779368fc2b5d26797c610583681c8f968321993a7f2';

const server = http.createServer((req, res) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json', ...corsHeaders });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  let body = '';
  req.on('data', c => { body += c; });
  req.on('end', () => {
    const proxyReq = http.request({
      hostname: '127.0.0.1',
      port: 18789,
      path: req.url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GATEWAY_TOKEN}`,
        'Content-Length': Buffer.byteLength(body),
      },
    }, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, {
        ...proxyRes.headers,
        ...corsHeaders,
      });
      proxyRes.pipe(res);
    });
    proxyReq.on('error', (err) => {
      res.writeHead(502, { 'Content-Type': 'application/json', ...corsHeaders });
      res.end(JSON.stringify({ error: 'Gateway error: ' + err.message }));
    });
    proxyReq.write(body);
    proxyReq.end();
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`CORS proxy listening on 127.0.0.1:${PORT}`);
});
