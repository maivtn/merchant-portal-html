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

function icon(name, classes = 'w-4 h-4') {
  return `<i data-lucide="${name}" class="${classes}"></i>`;
}

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
function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
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

function showTabs() {
  return ['buy', 'list', 'cardList', 'history'].includes(state.viewMode);
}

function handleTabSwitch(tabId) {
  state.activeTab = tabId;
  if (tabId === 'voucher') state.viewMode = 'list';
  else if (tabId === 'card') state.viewMode = 'cardList';
  else if (tabId === 'history') state.viewMode = 'history';
  else {
    state.viewMode = 'buy';
    state.flowType = 'voucher';
  }
  render();
}

function startNewDonation(type) {
  state.viewMode = 'buy';
  state.flowType = type || 'voucher';
  render();
}

function handleBack() {
  if (state.viewMode === 'batch') state.viewMode = 'list';
  else if (state.viewMode === 'dist') state.viewMode = 'batch';
  else if (state.viewMode === 'cardDetail') state.viewMode = 'cardList';
  else if (state.viewMode === 'qr') state.viewMode = 'cardDetail';
  else if (state.viewMode === 'proof') state.viewMode = state.activeTab === 'card' ? 'cardDetail' : 'dist';
  render();
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
  render();
}

function header() {
  return `
    <header class="sticky top-0 z-30 border-b border-line bg-panel/90 backdrop-blur-xl">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div class="w-28">
          ${['batch', 'dist', 'cardDetail', 'qr', 'proof'].includes(state.viewMode) ? `
            <button data-action="back" class="inline-flex items-center gap-2 text-sm font-bold text-gold transition hover:text-gold2">
              ${icon('arrow-left', 'w-4 h-4')} Back
            </button>` : ''}
        </div>
        <h1 class="bg-gradient-to-r from-gold via-yellow-100 to-gold bg-clip-text text-center text-sm font-extrabold uppercase tracking-[0.18em] text-transparent sm:text-base">${getHeaderTitle()}</h1>
        <div class="w-28"></div>
      </div>
    </header>`;
}

function tabs() {
  if (!showTabs()) return '';
  const list = [
    { id: 'all', label: 'Buy Gift Charity' },
    { id: 'voucher', label: 'Charity E-Voucher' },
    { id: 'card', label: 'Charity E-Gift Card' },
    { id: 'history', label: 'Transaction History' },
  ];
  return `
  <div class="sticky top-[73px] z-20 border-b border-line bg-panel/80 backdrop-blur-xl">
    <div class="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pt-4 sm:px-6">
      ${list.map(tab => `
        <button data-action="switch-tab" data-tab="${tab.id}" class="relative whitespace-nowrap px-3 pb-4 text-[11px] font-semibold uppercase tracking-[0.12em] transition ${state.activeTab === tab.id ? 'text-gold' : 'text-soft hover:text-cream'}">
          ${tab.label}
          ${state.activeTab === tab.id ? '<span class="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-gold to-gold2"></span>' : ''}
        </button>`).join('')}
    </div>
  </div>`;
}

function panel(step, title, body) {
  return `
    <section class="overflow-hidden rounded-2xl border border-line bg-panel shadow-luxury animate-fadeUp">
      <div class="flex items-center gap-4 border-b border-line bg-black/30 px-5 py-4 sm:px-6">
        <div class="grid h-8 w-8 place-items-center rounded-full border border-gold text-xs font-bold text-gold">${step}</div>
        <h3 class="bg-gradient-to-r from-gold to-gold2 bg-clip-text text-xs font-bold uppercase tracking-[0.2em] text-transparent">${title}</h3>
      </div>
      <div class="p-5 sm:p-6">${body}</div>
    </section>`;
}

function invoiceBlock() {
  if (state.flowType === 'voucher') {
    return `
      <div class="space-y-3 text-sm sm:text-[15px]">
        <div class="flex items-center justify-between text-zinc-300"><span>Donation Amount</span><strong class="text-cream">$${formatNumber(numericAmount())}</strong></div>
        <div class="flex items-center justify-between text-zinc-300"><span>Platform Fee (1.5%)</span><strong class="text-gold">$${formatNumber(platformFee().toFixed(2))}</strong></div>
        <div class="h-px bg-line"></div>
        <div class="flex items-center justify-between"><strong class="text-sm uppercase tracking-[0.14em] text-cream">Total</strong><strong class="bg-gradient-to-r from-gold to-gold2 bg-clip-text text-2xl font-bold text-transparent">$${formatNumber(voucherTotal().toFixed(2))}</strong></div>
      </div>`;
  }
  return `
    <div class="space-y-3 text-sm sm:text-[15px]">
      <div class="flex items-center justify-between text-zinc-300"><span>Gift Card Value</span><strong class="text-cream">$${formatNumber(numericCardValue())}</strong></div>
      <div class="flex items-center justify-between text-zinc-300"><span>Quantity</span><strong class="text-cream">x${state.quantity}</strong></div>
      <div class="h-px bg-line"></div>
      <div class="flex items-center justify-between"><strong class="text-sm uppercase tracking-[0.14em] text-cream">Total</strong><strong class="bg-gradient-to-r from-gold to-gold2 bg-clip-text text-2xl font-bold text-transparent">$${formatNumber(cardTotal().toFixed(2))}</strong></div>
    </div>`;
}

