(function () {
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const chartEl = document.getElementById('cashFlowChart');
  if (!chartEl || !window.Chart) return;

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
})();
