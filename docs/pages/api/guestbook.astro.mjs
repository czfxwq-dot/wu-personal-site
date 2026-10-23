import { promises } from 'fs';
import path from 'path';
export { renderers } from '../../renderers.mjs';

const DATA_FILE = path.resolve("./src/data/guestbook.json");
const GET = async () => {
  try {
    const raw = await promises.readFile(DATA_FILE, "utf-8");
    const messages = JSON.parse(raw);
    const safe = messages.map((m) => ({
      id: m.id,
      name: m.name,
      content: m.content,
      createdAt: m.createdAt,
      reply: m.reply,
      replyAt: m.replyAt
    })).reverse();
    return new Response(JSON.stringify(safe), {
      headers: { "Content-Type": "application/json" }
    });
  } catch {
    return new Response(JSON.stringify([]), {
      headers: { "Content-Type": "application/json" }
    });
  }
};
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, content, email } = body;
    if (!name || !content) {
      return new Response(JSON.stringify({ error: "姓名和留言内容不能为空" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (content.length > 500) {
      return new Response(JSON.stringify({ error: "留言内容不能超过 500 字" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    let messages = [];
    try {
      const raw = await promises.readFile(DATA_FILE, "utf-8");
      messages = JSON.parse(raw);
    } catch {
      messages = [];
    }
    const id = `msg-${Date.now()}`;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const newMsg = {
      id,
      name: name.trim(),
      content: content.trim(),
      email: (email || "").trim(),
      createdAt: now,
      reply: "",
      replyAt: ""
    };
    messages.push(newMsg);
    await promises.writeFile(DATA_FILE, JSON.stringify(messages, null, 2), "utf-8");
    return new Response(JSON.stringify({
      success: true,
      message: "留言成功！AI 助理会尽快回复你 💬",
      id
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "提交失败，请稍后重试" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