function renderVoucherDetails() {
  return `
    <div class="space-y-8">
      <div>
        <h4 class="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-cream">Select Purpose</h4>
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
          ${purposes.map(item => `
            <button data-action="set-purpose" data-purpose="${item.id}" class="relative rounded-2xl border p-4 text-center transition ${state.purpose === item.id ? 'border-gold bg-gold/5 shadow-gold' : 'border-line hover:border-gold/70 hover:bg-gold/5'}">
              <div class="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-xl ${state.purpose === item.id ? 'bg-gradient-to-br from-gold to-amber-700 text-black' : 'bg-zinc-900 text-soft'}">${icon(item.icon, 'w-5 h-5')}</div>
              <div class="text-[11px] font-semibold uppercase tracking-[0.08em] sm:text-xs">${item.label}</div>
              ${state.purpose === item.id ? '<div class="absolute right-3 top-3 grid h-4 w-4 place-items-center rounded-full bg-gradient-to-r from-gold to-gold2 text-black">' + icon('check', 'w-3 h-3') + '</div>' : ''}
            </button>`).join('')}
        </div>
      </div>

      <div>
        <h4 class="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-cream">Donation Amount</h4>
        <div class="flex gap-4">
          <div class="relative w-28 shrink-0">
            <select data-model="currency" class="h-14 w-full rounded-xl border border-line bg-black px-4 pr-10 font-semibold text-gold outline-none focus:border-gold">
              <option value="USD" ${state.currency === 'USD' ? 'selected' : ''}>USD</option>
              <option value="VND" ${state.currency === 'VND' ? 'selected' : ''}>VND</option>
            </select>
            <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold">${icon('chevron-down', 'w-4 h-4')}</span>
          </div>
          <input data-model="amount" value="${escapeHtml(state.amount)}" placeholder="0.00" class="h-14 flex-1 rounded-xl border border-line bg-black px-5 text-sm text-cream outline-none focus:border-gold sm:text-base" />
        </div>
      </div>
    </div>`;
}

function renderCardDetails() {
  return `
    <div class="space-y-8">
      <div>
        <h4 class="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-cream">Select Currency & Value</h4>
        <div class="flex gap-4">
          <div class="relative w-28 shrink-0">
            <select data-model="currency" class="h-14 w-full rounded-xl border border-line bg-black px-4 pr-10 font-semibold text-gold outline-none focus:border-gold">
              <option value="USD" ${state.currency === 'USD' ? 'selected' : ''}>USD</option>
              <option value="VND" ${state.currency === 'VND' ? 'selected' : ''}>VND</option>
            </select>
            <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold">${icon('chevron-down', 'w-4 h-4')}</span>
          </div>
          <input data-model="cardValue" value="${escapeHtml(state.cardValue)}" placeholder="Enter value" class="h-14 flex-1 rounded-xl border border-line bg-black px-5 text-sm text-cream outline-none focus:border-gold sm:text-base" />
        </div>
      </div>

      <div class="flex items-center justify-between rounded-2xl border border-line bg-black px-4 py-4">
        <div class="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-300 sm:text-[13px]">Quantity</div>
        <div class="inline-flex items-center gap-3 rounded-xl border border-line bg-panel p-1">
          <button data-action="qty-minus" class="grid h-9 w-9 place-items-center rounded-lg text-soft transition hover:bg-zinc-900 hover:text-gold">${icon('minus', 'w-4 h-4')}</button>
          <span class="min-w-[24px] text-center font-bold">${state.quantity}</span>
          <button data-action="qty-plus" class="grid h-9 w-9 place-items-center rounded-lg text-gold transition hover:bg-gold/10">${icon('plus', 'w-4 h-4')}</button>
        </div>
      </div>

      <div class="space-y-4">
        <label class="flex cursor-pointer items-center gap-3">
          <input type="checkbox" data-model="sendDirectly" ${state.sendDirectly ? 'checked' : ''} class="peer hidden" />
          <span class="grid h-5 w-5 place-items-center rounded border ${state.sendDirectly ? 'border-gold bg-gradient-to-r from-gold to-gold2 text-black' : 'border-zinc-600 bg-black text-transparent'}">${icon('check', 'w-3 h-3')}</span>
          <span class="text-sm text-cream sm:text-[15px]">Send directly to a recipient</span>
        </label>

        ${state.sendDirectly ? `
          <div class="grid gap-4 animate-fadeUp">
            <input data-model="recipientName" value="${escapeHtml(state.recipientName)}" placeholder="Recipient Name (Optional)" class="h-12 rounded-xl border border-line bg-black px-4 text-sm text-cream outline-none focus:border-gold sm:text-[15px]" />
            <input data-model="recipientEmail" value="${escapeHtml(state.recipientEmail)}" placeholder="Recipient Email *" class="h-12 rounded-xl border border-line bg-black px-4 text-sm text-cream outline-none focus:border-gold sm:text-[15px]" />
          </div>` : ''}
      </div>
    </div>`;
}

