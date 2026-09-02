(() => {
  const page = document.querySelector('.casapay-offers-page');
  if (!page) return;

  const state = { city: 'all', type: 'all' };
  const cards = [...page.querySelectorAll('.casapay-offer-card')];
  const count = page.querySelector('.casapay-offers-count strong');
  const empty = page.querySelector('.casapay-offers-empty');

  const render = () => {
    let visible = 0;
    cards.forEach(card => {
      const matches = (state.city === 'all' || card.dataset.city === state.city)
        && (state.type === 'all' || card.dataset.type === state.type);
      card.hidden = !matches;
      if (matches) visible += 1;
    });
    count.textContent = String(visible);
    empty.hidden = visible !== 0;
  };

  page.querySelectorAll('[data-offers-filter]').forEach(group => {
    group.addEventListener('click', event => {
      const button = event.target.closest('button[data-filter-value]');
      if (!button) return;
      const key = group.dataset.offersFilter;
      state[key] = button.dataset.filterValue;
      group.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      render();
    });
  });
})();
