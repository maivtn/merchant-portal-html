const purposes = [
  { id: 'food', icon: 'shopping-basket', label: 'Food Support', imageUrl: '../assets/charity/food.png' },
  { id: 'children', icon: 'school', label: 'Children Education', imageUrl: '../assets/charity/education-children.png' },
  { id: 'healthcare', icon: 'activity', label: 'Healthcare & Medicine', imageUrl: '../assets/charity/medicine.png' },
  { id: 'elderly', icon: 'heart', label: 'Elderly Care', imageUrl: '../assets/charity/elderly.png' },
  { id: 'disaster', icon: 'flame', label: 'Disaster Relief', imageUrl: '../assets/charity/disaster-lelief.png' },
  { id: 'scholarship', icon: 'graduation-cap', label: 'Scholarship Programs', imageUrl: '../assets/charity/scholarship.png' },
];

const paymentMethods = [
  { id: 'USDV', available: '79,000.00', image: 'https://raw.githubusercontent.com/vlink-group/VlinkPay/refs/heads/main/icon/assets/new-icon/USDV.png' },
  { id: 'USDT', available: '79,000.00', image: 'https://raw.githubusercontent.com/vlink-group/VlinkPay/refs/heads/main/icon/assets/new-icon/USDT.png' },
  { id: 'USD', available: '79,000.00', image: 'https://raw.githubusercontent.com/vlink-group/VlinkPay/refs/heads/main/icon/assets/new-icon/Usd.png' },
  { id: 'BTC', available: '100,000.25', image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png' },
  { id: 'VND', available: '50,000,000', image: 'https://raw.githubusercontent.com/vlink-group/VlinkPay/refs/heads/main/icon/assets/new-icon/Dong.png' },
];

const mockBatches = [
  { id: 'CH-2025-02', purpose: 'Children Education', amount: 5000, currency: 'USD', date: 'Oct 15, 2025', status: 'In Distribution', distributed: 3000 },
  { id: 'CH-2025-01', purpose: 'Scholarship Programs', amount: 5000, currency: 'USD', date: 'Oct 15, 2025', status: 'Distributed', distributed: 5000 },
  { id: 'CH-2025-03', purpose: 'Children Education', amount: 50000000, currency: 'VND', date: 'Oct 15, 2025', status: 'Completed', distributed: 50000000 }
];

const mockDistributions = {
  'CH-2025-02': [
    { id: 'D-03', batchId: 'CH-2025-02', recipient: 'Con Dao Primary School', address: 'Con Dao, BRVT', amount: 3000, currency: 'USD', date: 'Oct 20, 2025 08:30', status: 'Distributed', hasProof: true }
  ],
  'CH-2025-01': [
    { id: 'D-01', batchId: 'CH-2025-01', recipient: 'Hoi Khuyen Hoc Xa Thanh My...', address: 'Thanh My Tay, An Giang', amount: 3000, currency: 'USD', date: 'Oct 30, 2025 09:00', status: 'Distributed', hasProof: true },
    { id: 'D-02', batchId: 'CH-2025-01', recipient: 'Scholarship Support Batch', address: 'VNUHCM', amount: 2000, currency: 'USD', date: 'Oct 18, 2025 14:00', status: 'Distributed', hasProof: true }
  ],
  'CH-2025-03': [
    { id: 'D-04', batchId: 'CH-2025-03', recipient: 'Mai Am Tinh Thuong', address: 'District 4, HCMC', amount: 50000000, currency: 'VND', date: 'Oct 25, 2025 10:00', status: 'Distributed', hasProof: false }
  ]
};

const mockGiftCards = [
  { id: 'GC-01', maskedNumber: '7624 **** **** 7563', value: 50, currency: 'USD', createdDate: 'Oct 15, 2025', status: 'Available' },
  { id: 'GC-02', maskedNumber: '7624 **** **** 7564', value: 50, currency: 'USD', createdDate: 'Oct 15, 2025', status: 'Available' },
  { id: 'GC-03', maskedNumber: '7624 **** **** 7562', value: 5000000, currency: 'VND', createdDate: 'Oct 15, 2025', status: 'Gifted', recipientName: 'Nguyen A', recipientEmail: 'nguyen_a@example.com' },
  { id: 'GC-04', maskedNumber: '7624 **** **** 7561', value: 50, currency: 'USD', createdDate: 'Oct 15, 2025', status: 'Redeemed', redeemerName: 'Nguyen A', redeemerId: '1234 **** **** 6789', redeemerAddress: '568 National Highway 91, Thot Not, Can Tho', redeemedDate: 'Oct 30, 2025 09:00', redeemedAmount: 50, merchant: 'Phuong Nam Bookstore', location: 'Can Tho', hasProof: true }
];

const mockHistoryTransactions = [
  { id: 'TX-2411-001', type: 'E-Voucher', amount: 5000, currency: 'USD', date: 'Nov 27, 2024 09:09 PM', status: 'Completed', month: 'November, 2024' },
  { id: 'TX-2411-002', type: 'E-Gift Card', amount: 1200, currency: 'USD', date: 'Nov 18, 2024 01:15 PM', status: 'Completed', month: 'November, 2024' },
  { id: 'TX-2411-003', type: 'E-Voucher', amount: 2500000, currency: 'VND', date: 'Nov 08, 2024 10:20 AM', status: 'Completed', month: 'November, 2024' },
  { id: 'TX-2410-001', type: 'E-Gift Card', amount: 300, currency: 'USD', date: 'Oct 21, 2024 04:45 PM', status: 'Completed', month: 'October, 2024' },
  { id: 'TX-2410-002', type: 'E-Voucher', amount: 750, currency: 'USD', date: 'Oct 12, 2024 11:24 AM', status: 'Completed', month: 'October, 2024' },
  { id: 'TX-2409-001', type: 'E-Gift Card', amount: 5000000, currency: 'VND', date: 'Sep 22, 2024 08:10 AM', status: 'Completed', month: 'September, 2024' },
  { id: 'TX-2409-002', type: 'E-Voucher', amount: 1250, currency: 'USD', date: 'Sep 06, 2024 03:30 PM', status: 'Completed', month: 'September, 2024' }
];

const state = {
  viewMode: 'buy',
  activeTab: 'all',
  isSuccess: false,
  selectedBatch: null,
  selectedDist: null,
  selectedCard: null,
  selectedTransaction: null,
  proofKind: 'voucher',
  proofReturnMode: null,
  buyStepCollapsed: {
    type: false,
    details: false,
    payment: false,
  },
  batchTab: 'overview',
  cardSubTab: 'egift',
  filterStatus: 'ALL',
  cardFilterStatus: 'ALL',
  historyFilter: 'ALL',
  flowType: 'voucher',
  purpose: 'food',
  amount: '',
  currency: 'USD',
  paymentMethod: 'USDV',
  cardValue: '',
  quantity: 1,
  sendDirectly: false,
  recipientName: '',
  recipientEmail: ''
};

const app = document.getElementById('app');
let shellReady = false;
let currentRouteKey = '';
let tabsSwiper = null;

function icon(name, classes = 'w-4 h-4') { return `<i data-lucide="${name}" class="${classes}"></i>`; }
function escapeHtml(str) { return String(str ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }
function fillTemplate(id, values = {}) {
  let html = document.getElementById(id)?.innerHTML || '';
  for (const [key, value] of Object.entries(values)) {
    html = html.replaceAll(`{{${key}}}`, String(value ?? ''));
  }
  return html;
}
function formatNumber(val) {
  if (val === null || val === undefined || val === '') return '';
  const parts = String(val).replace(/,/g, '').split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}
function hashString(str) {
  let h = 0;
  for (let i = 0; i < String(str).length; i += 1) {
    h = ((h << 5) - h) + String(str).charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}
function buildRedeemCode(seed) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let n = hashString(seed || 'CHARITY');
  let out = '';
  for (let i = 0; i < 8; i += 1) {
    n = (n * 1664525 + 1013904223) >>> 0;
    out += chars[n % chars.length];
  }
  return `${out.slice(0, 4)}-${out.slice(4, 8)}`;
}
function buildQrSvg(seed) {
  const size = 29;
  const scale = 8;
  const offset = 4;
  let modules = '';
  const dark = (x, y) => {
    const n = hashString(`${seed}:${x}:${y}`);
    return (n % 3 === 0) || ((x * 7 + y * 11 + n) % 5 === 0);
  };
  const addFinder = (x, y) => {
    modules += `<rect x="${x * scale}" y="${y * scale}" width="${7 * scale}" height="${7 * scale}" fill="#111" />`;
    modules += `<rect x="${(x + 1) * scale}" y="${(y + 1) * scale}" width="${5 * scale}" height="${5 * scale}" fill="#fff" />`;
    modules += `<rect x="${(x + 2) * scale}" y="${(y + 2) * scale}" width="${3 * scale}" height="${3 * scale}" fill="#111" />`;
  };
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const inTopLeft = x < 7 && y < 7;
      const inTopRight = x >= size - 7 && y < 7;
      const inBottomLeft = x < 7 && y >= size - 7;
      if (inTopLeft || inTopRight || inBottomLeft) continue;
      if (x === 6 || y === 6 || x === size - 7 || y === size - 7 || x === 12 || y === 12) continue;
      if (dark(x, y)) modules += `<rect x="${x * scale}" y="${y * scale}" width="${scale}" height="${scale}" fill="#111" />`;
    }
  }
  addFinder(0, 0);
  addFinder(size - 7, 0);
  addFinder(0, size - 7);
  const view = size * scale;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${view}" height="${view}" viewBox="0 0 ${view} ${view}" shape-rendering="crispEdges"><rect width="${view}" height="${view}" fill="#fff"/><g transform="translate(${offset * scale} ${offset * scale})">${modules}</g></svg>`)}`
}
function getNumericValue(val) {
  const n = Number(String(val || '0').replace(/,/g, ''));
  return Number.isFinite(n) ? n : 0;
}
function numericAmount() { return getNumericValue(state.amount); }
function numericCardValue() { return getNumericValue(state.cardValue); }
function platformFee() { return state.flowType === 'voucher' ? numericAmount() * 0.015 : 0; }
function voucherTotal() { return numericAmount() + platformFee(); }
function cardTotal() { return numericCardValue() * state.quantity; }
function canProceedToPayment() {
  if (state.flowType === 'voucher') return !!state.purpose && numericAmount() > 0;
  if (state.flowType === 'card') return numericCardValue() > 0 && state.quantity >= 1 && (!state.sendDirectly || state.recipientEmail.includes('@'));
  return false;
}
function badgeClasses(status) {
  switch (status) {
    case 'In Distribution': return 'bg-[#fef3c7] text-[#92400e] border border-[#f59e0b]/25';
    case 'Distributed': return 'bg-[#fff7ed] text-[#c2410c] border border-[#fdba74]/40';
    case 'Completed': return 'bg-[#ecfdf5] text-[#166534] border border-[#86efac]/35';
    case 'Redeemed': return 'bg-[#f5f5f4] text-[#57534e] border border-[#d6d3d1]';
    case 'Available': return 'bg-[#fffaf0] text-[#92400e] border border-[#e0e0e0]';
    case 'Gifted': return 'bg-[#fff7ed] text-[#9a3412] border border-[#fdba74]/35';
    default: return 'bg-[#fffaf0] text-[#757575] border border-[#e0e0e0]';
  }
}
function getHeaderTitle() {
  if (state.viewMode === 'transactionDetail') return 'Transaction Detail';
  if (state.viewMode === 'history') return 'Transaction History';
  switch (state.viewMode) {
    case 'buy': return state.activeTab === 'card' ? 'Buy Charity Gift Cards' : 'Gift Charity';
    case 'list': return 'Charity E-Voucher';
    case 'batch': return 'Batch Details';
    case 'dist': return 'Distribution Details';
    case 'cardList': return 'Charity Gift Cards';
    case 'cardDetail': return 'E-Gift Cards Details';
    case 'qr': return 'Gift Via QR Code';
    case 'proof': return 'Uploaded Proof';
    default: return 'Gift Charity';
  }
}
function routeKey() {
  return [state.viewMode, state.activeTab, state.batchTab, state.cardSubTab, state.selectedBatch?.id || '', state.selectedCard?.id || '', state.selectedDist?.id || '', state.selectedTransaction?.id || ''].join('|');
}
function showTabs() { return ['buy', 'list', 'cardList', 'history'].includes(state.viewMode); }
function panel(step, title, body, id='', extra = {}) {
  return fillTemplate('tpl-panel', {
    idAttr: id ? `id="${id}"` : '',
    step,
    title: escapeHtml(title),
    body,
    collapseButton: extra.collapseButton || '',
    bodyClass: extra.bodyClass || ''
  });
}