function renderBuyFlow() {
  return `
    <div class="space-y-6">
      ${panel('01', 'Gift Type', `
        <p class="mb-5 text-sm text-soft">Choose how you want to share your contribution</p>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <button data-action="set-flow" data-flow="voucher" class="flex items-center gap-4 rounded-2xl border p-5 text-left transition ${state.flowType === 'voucher' ? 'border-gold bg-gold/5 shadow-gold' : 'border-line hover:border-gold/70 hover:bg-gold/5'}">
            <div class="grid h-12 w-12 shrink-0 place-items-center rounded-xl ${state.flowType === 'voucher' ? 'bg-gradient-to-br from-gold to-amber-700 text-black' : 'bg-zinc-900 text-soft'}">${icon('package', 'w-5 h-5')}</div>
            <div>
              <div class="mb-1 text-sm font-semibold text-cream sm:text-[15px]">Charity E-Voucher</div>
              <div class="text-[13px] leading-relaxed text-soft">Donate directly to a cause and share the impact.</div>
            </div>
          </button>
          <button data-action="set-flow" data-flow="card" class="flex items-center gap-4 rounded-2xl border p-5 text-left transition ${state.flowType === 'card' ? 'border-gold bg-gold/5 shadow-gold' : 'border-line hover:border-gold/70 hover:bg-gold/5'}">
            <div class="grid h-12 w-12 shrink-0 place-items-center rounded-xl ${state.flowType === 'card' ? 'bg-gradient-to-br from-gold to-amber-700 text-black' : 'bg-zinc-900 text-soft'}">${icon('gift', 'w-5 h-5')}</div>
            <div>
              <div class="mb-1 text-sm font-semibold text-cream sm:text-[15px]">Charity E-Gift Card</div>
              <div class="text-[13px] leading-relaxed text-soft">Buy a gift card that lets the recipient choose.</div>
            </div>
          </button>
        </div>`)}

      ${panel('02', state.flowType === 'card' ? 'Gift Card Details' : 'Donation Details', state.flowType === 'voucher' ? renderVoucherDetails() : renderCardDetails())}

      ${panel('03', 'Payment', `
        <div class="space-y-8">
          <div>
            <h4 class="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-cream">Payment Method</h4>
            <div class="space-y-3">
              ${paymentMethods.map(pm => `
                <button data-action="set-payment" data-payment="${pm.id}" class="flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition ${state.paymentMethod === pm.id ? 'border-gold bg-gold/5 shadow-gold' : 'border-line hover:border-gold/70 hover:bg-gold/5'}">
                  <div class="flex items-center gap-4">
                    <span class="grid h-4 w-4 place-items-center rounded-full border ${state.paymentMethod === pm.id ? 'border-gold' : 'border-zinc-600'}">
                      <span class="h-2 w-2 rounded-full ${state.paymentMethod === pm.id ? 'bg-gold' : 'bg-transparent'}"></span>
                    </span>
                    <span class="grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-line bg-white"><img src="${pm.image}" alt="${pm.id}" class="h-full w-full object-cover p-1"></span>
                    <strong class="text-sm text-cream sm:text-[15px]">${pm.id}</strong>
                  </div>
                  <div class="text-right">
                    <div class="text-[10px] uppercase tracking-[0.12em] text-soft sm:text-xs">Available</div>
                    <div class="text-[12px] font-semibold text-gold sm:text-sm">${pm.id === 'BTC' ? '' : '$'}${pm.available}</div>
                  </div>
                </button>`).join('')}
            </div>
          </div>

          <div class="rounded-2xl border border-line bg-black p-5">
            <div class="mb-5 flex items-center gap-3 text-gold">
              ${icon('shield-check', 'w-4 h-4')}
              <h4 class="bg-gradient-to-r from-gold to-gold2 bg-clip-text text-[11px] font-bold uppercase tracking-[0.22em] text-transparent sm:text-[13px]">Invoice Summary</h4>
            </div>
            ${invoiceBlock()}
          </div>

          <div class="text-center">
            <button data-action="confirm-payment" ${canProceedToPayment() ? '' : 'disabled'} class="rounded-xl px-10 py-3 text-[13px] font-extrabold uppercase tracking-[0.16em] transition ${canProceedToPayment() ? 'bg-gradient-to-r from-gold via-yellow-100 to-gold text-black hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(212,175,55,0.35)]' : 'cursor-not-allowed border border-line bg-zinc-900 text-zinc-500'}">Confirm Payment</button>
          </div>
        </div>`)}
    </div>`;
}

