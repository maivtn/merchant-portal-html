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
      ['Bệnh viện Chợ Rẫy', '24', '$1,200', '<span class="badge info">3 days</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="merchant-detail.html">View details</a><a class="btn" href="merchant-detail.html">Create payout</a><a class="btn" href="settlement-dispute.html">Dispute</a></div>'],
      ['Nhà sách Phương Nam', '88', '$3,400', '<span class="badge danger">12 days</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="merchant-detail.html">View details</a><a class="btn" href="merchant-detail.html">Create payout</a><a class="btn" href="settlement-dispute.html">Dispute</a></div>'],
      ['Co.op Mart', '156', '$7,800', '<span class="badge info">1 day</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="merchant-detail.html">View details</a><a class="btn" href="merchant-detail.html">Create payout</a><a class="btn" href="settlement-dispute.html">Dispute</a></div>'],
      ['Highlands', '12', '$60', '<span class="badge">0 day</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="merchant-detail.html">View details</a><a class="btn" href="merchant-detail.html">Create payout</a><a class="btn" href="settlement-dispute.html">Dispute</a></div>'],
    ],
    'transactions': [
      ['#TX-2026-001X', 'user_donation_1@demo.app', '$100.00', '<span class="badge info">Charity E‑Gift Card</span>', '<span class="badge success">Successful</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="transaction-detail.html">View details</a><a class="btn" href="refund.html">Refund</a></div>'],
      ['#TX-2026-002X', 'user_donation_2@demo.app', '$100.00', '<span class="badge gold">Charity E‑Voucher</span>', '<span class="badge success">Successful</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="transaction-detail.html">View details</a><a class="btn" href="refund.html">Refund</a></div>'],
      ['#TX-2026-003X', 'user_donation_3@demo.app', '$50.00', '<span class="badge info">Charity E‑Gift Card</span>', '<span class="badge success">Redeemed</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="transaction-detail.html">View details</a></div>'],
      ['#TX-2026-004X', 'crypto_donor_01@demo.app', '$100.00', '<span class="badge info">Charity E‑Gift Card</span>', '<span class="badge success">Successful</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="transaction-detail.html">View details</a></div>'],
      ['#TX-2026-005X', 'crypto_donor_02@demo.app', '₫100,000', '<span class="badge gold">Charity E‑Voucher</span>', '<span class="badge success">Successful</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="transaction-detail.html">View details</a></div>'],
    ],
    'refund-management': [
      ['RF-2026-001', '<span class="badge info">Gift Card</span>', 'TX-2026-001X', 'support_01', '$100', 'Duplicate charge', '<span class="badge info">Pending Approval</span>', '21 Apr 2026, 09:20', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="refund-detail.html">View details</a><a class="btn btn-gold" href="#">Approve</a><a class="btn" href="#">Reject</a></div>'],
      ['RF-2026-002', '<span class="badge gold">Voucher</span>', 'B-2026-901', 'manager_a', '$50', 'User cancellation', '<span class="badge success">Approved</span>', '21 Apr 2026, 08:55', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="refund-detail.html">View details</a></div>'],
      ['RF-2026-003', '<span class="badge">Settlement Adjustment</span>', 'Merchant Highlands', 'accountant_1', '$60', 'Payout correction', '<span class="badge danger">Failed</span>', '20 Apr 2026, 17:15', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="refund-detail.html">View details</a><a class="btn btn-gold" href="#">Retry</a></div>'],
      ['RF-2026-004', '<span class="badge gold">Voucher</span>', 'VCH-2026-118', 'support_03', '$35', 'Cancelled before redeem', '<span class="badge">Draft</span>', '20 Apr 2026, 16:02', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="refund-detail.html">View details</a><a class="btn btn-gold" href="#">Approve</a><a class="btn" href="#">Reject</a></div>'],
      ['RF-2026-005', '<span class="badge info">Gift Card</span>', 'TX-2026-008Q', 'support_12', '$120', 'Payment reversal', '<span class="badge success">Refunded</span>', '19 Apr 2026, 13:40', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="refund-detail.html">View details</a></div>'],
      ['RF-2026-006', '<span class="badge">Settlement Adjustment</span>', 'Merchant Central Mall', 'finance_ops', '$240', 'Settlement mismatch', '<span class="badge danger">Rejected</span>', '18 Apr 2026, 11:30', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="refund-detail.html">View details</a></div>'],
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
    'refund-audit-log': [
      ['09:20:14', 'support_01', 'REQUEST_CREATED', 'Refund RF-2026-001 created from TX-2026-001X', '10.10.18.21'],
      ['09:24:01', 'manager_a', 'UNDER_REVIEW', 'Checker opened refund detail and validated evidence', '10.10.12.12'],
      ['09:31:55', 'manager_a', 'APPROVAL_DECISION', 'Status moved to Pending Approval for finance sign-off', '10.10.12.12'],
      ['09:38:08', 'system_auto', 'STATUS_SYNC', 'Refund linked to settlement queue and notification sent', 'internal'],
    ],
    'beneficiary-management': [
      ['BEN-001', 'Trường Tiểu học Ánh Dương', '<span class="badge gold">School</span>', 'VCB • 0123 456 789', '<span class="badge success">Verified</span>', '14/04/2026', '<span class="badge success">Low</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="beneficiary-detail.html">View detail</a></div>'],
      ['BEN-002', 'Quỹ Học bổng Mùa Hè', '<span class="badge info">NGO</span>', 'ACB • 9988 1221 33', '<span class="badge info">Pending</span>', '-', '<span class="badge">Medium</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="beneficiary-detail.html">View detail</a></div>'],
      ['BEN-003', 'Nhóm Sách Cho Em', '<span class="badge">Community Group</span>', 'MB • 5678 999 123', '<span class="badge danger">Suspended</span>', '10/03/2026', '<span class="badge danger">High</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="beneficiary-detail.html">View detail</a></div>'],
      ['BEN-004', 'Bệnh viện Chợ Rẫy', '<span class="badge info">Hospital</span>', 'VietinBank • 1122 3344 55', '<span class="badge success">Verified</span>', '18/04/2026', '<span class="badge success">Low</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="beneficiary-detail.html">View detail</a></div>'],
      ['BEN-005', 'Hội Cứu trợ Miền Trung', '<span class="badge">Relief Partner</span>', 'Techcombank • 7788 9900 11', '<span class="badge info">Pending</span>', '-', '<span class="badge">Medium</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="beneficiary-detail.html">View detail</a></div>'],
      ['BEN-006', 'Nhóm Tình Nguyện Xanh', '<span class="badge">Community Group</span>', 'MB • 5566 7788 99', '<span class="badge danger">Blacklisted</span>', '05/02/2026', '<span class="badge danger">High</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="beneficiary-detail.html">View detail</a></div>'],
    ],
    'beneficiary-payout-history': [
      ['#B-2026-901', '14/04/2026', '$15,000', '<span class="badge success">Distributed</span>', '<a class="btn btn-outline-gold" href="batch-detail.html">View batch</a>'],
      ['#B-2026-885', '02/04/2026', '$8,000', '<span class="badge success">Distributed</span>', '<a class="btn btn-outline-gold" href="batch-detail.html">View batch</a>'],
      ['#B-2026-762', '15/03/2026', '$12,000', '<span class="badge info">Scheduled</span>', '<a class="btn btn-outline-gold" href="batch-detail.html">View batch</a>'],
    ],
    'beneficiary-documents': [
      ['KYB registration certificate', 'Uploaded 20/04/2026', '<span class="badge success">Verified</span>'],
      ['Bank account proof', 'Uploaded 20/04/2026', '<span class="badge success">Matched</span>'],
      ['Tax / legal letter', 'Uploaded 19/04/2026', '<span class="badge info">Under review</span>'],
    ],
    'beneficiary-audit-notes': [
      ['09:14', 'compliance_01', 'KYB_CHECK', 'Documents match organization profile and payout ownership', '10.10.11.14'],
      ['10:02', 'bank_ops_02', 'ACCOUNT_VERIFY', 'Bank account matched to beneficiary legal name', '10.10.11.18'],
      ['11:20', 'manager_a', 'PAYOUT_READY', 'Beneficiary marked eligible for next distribution window', '10.10.11.22'],
    ],
    'proof-review-queue': [
      ['PR-001', 'Batch #B-9021', '<span class="badge gold">Batch Payout</span>', 'accountant_1', '14:20 17/04/2026', 'PDF', '<span class="badge info">Pending Review</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="proof-review.html">View</a></div>'],
      ['PR-002', 'Merchant Phương Nam', '<span class="badge info">Settlement</span>', 'admin_accountant_1', '11:10 16/04/2026', 'JPG', '<span class="badge success">Verified</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="proof-review.html">View</a></div>'],
      ['PR-003', 'RF-2026-003', '<span class="badge">Refund</span>', 'support_01', '09:15 15/04/2026', 'PNG', '<span class="badge danger">Rejected</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="proof-review.html">View</a></div>'],
      ['PR-004', 'Batch #B-9028', '<span class="badge gold">Adjustment</span>', 'accountant_2', '16:05 14/04/2026', 'PDF', '<span class="badge info">Pending Review</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="proof-review.html">View</a></div>'],
      ['PR-005', 'Merchant Highlands', '<span class="badge info">Settlement</span>', 'finance_ops', '10:30 13/04/2026', 'JPG', '<span class="badge">Replaced</span>', '<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-outline-gold" href="proof-review.html">View</a></div>'],
    ],
    'proof-review-activity': [
      ['PR-001', 'Batch #B-9021', 'PDF', 'accountant_1', 'Pending Review', 'Open preview'],
      ['PR-002', 'Merchant Phương Nam', 'JPG', 'admin_accountant_1', 'Verified', 'Open preview'],
      ['PR-003', 'RF-2026-003', 'PNG', 'support_01', 'Rejected', 'Open preview'],
    ],
    'settlement-dispute-transactions': [
      ['TX-2026-044A', 'Redeemed card adjustment', '$120', '<span class="badge success">Matched</span>'],
      ['TX-2026-057C', 'Duplicate settlement line', '$80', '<span class="badge gold">Pending review</span>'],
      ['TX-2026-059D', 'Missing fee allocation', '$0', '<span class="badge danger">Flagged</span>'],
    ],
    'settlement-dispute-adjustments': [
      ['Fee correction', '$150', 'Correct fee split after settlement review', 'finance_ops'],
      ['Merchant reserve hold', '$50', 'Temporary hold pending evidence review', 'manager_a'],
      ['Balance reconciliation', '$0', 'No change until dispute decision is finalized', 'accountant_1'],
    ],
    'settlement-dispute-timeline': [
      ['09:12', 'merchant_ops', 'DISPUTE_CREATED', 'Merchant opened dispute for settlement cycle 16/04/2026', '10.10.12.44'],
      ['10:05', 'finance_ops', 'REVIEW_STARTED', 'Finance reviewed payable variance and matched dispute reason', '10.10.12.19'],
      ['11:30', 'checker_b', 'AWAITING_DECISION', 'Final decision pending after adjustment history check', '10.10.12.31'],
    ],
    'settlement-dispute-files': [
      ['settlement-ledger.pdf', 'Uploaded 16/04/2026', '<span class="badge success">Verified</span>'],
      ['merchant-email-thread.jpg', 'Uploaded 16/04/2026', '<span class="badge info">Attached</span>'],
      ['adjustment-notes.xlsx', 'Uploaded 16/04/2026', '<span class="badge gold">Review</span>'],
    ],
    'ledger-reconciliation-entries': [
      ['LE-2026-001', 'Donations received', 'POOLED-APR-16', '', '$2,840,000', '<span class="badge success">Matched</span>', '16/04/2026', '<a class="btn btn-outline-gold" href="#">View</a>'],
      ['LE-2026-002', 'Batch distributed', 'B-2026-901', '$1,920,500', '', '<span class="badge success">Matched</span>', '16/04/2026', '<a class="btn btn-outline-gold" href="#">View</a>'],
      ['LE-2026-003', 'Merchant payable', 'SET-2026-044', '$3,400', '', '<span class="badge info">Pending</span>', '16/04/2026', '<a class="btn btn-outline-gold" href="#">View</a>'],
      ['LE-2026-004', 'Refund processed', 'RF-2026-003', '$60', '', '<span class="badge success">Matched</span>', '15/04/2026', '<a class="btn btn-outline-gold" href="#">View</a>'],
      ['LE-2026-005', 'Platform fee', 'FEE-APR-16', '', '$28,400', '<span class="badge success">Matched</span>', '16/04/2026', '<a class="btn btn-outline-gold" href="#">View</a>'],
      ['LE-2026-006', 'Recon difference', 'INV-2026-007', '$12', '', '<span class="badge danger">Unresolved</span>', '16/04/2026', '<a class="btn btn-outline-gold" href="#">View</a>'],
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

  const ledgerChartEl = document.getElementById('ledgerReconciliationChart');
  if (ledgerChartEl && window.Chart) {
    new Chart(ledgerChartEl, {
      type: 'line',
      data: {
        labels: ['01/04', '03/04', '05/04', '07/04', '09/04', '11/04', '13/04', '15/04', '16/04'],
        datasets: [
          {
            label: 'Cash flow',
            data: [38, 42, 45, 51, 49, 57, 61, 66, 68],
            borderColor: '#ffd700',
            backgroundColor: 'rgba(255, 215, 0, 0.12)',
            pointBackgroundColor: '#ffd700',
            pointRadius: 3,
            pointHoverRadius: 5,
            tension: 0.34,
            fill: true,
          },
          {
            label: 'Reconciliation diff',
            data: [4, 3, 5, 2, 4, 3, 2, 1, 1],
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.08)',
            pointBackgroundColor: '#f59e0b',
            pointRadius: 3,
            pointHoverRadius: 5,
            borderDash: [6, 6],
            tension: 0.3,
          },
          {
            label: 'Matched ratio',
            data: [92, 93, 91, 95, 94, 96, 97, 98, 98],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            pointBackgroundColor: '#10b981',
            pointRadius: 2,
            pointHoverRadius: 4,
            tension: 0.28,
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
