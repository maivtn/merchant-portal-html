function sidebar() {
  return `
  <aside class="sidebar">
    <div class="brand">
      <div class="brand-badge">CG</div>
      <div>
        <p class="brand-title">Charity Gift Admin</p>
        <div class="brand-sub">Back Office</div>
      </div>
    </div>

    <nav class="nav-group">
      <a class="nav-item" data-nav="dashboard" href="index.html">Dashboard</a>
      <a class="nav-item" data-nav="pools" href="pools.html">Pool Management</a>
      <a class="nav-item" data-nav="batch-distribution" href="batch-distribution.html">Batch Distribution</a>
      <a class="nav-item" data-nav="settlement" href="settlement.html">Merchant Settlement</a>
      <a class="nav-item" data-nav="transactions" href="transactions.html">Transactions</a>
      <div class="nav-label">Security &amp; Audit</div>
      <a class="nav-item" data-nav="refund" href="refund.html">Refund</a>
      <a class="nav-item" data-nav="audit" href="audit.html">Audit Trail</a>
      <a class="nav-item" data-nav="rbac" href="rbac.html">RBAC &amp; Security</a>
    </nav>
  </aside>`;
}

function topbar(title, meta) {
  return `
  <header class="topbar">
    <div>
      <h1 class="page-title">${title}</h1>
      <div class="page-meta">${meta}</div>
    </div>
    <div class="search-box">🔎 <span>Quick search transaction, wallet, card ID, batch...</span></div>
  </header>`;
}

(function renderLayout() {
  const config = window.__PAGE_CONFIG__ || {};
  const sidebarRoot = document.getElementById('sidebar-root');
  const topbarRoot = document.getElementById('topbar-root');

  if (sidebarRoot) sidebarRoot.outerHTML = sidebar();
  if (topbarRoot) topbarRoot.outerHTML = topbar(config.title || 'Charity Gift Admin', config.meta || '');
})();