function renderBatchList() {
  const items = state.filterStatus === 'ALL' ? mockBatches : mockBatches.filter(b => b.status === state.filterStatus);
  return `
    <div class="space-y-5">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="relative w-full sm:w-auto">
          <select data-model="filterStatus" class="h-10 w-full rounded-lg border border-line bg-black pl-3 pr-10 text-[11px] font-semibold uppercase tracking-[0.1em] text-cream outline-none focus:border-gold sm:w-auto">
            <option value="ALL" ${state.filterStatus === 'ALL' ? 'selected' : ''}>All Statuses</option>
            <option value="In Distribution" ${state.filterStatus === 'In Distribution' ? 'selected' : ''}>In Distribution</option>
            <option value="Distributed" ${state.filterStatus === 'Distributed' ? 'selected' : ''}>Distributed</option>
            <option value="Completed" ${state.filterStatus === 'Completed' ? 'selected' : ''}>Completed</option>
          </select>
          <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-soft">${icon('chevron-down', 'w-4 h-4')}</span>
        </div>
        <button data-action="new-donation" data-type="voucher" class="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gold to-gold2 px-5 py-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-black transition hover:scale-[1.02]">${icon('plus', 'w-4 h-4')} Donate Now</button>
      </div>

      ${items.map(batch => `
        <div class="rounded-2xl border border-line bg-panel p-5 shadow-luxury transition hover:-translate-y-1 hover:border-gold/60 hover:shadow-gold">
          <div class="mb-2 flex items-start justify-between gap-4">
            <div class="text-sm font-semibold tracking-[0.05em] text-cream sm:text-[15px]">BATCH #${batch.id}</div>
            <div class="text-sm font-semibold text-gold sm:text-[15px]">${formatNumber(batch.amount)} ${batch.currency}</div>
          </div>
          <div class="mb-1 text-sm text-zinc-300">${batch.purpose}</div>
          <div class="text-[11px] uppercase tracking-[0.1em] text-zinc-500 sm:text-[13px]">Donated: ${batch.date}</div>
          <div class="mt-4 flex items-center justify-between border-t border-line pt-4">
            <span class="rounded px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${badgeClasses(batch.status)}">${batch.status}</span>
            <button data-action="open-batch" data-id="${batch.id}" class="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.08em] text-gold transition hover:text-gold2 sm:text-[13px]">${icon('eye', 'w-4 h-4')} View Details</button>
          </div>
        </div>`).join('')}
    </div>`;
}

function renderCardList() {
  const cards = state.cardSubTab === 'egift'
    ? mockGiftCards.filter(c => c.status !== 'Redeemed' && (state.cardFilterStatus === 'ALL' || c.status === state.cardFilterStatus))
    : mockGiftCards.filter(c => c.status === 'Redeemed');

  return `
    <div class="space-y-5">
      <div class="mx-auto flex max-w-sm rounded-xl border border-line bg-black p-1">
        <button data-action="card-subtab" data-subtab="egift" class="flex-1 rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition ${state.cardSubTab === 'egift' ? 'border border-zinc-700 bg-panel text-gold' : 'text-soft'}">E-Gift Card</button>
        <button data-action="card-subtab" data-subtab="redeem" class="flex-1 rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition ${state.cardSubTab === 'redeem' ? 'border border-zinc-700 bg-panel text-gold' : 'text-soft'}">Redeem History</button>
      </div>

      ${state.cardSubTab === 'egift' ? `
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div class="relative w-full sm:w-auto">
            <select data-model="cardFilterStatus" class="h-10 w-full rounded-lg border border-line bg-black pl-3 pr-10 text-[11px] font-semibold uppercase tracking-[0.1em] text-cream outline-none focus:border-gold sm:w-auto">
              <option value="ALL" ${state.cardFilterStatus === 'ALL' ? 'selected' : ''}>Filter Status: All</option>
              <option value="Available" ${state.cardFilterStatus === 'Available' ? 'selected' : ''}>Available</option>
              <option value="Gifted" ${state.cardFilterStatus === 'Gifted' ? 'selected' : ''}>Gifted</option>
            </select>
            <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-soft">${icon('chevron-down', 'w-4 h-4')}</span>
          </div>
          <button data-action="new-donation" data-type="card" class="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gold to-gold2 px-5 py-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-black transition hover:scale-[1.02]">${icon('plus', 'w-4 h-4')} Buy Gift Card</button>
        </div>` : ''}

      ${cards.map(card => `
        <div class="rounded-2xl border border-line bg-panel p-5 shadow-luxury transition hover:-translate-y-1 hover:border-gold/60 hover:shadow-gold">
          <div class="mb-2 flex items-start justify-between gap-4">
            <div class="text-sm font-semibold tracking-[0.05em] text-cream sm:text-[15px]">CARD ${card.maskedNumber}</div>
            <div class="text-sm font-semibold text-gold sm:text-[15px]">${formatNumber(card.value)} ${card.currency}</div>
          </div>
          ${card.status === 'Gifted' ? `<div class="mb-1 truncate text-sm text-zinc-300">Recipient: ${card.recipientName}</div>` : ''}
          ${card.status === 'Redeemed' ? `<div class="mb-1 truncate text-sm text-zinc-300">Redeemed by: ${card.redeemerName}</div>` : ''}
          <div class="text-[11px] uppercase tracking-[0.1em] text-zinc-500 sm:text-[13px]">Created: ${card.createdDate}</div>
          <div class="mt-4 flex items-center justify-between border-t border-line pt-4">
            <span class="rounded px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${badgeClasses(card.status)}">${card.status}</span>
            <button data-action="open-card" data-id="${card.id}" class="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.08em] text-gold transition hover:text-gold2 sm:text-[13px]">${icon('eye', 'w-4 h-4')} View Details</button>
          </div>
        </div>`).join('')}
    </div>`;
}

