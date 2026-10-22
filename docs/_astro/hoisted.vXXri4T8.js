import"./hoisted.B-2yTOD0.js";const y="gb-admin-2026";function h(){if(sessionStorage.getItem("gb-admin-auth")==="ok")return!0;const e=prompt("输入管理密码：");return e===y?(sessionStorage.setItem("gb-admin-auth","ok"),!0):(e!==null&&alert("密码错误"),!1)}if(!h())throw document.body.innerHTML='<p style="text-align:center;padding:40px;color:#999;">未授权访问</p>',new Error("Unauthorized");let r="all",c=[];async function f(){const n=document.getElementById("admin-messages"),e=document.getElementById("refresh-btn"),t=document.getElementById("last-refresh");e&&(e.disabled=!0),n&&(n.innerHTML='<div class="loading-state">加载中…</div>');const a=new URL("/api/guestbook",window.location.origin);a.searchParams.set("admin","true");try{const d=await(await fetch(a)).json();c=d.messages||[];const p=d.stats||{},v=c.filter(i=>i.needsOwner&&i.state==="open").length,s=i=>document.getElementById(i);s("stat-needs-owner")&&(s("stat-needs-owner").textContent=String(v)),s("stat-total")&&(s("stat-total").textContent=String(p.total));const o={};if(c.forEach(i=>{const g=i.categoryLabel||"💬 讨论";o[g]=(o[g]||0)+1}),s("stat-suggestion")&&(s("stat-suggestion").textContent=String(o["💡 产品建议"]||0)),s("stat-bug")&&(s("stat-bug").textContent=String(o["🔧 问题反馈"]||0)),s("stat-cooperation")&&(s("stat-cooperation").textContent=String(o["🤝 合作意向"]||0)),s("stat-praise")&&(s("stat-praise").textContent=String(o["❤️ 鼓励"]||0)),m(),t){const i=new Date;t.textContent=`最后刷新：${i.getHours()}:${String(i.getMinutes()).padStart(2,"0")}`}}catch{n&&(n.innerHTML='<div class="empty-state">加载失败，请刷新重试</div>')}finally{e&&(e.disabled=!1)}}function m(){const n=document.getElementById("admin-messages");if(!n)return;let e=c;if(r==="needs-owner"?e=c.filter(t=>t.needsOwner&&t.state==="open"):r!=="all"&&(e=c.filter(t=>{const a=t.categoryLabel||"";return r==="suggestion"?a.includes("建议"):r==="cooperation"?a.includes("合作"):r==="bug"?a.includes("问题")||a.includes("反馈"):r==="inquiry"?a.includes("咨询"):!1})),e.length===0){n.innerHTML='<div class="empty-state">暂无留言</div>';return}n.innerHTML=e.map(t=>{const a=new Date(t.createdAt),u=`${a.getMonth()+1}月${a.getDate()}日 ${String(a.getHours()).padStart(2,"0")}:${String(a.getMinutes()).padStart(2,"0")}`,d=t.contact&&t.contact!=="*用户未留*";return`
        <div class="admin-msg ${t.needsOwner?"needs-owner":""}">
          <div class="admin-msg-header">
            <div class="admin-msg-tags">
              <span class="admin-msg-tag">${t.categoryLabel||"💬 讨论"}</span>
              ${t.needsOwner?'<span class="admin-msg-tag needs-owner">🔔 需处理</span>':""}
              ${t.priority?`<span class="admin-msg-tag">${t.priority}</span>`:""}
            </div>
            <span class="admin-msg-date">${u}</span>
          </div>
          <div class="admin-msg-content">${l(t.content)}</div>
          ${d?`<div class="admin-msg-contact">📮 <strong>联系方式：</strong>${l(t.contact)}</div>`:""}
          ${t.aiReply?`<div class="msg-reply-label">AI 回复</div><div class="msg-reply">${l(t.aiReply)}</div>`:""}
          <div class="admin-msg-actions">
            <a href="${t.url}" target="_blank" rel="noopener">GitHub →</a>
            ${t.comments>0?`<a href="${t.url}#issuecomment-${t.comments}" target="_blank" rel="noopener">评论(${t.comments}) →</a>`:""}
          </div>
        </div>
      `}).join("")}function l(n){const e=document.createElement("div");return e.textContent=n,e.innerHTML}document.querySelectorAll(".filter-btn").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll(".filter-btn").forEach(e=>e.classList.remove("active")),n.classList.add("active"),r=n.getAttribute("data-filter")||"all",m()})});document.getElementById("refresh-btn")?.addEventListener("click",f);f();
