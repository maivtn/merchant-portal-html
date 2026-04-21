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
          // { key: 'proof-review', label: 'Proof Review', href: 'proof-review.html' },
          { key: 'exception-center', label: 'Exception Center', href: 'exception-center.html' },
          { key: 'permission-matrix', label: 'Permission Matrix', href: 'permission-matrix.html' },
          { key: 'alert-center', label: 'Alert Center', href: 'alert-center.html' },
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
      'permission-matrix': 'permission-matrix',
      'alert-center': 'alert-center',
    },
  };

  const ADMIN_TW = {
    control: {
      button: [
        'inline-flex',
        'items-center',
        'justify-center',
        'gap-2',
        'transition',
        'duration-200',
        'ease-out',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-amber-400/30',
      ],
      buttonGold: ['shadow-lg', 'shadow-amber-400/20'],
      buttonOutline: ['border', 'border-amber-400/30', 'hover:bg-amber-400/10'],
      field: [
        'rounded-2xl',
        'border',
        'border-zinc-700',
        'bg-zinc-950/80',
        'text-slate-100',
        'placeholder:text-slate-500',
        'focus:border-amber-400',
        'focus:ring-2',
        'focus:ring-amber-400/25',
        'focus:outline-none',
      ],
      badge: ['inline-flex', 'items-center', 'rounded-full', 'font-semibold', 'tracking-wide'],
      link: ['inline-flex', 'items-center', 'gap-2', 'transition', 'duration-200', 'hover:-translate-y-0.5'],
      search: ['rounded-full', 'border', 'border-zinc-800', 'bg-zinc-950/80'],
      navItem: ['transition', 'duration-200', 'ease-out', 'hover:-translate-y-0.5'],
      chip: ['inline-flex', 'items-center', 'rounded-full', 'border', 'border-zinc-800/80'],
    },
  };

  function addTailwindClasses(selector, classes) {
    document.querySelectorAll(selector).forEach((el) => {
      classes.forEach((className) => el.classList.add(className));
    });
  }

  function applyTailwindControls() {
    addTailwindClasses('.btn', ADMIN_TW.control.button);
    addTailwindClasses('.btn-gold', ADMIN_TW.control.buttonGold);
    addTailwindClasses('.btn-outline-gold', ADMIN_TW.control.buttonOutline);
    addTailwindClasses('.input, .select, .textarea', ADMIN_TW.control.field);
    addTailwindClasses('.badge', ADMIN_TW.control.badge);
    addTailwindClasses('.back-link', ADMIN_TW.control.link);
    addTailwindClasses('.nav-item', ADMIN_TW.control.navItem);
    addTailwindClasses('.search-box', ADMIN_TW.control.search);
    addTailwindClasses('.workflow-chip', ADMIN_TW.control.chip);
  }

  function bootTailwind() {
    applyTailwindControls();

    if (document.getElementById('tailwind-play-cdn')) return;

    window.tailwind = window.tailwind || {};
    window.tailwind.config = window.tailwind.config || {
      theme: {
        extend: {
          boxShadow: {
            gold: '0 18px 38px rgba(212, 175, 55, 0.18)',
          },
        },
      },
    };

    const script = document.createElement('script');
    script.id = 'tailwind-play-cdn';
    script.src = 'https://cdn.tailwindcss.com';
    script.defer = true;
    document.head.appendChild(script);
  }

  function observeControlMutations() {
    if (!('MutationObserver' in window)) return;

    const observer = new MutationObserver(() => {
      applyTailwindControls();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

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
      <div class="brand flex items-center gap-3 rounded-3xl border border-zinc-800/60 bg-zinc-950/60 px-3 py-3">
        <div class="brand-badge flex h-10 w-10 items-center justify-center rounded-2xl">${ADMIN_UI.brand.initials}</div>
        <div class="min-w-0">
          <p class="brand-title truncate">${ADMIN_UI.brand.title}</p>
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
        <button class="hamburger-btn inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950/80 text-slate-100 transition hover:-translate-y-0.5 hover:border-zinc-700" id="adminSidebarToggle" type="button" aria-label="Open menu" aria-controls="adminSidebar" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div class="topbar-heading min-w-0">
          <h1 class="page-title">${title}</h1>
          <div class="page-meta">${meta}</div>
        </div>
      </div>
      <div class="search-box flex items-center gap-3 px-4 py-3 text-sm text-slate-400">🔎 <span class="truncate">${ADMIN_UI.searchPlaceholder}</span></div>
    </header>`;
  }

  window.ADMIN_UI = ADMIN_UI;
  window.ADMIN_TW = ADMIN_TW;
  window.ADMIN_RENDER = {
    getActiveNav,
    renderSidebar,
    renderTopbar,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      bootTailwind();
      observeControlMutations();
    }, { once: true });
  } else {
    bootTailwind();
    observeControlMutations();
  }
})(window);