function renderHistory() {
  return `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <span class="text-xs text-soft sm:text-sm">79 results</span>
        <div class="relative">
          <select data-model="historyFilter" class="h-10 rounded-lg border border-line bg-black pl-3 pr-10 text-[11px] font-semibold uppercase tracking-[0.1em] text-cream outline-none focus:border-gold">
            <option value="ALL">Filter Type: All</option>
            <option value="E-Voucher">E-Voucher</option>
            <option value="E-Gift Card">E-Gift Card</option>
          </select>
          <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-soft">${icon('chevron-down', 'w-4 h-4')}</span>
        </div>
      </div>

      <div class="flex items-center justify-between border-b border-zinc-700 pb-2">
        <span class="text-xs font-semibold uppercase tracking-[0.15em] text-gold sm:text-sm">November, 2024</span>
        <span class="text-xs text-soft sm:text-sm">(3)</span>
      </div>

      <div class="overflow-hidden rounded-2xl border border-line bg-panel shadow-luxury">
        ${[1,2,3].map(() => `
          <div class="border-b border-line p-5 last:border-b-0 transition hover:bg-zinc-950">
            <div class="mb-2 flex items-center justify-between">
              <div class="text-[11px] uppercase tracking-[0.14em] text-soft sm:text-[13px]">TxID <span class="ml-1 font-semibold text-cream">1760****7179</span></div>
              <div class="text-sm font-semibold text-gold sm:text-base">$5,000</div>
            </div>
            <div class="flex items-center justify-between">
              <div class="text-[11px] text-zinc-500 sm:text-[13px]">Nov 27, 2024 09:09 PM</div>
              <div class="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-400 sm:text-[12px]">Completed</div>
            </div>
            <div class="mt-3 flex justify-end border-t border-line/60 pt-3">
              <button class="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.08em] text-gold transition hover:text-gold2 sm:text-[13px]">${icon('eye', 'w-4 h-4')} View Details</button>
            </div>
          </div>`).join('')}
      </div>
    </div>`;
}

