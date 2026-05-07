// Vercel Serverless Function — 留言板 API
// 部署到 Vercel 后自动生效
// POST /api/guestbook — 提交留言

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // 只允许 POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, content, email } = req.body;

  if (!name || !content) {
    return res.status(400).json({ error: '姓名和留言内容不能为空' });
  }

  if (content.length > 500) {
    return res.status(400).json({ error: '留言内容不能超过 500 字' });
  }

  // 留言数据文件路径
  const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'guestbook.json');

  // 读取现有数据
  let messages = [];
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    messages = JSON.parse(raw);
  } catch {
    messages = [];
  }

  // 新留言
  const id = `msg-${Date.now()}`;
  const now = new Date().toISOString();
  messages.push({
    id,
    name: name.trim(),
    content: content.trim(),
    email: (email || '').trim(),
    createdAt: now,
    reply: '',
    replyAt: '',
  });

  // 保存
  fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2), 'utf-8');

  return res.status(200).json({
    success: true,
    message: '留言成功！AI 助理会尽快回复你 💬',
    id,
  });
}
