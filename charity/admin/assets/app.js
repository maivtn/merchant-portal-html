(function () {
  const ADMIN_TABLE_DATA = {
    'batch-beneficiaries': [
      ['Trường Tiểu học Ánh Dương', 'VCB • 0123 456 789', '$15,000', '<span class="badge success">Paid</span>'],
      ['Quỹ Học bổng Mùa Hè', 'ACB • 9988 1221 33', '$8,000', '<span class="badge success">Paid</span>'],
      ['Nhóm Sách Cho Em', 'MB • 5678 999 123', '$2,000', '<span class="badge success">Paid</span>'],
    ],
    'batch-beneficiaries-detail': [
      ['Trường Tiểu học Ánh Dương', 'VCB • 0123 456 789', '$15,000', '<span class="badge success">Paid</span>', '<a class="btn btn-outline-gold" href="audit.html">View audit</a>'],
      ['Quỹ Học bổng Mùa Hè', 'ACB • 9988 1221 33', '$8,000', '<span class="badge success">Paid</span>', '<a class="btn btn-outline-gold" href="audit.html">View audit</a>'],
      ['Nhóm Sách Cho Em', 'MB • 5678 999 123', '$2,000', '<span class="badge success">Paid</span>', '<a class="btn btn-outline-gold" href="audit.html">View audit</a>'],
    ],
    'batch-history': [
      ['#B-2026-901', '14/04/2026', '$25,000', '<span class="badge success">Distributed</span>', '<a class="link" href="batch-detail.html">View</a>'],
      ['#B-2026-885', '02/04/2026', '$12,400', '<span class="badge success">Distributed</span>', '<a class="link" href="batch-detail.html">View</a>'],
      ['#B-2026-762', '15/03/2026', '$45,000', '<span class="badge success">Distributed</span>', '<a class="link" href="batch-detail.html">View</a>'],
    ],
    'settlement-ledger': [
      ['Bệnh viện Chợ Rẫy', '24', '$1,200', '<span class="badge info">3 days</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="merchant-detail.html">View details</a><a class="btn" href="merchant-detail.html">Create payout</a></div>'],
      ['Nhà sách Phương Nam', '88', '$3,400', '<span class="badge danger">12 days</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="merchant-detail.html">View details</a><a class="btn" href="merchant-detail.html">Create payout</a></div>'],
      ['Co.op Mart', '156', '$7,800', '<span class="badge info">1 day</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="merchant-detail.html">View details</a><a class="btn" href="merchant-detail.html">Create payout</a></div>'],
      ['Highlands', '12', '$60', '<span class="badge">0 day</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="merchant-detail.html">View details</a><a class="btn" href="merchant-detail.html">Create payout</a></div>'],
    ],
    'transactions': [
      ['#TX-2026-001X', 'user_donation_1@demo.app', '$100.00', '<span class="badge info">Gift Card</span>', '<span class="badge success">Successful</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="transaction-detail.html">View details</a><a class="btn" href="refund.html">Refund</a></div>'],
      ['#TX-2026-002X', 'user_donation_2@demo.app', '$100.00', '<span class="badge gold">Voucher</span>', '<span class="badge success">Successful</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="transaction-detail.html">View details</a><a class="btn" href="refund.html">Refund</a></div>'],
      ['#TX-2026-003X', 'user_donation_3@demo.app', '$50.00', '<span class="badge info">Gift Card</span>', '<span class="badge success">Redeemed</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="transaction-detail.html">View details</a></div>'],
    ],
    'redeemed-cards': [
      ['VLP-GF-001X9', '16/04/2026 14:30', '#USR-881-B', '$50.00', '<a class="btn btn-outline-gold" href="transaction-detail.html">View details</a>'],
      ['VLP-GF-002X9', '16/04/2026 14:40', '#USR-882-B', '$50.00', '<a class="btn btn-outline-gold" href="transaction-detail.html">View details</a>'],
      ['VLP-GF-003X9', '16/04/2026 15:10', '#USR-883-B', '$50.00', '<a class="btn btn-outline-gold" href="transaction-detail.html">View details</a>'],
      ['VLP-GF-004X9', '17/04/2026 09:30', '#USR-884-B', '$80.00', '<a class="btn btn-outline-gold" href="transaction-detail.html">View details</a>'],
    ],
    'audit-trail': [
      ['14:20:05', 'admin_accountant_1', 'UPLOAD_PAYOUT_PROOF', 'Batch #B-9021', '10.10.12.45'],
      ['14:15:33', 'manager_a', 'APPROVE_BATCH', 'Batch #B-9021', '10.10.12.12'],
      ['10:00:12', 'support_01', 'REQUEST_REFUND', 'Tx #TX-991', '10.10.20.67'],
      ['09:12:05', 'system_auto', 'ALERT_SETTLEMENT_OVERDUE', 'Merchant Highlands', 'internal'],
    ],
    'rbac-matrix': [
      ['Accountant (Maker)', 'Create payout order, upload proof', 'Final approve batch'],
      ['Manager (Checker)', 'Approve / reject distribution', 'Edit immutable settled data'],
      ['Customer Support', 'Lookup transactions, create refund request', 'Approve payout or settlement'],
    ],
  };

  function renderAdminTables() {
    document.querySelectorAll('table[data-admin-table]').forEach((table) => {
      const key = table.dataset.adminTable;
      const rows = ADMIN_TABLE_DATA[key];
      const tbody = table.querySelector('tbody');
      if (!tbody || !rows) return;

      tbody.innerHTML = rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('');
    });
  }

  function decorateTableLabels() {
    document.querySelectorAll('.table-wrap table').forEach((table) => {
      const headers = Array.from(table.querySelectorAll('thead th')).map((th) => th.textContent.trim());
      table.querySelectorAll('tbody tr').forEach((row) => {
        Array.from(row.children).forEach((cell, index) => {
          if (cell.tagName === 'TD' && headers[index]) {
            cell.setAttribute('data-label', headers[index]);
          }
        });
      });
    });
  }

  renderAdminTables();
  decorateTableLabels();

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const chartEl = document.getElementById('cashFlowChart');
  if (chartEl && window.Chart) {
    new Chart(chartEl, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'],
        datasets: [
          {
            label: 'Inflow',
            data: [45, 62, 38, 76, 58, 82, 67, 90, 54, 72],
            borderColor: '#ffd700',
            backgroundColor: 'rgba(255, 215, 0, 0.16)',
            pointBackgroundColor: '#ffd700',
            pointRadius: 3,
            pointHoverRadius: 5,
            tension: 0.35,
            fill: true,
          },
          {
            label: 'Outflow',
            data: [28, 34, 30, 44, 36, 48, 39, 52, 41, 46],
            borderColor: '#60a5fa',
            backgroundColor: 'rgba(96, 165, 250, 0.08)',
            pointBackgroundColor: '#60a5fa',
            pointRadius: 3,
            pointHoverRadius: 5,
            tension: 0.35,
            fill: true,
          },
          {
            label: 'Net balance',
            data: [17, 28, 8, 32, 22, 34, 28, 38, 13, 26],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            pointBackgroundColor: '#10b981',
            pointRadius: 2,
            pointHoverRadius: 4,
            borderDash: [6, 6],
            tension: 0.25,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#111111',
            titleColor: '#f8fafc',
            bodyColor: '#e5e7eb',
            borderColor: '#2a2a2a',
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#94a3b8' },
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.06)' },
            ticks: { color: '#94a3b8' },
          },
        },
        elements: {
          line: { borderWidth: 2.5 },
        },
      },
    });
  }
})();
