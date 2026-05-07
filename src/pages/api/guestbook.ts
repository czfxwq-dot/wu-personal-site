// 留言板 API — 纯自主方案，不依赖任何第三方
// POST /api/guestbook — 提交留言
// GET  /api/guestbook — 获取留言列表

import type { APIRoute } from 'astro';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.resolve('./src/data/guestbook.json');

export const GET: APIRoute = async () => {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    const messages = JSON.parse(raw);
    // 按时间倒序，隐藏 email
    const safe = messages.map((m: any) => ({
      id: m.id,
      name: m.name,
      content: m.content,
      createdAt: m.createdAt,
      reply: m.reply,
      replyAt: m.replyAt,
    })).reverse();
    return new Response(JSON.stringify(safe), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, content, email } = body;

    if (!name || !content) {
      return new Response(JSON.stringify({ error: '姓名和留言内容不能为空' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 简单防刷：内容不超过 500 字
    if (content.length > 500) {
      return new Response(JSON.stringify({ error: '留言内容不能超过 500 字' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 读取现有数据
    let messages: any[] = [];
    try {
      const raw = await fs.readFile(DATA_FILE, 'utf-8');
      messages = JSON.parse(raw);
    } catch {
      messages = [];
    }

    // 新留言
    const id = `msg-${Date.now()}`;
    const now = new Date().toISOString();
    const newMsg = {
      id,
      name: name.trim(),
      content: content.trim(),
      email: (email || '').trim(),
      createdAt: now,
      reply: '',
      replyAt: '',
    };

    messages.push(newMsg);
    await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2), 'utf-8');

    // 触发飞书通知（通过 OpenClaw cron）
    // 新留言会自动记录到文件，AI 助理巡检时会处理

    return new Response(JSON.stringify({
      success: true,
      message: '留言成功！AI 助理会尽快回复你 💬',
      id,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: '提交失败，请稍后重试' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
