/**
 * global.js — Shared layout logic for VLINKPAY merchant portal
 * Handles: sidebar toggle, hamburger injection, overlay, responsive behavior
 */

(function () {
  'use strict';

  // ─── SVG Icons (inline, no dependency on icon library) ───────────────────
  const HAMBURGER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="3" y1="6"  x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>`;

  // ─── Init on DOM ready ────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    injectHamburger();
    injectMobileLogo();
    injectOverlay();
    bindNavLinks();
    bindKeyboard();
    handleResize();
    window.addEventListener('resize', handleResize);
  });

  // ─── Inject hamburger button into .top-header ─────────────────────────────
  function injectHamburger() {
    const header = document.querySelector('.top-header');
    if (!header || document.getElementById('hamburgerBtn')) return;

    const btn = document.createElement('button');
    btn.id = 'hamburgerBtn';
    btn.className = 'hamburger-btn';
    btn.setAttribute('aria-label', 'Toggle navigation');
    btn.setAttribute('type', 'button');
    btn.innerHTML = HAMBURGER_SVG;
    btn.addEventListener('click', toggleSidebar);

    // Insert as first child of header
    header.insertBefore(btn, header.firstChild);
  }

  // ─── Inject mobile logo in header (visible only on mobile) ──────────────
  function injectMobileLogo() {
    const header = document.querySelector('.top-header');
    if (!header || document.getElementById('mobileLogo')) return;

    const logo = document.createElement('span');
    logo.id = 'mobileLogo';
    logo.className = 'mobile-logo';
    logo.textContent = 'VLINKPAY';

    // Insert after hamburger button (second child position)
    const hamburger = document.getElementById('hamburgerBtn');
    if (hamburger && hamburger.nextSibling) {
      header.insertBefore(logo, hamburger.nextSibling);
    } else {
      header.appendChild(logo);
    }
  }

  // ─── Inject sidebar overlay ───────────────────────────────────────────────
  function injectOverlay() {
    if (document.getElementById('sidebarOverlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'sidebarOverlay';
    overlay.className = 'sidebar-overlay';
    overlay.addEventListener('click', closeSidebar);
    document.body.appendChild(overlay);
  }

  // ─── Close sidebar when clicking a nav/sub link on mobile/tablet ──────────
  function bindNavLinks() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    sidebar.addEventListener('click', function (e) {
      const link = e.target.closest('a.nav-item, a.sub-item');
      if (link && window.innerWidth < 1024) {
        closeSidebar();
      }
    });
  }

  // ─── ESC key closes sidebar ───────────────────────────────────────────────
  function bindKeyboard() {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSidebar();
    });
  }

  // ─── Auto-close if resized back to desktop ────────────────────────────────
  function handleResize() {
    if (window.innerWidth >= 1024) {
      closeSidebar();
    }
  }

  // ─── Toggle sidebar open/close ────────────────────────────────────────────
  function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const isOpen = sidebar && sidebar.classList.contains('open');
    if (isOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  function openSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.classList.add('sidebar-open');
  }

  function closeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.classList.remove('sidebar-open');
  }

  // ─── Expose to global scope for inline onclick usage if needed ────────────
  window.toggleSidebar = toggleSidebar;
  window.closeSidebar = closeSidebar;
})();
