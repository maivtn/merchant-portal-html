(function(){
  const current = document.body.dataset.page;
  const parentMap = {
    'pool-detail': 'pools',
    'merchant-detail': 'settlement',
    'transaction-detail': 'transactions'
  };
  const activeKey = parentMap[current] || current;
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === activeKey) link.classList.add('active');
  });
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
