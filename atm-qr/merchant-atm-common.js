document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  const supportMethods = [
    { label: 'Cash', icon: 'cash.png' },
    { label: 'Bank Transfer', icon: 'bank.png' },
    { label: 'Zelle', icon: 'zelle.png' },
    { label: 'PayPal', icon: 'paypal.png' },
    { label: 'Venmo', icon: 'venmo.png' },
    { label: 'Cash App', icon: 'cash_app.png' },
    { label: 'Apple Cash', icon: 'apple_cash.png' },
  ];

  const params = new URLSearchParams(window.location.search);
  const atmProfiles = {
    merchant: {
      qrLabel: 'QR Merchant ATM',
      pageTitle: 'Merchant ATM Info',
      nameLabel: 'Merchant ATM Name',
      idLabel: 'Merchant ATM ID',
      idCardLabel: 'Merchant ID',
      name: 'VLINKPAY MERCHANT ATM 01',
      id: 'MAT-4K9P2X',
      status: 'Online',
      feeRate: '1%-5%',
      hoursSummary: 'Thứ 2 - Thứ 6, 9:00 AM - 7:00 PM; Thứ 7, 10:00 AM - 4:00 PM',
      location: 'Quận 1, TP. Hồ Chí Minh',
      image: '../atm-qr/merchant.png',
      infoImage: '../atm-qr/merchant.png',
      imageAlt: 'Merchant icon',
      supportMethods,
      cta: 'Quét để giao dịch trực tiếp với Merchant',
      note: 'Bạn đã quét QR từ Merchant ATM. Hệ thống sẽ tự động kết nối tới giao dịch.',
    },
    mobile: {
      qrLabel: 'QR Mobile ATM',
      pageTitle: 'Mobile ATM Info',
      nameLabel: 'Mobile ATM Name',
      idLabel: 'Mobile ATM ID',
      idCardLabel: 'Mobile ID',
      name: 'VLINKPAY MOBILE ATM 01',
      id: 'MOB-8H2Q7N',
      status: 'Online',
      feeRate: '1%-5%',
      hoursSummary: 'Thứ 2 - Thứ 6, 9:00 AM - 7:00 PM; Thứ 7, 10:00 AM - 4:00 PM',
      location: 'Quận 3, TP. Hồ Chí Minh',
      image: '../atm-qr/mobile.png',
      infoImage: '../atm-qr/mobile.png',
      imageAlt: 'Mobile icon',
      supportMethods,
      cta: 'Quét để giao dịch trực tiếp với Mobile ATM',
      note: 'Bạn đã quét QR từ Mobile ATM. Hệ thống sẽ tự động kết nối tới giao dịch.',
    },
  };
  const atmType = params.get('atmType') === 'mobile' ? 'mobile' : 'merchant';
  const atmProfile = atmProfiles[atmType];
  const withAtmType = (href, extraParams = {}) => {
    const url = new URL(href, window.location.href);
    Object.entries(extraParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    url.searchParams.set('atmType', atmType);
    return `${url.pathname.split('/').pop()}${url.search}${url.hash}`;
  };

  const setText = (selector, value) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = value;
    });
  };

  setText('[data-atm-qr-label]', atmProfile.qrLabel);
  setText('[data-atm-page-title]', atmProfile.pageTitle);
  setText('[data-atm-name-label]', atmProfile.nameLabel);
  setText('[data-atm-id-label]', atmProfile.idLabel);
  setText('[data-atm-id-card-label]', atmProfile.idCardLabel);
  setText('[data-atm-name]', atmProfile.name);
  setText('[data-atm-id]', atmProfile.id);
  setText('[data-atm-status]', atmProfile.status);
  setText('[data-atm-fee-rate]', atmProfile.feeRate);
  setText('[data-atm-hours-summary]', atmProfile.hoursSummary || '');
  setText('[data-atm-location]', atmProfile.location);
  setText('[data-atm-cta]', atmProfile.cta);
  setText('[data-atm-note]', atmProfile.note);

  const hoursCard = document.querySelector('[data-atm-hours-card]');
  if (hoursCard) {
    hoursCard.hidden = atmType === 'mobile';
  }

  if (document.querySelector('[data-atm-page-title]')) {
    document.title = atmProfile.pageTitle;
  }

  document.querySelectorAll('[data-atm-image]').forEach((img) => {
    img.src = img.getAttribute('data-atm-image') === 'info' ? atmProfile.infoImage : atmProfile.image;
    img.alt = atmProfile.imageAlt;
  });

  const supportList = document.querySelector('[data-atm-support-list]');
  if (supportList) {
    const supportMethods = atmProfile.supportMethods || [];
    supportList.innerHTML = supportMethods
      .map((method) => `
        <div class="merchant-info-support">
          <span class="merchant-info-support-icon" aria-hidden="true">
            <img src="icons/${method.icon}" alt="" />
          </span>
          <div class="min-w-0">
            <p class="merchant-info-support-label">${method.label}</p>
          </div>
        </div>
      `)
      .join('');
  }

  const amountUnitInput = document.querySelector('[data-amount-unit-input]');
  const assetInput = document.querySelector('[data-asset-input]');
  const sellAssetInfo = document.querySelector('[data-sell-asset-info]');
  const sellAssetLabel = document.querySelector('[data-sell-asset-label]');
  const sellAssetQuantity = document.querySelector('[data-sell-asset-quantity]');
  const sellAssetApprox = document.querySelector('[data-sell-asset-approx]');
  const sellAssetAvailability = {
    USD: { quantity: '50,000.00', approx: '≈ $50,000.00' },
    USDV: { quantity: '29,399.68', approx: '≈ $29,399.68' },
    USDT: { quantity: '18,240.22', approx: '≈ $18,240.22' },
    USDC: { quantity: '12,980.10', approx: '≈ $12,980.10' },
    VMM: { quantity: '8,450.00', approx: '≈ $3,018.00' },
    DOGE: { quantity: '72,300.00', approx: '≈ $5,804.00' },
    ETH: { quantity: '14.25', approx: '≈ $43,400.00' },
  };

  const getActiveMode = () => {
    const activeModeButton = document.querySelector('.step-toggle [data-step-mode].active');
    return activeModeButton?.getAttribute('data-step-mode') || 'buy';
  };

  const syncSellAssetInfo = () => {
    if (!sellAssetInfo) return;
    const isSell = getActiveMode() === 'sell';
    sellAssetInfo.classList.toggle('hidden', !isSell);
    if (!isSell) return;

    const asset = assetInput?.value || 'USDV';
    const meta = sellAssetAvailability[asset] || sellAssetAvailability.USDV;
    if (sellAssetLabel) sellAssetLabel.textContent = asset;
    if (sellAssetQuantity) sellAssetQuantity.textContent = meta.quantity;
    if (sellAssetApprox) sellAssetApprox.textContent = meta.approx;
  };

  const syncOrderContinueLink = () => {
    const orderContinue = document.querySelector('[data-order-continue]');
    if (!orderContinue) return;
    const activeMode = getActiveMode();
    const nextPage = atmType === 'mobile' ? 'merchant-atm-mobile-location.html' : 'merchant-atm-review.html';
    const amountUnit = amountUnitInput?.value || 'USD';
    const asset = assetInput?.value || 'USDV';
    orderContinue.setAttribute('href', withAtmType(nextPage, { type: activeMode, unit: amountUnit, asset }));
  };

  document.querySelectorAll('[data-atm-info-link]').forEach((link) => {
    link.href = withAtmType('merchant-atm-info.html');
  });

  document.querySelectorAll('[data-atm-qr-link]').forEach((link) => {
    link.href = withAtmType('merchant-atm-qr.html');
  });

  document.querySelectorAll('a[href^="merchant-atm-"]').forEach((link) => {
    link.href = withAtmType(link.getAttribute('href'));
  });

  const type = params.get('type') || (window.location.pathname.endsWith('merchant-atm-order.html') ? 'buy' : null);
  document.querySelectorAll('[data-step-mode]').forEach((el) => {
    if (el.getAttribute('data-step-mode') === type) {
      el.classList.add('active');
    }
  });

  document.querySelectorAll('.step-toggle').forEach((toggle) => {
    const options = Array.from(toggle.querySelectorAll('[data-step-mode]'));
    if (!options.length) return;

    const setActive = (target) => {
      options.forEach((option) => {
        const isActive = option === target;
        option.classList.toggle('active', isActive);
        option.setAttribute('aria-pressed', String(isActive));
      });
      syncOrderContinueLink();
      syncSellAssetInfo();
    };

    const initial = options.find((option) => option.classList.contains('active')) || options[0];
    setActive(initial);

    options.forEach((option) => {
      option.addEventListener('click', () => setActive(option));
    });
  });

  const termsOverlay = document.querySelector('[data-terms-modal]');
  const termsOpeners = document.querySelectorAll('[data-terms-open]');
  const termsClosers = document.querySelectorAll('[data-terms-close]');

  if (termsOverlay) {
    const openTerms = () => termsOverlay.classList.remove('hidden');
    const closeTerms = () => termsOverlay.classList.add('hidden');

    termsOpeners.forEach((button) => {
      button.addEventListener('click', openTerms);
    });

    termsClosers.forEach((button) => {
      button.addEventListener('click', closeTerms);
    });

    termsOverlay.addEventListener('click', (event) => {
      if (event.target === termsOverlay) {
        closeTerms();
      }
    });
  }

  const mobileLocationRoot = document.querySelector('[data-mobile-location-root]');
  if (mobileLocationRoot) {
    const type = params.get('type') || 'buy';
    document.querySelectorAll('[data-mobile-location-back]').forEach((link) => {
      link.href = withAtmType('merchant-atm-order.html', { type });
    });
    document.querySelectorAll('[data-mobile-location-continue]').forEach((link) => {
      link.href = withAtmType('merchant-atm-review.html', { type });
    });
    const noteInput = document.querySelector('[data-mobile-location-note]');
    const noteCounter = document.querySelector('[data-mobile-location-counter]');
    const syncNoteCounter = () => {
      if (!noteInput || !noteCounter) return;
      noteCounter.textContent = `${noteInput.value.length}/100`;
    };
    noteInput?.addEventListener('input', syncNoteCounter);
    syncNoteCounter();
  }

  const initImageSelect = (root, config) => {
    if (!root) return;

    const toggle = root.querySelector(config.toggleSelector);
    const menu = root.querySelector(config.menuSelector);
    const valueNode = root.querySelector(config.valueSelector);
    const input = root.querySelector(config.inputSelector);
    const options = Array.from(root.querySelectorAll(config.optionSelector));

    const setOpen = (open) => {
      toggle?.setAttribute('aria-expanded', String(open));
      if (menu) menu.hidden = !open;
    };

    const renderValue = (value) => {
      const meta = config.optionMeta[value] || config.optionMeta[config.defaultValue];
      if (input) input.value = value;
      if (valueNode) {
        valueNode.innerHTML = `
          <span class="${config.iconClass}">
            <img src="${meta.icon}" alt="" aria-hidden="true" />
          </span>
          <span class="${config.textClass}">${meta.label}</span>
        `;
      }

      options.forEach((option) => {
        const isActive = option.getAttribute(config.optionAttr) === value;
        option.classList.toggle('is-active', isActive);
        option.setAttribute('aria-selected', String(isActive));
      });

      if (typeof config.onChange === 'function') {
        config.onChange(value, meta);
      }
    };

    renderValue(input?.value || config.defaultValue);
    setOpen(false);

    toggle?.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });

    options.forEach((option) => {
      option.addEventListener('click', () => {
        const value = option.getAttribute(config.optionAttr) || config.defaultValue;
        renderValue(value);
        setOpen(false);
      });
    });

    document.addEventListener('click', (event) => {
      if (!root.contains(event.target)) {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setOpen(false);
    });
  };

  initImageSelect(document.querySelector('[data-payment-method-select]'), {
    toggleSelector: '[data-payment-method-toggle]',
    menuSelector: '[data-payment-method-menu]',
    valueSelector: '[data-payment-method-value]',
    inputSelector: '[data-payment-method-input]',
    optionSelector: '[data-payment-method-option]',
    optionAttr: 'data-payment-method-option',
    defaultValue: 'bank-transfer',
    iconClass: 'payment-method-select__option-icon',
    textClass: 'payment-method-select__option-text',
    optionMeta: {
      cash: { label: 'Cash', icon: 'icons/cash.png' },
      'bank-transfer': { label: 'Chuyển khoản', icon: 'icons/bank.png' },
      zelle: { label: 'Zelle', icon: 'icons/zelle.png' },
      venmo: { label: 'Venmo', icon: 'icons/venmo.png' },
      paypal: { label: 'PayPal', icon: 'icons/paypal.png' },
      'cash-app': { label: 'Cash App', icon: 'icons/cash_app.png' },
      'apple-cash': { label: 'Apple Cash', icon: 'icons/apple_cash.png' },
    },
  });

  initImageSelect(document.querySelector('[data-amount-unit-select]'), {
    toggleSelector: '[data-amount-unit-toggle]',
    menuSelector: '[data-amount-unit-menu]',
    valueSelector: '[data-amount-unit-value]',
    inputSelector: '[data-amount-unit-input]',
    optionSelector: '[data-amount-unit-option]',
    optionAttr: 'data-amount-unit-option',
    defaultValue: 'USD',
    iconClass: 'payment-method-select__option-icon',
    textClass: 'payment-method-select__option-text',
    optionMeta: {
      USD: { label: 'USD', icon: 'images/usd.png' },
    },
    onChange: syncOrderContinueLink,
  });

  initImageSelect(document.querySelector('[data-asset-select]'), {
    toggleSelector: '[data-asset-toggle]',
    menuSelector: '[data-asset-menu]',
    valueSelector: '[data-asset-value]',
    inputSelector: '[data-asset-input]',
    optionSelector: '[data-asset-option]',
    optionAttr: 'data-asset-option',
    defaultValue: 'USDV',
    iconClass: 'payment-method-select__option-icon',
    textClass: 'payment-method-select__option-text',
    optionMeta: {
      USD: { label: 'USD', icon: 'images/usd.png' },
      USDV: { label: 'USDV', icon: 'images/usdv.png' },
      USDT: { label: 'USDT', icon: 'images/usdt.png' },
      USDC: { label: 'USDC', icon: 'images/usdc.svg' },
      VMM: { label: 'VMM', icon: 'images/vmm.png' },
      DOGE: { label: 'DOGE', icon: 'images/doge.png' },
      ETH: { label: 'ETH', icon: 'images/eth.png' },
    },
    onChange: () => {
      syncOrderContinueLink();
      syncSellAssetInfo();
    },
  });

  syncSellAssetInfo();

  const reviewRoot = document.querySelector('[data-review-root]');
  if (reviewRoot) {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type') || 'buy';
    const asset = params.get('asset') || params.get('unit') || 'USDV';
    const quantity = 100;
    const amount = 100;
    const quantityPrice = 1;
    const merchantFeeRate = 5;
    const systemFeeRate = 1;
    const insuranceRate = 1;

    const formatMoney = (value) => `$${Number(value).toFixed(1).replace(/\.0$/, '')}`;
    const formatQuantity = (value) => `${value} ${asset}`;
    const serviceLabel = type === 'sell' ? `Sell ${asset} with Cash` : `Buy ${asset} with Cash`;

    const nodes = {
      serviceType: document.querySelector('[data-review-service-type]'),
      amount: document.querySelector('[data-review-amount]'),
      quantity: document.querySelector('[data-review-quantity]'),
      quantityPrice: document.querySelector('[data-review-quantity-price]'),
      atmLabel: document.querySelector('[data-review-atm-label]'),
      merchant: document.querySelector('[data-review-merchant]'),
      distance: document.querySelector('[data-review-distance]'),
      systemFee: document.querySelector('[data-review-system-fee]'),
      merchantFee: document.querySelector('[data-review-merchant-fee]'),
      total: document.querySelector('[data-review-total]'),
      insuranceInput: document.querySelector('[data-review-insurance]'),
      insuranceFee: document.querySelector('[data-review-insurance-fee]'),
      confirmLink: document.querySelector('[data-review-confirm]'),
      backLinks: document.querySelectorAll('[data-review-back]'),
    };

    const render = () => {
      const insuranceChecked = nodes.insuranceInput?.checked ?? false;
      const insuranceFee = insuranceChecked ? amount * insuranceRate / 100 : 0;
      const systemFee = amount * systemFeeRate / 100;
      const merchantFee = amount * merchantFeeRate / 100;
      const total = amount + systemFee + merchantFee + insuranceFee;

      if (nodes.serviceType) nodes.serviceType.textContent = serviceLabel;
      if (nodes.amount) nodes.amount.textContent = formatMoney(amount);
      if (nodes.quantity) nodes.quantity.textContent = formatQuantity(quantity);
      if (nodes.quantityPrice) nodes.quantityPrice.textContent = `@ $${quantityPrice.toFixed(2)}`;
      if (nodes.atmLabel) nodes.atmLabel.textContent = atmType === 'mobile' ? 'Mobile ATM:' : 'Merchant ATM:';
      if (nodes.merchant) nodes.merchant.textContent = 'ATM-A8FOBN';
      if (nodes.distance) nodes.distance.textContent = 'Nearby (within 25 mins)';
      if (nodes.countdown) nodes.countdown.textContent = '10s';
      if (nodes.systemFee) nodes.systemFee.textContent = formatMoney(systemFee);
      if (nodes.merchantFee) nodes.merchantFee.textContent = formatMoney(merchantFee);
      if (nodes.total) nodes.total.textContent = formatMoney(total);
      if (nodes.insuranceFee) nodes.insuranceFee.textContent = formatMoney(amount * insuranceRate / 100);
      nodes.backLinks.forEach((link) => {
        const backPage = atmType === 'mobile' ? 'merchant-atm-mobile-location.html' : 'merchant-atm-order.html';
        link.href = withAtmType(backPage, { type, asset });
      });
      if (nodes.confirmLink) {
        nodes.confirmLink.href = withAtmType('merchant-atm-request-details.html', { type, asset });
      }
    };

    if (nodes.insuranceInput) {
      nodes.insuranceInput.addEventListener('change', render);
    }

    render();
  }

  const requestRoot = document.querySelector('[data-request-root]');
  if (requestRoot) {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type') || 'buy';
    const asset = params.get('asset') || params.get('unit') || 'USDV';
    const amount = 100;
    const systemFeeRate = 1;
    const mobileFeeRate = 5;
    const insuranceFee = 1;
    const buyerReceives = 100;
    const countdownStartMs = 5 * 60 * 1000;
    const redirectAfterMs = 10 * 1000;

    const formatMoney = (value) => `$${Number(value).toFixed(1).replace(/\.0$/, '')}`;
    const serviceLabel = type === 'sell' ? `Sell ${asset} with Cash` : `Buy ${asset} with Cash`;

    const nodes = {
      title: document.querySelector('[data-request-title]'),
      countdown: document.querySelector('[data-request-countdown]'),
      amount: document.querySelector('[data-request-amount]'),
      systemFee: document.querySelector('[data-request-system-fee]'),
      mobileFee: document.querySelector('[data-request-mobile-fee]'),
      total: document.querySelector('[data-request-total]'),
      buyerPays: document.querySelector('[data-request-buyer-pays]'),
      sellerReceives: document.querySelector('[data-request-seller-receives]'),
      platformFee: document.querySelector('[data-request-platform-fee]'),
      buyerReceives: document.querySelector('[data-request-buyer-receives]'),
      insuranceFee: document.querySelector('[data-request-insurance-fee]'),
      more: document.querySelector('[data-request-more]'),
      toggle: document.querySelector('[data-request-toggle]'),
      arrow: document.querySelector('[data-request-arrow]'),
      backLinks: document.querySelectorAll('[data-request-back]'),
    };

    const render = () => {
      const systemFee = amount * systemFeeRate / 100;
      const mobileFee = amount * mobileFeeRate / 100;
      const total = amount + systemFee + mobileFee;
      const sellerReceives = amount + mobileFee;
      const buyerPays = total;

      if (nodes.title) nodes.title.textContent = serviceLabel;
      if (nodes.countdown) nodes.countdown.textContent = '5:00';
      if (nodes.amount) nodes.amount.textContent = formatMoney(amount);
      if (nodes.systemFee) nodes.systemFee.textContent = formatMoney(systemFee);
      if (nodes.mobileFee) nodes.mobileFee.textContent = formatMoney(mobileFee);
      if (nodes.total) nodes.total.textContent = formatMoney(total);
      if (nodes.buyerPays) nodes.buyerPays.textContent = formatMoney(buyerPays);
      if (nodes.sellerReceives) nodes.sellerReceives.textContent = formatMoney(sellerReceives);
      if (nodes.platformFee) nodes.platformFee.textContent = formatMoney(systemFee);
      if (nodes.buyerReceives) nodes.buyerReceives.textContent = `${buyerReceives} ${asset}`;
      if (nodes.insuranceFee) nodes.insuranceFee.textContent = `${insuranceFee} ${asset}`;
      nodes.backLinks.forEach((link) => {
        link.href = withAtmType('merchant-atm-review.html', { type, asset });
      });
    };

    if (nodes.toggle && nodes.more && nodes.arrow) {
      nodes.toggle.addEventListener('click', () => {
        const hidden = nodes.more.classList.toggle('hidden');
        nodes.arrow.style.transform = hidden ? 'rotate(0deg)' : 'rotate(180deg)';
      });
    }

    render();

    const startAt = Date.now();
    const countdown = nodes.countdown;
    const tick = () => {
      const elapsed = Date.now() - startAt;
      const remaining = Math.max(0, countdownStartMs - elapsed);
      const displayMinutes = Math.floor(remaining / 60000);
      const displaySeconds = Math.floor((remaining % 60000) / 1000);
      if (countdown) countdown.textContent = `${displayMinutes}:${String(displaySeconds).padStart(2, '0')}`;
      if (elapsed >= redirectAfterMs) {
        window.location.href = withAtmType('merchant-atm-accepted.html', { type });
        return;
      }
      window.requestAnimationFrame(tick);
    };

    tick();
  }

  const acceptedRoot = document.querySelector('[data-accepted-root]');
  if (acceptedRoot) {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type') || 'buy';
    const serviceLabel = type === 'sell' ? 'Sell USDV with Cash' : 'Buy USDV with Cash';
    const badge = document.querySelector('[data-accepted-badge]');
    const title = document.querySelector('[data-accepted-title]');
    const status = document.querySelector('[data-accepted-status]');
    const more = document.querySelector('[data-accepted-more]');
    const toggle = document.querySelector('[data-accepted-toggle]');
    const arrow = document.querySelector('[data-accepted-arrow]');
    const menu = document.querySelector('[data-accepted-menu]');
    const menuToggle = document.querySelector('[data-accepted-menu-toggle]');
    const menuArrow = document.querySelector('[data-accepted-menu-arrow]');
    const qrModal = document.querySelector('[data-accepted-qr-modal]');
    const qrClose = document.querySelector('[data-accepted-qr-close]');
    const showQrLink = document.querySelector('[data-accepted-show-qr]');
    const backLinks = document.querySelectorAll('[data-accepted-back]');

    if (badge) badge.textContent = 'Accepted';
    if (title) title.textContent = serviceLabel;
    if (status) status.textContent = 'Accepted';
    backLinks.forEach((link) => {
      link.href = withAtmType('merchant-atm-request-details.html', { type });
    });

    if (showQrLink && qrModal) {
      const openQrModal = () => {
        qrModal.classList.remove('hidden');
        qrModal.classList.add('flex');
      };
      const closeQrModal = () => {
        qrModal.classList.add('hidden');
        qrModal.classList.remove('flex');
      };

      showQrLink.addEventListener('click', (event) => {
        event.preventDefault();
        openQrModal();
      });

      if (qrClose) {
        qrClose.addEventListener('click', closeQrModal);
      }

      qrModal.addEventListener('click', (event) => {
        if (event.target === qrModal) {
          closeQrModal();
        }
      });
    }

    if (toggle && more && arrow) {
      toggle.addEventListener('click', () => {
        const hidden = more.classList.toggle('hidden');
        arrow.style.transform = hidden ? 'rotate(0deg)' : 'rotate(180deg)';
      });
    }

    if (menuToggle && menu && menuArrow) {
      menuToggle.addEventListener('click', () => {
        const hidden = menu.classList.toggle('hidden');
        menuArrow.style.transform = hidden ? 'rotate(0deg)' : 'rotate(180deg)';
      });
      document.addEventListener('click', (event) => {
        if (!acceptedRoot.contains(event.target)) {
          menu.classList.add('hidden');
          menuArrow.style.transform = 'rotate(0deg)';
          return;
        }
        if (menu.contains(event.target) || menuToggle.contains(event.target)) return;
        menu.classList.add('hidden');
        menuArrow.style.transform = 'rotate(0deg)';
      });
    }
  }
});