function buyPanel(step, title, body, key, id='') {
  const collapsed = !!state.buyStepCollapsed[key];
  const collapseButton = key === 'payment'
    ? ''
    : `
    <button
      type="button"
      data-action="toggle-buy-step"
      data-step="${key}"
      aria-expanded="${String(!collapsed)}"
      aria-label="${collapsed ? 'Expand' : 'Collapse'} ${escapeHtml(title)}"
      class="grid h-8 w-8 place-items-center rounded-full border border-line bg-black/20 text-soft transition hover:border-gold/70 hover:text-gold"
    >
      ${icon(collapsed ? 'chevron-down' : 'chevron-up', 'h-4 w-4')}
    </button>`;
  return panel(step, title, body, id, {
    collapseButton,
    bodyClass: collapsed ? 'hidden' : ''
  });
}

function purposeMedia(item) {
  const img = item.imageUrl
    ? `<img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.label)}" class="h-8 w-8 object-contain" onerror="this.style.display='none'; this.nextElementSibling?.classList.remove('hidden')">`
    : '';
  const fallback = `<span class="${item.imageUrl ? 'hidden' : ''}">${icon(item.icon, 'w-6 h-6')}</span>`;
  return `${img}${fallback}`;
}

function ensureShell() {
  if (shellReady) return;
  app.innerHTML = `
    <header id="header-slot" class="sticky top-0 z-30 backdrop-blur-xl"></header>
    <div id="tabs-slot"></div>
    <main id="main-slot" class="py-4 pb-24"></main>
    <div id="modal-slot"></div>`;
  shellReady = true;
}

function destroyTabsSwiper() {
  if (tabsSwiper && !tabsSwiper.destroyed) {
    tabsSwiper.destroy(true, true);
  }
  tabsSwiper = null;
}

function renderHeader() {
  const el = document.getElementById('header-slot');
  const showBack = ['batch','dist','cardDetail','qr','proof','transactionDetail'].includes(state.viewMode);
  el.innerHTML = `
    <div class="flex items-center justify-between py-4">
      ${showBack ? `<div class="w-18 md:w-28"><button data-action="back" class="btn-action-flat btn-action-sm inline-flex items-center gap-2 text-sm font-bold">${icon('arrow-left','w-4 h-4')} Back</button></div>` : ''}
      <h1 class="flex-1 text-center md:text-left text-[16px] font-extrabold uppercase tracking-[0.18em] text-cream md:text-[20px]">${getHeaderTitle()}</h1>
      ${showBack ? '<div class="w-18 md:w-28"></div>' : ''}
    </div>`;
}

