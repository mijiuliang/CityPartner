/* ============================================================
   来云顶班 — Shared Utilities V2
   Apple Design System
   ============================================================ */

/* DOM Ready */
function onReady(fn) {
  if (document.readyState !== "loading") fn();
  else document.addEventListener("DOMContentLoaded", fn);
}

/* ECharts — Apple dark theme */
function createChart(dom, option) {
  if (!dom || !window.echarts) return null;
  const chart = echarts.init(dom);
  const defaults = {
    backgroundColor: "transparent",
    textStyle: {
      color: "#a1a1a6",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif",
      fontSize: 12
    },
    tooltip: {
      backgroundColor: "rgba(28,28,30,.92)",
      borderColor: "rgba(255,255,255,.08)",
      borderWidth: 1,
      textStyle: { color: "#f5f5f7", fontSize: 13 },
      extraCssText: "border-radius:12px;backdrop-filter:blur(20px);box-shadow:0 8px 32px rgba(0,0,0,.4);padding:12px 16px;"
    },
    legend: { textStyle: { color: "#a1a1a6", fontSize: 12 } },
    grid: { containLabel: true },
    xAxis: {
      axisLine: { lineStyle: { color: "rgba(255,255,255,.08)" } },
      axisLabel: { color: "#a1a1a6", fontSize: 12 },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: "rgba(255,255,255,.04)" } }
    },
    yAxis: {
      axisLine: { show: false },
      axisLabel: { color: "#a1a1a6", fontSize: 12 },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: "rgba(255,255,255,.04)" } }
    },
    radar: {
      axisName: { color: "#a1a1a6", fontSize: 12 },
      splitLine: { lineStyle: { color: "rgba(255,255,255,.06)" } },
      splitArea: { areaStyle: { color: ["transparent"] } },
      axisLine: { lineStyle: { color: "rgba(255,255,255,.06)" } }
    }
  };
  function merge(target, source) {
    for (const key in source) {
      if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
        target[key] = target[key] || {};
        merge(target[key], source[key]);
      } else if (!(key in target)) {
        target[key] = source[key];
      }
    }
  }
  merge(option, defaults);
  chart.setOption(option);
  window._charts = window._charts || [];
  window._charts.push(chart);
  return chart;
}

/* Debounced resize */
let _resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(_resizeTimer);
  _resizeTimer = setTimeout(() => {
    (window._charts || []).forEach(c => { try { c.resize(); } catch(e) {} });
  }, 150);
});

/* Scroll Animations — Intersection Observer */
function initScrollAnimations() {
  const els = document.querySelectorAll(".fade-in, .scale-in");
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -60px 0px" });
  els.forEach(el => observer.observe(el));
}

/* Navigation */
function renderNav(activePage) {
  const pages = [
    { id: "index", label: "首页", href: "index.html" },
    { id: "market", label: "市场机会", href: "market.html" },
    { id: "model", label: "合作模式", href: "model.html" },
    { id: "kpi", label: "数据看板", href: "kpi.html" },
    { id: "layout", label: "全国布局", href: "layout.html" },
    { id: "faq", label: "常见问题", href: "faq.html" }
  ];
  const nav = document.createElement("nav");
  nav.className = "nav";
  nav.innerHTML = `
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">来云顶班</a>
      <button class="nav-toggle" aria-label="菜单">☰</button>
      <div class="nav-links">
        ${pages.map(p => `<a href="${p.href}"${p.id === activePage ? ' class="active"' : ''}>${p.label}</a>`).join('')}
      </div>
    </div>`;
  document.body.prepend(nav);
  nav.querySelector(".nav-toggle").addEventListener("click", () => {
    nav.querySelector(".nav-links").classList.toggle("open");
  });
  // Close menu on link click (mobile)
  nav.querySelectorAll(".nav-links a").forEach(a => {
    a.addEventListener("click", () => {
      nav.querySelector(".nav-links").classList.remove("open");
    });
  });
}

/* Footer */
function renderFooter() {
  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-col">
          <h4>产品</h4>
          <a href="index.html">首页</a>
          <a href="market.html">市场机会</a>
          <a href="kpi.html">数据看板</a>
        </div>
        <div class="footer-col">
          <h4>合作</h4>
          <a href="model.html">合作模式</a>
          <a href="layout.html">全国布局</a>
          <a href="faq.html">常见问题</a>
        </div>
        <div class="footer-col">
          <h4>关于</h4>
          <a href="faq.html">关于我们</a>
          <a href="javascript:showContact()">联系我们</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 湖南稻谷山人力资源有限公司</span>
        <span>来云顶班 · 同城日结兼职交付基础设施</span>
      </div>
    </div>`;
  document.body.appendChild(footer);
}

// 联系弹窗（安全版，只点击才出现）
function showContact(){
  const modal = document.createElement('div');
  modal.style.cssText = `
    position:fixed; top:0; left:0; width:100%; height:100%;
    background:rgba(0,0,0,0.85); backdrop-filter:blur(12px);
    z-index:9999; display:flex; align-items:center; justify-content:center;
    font-family:-apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif;
  `;

  modal.innerHTML = `
  <div style="background:#1c1c1e; border-radius:18px; padding:30px; width:90%; max-width:400px; color:#f5f5f7;">
    <h3 style="margin:0 0 22px; font-size:18px; font-weight:600;">联系我们</h3>
    <p style="color:#a1a1a6; font-size:14px; line-height:1.8; margin:8px 0;">
      驿站老村长
      <a href="tel:18684839452" style="color:#007aff; text-decoration:none;">18684839452（肖总）</a>
    </p>
    <p style="color:#a1a1a6; font-size:14px; line-height:1.8; margin:8px 0;">
      招商负责人
      <a href="tel:15573133866" style="color:#007aff; text-decoration:none;">15573133866（龚总）</a>
    </p>
    <button onclick="this.parentElement.parentElement.remove()" style="
      margin-top:24px; width:100%; padding:12px 0;
      background:#3a3a3c; border:none; border-radius:12px;
      color:#fff; font-size:15px; cursor:pointer;
    ">关闭</button>
  </div>`;

  modal.onclick = (e) => { if (e.target === modal) modal.remove(); }
  document.body.appendChild(modal);
}
