import"./hoisted.B-2yTOD0.js";const a=document.getElementById("gb-content"),m=document.getElementById("char-count");a?.addEventListener("input",()=>{m&&(m.textContent=`${a.value.length}/1000`)});const u=document.getElementById("contact-toggle"),g=document.getElementById("contact-fields");u?.addEventListener("click",()=>{const t=g?.style.display!=="none";g&&(g.style.display=t?"none":"block"),u.classList.toggle("open",!t)});function c(t,n=3e3){let e=document.querySelector(".toast");e||(e=document.createElement("div"),e.className="toast",document.body.appendChild(e)),e.textContent=t,e.classList.add("show"),setTimeout(()=>e?.classList.remove("show"),n)}const d=document.getElementById("submit-btn"),p=d?.querySelector(".btn-text"),y=d?.querySelector(".btn-loading");d?.addEventListener("click",async()=>{const t=a?.value.trim();if(!t){c("✍️ 先写点什么吧"),a?.focus();return}if(t.length<2){c("✍️ 至少写两个字吧");return}const n=document.getElementById("gb-contact")?.value.trim()||"";d.disabled=!0,p.style.display="none",y&&(y.style.display="inline-flex");try{const e=await fetch("/api/guestbook",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:t,contact:n})}),s=await e.json();if(e.ok&&s.success){const i=document.getElementById("reply-card"),o=document.getElementById("reply-category"),l=document.getElementById("reply-time"),r=document.getElementById("reply-content");i&&(i.style.display="block"),o&&(o.textContent=s.category?.label||"🤖 AI 回复"),l&&(l.textContent="刚刚"),r&&(r.textContent=s.aiReply),a&&(a.value="",m&&(m.textContent="0/1000")),c("✅ 留言已提交，AI 已回复"),setTimeout(()=>{i?.scrollIntoView({behavior:"smooth",block:"center"})},200),b()}else c("❌ "+(s.error||"提交失败，请稍后重试"))}catch{c("❌ 网络错误，请稍后重试")}finally{d.disabled=!1,p.style.display="inline",y&&(y.style.display="none")}});document.getElementById("share-btn")?.addEventListener("click",async()=>{const t=document.getElementById("reply-content")?.textContent||"",e=`来自观吾留言板 · ${document.getElementById("reply-category")?.textContent||""}

${t}

https://ban-bai.com/guestbook/`;navigator.clipboard?(await navigator.clipboard.writeText(e),c("✅ 已复制到剪贴板，可以分享了")):c("❌ 复制失败，请手动复制")});async function b(){const t=document.getElementById("messages-list"),n=document.getElementById("message-count");if(t)try{const s=await(await fetch("/api/guestbook")).json();if(!s.messages||s.messages.length===0){t.innerHTML='<div class="empty-state">还没有留言，来做第一个吧 ✍️</div>',n&&(n.textContent="");return}n&&(n.textContent=`(${s.stats.total})`);const i=s.messages.slice(0,10);t.innerHTML=i.map(o=>{const l=new Date(o.createdAt),r=`${l.getMonth()+1}月${l.getDate()}日`;return`
          <div class="msg-item">
            <div class="msg-header">
              <span class="msg-category-tag">${o.categoryLabel}</span>
              <span class="msg-date">${r}</span>
            </div>
            <div class="msg-content">${f(o.content.substring(0,200))}</div>
            ${o.aiReply?`
              <div class="msg-reply-label">AI 回复</div>
              <div class="msg-reply">${f(o.aiReply.substring(0,300))}</div>
            `:""}
          </div>
        `}).join("")}catch{t&&(t.innerHTML='<div class="empty-state">加载失败，请刷新重试</div>')}}function f(t){const n=document.createElement("div");return n.textContent=t,n.innerHTML}b();
