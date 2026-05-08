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

    const syncOrderContinue = () => {
      const orderContinue = document.querySelector('[data-order-continue]');
      if (!orderContinue) return;
      const activeModeButton = document.querySelector('.step-toggle [data-step-mode].active');
      const activeMode = activeModeButton?.getAttribute('data-step-mode') || 'buy';
      const nextPage = atmType === 'mobile' ? 'merchant-atm-mobile-location.html' : 'merchant-atm-review.html';
      orderContinue.setAttribute('href', withAtmType(nextPage, { type: activeMode }));
    };

    const setActive = (target) => {
      options.forEach((option) => {
        const isActive = option === target;
        option.classList.toggle('active', isActive);
        option.setAttribute('aria-pressed', String(isActive));
      });
      syncOrderContinue();
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

  const paymentMethodSelect = document.querySelector('[data-payment-method-select]');
  if (paymentMethodSelect) {
    const toggle = paymentMethodSelect.querySelector('[data-payment-method-toggle]');
    const menu = paymentMethodSelect.querySelector('[data-payment-method-menu]');
    const valueNode = paymentMethodSelect.querySelector('[data-payment-method-value]');
    const input = paymentMethodSelect.querySelector('[data-payment-method-input]');
    const options = Array.from(paymentMethodSelect.querySelectorAll('[data-payment-method-option]'));

    const optionMeta = {
      cash: { label: 'Cash', icon: 'icons/cash.png' },
      'bank-transfer': { label: 'Chuyển khoản', icon: 'icons/bank.png' },
      zelle: { label: 'Zelle', icon: 'icons/zelle.png' },
      venmo: { label: 'Venmo', icon: 'icons/venmo.png' },
      paypal: { label: 'PayPal', icon: 'icons/paypal.png' },
      'cash-app': { label: 'Cash App', icon: 'icons/cash_app.png' },
      'apple-cash': { label: 'Apple Cash', icon: 'icons/apple_cash.png' },
    };

    const setOpen = (open) => {
      toggle?.setAttribute('aria-expanded', String(open));
      if (menu) menu.hidden = !open;
    };

    const setValue = (value) => {
      const meta = optionMeta[value] || optionMeta['bank-transfer'];
      if (input) input.value = value;
      if (valueNode) {
        valueNode.innerHTML = `
          <span class="payment-method-select__option-icon">
            <img src="${meta.icon}" alt="" aria-hidden="true" />
          </span>
          <span class="payment-method-select__option-text">${meta.label}</span>
        `;
      }

      options.forEach((option) => {
        const isActive = option.getAttribute('data-payment-method-option') === value;
        option.classList.toggle('is-active', isActive);
        option.setAttribute('aria-selected', String(isActive));
      });
    };

    const current = input?.value || 'bank-transfer';
    setValue(current);
    setOpen(false);

    toggle?.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });

    options.forEach((option) => {
      option.addEventListener('click', () => {
        const value = option.getAttribute('data-payment-method-option') || 'bank-transfer';
        setValue(value);
        setOpen(false);
      });
    });

    document.addEventListener('click', (event) => {
      if (!paymentMethodSelect.contains(event.target)) {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setOpen(false);
    });
  }

  const reviewRoot = document.querySelector('[data-review-root]');
  if (reviewRoot) {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type') || 'buy';
    const quantity = 100;
    const amount = 100;
    const quantityPrice = 1;
    const merchantFeeRate = 5;
    const systemFeeRate = 1;
    const insuranceRate = 1;

    const formatMoney = (value) => `$${Number(value).toFixed(1).replace(/\.0$/, '')}`;
    const formatQuantity = (value) => `${value} USDV`;
    const serviceLabel = type === 'sell' ? 'Sell USDV with Cash' : 'Buy USDV with Cash';

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
        link.href = withAtmType(backPage, { type });
      });
      if (nodes.confirmLink) {
        nodes.confirmLink.href = withAtmType('merchant-atm-request-details.html', { type });
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
    const amount = 100;
    const systemFeeRate = 1;
    const mobileFeeRate = 5;
    const insuranceFee = 1;
    const buyerReceives = 100;
    const countdownStartMs = 5 * 60 * 1000;
    const redirectAfterMs = 10 * 1000;

    const formatMoney = (value) => `$${Number(value).toFixed(1).replace(/\.0$/, '')}`;
    const serviceLabel = type === 'sell' ? 'Sell USDV with Cash' : 'Buy USDV with Cash';

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
      if (nodes.buyerReceives) nodes.buyerReceives.textContent = `${buyerReceives} USDV`;
      if (nodes.insuranceFee) nodes.insuranceFee.textContent = `${insuranceFee} USDV`;
      nodes.backLinks.forEach((link) => {
        link.href = withAtmType('merchant-atm-review.html', { type });
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
