const purposes = [
  { id: 'food', icon: 'shopping-basket', label: 'Food Support' },
  { id: 'children', icon: 'hand-heart', label: 'Children Education' },
  { id: 'healthcare', icon: 'activity', label: 'Healthcare & Medicine' },
  { id: 'elderly', icon: 'heart', label: 'Elderly Care' },
  { id: 'disaster', icon: 'flame', label: 'Disaster Relief' },
  { id: 'scholarship', icon: 'graduation-cap', label: 'Scholarship Programs' },
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

const state = {
  viewMode: 'buy',
  activeTab: 'all',
  isSuccess: false,
  selectedBatch: null,
  selectedDist: null,
  selectedCard: null,
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

function icon(name, classes = 'w-4 h-4') { return `<i data-lucide="${name}" class="${classes}"></i>`; }
function escapeHtml(str) { return String(str ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }
function formatNumber(val) {
  if (val === null || val === undefined || val === '') return '';
  const parts = String(val).replace(/,/g, '').split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
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
    case 'In Distribution': return 'bg-gold/15 text-gold border border-gold/30';
    case 'Distributed': return 'bg-blue-950/40 text-blue-300 border border-blue-800';
    case 'Completed':
    case 'Redeemed': return 'bg-emerald-950/40 text-emerald-300 border border-emerald-800';
    case 'Available': return 'bg-zinc-900 text-yellow-100 border border-zinc-700';
    case 'Gifted': return 'bg-black text-zinc-300 border border-zinc-800';
    default: return 'bg-zinc-900 text-zinc-300 border border-zinc-700';
  }
}
function getHeaderTitle() {
  if (state.activeTab === 'history') return 'Transaction History';
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
  return [state.viewMode, state.activeTab, state.batchTab, state.cardSubTab, state.selectedBatch?.id || '', state.selectedCard?.id || '', state.selectedDist?.id || ''].join('|');
}
function showTabs() { return ['buy', 'list', 'cardList', 'history'].includes(state.viewMode); }
function panel(step, title, body, id='') {
  return `<section ${id ? `id="${id}"` : ''} class="overflow-hidden rounded-2xl border border-line bg-panel shadow-luxury animate-fadeUp"><div class="flex items-center gap-4 border-b border-line bg-black/30 px-5 py-4 sm:px-6"><div class="grid h-8 w-8 place-items-center rounded-full border border-gold text-xs font-bold text-gold">${step}</div><h3 class="bg-gradient-to-r from-gold to-gold2 bg-clip-text text-xs font-bold uppercase tracking-[0.2em] text-transparent">${title}</h3></div><div class="p-5 sm:p-6">${body}</div></section>`;
}

function ensureShell() {
  if (shellReady) return;
  app.innerHTML = `
    <header id="header-slot" class="sticky top-0 z-30 border-b border-line bg-panel/90 backdrop-blur-xl"></header>
    <div id="tabs-slot"></div>
    <main id="main-slot" class="mx-auto max-w-6xl px-4 py-6 pb-24 sm:px-6"></main>
    <div id="modal-slot"></div>`;
  shellReady = true;
}

function renderHeader() {
  const el = document.getElementById('header-slot');
  el.innerHTML = `
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
      <div class="w-28">${['batch','dist','cardDetail','qr','proof'].includes(state.viewMode) ? `<button data-action="back" class="inline-flex items-center gap-2 text-sm font-bold text-gold transition hover:text-gold2">${icon('arrow-left','w-4 h-4')} Back</button>` : ''}</div>
      <h1 class="bg-gradient-to-r from-gold via-yellow-100 to-gold bg-clip-text text-center text-sm font-extrabold uppercase tracking-[0.18em]">${getHeaderTitle()}</h1>
      <div class="w-28"></div>
    </div>`;
}

function renderTabs() {
  const slot = document.getElementById('tabs-slot');
  if (!showTabs()) { slot.innerHTML = ''; return; }
  const list = [
    { id: 'all', label: 'Buy Gift Charity' },
    { id: 'voucher', label: 'Charity E-Voucher' },
    { id: 'card', label: 'Charity E-Gift Card' },
    { id: 'history', label: 'Transaction History' },
  ];
  slot.innerHTML = `<div class="sticky top-[73px] z-20 border-b border-line bg-panel/80 backdrop-blur-xl"><div class="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pt-4 sm:px-6">${list.map(tab => `<button data-action="switch-tab" data-tab="${tab.id}" class="relative whitespace-nowrap px-3 pb-4 text-[11px] font-semibold uppercase tracking-[0.12em] transition ${state.activeTab === tab.id ? 'text-gold' : 'text-soft hover:text-cream'}">${tab.label}${state.activeTab === tab.id ? '<span class="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-gold to-gold2"></span>' : ''}</button>`).join('')}</div></div>`;
}

function buyRouteShell() {
  return `<div id="buy-view" class="space-y-8">
    <div id="buy-step-type"></div>
    <div id="buy-step-details"></div>
    <div id="buy-step-payment"></div>
  </div>`;
}

function giftTypeContent() {
  return `<p class="mb-5 text-sm text-zinc-300">Choose how you want to share your contribution</p>
  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
    <button data-action="set-flow" data-flow="voucher" class="rounded-2xl border p-5 text-left transition ${state.flowType === 'voucher' ? 'border-gold bg-gold/5 shadow-gold' : 'border-line hover:-translate-y-1 hover:border-gold/70 hover:bg-gold/5'}"><div class="flex items-center gap-4"><div class="grid h-12 w-12 place-items-center rounded-xl ${state.flowType === 'voucher' ? 'bg-gradient-to-br from-gold to-amber-700 text-black' : 'bg-zinc-900 text-soft'}">${icon('package','w-5 h-5')}</div><div><h3 class="mb-1 text-sm font-semibold text-cream sm:text-[15px]">Charity E-Voucher</h3><p class="text-xs leading-relaxed text-soft sm:text-[13px]">Donate directly to a cause and share the impact.</p></div></div></button>
    <button data-action="set-flow" data-flow="card" class="rounded-2xl border p-5 text-left transition ${state.flowType === 'card' ? 'border-gold bg-gold/5 shadow-gold' : 'border-line hover:-translate-y-1 hover:border-gold/70 hover:bg-gold/5'}"><div class="flex items-center gap-4"><div class="grid h-12 w-12 place-items-center rounded-xl ${state.flowType === 'card' ? 'bg-gradient-to-br from-gold to-amber-700 text-black' : 'bg-zinc-900 text-soft'}">${icon('gift','w-5 h-5')}</div><div><h3 class="mb-1 text-sm font-semibold text-cream sm:text-[15px]">Charity E-Gift Card</h3><p class="text-xs leading-relaxed text-soft sm:text-[13px]">Buy a gift card that lets the recipient choose.</p></div></div></button>
  </div>`;
}

function voucherDetailsContent() {
  return `<div class="space-y-8">
    <div><h4 class="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-cream">Select Purpose</h4><div id="purpose-grid" class="grid grid-cols-2 gap-4 sm:grid-cols-3"></div></div>
    <div><h4 class="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-cream">Donation Amount</h4><div class="flex gap-4"><div class="relative"><select id="currency-select" class="h-14 w-28 appearance-none rounded-lg border border-line bg-black/30 pl-4 pr-10 text-sm font-semibold text-gold outline-none transition focus:border-gold"><option value="USD">USD</option><option value="VND">VND</option></select><span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold">${icon('chevron-down','w-4 h-4')}</span></div><input id="amount-input" type="text" placeholder="0.00" class="h-14 flex-1 rounded-lg border border-line bg-black/30 px-5 text-sm font-semibold text-cream outline-none transition placeholder:text-zinc-500 focus:border-gold sm:text-base-1"></div></div>
  </div>`;
}

function cardDetailsContent() {
  return `<div class="space-y-8">
    <div><h4 class="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-cream">Select Currency & Value</h4><div class="flex gap-4"><div class="relative"><select id="currency-select" class="h-14 w-28 appearance-none rounded-lg border border-line bg-black/30 pl-4 pr-10 text-sm font-semibold text-gold outline-none transition focus:border-gold"><option value="USD">USD</option><option value="VND">VND</option></select><span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold">${icon('chevron-down','w-4 h-4')}</span></div><input id="card-value-input" type="text" placeholder="Enter value" class="h-14 flex-1 rounded-lg border border-line bg-black/30 px-5 text-sm font-semibold text-cream outline-none transition placeholder:text-zinc-500 focus:border-gold sm:text-base-1"></div></div>
    <div class="rounded-2xl border border-line bg-black/20 p-4"><div class="flex items-center justify-between"><h4 class="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-300">Quantity</h4><div class="flex items-center gap-4 rounded-lg border border-line bg-panel p-1"><button data-action="quantity-minus" class="grid h-8 w-8 place-items-center rounded text-soft transition hover:bg-zinc-900 hover:text-gold">${icon('minus','w-4 h-4')}</button><span id="quantity-value" class="w-6 text-center font-semibold text-cream">1</span><button data-action="quantity-plus" class="grid h-8 w-8 place-items-center rounded text-gold transition hover:bg-gold/10">${icon('plus','w-4 h-4')}</button></div></div></div>
    <div class="space-y-4"><label class="flex cursor-pointer items-center gap-4"><input id="send-directly-check" type="checkbox" class="peer hidden"><div class="grid h-5 w-5 place-items-center rounded-[4px] border border-zinc-600 bg-black/30 transition peer-checked:border-gold peer-checked:bg-gradient-to-r peer-checked:from-gold peer-checked:to-gold2 peer-checked:text-black">${icon('check','w-3 h-3')}</div><span class="text-sm text-cream sm:text-[15px]">Send directly to a recipient</span></label><div id="recipient-fields" class="hidden space-y-4"><input id="recipient-name-input" type="text" placeholder="Recipient Name (Optional)" class="h-12 w-full rounded-lg border border-line bg-black/30 px-4 text-sm text-cream outline-none placeholder:text-zinc-500 focus:border-gold"><input id="recipient-email-input" type="email" placeholder="Recipient Email *" class="h-12 w-full rounded-lg border border-line bg-black/30 px-4 text-sm text-cream outline-none placeholder:text-zinc-500 focus:border-gold"></div></div>
  </div>`;
}

function paymentContent() {
  return `<div class="space-y-8"><div><h4 class="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-cream">Payment Method</h4><div id="payment-list" class="space-y-3"></div></div><div class="rounded-2xl border border-line bg-black/20 p-6"><div class="mb-5 flex items-center gap-3 text-gold">${icon('shield-check','w-5 h-5')}<h4 class="bg-gradient-to-r from-gold to-gold2 bg-clip-text text-[11px] font-bold uppercase tracking-[0.2em] text-transparent sm:text-[13px]">Invoice Summary</h4></div><div id="invoice-summary"></div></div><button id="confirm-payment-btn" data-action="confirm-payment" class="mx-auto block rounded-lg px-12 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.16em] transition sm:text-[15px]"></button></div>`;
}

function buildBuyView() {
  const main = document.getElementById('main-slot');
  main.innerHTML = buyRouteShell();
  document.getElementById('buy-step-type').innerHTML = panel('01', 'Gift Type', giftTypeContent());
  document.getElementById('buy-step-details').innerHTML = panel('02', state.flowType === 'card' ? 'Gift Card Details' : 'Donation Details', state.flowType === 'card' ? cardDetailsContent() : voucherDetailsContent());
  document.getElementById('buy-step-payment').innerHTML = panel('03', 'Payment', paymentContent());
  syncBuyView();
}

function syncBuyView() {
  const purposeGrid = document.getElementById('purpose-grid');
  if (purposeGrid) {
    purposeGrid.innerHTML = purposes.map(item => `<button data-action="set-purpose" data-purpose="${item.id}" class="relative rounded-2xl border p-4 text-center transition ${state.purpose === item.id ? 'border-gold bg-gold/5 shadow-gold' : 'border-line hover:border-gold/70 hover:bg-gold/5'}"><div class="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-xl ${state.purpose === item.id ? 'bg-gradient-to-br from-gold to-amber-700 text-black' : 'bg-zinc-900 text-soft'}">${icon(item.icon,'w-5 h-5')}</div><div class="text-[11px] font-semibold uppercase tracking-[0.08em] sm:text-xs">${item.label}</div>${state.purpose === item.id ? `<div class="absolute right-3 top-3 grid h-4 w-4 place-items-center rounded-full bg-gradient-to-r from-gold to-gold2 text-black">${icon('check','w-3 h-3')}</div>` : ''}</button>`).join('');
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
    paymentList.innerHTML = paymentMethods.map(pm => `<button data-action="set-payment-method" data-method="${pm.id}" class="flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${state.paymentMethod === pm.id ? 'border-gold bg-gold/5 shadow-gold' : 'border-line hover:-translate-y-1 hover:border-gold/70'}"><div class="flex items-center gap-4"><div class="grid h-4 w-4 place-items-center rounded-full border ${state.paymentMethod === pm.id ? 'border-gold' : 'border-zinc-600'}">${state.paymentMethod === pm.id ? '<span class="h-2 w-2 rounded-full bg-gold"></span>' : ''}</div><div class="grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-line bg-white"><img src="${pm.image}" alt="${pm.id}" class="h-full w-full object-cover p-1"></div><span class="text-sm font-semibold text-cream sm:text-[15px]">${pm.id}</span></div><div class="text-right"><p class="mb-0.5 text-[10px] uppercase tracking-[0.12em] text-soft sm:text-[12px]">Available</p><p class="text-[12px] font-semibold text-gold sm:text-[14px]">${pm.id === 'BTC' ? '' : '$'}${pm.available}</p></div></button>`).join('');
  }
  const invoice = document.getElementById('invoice-summary');
  if (invoice) {
    invoice.innerHTML = state.flowType === 'voucher'
      ? `<div class="space-y-3 text-sm sm:text-[15px]"><div class="flex items-center justify-between text-zinc-300"><span>Donation Amount</span><strong class="text-cream">$${formatNumber(numericAmount())}</strong></div><div class="flex items-center justify-between text-zinc-300"><span>Platform Fee (1.5%)</span><strong class="text-gold">$${formatNumber(platformFee().toFixed(2))}</strong></div><div class="h-px bg-line"></div><div class="flex items-center justify-between"><strong class="text-sm uppercase tracking-[0.14em] text-cream">Total</strong><strong class="bg-gradient-to-r from-gold to-gold2 bg-clip-text text-2xl font-bold text-transparent">$${formatNumber(voucherTotal().toFixed(2))}</strong></div></div>`
      : `<div class="space-y-3 text-sm sm:text-[15px]"><div class="flex items-center justify-between text-zinc-300"><span>Gift Card Value</span><strong class="text-cream">$${formatNumber(numericCardValue())}</strong></div><div class="flex items-center justify-between text-zinc-300"><span>Quantity</span><strong class="text-cream">x${state.quantity}</strong></div><div class="h-px bg-line"></div><div class="flex items-center justify-between"><strong class="text-sm uppercase tracking-[0.14em] text-cream">Total</strong><strong class="bg-gradient-to-r from-gold to-gold2 bg-clip-text text-2xl font-bold text-transparent">$${formatNumber(cardTotal().toFixed(2))}</strong></div></div>`;
  }
  const btn = document.getElementById('confirm-payment-btn');
  if (btn) {
    const enabled = canProceedToPayment();
    btn.disabled = !enabled;
    btn.className = `mx-auto block rounded-lg px-12 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.16em] transition sm:text-[15px] ${enabled ? 'bg-gradient-to-r from-gold via-gold2 to-gold text-black hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(212,175,55,0.35)]' : 'cursor-not-allowed border border-line bg-zinc-900 text-zinc-500'}`;
    btn.textContent = 'Confirm Payment';
  }
  safeCreateIcons();
}

function buildVoucherList() {
  const rows = (state.filterStatus === 'ALL' ? mockBatches : mockBatches.filter(b => b.status === state.filterStatus)).map(batch => `<article class="rounded-2xl border border-line bg-panel p-5 shadow-luxury transition hover:-translate-y-1 hover:border-gold/60"><div class="flex items-center justify-between gap-3"><span class="text-[13px] font-semibold tracking-wide text-cream sm:text-[15px]">BATCH #${batch.id}</span><span class="text-[13px] font-semibold text-gold sm:text-[15px]">${formatNumber(batch.amount)} ${batch.currency}</span></div><p class="mt-2 text-sm text-zinc-300 sm:text-[15px]">${batch.purpose}</p><p class="mt-1 text-[11px] uppercase tracking-[0.12em] text-zinc-500 sm:text-[13px]">Donated: ${batch.date}</p><div class="mt-4 flex items-center justify-between border-t border-line pt-4"><span class="rounded px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-[12px] ${badgeClasses(batch.status)}">${batch.status}</span><button data-action="open-batch" data-batch-id="${batch.id}" class="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gold transition hover:text-gold2 sm:text-[13px]">${icon('eye','w-4 h-4')} View Details</button></div></article>`).join('');
  document.getElementById('main-slot').innerHTML = `<div class="space-y-5 animate-fadeUp"><div class="mb-2 flex items-center justify-between"><div class="relative"><select id="batch-filter" class="appearance-none rounded-md border border-line bg-black/30 py-2 pl-3 pr-8 text-[11px] font-semibold uppercase tracking-[0.12em] text-cream outline-none focus:border-gold sm:text-[13px]"><option value="ALL">All Statuses</option><option value="In Distribution">In Distribution</option><option value="Distributed">Distributed</option><option value="Completed">Completed</option></select><span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-soft">${icon('chevron-down','w-4 h-4')}</span></div><button data-action="new-donation" data-type="voucher" class="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-gold to-gold2 px-5 py-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-black transition hover:scale-105 sm:text-[13px]">${icon('plus','w-4 h-4')} Donate Now</button></div>${rows}</div>`;
  document.getElementById('batch-filter').value = state.filterStatus;
  safeCreateIcons();
}

function buildCardList() {
  const cards = state.cardSubTab === 'egift' ? mockGiftCards.filter(c => c.status !== 'Redeemed' && (state.cardFilterStatus === 'ALL' || c.status === state.cardFilterStatus)) : mockGiftCards.filter(c => c.status === 'Redeemed');
  document.getElementById('main-slot').innerHTML = `<div class="animate-fadeUp"><div class="bg-panel/80 px-6 pt-5 pb-3 backdrop-blur-md"><div class="mx-auto flex max-w-sm rounded-lg border border-line bg-black/30 p-1"><button data-action="card-subtab" data-subtab="egift" class="flex-1 rounded-md py-2 text-[11px] font-semibold uppercase tracking-[0.12em] ${state.cardSubTab === 'egift' ? 'border border-zinc-700 bg-panel text-gold' : 'text-soft'}">E-Gift Card</button><button data-action="card-subtab" data-subtab="redeem" class="flex-1 rounded-md py-2 text-[11px] font-semibold uppercase tracking-[0.12em] ${state.cardSubTab === 'redeem' ? 'border border-zinc-700 bg-panel text-gold' : 'text-soft'}">Redeem History</button></div></div><div class="space-y-5 p-4 sm:p-6">${state.cardSubTab === 'egift' ? `<div class="mb-2 flex items-center justify-between"><div class="relative"><select id="card-filter" class="appearance-none rounded-md border border-line bg-black/30 py-2 pl-3 pr-8 text-[11px] font-semibold uppercase tracking-[0.12em] text-cream outline-none focus:border-gold sm:text-[13px]"><option value="ALL">Filter Status: All</option><option value="Available">Available</option><option value="Gifted">Gifted</option></select><span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-soft">${icon('chevron-down','w-4 h-4')}</span></div><button data-action="new-donation" data-type="card" class="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-gold to-gold2 px-5 py-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-black transition hover:scale-105 sm:text-[13px]">${icon('plus','w-4 h-4')} Buy Gift Card</button></div>` : ''}${cards.map(card => `<article class="rounded-2xl border border-line bg-panel p-5 shadow-luxury transition hover:-translate-y-1 hover:border-gold/60"><div class="flex items-center justify-between gap-3"><span class="text-[13px] font-semibold tracking-wide text-cream sm:text-[15px]">CARD ${card.maskedNumber}</span><span class="text-[13px] font-semibold text-gold sm:text-[15px]">${formatNumber(card.value)} ${card.currency}</span></div>${card.status === 'Gifted' ? `<p class="mt-2 text-[12px] text-zinc-300 sm:text-[14px] truncate">Recipient: ${card.recipientName}</p>` : ''}${card.status === 'Redeemed' ? `<p class="mt-2 text-[12px] text-zinc-300 sm:text-[14px] truncate">Redeemed by: ${card.redeemerName}</p>` : ''}<p class="mt-1 text-[11px] uppercase tracking-[0.12em] text-zinc-500 sm:text-[13px]">Created: ${card.createdDate}</p><div class="mt-4 flex items-center justify-between border-t border-line pt-4"><span class="rounded px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-[12px] ${badgeClasses(card.status)}">${card.status}</span><button data-action="open-card" data-card-id="${card.id}" class="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gold transition hover:text-gold2 sm:text-[13px]">${icon('eye','w-4 h-4')} View Details</button></div></article>`).join('')}</div></div>`;
  const filter = document.getElementById('card-filter');
  if (filter) filter.value = state.cardFilterStatus;
  safeCreateIcons();
}

function buildHistory() {
  document.getElementById('main-slot').innerHTML = `<div class="space-y-6 animate-fadeUp"><div class="mb-2 flex items-center justify-between"><span class="text-xs text-soft sm:text-sm">79 results</span><div class="relative"><select id="history-filter" class="appearance-none rounded-md border border-line bg-black/30 py-2 pl-3 pr-8 text-[11px] font-semibold uppercase tracking-[0.12em] text-cream outline-none focus:border-gold sm:text-[13px]"><option value="ALL">Filter type: All</option><option value="E-Voucher">E-Voucher</option><option value="E-Gift Card">E-Gift Card</option></select><span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-soft">${icon('chevron-down','w-4 h-4')}</span></div></div><div class="flex items-center justify-between border-b border-zinc-800 pb-2 text-cream"><span class="text-xs font-semibold uppercase tracking-[0.16em] text-gold sm:text-sm">November, 2024</span><span class="text-xs text-soft sm:text-sm">(3)</span></div><div class="overflow-hidden rounded-2xl border border-line bg-panel shadow-luxury">${[1,2,3].map(() => `<div class="cursor-pointer border-b border-line p-5 transition hover:bg-zinc-950 last:border-b-0"><div class="mb-2 flex items-center justify-between"><div class="text-[11px] uppercase tracking-[0.12em] text-soft sm:text-[13px]">TxID <span class="ml-1 font-semibold text-cream">1760****7179</span></div><div class="text-sm font-semibold text-gold sm:text-base-1">$5,000</div></div><div class="flex items-center justify-between"><div class="text-[11px] text-zinc-500 sm:text-[13px]">Nov 27, 2024 09:09 PM</div><div class="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-400 sm:text-[12px]">Completed</div></div><div class="mt-3 flex justify-end border-t border-line/50 pt-3"><button class="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gold transition hover:text-gold2 sm:text-[13px]">${icon('eye','w-4 h-4')} View Details</button></div></div>`).join('')}</div></div>`;
  document.getElementById('history-filter').value = state.historyFilter;
  safeCreateIcons();
}

function buildBatchDetail() {
  const batch = state.selectedBatch;
  const dists = mockDistributions[batch?.id] || [];
  const progress = batch ? ((batch.distributed / batch.amount) * 100).toFixed(0) : 0;
  document.getElementById('main-slot').innerHTML = `<div class="animate-fadeUp"><div class="sticky top-[73px] z-10 flex border-b border-line bg-panel/80 px-6 backdrop-blur-md"><button data-action="batch-tab" data-batch-tab="overview" class="relative flex-1 pb-4 pt-5 text-[11px] font-semibold uppercase tracking-[0.12em] ${state.batchTab === 'overview' ? 'text-gold' : 'text-soft'}">Overview${state.batchTab === 'overview' ? '<span class="absolute inset-x-6 bottom-0 h-0.5 bg-gradient-to-r from-gold to-gold2"></span>' : ''}</button><button data-action="batch-tab" data-batch-tab="distributed" class="relative flex-1 pb-4 pt-5 text-[11px] font-semibold uppercase tracking-[0.12em] ${state.batchTab === 'distributed' ? 'text-gold' : 'text-soft'}">Distributed${state.batchTab === 'distributed' ? '<span class="absolute inset-x-6 bottom-0 h-0.5 bg-gradient-to-r from-gold to-gold2"></span>' : ''}</button><button data-action="batch-tab" data-batch-tab="receipt" class="relative flex-1 pb-4 pt-5 text-[11px] font-semibold uppercase tracking-[0.12em] ${state.batchTab === 'receipt' ? 'text-gold' : 'text-soft'}">Tax Receipt${state.batchTab === 'receipt' ? '<span class="absolute inset-x-6 bottom-0 h-0.5 bg-gradient-to-r from-gold to-gold2"></span>' : ''}</button></div><div class="p-4 sm:p-6">${state.batchTab === 'overview' ? `<div class="space-y-4 rounded-2xl border border-line bg-panel p-6 shadow-luxury"><div><h4 class="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-gold sm:text-base-1">Batch #${batch.id}</h4><p class="mb-1 text-sm text-soft sm:text-[15px]">Purpose: <span class="font-semibold text-cream">${batch.purpose}</span></p><p class="text-sm text-soft sm:text-[15px]">Donated on: <span class="font-semibold text-cream">${batch.date}</span></p></div><div class="relative overflow-hidden rounded-2xl border border-line bg-black/30 p-6"><div class="absolute inset-x-10 top-4 h-24 rounded-full bg-gold/5 blur-3xl"></div><div class="relative z-10"><div class="mb-7 text-center"><span class="mb-2 block text-[10px] uppercase tracking-[0.16em] text-soft sm:text-[12px]">Total Donation Amount</span><div class="text-3xl font-bold tracking-wide text-gold sm:text-4xl">${formatNumber(batch.amount)} <span class="text-lg sm:text-xl">${batch.currency}</span></div></div><div class="mb-6"><div class="mb-2.5 flex items-end justify-between"><span class="text-[12px] font-semibold text-cream sm:text-[14px]">Distribution Progress</span><span class="text-[14px] font-bold text-gold sm:text-[16px]">${progress}%</span></div><div class="h-3 overflow-hidden rounded-full bg-zinc-800"><div class="h-full rounded-full bg-gradient-to-r from-amber-700 via-gold to-gold2" style="width:${progress}%"></div></div></div><div class="grid grid-cols-2 gap-4 border-t border-line/60 pt-5"><div><div class="mb-1 flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-gold"></span><span class="text-[10px] uppercase tracking-[0.16em] text-soft sm:text-[12px]">Distributed</span></div><div class="ml-4 text-[13px] font-semibold text-cream sm:text-[15px]">${formatNumber(batch.distributed)} <span class="text-[11px] text-zinc-500 sm:text-[13px]">${batch.currency}</span></div></div><div><div class="mb-1 flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-zinc-600"></span><span class="text-[10px] uppercase tracking-[0.16em] text-soft sm:text-[12px]">Remaining</span></div><div class="ml-4 text-[13px] font-semibold text-cream sm:text-[15px]">${formatNumber(batch.amount - batch.distributed)} <span class="text-[11px] text-zinc-500 sm:text-[13px]">${batch.currency}</span></div></div></div></div></div></div>` : state.batchTab === 'distributed' ? `<div class="space-y-5">${dists.map(dist => `<article class="rounded-2xl border border-line bg-panel p-5 shadow-luxury"><div class="flex items-start justify-between gap-3"><span class="max-w-[70%] truncate text-[13px] font-semibold text-cream sm:text-[15px]">${dist.recipient}</span><span class="text-[13px] font-semibold text-gold sm:text-[15px]">${formatNumber(dist.amount)} ${dist.currency}</span></div><p class="mt-1 text-[11px] uppercase tracking-[0.12em] text-zinc-500 sm:text-[13px]">Distributed on: ${dist.date}</p><div class="mt-4 flex items-center justify-between border-t border-line pt-4"><span class="rounded px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-[12px] ${badgeClasses(dist.status)}">${dist.status}</span><button data-action="open-dist" data-dist-id="${dist.id}" class="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gold transition hover:text-gold2 sm:text-[13px]">${icon('eye','w-4 h-4')} View Details</button></div></article>`).join('')}</div>` : `<div class="mx-auto max-w-[420px] space-y-6 rounded-2xl border border-line bg-panel p-6 shadow-luxury sm:p-8"><div class="relative border-b border-dashed border-line pb-6 text-center"><div class="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-panel px-4 text-gold">${icon('badge-check','w-7 h-7')}</div><h5 class="mb-2 mt-4 text-lg font-semibold tracking-wide text-gold sm:text-xl">VLINKPAY FOUNDATION</h5><p class="mb-1 text-[11px] uppercase tracking-[0.16em] text-soft sm:text-[13px]">EIN: 92-0312176</p><p class="text-[11px] uppercase tracking-[0.16em] text-soft sm:text-[13px]">5444 Westheimer Rd Ste 1000, Houston, TX</p></div><div class="text-center"><h6 class="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gold sm:text-[12px]">Foundation Receipt</h6><p class="mb-1 text-[12px] text-zinc-300 sm:text-[14px]">Receipt ID: <span class="font-semibold text-cream">FND-RCPT-2025-11892</span></p><p class="text-[12px] text-zinc-300 sm:text-[14px]">Date Issued: <span class="font-semibold text-cream">Oct 28, 2025 - 09:00</span></p></div><div class="space-y-6"><div><h6 class="mb-4 inline-block border-b border-gold/30 pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gold sm:text-[13px]">Donor Information</h6><p class="mb-2 flex justify-between text-[12px] text-soft sm:text-[14px]"><span>Full Name:</span><span class="text-right font-semibold text-cream">Nguyen Van A</span></p><p class="mb-2 flex justify-between text-[12px] text-soft sm:text-[14px]"><span>Email:</span><span class="text-right font-semibold text-cream">nguyen@email.com</span></p><p class="flex justify-between text-[12px] text-soft sm:text-[14px]"><span>Wallet Address:</span><span class="text-right font-semibold text-cream">0xA83F...9C21</span></p></div><div><h6 class="mb-4 inline-block border-b border-gold/30 pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gold sm:text-[13px]">Donation Summary</h6><p class="mb-2 flex justify-between text-[12px] text-soft sm:text-[14px]"><span>Batch ID:</span><span class="text-right font-semibold text-cream">#${batch.id}</span></p><p class="mb-2 flex justify-between text-[12px] text-soft sm:text-[14px]"><span>Program:</span><span class="text-right font-semibold text-cream">${batch.purpose}</span></p><div class="mt-3 flex items-center justify-between border-t border-dashed border-line pt-3"><span class="text-[12px] uppercase tracking-[0.14em] text-soft sm:text-[14px]">Amount</span><span class="text-lg font-semibold text-gold">${formatNumber(batch.amount)} ${batch.currency}</span></div></div></div><div class="rounded border border-line bg-black/30 p-4 sm:p-5"><p class="text-center text-[11px] leading-relaxed text-soft sm:text-[12px]">Your donation has been recorded for tax and supporting documentation purposes. No goods or services were provided in exchange for this donation.</p></div><button data-action="download-receipt" class="w-full rounded-lg border border-gold py-3.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-gold transition hover:bg-gold hover:text-black sm:text-[13px]">Download Tax Receipt</button></div>`}</div></div>`;
  safeCreateIcons();
}

function buildDistDetail() {
  const dist = state.selectedDist;
  document.getElementById('main-slot').innerHTML = `<div class="animate-fadeUp"><div class="rounded-2xl border border-line bg-panel p-6 shadow-luxury sm:p-8"><h6 class="mb-5 inline-block border-b border-gold/30 pb-2 text-sm font-semibold uppercase tracking-[0.16em] text-gold sm:text-base-1">Distribution Details</h6><div class="space-y-4"><div class="flex items-start justify-between gap-4"><span class="text-sm text-soft sm:text-[15px]">Recipient</span><span class="text-right font-semibold text-cream sm:text-[15px]">${dist.recipient}</span></div><div class="flex items-start justify-between gap-4"><span class="text-sm text-soft sm:text-[15px]">Address</span><span class="text-right font-semibold text-cream sm:text-[15px]">${dist.address}</span></div><div class="flex items-start justify-between gap-4"><span class="text-sm text-soft sm:text-[15px]">Amount</span><span class="text-right font-semibold text-gold sm:text-lg">${formatNumber(dist.amount)} ${dist.currency}</span></div><div class="flex items-start justify-between gap-4"><span class="text-sm text-soft sm:text-[15px]">Date</span><span class="text-right font-semibold text-cream sm:text-[15px]">${dist.date}</span></div><div class="flex items-start justify-between gap-4"><span class="text-sm text-soft sm:text-[15px]">Status</span><span class="rounded px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-[12px] ${badgeClasses(dist.status)}">${dist.status}</span></div><div class="flex items-start justify-between gap-4 border-t border-line pt-4"><span class="text-sm text-soft sm:text-[15px]">Proof</span>${dist.hasProof ? `<button data-action="open-proof" class="text-sm font-semibold text-gold hover:underline sm:text-[15px]">[View]</button>` : '<span class="text-sm italic text-zinc-500 sm:text-[15px]">Not available</span>'}</div></div></div></div>`;
  safeCreateIcons();
}

function buildCardDetail() {
  const card = state.selectedCard;
  document.getElementById('main-slot').innerHTML = `<div class="animate-fadeUp"><div class="rounded-2xl border border-line bg-panel p-6 shadow-luxury sm:p-8"><h6 class="mb-5 inline-block border-b border-gold/30 pb-2 text-sm font-semibold uppercase tracking-[0.16em] text-gold sm:text-base-1">E-Gift Card</h6><div class="space-y-4"><div class="flex items-center justify-between"><span class="text-sm text-soft sm:text-[15px]">Status</span><span class="rounded px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-[12px] ${badgeClasses(card.status)}">${card.status}</span></div><div class="flex items-center justify-between"><span class="text-sm text-soft sm:text-[15px]">Card Number</span><span class="text-[13px] font-semibold tracking-widest text-cream sm:text-[15px]">${card.maskedNumber}</span></div><div class="flex items-center justify-between"><span class="text-sm text-soft sm:text-[15px]">Card Value</span><span class="text-[15px] font-semibold text-gold sm:text-lg">${formatNumber(card.value)} ${card.currency}</span></div><div class="flex items-center justify-between"><span class="text-sm text-soft sm:text-[15px]">Created Date</span><span class="text-[13px] font-semibold text-cream sm:text-[15px]">${card.createdDate}</span></div>${(card.status === 'Gifted' || card.status === 'Redeemed') ? `<div class="my-3 h-px bg-line"></div><h6 class="text-[11px] font-bold uppercase tracking-[0.14em] text-gold sm:text-[13px]">Recipient</h6><div class="flex items-start justify-between gap-4"><span class="text-sm text-soft sm:text-[15px]">Recipient Name</span><span class="text-right font-semibold text-cream sm:text-[15px]">${card.recipientName || ''}</span></div>${card.recipientEmail ? `<div class="flex items-start justify-between gap-4"><span class="text-sm text-soft sm:text-[15px]">Recipient Email</span><span class="text-right font-semibold text-cream sm:text-[15px]">${card.recipientEmail}</span></div>` : ''}` : ''}${card.status === 'Redeemed' ? `<div class="my-3 h-px bg-line"></div><h6 class="text-[11px] font-bold uppercase tracking-[0.14em] text-gold sm:text-[13px]">Redemption Details</h6><div class="flex items-center justify-between"><span class="text-sm text-soft sm:text-[15px]">Redeemer</span><span class="font-semibold text-cream sm:text-[15px]">${card.redeemerName}</span></div><div class="flex items-start justify-between gap-4"><span class="text-sm text-soft sm:text-[15px]">Merchant</span><span class="max-w-[60%] text-right font-semibold text-cream sm:text-[15px]">${card.merchant}</span></div><div class="flex items-center justify-between"><span class="text-sm text-soft sm:text-[15px]">Date</span><span class="font-semibold text-cream sm:text-[15px]">${card.redeemedDate}</span></div><div class="flex items-center justify-between border-t border-line pt-4"><span class="text-sm text-soft sm:text-[15px]">Proof of Redemption</span>${card.hasProof ? `<button data-action="open-proof" class="text-[12px] font-semibold text-gold hover:underline sm:text-[14px]">[View]</button>` : '<span class="text-[12px] italic text-zinc-500 sm:text-[14px]">Not available</span>'}</div>` : ''}${card.status === 'Available' ? `<button data-action="open-qr" class="mx-auto mt-6 block rounded-lg bg-gradient-to-r from-gold to-gold2 px-10 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-black transition hover:scale-105 sm:text-[13px]">Gift via QR</button>` : ''}</div></div></div>`;
  safeCreateIcons();
}

function buildQrView() {
  const card = state.selectedCard;
  document.getElementById('main-slot').innerHTML = `<div class="mx-auto max-w-md animate-fadeUp"><div class="rounded-2xl border border-line bg-panel p-8 text-center shadow-luxury"><div class="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gold/10 text-gold">${icon('qr-code','w-8 h-8')}</div><h3 class="mb-2 text-lg font-semibold text-cream">Gift via QR Code</h3><p class="mb-6 text-sm text-soft">Show this QR to share card <span class="font-semibold text-cream">${card?.maskedNumber || ''}</span>.</p><div class="mx-auto mb-6 grid h-56 w-56 place-items-center rounded-2xl border border-dashed border-gold/40 bg-black/30 text-gold">QR Placeholder</div><button data-action="back" class="rounded-lg border border-gold px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-gold transition hover:bg-gold hover:text-black sm:text-[13px]">Back</button></div></div>`;
  safeCreateIcons();
}

function buildProofView() {
  document.getElementById('main-slot').innerHTML = `<div class="mx-auto max-w-3xl animate-fadeUp"><div class="rounded-2xl border border-line bg-panel p-6 shadow-luxury sm:p-8"><h3 class="mb-4 text-lg font-semibold text-gold">Uploaded Proof</h3><div class="grid h-[420px] place-items-center rounded-2xl border border-dashed border-gold/30 bg-black/30 text-soft">Proof image / file preview placeholder</div></div></div>`;
}

function renderModal() {
  const slot = document.getElementById('modal-slot');
  if (!state.isSuccess) { slot.innerHTML = ''; return; }
  slot.innerHTML = `<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"><div class="w-full max-w-md rounded-2xl border border-gold/20 bg-panel p-6 text-center shadow-luxury"><div class="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-gold/10 text-gold">${icon('check-circle-2','w-7 h-7')}</div><h3 class="mb-2 text-xl font-semibold text-cream">Payment Successful</h3><p class="mb-6 text-sm text-soft">Your transaction was completed successfully.</p><div class="flex gap-3"><button data-action="close-success" class="flex-1 rounded-lg border border-line px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.14em] text-cream transition hover:bg-zinc-900">Close</button><button data-action="view-after-success" class="flex-1 rounded-lg bg-gradient-to-r from-gold to-gold2 px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.14em] text-black transition hover:scale-[1.02]">View ${state.flowType === 'voucher' ? 'Voucher' : 'Cards'}</button></div></div></div>`;
  safeCreateIcons();
}

function safeCreateIcons() {
  if (window.lucide?.createIcons) window.lucide.createIcons();
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
  renderRoute(true);
}

function handleBack() {
  if (state.viewMode === 'batch') state.viewMode = 'list';
  else if (state.viewMode === 'dist') state.viewMode = 'batch';
  else if (state.viewMode === 'cardDetail') state.viewMode = 'cardList';
  else if (state.viewMode === 'qr') state.viewMode = 'cardDetail';
  else if (state.viewMode === 'proof') state.viewMode = state.activeTab === 'card' ? 'cardDetail' : 'dist';
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
  if (action === 'switch-tab') return switchTab(target.dataset.tab);
  if (action === 'set-flow') {
    state.flowType = target.dataset.flow;
    renderRoute(true);
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
  if (action === 'open-qr') { state.viewMode = 'qr'; return renderRoute(true); }
  if (action === 'open-proof') { state.viewMode = 'proof'; return renderRoute(true); }
  if (action === 'download-receipt') { alert('Downloading Receipt...'); return; }
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
  if (t.id === 'history-filter') { state.historyFilter = t.value; }
});

ensureShell();
renderRoute(true);
