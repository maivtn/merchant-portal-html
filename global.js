/**
 * global.js — Shared layout logic for VLINKPAY merchant portal
 * Handles: sidebar data & render, sidebar toggle, hamburger injection, overlay, responsive behavior
 */

(function () {
  "use strict";

  const sidebarScript = document.currentScript;
  const PORTAL_BASE_URL =
    sidebarScript && sidebarScript.src
      ? new URL("./", sidebarScript.src).href
      : new URL("./", window.location.href).href;

  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR MENU DATA  ← Edit here to update sidebar across ALL pages
  // ═══════════════════════════════════════════════════════════════════════════
  const SIDEBAR_MENU = [
    // ── OVERVIEW ─────────────────────────────────────────────────────────────
    // { type: "section", label: "OVERVIEW" },
    {
      type: "link",
      label: "Homepage",
      icon: "solar:home-2-bold-duotone",
      iconWidth: 24,
      href: "https://p2pexchangeatmvlinkpay.tiiny.site",
    },
    {
      type: "link",
      label: "Dashboard",
      icon: "solar:widget-bold-duotone",
      iconWidth: 24,
      href: "index.html",
    },

    // ── GIFT CARD CENTER ──────────────────────────────────────────────────────
    // { type: "section", label: "GIFT CARD CENTER" },
    {
      type: "group",
      label: "Create New",
      icon: "solar:add-circle-bold-duotone",
      iconWidth: 26,
      children: [
        {
          label: "Issue Digital",
          href: "issue-digital.html",
          relatedPages: ["issue-digital.html"],
        },

        {
          label: "Quick Setup",
          href: "issue-card.html",
          relatedPages: ["issue-card.html"],
        },

        {
          label: "Advanced Setup",
          href: "",
          relatedPages: [""],
        },
      ],
    },
    {
      type: "group",
      label: "Gift & Voucher",
      icon: "solar:folder-with-files-bold-duotone",
      iconWidth: 26,
      children: [
        {
          label: "Product Management",
          href: "product-list.html",
          relatedPages: [
            "gift-card-details.html",
            "voucher-details.html",
            "issue-digital-details.html",
            "issue-digital-membership-details.html",
            "product-history.html",
          ],
        },

        {
          label: "Cancelled Products",
          href: "cancelled-cards.html",
          relatedPages: ["cancelled-card-list.html"],
        },
      ],
    },
    {
      type: "group",
      label: "Marketing Tools",
      icon: "solar:chart-square-bold-duotone",
      iconWidth: 24,
      children: [
        {
          label: "Spin Wheel",
          href: "marketing-tools.html",
          relatedPages: ["marketing-edit.html", "marketing-details.html"],
        },
        { label: "AI Ads", href: "ai-ads.html" ,
          relatedPages: ["ai-ads.html"],
        },
      ],
    },
    {
      type: "group",
      label: "Payment Acceptance",
      icon: "solar:dollar-minimalistic-bold-duotone",
      iconWidth: 24,
      children: [
        {
          label: "Pay with Gift Card",
          href: "gift-card-payment.html",
          relatedPages: ["gift-card-payment-box.html"],
        },
        {
          label: "Pay with Crypto",
          href: "crypto-payment.html",
          relatedPages: ["crypto-payment-box.html"],
        },
      ],
    },
    {
      type: "group",
      label: "Settings",
      icon: "solar:settings-bold-duotone",
      iconWidth: 24,
      children: [
        {
          label: "Merchant Payment Setup",
          href: "merchant-payment-setup.html",
        },
        {
          label: "Benefits Setup",
          href: "benefits-setup.html",
          relatedPages: [
            "benefit-package-details.html",
            "benefit-package-view.html",
            "benefit-package-view-active.html",
            "create-membership-package.html",
            "membership-package-details.html",
            "membership-package-details-approved.html",
          ],
        },
      ],
    },
    {
      type: "group",
      label: "Report",
      icon: "solar:chart-bold-duotone",
      iconWidth: 24,
      children: [
        {
          label: "Sales Orders",
          href: "sales-order-list.html",
          relatedPages: ["sales-order-details.html"],
        },
        {
          label: "Redeem History",
          href: "card-transaction-history-merchant.html",
          relatedPages: ["card-transaction-history.html"],
        },
        { label: "Membership Report", href: "membership-report.html" },
      ],
    },

    // ── APPS ──────────────────────────────────────────────────────────────────
    { type: "section", label: "APPS" },
    {
      type: "link",
      label: "Notifications",
      icon: "solar:letter-bold-duotone",
      iconWidth: 24,
      href: "#",
      badge: "32+",
    },
    {
      type: "link",
      label: "AI Assistant",
      icon: "solar:chat-round-dots-bold-duotone",
      iconWidth: 24,
      href: "#",
    },
    { type: "section", label: "ACCOUNT" },
    {
      type: "link",
      label: "Logout",
      icon: "solar:logout-3-bold-duotone",
      iconWidth: 24,
      href: "sign-in.html",
    },
  ];

  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR MENU — CHỈ MY CARDS & CRYPTO CARD MANAGEMENT
  // Trang dùng menu này: set window.SIDEBAR_USE_CARDS_MENU = true trước khi load global.js
  // hoặc thêm <script>window.SIDEBAR_USE_CARDS_MENU = true;</script> trước global.js
  // ═══════════════════════════════════════════════════════════════════════════
  const SIDEBAR_MENU_CARDS = [
    { type: "section", label: "" },
    {
      type: "group",
      label: "Gift Card Center",
      icon: "solar:folder-with-files-bold-duotone",
      iconWidth: 26,
      children: [
        {
          label: "My Cards",
          href: "my-cards.html",
          relatedPages: [
            "order-details.html",
            "order-history.html",
            "crypto-card-details-owner.html",
            "issue-digital-membership-detail-owner.html",
          ],
        },
        { label: "VlinkPay Store", href: "digital-gifts-management.html" },
        { label: "Merchant Map", href: "#" },
        // { label: "Merchant Portal", href: "index.html" },
      ],
    },
    {
      type: "link",
      label: "Crypto Card Management",
      icon: "solar:wallet-bold-duotone",
      iconWidth: 24,
      href: "crypto-card-list.html?role=personal",
      relatedPages: [
        "crypto-card-details.html",
        "crypto-card-list-bootstrap.html",
        "issue-crypto-card.html",
        "issue-digital.html",
      ],
    },
  ];

  // ═══════════════════════════════════════════════════════════════════════════
  // SVG ICONS
  // ═══════════════════════════════════════════════════════════════════════════
  const HAMBURGER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="3" y1="6"  x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>`;

  const CHEVRON_SVG = `<span class="chevron-toggle"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
    viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 10l5 5 5-5z"/>
  </svg></span>`;

  // ═══════════════════════════════════════════════════════════════════════════
  // INIT
  // ═══════════════════════════════════════════════════════════════════════════
  document.addEventListener("DOMContentLoaded", function () {
    applyLayoutModes();
    applyThemeMode();
    if (!isViaCardStandaloneMode()) {
      renderSidebarNav();
      updateSidebarUserRole();
      initSubmenus();
      injectHamburger();
      injectMobileLogo();
      injectOverlay();
      bindNavLinks();
      bindKeyboard();
      handleResize();
      window.addEventListener("resize", handleResize);
    }
    initDatePlaceholders();
  });

  function isViaCardStandaloneMode() {
    const params = new URLSearchParams(window.location.search);
    return params.get("via") === "card";
  }

  function applyLayoutModes() {
    const params = new URLSearchParams(window.location.search);

    if (params.get("mode") === "public") {
      document.body.classList.add("mode-public");
    }

    if (isViaCardStandaloneMode()) {
      document.body.classList.add("mode-via-card");
    }
  }

  function applyThemeMode() {
    const role = (new URLSearchParams(window.location.search).get("role") || "")
      .toLowerCase()
      .trim();
    const isPersonal = role === "personal" || !!window.SIDEBAR_USE_CARDS_MENU;

    document.documentElement.classList.toggle("style-personal", isPersonal);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER SIDEBAR NAV FROM DATA
  // ═══════════════════════════════════════════════════════════════════════════
  function renderSidebarNav() {
    const sc = document.querySelector(".sidebar-content");
    if (!sc) return;

    // Determine the current page filename
    // Pages can override this by setting: window.SIDEBAR_ACTIVE_PAGE = 'some-page.html'
    const curPage = (
      (window.SIDEBAR_ACTIVE_PAGE ||
        window.location.pathname.split("/").pop() ||
        "index.html") + ""
    )
      .toLowerCase()
      .split("?")[0]
      .split("#")[0];

    // Helper: check if a menu item or any of its relatedPages/children matches current page
    function isItemActive(item) {
      const raw = (item.href || "").split("/").pop().toLowerCase();
      const hrefPage = raw.split("?")[0].split("#")[0];
      if (hrefPage === curPage) return true;
      if (
        item.relatedPages &&
        item.relatedPages.some(
          (p) =>
            (p || "").toLowerCase().split("?")[0].split("#")[0] === curPage,
        )
      )
        return true;
      if (item.children && item.children.some((c) => isItemActive(c)))
        return true;
      return false;
    }

    function resolvePortalHref(href) {
      if (!href || href === "#") return "#";
      try {
        return new URL(href, PORTAL_BASE_URL).href;
      } catch (error) {
        return href;
      }
    }

    function getGroupHref(item) {
      if (item.href && item.href !== "#") return item.href;
      const firstChild = (item.children || []).find(
        (child) => child.href && child.href !== "#",
      );
      return firstChild ? firstChild.href : "#";
    }

    // Remove all nav-related nodes that were previously in the sidebar HTML
    // (everything from the first .nav-section-title onwards)
    const firstSection = sc.querySelector(".nav-section-title");
    if (firstSection) {
      let node = firstSection;
      while (node) {
        const next = node.nextSibling;
        node.remove();
        node = next;
      }
    }

    // Chọn menu: nếu trang set SIDEBAR_USE_CARDS_MENU thì dùng menu rút gọn (chỉ My Cards + Crypto)
    const menu = window.SIDEBAR_USE_CARDS_MENU
      ? SIDEBAR_MENU_CARDS
      : SIDEBAR_MENU;
    let html = "";
    for (const item of menu) {
      if (item.type === "section") {
        html += `<div class="nav-section-title">${item.label}</div>\n`;
      } else if (item.type === "link") {
        const active = isItemActive(item);
        const badge = item.badge
          ? `<span class="badge-outlined">${item.badge}</span>`
          : "";
        html += `<a href="${resolvePortalHref(item.href)}" class="nav-item${active ? " active" : ""}">
          <div class="nav-icon"><iconify-icon icon="${item.icon}" width="${item.iconWidth || 24}"></iconify-icon></div>
          <span>${item.label}</span>${badge}
        </a>\n`;
      } else if (item.type === "group") {
        // Check if any child (or their relatedPages) matches current page
        const activeChild = (item.children || []).find((c) => isItemActive(c));
        const parentCls = activeChild ? " parent-active" : "";
        const groupHref = getGroupHref(item);

        html += `<a href="${resolvePortalHref(groupHref)}" class="nav-item${parentCls}">
          <div class="nav-icon"><iconify-icon icon="${item.icon}" width="${item.iconWidth || 24}"></iconify-icon></div>
          <span>${item.label}</span>${CHEVRON_SVG}
        </a>
        <div class="submenu">\n`;

        for (const child of item.children || []) {
          if (child.children && child.children.length) {
            const activeSubChild = child.children.find((sc) =>
              isItemActive(sc),
            );
            const subGroupCls = activeSubChild ? " sub-group-active" : "";
            html += `  <div class="sub-group${subGroupCls}">
              <div class="sub-group-header"><span class="dot"></span>${child.label}</div>
              <div class="sub-submenu">`;
            for (const subChild of child.children) {
              const subActive = isItemActive(subChild);
              html += `<a href="${resolvePortalHref(subChild.href)}" class="sub-sub-item${subActive ? " active" : ""}"><span class="dot"></span>${subChild.label}</a>`;
            }
            html += `</div></div>\n`;
          } else {
            const childActive = isItemActive(child);
            html += `  <a href="${resolvePortalHref(child.href)}" class="sub-item${childActive ? " active" : ""}">
              <span class="dot"></span>${child.label}
            </a>\n`;
          }
        }
        html += `</div>\n`;
      }
    }

    sc.insertAdjacentHTML("beforeend", html);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR USER ROLE LABEL: Personal (SIDEBAR_MENU_CARDS) / Merchant (SIDEBAR_MENU)
  // ═══════════════════════════════════════════════════════════════════════════
  function updateSidebarUserRole() {
    const userInfo = document.querySelector(".sidebar .user-info");
    if (!userInfo) return;
    const roleDiv = userInfo.querySelector("div:last-child");
    if (!roleDiv) return;
    roleDiv.textContent = window.SIDEBAR_USE_CARDS_MENU
      ? "Personal"
      : "Merchant";
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // HAMBURGER BUTTON
  // ═══════════════════════════════════════════════════════════════════════════
  function injectHamburger() {
    const existing = document.getElementById("hamburgerBtn");
    if (existing) {
      existing.addEventListener("click", toggleSidebar);
      return;
    }
    const header = document.querySelector(".top-header");
    if (!header) return;

    const btn = document.createElement("button");
    btn.id = "hamburgerBtn";
    btn.className = "hamburger-btn";
    btn.setAttribute("aria-label", "Toggle navigation");
    btn.setAttribute("type", "button");
    btn.innerHTML = HAMBURGER_SVG;
    btn.addEventListener("click", toggleSidebar);
    header.insertBefore(btn, header.firstChild);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MOBILE LOGO
  // ═══════════════════════════════════════════════════════════════════════════
  function injectMobileLogo() {
    const header = document.querySelector(".top-header");
    if (!header || document.getElementById("mobileLogo")) return;

    const logo = document.createElement("img");
    logo.id = "mobileLogo";
    logo.className = "mobile-logo";
    logo.src =
      "https://staging-web-app.vlinkpay.com/assets/images/logoVlink.png";
    logo.alt = "VLINKPAY";

    const hamburger = document.getElementById("hamburgerBtn");
    if (hamburger) {
      const parent = hamburger.parentNode;
      // If hamburger is inside the header (directly or via wrapper), insert logo right after it
      if (parent && parent.contains(hamburger)) {
        parent.insertBefore(logo, hamburger.nextSibling);
        return;
      }
    }
    // Fallback: append at the end of the header
    header.appendChild(logo);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR OVERLAY
  // ═══════════════════════════════════════════════════════════════════════════
  function injectOverlay() {
    if (document.getElementById("sidebarOverlay")) return;
    const overlay = document.createElement("div");
    overlay.id = "sidebarOverlay";
    overlay.className = "sidebar-overlay";
    overlay.addEventListener("click", closeSidebar);
    document.body.appendChild(overlay);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR TOGGLE / RESPONSIVE
  // ═══════════════════════════════════════════════════════════════════════════
  function initSubmenus() {
    const sidebar = document.querySelector(".sidebar");
    if (!sidebar) return;
    sidebar.querySelectorAll("a.nav-item").forEach(function (navItem) {
      const submenu = navItem.nextElementSibling;
      if (!submenu || !submenu.classList.contains("submenu")) return;
      if (!navItem.classList.contains("parent-active")) {
        navItem.classList.add("collapsed");
      }
    });
  }

  function bindNavLinks() {
    const sidebar = document.querySelector(".sidebar");
    if (!sidebar) return;
    sidebar.addEventListener("click", function (e) {
      const navItem = e.target.closest("a.nav-item");
      if (navItem) {
        const submenu = navItem.nextElementSibling;
        if (submenu && submenu.classList.contains("submenu")) {
          e.preventDefault();
          navItem.classList.toggle("collapsed");
          return;
        }
      }
      const link = e.target.closest("a.nav-item, a.sub-item");
      if (link && window.innerWidth < 1024) closeSidebar();
    });
  }

  function bindKeyboard() {
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeSidebar();
    });
  }

  function handleResize() {
    if (window.innerWidth >= 1024) closeSidebar();
  }

  function toggleSidebar() {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar && sidebar.classList.contains("open")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  function openSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    if (sidebar) sidebar.classList.add("open");
    if (overlay) overlay.classList.add("open");
    document.body.classList.add("sidebar-open");
  }

  function closeSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    if (sidebar) sidebar.classList.remove("open");
    if (overlay) overlay.classList.remove("open");
    document.body.classList.remove("sidebar-open");
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // DATE INPUT "PICK A DATE" PLACEHOLDER
  // ═══════════════════════════════════════════════════════════════════════════
  function initDatePlaceholders() {
    document
      .querySelectorAll('input[type="date"].field-input')
      .forEach(function (inp) {
        // Inject placeholder span once
        var fc = inp.closest(".field-container");
        if (fc && !fc.querySelector(".date-ph")) {
          var ph = document.createElement("span");
          ph.className = "date-ph";
          ph.textContent = "Pick a date";
          fc.appendChild(ph);
        }

        // Sync data-empty attribute so CSS can react
        function sync() {
          if (inp.value) {
            inp.removeAttribute("data-empty");
          } else {
            inp.setAttribute("data-empty", "");
          }
        }

        inp.addEventListener("change", sync);
        inp.addEventListener("input", sync);
        sync(); // run on init
      });
  }

  // Also expose so pages that inject date inputs dynamically can re-init
  window.initDatePlaceholders = initDatePlaceholders;

  // ═══════════════════════════════════════════════════════════════════════════
  // SHARED DATE FORMATTERS  ← use across all pages
  //   fmtDate('2026-01-15')              → "Jan 15, 2026"
  //   fmtDateTime('2026-01-15T14:20:05') → "Jan 15, 2026 02:20 PM"
  //   fmtDateTime('2026-01-15 09:30 AM') → "Jan 15, 2026 09:30 AM"
  // ═══════════════════════════════════════════════════════════════════════════
  function fmtDate(iso) {
    if (!iso || iso === "—" || iso === "-") return "—";
    try {
      const d = new Date(String(iso).length === 10 ? iso + "T00:00:00" : iso);
      if (isNaN(d)) return iso;
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    } catch (e) {
      return iso;
    }
  }

  function fmtDateTime(iso) {
    if (!iso || iso === "—" || iso === "-") return "—";
    try {
      // Normalise 24h strings like "2026-01-15 14:20:05" → ISO
      const normalised = String(iso).replace(" ", "T");
      const d = new Date(normalised);
      if (isNaN(d)) return iso;
      const date = d.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
      const time = d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return date + " " + time;
    } catch (e) {
      return iso;
    }
  }

  window.fmtDate = fmtDate;
  window.fmtDateTime = fmtDateTime;

  // ═══════════════════════════════════════════════════════════════════════════
  // COPY TO CLIPBOARD + TOAST
  // ═══════════════════════════════════════════════════════════════════════════
  var _toastTimer = null;

  function showCopyToast(label) {
    label = label || "Copied to clipboard!";
    var toast = document.getElementById("copy-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "copy-toast";
      toast.innerHTML =
        '<span class="toast-check"><svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg></span>' +
        '<span id="copy-toast-msg"></span>';
      document.body.appendChild(toast);
    }
    document.getElementById("copy-toast-msg").textContent = label;
    toast.classList.add("show");
    if (_toastTimer) clearTimeout(_toastTimer);
    _toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 2200);
  }

  function copyToClipboard(text, label) {
    text = String(text || "").trim();
    if (!text) return;
    var msg = label || "Copied to clipboard!";
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(function () {
          showCopyToast(msg);
        })
        .catch(function () {
          _fallbackCopy(text, msg);
        });
    } else {
      _fallbackCopy(text, msg);
    }
  }

  function _fallbackCopy(text, msg) {
    var el = document.createElement("textarea");
    el.value = text;
    el.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0";
    document.body.appendChild(el);
    el.focus();
    el.select();
    try {
      document.execCommand("copy");
      showCopyToast(msg);
    } catch (e) {}
    document.body.removeChild(el);
  }

  window.showCopyToast = showCopyToast;
  window.copyToClipboard = copyToClipboard;

  /**
   * HTML for the "Fees Overview" tippy popover (Platform + Transfer fees).
   * Use with tippy: { content: getFeesOverviewPopoverHtml(), allowHTML: true, ... }
   */
  function getFeesOverviewPopoverHtml() {
    return (
      '<div class="fees-overview-popover">' +
      '<div class="fees-overview-header">Fees Overview <button type="button" class="fees-overview-close" aria-label="Close"><iconify-icon icon="eva:close-fill" width="18"></iconify-icon></button></div>' +
      '<div class="fees-overview-body">' +
      '<div class="fees-overview-section"><div class="fees-overview-icon green"><iconify-icon icon="eva:checkmark-fill" width="14"></iconify-icon></div>' +
      '<div class="fees-overview-content"><div class="fees-overview-title">Platform Fee <span class="fees-overview-pill free">Free</span></div></div></div>' +
      '<div class="fees-overview-divider"></div>' +
      '<div class="fees-overview-section"><div class="fees-overview-icon blue"><iconify-icon icon="eva:swap-fill" width="14"></iconify-icon></div>' +
      '<div class="fees-overview-content"><div class="fees-overview-title">Transfer fee</div>' +
      '<div class="fees-overview-sublist">' +
      '<div>Accounts with a <span class="fees-overview-pill membership">AI Annual</span></div>' +
      '<div style="padding: 12px; background-color: #F8F9FA;border-radius: 12px; "><span style="display: flex; flex-direction:row; justify-content: space-between;">Below $25 (per card): <strong>1.5% fee</strong></span><div class="note">The fee is deducted from USDV. If insufficient, it will be deducted from the reloaded crypto.</div></div>' +
      '<div style="padding: 12px; background-color: #F8F9FA;border-radius: 12px; display: flex; flex-direction:row; justify-content: space-between;">$25 and above (per card): <span class="fees-overview-pill free">Free</span></div>' +
      '<div style="margin-top:8px;">Accounts with a <span class="fees-overview-pill franchise">Franchise Plan</span></div>' +
      '<div style="padding: 12px; background-color: #F8F9FA;border-radius: 12px; display: flex; flex-direction:row; justify-content: space-between;">All transfers: <span class="fees-overview-pill free">Free</span></div>' +
      "</div></div></div></div></div>"
    );
  }

  window.getFeesOverviewPopoverHtml = getFeesOverviewPopoverHtml;

  // Expose to global scope
  window.toggleSidebar = toggleSidebar;
  window.closeSidebar = closeSidebar;

  (function () {
    const params = new URLSearchParams(window.location.search);
    if (params.get("mode") === "public") {
      const gridInfo = document.querySelector(".grid-info");
      const actionButtons = document.querySelector(".action-buttons");

      if (actionButtons) actionButtons.style.display = "none";
      if (gridInfo) gridInfo.style.display = "none";
    }
  })();
})();