function renderTabs() {
  const slot = document.getElementById('tabs-slot');
  if (!showTabs()) {
    destroyTabsSwiper();
    slot.innerHTML = '';
    return;
  }
  const list = [
    { id: 'all', label: 'Buy Gift Charity' },
    { id: 'voucher', label: 'Charity E-Voucher' },
    { id: 'card', label: 'Charity E-Gift Card' },
    { id: 'history', label: 'Transaction History' },
  ];
  slot.innerHTML = `
    <div class="sticky top-[73px] z-20 border-b border-line">
      <div class="relative px-10 py-3 pb-0 sm:px-12 md:px-0">
        <button
          type="button"
          data-action="tabs-prev"
          aria-label="Scroll tabs left"
          class="tabs-nav-button tabs-nav-button-left md:hidden"
        >
          ${icon('chevron-left', 'h-4 w-4')}
        </button>
        <div class="tabs-swiper swiper">
          <div class="swiper-wrapper">
            ${list.map(tab => `
              <div class="swiper-slide !w-auto">
                <button
                  data-action="switch-tab"
                  data-tab="${tab.id}"
                  class="relative whitespace-nowrap px-3 pb-4 pt-1 text-[12px] font-semibold uppercase tracking-[0.12em] transition sm:text-[14px] ${state.activeTab === tab.id ? 'text-gold' : 'text-soft hover:text-cream'}"
                >
                  ${tab.label}
                  ${state.activeTab === tab.id ? '<span class="absolute inset-x-0 bottom-0 h-0.5 bg-gold"></span>' : ''}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
        <button
          type="button"
          data-action="tabs-next"
          aria-label="Scroll tabs right"
          class="tabs-nav-button tabs-nav-button-right md:hidden"
        >
          ${icon('chevron-right', 'h-4 w-4')}
        </button>
      </div>
    </div>`;
  destroyTabsSwiper();
  if (window.Swiper) {
    const tabsEl = slot.querySelector('.tabs-swiper');
    const prevEl = slot.querySelector('[data-action="tabs-prev"]');
    const nextEl = slot.querySelector('[data-action="tabs-next"]');
    tabsSwiper = new window.Swiper(tabsEl, {
      slidesPerView: 'auto',
      spaceBetween: 16,
      freeMode: true,
      watchOverflow: true,
      slideToClickedSlide: true,
      speed: 350,
      navigation: {
        prevEl,
        nextEl,
      }
    });
    const activeIndex = list.findIndex(tab => tab.id === state.activeTab);
    if (activeIndex >= 0) tabsSwiper.slideTo(activeIndex, 0);
  }
  safeCreateIcons();
}

function buyRouteShell() {
  return fillTemplate('tpl-buy-shell');
}

function giftTypeContent() {
  return fillTemplate('tpl-gift-type', {
    voucherClass: state.flowType === 'voucher' ? 'border-gold bg-gold/5 shadow-gold' : 'border-line hover:-translate-y-1 hover:border-gold/70 hover:bg-gold/5',
    cardClass: state.flowType === 'card' ? 'border-gold bg-gold/5 shadow-gold' : 'border-line hover:-translate-y-1 hover:border-gold/70 hover:bg-gold/5',
    voucherIconClass: state.flowType === 'voucher' ? 'bg-gold/10 text-gold' : 'bg-zinc-900 text-soft',
    cardIconClass: state.flowType === 'card' ? 'bg-gold/10 text-gold' : 'bg-zinc-900 text-soft',
    voucherMedia: `<img src="../assets/charity/charity-voucher.png" alt="Charity Voucher" class="h-8 w-8 object-contain" onerror="this.style.display='none'; this.nextElementSibling?.classList.remove('hidden')"><span class="hidden">${icon('package','w-8 h-8')}</span>`,
    cardMedia: `<img src="../assets/charity/charity-gift-card.png" alt="Charity Gift Card" class="h-8 w-8 object-contain" onerror="this.style.display='none'; this.nextElementSibling?.classList.remove('hidden')"><span class="hidden">${icon('gift','w-8 h-8')}</span>`
  });
}

function voucherDetailsContent() {
  return fillTemplate('tpl-voucher-details', {
    currencyIcon: icon('chevron-down','w-4 h-4')
  });
}

function cardDetailsContent() {
  return fillTemplate('tpl-card-details', {
    currencyIcon: icon('chevron-down','w-4 h-4'),
    minusIcon: icon('minus','w-4 h-4'),
    plusIcon: icon('plus','w-4 h-4'),
    checkIcon: icon('check','w-3 h-3')
  });
}

function paymentContent() {
  return fillTemplate('tpl-payment', {
    shieldIcon: icon('shield-check','w-5 h-5')
  });
}

function buildBuyView() {
  const main = document.getElementById('main-slot');
  main.innerHTML = buyRouteShell();
  document.getElementById('buy-step-type').innerHTML = buyPanel('01', 'Gift Type', giftTypeContent(), 'type');
  document.getElementById('buy-step-details').innerHTML = buyPanel('02', state.flowType === 'card' ? 'Gift Card Details' : 'Donation Details', state.flowType === 'card' ? cardDetailsContent() : voucherDetailsContent(), 'details');
  document.getElementById('buy-step-payment').innerHTML =  buyPanel('03', 'Payment Methods', paymentContent(), 'payment');
  syncBuyView();
}

function syncBuyView() {
  const purposeGrid = document.getElementById('purpose-grid');
  if (purposeGrid) {
    purposeGrid.innerHTML = purposes.map(item => `<button data-action="set-purpose" data-purpose="${item.id}" class="relative rounded-2xl border p-2 md:p-4 text-center transition ${state.purpose === item.id ? 'border-gold bg-gold/5 shadow-gold' : 'border-line hover:border-gold/70 hover:bg-gold/5'}"><div class="mx-auto mb-1 md:mb-3 grid h-11 w-11 place-items-center rounded-xl ${state.purpose === item.id ? 'bg-gold/10 text-gold' : 'bg-zinc-900 text-soft'}">${purposeMedia(item)}</div><div class="text-[11px] font-semibold uppercase tracking-[0.08em] sm:text-xs">${item.label}</div>${state.purpose === item.id ? `<div class="absolute right-3 top-3 grid h-4 w-4 place-items-center rounded-full bg-gold text-black">${icon('check','w-3 h-3')}</div>` : ''}</button>`).join('');
  }
  const currencySelect = document.getElementById('currency-select');
  if (currencySelect) currencySelect.value = state.currency;
  const amountInput = document.getElementById('amount-input');
  if (amountInput && amountInput !== document.activeElement) amountInput.value = state.amount;
  const cardValueInput = document.getElementById('card-value-input');
  if (cardValueInput && cardValueInput !== document.activeElement) cardValueInput.value = state.cardValue;
  const quantityValue = document.getElementById('quantity-value');
  if (quantityValue) quantityValue.textContent = String(state.quantity);
  const sendCheck = document.getElementById('send-directly-check');
  if (sendCheck) sendCheck.checked = state.sendDirectly;
  const recipientFields = document.getElementById('recipient-fields');
  if (recipientFields) recipientFields.classList.toggle('hidden', !state.sendDirectly);
  const recipientName = document.getElementById('recipient-name-input');
  if (recipientName && recipientName !== document.activeElement) recipientName.value = state.recipientName;
  const recipientEmail = document.getElementById('recipient-email-input');
  if (recipientEmail && recipientEmail !== document.activeElement) recipientEmail.value = state.recipientEmail;
  const paymentList = document.getElementById('payment-list');
  if (paymentList) {
    paymentList.innerHTML = paymentMethods.map(pm => `<button data-action="set-payment-method" data-method="${pm.id}" class="flex w-full items-center justify-between rounded-2xl border p-2 md:p-4 text-left transition ${state.paymentMethod === pm.id ? 'border-gold bg-gold/5 shadow-gold' : 'border-line hover:-translate-y-1 hover:border-gold/70'}"><div class="flex items-center gap-4"><div class="grid h-4 w-4 place-items-center rounded-full border ${state.paymentMethod === pm.id ? 'border-gold' : 'border-zinc-600'}">${state.paymentMethod === pm.id ? '<span class="h-2 w-2 rounded-full bg-gold"></span>' : ''}</div><div class="grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-line bg-white"><img src="${pm.image}" alt="${pm.id}" class="h-full w-full object-cover p-1"></div><span class="text-sm font-semibold text-cream sm:text-[15px]">${pm.id}</span></div><div class="text-right"><p class="mb-0.5 text-[10px] uppercase tracking-[0.12em] text-soft sm:text-[12px]">Available</p><p class="text-[12px] font-semibold text-gold sm:text-[14px]">${pm.id === 'BTC' ? '' : '$'}${pm.available}</p></div></button>`).join('');
  }
  const invoice = document.getElementById('invoice-summary');
  if (invoice) {
    invoice.innerHTML = state.flowType === 'voucher'
      ? `<div class="space-y-3 text-sm sm:text-[15px]"><div class="flex items-center justify-between text-zinc-300"><span>Donation Amount</span><strong class="text-cream">$${formatNumber(numericAmount())}</strong></div><div class="flex items-center justify-between text-zinc-300"><span>Platform Fee (1.5%)</span><strong class="text-gold">$${formatNumber(platformFee().toFixed(2))}</strong></div><div class="h-px bg-line"></div><div class="flex items-center justify-between"><strong class="text-sm uppercase tracking-[0.14em] text-cream">Total</strong><strong class="text-2xl font-bold text-gold">$${formatNumber(voucherTotal().toFixed(2))}</strong></div></div>`
      : `<div class="space-y-3 text-sm sm:text-[15px]"><div class="flex items-center justify-between text-zinc-300"><span>Gift Card Value</span><strong class="text-cream">$${formatNumber(numericCardValue())}</strong></div><div class="flex items-center justify-between text-zinc-300"><span>Quantity</span><strong class="text-cream">x${state.quantity}</strong></div><div class="h-px bg-line"></div><div class="flex items-center justify-between"><strong class="text-sm uppercase tracking-[0.14em] text-cream">Total</strong><strong class="text-2xl font-bold text-gold">$${formatNumber(cardTotal().toFixed(2))}</strong></div></div>`;
  }
  const btn = document.getElementById('confirm-payment-btn');
  if (btn) {
    const enabled = canProceedToPayment();
    btn.disabled = !enabled;
    btn.className = `mx-auto block rounded-lg px-12 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.16em] transition sm:text-[15px] ${enabled ? 'btn-action hover:scale-[1.02]' : 'btn-action-disabled cursor-not-allowed'}`;
    btn.textContent = 'Confirm Payment';
  }
  safeCreateIcons();
}

function buildVoucherList() {
  const rows = (state.filterStatus === 'ALL' ? mockBatches : mockBatches.filter(b => b.status === state.filterStatus)).map(batch => `<article class="rounded-2xl border border-line bg-panel p-3 md:p-5 shadow-luxury transition hover:-translate-y-1 hover:border-gold/60"><div class="grid gap-4 grid-cols-[1.5fr_1fr]"><div class="space-y-2"><div class="text-[13px] font-semibold tracking-wide text-cream sm:text-[15px]">Batch #${batch.id}</div><p class="text-sm text-zinc-300 sm:text-[15px]">${batch.purpose}</p><p class="text-[11px] tracking-[0.12em] text-zinc-500 sm:text-[13px]">Donated: ${batch.date}</p></div><div class="flex flex-col items-end"><div class="text-[13px] font-semibold text-gold sm:text-[15px]">${formatNumber(batch.amount)} ${batch.currency}</div><div class="mt-2"><span class="rounded px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] sm:text-[12px] ${badgeClasses(batch.status)}">${batch.status}</span></div><div class="mt-3"><button data-action="open-batch" data-batch-id="${batch.id}" class="btn-action-flat btn-action-sm inline-flex items-center gap-1.5 text-[11px] font-semibold sm:text-[13px]">${icon('eye','w-4 h-4')} View Details</button></div></div></div></article>`).join('');
  document.getElementById('main-slot').innerHTML = `<div class="space-y-5 animate-fadeUp"><div class="mb-2 flex items-center justify-between"><div class="relative"><select id="batch-filter" class="appearance-none rounded-md border border-line bg-black/30 py-2 pl-3 pr-8 text-[11px] font-semibold uppercase tracking-[0.12em] text-cream outline-none focus:border-gold sm:text-[13px]"><option value="ALL">All Statuses</option><option value="In Distribution">In Distribution</option><option value="Distributed">Distributed</option><option value="Completed">Completed</option></select><span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-soft">${icon('chevron-down','w-4 h-4')}</span></div><button data-action="new-donation" data-type="voucher" class="btn-action inline-flex items-center gap-2 rounded-md px-5 py-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-black transition hover:scale-105 sm:text-[13px]">${icon('plus','w-4 h-4')} Donate Now</button></div>${rows}</div>`;
  document.getElementById('batch-filter').value = state.filterStatus;
  safeCreateIcons();
}

