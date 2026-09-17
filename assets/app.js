/* ============================================================
   app.js · 通用交互（window.App）
   依赖：icons.js → mock.js → api.js → app.js（各页统一引入顺序）
   ============================================================ */
window.App = (() => {

  /* ---------- 图标渲染：把 <i data-icon="x"></i> 替换为内联 SVG ---------- */
  function renderIcons(root = document) {
    root.querySelectorAll("[data-icon]").forEach(el => {
      const name = el.getAttribute("data-icon");
      const svg = window.ICONS && window.ICONS[name];
      if (svg && !el.dataset.rendered) { el.innerHTML = svg; el.dataset.rendered = "1"; }
    });
  }

  /* ---------- 导航激活：body[data-page] ↔ [data-nav] 唯一规则 ---------- */
  function activeNav() {
    const page = document.body.dataset.page;
    document.querySelectorAll("[data-nav]").forEach(a => {
      a.classList.toggle("active", a.dataset.nav === page);
    });
  }

  /* ---------- 顶栏日期 ---------- */
  function fillDate() {
    const d = new Date();
    const week = ["日", "一", "二", "三", "四", "五", "六"][d.getDay()];
    const pad = n => String(n).padStart(2, "0");
    const text = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} 周${week}`;
    const t = document.getElementById("topDate"); if (t) t.textContent = text;
    const m = document.getElementById("mDate"); if (m) m.textContent = text;
    const c = document.getElementById("liveDate"); if (c) c.textContent = text;
  }

  /* ---------- 实时时钟：元素 #liveClock ---------- */
  function startClock() {
    const el = document.getElementById("liveClock");
    if (!el) return;
    const tick = () => { el.textContent = new Date().toTimeString().slice(0, 8); };
    tick(); setInterval(tick, 1000);
  }

  /* ---------- Toast ---------- */
  function toastWrap() {
    let w = document.querySelector(".toast-wrap");
    if (!w) { w = document.createElement("div"); w.className = "toast-wrap"; document.body.appendChild(w); }
    return w;
  }
  function toast(msg, type = "success") {
    const icon = { success: "check-circle-2", error: "alert-triangle", info: "alert-triangle" }[type] || "check-circle-2";
    const t = document.createElement("div");
    t.className = `toast toast--${type}`;
    t.innerHTML = `<i data-icon="${icon}"></i><span>${msg}</span>`;
    toastWrap().appendChild(t); renderIcons(t);
    setTimeout(() => { t.style.transition = "opacity .3s"; t.style.opacity = "0"; setTimeout(() => t.remove(), 320); }, 2600);
  }

  /* ---------- 模态框 ---------- */
  function openModal(id) { const m = document.getElementById(id); if (m) { m.classList.add("show"); renderIcons(m); } }
  function closeModal(id) { const m = document.getElementById(id); if (m) m.classList.remove("show"); }
  /* 点击遮罩关闭 */
  document.addEventListener("click", e => {
    if (e.target.classList && e.target.classList.contains("modal-backdrop")) e.target.classList.remove("show");
    if (e.target.closest && e.target.closest("[data-close-modal]")) {
      const m = e.target.closest(".modal-backdrop"); if (m) m.classList.remove("show");
    }
  });
  /* Esc 关闭 */
  document.addEventListener("keydown", e => { if (e.key === "Escape") document.querySelectorAll(".modal-backdrop.show").forEach(m => m.classList.remove("show")); });

  /* ---------- Tabs：容器 [data-tabs]，按钮 .tab[data-tab]，面板 .tab-panel[data-panel] ---------- */
  function bindTabs(scope = document) {
    scope.querySelectorAll("[data-tabs]").forEach(box => {
      box.addEventListener("click", e => {
        const btn = e.target.closest(".tab[data-tab]"); if (!btn) return;
        const key = btn.dataset.tab;
        box.querySelectorAll(".tab[data-tab]").forEach(b => b.classList.toggle("active", b === btn));
        const page = box.parentElement;
        (page || document).querySelectorAll(".tab-panel[data-panel]").forEach(p => {
          p.classList.toggle("active", p.dataset.panel === key);
        });
        renderIcons(page || document);
      });
    });
  }

  /* ---------- 胶囊单选/多选组：.seg 内 .seg__item 点击切换 on ---------- */
  function bindSegs(scope = document) {
    scope.querySelectorAll(".seg").forEach(seg => {
      seg.addEventListener("click", e => {
        const item = e.target.closest(".seg__item"); if (!item) return;
        if (seg.dataset.type === "checkbox") { item.classList.toggle("on"); }
        else { seg.querySelectorAll(".seg__item").forEach(i => i.classList.remove("on")); item.classList.add("on"); }
        seg.dispatchEvent(new CustomEvent("segchange", { bubbles: true }));
      });
    });
  }

  /* ---------- 必填校验：容器内 .field[data-required] ----------
     规则：控件值为空 → 标红 + 返回 false；全部通过 → true */
  function validate(scope = document) {
    let pass = true;
    scope.querySelectorAll(".field[data-required]").forEach(f => {
      const ctl = f.querySelector("input,select,textarea");
      const seg = f.querySelector(".seg");
      let ok = true;
      if (ctl) ok = String(ctl.value || "").trim() !== "";
      else if (seg) ok = !!seg.querySelector(".seg__item.on");
      f.classList.toggle("field--error", !ok);
      if (!ok) pass = false;
    });
    return pass;
  }

  /* ---------- 状态徽章 HTML（全站统一） ---------- */
  function statusBadge(status, extra = "") {
    const label = (DB.STATUS && DB.STATUS[status]) || status;
    return `<span class="st st--${status}" ${extra}>${label}</span>`;
  }

  /* ---------- 必填性徽章 ---------- */
  const reqBadge = `<span class="badge badge--req">必填</span>`;
  const optBadge = `<span class="badge badge--opt">选填</span>`;
  const autoBadge = `<span class="badge badge--auto">自动获取</span>`;
  const sysBadge = `<span class="badge badge--sys">系统生成</span>`;
  const condBadge = `<span class="badge badge--cond">条件必填</span>`;

  /* ---------- 简单 HTML 转义 ---------- */
  function esc(s) { return String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

  /* ---------- 初始化 ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderIcons(); activeNav(); fillDate(); startClock(); bindTabs(); bindSegs();
  });

  return { renderIcons, activeNav, toast, openModal, closeModal, bindTabs, bindSegs, validate, statusBadge, reqBadge, optBadge, autoBadge, sysBadge, condBadge, esc };
})();
