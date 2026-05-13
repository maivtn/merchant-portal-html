window.addEventListener('DOMContentLoaded', () => {
  const refreshIcons = () => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  };

  const refreshTooltips = () => {
    if (!window.tippy) return;

    document.querySelectorAll('.info-dot').forEach((node) => {
      if (node._tippy) return;
      window.tippy(node, {
        content: node.getAttribute('data-tippy-content') || 'More information',
        theme: 'light-border',
        animation: 'shift-away-subtle',
        placement: 'top',
        interactive: false,
        arrow: true,
      });
    });

    document.querySelectorAll('.topnav-info-dot, .history-filter-info').forEach((node) => {
      if (node._tippy) return;
      window.tippy(node, {
        content: node.getAttribute('data-tippy-content') || 'More information',
        theme: 'light-border',
        animation: 'shift-away-subtle',
        placement: node.getAttribute('data-tippy-placement') || 'bottom',
        trigger: 'click',
        interactive: false,
        arrow: true,
        maxWidth: 240,
      });
    });
  };

  refreshIcons();
  refreshTooltips();

  const tabs = Array.from(document.querySelectorAll('[data-setting-tab]'));
  const panels = Array.from(document.querySelectorAll('[data-setting-panel]'));
  const openSettingTabButtons = Array.from(document.querySelectorAll('[data-open-setting-tab]'));
  const qrModal = document.getElementById('qr-modal');
  const qrIframe = qrModal?.querySelector('.qr-modal-iframe');
  const openQrButtons = Array.from(document.querySelectorAll('[data-open-qr-modal]'));
  const closeQrButtons = Array.from(document.querySelectorAll('[data-close-qr-modal]'));
  const downloadQrButton = document.querySelector('[data-download-qr]');
  const printQrButton = document.querySelector('[data-print-qr]');
  const roleInputs = Array.from(document.querySelectorAll('input[name="role"]'));
  const walkinModeOptions = Array.from(document.querySelectorAll('.walkin-option'));
  const roleDependentSections = Array.from(document.querySelectorAll('[data-role-visibility]'));
  const hoursModal = document.getElementById('hours-modal');
  const openHoursButtons = Array.from(document.querySelectorAll('[data-open-hours-modal]'));
  const closeHoursButtons = Array.from(document.querySelectorAll('[data-close-hours-modal]'));
  const saveHoursButton = document.querySelector('[data-save-hours]');
  const hoursSummary = document.querySelector('[data-hours-summary]');
  const hoursDayRows = Array.from(document.querySelectorAll('[data-hours-day-row]'));
  const acceptedPaymentModal = document.getElementById('accepted-payment-modal');
  const openAcceptedPaymentButtons = Array.from(
    document.querySelectorAll('[data-open-accepted-payment-modal]'),
  );
  const closeAcceptedPaymentButtons = Array.from(
    document.querySelectorAll('[data-close-accepted-payment-modal]'),
  );
  const saveAcceptedPaymentButton = document.querySelector('[data-save-accepted-payment-methods]');
  const acceptedPaymentOptions = document.querySelector('[data-accepted-payment-options]');
  const acceptedPaymentChipList = document.querySelector('[data-accepted-payment-chip-list]');
  const paymentPrioritySelect = document.getElementById('payment-priority-select');
  const paymentChoiceInputs = Array.from(
    document.querySelectorAll('#receive-on-behalf-payment .payment-choice-list input[type="checkbox"]'),
  );
  const walkinSetupCard = document.getElementById('walkin-setup-card');
  const walkinSetupCollapse = document.getElementById('walkin-setup-collapse');
  const walkinSetupToggle = document.querySelector('.walkin-setup-toggle');
  const walkinSetupCollapseInstance =
    walkinSetupCollapse && window.bootstrap?.Collapse
      ? window.bootstrap.Collapse.getOrCreateInstance(walkinSetupCollapse, { toggle: false })
      : null;
  const assetFeeGroup = document.getElementById('asset-fee-group');
  const assetFeeGroupCollapse = document.getElementById('asset-fee-group-collapse');
  const assetFeeGroupToggle = document.querySelector('.asset-fee-group__toggle');
  const assetFeeTabs = Array.from(document.querySelectorAll('[data-asset-fee-tab]'));
  const assetFeePanels = Array.from(document.querySelectorAll('[data-asset-fee-panel]'));
  const assetFeeGroupCollapseInstance =
    assetFeeGroupCollapse && window.bootstrap?.Collapse
      ? window.bootstrap.Collapse.getOrCreateInstance(assetFeeGroupCollapse, { toggle: false })
      : null;
  const params = new URLSearchParams(window.location.search);
  const atmType = params.get('atmType') === 'mobile' ? 'mobile' : 'merchant';
  let isBehalf = params.get('isBehalf') !== 'false';
  const withAtmType = (href) => {
    const url = new URL(href, window.location.href);
    url.searchParams.set('atmType', atmType);
    return `${url.pathname.split('/').pop()}${url.search}${url.hash}`;
  };

  document.querySelectorAll('a[href^="merchant-atm-"]:not([data-preserve-atm-type])').forEach((link) => {
    link.href = withAtmType(link.getAttribute('href'));
  });

  document.querySelectorAll('iframe[src^="merchant-atm-"]').forEach((iframe) => {
    iframe.src = withAtmType(iframe.getAttribute('src'));
  });

  const syncBehalfState = () => {
    document.body.classList.toggle('is-behalf', isBehalf);
  };

  // Join Program modal
  const joinProgramModal = document.getElementById('join-program-modal');
  const joinProgramAgree = document.getElementById('join-program-agree');
  const joinProgramConfirm = document.getElementById('join-program-confirm');

  const openJoinProgramModal = () => {
    if (!joinProgramModal) return;
    if (joinProgramAgree) joinProgramAgree.checked = false;
    if (joinProgramConfirm) joinProgramConfirm.disabled = true;
    joinProgramModal.classList.add('active');
    joinProgramModal.setAttribute('aria-hidden', 'false');
    refreshIcons();
  };

  const closeJoinProgramModal = () => {
    if (!joinProgramModal) return;
    joinProgramModal.classList.remove('active');
    joinProgramModal.setAttribute('aria-hidden', 'true');
  };

  joinProgramAgree?.addEventListener('change', () => {
    if (joinProgramConfirm) joinProgramConfirm.disabled = !joinProgramAgree.checked;
  });

  document.querySelectorAll('[data-open-join-program]').forEach((btn) => {
    btn.addEventListener('click', openJoinProgramModal);
  });

  document.querySelectorAll('[data-close-join-program]').forEach((btn) => {
    btn.addEventListener('click', closeJoinProgramModal);
  });

  joinProgramModal?.addEventListener('click', (e) => {
    if (e.target === joinProgramModal) closeJoinProgramModal();
  });

  joinProgramConfirm?.addEventListener('click', () => {
    closeJoinProgramModal();
    openPinModal(() => {
      window.Swal?.fire({
        icon: 'success',
        title: 'Đăng ký thành công',
        text: 'Đăng ký thu hộ chi hộ thành công',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f59e0b',
      }).then(() => {
        isBehalf = true;
        syncBehalfState();
        const url = new URL(window.location.href);
        url.searchParams.set('isBehalf', 'true');
        window.history.replaceState(null, '', url);
      });
    });
  });

  // PIN modal
  const pinModal = document.getElementById('pin-modal');
  const pinInput = document.getElementById('pin-modal-input');
  const pinEye = document.getElementById('pin-modal-eye');
  const pinClose = document.getElementById('pin-modal-close');
  const pinOk = document.getElementById('pin-modal-ok');
  let pinCallback = null;

  const openPinModal = (callback) => {
    if (!pinModal) return;
    pinCallback = callback || null;
    if (pinInput) pinInput.value = '';
    pinModal.classList.add('active');
    pinModal.setAttribute('aria-hidden', 'false');
    refreshIcons();
    setTimeout(() => pinInput?.focus(), 50);
  };

  const closePinModal = () => {
    if (!pinModal) return;
    pinModal.classList.remove('active');
    pinModal.setAttribute('aria-hidden', 'true');
    if (pinInput) pinInput.value = '';
  };

  pinEye?.addEventListener('click', () => {
    const isPassword = pinInput.type === 'password';
    pinInput.type = isPassword ? 'text' : 'password';
    const icon = pinEye.querySelector('i');
    if (icon) {
      icon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
      refreshIcons();
    }
  });

  pinInput?.addEventListener('input', () => {
    pinInput.value = pinInput.value.replace(/\D/g, '').slice(0, 6);
  });

  pinClose?.addEventListener('click', closePinModal);
  pinOk?.addEventListener('click', () => {
    closePinModal();
    if (pinCallback) {
      pinCallback();
      pinCallback = null;
    } else {
      // Default: join program
      window.Swal?.fire({
        icon: 'success',
        title: 'Đăng ký thành công',
        text: 'Đăng ký thu hộ chi hộ thành công',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f59e0b',
      }).then(() => {
        isBehalf = true;
        syncBehalfState();
        const url = new URL(window.location.href);
        url.searchParams.set('isBehalf', 'true');
        window.history.replaceState(null, '', url);
      });
    }
  });

  pinModal?.addEventListener('click', (e) => {
    if (e.target === pinModal) closePinModal();
  });

  // Confirm Repayment modal
  const repaymentModal = document.getElementById('repayment-modal');
  const submitRepaymentBtn = document.getElementById('submit-repayment-btn');
  const repaymentFileInput = document.getElementById('repayment-file-input');
  const repaymentCameraInput = document.getElementById('repayment-camera-input');
  const repaymentPreviewGrid = document.getElementById('repayment-preview-grid');
  let repaymentFiles = [];

  const renderRepaymentPreviews = () => {
    if (!repaymentPreviewGrid) return;
    repaymentPreviewGrid.innerHTML = '';
    repaymentPreviewGrid.style.display = repaymentFiles.length ? 'grid' : 'none';
    repaymentFiles.forEach((file, idx) => {
      const isPdf = file.type === 'application/pdf';
      const url = URL.createObjectURL(file);
      const item = document.createElement('div');
      item.className = 'proof-preview-item';
      item.innerHTML = isPdf
        ? `<div class="proof-preview-item__thumb--pdf"><i data-lucide="file-text" style="width:32px;height:32px;"></i></div>`
        : `<img class="proof-preview-item__thumb" src="${url}" alt="${file.name}" />`;
      item.innerHTML += `
        <button type="button" class="proof-preview-item__remove" data-idx="${idx}" aria-label="Remove">&#x2715;</button>
        <div class="proof-preview-item__footer">
          <div class="proof-preview-item__name" title="${file.name}">${file.name}</div>
          <button type="button" class="proof-preview-item__view" data-url="${url}">
            <i data-lucide="eye" style="width:12px;height:12px;"></i> View
          </button>
        </div>`;
      repaymentPreviewGrid.appendChild(item);
    });
    refreshIcons();
    repaymentPreviewGrid.querySelectorAll('[data-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        repaymentFiles.splice(Number(btn.dataset.idx), 1);
        renderRepaymentPreviews();
        syncRepaymentSubmit();
      });
    });
    repaymentPreviewGrid.querySelectorAll('[data-url]').forEach(btn => {
      btn.addEventListener('click', () => window.open(btn.dataset.url, '_blank'));
    });
  };

  const addRepaymentFiles = (fileList) => {
    Array.from(fileList).forEach(f => repaymentFiles.push(f));
    renderRepaymentPreviews();
    syncRepaymentSubmit();
  };

  const openRepaymentModal = () => {
    repaymentFiles = [];
    if (repaymentFileInput) repaymentFileInput.value = '';
    if (repaymentCameraInput) repaymentCameraInput.value = '';
    renderRepaymentPreviews();
    if (submitRepaymentBtn) submitRepaymentBtn.disabled = true;
    repaymentModal?.classList.add('active');
    repaymentModal?.setAttribute('aria-hidden', 'false');
    refreshIcons();
  };

  const closeRepaymentModal = () => {
    repaymentModal?.classList.remove('active');
    repaymentModal?.setAttribute('aria-hidden', 'true');
  };

  const syncRepaymentSubmit = () => {
    if (submitRepaymentBtn) submitRepaymentBtn.disabled = repaymentFiles.length === 0;
  };

  document.getElementById('open-repayment-modal')?.addEventListener('click', openRepaymentModal);
  document.getElementById('close-repayment-modal')?.addEventListener('click', closeRepaymentModal);
  document.getElementById('cancel-repayment-btn')?.addEventListener('click', closeRepaymentModal);
  repaymentModal?.addEventListener('click', (e) => { if (e.target === repaymentModal) closeRepaymentModal(); });
  document.getElementById('repayment-take-photo-btn')?.addEventListener('click', () => repaymentCameraInput?.click());
  document.getElementById('repayment-choose-file-btn')?.addEventListener('click', () => repaymentFileInput?.click());
  repaymentFileInput?.addEventListener('change', () => { addRepaymentFiles(repaymentFileInput.files); repaymentFileInput.value = ''; });
  repaymentCameraInput?.addEventListener('change', () => { addRepaymentFiles(repaymentCameraInput.files); repaymentCameraInput.value = ''; });

  submitRepaymentBtn?.addEventListener('click', () => {
    closeRepaymentModal();
    window.Swal?.fire({
      icon: 'success',
      title: 'Repayment Submitted',
      text: 'Your repayment confirmation has been submitted and is waiting for VLINKPAY review.',
      confirmButtonText: 'Done',
      confirmButtonColor: '#f59e0b',
    });
  });

  // Request Payout modal
  const payoutModal = document.getElementById('payout-modal');
  const payoutAgree = document.getElementById('payout-agree');
  const submitPayoutBtn = document.getElementById('submit-payout-btn');

  const openPayoutModal = () => {
    if (payoutAgree) payoutAgree.checked = false;
    if (submitPayoutBtn) submitPayoutBtn.disabled = true;
    payoutModal?.classList.add('active');
    payoutModal?.setAttribute('aria-hidden', 'false');
    refreshIcons();
  };

  const closePayoutModal = () => {
    payoutModal?.classList.remove('active');
    payoutModal?.setAttribute('aria-hidden', 'true');
  };

  document.getElementById('open-payout-modal')?.addEventListener('click', openPayoutModal);
  document.getElementById('close-payout-modal')?.addEventListener('click', closePayoutModal);
  document.getElementById('cancel-payout-btn')?.addEventListener('click', closePayoutModal);
  payoutModal?.addEventListener('click', (e) => { if (e.target === payoutModal) closePayoutModal(); });
  payoutAgree?.addEventListener('change', () => {
    if (submitPayoutBtn) submitPayoutBtn.disabled = !payoutAgree.checked;
  });

  submitPayoutBtn?.addEventListener('click', () => {
    closePayoutModal();
    window.Swal?.fire({
      icon: 'success',
      title: 'Payout Request Submitted',
      html: 'Your payout request has been submitted.<br>VLINKPAY will review and process it based on the settlement cycle.<br><br><strong>Expected payout: T+1</strong>',
      confirmButtonText: 'Done',
      confirmButtonColor: '#f59e0b',
    });
  });

  // Cancel deposit modals
  const cancelPolicyModal = document.getElementById('cancel-policy-modal');
  const cancelConfirmModal = document.getElementById('cancel-confirm-modal');
  const cancelConfirmAgree = document.getElementById('cancel-confirm-agree');
  const confirmCancellationBtn = document.getElementById('confirm-cancellation-btn');

  const openCancelPolicyModal = () => {
    cancelPolicyModal?.classList.add('active');
    cancelPolicyModal?.setAttribute('aria-hidden', 'false');
    refreshIcons();
  };

  const closeCancelPolicyModal = () => {
    cancelPolicyModal?.classList.remove('active');
    cancelPolicyModal?.setAttribute('aria-hidden', 'true');
  };

  const openCancelConfirmModal = () => {
    closeCancelPolicyModal();
    if (cancelConfirmAgree) cancelConfirmAgree.checked = false;
    if (confirmCancellationBtn) confirmCancellationBtn.disabled = true;
    cancelConfirmModal?.classList.add('active');
    cancelConfirmModal?.setAttribute('aria-hidden', 'false');
    refreshIcons();
  };

  const closeCancelConfirmModal = () => {
    cancelConfirmModal?.classList.remove('active');
    cancelConfirmModal?.setAttribute('aria-hidden', 'true');
  };

  document.getElementById('open-cancel-policy')?.addEventListener('click', (e) => {
    e.preventDefault();
    openCancelPolicyModal();
  });

  document.getElementById('close-cancel-policy')?.addEventListener('click', closeCancelPolicyModal);
  document.getElementById('close-cancel-policy-btn')?.addEventListener('click', closeCancelPolicyModal);
  cancelPolicyModal?.addEventListener('click', (e) => { if (e.target === cancelPolicyModal) closeCancelPolicyModal(); });

  document.getElementById('open-cancel-confirm-btn')?.addEventListener('click', openCancelConfirmModal);
  document.getElementById('close-cancel-confirm')?.addEventListener('click', closeCancelConfirmModal);
  document.getElementById('keep-package-btn')?.addEventListener('click', closeCancelConfirmModal);
  cancelConfirmModal?.addEventListener('click', (e) => { if (e.target === cancelConfirmModal) closeCancelConfirmModal(); });

  cancelConfirmAgree?.addEventListener('change', () => {
    if (confirmCancellationBtn) confirmCancellationBtn.disabled = !cancelConfirmAgree.checked;
  });

  // Simulate checking pending obligations (true = all clear, false = still pending)
  const hasNoPendingObligations = () => true;

  confirmCancellationBtn?.addEventListener('click', () => {
    closeCancelConfirmModal();
    openPinModal(() => {
      const allClear = hasNoPendingObligations();
      window.Swal?.fire({
        icon: 'success',
        title: 'Cancellation request submitted.',
        text: allClear
          ? 'Your refund is being processed.'
          : 'Your refund will remain pending until all obligations are cleared.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f59e0b',
      });
    });
  });

  const roleTargets = (value) => value.split(',').map((item) => item.trim()).filter(Boolean);
  const hoursDayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const formatTime = (value) => {
    if (!value) return '';
    const [hourString, minuteString] = value.split(':');
    const hour = Number(hourString);
    const minute = Number(minuteString);
    const period = hour >= 12 ? 'PM' : 'AM';
    const normalizedHour = hour % 12 || 12;
    return `${normalizedHour}:${String(minute).padStart(2, '0')} ${period}`;
  };

  const getGeneralPaymentMethods = () => {
    const labels = Array.from(
      document.querySelectorAll('.payment-grid .payment-row > .payment-label:first-child > span'),
    )
      .map((node) => node.textContent?.trim() || '')
      .filter(Boolean);

    return labels.filter((label, index) => labels.indexOf(label) === index);
  };

  const paymentMethodIconMap = {
    Cash: 'icons/cash.png',
    Zelle: 'icons/zelle.png',
    'Bank Wire': 'icons/bank.png',
    PayPal: 'icons/paypal.png',
    Venmo: 'icons/venmo.png',
    'Cash App': 'icons/cash_app.png',
    'Apple Cash': 'icons/apple_cash.png',
  };

  const getPaymentMethodIconSrc = (label) => paymentMethodIconMap[label] || 'icons/bank.png';

  const createAcceptedPaymentChip = (label) => {
    const iconSrc = getPaymentMethodIconSrc(label);
    return `
      <button type="button" class="walkin-payment-chip">
        <img src="${iconSrc}" alt="" aria-hidden="true" />
        ${label}
      </button>
    `;
  };

  const getAcceptedPaymentSelection = () => {
    if (!acceptedPaymentChipList) return [];

    return Array.from(acceptedPaymentChipList.querySelectorAll('.walkin-payment-chip'))
      .map((button) => button.textContent?.replace(/\s+/g, ' ').trim() || '')
      .filter(Boolean);
  };

  let acceptedPaymentMethods = getAcceptedPaymentSelection();
  if (!acceptedPaymentMethods.length) {
    acceptedPaymentMethods = getGeneralPaymentMethods().slice(0, 4);
  }

  const syncHoursDayState = (row) => {
    const toggle = row.querySelector('[data-hours-day-toggle]');
    const start = row.querySelector('[data-hours-start]');
    const end = row.querySelector('[data-hours-end]');
    const isEnabled = Boolean(toggle?.checked);

    row.classList.toggle('is-disabled', !isEnabled);
    if (start) start.disabled = !isEnabled;
    if (end) end.disabled = !isEnabled;
  };

  const syncAllHoursDayStates = () => {
    hoursDayRows.forEach((row) => syncHoursDayState(row));
  };

  const buildHoursSummary = () => {
    const selected = hoursDayRows
      .map((row) => ({
        row,
        day: row.getAttribute('data-day-name') || '',
        index: hoursDayOrder.indexOf(row.getAttribute('data-day-name') || ''),
        start: row.querySelector('[data-hours-start]')?.value || '',
        end: row.querySelector('[data-hours-end]')?.value || '',
        enabled: Boolean(row.querySelector('[data-hours-day-toggle]')?.checked),
      }))
      .filter((item) => item.enabled)
      .sort((a, b) => a.index - b.index);

    if (!selected.length) return 'Closed';

    const groups = [];
    let group = [selected[0]];

    for (let i = 1; i < selected.length; i += 1) {
      const prev = selected[i - 1];
      const current = selected[i];
      const isContiguous = current.index === prev.index + 1;
      const sameRange = current.start === prev.start && current.end === prev.end;

      if (isContiguous && sameRange) {
        group.push(current);
      } else {
        groups.push(group);
        group = [current];
      }
    }

    groups.push(group);

    const formatGroupDays = (items) => {
      if (items.length === 1) return items[0].day;
      return `${items[0].day}-${items[items.length - 1].day}`;
    };

    return groups
      .map((items) => `${formatGroupDays(items)}, ${formatTime(items[0].start)} - ${formatTime(items[0].end)}`)
      .join('; ');
  };

  const syncHoursSummary = () => {
    if (!hoursSummary) return;
    hoursSummary.textContent = buildHoursSummary();
  };

  const captureHoursState = () => hoursDayRows.map((row) => ({
    checked: Boolean(row.querySelector('[data-hours-day-toggle]')?.checked),
    start: row.querySelector('[data-hours-start]')?.value || '',
    end: row.querySelector('[data-hours-end]')?.value || '',
  }));

  const applyHoursState = (snapshot) => {
    snapshot.forEach((state, index) => {
      const row = hoursDayRows[index];
      if (!row) return;

      const toggle = row.querySelector('[data-hours-day-toggle]');
      const start = row.querySelector('[data-hours-start]');
      const end = row.querySelector('[data-hours-end]');

      if (toggle) toggle.checked = state.checked;
      if (start) start.value = state.start;
      if (end) end.value = state.end;
      syncHoursDayState(row);
    });

    syncHoursSummary();
  };

  const syncRoleVisibility = () => {
    const currentRole = roleInputs.find((input) => input.checked)?.value || 'merchant_atm';

    roleDependentSections.forEach((section) => {
      const allowedRoles = roleTargets(section.getAttribute('data-role-visibility') || '');
      section.hidden = !allowedRoles.includes(currentRole);
    });

    refreshIcons();
  };

  const defaultRole = roleInputs.find((i) => i.value === 'merchant_atm') || roleInputs[0];
  if (defaultRole) {
    roleInputs.forEach((i) => (i.checked = false));
    defaultRole.checked = true;
  }

  const activate = (name) => {
    tabs.forEach((tab) => {
      tab.classList.toggle('active', tab.getAttribute('data-setting-tab') === name);
    });

    panels.forEach((panel) => {
      panel.classList.toggle('active', panel.getAttribute('data-setting-panel') === name);
    });

    refreshIcons();
  };

  const activateAssetFeeTab = (name) => {
    assetFeeTabs.forEach((tab) => {
      const isActive = tab.getAttribute('data-asset-fee-tab') === name;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });

    assetFeePanels.forEach((panel) => {
      panel.classList.toggle('active', panel.getAttribute('data-asset-fee-panel') === name);
    });
  };

  const openQrModal = (event) => {
    if (event) event.preventDefault();
    if (!qrModal) return;

    const trigger = event?.currentTarget;
    const href = trigger?.getAttribute('href');
    if (href && qrIframe) {
      qrIframe.src = href;
    }

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

  const syncWalkinModeOptions = () => {
    walkinModeOptions.forEach((option) => {
      const input = option.querySelector('input[name="walkinMode"]');
      option.classList.toggle('active', Boolean(input?.checked));
    });
  };

  const syncWalkinSetupState = () => {
    if (!walkinSetupCard || !walkinSetupCollapse || !walkinSetupToggle) return;

    const isOpen = walkinSetupCollapse.classList.contains('show');
    walkinSetupCard.classList.toggle('walkin-card--collapsed', !isOpen);
    walkinSetupToggle.querySelector('span')?.replaceChildren(document.createTextNode(isOpen ? 'Collapse' : 'Expand'));
    walkinSetupToggle.setAttribute('aria-expanded', String(isOpen));
  };

  const syncAssetFeeGroupState = () => {
    if (!assetFeeGroup || !assetFeeGroupCollapse || !assetFeeGroupToggle) return;

    const isOpen = assetFeeGroupCollapse.classList.contains('show');
    assetFeeGroup.classList.toggle('asset-fee-group--collapsed', !isOpen);
    assetFeeGroupToggle
      .querySelector('span')
      ?.replaceChildren(document.createTextNode(isOpen ? 'Collapse' : 'Expand'));
    assetFeeGroupToggle.setAttribute('aria-expanded', String(isOpen));
  };

  const syncPaymentPriorityOptions = () => {
    if (!paymentPrioritySelect) return;

    const selectedLabels = [];
    const seen = new Set();

    paymentChoiceInputs.forEach((input) => {
      if (!input.checked) return;
      const label = input.closest('.payment-choice')?.querySelector('span')?.textContent?.trim() || '';
      if (!label || seen.has(label)) return;
      seen.add(label);
      selectedLabels.push(label);
    });

    paymentPrioritySelect.innerHTML = '';

    if (!selectedLabels.length) {
      const option = document.createElement('option');
      option.value = '';
      option.textContent = 'No payment methods selected';
      paymentPrioritySelect.appendChild(option);
      paymentPrioritySelect.disabled = true;
      return;
    }

    paymentPrioritySelect.disabled = false;
    selectedLabels.forEach((label, index) => {
      const option = document.createElement('option');
      option.value = label;
      option.textContent = label;
      option.selected = index === 0;
      paymentPrioritySelect.appendChild(option);
    });
  };

  const syncAcceptedPaymentChips = () => {
    if (!acceptedPaymentChipList) return;

    acceptedPaymentChipList.innerHTML = acceptedPaymentMethods.map((label) => createAcceptedPaymentChip(label)).join('');
    refreshIcons();
  };

  const renderAcceptedPaymentOptions = () => {
    if (!acceptedPaymentOptions) return;

    const labels = getGeneralPaymentMethods();
    acceptedPaymentOptions.innerHTML = labels
      .map((label) => {
        const iconSrc = getPaymentMethodIconSrc(label);
        const id = `accepted-payment-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        const checked = acceptedPaymentMethods.includes(label) ? 'checked' : '';

        return `
          <label class="accepted-payment-option" for="${id}">
            <input type="checkbox" id="${id}" value="${label}" ${checked} />
            <span class="accepted-payment-option-icon">
              <img src="${iconSrc}" alt="" aria-hidden="true" />
            </span>
            <span>${label}</span>
          </label>
        `;
      })
      .join('');

    refreshIcons();
  };

  const openAcceptedPaymentModal = (event) => {
    if (event) event.preventDefault();
    if (!acceptedPaymentModal) return;

    renderAcceptedPaymentOptions();
    acceptedPaymentModal.classList.add('active');
    acceptedPaymentModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeAcceptedPaymentModal = () => {
    if (!acceptedPaymentModal) return;

    acceptedPaymentModal.classList.remove('active');
    acceptedPaymentModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const saveAcceptedPaymentMethods = () => {
    if (!acceptedPaymentOptions) return;

    const checkedLabels = Array.from(
      acceptedPaymentOptions.querySelectorAll('input[type="checkbox"]:checked'),
    )
      .map((input) => input.value.trim())
      .filter(Boolean);

    if (!checkedLabels.length) return;

    acceptedPaymentMethods = checkedLabels;
    syncAcceptedPaymentChips();
    closeAcceptedPaymentModal();
  };

  let hoursStateSnapshot = captureHoursState();

  const openHoursModal = (event) => {
    if (event) event.preventDefault();
    if (!hoursModal) return;

    hoursStateSnapshot = captureHoursState();
    hoursModal.classList.add('active');
    hoursModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    refreshIcons();
  };

  const closeHoursModal = (restoreSnapshot = true) => {
    if (!hoursModal) return;

    if (restoreSnapshot && hoursStateSnapshot) {
      applyHoursState(hoursStateSnapshot);
    }

    hoursModal.classList.remove('active');
    hoursModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const saveHoursModal = () => {
    syncHoursSummary();
    hoursStateSnapshot = captureHoursState();
    closeHoursModal(false);
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activate(tab.getAttribute('data-setting-tab') || 'general'));
  });

  assetFeeTabs.forEach((tab) => {
    tab.addEventListener('click', () => activateAssetFeeTab(tab.getAttribute('data-asset-fee-tab') || 'online'));
  });

  activateAssetFeeTab(assetFeeTabs.find((tab) => tab.classList.contains('active'))?.getAttribute('data-asset-fee-tab') || 'online');

  openSettingTabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activate(button.getAttribute('data-open-setting-tab') || 'general');
    });
  });

  walkinSetupToggle?.addEventListener('click', (event) => {
    event.preventDefault();
    if (walkinSetupCollapseInstance) {
      walkinSetupCollapseInstance.toggle();
      return;
    }

    if (!walkinSetupCollapse || !walkinSetupCard) return;
    const isOpen = walkinSetupCollapse.classList.contains('show');
    walkinSetupCollapse.classList.toggle('show', !isOpen);
    walkinSetupCard.classList.toggle('walkin-card--collapsed', isOpen);
    walkinSetupToggle.querySelector('span')?.replaceChildren(document.createTextNode(isOpen ? 'Expand' : 'Collapse'));
    walkinSetupToggle.setAttribute('aria-expanded', String(!isOpen));
  });

  assetFeeGroupToggle?.addEventListener('click', (event) => {
    event.preventDefault();
    if (assetFeeGroupCollapseInstance) {
      assetFeeGroupCollapseInstance.toggle();
      return;
    }

    if (!assetFeeGroupCollapse || !assetFeeGroup) return;
    const isOpen = assetFeeGroupCollapse.classList.contains('show');
    assetFeeGroupCollapse.classList.toggle('show', !isOpen);
    assetFeeGroup.classList.toggle('asset-fee-group--collapsed', isOpen);
    assetFeeGroupToggle.querySelector('span')?.replaceChildren(document.createTextNode(isOpen ? 'Expand' : 'Collapse'));
    assetFeeGroupToggle.setAttribute('aria-expanded', String(!isOpen));
  });

  paymentChoiceInputs.forEach((input) => {
    input.addEventListener('change', syncPaymentPriorityOptions);
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

  openHoursButtons.forEach((button) => {
    button.addEventListener('click', openHoursModal);
  });

  closeHoursButtons.forEach((button) => {
    button.addEventListener('click', () => closeHoursModal(true));
  });

  hoursModal?.addEventListener('click', (event) => {
    if (event.target === hoursModal) closeHoursModal(true);
  });

  saveHoursButton?.addEventListener('click', saveHoursModal);

  openAcceptedPaymentButtons.forEach((button) => {
    button.addEventListener('click', openAcceptedPaymentModal);
  });

  closeAcceptedPaymentButtons.forEach((button) => {
    button.addEventListener('click', closeAcceptedPaymentModal);
  });

  acceptedPaymentModal?.addEventListener('click', (event) => {
    if (event.target === acceptedPaymentModal) closeAcceptedPaymentModal();
  });

  saveAcceptedPaymentButton?.addEventListener('click', saveAcceptedPaymentMethods);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeQrModal();
      closeHoursModal(true);
      closeAcceptedPaymentModal();
      closeJoinProgramModal();
      closePinModal();
      closeCancelPolicyModal();
      closeCancelConfirmModal();
      closeRepaymentModal();
      closePayoutModal();
    }
  });

  walkinModeOptions.forEach((option) => {
    const input = option.querySelector('input[name="walkinMode"]');
    if (!input) return;

    input.addEventListener('change', syncWalkinModeOptions);
    option.addEventListener('click', () => {
      if (!input.checked) {
        input.checked = true;
      }
      syncWalkinModeOptions();
    });
  });

  roleInputs.forEach((input) => {
    input.addEventListener('change', syncRoleVisibility);
  });

  hoursDayRows.forEach((row) => {
    const toggle = row.querySelector('[data-hours-day-toggle]');
    toggle?.addEventListener('change', () => {
      syncHoursDayState(row);
      syncHoursSummary();
    });

    row.querySelectorAll('[data-hours-start], [data-hours-end]').forEach((input) => {
      input.addEventListener('change', syncHoursSummary);
    });
  });

  walkinSetupCollapse?.addEventListener('shown.bs.collapse', syncWalkinSetupState);
  walkinSetupCollapse?.addEventListener('hidden.bs.collapse', syncWalkinSetupState);
  assetFeeGroupCollapse?.addEventListener('shown.bs.collapse', syncAssetFeeGroupState);
  assetFeeGroupCollapse?.addEventListener('hidden.bs.collapse', syncAssetFeeGroupState);

  const paymentCollapseEl = document.getElementById('receive-on-behalf-payment-collapse');
  const paymentToggleEl = document.getElementById('receive-on-behalf-payment-toggle');
  const syncPaymentCollapseIcon = () => {
    if (!paymentCollapseEl || !paymentToggleEl) return;
    const isOpen = paymentCollapseEl.classList.contains('show');
    const icon = paymentToggleEl.querySelector('.asset-fee-group__toggle .asset-fee-group__toggle-icon');
    if (icon) icon.style.transform = isOpen ? '' : 'rotate(-180deg)';
    paymentToggleEl.setAttribute('aria-expanded', String(isOpen));
  };
  paymentCollapseEl?.addEventListener('shown.bs.collapse', syncPaymentCollapseIcon);
  paymentCollapseEl?.addEventListener('hidden.bs.collapse', syncPaymentCollapseIcon);

  activate('general');
  syncRoleVisibility();
  syncAllHoursDayStates();
  syncHoursSummary();
  syncWalkinModeOptions();
  syncPaymentPriorityOptions();
  syncAcceptedPaymentChips();
  syncWalkinSetupState();
  syncAssetFeeGroupState();
  syncBehalfState();

  // Topnav tab switching
  const topnavTabs = Array.from(document.querySelectorAll('[data-topnav-tab]'));
  const topnavPanels = Array.from(document.querySelectorAll('[data-topnav-panel]'));

  const activateTopnavTab = (name) => {
    topnavTabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.topnavTab === name));
    topnavPanels.forEach((panel) => {
      panel.style.display = panel.dataset.topnavPanel === name ? '' : 'none';
    });
    refreshIcons();
    refreshTooltips();
  };

  topnavTabs.forEach((tab) => {
    tab.addEventListener('click', (event) => {
      if (event.target.closest('.topnav-info-dot')) return;
      activateTopnavTab(tab.dataset.topnavTab || 'settings');
    });
  });

  activateTopnavTab('settings');

  // History filter buttons
  const historyFilterBtns = Array.from(document.querySelectorAll('[data-history-filter]'));
  historyFilterBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      if (event.target.closest('.history-filter-info')) return;
      historyFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // History view toggle (grid / table)
  const historySection = document.getElementById('history-list-section');
  const historyViewBtns = Array.from(document.querySelectorAll('[data-history-view]'));
  historyViewBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      historyViewBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const isTable = btn.dataset.historyView === 'table';
      historySection?.classList.toggle('is-table', isTable);
      refreshIcons();
    });
  });
});