function renderBatchDetails() {
  const batch = state.selectedBatch;
  const progress = batch ? Math.round((batch.distributed / batch.amount) * 100) : 0;
  const dists = batch ? (mockDistributions[batch.id] || []) : [];

  return `
    <div class="space-y-5">
      <div class="flex border-b border-line bg-panel/70 backdrop-blur">
        ${['overview','distributed','receipt'].map(tab => `
          <button data-action="batch-tab" data-tab="${tab}" class="relative flex-1 px-3 pb-4 pt-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${state.batchTab === tab ? 'text-gold' : 'text-soft hover:text-cream'}">
            ${tab === 'overview' ? 'Overview' : tab === 'distributed' ? 'Distributed' : 'Tax Receipt'}
            ${state.batchTab === tab ? '<span class="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-gold to-gold2"></span>' : ''}
          </button>`).join('')}
      </div>

      ${state.batchTab === 'overview' ? `
        <div class="rounded-2xl border border-line bg-panel p-6 shadow-luxury">
          <div class="mb-4">
            <h4 class="mb-2 text-base font-semibold uppercase tracking-[0.14em] text-gold">Batch #${batch?.id || ''}</h4>
            <p class="mb-1 text-sm text-soft">Purpose: <span class="font-semibold text-cream">${batch?.purpose || ''}</span></p>
            <p class="text-sm text-soft">Donated on: <span class="font-semibold text-cream">${batch?.date || ''}</span></p>
          </div>

          <div class="relative overflow-hidden rounded-2xl border border-line bg-black p-6">
            <div class="absolute inset-x-0 top-0 h-full bg-gold/5 blur-3xl"></div>
            <div class="relative">
              <div class="mb-7 text-center">
                <div class="mb-2 text-[11px] uppercase tracking-[0.18em] text-soft">Total Donation Amount</div>
                <div class="bg-gradient-to-r from-gold via-yellow-100 to-gold bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">${formatNumber(batch?.amount)} <span class="text-lg text-gold">${batch?.currency || ''}</span></div>
              </div>

              <div class="mb-6">
                <div class="mb-2 flex items-end justify-between">
                  <span class="text-sm font-semibold text-cream">Distribution Progress</span>
                  <span class="text-base font-bold text-gold">${progress}%</span>
                </div>
                <div class="h-3 overflow-hidden rounded-full bg-zinc-800">
                  <div class="h-full rounded-full bg-gradient-to-r from-amber-700 via-gold to-gold2" style="width:${progress}%"></div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 border-t border-line/60 pt-5">
                <div>
                  <div class="mb-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-soft"><span class="h-2 w-2 rounded-full bg-gold"></span>Distributed</div>
                  <div class="text-sm font-semibold text-cream">${formatNumber(batch?.distributed)} <span class="text-zinc-500">${batch?.currency || ''}</span></div>
                </div>
                <div>
                  <div class="mb-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-soft"><span class="h-2 w-2 rounded-full bg-zinc-600"></span>Remaining</div>
                  <div class="text-sm font-semibold text-cream">${formatNumber((batch?.amount || 0) - (batch?.distributed || 0))} <span class="text-zinc-500">${batch?.currency || ''}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>` : ''}

      ${state.batchTab === 'distributed' ? `
        <div class="space-y-5">
          ${dists.map(dist => `
            <div class="rounded-2xl border border-line bg-panel p-5 shadow-luxury transition hover:border-gold/50">
              <div class="mb-2 flex items-start justify-between gap-4">
                <div class="max-w-[70%] truncate text-sm font-semibold text-cream sm:text-[15px]">${dist.recipient}</div>
                <div class="shrink-0 text-sm font-semibold text-gold sm:text-[15px]">${formatNumber(dist.amount)} ${dist.currency}</div>
              </div>
              <div class="text-[11px] uppercase tracking-[0.1em] text-zinc-500 sm:text-[13px]">Distributed on: ${dist.date}</div>
              <div class="mt-4 flex items-center justify-between border-t border-line pt-4">
                <span class="rounded px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${badgeClasses(dist.status)}">${dist.status}</span>
                <button data-action="open-dist" data-id="${dist.id}" class="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.08em] text-gold transition hover:text-gold2 sm:text-[13px]">${icon('eye', 'w-4 h-4')} View Details</button>
              </div>
            </div>`).join('')}
        </div>` : ''}

      ${state.batchTab === 'receipt' ? `
        <div class="mx-auto max-w-[440px] rounded-2xl border border-line bg-panel p-6 shadow-luxury sm:p-8">
          <div class="relative border-b border-dashed border-line pb-6 text-center">
            <div class="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-panel px-4 text-gold">${icon('badge-check', 'w-7 h-7')}</div>
            <h5 class="mt-4 bg-gradient-to-r from-gold to-gold2 bg-clip-text text-xl font-bold tracking-[0.06em] text-transparent">VLINKPAY FOUNDATION</h5>
            <p class="mt-2 text-[11px] uppercase tracking-[0.14em] text-soft">EIN: 92-0312176</p>
            <p class="text-[11px] uppercase tracking-[0.14em] text-soft">5444 Westheimer Rd Ste 1000, Houston, TX</p>
          </div>

          <div class="py-6 text-center">
            <h6 class="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">Foundation Receipt</h6>
            <p class="text-sm text-zinc-300">Receipt ID: <span class="font-semibold text-cream">FND-RCPT-2025-11892</span></p>
            <p class="text-sm text-zinc-300">Date Issued: <span class="font-semibold text-cream">Oct 28, 2025 - 09:00</span></p>
          </div>

          <div class="space-y-6">
            <div>
              <h6 class="mb-4 inline-block border-b border-gold/30 pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gold">Donor Information</h6>
              <div class="space-y-2 text-sm text-soft">
                <div class="flex justify-between gap-4"><span>Full Name:</span><span class="text-right font-semibold text-cream">Nguyen Van A</span></div>
                <div class="flex justify-between gap-4"><span>Email:</span><span class="text-right font-semibold text-cream">nguyen@email.com</span></div>
                <div class="flex justify-between gap-4"><span>Wallet Address:</span><span class="text-right font-semibold text-cream">0xA83F...9C21</span></div>
              </div>
            </div>

            <div>
              <h6 class="mb-4 inline-block border-b border-gold/30 pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gold">Donation Summary</h6>
              <div class="space-y-2 text-sm text-soft">
                <div class="flex justify-between gap-4"><span>Batch ID:</span><span class="text-right font-semibold text-cream">#${batch?.id || ''}</span></div>
                <div class="flex justify-between gap-4"><span>Program:</span><span class="text-right font-semibold text-cream">${batch?.purpose || ''}</span></div>
                <div class="mt-3 flex items-center justify-between border-t border-dashed border-line pt-3"><span class="uppercase tracking-[0.12em]">Amount</span><span class="text-lg font-semibold text-gold">${formatNumber(batch?.amount)} ${batch?.currency || ''}</span></div>
              </div>
            </div>
          </div>

          <div class="mt-6 rounded-lg border border-line bg-black p-4 text-center text-[12px] leading-relaxed text-soft">Your donation has been recorded for tax and supporting documentation purposes. No goods or services were provided in exchange for this donation.</div>

          <button data-action="download-tax" class="mt-6 w-full rounded-xl border border-gold py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-gold transition hover:bg-gold hover:text-black">Download Tax Receipt</button>
        </div>` : ''}
    </div>`;
}

