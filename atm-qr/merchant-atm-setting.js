window.addEventListener('DOMContentLoaded', () => {
  const refreshIcons = () => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  };

  refreshIcons();

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
  const assetFeeGroupCollapseInstance =
    assetFeeGroupCollapse && window.bootstrap?.Collapse
      ? window.bootstrap.Collapse.getOrCreateInstance(assetFeeGroupCollapse, { toggle: false })
      : null;
  const params = new URLSearchParams(window.location.search);
  const atmType = params.get('atmType') === 'mobile' ? 'mobile' : 'merchant';
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
    const currentRole = roleInputs.find((input) => input.checked)?.value || 'combo_atm';

    roleDependentSections.forEach((section) => {
      const allowedRoles = roleTargets(section.getAttribute('data-role-visibility') || '');
      section.hidden = !allowedRoles.includes(currentRole);
    });

    refreshIcons();
  };

  if (roleInputs[0] && roleInputs[1]) {
    roleInputs[0].checked = false;
    roleInputs[1].checked = false;
    if (roleInputs[2]) roleInputs[2].checked = true;
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

  activate('general');
  syncRoleVisibility();
  syncAllHoursDayStates();
  syncHoursSummary();
  syncWalkinModeOptions();
  syncPaymentPriorityOptions();
  syncAcceptedPaymentChips();
  syncWalkinSetupState();
  syncAssetFeeGroupState();
});
