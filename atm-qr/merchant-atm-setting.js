window.addEventListener('DOMContentLoaded', () => {
  const refreshIcons = () => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  };

  refreshIcons();

  const tabs = Array.from(document.querySelectorAll('[data-setting-tab]'));
  const panels = Array.from(document.querySelectorAll('[data-setting-panel]'));
  const qrModal = document.getElementById('qr-modal');
  const qrIframe = qrModal?.querySelector('.qr-modal-iframe');
  const openQrButtons = Array.from(document.querySelectorAll('[data-open-qr-modal]'));
  const closeQrButtons = Array.from(document.querySelectorAll('[data-close-qr-modal]'));
  const downloadQrButton = document.querySelector('[data-download-qr]');
  const printQrButton = document.querySelector('[data-print-qr]');
  const params = new URLSearchParams(window.location.search);
  const atmType = params.get('atmType') === 'mobile' ? 'mobile' : 'merchant';
  const withAtmType = (href) => {
    const url = new URL(href, window.location.href);
    url.searchParams.set('atmType', atmType);
    return `${url.pathname.split('/').pop()}${url.search}${url.hash}`;
  };

  document.querySelectorAll('a[href^="merchant-atm-"]').forEach((link) => {
    link.href = withAtmType(link.getAttribute('href'));
  });

  document.querySelectorAll('iframe[src^="merchant-atm-"]').forEach((iframe) => {
    iframe.src = withAtmType(iframe.getAttribute('src'));
  });

  const activate = (name) => {
    tabs.forEach((tab) => {
      tab.classList.toggle('active', tab.getAttribute('data-setting-tab') === name);
    });

    panels.forEach((panel) => {
      panel.classList.toggle('active', panel.getAttribute('data-setting-panel') === name);
    });

    refreshIcons();
  };

  const openQrModal = (event) => {
    if (event) event.preventDefault();
    if (!qrModal) return;

    qrModal.classList.add('active');
    qrModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    refreshIcons();
  };

  const closeQrModal = () => {
    if (!qrModal) return;

    qrModal.classList.remove('active');
    qrModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const getQrImageUrl = () => {
    const qrDocument = qrIframe?.contentDocument;
    const qrElement = qrDocument?.querySelector('#merchant-atm-qr img, #merchant-atm-qr canvas');

    if (qrElement instanceof HTMLImageElement) return qrElement.src;
    if (qrElement instanceof HTMLCanvasElement) return qrElement.toDataURL('image/png');

    return '';
  };

  const downloadQr = () => {
    const qrImageUrl = getQrImageUrl();
    if (!qrImageUrl) return;

    const link = document.createElement('a');
    link.href = qrImageUrl;
    link.download = 'merchant-atm-qr.png';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const printQr = () => {
    if (!qrIframe?.contentWindow) return;
    qrIframe.contentWindow.focus();
    qrIframe.contentWindow.print();
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activate(tab.getAttribute('data-setting-tab') || 'general'));
  });

  openQrButtons.forEach((button) => {
    button.addEventListener('click', openQrModal);
  });

  closeQrButtons.forEach((button) => {
    button.addEventListener('click', closeQrModal);
  });

  if (qrModal) {
    qrModal.addEventListener('click', (event) => {
      if (event.target === qrModal) closeQrModal();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeQrModal();
  });

  downloadQrButton?.addEventListener('click', downloadQr);
  printQrButton?.addEventListener('click', printQr);

  activate('general');
});