function buildCardList() {
  const cards = state.cardSubTab === 'egift' ? mockGiftCards.filter(c => c.status !== 'Redeemed' && (state.cardFilterStatus === 'ALL' || c.status === state.cardFilterStatus)) : mockGiftCards.filter(c => c.status === 'Redeemed');
  document.getElementById('main-slot').innerHTML = `<div class="animate-fadeUp"><div class="px-6 pb-3 backdrop-blur-md"><div class="mx-auto flex max-w-sm rounded-lg border border-line bg-black/30 p-1"><button data-action="card-subtab" data-subtab="egift" class="flex-1 rounded-md py-2 text-[12px] font-semibold uppercase tracking-[0.12em] sm:text-[14px] ${state.cardSubTab === 'egift' ? 'border border-zinc-700 bg-panel text-gold' : 'text-soft'}">E-Gift Card</button><button data-action="card-subtab" data-subtab="redeem" class="flex-1 rounded-md py-2 text-[12px] font-semibold uppercase tracking-[0.12em] sm:text-[14px] ${state.cardSubTab === 'redeem' ? 'border border-zinc-700 bg-panel text-gold' : 'text-soft'}">Redeem History</button></div></div><div class="space-y-5 py-4 ">${state.cardSubTab === 'egift' ? `<div class="mb-2 flex items-center justify-between"><div class="relative"><select id="card-filter" class="appearance-none rounded-md border border-line bg-black/30 py-2 pl-3 pr-8 text-[11px] font-semibold uppercase tracking-[0.12em] text-cream outline-none focus:border-gold sm:text-[13px]"><option value="ALL">Filter Status: All</option><option value="Available">Available</option><option value="Gifted">Gifted</option></select><span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-soft">${icon('chevron-down','w-4 h-4')}</span></div><button data-action="new-donation" data-type="card" class="btn-action inline-flex items-center gap-2 rounded-md px-5 py-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-black transition hover:scale-105 sm:text-[13px]">${icon('plus','w-4 h-4')} Buy Gift Card</button></div>` : ''}${cards.map(card => `<article class="rounded-2xl border border-line bg-panel p-3 md:p-5 shadow-luxury transition hover:-translate-y-1 hover:border-gold/60"><div class="grid gap-4 grid-cols-[1.5fr_1fr]"><div class="space-y-2"><div class="text-[13px] font-semibold tracking-wide text-cream sm:text-[15px]">CARD ${card.maskedNumber}</div>${card.status === 'Gifted' ? `<p class="text-[12px] text-zinc-300 sm:text-[14px] truncate">Recipient: ${card.recipientName}</p>` : ''}${card.status === 'Redeemed' ? `<p class="text-[12px] text-zinc-300 sm:text-[14px] truncate">Redeemed by: ${card.redeemerName}</p>` : ''}<p class="text-[11px] uppercase tracking-[0.12em] text-zinc-500 sm:text-[13px]">Created: ${card.createdDate}</p></div><div class="flex flex-col items-end"><div class="text-[13px] font-semibold text-gold sm:text-[15px]">${formatNumber(card.value)} ${card.currency}</div><div class="mt-2"><span class="rounded px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-[12px] ${badgeClasses(card.status)}">${card.status}</span></div><div class="mt-3"><button data-action="open-card" data-card-id="${card.id}" class="btn-action-flat btn-action-sm inline-flex items-center gap-1.5 text-[11px] font-semibold sm:text-[13px]">${icon('eye','w-4 h-4')} View Details</button></div></div></div></article>`).join('')}</div></div>`;
  const filter = document.getElementById('card-filter');
  if (filter) filter.value = state.cardFilterStatus;
  safeCreateIcons();
}

function buildHistory() {
  const filtered = state.historyFilter === 'ALL'
    ? mockHistoryTransactions
    : mockHistoryTransactions.filter(item => item.type === state.historyFilter);
  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.month]) acc[item.month] = [];
    acc[item.month].push(item);
    return acc;
  }, {});
  const monthOrder = [...new Set(mockHistoryTransactions.map(item => item.month))];
  const sections = monthOrder
    .filter(month => grouped[month]?.length)
    .map(month => {
      const items = grouped[month];
      return `<section>
        <div class="flex items-center justify-between pb-2 text-cream">
          <span class="text-xs font-semibold tracking-[0.16em] text-gold sm:text-sm">${month}</span>
          <span class="text-xs text-soft sm:text-sm">(${items.length})</span>
        </div>
        <div class="space-y-3">
          ${items.map(item => `<div class="cursor-pointer border-b border-line p-5 transition hover:bg-zinc-950 last:border-b-0 rounded-2xl border border-line bg-panel shadow-luxury mt-1">
            <div class="mb-1 flex items-center justify-between">
              <div class="text-[11px] tracking-[0.12em] text-soft sm:text-[13px]">
                Tx ID <span class="ml-1 font-semibold text-cream">${item.id}</span>
              </div>
              <div class="text-sm font-semibold text-gold sm:text-base-1">${formatNumber(item.amount)} <span class="text-[11px] sm:text-[13px]">${item.currency}</span></div>
            </div>
            <div class="flex items-center justify-between">
              <div class="text-[11px] text-zinc-500 sm:text-[13px]">${item.date}</div>
              <div class="rounded px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] sm:text-[12px] ${badgeClasses(item.status)}">${item.status}</div>
            </div>
            <div class="mt-1 flex justify-between">
                <div class="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-soft sm:text-[12px]">${item.type}</div>
              <button data-action="open-transaction" data-tx-id="${item.id}" class="btn-action-flat btn-action-sm inline-flex items-center gap-1.5 text-[11px] font-semibold sm:text-[13px]">${icon('eye','w-4 h-4')} View Details</button>
            </div>
          </div>`).join('')}
        </div>
      </section>`;
    }).join('');
  document.getElementById('main-slot').innerHTML = `<div class="space-y-6 animate-fadeUp"><div class="mb-2 flex items-center justify-between"><span class="text-xs text-soft sm:text-sm">${filtered.length} results</span><div class="relative"><select id="history-filter" class="appearance-none rounded-md border border-line bg-black/30 py-2 pl-3 pr-8 text-[11px] font-semibold tracking-[0.12em] text-cream outline-none focus:border-gold sm:text-[13px]"><option value="ALL">Filter type: All</option><option value="E-Voucher">E-Voucher</option><option value="E-Gift Card">E-Gift Card</option></select><span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-soft">${icon('chevron-down','w-4 h-4')}</span></div></div>${sections}</div>`;
  document.getElementById('history-filter').value = state.historyFilter;
  safeCreateIcons();
}