function renderDistributionDetail() {
  const dist = state.selectedDist;
  return `
    <div class="rounded-2xl border border-line bg-panel p-6 shadow-luxury sm:p-8">
      <div class="space-y-4">
        <div class="flex items-center justify-between"><span class="text-soft">Status</span><span class="rounded px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${badgeClasses(dist?.status)}">${dist?.status || ''}</span></div>
        <div class="flex items-start justify-between gap-4"><span class="text-soft">Recipient</span><span class="max-w-[60%] text-right font-semibold text-cream">${dist?.recipient || ''}</span></div>
        <div class="flex items-start justify-between gap-4"><span class="text-soft">Address</span><span class="max-w-[60%] text-right font-semibold text-cream">${dist?.address || ''}</span></div>
        <div class="flex items-center justify-between"><span class="text-soft">Amount</span><span class="font-semibold text-gold">${formatNumber(dist?.amount)} ${dist?.currency || ''}</span></div>
        <div class="flex items-center justify-between"><span class="text-soft">Distributed Date</span><span class="font-semibold text-cream">${dist?.date || ''}</span></div>
        <div class="border-t border-line pt-4">
          <div class="flex items-center justify-between"><span class="text-soft">Proof of Delivery</span>${dist?.hasProof ? `<button data-action="open-proof" class="text-sm font-semibold text-gold hover:text-gold2">[View]</button>` : `<span class="text-sm italic text-zinc-500">Not available</span>`}</div>
        </div>
      </div>
    </div>`;
}

function renderCardDetail() {
  const card = state.selectedCard;
  return `
    <div class="rounded-2xl border border-line bg-panel p-6 shadow-luxury sm:p-8">
      <div class="space-y-4">
        <h6 class="inline-block border-b border-gold/30 pb-2 text-sm font-bold uppercase tracking-[0.14em] text-gold">E-Gift Card</h6>
        <div class="flex items-center justify-between"><span class="text-soft">Status</span><span class="rounded px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${badgeClasses(card?.status)}">${card?.status || ''}</span></div>
        <div class="flex items-center justify-between gap-4"><span class="text-soft">Card Number</span><span class="font-semibold tracking-[0.16em] text-cream">${card?.maskedNumber || ''}</span></div>
        <div class="flex items-center justify-between"><span class="text-soft">Card Value</span><span class="text-lg font-semibold text-gold">${formatNumber(card?.value)} ${card?.currency || ''}</span></div>
        <div class="flex items-center justify-between"><span class="text-soft">Created Date</span><span class="font-semibold text-cream">${card?.createdDate || ''}</span></div>

        ${(card?.status === 'Gifted' || card?.status === 'Redeemed') ? `
          <div class="my-2 h-px bg-line"></div>
          <h6 class="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">Recipient</h6>
          <div class="flex items-start justify-between gap-4"><span class="text-soft">Recipient Name</span><span class="text-right font-semibold text-cream">${card?.recipientName || ''}</span></div>
          ${card?.recipientEmail ? `<div class="flex items-start justify-between gap-4"><span class="text-soft">Recipient Email</span><span class="text-right font-semibold text-cream">${card?.recipientEmail}</span></div>` : ''}` : ''}

        ${card?.status === 'Redeemed' ? `
          <div class="my-2 h-px bg-line"></div>
          <h6 class="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">Redemption Details</h6>
          <div class="flex items-center justify-between"><span class="text-soft">Redeemer</span><span class="font-semibold text-cream">${card?.redeemerName || ''}</span></div>
          <div class="flex items-start justify-between gap-4"><span class="text-soft">Merchant</span><span class="max-w-[60%] text-right font-semibold text-cream">${card?.merchant || ''}</span></div>
          <div class="flex items-center justify-between"><span class="text-soft">Date</span><span class="font-semibold text-cream">${card?.redeemedDate || ''}</span></div>
          <div class="flex items-center justify-between pt-2"><span class="text-soft">Proof of Redemption</span>${card?.hasProof ? `<button data-action="open-proof" class="text-sm font-semibold text-gold hover:text-gold2">[View]</button>` : `<span class="text-sm italic text-zinc-500">Not available</span>`}</div>` : ''}

        ${card?.status === 'Available' ? `<div class="pt-4 text-center"><button data-action="open-qr" class="rounded-xl bg-gradient-to-r from-gold to-gold2 px-10 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-black transition hover:scale-[1.02]">Gift via QR</button></div>` : ''}
      </div>
    </div>`;
}

function renderQr() {
  return `
    <div class="mx-auto max-w-md rounded-2xl border border-line bg-panel p-6 text-center shadow-luxury sm:p-8">
      <div class="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold">${icon('qr-code', 'w-8 h-8')}</div>
      <h3 class="mb-2 text-lg font-bold uppercase tracking-[0.12em] text-cream">Gift Via QR Code</h3>
      <p class="mb-6 text-sm leading-relaxed text-soft">Let the recipient scan this QR to receive the charity e-gift card.</p>
      <div class="mx-auto mb-5 grid h-56 w-56 place-items-center rounded-2xl border border-dashed border-gold/40 bg-black text-gold">QR Preview</div>
      <p class="text-xs uppercase tracking-[0.14em] text-zinc-500">Card: ${state.selectedCard?.maskedNumber || ''}</p>
    </div>`;
}

