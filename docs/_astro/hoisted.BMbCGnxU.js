import"./hoisted.B-2yTOD0.js";const M=document.getElementById("admin-app");let v=localStorage.getItem("survey_token")||"",b="stats",E=null,L=1;function h(){v?(z(),T()):P()}function P(){M.innerHTML=`
    <div class="admin-wrapper">
      <div class="admin-login">
        <h2>📊 调查管理后台</h2>
        <input type="password" id="login-pwd" placeholder="请输入管理密码" autocomplete="current-password">
        <div class="error-msg" id="login-error">密码错误，请重试</div>
        <button class="admin-btn admin-btn-primary" id="login-btn" style="width:100%">登录</button>
      </div>
    </div>
  `,document.getElementById("login-pwd").addEventListener("keydown",t=>{t.key==="Enter"&&A()}),document.getElementById("login-btn").onclick=A}async function A(){const t=document.getElementById("login-pwd").value.trim();if(!t)return;const o=document.getElementById("login-btn");o.disabled=!0,o.textContent="登录中...";try{const n=await(await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:t})})).json();n.success?(v=n.token,localStorage.setItem("survey_token",v),z(),T()):document.getElementById("login-error").classList.add("show")}catch{document.getElementById("login-error").textContent="网络错误，请重试",document.getElementById("login-error").classList.add("show")}o.disabled=!1,o.textContent="登录"}function z(){M.innerHTML=`
    <div class="admin-wrapper">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
        <h2 style="font-family:var(--font-serif);font-size:22px;">📊 调查管理后台</h2>
        <div style="display:flex;gap:8px;">
          <button class="admin-btn admin-btn-ghost" id="export-btn">📥 导出CSV</button>
          <button class="admin-btn admin-btn-ghost" id="logout-btn">退出</button>
        </div>
      </div>
      <div class="admin-tabs">
        <button class="admin-tab ${b==="stats"?"active":""}" data-tab="stats">数据概览</button>
        <button class="admin-tab ${b==="responses"?"active":""}" data-tab="responses">详细记录</button>
      </div>
      <div id="tab-content">
        <div class="admin-loading">加载中...</div>
      </div>
    </div>
  `,document.querySelectorAll(".admin-tab").forEach(t=>{t.onclick=()=>{b=t.dataset.tab,document.querySelectorAll(".admin-tab").forEach(o=>o.classList.remove("active")),t.classList.add("active"),b==="stats"?j():_()}}),document.getElementById("logout-btn").onclick=()=>{localStorage.removeItem("survey_token"),v="",h()},document.getElementById("export-btn").onclick=R}function B(){return{Authorization:"Bearer "+v,"Content-Type":"application/json"}}async function T(){try{const t=await fetch("/api/admin/stats",{headers:B()});if(t.status===401){localStorage.removeItem("survey_token"),v="",h();return}E=await t.json(),j(),b==="responses"&&_()}catch(t){console.error("Load stats error:",t)}}function j(){if(!E)return;const t=E,o=document.getElementById("tab-content"),d=[1,3,5,6,8,9,13,14,16,17,18,21,22],n={};for(const a of d)n[a]={A:0,B:0};for(const a of t.decisions)n[a.question_no]!==void 0&&(n[a.question_no][a.choice]=a.cnt||a.count||0);let u="";for(const a of d){const p=n[a].A+n[a].B||1,r=Math.round(n[a].A/p*100),i=Math.round(n[a].B/p*100);u+=`
      <div style="margin-bottom:12px;">
        <div style="font-size:12px;font-weight:600;margin-bottom:4px;">Q${a}</div>
        <div class="bar-row">
          <span style="width:20px;font-size:12px;color:var(--color-accent);">A</span>
          <div class="bar-track"><div class="bar-fill bar-fill-a" style="width:${r}%"></div></div>
          <span class="bar-count">${r}%</span>
        </div>
        <div class="bar-row">
          <span style="width:20px;font-size:12px;color:var(--color-gold);">B</span>
          <div class="bar-track"><div class="bar-fill bar-fill-b" style="width:${i}%"></div></div>
          <span class="bar-count">${i}%</span>
        </div>
      </div>`}const g=t.demographics.gender||[],m=t.demographics.age||[],s=t.demographics.education||[],e=t.demographics.hasChild||[],f=["男","女","其他/不愿透露"],x=["25岁以下","25-30岁","31-35岁","36-40岁","41-45岁","46岁以上"],w=["高中及以下","大专","本科","硕士","博士及以上"],y=["有孩子","无孩子"];function $(a,p,r){for(var i=Object.keys(a),c=0;c<i.length;c++)if(i[c]!=="cnt"&&p.indexOf(i[c])===-1)return a[i[c]];return r||""}function l(a,p){var r=a.reduce(function(i,c){return i+(c.cnt||0)},0)||1;return a.map(function(i,c){var S=Math.round((i.cnt||0)/r*100),H=["gender","age_group","education","has_child"],O=$(i,H,p[c]||"");return'<div class="bar-row"><span class="bar-label">'+O+'</span><div class="bar-track"><div class="bar-fill bar-fill-p" style="width:'+S+'%"></div></div><span class="bar-count">'+S+"%</span></div>"}).join("")}const C=["interested","enthusiastic","proud","inspired","determined","distressed","nervous","afraid","guilty","hostile"],D=["感兴趣的","热情的","自豪的","备受鼓舞的","意志坚决的","心烦的","紧张的","害怕的","内疚的","敌意的"],I={};for(const a of t.panas)I[a.item]=a.avg_score;let k="";C.forEach((a,p)=>{const r=(I[a]||0).toFixed(1),i=Math.round(r/5*100);k+=`<div class="bar-row">
      <span class="bar-label">${D[p]}</span>
      <div class="bar-track"><div class="bar-fill bar-fill-p" style="width:${i}%"></div></div>
      <span class="bar-count">${r}</span>
    </div>`});const q=(t.langDistribution||[]).map(a=>`<span style="margin-right:16px;font-size:13px;">${a.lang==="zh"?"中文":"English"}: <strong>${a.cnt}</strong></span>`).join("");o.innerHTML=`
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${t.total}</div>
        <div class="stat-label">总提交数</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${t.avgDuration}s</div>
        <div class="stat-label">平均用时</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${t.mathPassRate}%</div>
        <div class="stat-label">数学题通过率</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="font-size:16px;padding-top:8px;">${q}</div>
        <div class="stat-label">语言分布</div>
      </div>
    </div>
    <div class="chart-grid">
      <div class="chart-card">
        <div class="chart-title">情景题 A/B 选择分布</div>
        ${u}
      </div>
      <div class="chart-card">
        <div class="chart-title">PANAS 情绪量表均值</div>
        ${k}
        <div style="margin-top:20px;">
          <div class="chart-title">人口统计</div>
          <div style="font-size:12px;font-weight:600;color:var(--color-text-secondary);margin-bottom:6px;">性别</div>
          ${l(g,f)}
          <div style="font-size:12px;font-weight:600;color:var(--color-text-secondary);margin:12px 0 6px;">年龄</div>
          ${l(m,x)}
          <div style="font-size:12px;font-weight:600;color:var(--color-text-secondary);margin:12px 0 6px;">学历</div>
          ${l(s,w)}
          <div style="font-size:12px;font-weight:600;color:var(--color-text-secondary);margin:12px 0 6px;">是否有孩子</div>
          ${l(e,y)}
        </div>
      </div>
    </div>
  `}async function _(){const t=document.getElementById("tab-content");t.innerHTML='<div class="admin-loading">加载中...</div>';try{const o=await fetch(`/api/admin/responses?page=${L}&pageSize=20`,{headers:B()});if(o.status===401){localStorage.removeItem("survey_token"),v="",h();return}const d=await o.json(),n=d.responses||[],u={},g={};for(const e of d.decisions||[])u[e.response_id]||(u[e.response_id]=[]),u[e.response_id].push(e);for(const e of d.panas||[])g[e.response_id]||(g[e.response_id]=[]),g[e.response_id].push(e);const m=d.pagination||{};let s='<div class="admin-table-wrap"><table class="admin-table"><thead><tr>';s+="<th>ID</th><th>时间</th><th>语言</th><th>用时</th><th>数学</th><th>性别</th><th>年龄</th><th>学历</th>",s+="<th>选择倾向</th><th>开放回答</th>",s+="</tr></thead><tbody>";for(const e of n){const f=u[e.id]||[],x=f.filter(l=>l.choice==="A").length,w=f.filter(l=>l.choice==="B").length,y=e.math_answer===83;s+="<tr>",s+=`<td>${e.id}</td>`,s+=`<td style="white-space:nowrap;">${e.created_at?new Date(e.created_at).toLocaleString("zh-CN"):"-"}</td>`,s+=`<td>${e.lang==="zh"?"中":"EN"}</td>`,s+=`<td>${e.duration_sec||"-"}s</td>`,s+=`<td><span class="badge ${y?"badge-pass":"badge-fail"}">${y?"✓":"✗"}</span></td>`,s+=`<td>${e.gender||"-"}</td>`,s+=`<td>${e.age_group||"-"}</td>`,s+=`<td>${e.education||"-"}</td>`,s+=`<td><span class="badge badge-a">A×${x}</span> <span class="badge badge-b">B×${w}</span></td>`;const $=(e.open_text||"").substring(0,50);s+=`<td class="open-text-cell" title="${(e.open_text||"").replace(/"/g,"&quot;")}">${$||"-"}</td>`,s+="</tr>"}if(s+="</tbody></table></div>",m.totalPages>1){s+='<div class="admin-pagination">';for(let e=1;e<=m.totalPages;e++)s+=`<button class="${e===L?"current":""}" data-page="${e}">${e}</button>`;s+="</div>"}t.innerHTML=s,t.querySelectorAll(".admin-pagination button").forEach(e=>{e.onclick=()=>{L=parseInt(e.dataset.page),_()}})}catch(o){t.innerHTML='<div class="admin-loading">加载失败</div>',console.error("Render responses error:",o)}}async function R(){try{const t=await fetch("/api/admin/export",{headers:B()});if(t.status===401){localStorage.removeItem("survey_token"),v="",h();return}if(!t.ok)throw new Error("Export failed");const o=await t.blob(),d=URL.createObjectURL(o),n=document.createElement("a");n.href=d,n.download=`survey-export-${new Date().toISOString().slice(0,10)}.csv`,n.click(),URL.revokeObjectURL(d)}catch(t){alert("导出失败，请重试"),console.error(t)}}h();
