(function (window) {
  const ADMIN_UI = {
    brand: {
      initials: 'CG',
      title: 'Charity Gift Admin',
      subtitle: 'Back Office',
    },
    searchPlaceholder: 'Quick search transaction, wallet, card ID, batch...',
    navGroups: [
      {
        items: [
          { key: 'dashboard', label: 'Dashboard', href: 'index.html' },
          { key: 'pools', label: 'Pool Management', href: 'pools.html' },
          { key: 'beneficiaries', label: 'Beneficiary Management', href: 'beneficiaries.html' },
          { key: 'batch-distribution', label: 'Batch Distribution', href: 'batch-distribution.html' },
          { key: 'proof-review', label: 'Proof Review', href: 'proof-review.html' },
          { key: 'settlement', label: 'Merchant Settlement', href: 'settlement.html' },
          { key: 'transactions', label: 'Transactions', href: 'transactions.html' },
        ],
      },
      {
        label: 'Security & Audit',
        items: [
          { key: 'refund', label: 'Refund', href: 'refund.html' },
          { key: 'proof-review', label: 'Proof Review', href: 'proof-review.html' },
          { key: 'exception-center', label: 'Exception Center', href: 'exception-center.html' },
          { key: 'audit', label: 'Audit Trail', href: 'audit.html' },
          { key: 'rbac', label: 'RBAC & Security', href: 'rbac.html' },
        ],
      },
    ],
    pageAliases: {
      'batch-detail': 'pools',
      'pool-detail': 'pools',
      'merchant-detail': 'settlement',
      'settlement-dispute': 'settlement',
      'transaction-detail': 'transactions',
      'refund-detail': 'refund',
      'beneficiaries': 'beneficiaries',
      'beneficiary-detail': 'beneficiaries',
      'proof-review': 'proof-review',
      'exception-center': 'exception-center',
    },
  };

  function getActiveNav(page) {
    return ADMIN_UI.pageAliases[page] || page;
  }

  function renderSidebar(currentPage) {
    const activeKey = getActiveNav(currentPage);
    const groups = ADMIN_UI.navGroups
      .map((group) => {
        const label = group.label ? `<div class="nav-label">${group.label}</div>` : '';
        const items = group.items
          .map((item) => {
            const activeClass = item.key === activeKey ? ' active' : '';
            return `<a class="nav-item${activeClass}" data-nav="${item.key}" href="${item.href}">${item.label}</a>`;
          })
          .join('');

        return `${label}${items}`;
      })
      .join('');

    return `
    <aside class="sidebar" id="adminSidebar">
      <div class="brand">
        <div class="brand-badge">${ADMIN_UI.brand.initials}</div>
        <div>
          <p class="brand-title">${ADMIN_UI.brand.title}</p>
          <div class="brand-sub">${ADMIN_UI.brand.subtitle}</div>
        </div>
      </div>

      <nav class="nav-group">
        ${groups}
      </nav>
    </aside>`;
  }

  function renderTopbar(title, meta) {
    return `
    <header class="topbar">
      <div class="topbar-left">
        <button class="hamburger-btn" id="adminSidebarToggle" type="button" aria-label="Open menu" aria-controls="adminSidebar" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div class="topbar-heading">
          <h1 class="page-title">${title}</h1>
          <div class="page-meta">${meta}</div>
        </div>
      </div>
      <div class="search-box">🔎 <span>${ADMIN_UI.searchPlaceholder}</span></div>
    </header>`;
  }

  window.ADMIN_UI = ADMIN_UI;
  window.ADMIN_RENDER = {
    getActiveNav,
    renderSidebar,
    renderTopbar,
  };
})(window);
