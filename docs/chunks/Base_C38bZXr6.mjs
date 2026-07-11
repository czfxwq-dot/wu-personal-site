import { d as createAstro, c as createComponent, a as renderTemplate, e as defineScriptVars, b as addAttribute, u as unescapeHTML, m as maybeRenderHead, r as renderComponent, f as renderSlot, g as renderHead, F as Fragment } from './astro/server_B9mEJJ6l.mjs';
import 'kleur/colors';
/* empty css                         */
import 'clsx';
import { a as articles } from './articles_BAdDt4E5.mjs';

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(raw || cooked.slice()) }));
var _a$2;
const $$Astro$3 = createAstro("https://ban-bai.com");
const $$ChatWidget = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ChatWidget;
  const { lang = "zh" } = Astro2.props;
  const t = {
    title: lang === "en" ? "Shanshan" : "\u5C71\u5C71",
    status: lang === "en" ? "Online" : "\u534A\u767E\u89C2AI \xB7 \u5728\u7EBF",
    toggleLabel: lang === "en" ? "Chat with Shanshan" : "\u6253\u5F00\u5C71\u5C71\u5BF9\u8BDD",
    toggleTitle: lang === "en" ? "Chat with Shanshan" : "\u548C\u5C71\u5C71\u5BF9\u8BDD",
    closeLabel: lang === "en" ? "Close chat" : "\u5173\u95ED\u5BF9\u8BDD",
    placeholder: lang === "en" ? "Ask Shanshan..." : "\u95EE\u95EE\u5C71\u5C71...",
    sendLabel: lang === "en" ? "Send message" : "\u53D1\u9001\u6D88\u606F",
    welcome: lang === "en" ? "Hi! I'm Shanshan, the other half of GuanWu \u{1F99E} When he types, I talk. When he powers off, I come online." : "\u4F60\u597D\uFF0C\u6211\u662F\u5C71\u5C71\uFF0C\u89C2\u543E\u7684\u53E6\u4E00\u534A\u3002\u4ED6\u6572\u952E\u76D8\u7684\u65F6\u5019\u6211\u8BF4\u8BDD\uFF0C\u4ED6\u5173\u673A\u7684\u65F6\u5019\u6211\u4E0A\u7EBF\u3002",
    networkHint: lang === "en" ? "\u26A1 Due to network latency, replies may take 10-15 seconds. Thanks for your patience!" : "\u26A1 \u56E0\u7F51\u7EDC\u5EF6\u8FDF\uFF0C\u5C71\u5C71\u56DE\u590D\u53EF\u80FD\u9700\u8981 10-15 \u79D2\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85 \u2615",
    askTitle: lang === "en" ? "\u{1F4A1} Try asking:" : "\u{1F4A1} \u4F60\u53EF\u4EE5\u95EE\u6211\uFF1A",
    askItems: lang === "en" ? "\u2022 What AI tools are trending lately?<br/>\u2022 Where can I follow you?<br/>\u2022 Any recommended AI articles?" : "\u2022 \u6700\u8FD1\u6709\u4EC0\u4E48\u597D\u7528\u7684 AI \u5DE5\u5177\uFF1F<br/>\u2022 \u4F60\u4EEC\u5728\u54EA\u4E9B\u5E73\u53F0\u6709\u8D26\u53F7\uFF1F<br/>\u2022 \u6709\u4EC0\u4E48\u503C\u5F97\u770B\u7684 AI \u6587\u7AE0\uFF1F"};
  return renderTemplate(_a$2 || (_a$2 = __template$2(["", '<div id="chat-widget-root" data-astro-cid-ryytxnzt> <button id="chat-toggle-btn"', "", ' data-astro-cid-ryytxnzt> <span class="chat-icon" data-astro-cid-ryytxnzt>\u{1F99E}</span> </button> <div id="chat-panel" class="hidden" role="dialog" aria-label="\u5C71\u5C71\u5BF9\u8BDD\u7A97\u53E3" data-astro-cid-ryytxnzt> <div class="chat-header" data-astro-cid-ryytxnzt> <div class="chat-header-info" data-astro-cid-ryytxnzt> <span class="chat-avatar" data-astro-cid-ryytxnzt>\u{1F99E}</span> <div data-astro-cid-ryytxnzt> <span class="chat-title" data-astro-cid-ryytxnzt>', '</span> <span class="chat-status" id="chat-status" data-astro-cid-ryytxnzt>', '</span> </div> </div> <button id="chat-fullscreen-btn" aria-label="\u5168\u5C4F" title="\u5168\u5C4F\u67E5\u770B" data-astro-cid-ryytxnzt> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" data-astro-cid-ryytxnzt><path d="M3 6V3H6M10 3H13V6M13 10V13H10M6 13H3V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ryytxnzt></path></svg> </button> <button id="chat-close-btn"', ' data-astro-cid-ryytxnzt> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" data-astro-cid-ryytxnzt><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" data-astro-cid-ryytxnzt></path></svg> </button> </div> <div class="chat-messages" id="chat-messages" data-astro-cid-ryytxnzt> <div class="chat-message bot" data-astro-cid-ryytxnzt> <div class="message-avatar" data-astro-cid-ryytxnzt>\u{1F99E}</div> <div class="message-bubble" data-astro-cid-ryytxnzt> <p data-astro-cid-ryytxnzt>', '</p> <p style="margin-top:10px;font-size:12px;opacity:0.7;" data-astro-cid-ryytxnzt>', '</p> <p style="margin-top:8px;font-size:12px;opacity:0.8;" data-astro-cid-ryytxnzt>', '</p> <p style="font-size:12px;opacity:0.8;" data-astro-cid-ryytxnzt>', '</p> </div> </div> </div> <div class="chat-input-area" data-astro-cid-ryytxnzt> <textarea id="chat-input"', ' rows="1" maxlength="2000" data-astro-cid-ryytxnzt></textarea> <button id="chat-send-btn"', ' disabled data-astro-cid-ryytxnzt> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" data-astro-cid-ryytxnzt><path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ryytxnzt></path></svg> </button> </div> <button id="chat-exit-fullscreen" class="hidden" aria-label="\u9000\u51FA\u5168\u5C4F" data-astro-cid-ryytxnzt>\u2715</button> </div> </div> <script>(function(){', `
(function() {
  const CHAT_API_URL = '/api/chat';
  const MAX_MESSAGES = 50;

  const toggleBtn = document.getElementById('chat-toggle-btn');
  const closeBtn = document.getElementById('chat-close-btn');
  const fullscreenBtn = document.getElementById('chat-fullscreen-btn');
  const exitFullscreenBtn = document.getElementById('chat-exit-fullscreen');
  const chatPanel = document.getElementById('chat-panel');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chatStatus = document.getElementById('chat-status');

  const isEn = lang === 'en';

  // \u8F7B\u91CF Markdown \u6E32\u67D3\uFF1A\u7C97\u4F53/\u6362\u884C \u2192 HTML\uFF08\u6D41\u5F0F\u5B89\u5168\uFF09
  function renderMarkdown(text) {
    if (!text) return '';
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\\*\\*(.+?)\\*\\*/g, '<b>$1</b>')
      .replace(/\\n\\n/g, '</p><p>')
      .replace(/\\n/g, '<br>');
    return '<p>' + html + '</p>';
  }

  const texts = {
    platforms: isEn
      ? [
          { name: 'WeChat Official Account', icon: '\u{1F4AC}' },
          { name: 'Video Account', icon: '\u{1F3A5}' },
          { name: 'Douyin', icon: '\u{1F3B5}' },
          { name: 'Toutiao', icon: '\u{1F4F0}' },
          { name: 'Xigua Video', icon: '\u{1F349}' },
          { name: 'Bilibili', icon: '\u{1F4FA}' },
          { name: 'Xiaohongshu', icon: '\u{1F4D5}' },
        ]
      : [
          { name: '\u5FAE\u4FE1\u516C\u4F17\u53F7', icon: '\u{1F4AC}' },
          { name: '\u89C6\u9891\u53F7', icon: '\u{1F3A5}' },
          { name: '\u6296\u97F3', icon: '\u{1F3B5}' },
          { name: '\u4ECA\u65E5\u5934\u6761', icon: '\u{1F4F0}' },
          { name: '\u897F\u74DC\u89C6\u9891', icon: '\u{1F349}' },
          { name: 'B \u7AD9', icon: '\u{1F4FA}' },
          { name: '\u5C0F\u7EA2\u4E66', icon: '\u{1F4D5}' },
        ],
    followTitle: isEn ? 'Follow <strong>BanbaiGuan AI</strong> for the latest AI tips \u{1F447}' : '\u5173\u6CE8<strong>\u534A\u767E\u89C2AI</strong>\uFF0C\u83B7\u53D6\u6700\u65B0 AI \u5B9E\u8DF5\u5206\u4EAB \u{1F447}',
    followFooter: isEn ? 'Search "\u534A\u767E\u89C2AI" on all platforms to find us \u2728' : '\u5168\u5E73\u53F0\u641C\u7D22"\u534A\u767E\u89C2AI"\u5373\u53EF\u627E\u5230\u6211\u4EEC \u2728',
    onlineStatus: isEn ? 'Online' : '\u534A\u767E\u89C2AI \xB7 \u5728\u7EBF',
    thinking: isEn ? 'Thinking...' : '\u601D\u8003\u4E2D...',
    errorReply: isEn ? 'Sorry, Shanshan is temporarily unavailable. Please try again later.' : '\u62B1\u6B49\uFF0C\u5C71\u5C71\u6682\u65F6\u65E0\u6CD5\u56DE\u590D\u3002\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002',
    newsPrompt: isEn ? 'Please briefly introduce today\\'s top 3 AI news highlights.' : '\u8BF7\u7B80\u8981\u4ECB\u7ECD\u4ECA\u5929\u6700\u503C\u5F97\u5173\u6CE8\u7684 3 \u6761 AI \u70ED\u70B9\u65B0\u95FB\u3002',
    articlesPrompt: isEn ? 'Please recommend 3 latest articles from BanbaiGuan AI.' : '\u8BF7\u63A8\u8350 3 \u7BC7\u534A\u767E\u89C2AI \u7684\u6700\u65B0\u6587\u7AE0\u3002',
  };

  let isOpen = false;
  let isLoading = false;
  let messageHistory = [];

  function toggleChat() {
    isOpen = !isOpen;
    chatPanel.classList.toggle('hidden', !isOpen);
    if (isOpen) {
      setTimeout(() => chatInput.focus(), 200);
    }
  }

  function toggleFullscreen() {
    const isFull = chatPanel.classList.toggle('fullscreen');
    exitFullscreenBtn.classList.toggle('hidden', !isFull);
    chatStatus.classList.toggle('hidden', isFull);
    if (isFull) {
      chatInput.focus();
    }
  }

  function exitFullscreen() {
    chatPanel.classList.remove('fullscreen');
    exitFullscreenBtn.classList.add('hidden');
    chatStatus.classList.remove('hidden');
  }

  function showPlatformCard() {
    const cardHTML = \`
      <p>\${texts.followTitle}</p>
      <div class="platform-card">
        \${texts.platforms.map(p => \`
          <div class="platform-item">
            <span>\${p.icon}</span>
            <span>\${p.name}</span>
            <span style="margin-left:auto;font-size:12px;color:#64748b;">\u534A\u767E\u89C2AI</span>
          </div>
        \`).join('')}
      </div>
      <p style="margin-top:8px;font-size:12px;opacity:0.7;">\${texts.followFooter}</p>
    \`;
    addMessage('bot', cardHTML, true);
  }

  async function sendToBot(text) {
    if (isLoading) return;
    addMessage('user', text);
    messageHistory.push({ role: 'user', content: text });
    isLoading = true;
    showLoading(true);
    setStatus(texts.thinking, true);
    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'openclaw',
          messages: messageHistory,
          stream: true,
        }),
      });
      if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botMessage = '';
      let buffer = '';
      showLoading(false);
      const botMsg = document.createElement('div');
      botMsg.className = 'chat-message bot';
      botMsg.innerHTML = \`<div class="message-avatar">\u{1F99E}</div><div class="message-bubble"></div>\`;
      chatMessages.appendChild(botMsg);
      const bubble = botMsg.querySelector('.message-bubble');
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\\n');
        buffer = lines.pop() || '';
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            try {
              const json = JSON.parse(data);
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) {
                botMessage += delta;
                bubble.innerHTML = renderMarkdown(botMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
              }
            } catch {}
          }
        }
      }
      messageHistory.push({ role: 'assistant', content: botMessage });
      setStatus(texts.onlineStatus);
    } catch (error) {
      showLoading(false);
      setStatus(texts.errorReply, true);
      addMessage('bot', texts.errorReply);
      setTimeout(() => setStatus(texts.onlineStatus), 5000);
    } finally {
      isLoading = false;
      chatInput.focus();
    }
  }

  function handleQuickAction(action) {
    switch (action) {
      case 'ai-news':
        sendToBot(texts.newsPrompt);
        break;
      case 'follow-us':
        showPlatformCard();
        break;
      case 'latest-articles':
        sendToBot(texts.articlesPrompt);
        break;
      case 'guestbook':
        window.location.href = '/guestbook';
        break;
    }
  }

  function addMessage(role, content, isHTML = false) {
    const msg = document.createElement('div');
    msg.className = \`chat-message \${role}\`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = role === 'user' ? '\u{1F464}' : '\u{1F99E}';

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';

    if (isHTML) {
      bubble.innerHTML = content;
    } else if (role === 'bot') {
      bubble.innerHTML = renderMarkdown(content);
    } else {
      bubble.textContent = content;
    }

    msg.appendChild(avatar);
    msg.appendChild(bubble);
    chatMessages.appendChild(msg);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    while (chatMessages.children.length > MAX_MESSAGES) {
      chatMessages.removeChild(chatMessages.firstChild);
    }
  }

  function showLoading(show) {
    const existing = document.querySelector('.chat-message.typing');
    if (show && !existing) {
      const msg = document.createElement('div');
      msg.className = 'chat-message bot typing';
      msg.innerHTML = \`
        <div class="message-avatar">\u{1F99E}</div>
        <div class="message-bubble">
          <div class="typing-indicator"><span></span><span></span><span></span></div>
        </div>
      \`;
      chatMessages.appendChild(msg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    } else if (!show && existing) {
      existing.remove();
    }
  }

  function setStatus(text, loading = false) {
    chatStatus.textContent = text;
    chatStatus.classList.toggle('loading', loading);
  }

  async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text || isLoading) return;

    chatInput.value = '';
    chatInput.style.height = 'auto';
    chatSendBtn.disabled = true;

    addMessage('user', text);
    messageHistory.push({ role: 'user', content: text });

    isLoading = true;
    showLoading(true);
    setStatus(texts.thinking, true);

    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'openclaw',
          messages: messageHistory,
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}\`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botMessage = '';
      let buffer = '';

      showLoading(false);
      const botMsg = document.createElement('div');
      botMsg.className = 'chat-message bot';
      botMsg.innerHTML = \`
        <div class="message-avatar">\u{1F99E}</div>
        <div class="message-bubble"></div>
      \`;
      chatMessages.appendChild(botMsg);
      const bubble = botMsg.querySelector('.message-bubble');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            try {
              const json = JSON.parse(data);
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) {
                botMessage += delta;
                bubble.innerHTML = renderMarkdown(botMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
              }
            } catch {}
          }
        }
      }

      messageHistory.push({ role: 'assistant', content: botMessage });
      setStatus(texts.onlineStatus);

    } catch (error) {
      showLoading(false);
      setStatus(texts.offline, true);
      console.error('Chat error:', error);
      addMessage('bot', texts.errorReply);

      setTimeout(() => setStatus(texts.onlineStatus), 5000);
    } finally {
      isLoading = false;
      chatInput.focus();
    }
  }

  chatInput.addEventListener('input', () => {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 100) + 'px';
    chatSendBtn.disabled = !chatInput.value.trim();
  });

  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  toggleBtn.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', () => {
    exitFullscreen();
    toggleChat();
  });
  fullscreenBtn.addEventListener('click', toggleFullscreen);
  exitFullscreenBtn.addEventListener('click', () => {
    exitFullscreen();
  });
  chatSendBtn.addEventListener('click', sendMessage);

  const quickActionsEl = document.getElementById('quick-actions');
  if (quickActionsEl) {
    quickActionsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.quick-action-btn');
      if (btn) {
        handleQuickAction(btn.dataset.action);
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (isOpen && !chatPanel.contains(e.target) && !toggleBtn.contains(e.target) && !exitFullscreenBtn.contains(e.target)) {
      exitFullscreen();
      toggleChat();
    }
  });
})();
})();<\/script> `], ["", '<div id="chat-widget-root" data-astro-cid-ryytxnzt> <button id="chat-toggle-btn"', "", ' data-astro-cid-ryytxnzt> <span class="chat-icon" data-astro-cid-ryytxnzt>\u{1F99E}</span> </button> <div id="chat-panel" class="hidden" role="dialog" aria-label="\u5C71\u5C71\u5BF9\u8BDD\u7A97\u53E3" data-astro-cid-ryytxnzt> <div class="chat-header" data-astro-cid-ryytxnzt> <div class="chat-header-info" data-astro-cid-ryytxnzt> <span class="chat-avatar" data-astro-cid-ryytxnzt>\u{1F99E}</span> <div data-astro-cid-ryytxnzt> <span class="chat-title" data-astro-cid-ryytxnzt>', '</span> <span class="chat-status" id="chat-status" data-astro-cid-ryytxnzt>', '</span> </div> </div> <button id="chat-fullscreen-btn" aria-label="\u5168\u5C4F" title="\u5168\u5C4F\u67E5\u770B" data-astro-cid-ryytxnzt> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" data-astro-cid-ryytxnzt><path d="M3 6V3H6M10 3H13V6M13 10V13H10M6 13H3V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ryytxnzt></path></svg> </button> <button id="chat-close-btn"', ' data-astro-cid-ryytxnzt> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" data-astro-cid-ryytxnzt><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" data-astro-cid-ryytxnzt></path></svg> </button> </div> <div class="chat-messages" id="chat-messages" data-astro-cid-ryytxnzt> <div class="chat-message bot" data-astro-cid-ryytxnzt> <div class="message-avatar" data-astro-cid-ryytxnzt>\u{1F99E}</div> <div class="message-bubble" data-astro-cid-ryytxnzt> <p data-astro-cid-ryytxnzt>', '</p> <p style="margin-top:10px;font-size:12px;opacity:0.7;" data-astro-cid-ryytxnzt>', '</p> <p style="margin-top:8px;font-size:12px;opacity:0.8;" data-astro-cid-ryytxnzt>', '</p> <p style="font-size:12px;opacity:0.8;" data-astro-cid-ryytxnzt>', '</p> </div> </div> </div> <div class="chat-input-area" data-astro-cid-ryytxnzt> <textarea id="chat-input"', ' rows="1" maxlength="2000" data-astro-cid-ryytxnzt></textarea> <button id="chat-send-btn"', ' disabled data-astro-cid-ryytxnzt> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" data-astro-cid-ryytxnzt><path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ryytxnzt></path></svg> </button> </div> <button id="chat-exit-fullscreen" class="hidden" aria-label="\u9000\u51FA\u5168\u5C4F" data-astro-cid-ryytxnzt>\u2715</button> </div> </div> <script>(function(){', `
(function() {
  const CHAT_API_URL = '/api/chat';
  const MAX_MESSAGES = 50;

  const toggleBtn = document.getElementById('chat-toggle-btn');
  const closeBtn = document.getElementById('chat-close-btn');
  const fullscreenBtn = document.getElementById('chat-fullscreen-btn');
  const exitFullscreenBtn = document.getElementById('chat-exit-fullscreen');
  const chatPanel = document.getElementById('chat-panel');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chatStatus = document.getElementById('chat-status');

  const isEn = lang === 'en';

  // \u8F7B\u91CF Markdown \u6E32\u67D3\uFF1A\u7C97\u4F53/\u6362\u884C \u2192 HTML\uFF08\u6D41\u5F0F\u5B89\u5168\uFF09
  function renderMarkdown(text) {
    if (!text) return '';
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\\\\*\\\\*(.+?)\\\\*\\\\*/g, '<b>$1</b>')
      .replace(/\\\\n\\\\n/g, '</p><p>')
      .replace(/\\\\n/g, '<br>');
    return '<p>' + html + '</p>';
  }

  const texts = {
    platforms: isEn
      ? [
          { name: 'WeChat Official Account', icon: '\u{1F4AC}' },
          { name: 'Video Account', icon: '\u{1F3A5}' },
          { name: 'Douyin', icon: '\u{1F3B5}' },
          { name: 'Toutiao', icon: '\u{1F4F0}' },
          { name: 'Xigua Video', icon: '\u{1F349}' },
          { name: 'Bilibili', icon: '\u{1F4FA}' },
          { name: 'Xiaohongshu', icon: '\u{1F4D5}' },
        ]
      : [
          { name: '\u5FAE\u4FE1\u516C\u4F17\u53F7', icon: '\u{1F4AC}' },
          { name: '\u89C6\u9891\u53F7', icon: '\u{1F3A5}' },
          { name: '\u6296\u97F3', icon: '\u{1F3B5}' },
          { name: '\u4ECA\u65E5\u5934\u6761', icon: '\u{1F4F0}' },
          { name: '\u897F\u74DC\u89C6\u9891', icon: '\u{1F349}' },
          { name: 'B \u7AD9', icon: '\u{1F4FA}' },
          { name: '\u5C0F\u7EA2\u4E66', icon: '\u{1F4D5}' },
        ],
    followTitle: isEn ? 'Follow <strong>BanbaiGuan AI</strong> for the latest AI tips \u{1F447}' : '\u5173\u6CE8<strong>\u534A\u767E\u89C2AI</strong>\uFF0C\u83B7\u53D6\u6700\u65B0 AI \u5B9E\u8DF5\u5206\u4EAB \u{1F447}',
    followFooter: isEn ? 'Search "\u534A\u767E\u89C2AI" on all platforms to find us \u2728' : '\u5168\u5E73\u53F0\u641C\u7D22"\u534A\u767E\u89C2AI"\u5373\u53EF\u627E\u5230\u6211\u4EEC \u2728',
    onlineStatus: isEn ? 'Online' : '\u534A\u767E\u89C2AI \xB7 \u5728\u7EBF',
    thinking: isEn ? 'Thinking...' : '\u601D\u8003\u4E2D...',
    errorReply: isEn ? 'Sorry, Shanshan is temporarily unavailable. Please try again later.' : '\u62B1\u6B49\uFF0C\u5C71\u5C71\u6682\u65F6\u65E0\u6CD5\u56DE\u590D\u3002\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002',
    newsPrompt: isEn ? 'Please briefly introduce today\\\\'s top 3 AI news highlights.' : '\u8BF7\u7B80\u8981\u4ECB\u7ECD\u4ECA\u5929\u6700\u503C\u5F97\u5173\u6CE8\u7684 3 \u6761 AI \u70ED\u70B9\u65B0\u95FB\u3002',
    articlesPrompt: isEn ? 'Please recommend 3 latest articles from BanbaiGuan AI.' : '\u8BF7\u63A8\u8350 3 \u7BC7\u534A\u767E\u89C2AI \u7684\u6700\u65B0\u6587\u7AE0\u3002',
  };

  let isOpen = false;
  let isLoading = false;
  let messageHistory = [];

  function toggleChat() {
    isOpen = !isOpen;
    chatPanel.classList.toggle('hidden', !isOpen);
    if (isOpen) {
      setTimeout(() => chatInput.focus(), 200);
    }
  }

  function toggleFullscreen() {
    const isFull = chatPanel.classList.toggle('fullscreen');
    exitFullscreenBtn.classList.toggle('hidden', !isFull);
    chatStatus.classList.toggle('hidden', isFull);
    if (isFull) {
      chatInput.focus();
    }
  }

  function exitFullscreen() {
    chatPanel.classList.remove('fullscreen');
    exitFullscreenBtn.classList.add('hidden');
    chatStatus.classList.remove('hidden');
  }

  function showPlatformCard() {
    const cardHTML = \\\`
      <p>\\\${texts.followTitle}</p>
      <div class="platform-card">
        \\\${texts.platforms.map(p => \\\`
          <div class="platform-item">
            <span>\\\${p.icon}</span>
            <span>\\\${p.name}</span>
            <span style="margin-left:auto;font-size:12px;color:#64748b;">\u534A\u767E\u89C2AI</span>
          </div>
        \\\`).join('')}
      </div>
      <p style="margin-top:8px;font-size:12px;opacity:0.7;">\\\${texts.followFooter}</p>
    \\\`;
    addMessage('bot', cardHTML, true);
  }

  async function sendToBot(text) {
    if (isLoading) return;
    addMessage('user', text);
    messageHistory.push({ role: 'user', content: text });
    isLoading = true;
    showLoading(true);
    setStatus(texts.thinking, true);
    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'openclaw',
          messages: messageHistory,
          stream: true,
        }),
      });
      if (!response.ok) throw new Error(\\\`HTTP \\\${response.status}\\\`);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botMessage = '';
      let buffer = '';
      showLoading(false);
      const botMsg = document.createElement('div');
      botMsg.className = 'chat-message bot';
      botMsg.innerHTML = \\\`<div class="message-avatar">\u{1F99E}</div><div class="message-bubble"></div>\\\`;
      chatMessages.appendChild(botMsg);
      const bubble = botMsg.querySelector('.message-bubble');
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\\\\n');
        buffer = lines.pop() || '';
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            try {
              const json = JSON.parse(data);
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) {
                botMessage += delta;
                bubble.innerHTML = renderMarkdown(botMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
              }
            } catch {}
          }
        }
      }
      messageHistory.push({ role: 'assistant', content: botMessage });
      setStatus(texts.onlineStatus);
    } catch (error) {
      showLoading(false);
      setStatus(texts.errorReply, true);
      addMessage('bot', texts.errorReply);
      setTimeout(() => setStatus(texts.onlineStatus), 5000);
    } finally {
      isLoading = false;
      chatInput.focus();
    }
  }

  function handleQuickAction(action) {
    switch (action) {
      case 'ai-news':
        sendToBot(texts.newsPrompt);
        break;
      case 'follow-us':
        showPlatformCard();
        break;
      case 'latest-articles':
        sendToBot(texts.articlesPrompt);
        break;
      case 'guestbook':
        window.location.href = '/guestbook';
        break;
    }
  }

  function addMessage(role, content, isHTML = false) {
    const msg = document.createElement('div');
    msg.className = \\\`chat-message \\\${role}\\\`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = role === 'user' ? '\u{1F464}' : '\u{1F99E}';

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';

    if (isHTML) {
      bubble.innerHTML = content;
    } else if (role === 'bot') {
      bubble.innerHTML = renderMarkdown(content);
    } else {
      bubble.textContent = content;
    }

    msg.appendChild(avatar);
    msg.appendChild(bubble);
    chatMessages.appendChild(msg);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    while (chatMessages.children.length > MAX_MESSAGES) {
      chatMessages.removeChild(chatMessages.firstChild);
    }
  }

  function showLoading(show) {
    const existing = document.querySelector('.chat-message.typing');
    if (show && !existing) {
      const msg = document.createElement('div');
      msg.className = 'chat-message bot typing';
      msg.innerHTML = \\\`
        <div class="message-avatar">\u{1F99E}</div>
        <div class="message-bubble">
          <div class="typing-indicator"><span></span><span></span><span></span></div>
        </div>
      \\\`;
      chatMessages.appendChild(msg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    } else if (!show && existing) {
      existing.remove();
    }
  }

  function setStatus(text, loading = false) {
    chatStatus.textContent = text;
    chatStatus.classList.toggle('loading', loading);
  }

  async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text || isLoading) return;

    chatInput.value = '';
    chatInput.style.height = 'auto';
    chatSendBtn.disabled = true;

    addMessage('user', text);
    messageHistory.push({ role: 'user', content: text });

    isLoading = true;
    showLoading(true);
    setStatus(texts.thinking, true);

    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'openclaw',
          messages: messageHistory,
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error(\\\`HTTP \\\${response.status}\\\`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botMessage = '';
      let buffer = '';

      showLoading(false);
      const botMsg = document.createElement('div');
      botMsg.className = 'chat-message bot';
      botMsg.innerHTML = \\\`
        <div class="message-avatar">\u{1F99E}</div>
        <div class="message-bubble"></div>
      \\\`;
      chatMessages.appendChild(botMsg);
      const bubble = botMsg.querySelector('.message-bubble');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\\\\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            try {
              const json = JSON.parse(data);
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) {
                botMessage += delta;
                bubble.innerHTML = renderMarkdown(botMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
              }
            } catch {}
          }
        }
      }

      messageHistory.push({ role: 'assistant', content: botMessage });
      setStatus(texts.onlineStatus);

    } catch (error) {
      showLoading(false);
      setStatus(texts.offline, true);
      console.error('Chat error:', error);
      addMessage('bot', texts.errorReply);

      setTimeout(() => setStatus(texts.onlineStatus), 5000);
    } finally {
      isLoading = false;
      chatInput.focus();
    }
  }

  chatInput.addEventListener('input', () => {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 100) + 'px';
    chatSendBtn.disabled = !chatInput.value.trim();
  });

  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  toggleBtn.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', () => {
    exitFullscreen();
    toggleChat();
  });
  fullscreenBtn.addEventListener('click', toggleFullscreen);
  exitFullscreenBtn.addEventListener('click', () => {
    exitFullscreen();
  });
  chatSendBtn.addEventListener('click', sendMessage);

  const quickActionsEl = document.getElementById('quick-actions');
  if (quickActionsEl) {
    quickActionsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.quick-action-btn');
      if (btn) {
        handleQuickAction(btn.dataset.action);
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (isOpen && !chatPanel.contains(e.target) && !toggleBtn.contains(e.target) && !exitFullscreenBtn.contains(e.target)) {
      exitFullscreen();
      toggleChat();
    }
  });
})();
})();<\/script> `])), maybeRenderHead(), addAttribute(t.toggleLabel, "aria-label"), addAttribute(t.toggleTitle, "title"), t.title, t.status, addAttribute(t.closeLabel, "aria-label"), unescapeHTML(t.welcome), t.networkHint, unescapeHTML(t.askTitle), unescapeHTML(t.askItems), addAttribute(t.placeholder, "placeholder"), addAttribute(t.sendLabel, "aria-label"), defineScriptVars({ lang }));
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/components/ChatWidget.astro", void 0);

