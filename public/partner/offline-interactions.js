(() => {
  const setupBrand = () => {
    const link = document.querySelector('header a.wpt-ui-Logo_Link_l1vpoz0p, header a:has(svg.wpt-ui-Logo_StyledLogo_s1u5d7ag)');
    if (!link) return;
    link.href = '/partner/operator';
    link.removeAttribute('target');
    link.removeAttribute('rel');
    link.classList.add('offline-partner-brand');
    link.setAttribute('aria-label', 'CasaPay partner home');
    const image = document.createElement('img');
    image.src = '/assets/brand/casapay-logo.png';
    image.alt = '';
    image.width = 1000;
    image.height = 289;
    image.setAttribute('aria-hidden', 'true');
    link.replaceChildren(image);
  };

  const setupOperatorNavigation = () => {
    const routeLabels = {
      '/partner/en/est/product/wolt-app': 'Operator Portal',
      '/partner/en/est/wolt-drive': 'RentLink',
      '/partner/en/est/product/storefront': 'Tenant Payment Pages',
      '/partner/en/est/solution/integrations': 'Integrations',
      '/partner/en/est/solution/analytics': 'Analytics & Insights',
      '/partner/en/est/wolt-ads': 'CasaPay for Operators',
      '/partner/en/est/solution/promotions': 'Tenant Communications',
      '/partner/en/est/solution/wolt-plus': 'CasaPay+',
      '/partner/en/est/solution/capital': 'Payments & Reconciliation',
      '/partner/en/est/business/restaurants': 'Letting Agents',
      '/partner/en/est/business/retailers': 'Property Managers',
      '/partner/en/est/business/pet-stores': 'PBSA',
      '/partner/en/est/business/flower-shop': 'BTR',
      '/partner/en/est/business/convenience': 'Co-living',
      '/partner/en/est/business/grocery': 'Serviced Apartments',
      '/partner/en/est/business/alcohol': 'Institutional Landlords',
      '/partner/en/est/learning-center': 'Operator Learning Center',
      '/partner/en/est/blog': 'Operator Blog',
      '/partner/en/est/blog/success-story-home': 'Success Stories',
    };
    Object.entries(routeLabels).forEach(([href, label]) => {
      document.querySelectorAll(`a[href="${href}"]`).forEach(link => {
        const content = link.querySelector('.wpt-ui-common_Content_cp6gkga') || link;
        content.textContent = label;
      });
    });
    const footerLabels = {
      'CasaPay Drive': 'RentLink',
      'CasaPay Market': 'Operator Portal',
      'CasaPay Ads': 'CasaPay for Operators',
      'CasaPay Storefront': 'Tenant Payment Pages',
      'CasaPay Capital': 'Payments & Reconciliation',
    };
    document.querySelectorAll('footer a').forEach(link => {
      const label = footerLabels[link.textContent.trim()];
      if (label) link.textContent = label;
    });
  };

  const setupFooter = () => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const logo = footer.querySelector('svg.wpt-ui-Footer_StyledLogo_s1117u18');
    if (logo) {
      const image = document.createElement('img');
      image.className = 'offline-partner-footer-brand';
      image.src = '/assets/brand/casapay-logo.png';
      image.alt = 'CasaPay';
      image.width = 1000;
      image.height = 289;
      logo.replaceWith(image);
    }
    const audienceLinks = {
      'For couriers': ['For platforms', '/partner/platforms'],
      'For merchants': ['For operators', '/partner/operator'],
      'For affiliates': ['For marketplaces', '#offline-coming-soon'],
    };
    footer.querySelectorAll('a').forEach(link => {
      if (/apps\.apple\.com|play\.google\.com/.test(link.href)) {
        link.remove();
        return;
      }
      const replacement = audienceLinks[link.textContent.trim()];
      if (!replacement) return;
      link.textContent = replacement[0];
      link.href = replacement[1];
      link.removeAttribute('target');
      link.removeAttribute('rel');
    });
    footer.querySelectorAll('img:not(.offline-partner-footer-brand)').forEach(image => {
      const link = image.closest('a');
      if (link) link.remove();
      else image.remove();
    });
    const themeItem = [...footer.querySelectorAll('li')].find(item => item.textContent.trim() === 'Theme');
    themeItem?.remove();
  };

  const setupMenu = () => {
    const button = document.querySelector('[data-test-id="Header.HamburgerMenu.Button"]');
    const menu = document.querySelector('[data-test-id="Header.HamburgerMenu.Popup"]');
    if (!button || !menu) return;
    menu.setAttribute('role', 'navigation');
    menu.setAttribute('aria-label', 'Partner navigation');
    menu.querySelectorAll('[role="menuitem"],[role="group"]').forEach(node => node.removeAttribute('role'));
    const root = button.closest('.wpt-ui-HamburgerMenu_Root_r13bym9x') || button.parentElement;
    const closeButton = menu.querySelector('.wpt-ui-HamburgerMenu_HiddenCloseMenuButton_h88qkke');
    document.body.appendChild(menu);
    const positionMenu = () => {
      const buttonRect = button.getBoundingClientRect();
      menu.style.position = 'fixed';
      menu.style.top = `${Math.round(buttonRect.bottom + 8)}px`;
      if (window.innerWidth <= 600) {
        menu.style.insetInlineStart = '16px';
        menu.style.insetInlineEnd = '16px';
        menu.style.width = 'auto';
      } else {
        menu.style.insetInlineStart = 'auto';
        menu.style.insetInlineEnd = '24px';
        menu.style.width = 'min(420px, calc(100vw - 48px))';
      }
    };
    const setOpen = open => {
      if (open) positionMenu();
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      menu.style.opacity = open ? '1' : '0';
      menu.style.visibility = open ? 'visible' : 'hidden';
      menu.style.transform = open ? 'translateY(0)' : 'translateY(0.5rem)';
      menu.dataset.offlineOpen = String(open);
      menu.setAttribute('aria-hidden', String(!open));
      menu.inert = !open;
    };
    button.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); setOpen(button.getAttribute('aria-expanded') !== 'true'); });
    closeButton?.addEventListener('click', () => setOpen(false));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') { setOpen(false); button.focus(); } });
    document.addEventListener('click', event => {
      if (button.getAttribute('aria-expanded') === 'true' && root && !root.contains(event.target) && !menu.contains(event.target)) setOpen(false);
    });
    window.addEventListener('resize', () => { if (button.getAttribute('aria-expanded') === 'true') positionMenu(); });
    setOpen(false);
  };

  const setupFaqs = () => {
    document.querySelectorAll('[aria-controls^="faq-"]').forEach(question => {
      const answer = document.getElementById(question.getAttribute('aria-controls'));
      if (!answer) return;
      const setOpen = open => {
        question.setAttribute('aria-expanded', String(open));
        answer.setAttribute('aria-hidden', String(!open));
        answer.style.height = open ? 'auto' : '0px';
        answer.style.opacity = open ? '1' : '0';
        answer.style.overflow = open ? 'visible' : 'hidden';
        answer.inert = !open;
        const caret = question.querySelector('svg');
        if (caret) caret.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
      };
      question.addEventListener('click', () => setOpen(question.getAttribute('aria-expanded') !== 'true'));
      question.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setOpen(question.getAttribute('aria-expanded') !== 'true'); }
      });
      setOpen(false);
    });
  };

  const setupVideo = () => {
    const video = document.querySelector('video');
    const button = document.querySelector('button[aria-label="Play video"], [role="button"][aria-label="Play video"]');
    if (!video || !button) return;
    button.addEventListener('click', async event => {
      event.preventDefault();
      try {
        if (video.paused) { await video.play(); button.setAttribute('aria-label', 'Pause video'); }
        else { video.pause(); button.setAttribute('aria-label', 'Play video'); }
      } catch (_) {
        video.controls = true;
      }
    });
    video.addEventListener('pause', () => button.setAttribute('aria-label', 'Play video'));
    video.addEventListener('play', () => button.setAttribute('aria-label', 'Pause video'));
  };

  const setupPlatformEarnings = () => {
    const slider = document.getElementById('platform-operator-slider');
    const count = document.getElementById('platform-operator-count');
    const events = document.getElementById('platform-earning-events');
    const total = document.getElementById('platform-total-earnings');
    const calculation = document.getElementById('platform-earnings-calculation');
    if (!slider || !count || !events || !total || !calculation) return;
    const rate = 250;
    const currency = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    });
    const sync = () => {
      const activations = Number(slider.value);
      count.value = String(activations);
      count.textContent = String(activations);
      events.textContent = String(activations);
      total.value = String(activations * rate);
      total.textContent = currency.format(activations * rate);
      calculation.textContent = `€250 × ${activations} operator ${activations === 1 ? 'activation' : 'activations'}`;
    };
    slider.addEventListener('input', sync);
    sync();
  };

  const improveAccessibility = () => {
    document.querySelectorAll('a').forEach(link => {
      if (link.getAttribute('role') === 'menuitem' && !link.closest('[role="menu"], [role="menubar"]')) link.removeAttribute('role');
      if (!link.textContent.trim() && !link.getAttribute('aria-label')) {
        const title = link.getAttribute('title');
        if (title) link.setAttribute('aria-label', title);
        else if (link.closest('header')) link.setAttribute('aria-label', 'CasaPay partner home');
        else {
          const imageAlt = link.querySelector('img[alt]')?.getAttribute('alt')?.trim();
          const cardTitle = link.closest('article,section,[class*="Card"]')?.querySelector('h2,h3,h4')?.textContent?.trim();
          link.setAttribute('aria-label', imageAlt || cardTitle || 'Open linked page');
        }
      }
    });
    document.querySelectorAll('[role="button"]').forEach(node => {
      if (!node.hasAttribute('tabindex')) node.tabIndex = 0;
    });
    document.querySelectorAll('.wpt-ui-Footer_Settings_sx6tisl > [role="button"]').forEach(node => {
      node.setAttribute('role', 'listitem');
      node.removeAttribute('tabindex');
    });
    document.querySelectorAll('[class*="Carousel__Track"]').forEach(node => {
      if (!node.hasAttribute('tabindex')) node.tabIndex = 0;
      if (!node.getAttribute('aria-label')) node.setAttribute('aria-label', 'Scrollable content');
    });
  };

  const setup = () => { setupOperatorNavigation(); improveAccessibility(); setupFaqs(); setupVideo(); setupPlatformEarnings(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, { once:true });
  else setup();
})();