function buildBatchDetail() {
  const batch = state.selectedBatch;
  const dists = mockDistributions[batch?.id] || [];
  const progress = batch ? ((batch.distributed / batch.amount) * 100).toFixed(0) : 0;
  document.getElementById('main-slot').innerHTML = `<div class="animate-fadeUp"><div class="sticky top-[73px] z-10 border-b border-line bg-transparent"><div class="flex justify-start gap-4 overflow-x-auto pt-0"><button data-action="batch-tab" data-batch-tab="overview" class="relative pb-4 pt-5 text-[12px] font-semibold tracking-[0.12em] ${state.batchTab === 'overview' ? 'text-gold' : 'text-soft'} sm:text-[14px]">Overview${state.batchTab === 'overview' ? '<span class="absolute inset-x-0 bottom-0 h-0.5 bg-gold"></span>' : ''}</button><button data-action="batch-tab" data-batch-tab="distributed" class="relative pb-4 pt-5 text-[12px] font-semibold tracking-[0.12em] ${state.batchTab === 'distributed' ? 'text-gold' : 'text-soft'} sm:text-[14px]">Distributed${state.batchTab === 'distributed' ? '<span class="absolute inset-x-0 bottom-0 h-0.5 bg-gold"></span>' : ''}</button><button data-action="batch-tab" data-batch-tab="receipt" class="relative pb-4 pt-5 text-[12px] font-semibold tracking-[0.12em] ${state.batchTab === 'receipt' ? 'text-gold' : 'text-soft'} sm:text-[14px]">Tax Receipt${state.batchTab === 'receipt' ? '<span class="absolute inset-x-0 bottom-0 h-0.5 bg-gold"></span>' : ''}</button></div></div><div class="py-4 sm:py-3">${state.batchTab === 'overview' ? `<div class="space-y-4 rounded-2xl border border-line bg-panel p-6 shadow-luxury"><div><h4 class="mb-2 text-sm font-semibold tracking-[0.16em] text-gold sm:text-base-1">Batch #${batch.id}</h4><p class="mb-1 text-sm text-soft sm:text-[15px]">Purpose: <span class="font-semibold text-cream">${batch.purpose}</span></p><p class="text-sm text-soft sm:text-[15px]">Donated on: <span class="font-semibold text-cream">${batch.date}</span></p></div><div class="relative overflow-hidden rounded-2xl border border-line bg-black/30 p-6"><div class="absolute inset-x-10 top-4 h-24 rounded-full bg-gold/5 blur-3xl"></div><div class="relative z-10"><div class="mb-7 text-center"><span class="mb-2 block text-[10px] tracking-[0.16em] text-soft sm:text-[12px]">Total Donation Amount</span><div class="text-3xl font-bold tracking-wide text-gold sm:text-4xl">${formatNumber(batch.amount)} <span class="text-lg sm:text-xl">${batch.currency}</span></div></div><div class="mb-6"><div class="mb-2.5 flex items-end justify-between"><span class="text-[12px] font-semibold text-cream sm:text-[14px]">Distribution Progress</span><span class="text-[14px] font-bold text-gold sm:text-[16px]">${progress}%</span></div><div class="h-3 overflow-hidden rounded-full bg-white"><div class="h-full rounded-full bg-gold" style="width:${progress}%"></div></div></div><div class="grid grid-cols-2 gap-4 border-t border-line/60 pt-5"><div><div class="mb-1 flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-gold"></span><span class="text-[10px] tracking-[0.16em] text-soft sm:text-[12px]">Distributed</span></div><div class="ml-4 text-[13px] font-semibold text-cream sm:text-[15px]">${formatNumber(batch.distributed)} <span class="text-[11px] text-zinc-500 sm:text-[13px]">${batch.currency}</span></div></div><div><div class="mb-1 flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-zinc-600"></span><span class="text-[10px] tracking-[0.16em] text-soft sm:text-[12px]">Remaining</span></div><div class="ml-4 text-[13px] font-semibold text-cream sm:text-[15px]">${formatNumber(batch.amount - batch.distributed)} <span class="text-[11px] text-zinc-500 sm:text-[13px]">${batch.currency}</span></div></div></div></div></div></div>` : state.batchTab === 'distributed' ? `<div class="space-y-5">${dists.map(dist => `<article class="rounded-2xl border border-line bg-panel p-5 shadow-luxury"><div class="flex items-start justify-between gap-3"><span class="max-w-[70%] truncate text-[13px] font-semibold text-cream sm:text-[15px]">${dist.recipient}</span><span class="text-[13px] font-semibold text-gold sm:text-[15px]">${formatNumber(dist.amount)} ${dist.currency}</span></div><p class="mt-1 text-[11px] tracking-[0.12em] text-zinc-500 sm:text-[13px]">Distributed on: ${dist.date}</p><div class="mt-1 flex items-center justify-between border-line pt-1"><span class="rounded px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] sm:text-[12px] ${badgeClasses(dist.status)}">${dist.status}</span><button data-action="open-dist" data-dist-id="${dist.id}" class="btn-action-flat btn-action-sm inline-flex items-center gap-1.5 text-[11px] font-semibold sm:text-[13px]">${icon('eye','w-4 h-4')} View Details</button></div></article>`).join('')}</div>` : `<div class="mx-auto max-w-[420px] space-y-6 rounded-2xl border border-line bg-panel p-6 shadow-luxury sm:p-8"><div class="relative border-b border-dashed border-line pb-6 text-center"><div class="relative mx-auto mb-4 grid w-fit place-items-center rounded-full bg-panel px-4 text-gold">${icon('badge-check','w-7 h-7')}</div><h5 class="mb-2 mt-4 text-lg font-semibold tracking-wide text-gold sm:text-xl">VLINKPAY FOUNDATION</h5><p class="mb-1 text-[11px] tracking-[0.16em] text-soft sm:text-[13px]">EIN: 92-0312176</p><p class="text-[11px] tracking-[0.16em] text-soft sm:text-[13px]">5444 Westheimer Rd Ste 1000, Houston, TX</p></div><div class="text-center"><h6 class="mb-3 text-[10px] font-bold tracking-[0.2em] text-gold sm:text-[12px]">Foundation Receipt</h6><p class="mb-1 text-[12px] text-zinc-300 sm:text-[14px]">Receipt ID: <span class="font-semibold text-cream">FND-RCPT-2025-11892</span></p><p class="text-[12px] text-zinc-300 sm:text-[14px]">Date Issued: <span class="font-semibold text-cream">Oct 28, 2025 - 09:00</span></p></div><div class="space-y-6"><div><h6 class="mb-4 inline-block border-b border-gold/30 pb-1 text-[11px] font-bold tracking-[0.14em] text-gold sm:text-[13px]">Donor Information</h6><p class="mb-2 flex justify-between text-[12px] text-soft sm:text-[14px]"><span>Full Name:</span><span class="text-right font-semibold text-cream">Nguyen Van A</span></p><p class="mb-2 flex justify-between text-[12px] text-soft sm:text-[14px]"><span>Email:</span><span class="text-right font-semibold text-cream">nguyen@email.com</span></p><p class="flex justify-between text-[12px] text-soft sm:text-[14px]"><span>Wallet Address:</span><span class="text-right font-semibold text-cream">0xA83F...9C21</span></p></div><div><h6 class="mb-4 inline-block border-b border-gold/30 pb-1 text-[11px] font-bold tracking-[0.14em] text-gold sm:text-[13px]">Donation Summary</h6><p class="mb-2 flex justify-between text-[12px] text-soft sm:text-[14px]"><span>Batch ID:</span><span class="text-right font-semibold text-cream">#${batch.id}</span></p><p class="mb-2 flex justify-between text-[12px] text-soft sm:text-[14px]"><span>Program:</span><span class="text-right font-semibold text-cream">${batch.purpose}</span></p><div class="mt-3 flex items-center justify-between border-t border-dashed border-line pt-3"><span class="text-[12px] tracking-[0.14em] text-soft sm:text-[14px]">Amount</span><span class="text-lg font-semibold text-gold">${formatNumber(batch.amount)} ${batch.currency}</span></div></div></div><div class="rounded border border-line bg-black/30 p-4 sm:p-5"><p class="text-left text-[11px] leading-relaxed text-soft sm:text-[12px]">Your donation has been recorded for tax and supporting documentation purposes. No goods or services were provided in exchange for this donation.</p></div><button data-action="download-receipt" class="btn-action-outline w-full py-3.5 text-[11px] font-extrabold tracking-[0.16em] sm:text-[13px]">Download Tax Receipt</button></div>`}</div></div>`;
  safeCreateIcons();
}