function renderProof() {
  return `
    <div class="mx-auto max-w-xl rounded-2xl border border-line bg-panel p-6 shadow-luxury sm:p-8">
      <div class="mb-5 flex items-center gap-3 text-gold">${icon('shield-check', 'w-5 h-5')}<h3 class="text-sm font-bold uppercase tracking-[0.16em]">Uploaded Proof</h3></div>
      <div class="grid place-items-center rounded-2xl border border-dashed border-gold/30 bg-black px-6 py-20 text-center text-soft">
        <div>
          <div class="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-gold/10 text-gold">${icon('image', 'w-7 h-7')}</div>
          <div class="text-sm font-semibold text-cream">Proof preview placeholder</div>
          <div class="mt-2 text-xs text-zinc-500">Hook your real uploaded image or document here.</div>
        </div>
      </div>
    </div>`;
}

function successModal() {
  if (!state.isSuccess) return '';
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div class="w-full max-w-md rounded-2xl border border-gold/20 bg-panel p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.45)] sm:p-8">
        <div class="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-r from-gold to-gold2 text-black">${icon('check', 'w-8 h-8')}</div>
        <h3 class="mb-2 bg-gradient-to-r from-gold to-gold2 bg-clip-text text-xl font-bold uppercase tracking-[0.14em] text-transparent">Payment Successful</h3>
        <p class="mb-6 text-sm leading-relaxed text-soft">Your charity transaction has been recorded successfully.</p>
        <button data-action="close-success" class="rounded-xl bg-gradient-to-r from-gold to-gold2 px-8 py-3 text-[12px] font-extrabold uppercase tracking-[0.16em] text-black">Continue</button>
      </div>
    </div>`;
}

function mainView() {
  switch (state.viewMode) {
    case 'buy': return renderBuyFlow();
    case 'list': return renderBatchList();
    case 'batch': return renderBatchDetails();
    case 'dist': return renderDistributionDetail();
    case 'cardList': return renderCardList();
    case 'cardDetail': return renderCardDetail();
    case 'history': return renderHistory();
    case 'qr': return renderQr();
    case 'proof': return renderProof();
    default: return renderBuyFlow();
  }
}

function render() {
  app.innerHTML = `
    ${header()}
    ${tabs()}
    <main class="mx-auto max-w-6xl px-4 py-6 pb-24 sm:px-6">${mainView()}</main>
    ${successModal()}
  `;
  if (window.lucide) lucide.createIcons();
}

function findBatchById(id) {
  return mockBatches.find(item => item.id === id) || null;
}
function findDistById(id) {
  return Object.values(mockDistributions).flat().find(item => item.id === id) || null;
}
function findCardById(id) {
  return mockGiftCards.find(item => item.id === id) || null;
}

function normalizeAmountInput(value) {
  return formatNumber(String(value).replace(/[^0-9.]/g, ''));
}

app.addEventListener('click', (e) => {
  const target = e.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;

  if (action === 'switch-tab') return handleTabSwitch(target.dataset.tab);
  if (action === 'back') return handleBack();
  if (action === 'set-flow') { state.flowType = target.dataset.flow; return render(); }
  if (action === 'set-purpose') { state.purpose = target.dataset.purpose; return render(); }
  if (action === 'set-payment') { state.paymentMethod = target.dataset.payment; return render(); }
  if (action === 'qty-minus') { state.quantity = Math.max(1, state.quantity - 1); return render(); }
  if (action === 'qty-plus') { state.quantity += 1; return render(); }
  if (action === 'confirm-payment') { if (canProceedToPayment()) { state.isSuccess = true; render(); } return; }
  if (action === 'close-success') return resetFlow();
  if (action === 'new-donation') return startNewDonation(target.dataset.type);
  if (action === 'open-batch') { state.selectedBatch = findBatchById(target.dataset.id); state.batchTab = 'overview'; state.viewMode = 'batch'; return render(); }
  if (action === 'batch-tab') { state.batchTab = target.dataset.tab; return render(); }
  if (action === 'open-dist') { state.selectedDist = findDistById(target.dataset.id); state.viewMode = 'dist'; return render(); }
  if (action === 'open-card') { state.selectedCard = findCardById(target.dataset.id); state.viewMode = 'cardDetail'; return render(); }
  if (action === 'card-subtab') { state.cardSubTab = target.dataset.subtab; return render(); }
  if (action === 'open-qr') { state.viewMode = 'qr'; return render(); }
  if (action === 'open-proof') { state.viewMode = 'proof'; return render(); }
  if (action === 'download-tax') { alert('Downloading Receipt...'); return; }
});

app.addEventListener('input', (e) => {
  const model = e.target.dataset.model;
  if (!model) return;

  if (model === 'amount' || model === 'cardValue') {
    state[model] = normalizeAmountInput(e.target.value);
  } else if (e.target.type === 'checkbox') {
    state[model] = e.target.checked;
  } else {
    state[model] = e.target.value;
  }
  render();
});

app.addEventListener('change', (e) => {
  const model = e.target.dataset.model;
  if (!model) return;
  if (e.target.type === 'checkbox') state[model] = e.target.checked;
  else state[model] = e.target.value;
  render();
});

render();