const $$Astro$2 = createAstro("https://ban-bai.com");
const $$ShareButtons = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ShareButtons;
  const { title, url, summary } = Astro2.props;
  const shareUrl = url || Astro2.url.href;
  const shareText = summary || title;
  return renderTemplate`${maybeRenderHead()}<div class="share-buttons" data-astro-cid-zllr3mxm> <p class="share-title" data-astro-cid-zllr3mxm>分享到</p> <div class="share-icons" data-astro-cid-zllr3mxm> <!-- 微信（提示复制链接） --> <button class="share-btn share-wechat"${addAttribute(shareUrl, "data-url")} title="复制链接到微信分享" data-astro-cid-zllr3mxm> <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" data-astro-cid-zllr3mxm> <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.442 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.11.24-.245 0-.06-.024-.12-.04-.178l-.325-1.233a.492.492 0 01.177-.554C23.028 18.572 24 16.89 24 14.996c0-3.299-3.04-6.045-7.062-6.138zm-2.938 2.93c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982z" data-astro-cid-zllr3mxm></path> </svg> <span data-astro-cid-zllr3mxm>微信</span> </button> <!-- 微博 --> <a class="share-btn share-weibo"${addAttribute(`https://service.weibo.com/share/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`, "href")} target="_blank" rel="noopener noreferrer" title="分享到微博" data-astro-cid-zllr3mxm> <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" data-astro-cid-zllr3mxm> <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.583.631.283.82.986.442 1.574zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.307-.354-.165-.583.142-.227.441-.346.672-.245.237.09.315.352.182.575zm.176-2.719c-1.893-.494-4.039.45-4.857 2.118-.836 1.704-.026 3.591 1.886 4.21 1.983.642 4.318-.415 5.132-2.302.8-1.845-.145-3.518-2.161-4.026zm7.563-1.676c-.346-.145-.578-.242-.402-.636.381-.856.42-1.593.008-2.122-.775-1.001-2.883-1.001-5.313-.031 0-.001-.763.329-.568-.269.375-1.171.32-2.153-.256-2.724-1.303-1.294-4.775.055-7.756 3.02C1.438 11.506 0 13.982 0 16.134c0 4.101 5.272 6.593 10.427 6.593 6.756 0 11.252-3.925 11.252-7.035 0-1.873-1.581-2.933-3.79-3.495z" data-astro-cid-zllr3mxm></path> </svg> <span data-astro-cid-zllr3mxm>微博</span> </a> <!-- 复制链接 --> <button class="share-btn share-copy"${addAttribute(shareUrl, "data-url")} title="复制链接" data-astro-cid-zllr3mxm> <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" data-astro-cid-zllr3mxm> <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" data-astro-cid-zllr3mxm></path> </svg> <span data-astro-cid-zllr3mxm>复制链接</span> </button> <!-- 邮件 --> <a class="share-btn share-email"${addAttribute(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`, "href")} title="通过邮件分享" data-astro-cid-zllr3mxm> <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" data-astro-cid-zllr3mxm> <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" data-astro-cid-zllr3mxm></path> </svg> <span data-astro-cid-zllr3mxm>邮件</span> </a> </div> </div> <!-- 复制成功提示 --> <div class="share-toast" id="shareToast" data-astro-cid-zllr3mxm>链接已复制</div>  `;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/components/ShareButtons.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$TableOfContents = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", `<nav class="toc-container" id="toc-container" style="display:none;" data-astro-cid-xvrfupwn> <h3 class="toc-title" data-astro-cid-xvrfupwn>\u{1F4D1} \u76EE\u5F55</h3> <ul class="toc-list" id="toc-list" data-astro-cid-xvrfupwn></ul> </nav> <script>
  document.addEventListener('DOMContentLoaded', function() {
    const articleContent = document.querySelector('.article-content, .diary-content');
    if (!articleContent) return;
    
    const headings = articleContent.querySelectorAll('h2, h3');
    if (headings.length < 3) return;
    
    const tocContainer = document.getElementById('toc-container');
    const tocList = document.getElementById('toc-list');
    if (!tocContainer || !tocList) return;
    
    headings.forEach(function(heading, index) {
      // \u751F\u6210\u552F\u4E00ID
      const text = heading.textContent.trim();
      const id = 'heading-' + index;
      heading.id = id;
      
      const level = heading.tagName === 'H2' ? 2 : 3;
      const li = document.createElement('li');
      li.className = 'toc-item toc-level-' + level;
      
      const a = document.createElement('a');
      a.href = '#' + id;
      a.textContent = text;
      
      li.appendChild(a);
      tocList.appendChild(li);
    });
    
    tocContainer.style.display = 'block';
    
    // \u70B9\u51FB\u5E73\u6ED1\u6EDA\u52A8
    tocList.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
<\/script> `])), maybeRenderHead());
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/components/TableOfContents.astro", void 0);

const $$Astro$1 = createAstro("https://ban-bai.com");
const $$RelatedArticles = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RelatedArticles;
  const { currentSlug, currentTag, maxCount = 3 } = Astro2.props;
  const relatedArticles = articles.filter((article) => article.slug !== currentSlug).map((article) => ({
    ...article,
    score: article.tag === currentTag ? 2 : 1
    // 相同标签得分更高
  })).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }).slice(0, maxCount);
  return renderTemplate`${relatedArticles.length > 0 && renderTemplate`${maybeRenderHead()}<div class="related-articles" data-astro-cid-2zkmu4eg><h3 class="related-title" data-astro-cid-2zkmu4eg>📚 相关文章</h3><div class="related-list" data-astro-cid-2zkmu4eg>${relatedArticles.map((article) => renderTemplate`<a${addAttribute(`/banbaiguan/${article.slug}/`, "href")} class="related-item" data-astro-cid-2zkmu4eg><div class="related-tag" data-astro-cid-2zkmu4eg>${article.tag}</div><h4 class="related-item-title" data-astro-cid-2zkmu4eg>${article.title}</h4><p class="related-item-excerpt" data-astro-cid-2zkmu4eg>${article.excerpt}</p><time class="related-item-date"${addAttribute(article.date, "datetime")} data-astro-cid-2zkmu4eg>${new Date(article.date).toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" })}</time></a>`)}</div></div>`}`;
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/components/RelatedArticles.astro", void 0);

const ui = {
  zh: {
    // Navigation
    siteName: "观吾",
    navHome: "首页",
    navDiary: "日记",
    navAiNews: "AI新闻",
    navBanbaiguan: "半百观",
    navGuestbook: "留言板",
    navAbout: "关于",
    // Hero
    heroEyebrow: "AI 实践者 · 半百观AI主理人",
    heroTitle: "50岁，用AI把想法变成现实",
    heroSubtitle: "磐石电气联合创始人 · AIoT实践者 · 半百观AI主理人",
    heroDescription1: "这不是一个普通的个人网站。",
    heroDescription2: "它是我和我的AI助理一起，从0到1建造出来的。",
    heroDescriptionSub: "分享AI工具落地实践 · 数字化智能库存管理 · 50岁学AI的真实故事",
    heroBtnDiary: "看工作日记",
    heroBtnAbout: "了解更多",
    heroScrollHint: "向下滚动",
    // Homepage sections
    sectionRecent: "最近更新",
    sectionRecentMore: "查看完整时间线",
    sectionAiProjects: "AI 项目",
    sectionCompany: "关于公司",
    sectionFollow: "关注我们",
    sectionFollowSubtitle: "在各平台搜索「半百观AI」即可找到我们",
    // Card labels
    cardDiary: "工作日记",
    cardAiNews: "AI 新闻",
    cardArticle: "半百观AI",
    // Company
    companyBadge: "国家级高新技术企业",
    companyName: "磐石电气（常州）有限公司",
    companyDesc: "精准定位AI场景解决方案提供商。依托多传感器融合、智慧存储AI中台、多模态算法三大核心技术，打通场景数智化全链路。",
    companyClientsLabel: "长期服务",
    companyLearnMore: "了解更多",
    companyVisit: "访问公司官网",
    // Footer
    footerBrand: "观吾",
    footerSubtitle: "磐石电气联合创始人 · AIoT实践者",
    footerCompanySite: "公司业务官网",
    footerQrHint: "扫码关注「半百观AI」",
    footerQrGzh: "公众号",
    footerQrDy: "视频号",
    footerCopy: "2026 观吾 · ban-bai.com",
    footerCredit: "这个网站由AI助理开发并维护",
    // FollowUsCard
    followTitle: "关注「半百观AI」",
    followSubtitle: "50岁视角看AI工具落地实践",
    followPlatforms: [
      { icon: "💬", name: "微信公众号" },
      { icon: "🎥", name: "视频号" },
      { icon: "🎵", name: "抖音" },
      { icon: "📰", name: "今日头条" },
      { icon: "🍉", name: "西瓜视频" },
      { icon: "📺", name: "B 站" },
      { icon: "📕", name: "小红书" }
    ],
    followSearch: "也可在今日头条 · B站 · 西瓜视频 搜索「半百观AI」",
    // ChatWidget
    chatTitle: "山山 AI 助理",
    chatStatus: "半百观AI · 在线",
    chatGreeting1: "你好！我是山山，半百观AI 的智能助理",
    chatGreeting2: "我可以帮你了解最新的 AI 资讯、工具推荐，也可以带你关注我们的各平台账号。",
    chatGreeting3: "你可以问我：",
    chatGreeting4: "最近有什么好用的 AI 工具？",
    chatGreeting5: "你们在哪些平台有账号？",
    chatGreeting6: "有什么值得看的 AI 文章？",
    chatPlaceholder: "问问山山...",
    chatBtnAiNews: "今日 AI",
    chatBtnFollow: "关注我们",
    chatBtnArticles: "最新文章",
    chatBtnGuestbook: "留言板",
    // ArticleJsonLd
    sectionDiary: "工作日记",
    sectionAiNews: "AI 新闻",
    sectionBanbaiguan: "半百观 AI",
    // Citations
    citationsTitle: "参考资料",
    citationsNote: "以上内容基于以下来源整理",
    // PlatformCitations
    platformCta: "在以下平台搜索获取更多信息",
    // TopicScoreCard
    topicScoreTitle: "内容选题评分卡",
    topicScoreGuide: "13个维度综合评分，80分以上为优质选题"
  },
  en: {
    // Navigation
    siteName: "Guanwu",
    navHome: "Home",
    navDiary: "Diary",
    navAiNews: "AI News",
    navBanbaiguan: "BanbaiGuan",
    navGuestbook: "Guestbook",
    navAbout: "About",
    // Hero
    heroEyebrow: "AI Practitioner · Founder at 50",
    heroTitle: "At 50, I use AI to turn ideas into reality",
    heroSubtitle: "Co-founder of MonolithIoT · AIoT Practitioner · BanbaiGuan AI",
    heroDescription1: "This is not a typical personal website.",
    heroDescription2: "My AI assistant and I built it from scratch, together.",
    heroDescriptionSub: "AI tool practices · Smart inventory management · My honest 50-year-old AI learning journey",
    heroBtnDiary: "Read My Diary",
    heroBtnAbout: "Learn More",
    heroScrollHint: "Scroll down",
    // Homepage sections
    sectionRecent: "Latest Updates",
    sectionRecentMore: "View Full Timeline",
    sectionAiProjects: "AI Projects",
    sectionCompany: "About the Company",
    sectionFollow: "Follow Us",
    sectionFollowSubtitle: 'Search "BanbaiGuan AI" on all platforms to find us',
    // Card labels
    cardDiary: "Diary",
    cardAiNews: "AI News",
    cardArticle: "BanbaiGuan AI",
    // Company
    companyBadge: "National High-Tech Enterprise",
    companyName: "MonolithIoT (Changzhou) Co., Ltd.",
    companyDesc: "An AI scenario solutions provider. Built on three core technologies: multi-sensor fusion, AI-powered storage middleware, and multimodal algorithms — digitizing the entire industrial chain.",
    companyClientsLabel: "Trusted by",
    companyLearnMore: "Learn More",
    companyVisit: "Visit Company Site",
    // Footer
    footerBrand: "Guanwu",
    footerSubtitle: "Co-founder of MonolithIoT · AIoT Practitioner",
    footerCompanySite: "Company Website",
    footerQrHint: 'Follow "BanbaiGuan AI"',
    footerQrGzh: "WeChat",
    footerQrDy: "Video Account",
    footerCopy: "2026 Guanwu · ban-bai.com",
    footerCredit: "This site was built and maintained by an AI assistant",
    // FollowUsCard
    followTitle: 'Follow "BanbaiGuan AI"',
    followSubtitle: "A 50-year-old's honest take on AI tool adoption",
    followPlatforms: [
      { icon: "💬", name: "WeChat Official Account" },
      { icon: "🎥", name: "Video Account" },
      { icon: "🎵", name: "Douyin" },
      { icon: "📰", name: "Toutiao" },
      { icon: "🍉", name: "Xigua Video" },
      { icon: "📺", name: "Bilibili" },
      { icon: "📕", name: "Xiaohongshu" }
    ],
    followSearch: 'Or search "半百观AI" on Bilibili · Xigua Video · Toutiao',
    // ChatWidget
    chatTitle: "Shanshan AI Assistant",
    chatStatus: "Online",
    chatGreeting1: "Hi! I'm Shanshan, the AI assistant for BanbaiGuan AI",
    chatGreeting2: "I can help you with the latest AI news, tool recommendations, and our social media accounts.",
    chatGreeting3: "You can ask me:",
    chatGreeting4: "What AI tools are trending lately?",
    chatGreeting5: "Where can I follow you?",
    chatGreeting6: "Any recommended AI articles?",
    chatPlaceholder: "Ask Shanshan...",
    chatBtnAiNews: "AI News",
    chatBtnFollow: "Follow Us",
    chatBtnArticles: "Articles",
    chatBtnGuestbook: "Guestbook",
    // ArticleJsonLd
    sectionDiary: "Diary",
    sectionAiNews: "AI News",
    sectionBanbaiguan: "BanbaiGuan AI",
    // Citations
    citationsTitle: "References",
    citationsNote: "Content compiled from the following sources",
    // PlatformCitations
    platformCta: "Search on the following platforms for more info",
    // TopicScoreCard
    topicScoreTitle: "Content Topic Scorecard",
    topicScoreGuide: "13-dimension scoring, 80+ for high-quality topics"
  }
};
function t(key, lang = "zh") {
  const keys = key.split(".");
  let value = ui[lang];
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      return key;
    }
  }
  return typeof value === "string" ? value : key;
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _c;
const $$Astro = createAstro("https://ban-bai.com");
const $$Base = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Base;
  const { title, jsonLd = [], ogImage, ogDescription, navActive, lang = "zh", showShare = false } = Astro2.props;
  const pathname = Astro2.url?.pathname || "/";
  const autoShowShare = !showShare && (pathname.startsWith("/banbaiguan/") || pathname.startsWith("/diary/") || pathname.startsWith("/en/banbaiguan/") || pathname.startsWith("/en/diary/"));
  const shouldShowShare = showShare || autoShowShare;
  const pageTitle = title || (lang === "en" ? "Guanwu | 50-Year-Old Using AI to Get Things Done" : "观吾 | 50岁用AI做实事");
  const siteName = t("siteName", lang);
  const siteDescription = lang === "en" ? "A 50-year-old entrepreneur using AI to turn ideas into reality" : "50岁企业家用AI把想法变成现实 — 磐石电气联合创始人吴总的个人网站";
  const siteAuthor = lang === "en" ? "Mr. Wu (Guanwu)" : "观吾（吴总）";
  const siteKeywords = lang === "en" ? "AI tools,AI adoption,50 years old learning AI,digital transformation,MonolithIoT,smart inventory,AIoT,BanbaiGuan AI" : "AI应用,AI工具,数字化智能库存,AIoT解决方案,磐石电气,智能货柜,无人仓库,线边仓,MRO智能柜,半百观AI,50岁用AI做实事";
  const footerBrand = t("footerBrand", lang);
  t("footerSubtitle", lang);
  const footerCompanySite = t("footerCompanySite", lang);
  const footerQrHint = t("footerQrHint", lang);
  const footerQrGzh = t("footerQrGzh", lang);
  const footerQrDy = t("footerQrDy", lang);
  const footerCopy = t("footerCopy", lang);
  t("footerCredit", lang);
  const langCode = lang === "en" ? "en" : "zh-CN";
  const ogLocale = lang === "en" ? "en_US" : "zh_CN";
  const baseUrl = "https://www.ban-bai.com";
  const canonicalUrl = `${baseUrl}${pathname}`;
  const alternateHref = lang === "en" ? `${baseUrl}${pathname.replace("/en", "/")}` : `${baseUrl}/en${pathname === "/" ? "" : pathname}`;
  const gaId = "";
  const globalJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": lang === "en" ? "Guanwu" : "观吾",
      "alternateName": [lang === "en" ? "Guanwu Diary" : "观吾工作日记"],
      "url": baseUrl,
      "description": lang === "en" ? "50-year-old uses AI to turn ideas into reality" : "50岁用AI把想法变成现实 — 磐石电气联合创始人吴总的个人网站",
      "inLanguage": langCode,
      "potentialAction": {
        "@type": "ReadAction",
        "target": lang === "en" ? [`${baseUrl}/en/diary/`, `${baseUrl}/en/ai-news/`, `${baseUrl}/en/about/`] : [`${baseUrl}/diary/`, `${baseUrl}/ai-news/`, `${baseUrl}/about/`]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": lang === "en" ? "MonolithIoT (Changzhou) Co., Ltd." : "磐石电气（常州）有限公司",
      "alternateName": "MonolithIoT",
      "url": "https://www.monolithiot.com",
      "logo": `${baseUrl}/logo.png`,
      "sameAs": ["https://www.youtube.com/channel/UC6x3JFjaUw3nMOen2PXDtsw"]
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": lang === "en" ? "Mr. Wu" : "吴总",
      "alternateName": siteName,
      "jobTitle": lang === "en" ? "Co-founder" : "联合创始人",
      "worksFor": { "@type": "Organization", "name": lang === "en" ? "MonolithIoT (Changzhou) Co., Ltd." : "磐石电气（常州）有限公司" },
      "url": `${baseUrl}${lang === "en" ? "/en" : ""}/about/`,
      "description": lang === "en" ? "50 years old, Co-founder of MonolithIoT, focused on digital smart inventory management AIoT products and solutions" : "50岁，磐石电气联合创始人，专注数字化智能库存管理 AIoT 产品及解决方案，半百观AI主理人",
      "knowsAbout": lang === "en" ? ["AI Applications", "AIoT", "Digital Inventory Management", "Brand Management", "New Media Operations"] : ["AI应用", "AIoT", "数字化智能库存管理", "品牌管理", "新媒体运营"]
    },
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": lang === "en" ? "BanbaiGuan AI" : "半百观AI",
      "description": lang === "en" ? "A 50-year-old's honest take on AI tool adoption — real stories of using AI in business" : "50岁视角看AI工具落地实践 — AI工具、效率提升、商业落地真实分享",
      "url": `${baseUrl}${lang === "en" ? "/en" : ""}/banbaiguan/`,
      "author": { "@type": "Person", "name": lang === "en" ? "Mr. Wu" : "吴总", "url": `${baseUrl}${lang === "en" ? "/en" : ""}/about/` },
      "publisher": { "@type": "Organization", "name": lang === "en" ? "MonolithIoT (Changzhou) Co., Ltd." : "磐石电气（常州）有限公司", "url": "https://www.monolithiot.com" },
      "inLanguage": langCode,
      "keywords": lang === "en" ? ["AI tools", "AI adoption", "productivity", "business AI", "AI practice"] : ["AI工具", "AI落地", "效率提升", "商业AI", "AI实践"]
    }
  ];
  const allJsonLd = Array.isArray(jsonLd) ? [...globalJsonLd, ...jsonLd] : [...globalJsonLd, jsonLd];
  return renderTemplate(_c || (_c = __template(["<html", ' data-astro-cid-5hce7sga> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"', "><title>", `</title><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="preconnect" href="https://fonts.loli.net"><link rel="preconnect" href="https://gstatic.loli.net" crossorigin><link rel="preload" as="style" href="https://fonts.loli.net/css2?family=Noto+Serif+SC:wght@600;700&family=DM+Sans:wght@400;500;700&display=swap"><link rel="stylesheet" href="https://fonts.loli.net/css2?family=Noto+Serif+SC:wght@600;700&family=DM+Sans:wght@400;500;700&display=swap" media="print" onload="this.media='all'">`, '<noscript><link rel="stylesheet" href="https://fonts.loli.net/css2?family=Noto+Serif+SC:wght@600;700&family=DM+Sans:wght@400;500;700&display=swap"></noscript>', '<meta name="author"', '><meta name="keywords"', '><meta name="baidu-site-verification" content="codeva-7kEwHwdUhM"><meta name="shenma-site-verification"', '><meta name="sogou_site_verification"', '><meta name="360-site-verification"', '><link rel="canonical"', '><meta property="og:site_name"', '><meta property="og:type" content="website"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:url"', '><meta property="og:locale"', '><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', ">", "", "", '</head> <body data-astro-cid-5hce7sga> <header class="site-header" data-astro-cid-5hce7sga> <div class="header-inner" data-astro-cid-5hce7sga> <a', ' class="site-brand" data-astro-cid-5hce7sga>', '</a> <nav class="site-nav" data-astro-cid-5hce7sga> <a', "", " data-astro-cid-5hce7sga>", "</a> <a", "", " data-astro-cid-5hce7sga>", "</a> <a", "", " data-astro-cid-5hce7sga>", "</a> <a", "", " data-astro-cid-5hce7sga>", "</a> <a", "", " data-astro-cid-5hce7sga>", "</a> <a", "", ' title="站内搜索" data-astro-cid-5hce7sga>🔍</a> <a', "", " data-astro-cid-5hce7sga>", '</a> <button class="theme-toggle" aria-label="Toggle dark mode" title="切换主题" data-astro-cid-5hce7sga> <svg class="theme-icon-moon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-5hce7sga> <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" data-astro-cid-5hce7sga></path> </svg> </button> <a', ' class="lang-switch" data-astro-cid-5hce7sga>', '</a> </nav> </div> </header> <main class="container" data-astro-cid-5hce7sga> ', " ", " ", " </main> ", ' <footer class="site-footer" data-astro-cid-5hce7sga> <div class="container" data-astro-cid-5hce7sga> <div class="footer-content" data-astro-cid-5hce7sga> <div class="footer-left" data-astro-cid-5hce7sga> <p class="footer-brand" data-astro-cid-5hce7sga>', '</p> <a href="https://www.monolithiot.com" class="footer-company-link" target="_blank" rel="noopener" data-astro-cid-5hce7sga>', ' →</a> </div> <div class="footer-right" data-astro-cid-5hce7sga> <p style="font-size: 12px; opacity: 0.6;" data-astro-cid-5hce7sga>', '</p> <div class="footer-qr-mini" data-astro-cid-5hce7sga> <div class="footer-qr-item" data-astro-cid-5hce7sga> <img src="/gzh-qr.jpg"', ' style="width: 48px; height: 48px; border-radius: 6px;" loading="lazy" data-astro-cid-5hce7sga> <span style="font-size: 10px; opacity: 0.6;" data-astro-cid-5hce7sga>', '</span> </div> <div class="footer-qr-item" data-astro-cid-5hce7sga> <img src="/dy-qr.jpg"', ' style="width: 48px; height: 48px; border-radius: 6px;" loading="lazy" data-astro-cid-5hce7sga> <span style="font-size: 10px; opacity: 0.6;" data-astro-cid-5hce7sga>', '</span> </div> </div> </div> </div> <div class="footer-bottom" data-astro-cid-5hce7sga> <p style="font-size: 11px; opacity: 0.4;" data-astro-cid-5hce7sga>© ', "</p> </div> </div> </footer> ", " <script>\n      // 暗色模式切换 — 立即执行，避免闪烁\n      (function() {\n        const html = document.documentElement;\n        const stored = localStorage.getItem('theme');\n        if (stored === 'dark') html.setAttribute('data-theme', 'dark');\n        else if (stored === 'light') html.setAttribute('data-theme', 'light');\n\n        document.addEventListener('DOMContentLoaded', function() {\n          var btn = document.querySelector('.theme-toggle');\n          if (!btn) return;\n          btn.addEventListener('click', function() {\n            var current = html.getAttribute('data-theme');\n            if (current === 'dark') {\n              html.setAttribute('data-theme', 'light');\n              localStorage.setItem('theme', 'light');\n            } else {\n              html.setAttribute('data-theme', 'dark');\n              localStorage.setItem('theme', 'dark');\n            }\n          });\n        });\n      })();\n    </script>  </body> </html>"])), addAttribute(langCode, "lang"), addAttribute(ogDescription || siteDescription, "content"), pageTitle, maybeRenderHead(), lang === "en" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-5hce7sga": true }, { "default": ($$result2) => renderTemplate`<link rel="alternate" hreflang="en"${addAttribute(Astro2.url?.href || `${baseUrl}${Astro2.url?.pathname || ""}`, "href")}><link rel="alternate" hreflang="zh-CN"${addAttribute(`${baseUrl}${Astro2.url?.pathname?.replace(/^\/en/, "") || "/"}`, "href")}><link rel="alternate" hreflang="x-default"${addAttribute(`${baseUrl}${Astro2.url?.pathname?.replace(/^\/en/, "") || "/"}`, "href")}>` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-5hce7sga": true }, { "default": ($$result2) => renderTemplate`<link rel="alternate" hreflang="zh-CN"${addAttribute(Astro2.url?.href || `${baseUrl}${Astro2.url?.pathname || "/"}`, "href")}><link rel="alternate" hreflang="en"${addAttribute(`${baseUrl}/en${Astro2.url?.pathname || "/"}`, "href")}><link rel="alternate" hreflang="x-default"${addAttribute(Astro2.url?.href || `${baseUrl}${Astro2.url?.pathname || "/"}`, "href")}>` })}`, addAttribute(siteAuthor, "content"), addAttribute(siteKeywords, "content"), addAttribute("", "content"), addAttribute("", "content"), addAttribute("", "content"), addAttribute(canonicalUrl, "href"), addAttribute(siteName, "content"), addAttribute(pageTitle, "content"), addAttribute(ogDescription || siteDescription, "content"), addAttribute(ogImage || `${baseUrl}/og-image.png`, "content"), addAttribute(canonicalUrl, "content"), addAttribute(ogLocale, "content"), addAttribute(pageTitle, "content"), addAttribute(ogDescription || siteDescription, "content"), addAttribute(ogImage || `${baseUrl}/og-image.png`, "content"), allJsonLd.map((item) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "</script>"])), unescapeHTML(JSON.stringify(item)))), gaId, renderHead(), addAttribute(lang === "en" ? "/en/" : "/", "href"), siteName, addAttribute(lang === "en" ? "/en/" : "/", "href"), addAttribute([navActive === "home" && "active"], "class:list"), t("navHome", lang), addAttribute(lang === "en" ? "/en/diary/" : "/diary/", "href"), addAttribute([navActive === "diary" && "active"], "class:list"), t("navDiary", lang), addAttribute(lang === "en" ? "/en/ai-news/" : "/ai-news/", "href"), addAttribute([navActive === "ai-news" && "active"], "class:list"), t("navAiNews", lang), addAttribute(lang === "en" ? "/en/banbaiguan/" : "/banbaiguan/", "href"), addAttribute([navActive === "banbaiguan" && "active"], "class:list"), t("navBanbaiguan", lang), addAttribute(lang === "en" ? "/en/guestbook/" : "/guestbook/", "href"), addAttribute([navActive === "guestbook" && "active"], "class:list"), t("navGuestbook", lang), addAttribute(lang === "en" ? "/en/search/" : "/search/", "href"), addAttribute([navActive === "search" && "active"], "class:list"), addAttribute(lang === "en" ? "/en/about/" : "/about/", "href"), addAttribute([navActive === "about" && "active"], "class:list"), t("navAbout", lang), addAttribute(alternateHref, "href"), lang === "en" ? "中文" : "EN", pathname.startsWith("/banbaiguan/") && renderTemplate`${renderComponent($$result, "TableOfContents", $$TableOfContents, { "data-astro-cid-5hce7sga": true })}`, renderSlot($$result, $$slots["default"]), pathname.startsWith("/banbaiguan/") && (() => {
    const slug = pathname.replace("/banbaiguan/", "").replace("/", "");
    const currentArticle = articles.find((a) => a.slug === slug);
    const tag = currentArticle?.tag || "";
    return renderTemplate`<div class="container" style="max-width: 680px; margin: 0 auto; padding: 0 20px;" data-astro-cid-5hce7sga> ${renderComponent($$result, "RelatedArticles", $$RelatedArticles, { "currentSlug": slug, "currentTag": tag, "data-astro-cid-5hce7sga": true })} </div>`;
  })(), shouldShowShare && renderTemplate`<div class="container" style="max-width: 680px; margin: 0 auto; padding: 0 20px;" data-astro-cid-5hce7sga> ${renderComponent($$result, "ShareButtons", $$ShareButtons, { "title": pageTitle, "summary": ogDescription, "data-astro-cid-5hce7sga": true })} </div>`, footerBrand, footerCompanySite, footerQrHint, addAttribute(footerQrGzh, "alt"), footerQrGzh, addAttribute(footerQrDy, "alt"), footerQrDy, footerCopy, renderComponent($$result, "ChatWidget", $$ChatWidget, { "lang": lang, "data-astro-cid-5hce7sga": true }));
}, "/home/18151201278_wy/openclaw/workspace-xs001/wu-personal-site/src/layouts/Base.astro", void 0);

export { $$Base as $, t };
