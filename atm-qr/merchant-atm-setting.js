window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  const qrUrl = new URL('/atm-qr/merchant-atm-info.html', window.location.origin).toString();
  const tabs = Array.from(document.querySelectorAll('[data-setting-tab]'));
  const panels = Array.from(document.querySelectorAll('[data-setting-panel]'));
  const qrModal = document.getElementById('qr-modal');
  const qrCanvas = document.getElementById('qr-modal-canvas');
  const openQrButtons = Array.from(document.querySelectorAll('[data-open-qr-modal]'));
  const closeQrButtons = Array.from(document.querySelectorAll('[data-close-qr-modal]'));
  const downloadQrButton = document.querySelector('[data-download-qr]');
  const shareQrButton = document.querySelector('[data-share-qr]');
  const printQrButton = document.querySelector('[data-print-qr]');

  const renderQr = async () => {
    if (!qrCanvas || typeof window.QRCode !== 'function') return;
    await window.QRCode.toCanvas(qrCanvas, qrUrl, {
      width: 320,
      margin: 1,
      color: {
        dark: '#192133',
        light: '#ffffff',
      },
    });
  };

  const openQrModal = async (event) => {
    if (event) event.preventDefault();
    if (!qrModal) return;
    qrModal.classList.add('active');
    qrModal.setAttribute('aria-hidden', 'false');
    await renderQr();
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  };

  const closeQrModal = () => {
    if (!qrModal) return;
    qrModal.classList.remove('active');
    qrModal.setAttribute('aria-hidden', 'true');
  };

  const downloadQr = async () => {
    if (typeof window.QRCode !== 'function') return;
    const dataUrl = await window.QRCode.toDataURL(qrUrl, {
      width: 320,
      margin: 1,
      color: {
        dark: '#192133',
        light: '#ffffff',
      },
    });
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'merchant-atm-qr.png';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const shareQr = async () => {
    const shareData = {
      title: 'Merchant ATM QR',
      text: 'Merchant ATM QR for VLINKPAY MERCHANT ATM 01',
      url: qrUrl,
    };
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(qrUrl);
      return;
    }
    window.prompt('Copy QR link', qrUrl);
  };

  const printQr = async () => {
    const printWindow = window.open('', '_blank', 'width=520,height=760');
    if (!printWindow) return;
    const qrDataUrl = await window.QRCode.toDataURL(qrUrl, {
      width: 320,
      margin: 1,
      color: {
        dark: '#192133',
        light: '#ffffff',
      },
    });
    printWindow.document.write(
      '<!doctype html><html><head><title>Merchant ATM QR</title><style>' +
        'body{margin:0;font-family:Inter,Arial,sans-serif;background:#f4f7fb;display:flex;align-items:center;justify-content:center;min-height:100vh}' +
        '.card{width:420px;background:#fff;border-radius:24px;padding:20px;box-shadow:0 18px 48px rgba(15,23,42,.16)}' +
        'img{width:100%;display:block}' +
      '</style></head><body><div class="card"><img src="' + qrDataUrl + '" alt="Merchant QR"></div></body></html>'
    );
    printWindow.document.close();
    printWindow.focus();
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  const activate = (name) => {
    tabs.forEach((tab) => {
      tab.classList.toggle('active', tab.getAttribute('data-setting-tab') === name);
    });
    panels.forEach((panel) => {
      panel.classList.toggle('active', panel.getAttribute('data-setting-panel') === name);
    });
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
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

  downloadQrButton?.addEventListener('click', () => {
    downloadQr().catch(() => {});
  });

  shareQrButton?.addEventListener('click', () => {
    shareQr().catch(() => {});
  });

  printQrButton?.addEventListener('click', () => {
    printQr().catch(() => {});
  });

  activate('general');
});