function buildDistDetail() {
  const dist = state.selectedDist;
  document.getElementById('main-slot').innerHTML = `<div class="animate-fadeUp"><div class="rounded-2xl border border-line bg-panel p-6 shadow-luxury sm:p-8"><h6 class="mb-5 inline-block border-b border-gold/30 pb-2 text-sm font-semibold uppercase tracking-[0.16em] text-gold sm:text-base-1">Distribution Details</h6><div class="space-y-4"><div class="flex items-start justify-between gap-4"><span class="text-sm text-soft sm:text-[15px]">Recipient</span><span class="text-right font-semibold text-cream sm:text-[15px]">${dist.recipient}</span></div><div class="flex items-start justify-between gap-4"><span class="text-sm text-soft sm:text-[15px]">Address</span><span class="text-right font-semibold text-cream sm:text-[15px]">${dist.address}</span></div><div class="flex items-start justify-between gap-4"><span class="text-sm text-soft sm:text-[15px]">Amount</span><span class="text-right font-semibold text-gold sm:text-lg">${formatNumber(dist.amount)} ${dist.currency}</span></div><div class="flex items-start justify-between gap-4"><span class="text-sm text-soft sm:text-[15px]">Date</span><span class="text-right font-semibold text-cream sm:text-[15px]">${dist.date}</span></div><div class="flex items-start justify-between gap-4"><span class="text-sm text-soft sm:text-[15px]">Status</span><span class="rounded px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-[12px] ${badgeClasses(dist.status)}">${dist.status}</span></div><div class="flex items-start justify-between gap-4 border-t border-line pt-4"><span class="text-sm text-soft sm:text-[15px]">Proof</span>${dist.hasProof ? `<button data-action="open-proof" data-proof-kind="voucher" class="text-sm font-semibold text-gold hover:underline sm:text-[15px]">[View]</button>` : '<span class="text-sm italic text-zinc-500 sm:text-[15px]">Not available</span>'}</div></div></div></div>`;
  safeCreateIcons();
}

function buildCardDetail() {
  const card = state.selectedCard;
  document.getElementById('main-slot').innerHTML = `<div class="animate-fadeUp"><div class="rounded-2xl border border-line bg-panel p-6 shadow-luxury sm:p-8"><h6 class="mb-5 inline-block border-b border-gold/30 pb-2 text-sm font-semibold tracking-[0.16em] text-gold sm:text-base-1">E-Gift Card</h6><div class="space-y-4"><div class="flex items-center justify-between"><span class="text-sm text-soft sm:text-[15px]">Status</span><span class="rounded px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] sm:text-[12px] ${badgeClasses(card.status)}">${card.status}</span></div><div class="flex items-center justify-between"><span class="text-sm text-soft sm:text-[15px]">Card Number</span><span class="text-[13px] font-semibold tracking-widest text-cream sm:text-[15px]">${card.maskedNumber}</span></div><div class="flex items-center justify-between"><span class="text-sm text-soft sm:text-[15px]">Card Value</span><span class="text-[15px] font-semibold text-gold sm:text-lg">${formatNumber(card.value)} ${card.currency}</span></div><div class="flex items-center justify-between"><span class="text-sm text-soft sm:text-[15px]">Created Date</span><span class="text-[13px] font-semibold text-cream sm:text-[15px]">${card.createdDate}</span></div>${(card.status === 'Gifted' || card.status === 'Redeemed') ? `<div class="my-3 h-px bg-line"></div><h6 class="text-[11px] font-bold tracking-[0.14em] text-gold sm:text-[13px]">Recipient</h6><div class="flex items-start justify-between gap-4"><span class="text-sm text-soft sm:text-[15px]">Recipient Name</span><span class="text-right font-semibold text-cream sm:text-[15px]">${card.recipientName || ''}</span></div>${card.recipientEmail ? `<div class="flex items-start justify-between gap-4"><span class="text-sm text-soft sm:text-[15px]">Recipient Email</span><span class="text-right font-semibold text-cream sm:text-[15px]">${card.recipientEmail}</span></div>` : ''}` : ''}${card.status === 'Redeemed' ? `<div class="my-3 h-px bg-line"></div><h6 class="text-[11px] font-bold tracking-[0.14em] text-gold sm:text-[13px]">Redemption Details</h6><div class="flex items-center justify-between"><span class="text-sm text-soft sm:text-[15px]">Redeemer</span><span class="font-semibold text-cream sm:text-[15px]">${card.redeemerName}</span></div><div class="flex items-start justify-between gap-4"><span class="text-sm text-soft sm:text-[15px]">Merchant</span><span class="max-w-[60%] text-right font-semibold text-cream sm:text-[15px]">${card.merchant}</span></div><div class="flex items-center justify-between"><span class="text-sm text-soft sm:text-[15px]">Date</span><span class="font-semibold text-cream sm:text-[15px]">${card.redeemedDate}</span></div><div class="flex items-center justify-between border-t border-line pt-4"><span class="text-sm text-soft sm:text-[15px]">Proof of Redemption</span>${card.hasProof ? `<button data-action="open-proof" data-proof-kind="gift-card" class="text-[12px] font-semibold text-gold hover:underline sm:text-[14px]">[View]</button>` : '<span class="text-[12px] italic text-zinc-500 sm:text-[14px]">Not available</span>'}</div>` : ''}${card.status === 'Available' ? `<button data-action="open-qr" class="btn-action mx-auto mt-6 block rounded-lg px-10 py-3.5 text-[11px] font-extrabold tracking-[0.16em] text-black sm:text-[13px]">Gift via QR</button>` : ''}</div></div></div>`;
  safeCreateIcons();
}

function buildQrView() {
  const card = state.selectedCard;
  const redeemCode = buildRedeemCode(card?.id || card?.maskedNumber || 'CHARITY');
  const qrSrc = '../images/qrcode.png';
  document.getElementById('main-slot').innerHTML = fillTemplate('tpl-qr-view', {
    amount: formatNumber(card?.value || 0),
    currency: escapeHtml(card?.currency || ''),
    qrSrc,
    redeemCode: escapeHtml(redeemCode)
  });
  safeCreateIcons();
}

function buildProofView() {
  const proofMap = {
    voucher: {
      title: 'Voucher Proof',
      src: 'https://i.ibb.co/YBYxZcGt/image.png'
    },
    'gift-card': {
      title: 'Gift Card Proof',
      src: 'https://i.ibb.co/PsjSFfgS/image.png'
    }
  };
  const proof = proofMap[state.proofKind] || proofMap.voucher;
  document.getElementById('main-slot').innerHTML = `<div class="mx-auto max-w-4xl animate-fadeUp"><div class="rounded-2xl border border-line bg-panel p-5 shadow-luxury sm:p-8"><h3 class="mb-4 text-lg font-semibold text-gold sm:text-xl">${proof.title}</h3><div class="overflow-hidden rounded-2xl border border-line bg-black/30 p-3 sm:p-4"><img src="${proof.src}" alt="${proof.title}" class="mx-auto block h-auto w-full max-w-3xl rounded-xl object-contain"></div></div></div>`;
  safeCreateIcons();
}

