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
      desc: "Tổng quan hoạt động kinh doanh",
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
          desc: "Store issue - bán cho khách hàng trực tiếp",
          relatedPages: ["issue-digital.html"],
          excludeQuery: "type=membership",
        },

        {
          label: "Membership Card",
          href: "issue-digital.html?type=membership",
          desc: "Phát hành thẻ membership cho khách hàng",
          relatedPages: [],
          requireQuery: "type=membership",
        },

        {
          label: "Quick Setup",
          href: "issue-card.html",
          desc: "Tạo gift card voucher bán online",
          relatedPages: ["issue-card.html"],
        },

        {
          label: "Advanced Setup",
          href: "",
          desc: "Tạo card bán online, tạo được nhiều loại 1 lúc",
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
          desc: "Quản lý danh mục gift card & voucher",
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
          desc: "Danh sách sản phẩm đã huỷ",
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
          label: "Marketing Tools",
          href: "marketing-tools.html",
          desc: "Quản lý chiến dịch quảng cáo & khuyến mãi",
          relatedPages: ["marketing-edit.html", "marketing-details.html", "marketing-create.html"],
        },
        {
          label: "AI Ads",
          href: "ai-ads.html",
          desc: "Tạo banner quảng cáo bằng AI",
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
          desc: "Nhận thanh toán bằng gift card",
          relatedPages: ["gift-card-payment-box.html"],
        },
        {
          label: "Pay with Crypto",
          href: "crypto-payment.html",
          desc: "Nhận thanh toán bằng tiền điện tử",
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
          desc: "Cài đặt phương thức thanh toán cho cửa hàng",
        },
        {
          label: "Benefits Setup",
          href: "benefits-setup.html",
          desc: "Quản lý gói thành viên & đặc quyền",
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
          desc: "Danh sách đơn hàng bán gift card & voucher",
          relatedPages: ["sales-order-details.html"],
        },
        {
          label: "Redeem History",
          href: "card-transaction-history-merchant.html",
          desc: "Lịch sử đổi thẻ tại cửa hàng",
          relatedPages: ["card-transaction-history.html"],
        },
        {
          label: "Membership Report",
          href: "membership-report.html",
          desc: "Báo cáo chương trình thành viên",
        },
      ],
    },

    // ── APPS ──────────────────────────────────────────────────────────────────
    {
      type: "link",
      label: "Hỗ trợ",
      icon: "solar:chat-round-dots-bold-duotone",
      iconWidth: 24,
      href: "#",
      action: "support-chat",
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

  const CHEVRON_SVG = `<span class="chevron-toggle"><iconify-icon icon="solar:alt-arrow-down-linear" width="16" height="16"></iconify-icon></span>`;

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
    renderPageHeader();
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
  // RENDER PAGE HEADER: remove breadcrumbs, inject description from SIDEBAR_MENU
  // ═══════════════════════════════════════════════════════════════════════════
  function renderPageHeader() {
    // Build flat map: filename → { label, desc, pageAction }
    const pageMap = {};
    function collectItem(item) {
      const normalize = (s) => (s || "").split("/").pop().split("?")[0].split("#")[0].toLowerCase();
      if (item.href && item.href !== "#" && item.href !== "") {
        const key = normalize(item.href);
        if (key && !pageMap[key]) pageMap[key] = { label: item.label, desc: item.desc || "", pageAction: item.pageAction || null };
      }
      (item.relatedPages || []).forEach(function (rp) {
        const key = normalize(rp);
        if (key && !pageMap[key]) pageMap[key] = { label: item.label, desc: item.desc || "", pageAction: item.pageAction || null };
      });
      (item.children || []).forEach(collectItem);
    }
    SIDEBAR_MENU.forEach(collectItem);

    const curPage = (
      (window.SIDEBAR_ACTIVE_PAGE || window.location.pathname.split("/").pop() || "index.html") + ""
    ).toLowerCase().split("?")[0].split("#")[0];

    const data = pageMap[curPage];
    if (!data) return;

    // Remove all breadcrumbs on this page
    document.querySelectorAll(".breadcrumbs").forEach(function (el) { el.remove(); });

    // Inject or update page-description
    if (!data.desc) return;

    // Re-use existing [data-global-desc] element if already injected
    let descEl = document.querySelector(".page-description[data-global-desc]");
    if (descEl) { descEl.textContent = data.desc; return; }

    // If a manually-added .page-description already exists, leave it (page owns it)
    if (document.querySelector(".page-description")) return;

    // Find h1.page-title and determine insertion point
    const titleEl = document.querySelector("h1.page-title, .page-title");
    if (!titleEl) return;

    descEl = document.createElement("p");
    descEl.className = "page-description";
    descEl.setAttribute("data-global-desc", "1");
    descEl.style.margin = "0";
    descEl.textContent = data.desc;

    const parent = titleEl.parentElement;
    const pageHeader = parent.closest(".page-header") || (parent.classList.contains("page-header") ? parent : null);

    if (pageHeader && parent === pageHeader) {
      // h1 is a direct flex child of page-header → insert description after page-header
      descEl.style.margin = "0 0 16px";
      pageHeader.insertAdjacentElement("afterend", descEl);
    } else {
      // h1 is inside a child div → insert after h1 within that container
      titleEl.insertAdjacentElement("afterend", descEl);
    }
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

    const curQuery = window.location.search.slice(1).toLowerCase();

    // Helper: check if a menu item or any of its relatedPages/children matches current page
    function isItemActive(item) {
      const raw = (item.href || "").split("/").pop().toLowerCase();
      const hrefPage = raw.split("?")[0].split("#")[0];
      if (hrefPage === curPage) {
        // If item requires a specific query param, verify it matches
        if (item.requireQuery) {
          if (curQuery !== item.requireQuery.toLowerCase()) return false;
        }
        // If item excludes a specific query param, skip when that query is active
        if (item.excludeQuery) {
          if (curQuery === item.excludeQuery.toLowerCase()) return false;
        }
        return true;
      }
      if (
        item.relatedPages &&
        item.relatedPages.some(
          (p) =>
            (p || "").toLowerCase().split("?")[0].split("#")[0] === curPage,
        )
      ) {
        if (item.excludeQuery && curQuery === item.excludeQuery.toLowerCase())
          return false;
        return true;
      }
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
        const actionAttr = item.action ? ` data-action="${item.action}"` : "";
        html += `<a href="${resolvePortalHref(item.href)}" class="nav-item${active ? " active" : ""}"${actionAttr}>
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
        if (navItem.dataset.action === "support-chat") {
          e.preventDefault();
          window.openGlobalSupportChat();
          if (window.innerWidth < 1024) closeSidebar();
          return;
        }
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

  // ── SUPPORT CHAT PANEL ───────────────────────────────────────────────────────
  function _buildSupportChatHTML() {
    const el = document.createElement("div");
    el.id = "gs-support-chat";
    el.style.cssText =
      "position:fixed;bottom:24px;right:24px;z-index:9999;display:none;flex-direction:column;" +
      "width:360px;max-width:calc(100vw - 2rem);height:520px;max-height:calc(100vh - 6rem);" +
      "background:#fff;border-radius:24px;box-shadow:0 24px 48px -8px rgba(0,0,0,0.2),0 0 0 1px rgba(0,0,0,0.06);" +
      "overflow:hidden;font-family:Poppins,sans-serif;font-size:14px;";
    el.innerHTML = `
      <div style="background:linear-gradient(135deg,#00a76f,#007867);padding:16px 20px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <iconify-icon icon="solar:headphones-round-bold-duotone" width="18" style="color:#fff;"></iconify-icon>
          </div>
          <div>
            <p style="color:#fff;font-weight:700;font-size:14px;margin:0;">Hỗ trợ trực tuyến</p>
            <div style="display:flex;align-items:center;gap:6px;margin-top:3px;">
              <span style="width:6px;height:6px;border-radius:50%;background:#a7f3d0;display:inline-block;animation:gsChatPulse 1.5s ease-in-out infinite;"></span>
              <span style="color:rgba(255,255,255,0.75);font-size:11px;">Đang hoạt động</span>
            </div>
          </div>
        </div>
        <button onclick="window.closeGlobalSupportChat()" style="width:32px;height:32px;border-radius:50%;background:transparent;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.85);flex-shrink:0;" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='transparent'">
          <iconify-icon icon="eva:close-fill" width="20"></iconify-icon>
        </button>
      </div>
      <div id="gs-chat-messages" style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:#f8fafc;">
        <div style="display:flex;align-items:flex-end;gap:8px;">
          <div style="width:28px;height:28px;border-radius:50%;background:rgba(0,167,111,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <iconify-icon icon="solar:bot-bold-duotone" width="14" style="color:#00a76f;"></iconify-icon>
          </div>
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;border-bottom-left-radius:4px;padding:10px 14px;max-width:85%;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <p style="font-size:13px;color:#374151;margin:0;">Xin chào! Tôi là trợ lý hỗ trợ của <strong>VLINKPAY</strong>. Chọn câu hỏi bên dưới hoặc nhập trực tiếp để được hỗ trợ. 👋</p>
            <span style="font-size:10px;color:#9ca3af;margin-top:4px;display:block;">Vừa xong</span>
          </div>
        </div>
        <div style="padding-left:36px;display:flex;flex-direction:column;gap:8px;">
          <p style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.06em;margin:0;">📋 Hướng dẫn sử dụng</p>
          <div style="display:flex;flex-wrap:wrap;gap:5px;">
            <button onclick="window.gsQuickQuestion(this)" style="font-size:11px;background:#fff;border:1px solid rgba(0,167,111,0.3);color:#00a76f;padding:5px 11px;border-radius:999px;cursor:pointer;line-height:1.4;" onmouseover="this.style.background='rgba(0,167,111,0.06)'" onmouseout="this.style.background='#fff'">Cách tạo Gift Card?</button>
            <button onclick="window.gsQuickQuestion(this)" style="font-size:11px;background:#fff;border:1px solid rgba(0,167,111,0.3);color:#00a76f;padding:5px 11px;border-radius:999px;cursor:pointer;line-height:1.4;" onmouseover="this.style.background='rgba(0,167,111,0.06)'" onmouseout="this.style.background='#fff'">Cách dùng AI Ads?</button>
            <button onclick="window.gsQuickQuestion(this)" style="font-size:11px;background:#fff;border:1px solid rgba(0,167,111,0.3);color:#00a76f;padding:5px 11px;border-radius:999px;cursor:pointer;line-height:1.4;" onmouseover="this.style.background='rgba(0,167,111,0.06)'" onmouseout="this.style.background='#fff'">Cách tạo chiến dịch marketing?</button>
            <button onclick="window.gsQuickQuestion(this)" style="font-size:11px;background:#fff;border:1px solid rgba(0,167,111,0.3);color:#00a76f;padding:5px 11px;border-radius:999px;cursor:pointer;line-height:1.4;" onmouseover="this.style.background='rgba(0,167,111,0.06)'" onmouseout="this.style.background='#fff'">Cách gửi duyệt banner?</button>
            <button onclick="window.gsQuickQuestion(this)" style="font-size:11px;background:#fff;border:1px solid rgba(0,167,111,0.3);color:#00a76f;padding:5px 11px;border-radius:999px;cursor:pointer;line-height:1.4;" onmouseover="this.style.background='rgba(0,167,111,0.06)'" onmouseout="this.style.background='#fff'">Cách nạp Crypto?</button>
            <button onclick="window.gsQuickQuestion(this)" style="font-size:11px;background:#fff;border:1px solid rgba(0,167,111,0.3);color:#00a76f;padding:5px 11px;border-radius:999px;cursor:pointer;line-height:1.4;" onmouseover="this.style.background='rgba(0,167,111,0.06)'" onmouseout="this.style.background='#fff'">Cách xuất báo cáo?</button>
            <button onclick="window.gsQuickQuestion(this)" style="font-size:11px;background:#fff;border:1px solid rgba(0,167,111,0.3);color:#00a76f;padding:5px 11px;border-radius:999px;cursor:pointer;line-height:1.4;" onmouseover="this.style.background='rgba(0,167,111,0.06)'" onmouseout="this.style.background='#fff'">Cách quản lý thành viên?</button>
          </div>
          <p style="font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.06em;margin:4px 0 0;">⚙️ Tài khoản & Hỗ trợ</p>
          <div style="display:flex;flex-wrap:wrap;gap:5px;">
            <button onclick="window.gsQuickQuestion(this)" style="font-size:11px;background:#fff;border:1px solid rgba(0,167,111,0.3);color:#00a76f;padding:5px 11px;border-radius:999px;cursor:pointer;line-height:1.4;" onmouseover="this.style.background='rgba(0,167,111,0.06)'" onmouseout="this.style.background='#fff'">Xem lịch sử giao dịch?</button>
            <button onclick="window.gsQuickQuestion(this)" style="font-size:11px;background:#fff;border:1px solid rgba(0,167,111,0.3);color:#00a76f;padding:5px 11px;border-radius:999px;cursor:pointer;line-height:1.4;" onmouseover="this.style.background='rgba(0,167,111,0.06)'" onmouseout="this.style.background='#fff'">Thông tin tài khoản?</button>
            <button onclick="window.gsQuickQuestion(this)" style="font-size:11px;background:#fff;border:1px solid rgba(0,167,111,0.3);color:#00a76f;padding:5px 11px;border-radius:999px;cursor:pointer;line-height:1.4;" onmouseover="this.style.background='rgba(0,167,111,0.06)'" onmouseout="this.style.background='#fff'">Báo lỗi hệ thống?</button>
            <button onclick="window.gsQuickQuestion(this)" style="font-size:11px;background:#fff;border:1px solid rgba(0,167,111,0.3);color:#00a76f;padding:5px 11px;border-radius:999px;cursor:pointer;line-height:1.4;" onmouseover="this.style.background='rgba(0,167,111,0.06)'" onmouseout="this.style.background='#fff'">Liên hệ kỹ thuật?</button>
          </div>
        </div>
      </div>
      <div style="padding:10px 14px;border-top:1px solid #e2e8f0;background:#fff;display:flex;align-items:center;gap:8px;flex-shrink:0;">
        <input id="gs-chat-input" type="text" placeholder="Nhập câu hỏi..." onkeydown="if(event.key==='Enter')window.gsSendMessage()"
          style="flex:1;background:#f8fafc;font-family:Poppins,sans-serif;font-size:13px;color:#1e293b;padding:9px 14px;border-radius:12px;border:1px solid #e2e8f0;outline:none;"
          onfocus="this.style.borderColor='#00a76f'" onblur="this.style.borderColor='#e2e8f0'">
        <button onclick="window.gsSendMessage()" style="width:34px;height:34px;border-radius:10px;background:#00a76f;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;flex-shrink:0;">
          <iconify-icon icon="solar:arrow-up-bold" width="16"></iconify-icon>
        </button>
      </div>
      <style>@keyframes gsChatPulse{0%,100%{opacity:1}50%{opacity:0.4}}</style>
    `;
    return el;
  }

  function openGlobalSupportChat() {
    let panel = document.getElementById("gs-support-chat");
    if (!panel) {
      panel = _buildSupportChatHTML();
      document.body.appendChild(panel);
    }
    panel.style.display = "flex";
    const input = panel.querySelector("#gs-chat-input");
    if (input) setTimeout(() => input.focus(), 50);
  }

  function closeGlobalSupportChat() {
    const panel = document.getElementById("gs-support-chat");
    if (panel) panel.style.display = "none";
  }

  const GS_ANSWERS = {
    "Cách tạo Gift Card?": "Để tạo Gift Card, vào menu <strong>Gift Card Center → Issue Digital</strong> hoặc chọn <strong>Create Gift Card</strong>. Điền thông tin mệnh giá, ngày hết hạn và thiết kế, sau đó nhấn <em>Publish</em> để phát hành.",
    "Cách dùng AI Ads?": "Vào <strong>Marketing Tools → AI Ads</strong>. Tại đây bạn có thể tạo banner bằng AI (nhập prompt mô tả) hoặc tải banner có sẵn lên. Sau khi chọn banner, điền thông tin chiến dịch và nhấn <em>Gửi duyệt</em>.",
    "Cách tạo chiến dịch marketing?": "Vào <strong>Marketing Tools → Spin Wheel</strong>, nhấn nút <em>Create</em> ở góc phải. Chọn loại chiến dịch, cấu hình phần thưởng, ngày chạy, rồi lưu và kích hoạt.",
    "Cách gửi duyệt banner?": "Trong màn hình <strong>AI Ads → Manage Banner</strong>, chọn banner ở trạng thái Draft rồi nhấn <em>Gửi duyệt</em>. Banner sẽ chuyển sang trạng thái <em>Pending Review</em> và được xét duyệt trong 1–2 ngày làm việc.",
    "Cách nạp Crypto?": "Vào <strong>Crypto</strong> trên menu, chọn loại coin muốn nạp rồi sao chép địa chỉ ví. Chuyển crypto từ ví ngoài vào địa chỉ đó. Số dư sẽ cập nhật sau khi giao dịch được xác nhận trên blockchain.",
    "Cách xuất báo cáo?": "Vào mục <strong>Report</strong> trên menu. Chọn loại báo cáo (Gift Card, Transaction, Membership…), đặt khoảng thời gian, rồi nhấn <em>Export CSV</em> hoặc <em>Export PDF</em>.",
    "Cách quản lý thành viên?": "Vào <strong>Membership</strong> trên menu. Tại đây bạn xem danh sách thành viên, tìm kiếm theo tên/ID, điều chỉnh hạng mức hoặc gia hạn gói thành viên cho từng tài khoản.",
    "Xem lịch sử giao dịch?": "Vào <strong>Report → Transaction History</strong> để xem toàn bộ lịch sử. Bạn có thể lọc theo ngày, loại giao dịch và xuất file báo cáo nếu cần.",
    "Thông tin tài khoản?": "Vào <strong>Account Settings</strong> ở cuối sidebar để xem và cập nhật thông tin cá nhân, đổi mật khẩu, cấu hình bảo mật 2 lớp (2FA).",
    "Báo lỗi hệ thống?": "Vui lòng mô tả lỗi bạn gặp phải (màn hình nào, thao tác gì, nội dung thông báo lỗi). Đội kỹ thuật sẽ tiếp nhận và phản hồi trong vòng 4 giờ làm việc.",
    "Liên hệ kỹ thuật?": "Bạn có thể liên hệ đội kỹ thuật qua email <strong>support@vlinkpay.com</strong> hoặc hotline <strong>1800 xxxx</strong> (8:00–18:00, Thứ 2–Thứ 6). Hoặc nhập mô tả vấn đề tại đây, chúng tôi sẽ chuyển tiếp.",
  };

  function gsSendMessage() {
    const input = document.getElementById("gs-chat-input");
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    const messages = document.getElementById("gs-chat-messages");
    if (!messages) return;

    const userMsg = document.createElement("div");
    userMsg.style.cssText = "display:flex;justify-content:flex-end;";
    userMsg.innerHTML =
      `<div style="background:#00a76f;color:#fff;border-radius:16px;border-bottom-right-radius:4px;padding:10px 14px;max-width:80%;font-size:13px;">` +
      text +
      `<span style="font-size:10px;opacity:0.75;margin-top:4px;display:block;text-align:right;">Vừa xong</span></div>`;
    messages.appendChild(userMsg);
    input.value = "";
    messages.scrollTop = messages.scrollHeight;

    const reply = GS_ANSWERS[text] || "Cảm ơn bạn đã liên hệ! Đội ngũ hỗ trợ sẽ phản hồi sớm nhất có thể. Nếu cần hỗ trợ gấp, vui lòng email <strong>support@vlinkpay.com</strong>. 🙏";

    setTimeout(function () {
      const botMsg = document.createElement("div");
      botMsg.style.cssText = "display:flex;align-items:flex-end;gap:8px;";
      botMsg.innerHTML =
        `<div style="width:28px;height:28px;border-radius:50%;background:rgba(0,167,111,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;">` +
        `<iconify-icon icon="solar:bot-bold-duotone" width="14" style="color:#00a76f;"></iconify-icon></div>` +
        `<div style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;border-bottom-left-radius:4px;padding:10px 14px;max-width:85%;box-shadow:0 1px 3px rgba(0,0,0,0.05);">` +
        `<p style="font-size:13px;color:#374151;margin:0;line-height:1.5;">${reply}</p>` +
        `<span style="font-size:10px;color:#9ca3af;margin-top:4px;display:block;">Vừa xong</span></div>`;
      messages.appendChild(botMsg);
      messages.scrollTop = messages.scrollHeight;
      if (window.Iconify) window.Iconify.scan(botMsg);
    }, 700);
  }

  function gsQuickQuestion(btn) {
    const input = document.getElementById("gs-chat-input");
    if (input) { input.value = btn.textContent.trim(); window.gsSendMessage(); }
  }

  // Expose to global scope
  window.openGlobalSupportChat = openGlobalSupportChat;
  window.closeGlobalSupportChat = closeGlobalSupportChat;
  window.gsSendMessage = gsSendMessage;
  window.gsQuickQuestion = gsQuickQuestion;

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
