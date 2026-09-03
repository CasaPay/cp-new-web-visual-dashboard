(() => {
  const setup = () => {
    const switchRoot = document.querySelector('#offline-mode-switch');
    const tenantLink = switchRoot?.querySelector('.offline-mode-switch__inner > a');
    const button = document.querySelector('#offline-mode-partner-button');
    const menu = document.querySelector('#offline-mode-partner-menu');
    if (!button || !menu || button.dataset.ready === 'true') return;
    button.dataset.ready = 'true';
    menu.inert = true;

    const partnerActive = window.location.pathname === '/partner'
      || window.location.pathname.startsWith('/partner/');
    if (tenantLink) {
      if (partnerActive) tenantLink.removeAttribute('aria-current');
      else tenantLink.setAttribute('aria-current', 'page');
    }
    if (partnerActive) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');

    const setOpen = open => {
      button.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
      menu.inert = !open;
    };
    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      setOpen(button.getAttribute('aria-expanded') !== 'true');
      if (!menu.hidden) menu.querySelector('[role="menuitem"]')?.focus();
    });
    menu.querySelectorAll('[data-offline-soon]').forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        setOpen(false);
        document.querySelector('.offline-mode-toast')?.remove();
        const toast = document.createElement('div');
        toast.className = 'offline-mode-toast';
        toast.setAttribute('role', 'status');
        toast.textContent = `${link.dataset.offlineSoon} is coming soon in this offline demo`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2400);
        button.focus();
      });
    });
    document.addEventListener('click', event => {
      if (!menu.hidden && !event.target.closest('.offline-mode-partner')) setOpen(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !menu.hidden) {
        setOpen(false);
        button.focus();
      }
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, { once: true });
  else setup();
})();