function buildTransactionDetail() {
  const tx = state.selectedTransaction;
  if (!tx) {
    document.getElementById('main-slot').innerHTML = `<div class="rounded-2xl border border-line bg-panel p-6 shadow-luxury"><p class="text-sm text-soft">Transaction not found.</p></div>`;
    return;
  }

  const meta = getTransactionDetailMeta(tx);
  const steps = transactionTimeline(tx);
  const proofLabel = tx.type === 'E-Gift Card' ? 'Redemption proof' : 'Payout proof';
  const proofAction = tx.type === 'E-Gift Card' ? 'gift-card' : 'voucher';
  const detailNote = tx.type === 'E-Gift Card'
    ? 'Gift card purchase details, payout reference, and redemption status are shown in one place for quick lookup.'
    : 'Donation details, settlement reference, and distribution status are shown in one place for quick lookup.';

  document.getElementById('main-slot').innerHTML = `
    <div class="mx-auto max-w-5xl space-y-6 animate-fadeUp">
      <section class="rounded-2xl border border-line bg-panel p-6 shadow-luxury sm:p-8">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div class="mb-2 text-[11px] uppercase tracking-[0.22em] text-gold sm:text-[13px]">Transaction #${tx.id}</div>
            <h3 class="text-2xl font-semibold text-cream sm:text-3xl">${tx.type}</h3>
            <p class="mt-2 max-w-3xl text-sm leading-6 text-soft sm:text-[15px]">${detailNote}</p>
          </div>
          <span class="rounded px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] ${badgeClasses(tx.status)}">${tx.status}</span>
        </div>
      </section>

      <section class="grid gap-4 lg:grid-cols-2">
        <div class="rounded-2xl border border-line bg-panel p-6 shadow-luxury">
          <h4 class="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-gold">Transaction detail</h4>
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-xl border border-line bg-black/20 p-4">
              <div class="text-[10px] uppercase tracking-[0.18em] text-soft">Owner</div>
              <div class="mt-1 text-base font-semibold text-cream">${meta.owner}</div>
            </div>
            <div class="rounded-xl border border-line bg-black/20 p-4">
              <div class="text-[10px] uppercase tracking-[0.18em] text-soft">Beneficiary</div>
              <div class="mt-1 text-base font-semibold text-cream">${meta.beneficiary}</div>
            </div>
            <div class="rounded-xl border border-line bg-black/20 p-4">
              <div class="text-[10px] uppercase tracking-[0.18em] text-soft">Amount</div>
              <div class="mt-1 text-base font-semibold text-gold">${formatNumber(tx.amount)} ${tx.currency}</div>
            </div>
            <div class="rounded-xl border border-line bg-black/20 p-4">
              <div class="text-[10px] uppercase tracking-[0.18em] text-soft">Payment asset</div>
              <div class="mt-1 text-base font-semibold text-cream">${meta.paymentAsset}</div>
            </div>
          </div>
        </div>

        <div class="rounded-2xl border border-line bg-panel p-6 shadow-luxury">
          <h4 class="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-gold">Settlement detail</h4>
          <div class="space-y-4">
            <div class="flex items-center justify-between gap-4">
              <span class="text-sm text-soft">Date</span>
              <span class="font-semibold text-cream">${tx.date}</span>
            </div>
            <div class="flex items-center justify-between gap-4">
              <span class="text-sm text-soft">Wallet address</span>
              <span class="font-semibold text-cream">${meta.walletAddress}</span>
            </div>
            <div class="flex items-center justify-between gap-4">
              <span class="text-sm text-soft">Reference</span>
              <span class="font-semibold text-cream">${meta.reference}</span>
            </div>
            <div class="flex items-center justify-between gap-4">
              <span class="text-sm text-soft">Currency</span>
              <span class="font-semibold text-cream">${tx.currency}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="rounded-2xl border border-line bg-panel p-6 shadow-luxury sm:p-8">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 class="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Lifecycle</h4>
          </div>
          <button data-action="download-receipt" class="btn-action-outline rounded-lg px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] sm:text-[13px]">Download Receipt</button>
        </div>
        <div class="mt-6 space-y-3">
          ${steps.map((step, index) => `
            <div class="flex gap-4 rounded-2xl border border-line bg-black/20 p-4">
              <div class="grid h-10 w-10 shrink-0 place-items-center rounded-full ${index < steps.length - 1 ? 'bg-gold/10 text-gold' : 'bg-black/10 text-soft'}">
                ${icon(index < steps.length - 1 ? 'check' : 'clock', 'w-4 h-4')}
              </div>
              <div class="min-w-0">
                <div class="text-[11px] uppercase tracking-[0.18em] text-soft">${step.time}</div>
                <div class="mt-1 text-base font-semibold text-cream">${step.title}</div>
                <div class="mt-1 text-sm text-soft">${step.note}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="grid gap-4 lg:grid-cols-2">
        <div class="rounded-2xl border border-line bg-panel p-6 shadow-luxury">
          <h4 class="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-gold">Reference</h4>
          <div class="space-y-3 text-sm leading-6 text-soft">
            <p>Transaction reference: <span class="font-semibold text-cream">${meta.reference}</span></p>
            <p>Wallet address: <span class="font-semibold text-cream">${meta.walletAddress}</span></p>
            <p>Payment asset: <span class="font-semibold text-cream">${meta.paymentAsset}</span></p>
          </div>
        </div>
        <div class="rounded-2xl border border-line bg-panel p-6 shadow-luxury">
          <h4 class="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-gold">${proofLabel}</h4>
          <button data-action="open-proof" data-proof-kind="${proofAction}" class="btn-action mx-auto block w-full rounded-lg px-6 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.16em] sm:text-[13px]">
            View Proof
          </button>
        </div>
      </section>
    </div>
  `;
  safeCreateIcons();
}

function renderModal() {
  const slot = document.getElementById('modal-slot');
  if (!state.isSuccess) { slot.innerHTML = ''; return; }
  slot.innerHTML = fillTemplate('tpl-modal', {
    checkIcon: icon('check-circle-2','w-7 h-7'),
    viewLabel: state.flowType === 'voucher' ? 'Voucher' : 'Cards'
  });
  safeCreateIcons();
}

function safeCreateIcons() {
  if (window.lucide?.createIcons) window.lucide.createIcons();
}

function buildFileName(prefix, ext = 'txt') {
  return `${prefix}-${new Date().toISOString().slice(0, 10)}.${ext}`;
}

function triggerTextDownload(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

function getTransactionDetailMeta(tx) {
  const isCard = tx?.type === 'E-Gift Card';
  const isVnd = tx?.currency === 'VND';
  return {
    owner: 'Nguyen Van A',
    beneficiary: isCard ? 'tranb@example.com' : 'Children Education Program',
    paymentAsset: isCard ? (isVnd ? 'VND' : 'USDT') : (isVnd ? 'VND' : 'USDV'),
    walletAddress: isCard ? '0x71C...3E4D' : '0xA83F...9C21',
    reference: isCard ? 'NFT-8812' : 'BATCH-2025-014',
    proofKind: isCard ? 'gift-card' : 'voucher',
  };
}

function transactionTimeline(tx) {
  const isCard = tx?.type === 'E-Gift Card';
  return isCard
    ? [
        { time: '09:00:21', title: 'Transaction created', note: 'Gift card order initialized' },
        { time: '09:00:45', title: 'Payment confirmed', note: 'Funds captured and balance locked' },
        { time: '09:01:10', title: 'Gift card issued', note: 'Card token and QR receipt generated' },
        { time: tx?.status === 'Redeemed' ? '22/03/2026' : 'Pending', title: tx?.status === 'Redeemed' ? 'Redeemed at merchant' : 'Waiting for redemption', note: tx?.status === 'Redeemed' ? 'Redeem proof is available' : 'No redemption event yet' },
      ]
    : [
        { time: '08:55:10', title: 'Donation created', note: 'Voucher flow initialized' },
        { time: '08:56:02', title: 'Payment confirmed', note: 'Crypto or fiat settlement captured' },
        { time: '08:57:30', title: 'Voucher issued', note: 'Purpose and amount locked to receipt' },
        { time: tx?.status === 'Completed' ? 'Distributed' : 'Pending', title: tx?.status === 'Completed' ? 'Funds distributed' : 'Awaiting distribution', note: tx?.status === 'Completed' ? 'Batch moved to foundation ledger' : 'Distribution will appear after settlement' },
      ];
}

function downloadCurrentReceipt() {
  let filename = buildFileName('charity-receipt');
  let content = '';

  if (state.viewMode === 'transactionDetail' && state.selectedTransaction) {
    const tx = state.selectedTransaction;
    const meta = getTransactionDetailMeta(tx);
    filename = buildFileName(tx.id, 'txt');
    content = [
      'Transaction Receipt',
      `ID: ${tx.id}`,
      `Type: ${tx.type}`,
      `Status: ${tx.status}`,
      `Date: ${tx.date}`,
      `Amount: ${formatNumber(tx.amount)} ${tx.currency}`,
      `Owner: ${meta.owner}`,
      `Beneficiary: ${meta.beneficiary}`,
      `Payment asset: ${meta.paymentAsset}`,
      `Wallet address: ${meta.walletAddress}`,
      `Reference: ${meta.reference}`,
    ].join('\n');
  } else if (state.viewMode === 'qr' && state.selectedCard) {
    const card = state.selectedCard;
    filename = buildFileName(card.id, 'txt');
    content = [
      'Charity Gift Card Receipt',
      `Card ID: ${card.id}`,
      `Masked Number: ${card.maskedNumber}`,
      `Value: ${formatNumber(card.value)} ${card.currency}`,
      `Redeem Code: ${buildRedeemCode(card.id)}`,
      `Status: ${card.status}`,
    ].join('\n');
  } else if (state.viewMode === 'batch' && state.selectedBatch) {
    const batch = state.selectedBatch;
    filename = buildFileName(batch.id, 'txt');
    content = [
      'Donation Receipt',
      `Batch ID: ${batch.id}`,
      `Purpose: ${batch.purpose}`,
      `Status: ${batch.status}`,
      `Date: ${batch.date}`,
      `Amount: ${formatNumber(batch.amount)} ${batch.currency}`,
      `Distributed: ${formatNumber(batch.distributed)} ${batch.currency}`,
    ].join('\n');
  } else {
    content = [
      'Charity Gift Receipt',
      `Generated at: ${new Date().toISOString()}`,
    ].join('\n');
  }

  triggerTextDownload(filename, `${content}\n`);
}

function renderRoute(force = false) {
  renderHeader();
  renderTabs();
  renderModal();
  const newKey = routeKey();
  if (!force && newKey === currentRouteKey) {
    if (state.viewMode === 'buy') syncBuyView();
    return;
  }
  currentRouteKey = newKey;
  if (state.viewMode === 'buy') buildBuyView();
  else if (state.viewMode === 'list') buildVoucherList();
  else if (state.viewMode === 'cardList') buildCardList();
  else if (state.viewMode === 'history') buildHistory();
  else if (state.viewMode === 'batch') buildBatchDetail();
  else if (state.viewMode === 'dist') buildDistDetail();
  else if (state.viewMode === 'cardDetail') buildCardDetail();
  else if (state.viewMode === 'qr') buildQrView();
  else if (state.viewMode === 'proof') buildProofView();
  else if (state.viewMode === 'transactionDetail') buildTransactionDetail();
}

function switchTab(tabId) {
  state.activeTab = tabId;
  if (tabId === 'voucher') state.viewMode = 'list';
  else if (tabId === 'card') state.viewMode = 'cardList';
  else if (tabId === 'history') state.viewMode = 'history';
  else {
    state.viewMode = 'buy';
    state.flowType = 'voucher';
  }
  renderRoute(true);
}

function startNewDonation(type) {
  state.viewMode = 'buy';
  state.activeTab = 'all';
  state.flowType = type || 'voucher';
  state.sendDirectly = false;
  state.recipientName = '';
  state.recipientEmail = '';
  renderRoute(true);
}

function handleBack() {
  if (state.viewMode === 'batch') state.viewMode = 'list';
  else if (state.viewMode === 'dist') state.viewMode = 'batch';
  else if (state.viewMode === 'cardDetail') state.viewMode = 'cardList';
  else if (state.viewMode === 'qr') state.viewMode = 'cardDetail';
  else if (state.viewMode === 'proof') {
    state.viewMode = state.proofReturnMode || (state.activeTab === 'card' ? 'cardDetail' : 'dist');
    state.proofReturnMode = null;
  }
  else if (state.viewMode === 'transactionDetail') state.viewMode = 'history';
  renderRoute(true);
}

function resetFlow() {
  state.isSuccess = false;
  if (state.flowType === 'voucher') {
    state.activeTab = 'voucher';
    state.viewMode = 'list';
  } else {
    state.activeTab = 'card';
    state.viewMode = 'cardList';
  }
  Object.assign(state, {
    flowType: 'voucher', purpose: 'food', amount: '', currency: 'USD', paymentMethod: 'USDV',
    cardValue: '', quantity: 1, sendDirectly: false, recipientName: '', recipientEmail: ''
  });
  renderRoute(true);
}

app.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  const { action } = target.dataset;
  if (action === 'back') return handleBack();
  if (action === 'tabs-prev') {
    tabsSwiper?.slidePrev();
    return;
  }
  if (action === 'tabs-next') {
    tabsSwiper?.slideNext();
    return;
  }
  if (action === 'switch-tab') return switchTab(target.dataset.tab);
  if (action === 'set-flow') {
    state.flowType = target.dataset.flow;
    renderRoute(true);
    return;
  }
  if (action === 'toggle-buy-step') {
    const key = target.dataset.step;
    if (key && Object.prototype.hasOwnProperty.call(state.buyStepCollapsed, key)) {
      state.buyStepCollapsed[key] = !state.buyStepCollapsed[key];
      renderRoute(true);
    }
    return;
  }
  if (action === 'set-purpose') { state.purpose = target.dataset.purpose; return syncBuyView(); }
  if (action === 'set-payment-method') { state.paymentMethod = target.dataset.method; return syncBuyView(); }
  if (action === 'quantity-minus') { state.quantity = Math.max(1, state.quantity - 1); return syncBuyView(); }
  if (action === 'quantity-plus') { state.quantity += 1; return syncBuyView(); }
  if (action === 'confirm-payment') { if (canProceedToPayment()) { state.isSuccess = true; renderModal(); } return; }
  if (action === 'close-success') { state.isSuccess = false; renderModal(); return; }
  if (action === 'view-after-success') return resetFlow();
  if (action === 'new-donation') return startNewDonation(target.dataset.type);
  if (action === 'open-batch') {
    state.selectedBatch = mockBatches.find(b => b.id === target.dataset.batchId) || null;
    state.batchTab = 'overview';
    state.viewMode = 'batch';
    renderRoute(true);
    return;
  }
  if (action === 'batch-tab') { state.batchTab = target.dataset.batchTab; return renderRoute(true); }
  if (action === 'open-dist') {
    state.selectedDist = (mockDistributions[state.selectedBatch?.id] || []).find(d => d.id === target.dataset.distId) || null;
    state.viewMode = 'dist';
    renderRoute(true);
    return;
  }
  if (action === 'card-subtab') { state.cardSubTab = target.dataset.subtab; return renderRoute(true); }
  if (action === 'open-card') {
    state.selectedCard = mockGiftCards.find(c => c.id === target.dataset.cardId) || null;
    state.viewMode = 'cardDetail';
    renderRoute(true);
    return;
  }
  if (action === 'open-transaction') {
    state.selectedTransaction = mockHistoryTransactions.find(t => t.id === target.dataset.txId) || null;
    state.viewMode = 'transactionDetail';
    renderRoute(true);
    return;
  }
  if (action === 'open-qr') { state.viewMode = 'qr'; return renderRoute(true); }
  if (action === 'open-proof') {
    state.proofReturnMode = state.viewMode;
    state.proofKind = target.dataset.proofKind || (state.viewMode === 'cardDetail' ? 'gift-card' : 'voucher');
    state.viewMode = 'proof';
    return renderRoute(true);
  }
  if (action === 'download-receipt') { downloadCurrentReceipt(); return; }
});

app.addEventListener('input', (event) => {
  const t = event.target;
  if (t.id === 'amount-input') { state.amount = formatNumber(t.value.replace(/[^0-9.]/g, '')); syncBuyView(); }
  if (t.id === 'card-value-input') { state.cardValue = formatNumber(t.value.replace(/[^0-9.]/g, '')); syncBuyView(); }
  if (t.id === 'recipient-name-input') { state.recipientName = t.value; }
  if (t.id === 'recipient-email-input') { state.recipientEmail = t.value; syncBuyView(); }
});

app.addEventListener('change', (event) => {
  const t = event.target;
  if (t.id === 'currency-select') { state.currency = t.value; syncBuyView(); }
  if (t.id === 'send-directly-check') { state.sendDirectly = t.checked; syncBuyView(); }
  if (t.id === 'batch-filter') { state.filterStatus = t.value; renderRoute(true); }
  if (t.id === 'card-filter') { state.cardFilterStatus = t.value; renderRoute(true); }
  if (t.id === 'history-filter') { state.historyFilter = t.value; renderRoute(true); }
});

ensureShell();
renderRoute(true);
