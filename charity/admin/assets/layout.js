(function renderLayout() {
  const config = window.__PAGE_CONFIG__ || {};
  const sidebarRoot = document.getElementById('sidebar-root');
  const topbarRoot = document.getElementById('topbar-root');

  if (!window.ADMIN_RENDER) return;

  if (sidebarRoot) sidebarRoot.outerHTML = window.ADMIN_RENDER.renderSidebar(config.current);
  if (topbarRoot) topbarRoot.outerHTML = window.ADMIN_RENDER.renderTopbar(config.title || 'Charity Gift Admin', config.meta || '');
})();
