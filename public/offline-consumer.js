(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const TENANT_PRODUCT_LINKS = Object.freeze([
    Object.freeze(['CasaPay Offers', '/tenant/offers']),
    Object.freeze(['Tenant Protect', '/tenant/tenant-protection']),
    Object.freeze(['CasaPay+', '/tenant/casapay-plus']),
  ]);
  const OPERATOR_PRODUCT_LINKS = Object.freeze([
    Object.freeze(['CasaPay RentLink', '/partner/operator/rentlink']),
    Object.freeze(['CasaPay Offers', '/partner/operator/offers']),
    Object.freeze(['CasaPay+', '/partner/operator/casapay-plus']),
    Object.freeze(['CasaPay Capital', '/partner/operator/capital']),
    Object.freeze(['CasaPay Referrals', '/partner/operator/referrals']),
  ]);
  const OPERATOR_BURGER_LINKS = Object.freeze([
    ...OPERATOR_PRODUCT_LINKS.slice(0, 3),
    OPERATOR_PRODUCT_LINKS[4],
    OPERATOR_PRODUCT_LINKS[3],
  ]);
  const PARTNER_PRODUCT_LINKS = Object.freeze([
    Object.freeze(['For platforms', '/partner/platforms']),
  ]);
  const ACCOUNT_DESTINATIONS = Object.freeze({
    tenant: 'https://tnt.test.casapay.com/',
    operator: 'https://op.test.casapay.com/',
  });
  const APP_STORE_DESTINATIONS = Object.freeze({
    ios: 'https://apps.apple.com/app/casapay/id6756551004',
    android: 'https://play.google.com/store/apps/details?id=com.casapay.tnt',
  });
  const VALID_LOCAL_PATHS = new Set([
    '/tenant', '/tenant/en/est/tallinn', '/tenant/en/gbr/london', '/tenant/offers', '/tenant/tenant-protection', '/tenant/casapay-plus',
    '/partner/operator', '/partner/operator/rentlink', '/partner/operator/offers', '/partner/operator/casapay-plus',
    '/partner/operator/capital', '/partner/operator/referrals', '/partner/platforms',
    '/partner/operator/product/casapay-app', '/partner/operator/product/storefront',
    '/partner/operator/solution/integrations', '/partner/operator/solution/analytics', '/partner/operator/operator-tools',
    '/partner/operator/solution/promotions',
    '/partner/operator/business/restaurants', '/partner/operator/business/retailers', '/partner/operator/business/pet-stores',
    '/partner/operator/business/flower-shop', '/partner/operator/business/convenience', '/partner/operator/business/grocery',
    '/partner/operator/business/alcohol', '/partner/operator/learning-center', '/partner/operator/blog',
    '/partner/operator/blog/success-story-home',
  ]);
  const CANONICAL_PATH_ALIASES = new Map([
    ['/', '/tenant'],
    ['/en/discovery', '/tenant'],
    ['/en/est', '/tenant'],
    ['/offers', '/tenant/offers'],
    ['/tenant-protection', '/tenant/tenant-protection'],
    ['/casapay-plus', '/tenant/casapay-plus'],
    ['/en/est/tallinn', '/tenant/en/est/tallinn'],
    ['/en/gbr/london', '/tenant/en/gbr/london'],
    ['/rentlink', '/partner/operator/rentlink'],
    ['/partner', '/partner/operator'],
    ['/partner/offers', '/partner/operator/offers'],
    ['/partner/capital', '/partner/operator/capital'],
    ['/partner/referrals', '/partner/operator/referrals'],
    ['/partner/en/est', '/partner/operator'],
    ['/partner/en/est/rentlink', '/partner/operator/rentlink'],
    ['/partner/en/est/solution/casapay-plus', '/partner/operator/casapay-plus'],
    ['/partner/en/est/solution/capital', '/partner/operator/capital'],
    ['/partner/operator/solution/casapay-plus', '/partner/operator/casapay-plus'],
    ['/partner/operator/solution/capital', '/partner/operator/capital'],
  ]);

  const canonicalPathFor = path => CANONICAL_PATH_ALIASES.get(path)
    || (path.startsWith('/partner/en/est/') ? `/partner/operator/${path.slice('/partner/en/est/'.length)}` : path);

  const productLinksMarkup = links => links
    .map(([label, href]) => `<a href="${href}"${href === '#offline-external' ? ` data-offline-external="${label}"` : ''}>${label}</a>`)
    .join('');

  const createOfflineModal = ({ id, titleId }) => {
    const panel = document.createElement('section');
    panel.id = id;
    panel.className = 'offline-modal';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'false');
    panel.setAttribute('aria-labelledby', titleId);
    panel.hidden = true;
    panel.inert = true;
    document.body.appendChild(panel);
    return panel;
  };

  const setupConsumerNavigation = () => {
    const header = $('header');
    if (!header || $('#offline-consumer-nav-button')) return;
    header.classList.add('offline-consumer-header');
    [...header.children].forEach(child => child.classList.add('offline-consumer-header__native-content'));
    const headerShell = header.closest('.rz7orjq') || header.parentElement;
    if (headerShell) {
      headerShell.classList.add('offline-consumer-header-shell');
      headerShell.parentElement?.classList.add('offline-consumer-header-stack');
      headerShell.firstElementChild?.classList.add('offline-consumer-header-shell__inner');
    }

    const globalBrand = document.createElement('a');
    globalBrand.className = 'offline-tenant-brand';
    globalBrand.href = '/tenant';

    const button = document.createElement('button');
    button.id = 'offline-consumer-nav-button';
    button.type = 'button';
    button.setAttribute('aria-label', 'Open navigation menu');
    button.setAttribute('aria-controls', 'offline-consumer-menu');
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = '<span></span><span></span><span></span>';

    const operatorExperience = window.location.pathname.startsWith('/partner');
    const accountAudience = operatorExperience ? 'operator' : 'tenant';
    const accountDestination = ACCOUNT_DESTINATIONS[accountAudience];
    const accountLabel = operatorExperience ? 'Operator account actions' : 'Tenant account actions';
    const accountAudienceLabel = operatorExperience ? 'Operator' : 'Tenant';
    const oppositeAudienceLabel = operatorExperience ? 'Tenant' : 'Operator';
    const oppositeAudienceHref = operatorExperience ? '/tenant' : '/partner/operator';

    const authActions = document.createElement('div');
    authActions.id = 'offline-consumer-auth-actions';
    authActions.setAttribute('role', 'group');
    authActions.setAttribute('aria-label', accountLabel);
    authActions.innerHTML = `
      <a class="offline-consumer-auth-action offline-consumer-auth-action--secondary" href="${accountDestination}" data-offline-auth-action="login">Log in</a>
      <a class="offline-consumer-auth-action offline-consumer-auth-action--primary" href="${accountDestination}" data-offline-auth-action="signup">Sign up</a>`;

    const menuGroups = operatorExperience
      ? [
        { id: 'operator-products', label: 'For operators', labelHref: '/partner/operator', links: OPERATOR_BURGER_LINKS },
        { id: 'partner-products', label: 'Partner with CasaPay', links: PARTNER_PRODUCT_LINKS },
      ]
      : [{ id: 'tenant-products', label: 'For tenants', links: TENANT_PRODUCT_LINKS }];
    const menu = document.createElement('nav');
    menu.id = 'offline-consumer-menu';
    menu.setAttribute('aria-label', operatorExperience ? 'Partner' : 'For tenants');
    menu.hidden = true;
    menu.inert = true;
    const groupMarkup = menuGroups.map(group => {
      const labelId = `offline-consumer-${group.id}-label`;
      const label = group.labelHref
        ? `<a class="offline-consumer-menu__label offline-consumer-menu__label--link" id="${labelId}" href="${group.labelHref}">${group.label}</a>`
        : `<div class="offline-consumer-menu__label" id="${labelId}">${group.label}</div>`;
      return `
        <section class="offline-consumer-menu__group" data-offline-navigation-group="${group.id}" aria-labelledby="${labelId}">
          ${label}
          ${productLinksMarkup(group.links)}
        </section>`;
    }).join('');
    menu.innerHTML = `${groupMarkup}
      <section class="offline-consumer-menu__auth" role="group" aria-label="${accountLabel}">
        <span class="offline-consumer-menu__auth-audience">${accountAudienceLabel}</span>
        <a class="offline-consumer-menu__auth-action offline-consumer-menu__auth-action--secondary" href="${accountDestination}" data-offline-auth-action="login" data-variant="secondary">Log in</a>
        <a class="offline-consumer-menu__auth-action offline-consumer-menu__auth-action--primary" href="${accountDestination}" data-offline-auth-action="signup" data-variant="primary">Sign up</a>
        <small class="offline-consumer-menu__auth-switch"><a href="${oppositeAudienceHref}" data-offline-auth-switch aria-label="Switch to ${oppositeAudienceLabel} experience">${oppositeAudienceLabel}? Click here</a></small>
      </section>`;
    menu.querySelectorAll(`a[href="${window.location.pathname}"]`).forEach(link => link.setAttribute('aria-current', 'page'));

    const modeSwitch = $('#offline-mode-switch');
    const partnerModeMenu = modeSwitch && $('#offline-mode-partner-menu', modeSwitch);
    if (partnerModeMenu) {
      partnerModeMenu.innerHTML = `
        <a role="menuitem" href="/partner/operator">For Operators</a>
        <a role="menuitem" href="/partner/platforms">For Platforms</a>
        <a role="menuitem" aria-disabled="true" tabindex="-1"><span>For Marketplaces</span><small>Coming soon</small></a>`;
    }
    header.append(globalBrand);
    if (modeSwitch) header.append(modeSwitch);
    header.append(authActions, button, menu);
    if (getComputedStyle(header).display === 'none' || header.getBoundingClientRect().height === 0) {
      const fallback = document.createElement('div');
      fallback.id = 'offline-consumer-fallback-header';
      fallback.innerHTML = '<a href="/tenant" aria-label="Tenant home">CasaPay</a>';
      if (modeSwitch) fallback.append(modeSwitch);
      fallback.append(authActions, button, menu);
      document.body.prepend(fallback);
    }
    const setOpen = (open) => {
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      button.dataset.open = String(open);
      menu.hidden = !open;
      menu.inert = !open;
      menu.setAttribute('aria-hidden', String(!open));
    };
    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      setOpen(button.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('click', event => {
      if (button.getAttribute('aria-expanded') === 'true' && !menu.contains(event.target) && event.target !== button) setOpen(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') { setOpen(false); button.focus(); }
    });
    setOpen(false);
  };

  const setupTenantBrand = () => {
    const header = $('#offline-consumer-fallback-header') || $('header.offline-consumer-header') || $('header');
    if (!header) return;
    const brandLink = $('.offline-tenant-brand', header) || $('a[href="/tenant"], a[href="/en/discovery"], a[href="/"]', header);
    if (!brandLink || brandLink.dataset.offlineTenantBrand === 'true') return;
    brandLink.dataset.offlineTenantBrand = 'true';
    brandLink.classList.add('offline-tenant-brand');
    brandLink.href = '/tenant';
    brandLink.setAttribute('aria-label', 'CasaPay tenant home');
    brandLink.title = 'CasaPay tenant home';
    const image = document.createElement('img');
    image.src = '/assets/brand/casapay-logo.png';
    image.alt = '';
    image.setAttribute('aria-hidden', 'true');
    image.width = 1000;
    image.height = 289;
    brandLink.replaceChildren(image);
  };

  const setupTenantFooterBrand = () => {
    const footer = $('footer');
    if (!footer || $('.offline-tenant-footer-brand', footer)) return;
    const inheritedLogo = $('svg[aria-label="CasaPay"], svg.wpt-ui-Footer_StyledLogo_s1117u18', footer);
    if (!inheritedLogo) return;
    const image = document.createElement('img');
    image.className = 'offline-tenant-footer-brand';
    image.src = '/assets/brand/casapay-logo.png';
    image.alt = 'CasaPay';
    image.width = 1000;
    image.height = 289;
    inheritedLogo.replaceWith(image);
  };

  const setupNativeAppStoreLinks = () => {
    const footer = $('footer');
    if (!footer) return;
    const badgeLinks = $$('.wpt-ui-AppLink_Link_l1ld7axn', footer);
    const stores = [
      {
        platform: 'ios',
        label: 'Download the CasaPay iOS app on the App Store',
        match: link => /ios|app store/i.test(link.getAttribute('aria-label') || '')
          || /app_store|app-store/i.test($('img', link)?.getAttribute('src') || ''),
      },
      {
        platform: 'android',
        label: 'Download the CasaPay Android app on Google Play',
        match: link => /android|google play/i.test(link.getAttribute('aria-label') || '')
          || /google-play/i.test($('img', link)?.getAttribute('src') || ''),
      },
    ];
    stores.forEach(store => {
      const link = badgeLinks.find(store.match);
      if (!link) return;
      link.href = APP_STORE_DESTINATIONS[store.platform];
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.dataset.casapayAppStore = store.platform;
      link.setAttribute('aria-label', store.label);
    });
  };

  const setupTenantFooterNavigation = () => {
    const footer = $('footer');
    if (!footer || footer.dataset.offlineTenantNavigation === 'true') return;
    const content = $('.wpt-ui-Footer_ContentArea_c6kqvyd', footer);
    const appLinks = $('.wpt-ui-Footer_AppLinksColumn_a19k4r2o', content || footer);
    const columns = $$('nav.wpt-ui-FooterLinkColumn_Root_rfmlu6o', content || footer);
    if (!content || !appLinks || columns.length < 5) return;

    const groups = [
      {
        title: 'For tenants',
        links: TENANT_PRODUCT_LINKS,
      },
      {
        title: 'For operators',
        links: OPERATOR_PRODUCT_LINKS,
      },
      {
        title: 'Partner with CasaPay',
        links: PARTNER_PRODUCT_LINKS,
      },
    ];

    columns.slice(groups.length).forEach(column => column.remove());

    groups.forEach((group, index) => {
      const column = columns[index];
      const title = $('h2', column);
      const region = $('.wpt-ui-FooterLinkColumn_LinkRegion_lrl0tag', column);
      const list = $('ul', column);
      if (!title || !region || !list) return;
      const titleId = `offline-footer-column-${index + 1}`;
      const regionId = `offline-footer-links-${index + 1}`;
      title.id = titleId;
      column.setAttribute('aria-labelledby', titleId);
      column.classList.add('offline-footer-column');
      region.id = regionId;
      const toggle = document.createElement('button');
      toggle.className = 'offline-footer-column-toggle';
      toggle.type = 'button';
      toggle.setAttribute('aria-controls', regionId);
      toggle.innerHTML = `<span>${group.title}</span><img src="/svgAssets/chevron-down-small-ea7e5af3196950e5.svg" alt="" aria-hidden="true" width="16" height="16">`;
      title.replaceChildren(toggle);
      list.replaceChildren(...group.links.map(([label, href]) => {
        const item = document.createElement('li');
        item.className = 'wpt-ui-FooterLinkColumn_LinkLi_l1cjk0dc';
        const link = document.createElement('a');
        link.className = 'cb_typographyClassNameNew_body_6d1 wpt-ui-FooterLinkColumn_Link_l1bj87xq';
        link.href = href;
        link.textContent = label;
        if (href === '#offline-external') link.dataset.offlineExternal = label;
        item.appendChild(link);
        return item;
      }));
      list.querySelectorAll(`a[href="${window.location.pathname}"]`).forEach(link => link.setAttribute('aria-current', 'page'));
      const setExpanded = expanded => {
        column.dataset.open = String(expanded);
        toggle.setAttribute('aria-expanded', String(expanded));
      };
      toggle.addEventListener('click', () => {
        if (!window.matchMedia('(max-width: 767px)').matches) return;
        setExpanded(toggle.getAttribute('aria-expanded') !== 'true');
      });
      const breakpoint = window.matchMedia('(max-width: 767px)');
      const syncBreakpoint = event => {
        toggle.tabIndex = event.matches ? 0 : -1;
        setExpanded(!event.matches);
      };
      syncBreakpoint(breakpoint);
      breakpoint.addEventListener?.('change', syncBreakpoint);
      content.appendChild(column);
    });
    content.prepend(appLinks);
    $$('.wpt-ui-Footer_BottomLink_b1f18161', footer)
      .find(link => link.textContent.trim() === 'Accessibility Statement')
      ?.closest('li')
      ?.remove();
    footer.dataset.offlineTenantNavigation = 'true';
  };

  const setupAddressPicker = () => {
    const input = $('input[placeholder*="rental" i]');
    if (!input || $('#offline-city-picker')) return;
    const root = input.closest('.wpt-ui-RoundedInput_Root_r1k29v13') || input.parentElement;
    if (!root) return;
    root.classList.add('offline-city-picker-root');
    $$('.sx7bcdd', root).forEach(node => node.remove());
    const iconUse = $('use', root);
    if (iconUse) iconUse.setAttribute('href', '/svgAssets/magnifying-glass-small-948a12169fd14892.svg#al-icon');
    $('.wpt-ui-RoundedInput_EndButtonContainer_eb7xw5u', root)?.remove();

    input.readOnly = false;
    input.value = '';
    input.placeholder = 'Start typing a city or university...';
    input.setAttribute('aria-label', 'Search cities and universities');
    input.setAttribute('aria-controls', 'offline-city-picker');
    input.setAttribute('aria-haspopup', 'listbox');
    input.setAttribute('aria-expanded', 'false');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('role', 'combobox');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocapitalize', 'none');
    input.setAttribute('spellcheck', 'false');

    const picker = document.createElement('div');
    picker.id = 'offline-city-picker';
    picker.setAttribute('role', 'listbox');
    picker.setAttribute('aria-label', 'City and university suggestions');
    picker.hidden = true;
    picker.inert = true;
    root.appendChild(picker);
    const status = document.createElement('div');
    status.id = 'offline-location-search-status';
    status.className = 'offline-location-search-status';
    root.insertAdjacentElement('afterend', status);

    const worker = new Worker('/location-search-worker.js?v=2');
    let ready = false;
    let userActivated = false;
    let requestId = 0;
    let latestRequestId = 0;
    let activeIndex = -1;
    let currentQuery = '';
    let options = [];
    const sanitizeQuery = value => value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().replace(/\s+/g, ' ').slice(0, 120);
    const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
    const emitDemand = detail => window.dispatchEvent(new CustomEvent('casapay:location-demand', { detail: { version: 1, ...detail } }));

    const setActive = index => {
      options.forEach(option => { option.setAttribute('aria-selected', 'false'); option.dataset.active = 'false'; });
      activeIndex = options.length && index >= 0 ? Math.max(0, Math.min(index, options.length - 1)) : -1;
      if (activeIndex >= 0) {
        const active = options[activeIndex];
        active.setAttribute('aria-selected', 'true');
        active.dataset.active = 'true';
        input.setAttribute('aria-activedescendant', active.id);
        active.scrollIntoView({ block: 'nearest' });
      } else input.removeAttribute('aria-activedescendant');
    };

    const setOpen = open => {
      input.setAttribute('aria-expanded', String(open));
      root.dataset.open = String(open);
      picker.hidden = !open;
      picker.inert = !open;
      if (open) {
        const panelTop = picker.getBoundingClientRect().top;
        picker.style.maxHeight = `${Math.max(220, window.innerHeight - panelTop - 12)}px`;
      }
      if (!open) setActive(-1);
    };
    const labelFor = item => item.type === 'city' ? `${item.name}, ${item.country}` : `${item.name}, ${item.city}, ${item.country}`;
    const showPilotSignup = (label, cityLabel = label) => {
      const safeLabel = escapeHtml(label);
      const safeCityLabel = escapeHtml(cityLabel);
      status.innerHTML = `<section class="offline-pilot-card" aria-label="${safeLabel} pilot access"><p class="offline-pilot-card__message" role="status"><strong>${safeCityLabel} is in pilot mode.</strong> Want to join our pilot program for early access? Enter your email.</p><form class="offline-pilot-card__form" novalidate><input class="offline-pilot-card__input" type="email" inputmode="email" autocomplete="email" aria-label="Email address for ${safeLabel} pilot access" placeholder="Email address" required><button class="offline-pilot-card__button" type="submit">Join pilot</button></form><p class="offline-pilot-card__feedback" role="status" aria-live="polite"></p></section>`;
      const form = $('.offline-pilot-card__form', status);
      const email = $('.offline-pilot-card__input', status);
      const feedback = $('.offline-pilot-card__feedback', status);
      form.addEventListener('submit', event => {
        event.preventDefault();
        if (!email.checkValidity()) { email.reportValidity(); return; }
        window.dispatchEvent(new CustomEvent('casapay:pilot-interest', { detail: { version: 1, action: 'submit', location: label } }));
        form.hidden = true;
        feedback.classList.add('is-success');
        feedback.innerHTML = `<img src="/assets/icons/heroicons/check-circle.svg" alt="" aria-hidden="true"><span>Thanks! We’ll email you with the next steps to join the ${safeCityLabel} pilot.</span>`;
      });
      root.dataset.status = 'pilot';
      setOpen(false);
    };
    const selectItem = (item, source) => {
      const label = labelFor(item);
      input.value = label;
      emitDemand({ action: 'select', locationType: item.type, locationId: item.id, cityId: item.type === 'city' ? item.id : item.cityId || null, source });
      if (item.route) window.location.assign(item.route);
      else showPilotSignup(label, item.type === 'city' ? item.name : item.city || item.name);
    };

    const renderGroup = (type, items, popular) => {
      if (!items.length) return '';
      const headingId = `offline-location-${type}-heading`;
      const heading = `${popular ? 'Popular ' : ''}${type === 'city' ? 'Cities' : 'Universities'}`;
      const icon = type === 'city' ? '/svgAssets/pin-medium-288915600a915412.svg' : '/svgAssets/school-material-outlined.svg';
      return `<section class="offline-location-group" role="group" aria-labelledby="${headingId}"><h2 id="${headingId}" class="offline-location-group__heading">${heading}</h2><div class="offline-location-group__options">${items.map((item, index) => `<button id="offline-location-option-${type}-${index}" class="offline-location-option" type="button" role="option" aria-selected="false" data-item="${encodeURIComponent(JSON.stringify(item))}"><img src="${icon}" alt="" aria-hidden="true"><span>${escapeHtml(labelFor(item))}</span></button>`).join('')}</div></section>`;
    };
    const render = result => {
      const popular = currentQuery.length === 0;
      picker.innerHTML = renderGroup('city', result.city || [], popular) + renderGroup('university', result.university || [], popular);
      options = $$('.offline-location-option', picker);
      options.forEach(option => option.addEventListener('click', () => selectItem(JSON.parse(decodeURIComponent(option.dataset.item)), popular ? 'popular' : 'suggestion')));
      if (!options.length) picker.innerHTML = '<p class="offline-location-empty">No matching places. Press Enter to mark this location as coming soon.</p>';
      setActive(-1);
      setOpen(true);
    };
    const requestSearch = value => {
      currentQuery = sanitizeQuery(value).toLocaleLowerCase('en');
      status.textContent = '';
      delete root.dataset.status;
      if (!ready) {
        picker.innerHTML = '<p class="offline-location-loading">Loading places…</p>';
        setOpen(true);
        return;
      }
      latestRequestId = ++requestId;
      worker.postMessage({ type: 'search', requestId: latestRequestId, query: currentQuery });
    };
    const activateSearch = value => {
      userActivated = true;
      requestSearch(value);
    };
    worker.addEventListener('message', event => {
      if (event.data?.type === 'ready') {
        ready = true;
        if (!userActivated) return;
        if (currentQuery) requestSearch(currentQuery);
        else render(event.data.result);
      }
      else if (event.data?.type === 'results' && event.data.requestId === latestRequestId) render(event.data.result);
      else if (event.data?.type === 'error' && userActivated) { picker.innerHTML = '<p class="offline-location-empty">Places are temporarily unavailable.</p>'; setOpen(true); }
    });

    input.addEventListener('click', () => activateSearch(input.value));
    input.addEventListener('input', () => activateSearch(input.value));
    input.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (picker.hidden) activateSearch(input.value);
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        setActive(activeIndex < 0 ? (direction > 0 ? 0 : options.length - 1) : activeIndex + direction);
      } else if (event.key === 'Home' && !picker.hidden) { event.preventDefault(); setActive(0); }
      else if (event.key === 'End' && !picker.hidden) { event.preventDefault(); setActive(options.length - 1); }
      else if (event.key === 'Enter') {
        event.preventDefault();
        if (activeIndex >= 0 && options[activeIndex]) options[activeIndex].click();
        else {
          const query = sanitizeQuery(input.value);
          if (!query) return;
          emitDemand({ action: 'submit', locationType: 'unknown', locationId: null, cityId: null, source: 'free-input', query: query.toLocaleLowerCase('en') });
          showPilotSignup(query);
        }
      } else if (event.key === 'Escape') { event.preventDefault(); setOpen(false); }
    });
    document.addEventListener('click', event => { if (!root.contains(event.target)) setOpen(false); });
    window.addEventListener('resize', () => { if (!picker.hidden) setOpen(true); });
  };

  const setupCityExplorer = () => {
    $('.wpt-ui-CasaPayCities_Root_rxu9885')?.remove();
  };

  const setupDiscoveryCategoryStrip = () => {
    const lists = $$('main ol').filter(list => {
      const text = list.textContent || '';
      return /Restaurants/.test(text) && /Groceries/.test(text) && list.querySelector('img');
    });
    lists.forEach(list => {
      if (list.dataset.offlineCategoriesReady === 'true') return;
      list.dataset.offlineCategoriesReady = 'true';
      list.classList.add('offline-category-strip');
      const frame = list.closest('.rbxsuj5');
      const section = list.closest('.s3d7ju0');
      section?.classList.add('offline-category-strip-section');
      [section, section?.querySelector('.r16qry22'), section?.querySelector('.r1onix62'), frame]
        .filter(Boolean)
        .forEach(node => node.classList.add('offline-category-strip-height'));
      const emptyHeading = frame?.firstElementChild;
      if (emptyHeading && !emptyHeading.textContent.trim() && !emptyHeading.querySelector('a,button,input')) {
        emptyHeading.classList.add('offline-category-strip-empty-heading');
        emptyHeading.setAttribute('aria-hidden', 'true');
      }
      $$(':scope > li', list).forEach(item => {
        item.style.setProperty('opacity', '1', 'important');
        item.style.setProperty('transform', 'none', 'important');
        item.style.setProperty('transition', 'none', 'important');
      });
    });
  };

  const RENTAL_CATEGORIES = Object.freeze([
    ['Student housing', 'student-housing', 'student-housing'],
    ['Co-living', 'co-living', 'co-living'],
    ['Build to rent', 'build-to-rent', 'btr'],
    ['Single-family', 'single-family', 'single-family'],
    ['Apartments', 'apartments', 'apartments'],
    ['Rooms', 'rooms', 'rooms'],
    ['Serviced apartments', 'serviced-apartments', 'serviced-apartments'],
    ['Short stays', 'short-stays', 'short-stays'],
    ['Pet-friendly', 'pet-friendly', 'pet-friendly'],
    ['Furnished', 'furnished', 'furnished'],
    ['No-deposit eligible', 'no-deposit-eligible', 'no-deposit'],
    ['Accessible homes', 'accessible-homes', 'accessible'],
    ['Family homes', 'family-homes', 'family-homes'],
    ['Senior living', 'senior-living', 'senior-living'],
    ['Parking', 'parking', 'parking'],
    ['Storage', 'storage', 'storage'],
  ]);

  const getCityRentalData = () => {
    const dataNode = $('#city-rental-data');
    if (!dataNode) return null;
    try {
      const data = JSON.parse(dataNode.textContent || '{}');
      if (!Array.isArray(data.buildings) || !data.buildings.length || !data.operators) return null;
      const city = data.city || 'Tallinn';
      const citySlug = data.citySlug || city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return {
        ...data,
        city,
        citySlug,
        route: data.route || '/tenant/en/est/tallinn',
        currencyCode: data.currencyCode || 'EUR',
        currencySymbol: data.currencySymbol || '€',
        categoryAssetBase: data.categoryAssetBase || '/assets/tallinn-rentals/category-icons',
        priceRange: {
          min: Number(data.priceRange?.min ?? 250),
          max: Number(data.priceRange?.max ?? 1300),
          step: Number(data.priceRange?.step ?? 50),
        },
      };
    } catch (error) {
      console.error('Unable to load city rental data', error);
      return null;
    }
  };

  const escapeRentalText = value => String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
  })[character]);

  const CITY_RENTAL_FEATURES = Object.freeze({
    accessible: { label: 'Accessible options', icon: 'eye', group: 'home_features' },
    bills_included: { label: 'Bills included', icon: 'check', group: 'rental_costs' },
    build_to_rent: { label: 'Build to rent', icon: 'home', group: 'home_features' },
    co_living: { label: 'Shared spaces', icon: 'users', group: 'home_features' },
    coworking: { label: 'Coworking space', icon: 'briefcase', group: 'home_features' },
    dogs_welcome: { label: 'Dogs welcome', icon: 'heart', group: 'lifestyle' },
    free_wifi: { label: 'Free Wi-Fi', icon: 'wifi', group: 'home_features' },
    free_parking: { label: 'Free parking', icon: 'map-pin', group: 'parking' },
    fully_furnished: { label: 'Furnished', icon: 'home', group: 'home_features' },
    gym: { label: 'Gym', icon: 'activity', group: 'home_features' },
    in_person_tours: { label: 'In-person tours', icon: 'eye', group: 'booking' },
    laundry: { label: 'Laundry', icon: 'refresh-cw', group: 'home_features' },
    long_term: { label: 'Annual lease', icon: 'calendar', group: 'minimum_stay' },
    mid_term: { label: 'Monthly stay', icon: 'calendar', group: 'minimum_stay' },
    no_commission: { label: 'No commission', icon: 'tag', group: 'rental_costs' },
    onsite_team: { label: 'On-site team', icon: 'users', group: 'home_features' },
    online_booking: { label: 'Online booking', icon: 'zap', group: 'booking' },
    parking: { label: 'Parking', icon: 'map-pin', group: 'parking' },
    pets: { label: 'Pets welcome', icon: 'heart', group: 'lifestyle' },
    short_term: { label: 'Short stay', icon: 'clock', group: 'minimum_stay' },
    smart_access: { label: 'Smart access', icon: 'key', group: 'booking' },
    student_housing: { label: 'Student housing', icon: 'home', group: 'home_features' },
    roof_terrace: { label: 'Roof terrace', icon: 'home', group: 'home_features' },
  });
  const CITY_RENTAL_FEATHER_CODES = Object.freeze({
    activity: 61696, 'bar-chart-2': 61723, briefcase: 61734, calendar: 61735,
    check: 61739, 'chevron-left': 61743, 'chevron-right': 61744, clock: 61753, eye: 61795, heart: 61825, home: 61828,
    key: 61834, 'map-pin': 61848, 'refresh-cw': 61896, sliders: 61920,
    tag: 61932, users: 61962, wifi: 61971, x: 61974, zap: 61979,
  });
  const CITY_RENTAL_SORT_OPTIONS = Object.freeze([
    { id: 'recommended', label: 'Recommended' },
    { id: 'name_asc', label: 'Name A–Z' },
    { id: 'name_desc', label: 'Name Z–A' },
  ]);
  const CITY_RENTAL_FILTER_GROUPS = Object.freeze([
    { id: 'minimum_stay', title: 'Minimum stay', description: 'Choose the shortest rental commitment that works for you.', options: [
      { id: 'stay_nights', label: '1+ nights', amenity: 'short_term' },
      { id: 'stay_months', label: '1+ months', amenity: 'mid_term' },
      { id: 'stay_annual', label: '12+ months', amenity: 'long_term' },
    ] },
    { id: 'property_type', title: 'Home type', options: [
      { id: 'type_studio', label: 'Studio', propertyType: 'studio', icon: 'home' },
      { id: 'type_apartment', label: 'Apartment', propertyType: 'apartment', icon: 'home' },
      { id: 'type_private_room', label: 'Private room', propertyType: 'private_room', icon: 'home' },
      { id: 'type_student_room', label: 'Student room', propertyType: 'student_room', icon: 'home' },
      { id: 'type_serviced_apartment', label: 'Serviced apartment', propertyType: 'serviced_apartment', icon: 'home' },
    ] },
    { id: 'booking', title: 'Booking & move-in', options: [
      { id: 'online_booking', label: 'Online booking', amenity: 'online_booking' },
      { id: 'in_person_tours', label: 'In-person tours', amenity: 'in_person_tours' },
      { id: 'smart_access', label: 'Smart access', amenity: 'smart_access' },
    ] },
    { id: 'home_features', title: 'Home features', options: [
      { id: 'fully_furnished', label: 'Furnished', amenity: 'fully_furnished' },
      { id: 'free_wifi', label: 'Free Wi-Fi', amenity: 'free_wifi' },
      { id: 'laundry', label: 'Laundry', amenity: 'laundry' },
      { id: 'co_living', label: 'Shared spaces', amenity: 'co_living' },
      { id: 'coworking', label: 'Coworking space', amenity: 'coworking' },
      { id: 'gym', label: 'Gym', amenity: 'gym' },
      { id: 'bills_included', label: 'Bills included', amenity: 'bills_included' },
      { id: 'onsite_team', label: 'On-site team', amenity: 'onsite_team' },
    ] },
    { id: 'lifestyle', title: 'Lifestyle', options: [
      { id: 'pets', label: 'Pets welcome', amenity: 'pets' },
      { id: 'dogs_welcome', label: 'Dogs welcome', amenity: 'dogs_welcome' },
    ] },
    { id: 'parking', title: 'Parking', options: [
      { id: 'parking', label: 'Parking', amenity: 'parking' },
      { id: 'free_parking', label: 'Free parking', amenity: 'free_parking' },
    ] },
    { id: 'rental_costs', title: 'Rental costs', options: [
      { id: 'no_commission', label: 'No commission', amenity: 'no_commission' },
    ] },
  ]);
  const cityRentalFeatherIcon = name => `<span class="city-rental-feather" aria-hidden="true">${String.fromCodePoint(CITY_RENTAL_FEATHER_CODES[name] || CITY_RENTAL_FEATHER_CODES.check)}</span>`;
  const formatCityRentalAmount = (rentalData, amount) => new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: rentalData.currencyCode,
    maximumFractionDigits: 0,
  }).format(amount);
  const getCityRentalFilterGroups = rentalData => [
    ...(Array.isArray(rentalData.segments) && rentalData.segments.length ? [{
      id: 'segment',
      title: 'Rental segment',
      options: rentalData.segments.map(segment => ({
        id: `segment_${segment.id}`,
        label: segment.label,
        segment: segment.id,
        icon: 'home',
      })),
    }] : []),
    ...CITY_RENTAL_FILTER_GROUPS,
    { id: 'operator', title: 'Operator', options: Object.entries(rentalData.operators).map(([operatorId, operator]) => ({
      id: `operator_${operatorId}`,
      label: operator.name,
      operatorId,
      icon: 'briefcase',
    })) },
  ];
  const getCityRentalFilterOptionMap = rentalData => new Map(getCityRentalFilterGroups(rentalData)
    .flatMap(group => group.options.map(option => [option.id, { ...option, groupId: group.id }])));
  const getCityRentalSelection = rentalData => {
    const { min: priceMin, max: priceMax } = rentalData.priceRange;
    const parameters = new URLSearchParams(window.location.search);
    const filterOptions = getCityRentalFilterOptionMap(rentalData);
    const filters = [...new Set((parameters.get('filters') || '').split(',').filter(id => filterOptions.has(id)))];
    const requestedSort = parameters.get('sort');
    const sort = CITY_RENTAL_SORT_OPTIONS.some(option => option.id === requestedSort) ? requestedSort : 'recommended';
    const requestedPriceFrom = Number(parameters.get('priceFrom'));
    const requestedPriceTo = Number(parameters.get('priceTo'));
    const rawPriceFrom = Number.isFinite(requestedPriceFrom) && parameters.has('priceFrom') ? requestedPriceFrom : priceMin;
    const rawPriceTo = Number.isFinite(requestedPriceTo) && parameters.has('priceTo') ? requestedPriceTo : priceMax;
    return {
      filters,
      priceFrom: Math.max(priceMin, Math.min(priceMax, Math.min(rawPriceFrom, rawPriceTo))),
      priceTo: Math.max(priceMin, Math.min(priceMax, Math.max(rawPriceFrom, rawPriceTo))),
      sort,
    };
  };
  const serializeCityRentalSelection = (selection, rentalData) => {
    const { min: priceMin, max: priceMax } = rentalData.priceRange;
    const url = new URL(window.location.href);
    if (selection.filters.length) url.searchParams.set('filters', selection.filters.join(','));
    else url.searchParams.delete('filters');
    if (selection.priceFrom !== priceMin) url.searchParams.set('priceFrom', selection.priceFrom);
    else url.searchParams.delete('priceFrom');
    if (selection.priceTo !== priceMax) url.searchParams.set('priceTo', selection.priceTo);
    else url.searchParams.delete('priceTo');
    if (selection.sort !== 'recommended') url.searchParams.set('sort', selection.sort);
    else url.searchParams.delete('sort');
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  };
  const getCityRentalMapInventory = rentalData => {
    const offerBuildings = Array.isArray(rentalData.buildings) ? rentalData.buildings : [];
    const offerIds = new Set(offerBuildings.map(building => building.id));
    const mapOnlyBuildings = (Array.isArray(rentalData.mapBuildings) ? rentalData.mapBuildings : [])
      .filter(building => building?.id
        && !offerIds.has(building.id)
        && Number.isFinite(Number(building.latitude))
        && Number.isFinite(Number(building.longitude)))
      .map(building => ({ ...building, mapOnly: true }));
    return [...offerBuildings, ...mapOnlyBuildings];
  };
  const filterCityRentalBuildingsForSelection = (selection, rentalData, buildings) => {
    const { min: priceMin, max: priceMax } = rentalData.priceRange;
    const priceFilterActive = selection.priceFrom !== priceMin || selection.priceTo !== priceMax;
    const filterOptions = getCityRentalFilterOptionMap(rentalData);
    const activeGroups = new Map();
    selection.filters.forEach(id => {
      const option = filterOptions.get(id);
      if (!option) return;
      activeGroups.set(option.groupId, [...(activeGroups.get(option.groupId) || []), option]);
    });
    return buildings.filter(building => (
      ((!priceFilterActive && building.monthlyPriceFrom == null)
        || (building.monthlyPriceFrom != null && building.monthlyPriceFrom <= selection.priceTo
          && building.monthlyPriceTo >= selection.priceFrom))
      && [...activeGroups.values()].every(options => options.some(option => (
        option.operatorId ? building.operatorId === option.operatorId
          : option.propertyType ? Array.isArray(building.propertyTypes) && building.propertyTypes.includes(option.propertyType)
            : option.segment ? building.segment === option.segment
            : option.amenity ? Array.isArray(building.amenities) && building.amenities.includes(option.amenity) : false
      )))
    ));
  };
  const getCityRentalBuildingsForSelection = (selection, rentalData) => {
    const visible = filterCityRentalBuildingsForSelection(selection, rentalData, rentalData.buildings);
    if (selection.sort === 'name_asc') return [...visible].sort((left, right) => left.name.localeCompare(right.name));
    if (selection.sort === 'name_desc') return [...visible].sort((left, right) => right.name.localeCompare(left.name));
    return visible;
  };
  const getCityRentalMapBuildingsForSelection = (selection, rentalData) => filterCityRentalBuildingsForSelection(
    selection,
    rentalData,
    getCityRentalMapInventory(rentalData),
  );

  const setupCityRentalMap = (root, rentalData) => {
    const canvas = $('#city-rental-map-canvas', root);
    if (!canvas) return;
    if (!window.L) {
      canvas.innerHTML = '<p class="city-rental-map__error">The map could not be loaded. The rental buildings remain available in the list.</p>';
      return;
    }

    const map = window.L.map(canvas, {
      attributionControl: true,
      scrollWheelZoom: false,
      zoomControl: true,
    });
    window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>',
      maxZoom: 19,
    }).addTo(map);

    const clustering = window.CasaPayCityRentalClustering;
    const mapInventory = getCityRentalMapInventory(rentalData);
    const markers = new Map();
    const buildingById = new Map(mapInventory.map(building => [building.id, building]));
    let activeBuildings = [...mapInventory];
    let clusterMarkers = [];
    let renderFrame = null;
    let directMarkerId = null;
    let selectedBuildingId = null;
    let mapScrollTarget = null;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobileSheetQuery = window.matchMedia('(max-width: 767px)');
    const clusterSizeForTier = tier => ({ 25: 44, 50: 48, 100: 54, 250: 60, 500: 68, 1000: 76 })[tier] || 44;
    const keepMarkerAboveSheet = marker => {
      if (!mobileSheetQuery.matches) return;
      const markerElement = marker.getElement();
      const sheet = $('.city-rental-feed', root);
      if (!markerElement || !sheet) return;
      const mapRect = canvas.getBoundingClientRect();
      const sheetRect = sheet.getBoundingClientRect();
      const visibleBottom = Math.min(mapRect.bottom, sheetRect.top);
      const targetY = mapRect.top + Math.max(88, (visibleBottom - mapRect.top) * .58);
      const markerRect = markerElement.getBoundingClientRect();
      const offsetY = markerRect.top + markerRect.height / 2 - targetY;
      if (Math.abs(offsetY) > 4) map.panBy([0, offsetY], { animate: !reducedMotion, duration: .2 });
    };
    const setSelectedBuilding = (buildingId, scrollCard = false) => {
      selectedBuildingId = buildingId;
      $$('.city-rental-card[data-building-id]', root).forEach(card => {
        const selected = card.dataset.buildingId === buildingId;
        card.classList.toggle('is-map-selected', selected);
      });
      markers.forEach((marker, id) => marker.getElement()?.querySelector('.city-rental-map__marker')?.classList.toggle('is-selected', id === buildingId));
      if (scrollCard && buildingId) {
        if (mobileSheetQuery.matches) {
          root.dispatchEvent(new CustomEvent('cityrental:select', { detail: { buildingId } }));
        } else {
          $(`.city-rental-card[data-building-id="${CSS.escape(buildingId)}"]`, root)?.scrollIntoView({
            behavior: reducedMotion ? 'auto' : 'smooth',
            block: 'center',
          });
        }
      }
    };

    mapInventory.forEach((building, index) => {
      const operator = rentalData.operators[building.operatorId] || { name: building.operatorName || 'Rental operator' };
      const icon = window.L.divIcon({
        className: 'city-rental-map__leaflet-icon',
        html: `<span class="city-rental-map__marker">${index + 1}</span>`,
        iconAnchor: [17, 17],
        iconSize: [34, 34],
        popupAnchor: [0, -16],
      });
      const markerPrice = building.monthlyPriceFrom == null
        ? building.mapOnly ? 'map reference; current rent and availability are not shown' : 'check the operator site for current rent'
        : `from ${formatCityRentalAmount(rentalData, building.monthlyPriceFrom)} per month`;
      const markerLabel = `${building.name} by ${operator.name}, ${markerPrice}`;
      const marker = window.L.marker([building.latitude, building.longitude], { icon, title: markerLabel })
        .bindPopup(`<strong>${escapeRentalText(building.name)}</strong><span>${escapeRentalText(operator.name)}</span><small>${escapeRentalText(building.address)} · ${escapeRentalText(markerPrice)}</small>`);
      marker.on('add', () => marker.getElement()?.setAttribute('aria-label', markerLabel));
      marker.on('click', () => {
        if (building.mapOnly) {
          marker.openPopup();
          window.setTimeout(() => keepMarkerAboveSheet(marker), mobileSheetQuery.matches && !reducedMotion ? 40 : 0);
          return;
        }
        mapScrollTarget = building.id;
        setSelectedBuilding(building.id, true);
        const sheetSettleDelay = mobileSheetQuery.matches && !reducedMotion ? 320 : 0;
        const selectionReleaseDelay = mobileSheetQuery.matches && !reducedMotion ? 600 : 0;
        window.setTimeout(() => {
          marker.openPopup();
          window.setTimeout(() => keepMarkerAboveSheet(marker), mobileSheetQuery.matches && !reducedMotion ? 40 : 0);
        }, sheetSettleDelay);
        window.setTimeout(() => {
          setSelectedBuilding(building.id);
          mapScrollTarget = null;
        }, selectionReleaseDelay);
      });
      marker.on('popupclose', () => {
        if (selectedBuildingId === building.id) setSelectedBuilding(null);
      });
      markers.set(building.id, marker);
    });

    const clearClusterMarkers = () => {
      clusterMarkers.forEach(marker => marker.removeFrom(map));
      clusterMarkers = [];
    };
    const showIndividualMarkers = buildings => buildings.forEach(building => {
      const marker = markers.get(building.id);
      if (marker && !map.hasLayer(marker)) marker.addTo(map);
    });
    const zoomIntoCluster = cluster => {
      const nextZoom = Math.min(map.getMaxZoom(), map.getZoom() + 2);
      map.setView([cluster.latitude, cluster.longitude], nextZoom, { animate: !reducedMotion });
    };
    const createClusterMarker = cluster => {
      const size = clusterSizeForTier(cluster.tier);
      const label = `${cluster.count} rental buildings. Zoom in to reveal individual buildings.`;
      const icon = window.L.divIcon({
        className: 'city-rental-map__cluster-leaflet-icon',
        html: `<span class="city-rental-map__cluster" data-cluster-tier="${cluster.tier}"><span>${cluster.count}</span></span>`,
        iconAnchor: [size / 2, size / 2],
        iconSize: [size, size],
      });
      const marker = window.L.marker([cluster.latitude, cluster.longitude], {
        icon,
        keyboard: true,
        riseOnHover: true,
        title: label,
      });
      marker.on('add', () => {
        const element = marker.getElement();
        if (!element) return;
        element.setAttribute('aria-label', label);
        element.setAttribute('role', 'button');
        element.setAttribute('tabindex', '0');
        element.addEventListener('keydown', event => {
          if (!['Enter', ' '].includes(event.key)) return;
          event.preventDefault();
          event.stopPropagation();
          zoomIntoCluster(cluster);
        });
      });
      marker.on('click', () => zoomIntoCluster(cluster));
      marker.addTo(map);
      clusterMarkers.push(marker);
    };
    const renderMapLayers = () => {
      renderFrame = null;
      if (!map._loaded || !map.getBounds().isValid()) return;
      clearClusterMarkers();
      markers.forEach((marker, buildingId) => {
        if (buildingId !== directMarkerId && map.hasLayer(marker)) marker.removeFrom(map);
      });
      const paddedBounds = map.getBounds().pad(.12);
      const visibleBuildings = activeBuildings.length <= (clustering?.INDIVIDUAL_PIN_LIMIT || 24)
        ? activeBuildings
        : activeBuildings.filter(building => paddedBounds.contains([building.latitude, building.longitude]));
      const clusterState = clustering
        ? clustering.clusterVisibleBuildings({
          buildings: visibleBuildings,
          zoom: map.getZoom(),
          viewport: { width: canvas.clientWidth, height: canvas.clientHeight },
          pointFor: building => map.latLngToContainerPoint([building.latitude, building.longitude]),
        })
        : { mode: 'pins', pins: visibleBuildings, clusters: [] };
      canvas.dataset.zoom = String(map.getZoom());
      canvas.dataset.markerMode = clusterState.mode;
      canvas.dataset.visibleBuildingCount = String(visibleBuildings.length);
      canvas.dataset.visibleClusterCount = String(clusterState.clusters.length);
      if (clusterState.mode === 'pins') showIndividualMarkers(clusterState.pins);
      else clusterState.clusters.forEach(createClusterMarker);
      if (directMarkerId && buildingById.has(directMarkerId)) showIndividualMarkers([buildingById.get(directMarkerId)]);
    };
    const scheduleMapRender = () => {
      if (renderFrame !== null) cancelAnimationFrame(renderFrame);
      renderFrame = requestAnimationFrame(renderMapLayers);
    };
    map.on('zoomend moveend', scheduleMapRender);

    const connectedCards = new WeakSet();
    const connectCards = () => $$('.city-rental-card[data-building-id]', root).forEach(card => {
      if (connectedCards.has(card)) return;
      connectedCards.add(card);
      const buildingId = card.dataset.buildingId;
      const highlight = () => {
        if (mapScrollTarget && mapScrollTarget !== buildingId) return;
        directMarkerId = buildingId;
        showIndividualMarkers([buildingById.get(buildingId)]);
        setSelectedBuilding(buildingId);
        markers.get(buildingId)?.openPopup();
      };
      card.addEventListener('mouseenter', highlight);
      card.addEventListener('focusin', highlight);
      card.addEventListener('mouseleave', () => {
        if (!card.contains(document.activeElement)) {
          markers.get(buildingId)?.closePopup();
          if (directMarkerId === buildingId) directMarkerId = null;
          scheduleMapRender();
        }
      });
      card.addEventListener('focusout', event => {
        if (!card.contains(event.relatedTarget)) {
          markers.get(buildingId)?.closePopup();
          if (directMarkerId === buildingId) directMarkerId = null;
          scheduleMapRender();
        }
      });
    });
    const setVisibleBuildings = buildings => {
      activeBuildings = [...buildings];
      directMarkerId = null;
      setSelectedBuilding(null);
      connectCards();
      renderMapLayers();
      if (buildings.length) {
        map.fitBounds(window.L.latLngBounds(buildings.map(building => [building.latitude, building.longitude])), { padding: [42, 42] });
      }
      requestAnimationFrame(() => {
        map.invalidateSize();
        scheduleMapRender();
      });
    };
    setVisibleBuildings(mapInventory);
    root.addEventListener('cityrental:clear', () => {
      map.closePopup();
      directMarkerId = null;
      setSelectedBuilding(null);
      scheduleMapRender();
    });
    requestAnimationFrame(() => map.invalidateSize());
    const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(() => {
      map.invalidateSize();
      scheduleMapRender();
    }) : null;
    resizeObserver?.observe(canvas);
    return { setVisibleBuildings };
  };

  const setupCityRentalSheet = root => {
    const sheet = $('.city-rental-feed', root);
    const handle = $('.city-rental-sheet__handle', root);
    const scrollPanel = $('.city-rental-feed__scroll', root);
    const clearSelection = $('.city-rental-sheet__clear', root);
    const status = $('.city-rental-sheet__status', root);
    const heading = $('.city-rental-feed__intro h2', root);
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!sheet || !handle || !scrollPanel || !clearSelection || !status || !heading) return;

    const states = ['homes', 'balanced', 'map'];
    let state = 'balanced';
    let selectedBuildingId = null;
    let visibleCount = $$('.city-rental-card[data-building-id]', root).length;
    let gesture = null;
    let suppressClick = false;
    let resizeFrame = null;

    const snapPositions = () => {
      const height = Math.max(1, root.getBoundingClientRect().height);
      const homes = 8;
      const map = Math.max(homes, height - 146);
      const balancedRatio = height < 520 ? .36 : .47;
      const balanced = Math.min(map - 72, Math.max(homes + 96, Math.round(height * balancedRatio)));
      return { homes, balanced, map };
    };
    const clampPosition = value => {
      const snaps = snapPositions();
      return Math.min(snaps.map, Math.max(snaps.homes, value));
    };
    const announceState = message => {
      status.textContent = '';
      requestAnimationFrame(() => { status.textContent = message; });
    };
    const updateHandle = () => {
      const showMoreHomes = state !== 'homes';
      handle.setAttribute('aria-expanded', state === 'map' ? 'false' : 'true');
      handle.setAttribute('aria-label', showMoreHomes ? 'Show more homes' : 'Show more map');
      handle.title = showMoreHomes ? 'Show more homes' : 'Show more map';
    };
    const setSheetPosition = value => {
      root.style.setProperty('--city-rental-sheet-y', `${clampPosition(value)}px`);
    };
    const setState = (nextState, options = {}) => {
      if (!states.includes(nextState)) return;
      state = nextState;
      root.dataset.mobileSheetState = state;
      sheet.classList.toggle('is-snap-immediate', Boolean(options.immediate || reducedMotion.matches));
      setSheetPosition(snapPositions()[state]);
      updateHandle();
      if (options.announce !== false) {
        const label = state === 'homes' ? 'Homes view expanded' : state === 'map' ? 'Map view expanded' : 'Map and homes view balanced';
        announceState(label);
      }
      requestAnimationFrame(() => sheet.classList.remove('is-snap-immediate'));
    };
    const setSelectionVisibility = () => {
      const mobileSelected = mobileQuery.matches && selectedBuildingId;
      root.classList.toggle('is-mobile-selected', Boolean(mobileSelected));
      $$('.city-rental-card[data-building-id]', root).forEach(card => {
        card.hidden = Boolean(mobileSelected && card.dataset.buildingId !== selectedBuildingId);
      });
      $$('.city-rental-feed__group-heading,.city-rental-promo', root).forEach(node => { node.hidden = Boolean(mobileSelected); });
      const editorial = $('.city-rental-feed__editorial', root);
      if (editorial) editorial.hidden = Boolean(mobileSelected);
      clearSelection.hidden = !mobileSelected;
      if (mobileSelected) {
        const selectedCard = $(`.city-rental-card[data-building-id="${CSS.escape(selectedBuildingId)}"]`, root);
        heading.textContent = $('h3', selectedCard)?.textContent.trim() || 'Selected home';
      } else {
        heading.textContent = 'Offers';
      }
    };
    const clearSelectedBuilding = ({ announce = true } = {}) => {
      selectedBuildingId = null;
      delete root.dataset.selectedBuildingId;
      setSelectionVisibility();
      scrollPanel.scrollTop = 0;
      root.dispatchEvent(new CustomEvent('cityrental:clear'));
      setState('balanced', { announce: false });
      if (announce) announceState(`Showing ${visibleCount} homes`);
    };

    root.addEventListener('cityrental:select', event => {
      if (!mobileQuery.matches || !event.detail?.buildingId) return;
      selectedBuildingId = event.detail.buildingId;
      root.dataset.selectedBuildingId = selectedBuildingId;
      setSelectionVisibility();
      scrollPanel.scrollTop = 0;
      setState('balanced', { announce: false });
      const selectedName = heading.textContent.trim() || 'Selected home';
      announceState(`${selectedName} selected. Showing one home.`);
    });
    clearSelection.addEventListener('click', () => clearSelectedBuilding());
    root.addEventListener('cityrental:feedchange', event => {
      visibleCount = Number(event.detail?.visibleCount) || $$('.city-rental-card[data-building-id]', root).length;
      if (selectedBuildingId) clearSelectedBuilding({ announce: false });
      else setSelectionVisibility();
    });

    const moveOneState = direction => {
      const index = states.indexOf(state);
      setState(states[Math.min(states.length - 1, Math.max(0, index + direction))]);
    };
    handle.addEventListener('click', () => {
      if (suppressClick) {
        suppressClick = false;
        return;
      }
      moveOneState(state === 'homes' ? 1 : -1);
    });
    handle.addEventListener('keydown', event => {
      if (event.key === 'ArrowUp') { event.preventDefault(); moveOneState(-1); }
      if (event.key === 'ArrowDown') { event.preventDefault(); moveOneState(1); }
      if (event.key === 'Home') { event.preventDefault(); setState('homes'); }
      if (event.key === 'End') { event.preventDefault(); setState('map'); }
    });

    const beginGesture = (source, clientY, pointerId = null) => {
      if (!mobileQuery.matches || gesture) return false;
      gesture = { source, pointerId, startY: clientY, lastY: clientY, startPosition: snapPositions()[state] };
      suppressClick = false;
      sheet.classList.add('is-dragging');
      return true;
    };
    const moveGesture = clientY => {
      if (!gesture) return;
      gesture.lastY = clientY;
      const delta = clientY - gesture.startY;
      if (Math.abs(delta) > 8) suppressClick = true;
      setSheetPosition(gesture.startPosition + delta);
    };
    const endGesture = source => {
      if (!gesture || gesture.source !== source) return;
      const delta = gesture.lastY - gesture.startY;
      const current = gesture.startPosition + delta;
      sheet.classList.remove('is-dragging');
      gesture = null;
      if (Math.abs(delta) >= 42) {
        moveOneState(delta > 0 ? 1 : -1);
        return;
      }
      const snaps = snapPositions();
      const nearest = states.reduce((best, candidate) => Math.abs(snaps[candidate] - current) < Math.abs(snaps[best] - current) ? candidate : best, state);
      setState(nearest);
    };

    handle.addEventListener('pointerdown', event => {
      if (event.button !== 0 || !beginGesture('pointer', event.clientY, event.pointerId)) return;
      handle.setPointerCapture?.(event.pointerId);
    });
    handle.addEventListener('pointermove', event => {
      if (gesture?.source === 'pointer' && gesture.pointerId === event.pointerId) moveGesture(event.clientY);
    });
    handle.addEventListener('pointerup', event => {
      if (gesture?.pointerId === event.pointerId) endGesture('pointer');
    });
    handle.addEventListener('pointercancel', () => endGesture('pointer'));
    handle.addEventListener('touchstart', event => {
      if (!gesture && event.touches[0]) beginGesture('touch', event.touches[0].clientY);
    }, { passive: true });
    handle.addEventListener('touchmove', event => {
      if (gesture?.source !== 'touch' || !event.touches[0]) return;
      event.preventDefault();
      moveGesture(event.touches[0].clientY);
    }, { passive: false });
    handle.addEventListener('touchend', () => endGesture('touch'));
    handle.addEventListener('touchcancel', () => endGesture('touch'));

    const refreshLayout = () => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        if (mobileQuery.matches) {
          setSelectionVisibility();
          setState(state, { immediate: true, announce: false });
        } else {
          selectedBuildingId = null;
          delete root.dataset.selectedBuildingId;
          delete root.dataset.mobileSheetState;
          root.style.removeProperty('--city-rental-sheet-y');
          setSelectionVisibility();
        }
      });
    };
    mobileQuery.addEventListener?.('change', refreshLayout);
    window.addEventListener('resize', refreshLayout, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(refreshLayout).observe(root);
    setSelectionVisibility();
    setState('balanced', { immediate: true, announce: false });
  };

  const setupCityRentals = () => {
    const rentalData = getCityRentalData();
    if (!rentalData || window.location.pathname.replace(/\/$/, '') !== rentalData.route) return;
    const main = $('main');
    if (!main || main.dataset.offlineCityRentals === 'true') return;
    main.dataset.offlineCityRentals = 'true';
    main.classList.add('city-rental-results-main');
    document.body.classList.add('city-rental-results-page');
    document.title = `Homes to rent in ${rentalData.city} - CasaPay`;

    const categoryList = $('ol.offline-category-strip', main);
    if (categoryList) {
      categoryList.setAttribute('aria-label', 'Browse rental categories');
      categoryList.replaceChildren(...RENTAL_CATEGORIES.map(([label, iconKey, slug], index) => {
        const item = document.createElement('li');
        item.className = 'city-rental-category';
        item.style.setProperty('--city-rental-category-index', index);
        item.innerHTML = `<a href="/tenant/offers?category=${slug}"><span aria-hidden="true"><img src="${escapeRentalText(rentalData.categoryAssetBase)}/${iconKey}.png" alt="" width="200" height="200" decoding="async" draggable="false"></span><strong>${label}</strong></a>`;
        return item;
      }));
      const categoryFrame = categoryList.parentElement;
      const legacyControlRow = categoryList.closest('.rbxsuj5')?.firstElementChild;
      legacyControlRow?.classList.add('city-rental-category-legacy-controls');
      categoryFrame.classList.add('city-rental-category-frame');

      const categoryStage = document.createElement('div');
      categoryStage.className = 'city-rental-category-stage';
      categoryFrame.before(categoryStage);
      categoryStage.append(categoryFrame);

      const scrollButton = (direction, label, path) => {
        const button = document.createElement('button');
        button.className = `city-rental-category-scroll city-rental-category-scroll--${direction}`;
        button.type = 'button';
        button.setAttribute('aria-label', label);
        button.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
        return button;
      };
      const previousCategory = scrollButton('previous', 'Show previous rental categories', 'M15 18l-6-6 6-6');
      const nextCategory = scrollButton('next', 'Show more rental categories', 'M9 6l6 6-6 6');
      categoryStage.append(previousCategory, nextCategory);

      let scrollStateFrame = null;
      const updateCategoryScrollControls = () => {
        if (scrollStateFrame) cancelAnimationFrame(scrollStateFrame);
        scrollStateFrame = requestAnimationFrame(() => {
          const maximumScroll = Math.max(0, categoryFrame.scrollWidth - categoryFrame.clientWidth);
          previousCategory.hidden = maximumScroll < 2 || categoryFrame.scrollLeft <= 1;
          nextCategory.hidden = maximumScroll < 2 || categoryFrame.scrollLeft >= maximumScroll - 1;
        });
      };
      const scrollCategories = direction => {
        const distance = Math.max(categoryFrame.clientWidth * .72, 4 * 108);
        categoryFrame.scrollBy({
          left: direction * distance,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        });
      };
      previousCategory.addEventListener('click', () => scrollCategories(-1));
      nextCategory.addEventListener('click', () => scrollCategories(1));
      categoryFrame.addEventListener('scroll', updateCategoryScrollControls, { passive: true });
      window.addEventListener('resize', updateCategoryScrollControls, { passive: true });
      if ('ResizeObserver' in window) new ResizeObserver(updateCategoryScrollControls).observe(categoryFrame);
      categoryFrame.scrollLeft = 0;
      requestAnimationFrame(() => {
        categoryFrame.scrollLeft = 0;
        updateCategoryScrollControls();
      });
    }
    const filterBar = categoryList?.closest('.offline-category-strip-section') || categoryList?.closest('.s3d7ju0');
    filterBar?.classList.add('city-rental-filter-bar');

    const sectionForHeading = label => {
      const heading = $$('h2', main).find(node => node.textContent.replace(/\s+/g, ' ').trim() === label);
      return heading?.closest('.s3d7ju0') || heading?.closest('section');
    };
    const fastest = sectionForHeading('Fastest rental');
    const getToKnow = sectionForHeading('Get to know us!');
    if (!fastest || !getToKnow) return;

    const oldPromoLinks = $$('a', main).filter(link => /€0 rental for 14 days|Back to your routine/.test(link.textContent));
    const oldPromoContainers = [...new Set(oldPromoLinks.map(link => link.closest('.s3d7ju0') || link.parentElement).filter(Boolean))];
    oldPromoContainers.forEach(container => container.remove());

    const citySections = $$('.s3d7ju0', main);
    const startIndex = citySections.indexOf(fastest);
    const endIndex = citySections.indexOf(getToKnow);
    if (startIndex >= 0 && endIndex > startIndex) citySections.slice(startIndex, endIndex).forEach(section => section.remove());

    const featureChips = building => {
      const visibleAmenities = building.amenities.slice(0, 5);
      const remainingCount = building.amenities.length - visibleAmenities.length;
      return `<ul class="city-rental-card__features" aria-label="Building features">
        ${visibleAmenities.map(amenity => {
          const feature = CITY_RENTAL_FEATURES[amenity];
          return feature ? `<li>${cityRentalFeatherIcon(feature.icon)}<span>${escapeRentalText(feature.label)}</span></li>` : '';
        }).join('')}
        ${remainingCount > 0 ? `<li class="city-rental-card__feature-more" aria-label="${remainingCount} more building features">+${remainingCount}</li>` : ''}
      </ul>`;
    };
    const rentalGalleryImages = [...new Set(rentalData.buildings.map(item => item.image))];
    const galleryImagesFor = building => {
      if (Array.isArray(building.images) && building.images.length) {
        return [0, 1, 2, 3].map(index => building.images[index % building.images.length]);
      }
      const primaryIndex = Math.max(0, rentalGalleryImages.indexOf(building.image));
      return [0, 1, 2, 3].map(offset => rentalGalleryImages[(primaryIndex + offset) % rentalGalleryImages.length]);
    };
    const offerCard = building => {
      const operator = rentalData.operators[building.operatorId];
      const galleryImages = galleryImagesFor(building);
      const price = building.monthlyPriceFrom == null
        ? null
        : building.monthlyPriceFrom === building.monthlyPriceTo
          ? formatCityRentalAmount(rentalData, building.monthlyPriceFrom)
          : `${formatCityRentalAmount(rentalData, building.monthlyPriceFrom)}–${formatCityRentalAmount(rentalData, building.monthlyPriceTo)}`;
      return `
        <article class="city-rental-card" id="${escapeRentalText(rentalData.citySlug)}-building-${escapeRentalText(building.id)}" data-building-id="${escapeRentalText(building.id)}">
          <div class="city-rental-card__media"><div class="city-rental-card__gallery-track">${galleryImages.map((image, index) => `<img src="${escapeRentalText(image)}" alt="" aria-hidden="true" width="1536" height="1024" ${index ? 'loading="lazy" ' : ''}decoding="async">`).join('')}</div><span>${escapeRentalText(building.badge)}</span><button type="button" class="city-rental-gallery-arrow city-rental-gallery-arrow--previous" data-gallery-step="-1" aria-label="Previous photo for ${escapeRentalText(building.name)}">${cityRentalFeatherIcon('chevron-left')}</button><button type="button" class="city-rental-gallery-arrow city-rental-gallery-arrow--next" data-gallery-step="1" aria-label="Next photo for ${escapeRentalText(building.name)}">${cityRentalFeatherIcon('chevron-right')}</button><div class="city-rental-gallery-dots" role="group" aria-label="Choose a photo for ${escapeRentalText(building.name)}">${galleryImages.map((_, index) => `<button type="button" data-gallery-index="${index}" aria-label="Show photo ${index + 1} of 4 for ${escapeRentalText(building.name)}"${index === 0 ? ' aria-current="true"' : ''}></button>`).join('')}</div></div><span class="city-rental-gallery-status" aria-live="polite">Photo 1 of 4 for ${escapeRentalText(building.name)}</span>
          <a href="${escapeRentalText(building.applicationUrl)}" target="_blank" rel="noopener noreferrer" aria-label="View ${escapeRentalText(building.name)} by ${escapeRentalText(operator.name)} on the operator website">
            <div class="city-rental-card__body"><div class="city-rental-card__operator"><img src="${escapeRentalText(operator.logo)}" alt="" aria-hidden="true" width="200" height="200"><span>${escapeRentalText(operator.name)}</span></div><h3>${escapeRentalText(building.name)}</h3><p>${escapeRentalText(building.address)}</p>${featureChips(building)}<div class="city-rental-card__price"><strong>${price || 'Check current rent'}</strong><span>${price ? '/ month indicative' : 'on operator site'}</span></div></div>
          </a>
        </article>`;
    };
    const productCard = (variant, href, eyebrow, title, description, image, external = false) => `
      <a class="city-rental-promo city-rental-promo--${variant}" href="${href}"${external ? ` data-offline-external="${title}"` : ''}>
        <img src="${image}" alt="" aria-hidden="true" width="1536" height="1024">
        <span>${eyebrow}</span><strong>${title}</strong><small>${description}</small>
      </a>`;

    const buildFeedMarkup = buildings => {
      if (!buildings.length) return `<div class="city-rental-empty"><strong>No matching homes</strong><span>Try removing a filter or widening the monthly rent range.</span></div>`;
      let renderedOfferCount = 0;
      return buildings.map(building => {
        let prefix = '';
        if (renderedOfferCount === 4) prefix = productCard('protection', '/tenant/tenant-protection', 'Eligible rental support', 'Tenant Protection', 'Understand the home, operator, payment and applicable protection before move-in.', '/assets/generated/tenant-protection/casapay-tenant-move-in.png');
        if (renderedOfferCount === 9) prefix = productCard('plus', '/tenant/casapay-plus', 'More flexibility', 'CasaPay+ offer', 'Explore eligible no-deposit and tenant membership options.', '/assets/generated/platform-partner-photo/openai-gpt-image-2/audiences/crm-platform.png');
        renderedOfferCount += 1;
        return `${prefix}${offerCard(building)}`;
      }).join('');
    };

    let selection = getCityRentalSelection(rentalData);
    let visibleBuildings = getCityRentalBuildingsForSelection(selection, rentalData);
    let visibleMapBuildings = getCityRentalMapBuildingsForSelection(selection, rentalData);
    const mapInventory = getCityRentalMapInventory(rentalData);
    const filterGroups = getCityRentalFilterGroups(rentalData);
    const filterOptionMap = getCityRentalFilterOptionMap(rentalData);
    const filterOptionMarkup = option => {
      const feature = option.amenity ? CITY_RENTAL_FEATURES[option.amenity] : null;
      return `<label class="city-rental-filter-option"><input type="checkbox" name="filters" value="${escapeRentalText(option.id)}"><span>${cityRentalFeatherIcon(option.icon || feature?.icon || 'check')}<span>${escapeRentalText(option.label)}</span></span></label>`;
    };
    const filterGroupsMarkup = filterGroups.map(group => `<fieldset class="city-rental-filter-group"><legend>${escapeRentalText(group.title)}</legend>${group.description ? `<p>${escapeRentalText(group.description)}</p>` : ''}<div>${group.options.map(filterOptionMarkup).join('')}</div></fieldset>`).join('');

    const discoverySplit = document.createElement('section');
    discoverySplit.className = 'city-rental-discovery-split';
    discoverySplit.setAttribute('aria-label', `${rentalData.city} rental offers and map`);
    discoverySplit.innerHTML = `
      <div class="city-rental-feed" id="city-rental-homes-sheet" role="region" aria-label="${escapeRentalText(rentalData.city)} rental homes">
        <div class="city-rental-sheet__chrome">
          <button class="city-rental-sheet__handle" type="button" aria-controls="city-rental-feed-scroll" aria-expanded="true" aria-label="Show more homes"><span aria-hidden="true"></span></button>
          <div class="city-rental-feed__intro"><h2 id="city-rental-row-0">Offers</h2><div class="city-rental-results-controls"><div class="city-rental-sort"><button type="button" class="city-rental-control city-rental-sort__button" aria-haspopup="menu" aria-expanded="false">${cityRentalFeatherIcon('bar-chart-2')}<span class="city-rental-sort__label">${escapeRentalText(CITY_RENTAL_SORT_OPTIONS.find(option => option.id === selection.sort)?.label || 'Recommended')}</span></button><div class="city-rental-sort__menu" role="menu" hidden>${CITY_RENTAL_SORT_OPTIONS.map(option => `<button type="button" role="menuitemradio" aria-checked="${option.id === selection.sort}" data-sort="${option.id}">${cityRentalFeatherIcon(option.id === selection.sort ? 'check' : 'bar-chart-2')}<span>${escapeRentalText(option.label)}</span></button>`).join('')}</div></div><button type="button" class="city-rental-control city-rental-filters__button" aria-haspopup="dialog">${cityRentalFeatherIcon('sliders')}<span>Filters</span><span class="city-rental-filter-count" hidden></span></button></div><button class="city-rental-sheet__clear" type="button" aria-label="Show all homes" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
          <div class="city-rental-active-filters" aria-label="Active filters" hidden></div>
          <p class="city-rental-sheet__status" aria-live="polite"></p>
        </div>
        <div class="city-rental-feed__scroll" id="city-rental-feed-scroll" role="region" aria-label="Rental home results" tabindex="0">
          <div class="city-rental-feed__grid">${buildFeedMarkup(visibleBuildings)}</div>
        </div>
      </div>
      <aside class="city-rental-map" aria-label="Interactive OpenStreetMap showing ${mapInventory.length} ${escapeRentalText(rentalData.city)} rental buildings">
        <div class="city-rental-map__canvas" id="city-rental-map-canvas" role="application" aria-label="Map of operator-published ${escapeRentalText(rentalData.city)} rental buildings"></div>
      </aside>
      <div class="city-rental-filter-modal" hidden>
        <button type="button" class="city-rental-filter-modal__backdrop" aria-label="Close filters"></button>
        <section class="city-rental-filter-modal__panel" role="dialog" aria-modal="true" aria-labelledby="city-rental-filter-title" tabindex="-1">
          <header><span aria-hidden="true"></span><h2 id="city-rental-filter-title">Sort & filter</h2><button type="button" class="city-rental-filter-modal__close" aria-label="Close filters">${cityRentalFeatherIcon('x')}</button></header>
          <form class="city-rental-filter-form">
            <fieldset class="city-rental-filter-group"><legend>Sort by</legend><div>${CITY_RENTAL_SORT_OPTIONS.map(option => `<label class="city-rental-filter-option"><input type="radio" name="sort" value="${option.id}"><span>${cityRentalFeatherIcon('bar-chart-2')}<span>${escapeRentalText(option.label)}</span></span></label>`).join('')}</div></fieldset>
            <fieldset class="city-rental-filter-group city-rental-filter-price"><legend>Monthly rent</legend><p>Show homes whose indicative range overlaps your budget. Buildings without published monthly pricing are omitted when this filter is active.</p><div><label>From ${escapeRentalText(rentalData.currencySymbol)}<input type="number" name="priceFrom" min="${rentalData.priceRange.min}" max="${rentalData.priceRange.max}" step="${rentalData.priceRange.step}" inputmode="numeric"></label><label>To ${escapeRentalText(rentalData.currencySymbol)}<input type="number" name="priceTo" min="${rentalData.priceRange.min}" max="${rentalData.priceRange.max}" step="${rentalData.priceRange.step}" inputmode="numeric"></label></div></fieldset>
            ${filterGroupsMarkup}
          </form>
          <footer><button type="button" class="city-rental-filter-clear">Clear all</button><button type="button" class="city-rental-filter-apply">Show <span>${visibleBuildings.length}</span> homes</button></footer>
        </section>
      </div>`;
    getToKnow.insertAdjacentElement('beforebegin', discoverySplit);
    const mapController = setupCityRentalMap(discoverySplit, rentalData);
    const feedGrid = $('.city-rental-feed__grid', discoverySplit);
    const sortRoot = $('.city-rental-sort', discoverySplit);
    const sortButton = $('.city-rental-sort__button', discoverySplit);
    const sortLabel = $('.city-rental-sort__label', discoverySplit);
    const sortMenu = $('.city-rental-sort__menu', discoverySplit);
    const filterButton = $('.city-rental-filters__button', discoverySplit);
    const filterCount = $('.city-rental-filter-count', discoverySplit);
    const activeFilters = $('.city-rental-active-filters', discoverySplit);
    const filterModal = $('.city-rental-filter-modal', discoverySplit);
    const filterPanel = $('.city-rental-filter-modal__panel', discoverySplit);
    const filterForm = $('.city-rental-filter-form', discoverySplit);
    const applyFiltersButton = $('.city-rental-filter-apply', discoverySplit);
    document.body.append(filterModal);
    let filterReturnFocus = null;

    const activeFilterCount = currentSelection => currentSelection.filters.length
      + (currentSelection.priceFrom !== rentalData.priceRange.min || currentSelection.priceTo !== rentalData.priceRange.max ? 1 : 0);
    const closeSortMenu = () => {
      sortMenu.hidden = true;
      sortButton.setAttribute('aria-expanded', 'false');
    };
    const renderSelection = ({ updateUrl = true } = {}) => {
      visibleBuildings = getCityRentalBuildingsForSelection(selection, rentalData);
      visibleMapBuildings = getCityRentalMapBuildingsForSelection(selection, rentalData);
      feedGrid.innerHTML = buildFeedMarkup(visibleBuildings);
      const selectedSort = CITY_RENTAL_SORT_OPTIONS.find(option => option.id === selection.sort) || CITY_RENTAL_SORT_OPTIONS[0];
      sortLabel.textContent = selectedSort.label;
      $$('[data-sort]', sortMenu).forEach(button => {
        const selected = button.dataset.sort === selection.sort;
        button.setAttribute('aria-checked', String(selected));
        button.querySelector('.city-rental-feather').textContent = String.fromCodePoint(CITY_RENTAL_FEATHER_CODES[selected ? 'check' : 'bar-chart-2']);
      });
      const count = activeFilterCount(selection);
      filterButton.classList.toggle('is-active', count > 0);
      filterCount.hidden = count === 0;
      filterCount.textContent = count ? String(count) : '';
      const selectedOptions = selection.filters.map(id => filterOptionMap.get(id)).filter(Boolean);
      const priceActive = selection.priceFrom !== rentalData.priceRange.min || selection.priceTo !== rentalData.priceRange.max;
      activeFilters.hidden = !selectedOptions.length && !priceActive;
      activeFilters.innerHTML = `${selectedOptions.map(option => `<button type="button" data-remove-filter="${escapeRentalText(option.id)}" aria-label="Remove ${escapeRentalText(option.label)} filter"><span>${escapeRentalText(option.label)}</span>${cityRentalFeatherIcon('x')}</button>`).join('')}${priceActive ? `<button type="button" data-remove-price aria-label="Remove monthly rent filter"><span>${escapeRentalText(rentalData.currencySymbol)}${selection.priceFrom}–${escapeRentalText(rentalData.currencySymbol)}${selection.priceTo}</span>${cityRentalFeatherIcon('x')}</button>` : ''}`;
      mapController?.setVisibleBuildings(visibleMapBuildings);
      discoverySplit.dispatchEvent(new CustomEvent('cityrental:feedchange', { detail: { visibleCount: visibleBuildings.length } }));
      if (updateUrl) serializeCityRentalSelection(selection, rentalData);
    };
    const fillFilterForm = () => {
      $$('input[name="filters"]', filterForm).forEach(input => { input.checked = selection.filters.includes(input.value); });
      $$('input[name="sort"]', filterForm).forEach(input => { input.checked = input.value === selection.sort; });
      filterForm.elements.priceFrom.value = selection.priceFrom;
      filterForm.elements.priceTo.value = selection.priceTo;
      applyFiltersButton.querySelector('span').textContent = visibleBuildings.length;
    };
    const readFilterForm = () => {
      const checkedFilters = $$('input[name="filters"]:checked', filterForm).map(input => input.value);
      const rawFrom = Number(filterForm.elements.priceFrom.value);
      const rawTo = Number(filterForm.elements.priceTo.value);
      const requestedFrom = Number.isFinite(rawFrom) ? rawFrom : rentalData.priceRange.min;
      const requestedTo = Number.isFinite(rawTo) ? rawTo : rentalData.priceRange.max;
      return {
        filters: checkedFilters,
        priceFrom: Math.max(rentalData.priceRange.min, Math.min(rentalData.priceRange.max, Math.min(requestedFrom, requestedTo))),
        priceTo: Math.max(rentalData.priceRange.min, Math.min(rentalData.priceRange.max, Math.max(requestedFrom, requestedTo))),
        sort: filterForm.querySelector('input[name="sort"]:checked')?.value || 'recommended',
      };
    };
    const updateFilterPreview = () => {
      const draftSelection = readFilterForm();
      applyFiltersButton.querySelector('span').textContent = getCityRentalBuildingsForSelection(draftSelection, rentalData).length;
    };
    const openFilters = () => {
      filterReturnFocus = document.activeElement;
      fillFilterForm();
      filterModal.hidden = false;
      document.body.classList.add('city-rental-filter-open');
      requestAnimationFrame(() => filterPanel.focus());
    };
    const closeFilters = () => {
      filterModal.hidden = true;
      document.body.classList.remove('city-rental-filter-open');
      filterReturnFocus?.focus?.();
    };

    sortButton.addEventListener('click', event => {
      event.stopPropagation();
      const opening = sortMenu.hidden;
      sortMenu.hidden = !opening;
      sortButton.setAttribute('aria-expanded', String(opening));
      if (opening) sortMenu.querySelector(`[data-sort="${CSS.escape(selection.sort)}"]`)?.focus();
    });
    $$('[data-sort]', sortMenu).forEach(button => button.addEventListener('click', () => {
      selection = { ...selection, sort: button.dataset.sort };
      closeSortMenu();
      renderSelection();
      sortButton.focus();
    }));
    filterButton.addEventListener('click', openFilters);
    $$('.city-rental-filter-modal__backdrop,.city-rental-filter-modal__close', filterModal).forEach(button => button.addEventListener('click', closeFilters));
    filterForm.addEventListener('change', updateFilterPreview);
    filterForm.addEventListener('input', updateFilterPreview);
    $('.city-rental-filter-clear', filterModal).addEventListener('click', () => {
      $$('input[name="filters"]', filterForm).forEach(input => { input.checked = false; });
      $$('input[name="sort"]', filterForm).forEach(input => { input.checked = input.value === 'recommended'; });
      filterForm.elements.priceFrom.value = rentalData.priceRange.min;
      filterForm.elements.priceTo.value = rentalData.priceRange.max;
      updateFilterPreview();
    });
    applyFiltersButton.addEventListener('click', () => {
      selection = readFilterForm();
      renderSelection();
      closeFilters();
    });
    activeFilters.addEventListener('click', event => {
      const removeFilter = event.target.closest('[data-remove-filter]');
      const removePrice = event.target.closest('[data-remove-price]');
      if (removeFilter) selection = { ...selection, filters: selection.filters.filter(id => id !== removeFilter.dataset.removeFilter) };
      if (removePrice) selection = { ...selection, priceFrom: rentalData.priceRange.min, priceTo: rentalData.priceRange.max };
      if (removeFilter || removePrice) renderSelection();
    });
    discoverySplit.addEventListener('click', event => {
      const galleryControl = event.target.closest('[data-gallery-step],[data-gallery-index]');
      if (!galleryControl) return;
      const card = galleryControl.closest('.city-rental-card');
      const track = $('.city-rental-card__gallery-track', card);
      const status = $('.city-rental-gallery-status', card);
      if (!card || !track || !status) return;
      event.preventDefault();
      event.stopPropagation();
      const currentIndex = Number(card.dataset.galleryIndex || 0);
      const requestedIndex = galleryControl.dataset.galleryIndex == null
        ? currentIndex + Number(galleryControl.dataset.galleryStep)
        : Number(galleryControl.dataset.galleryIndex);
      const nextIndex = (requestedIndex + 4) % 4;
      card.dataset.galleryIndex = String(nextIndex);
      track.style.setProperty('--city-rental-gallery-index', String(nextIndex));
      status.textContent = `Photo ${nextIndex + 1} of 4 for ${$('h3', card)?.textContent.trim() || 'this home'}`;
      $$('[data-gallery-index]', card).forEach(dot => {
        if (Number(dot.dataset.galleryIndex) === nextIndex) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    });
    document.addEventListener('click', event => { if (!sortRoot.contains(event.target)) closeSortMenu(); });
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      if (!filterModal.hidden) closeFilters();
      else if (!sortMenu.hidden) {
        closeSortMenu();
        sortButton.focus();
      }
    });
    setupCityRentalSheet(discoverySplit);
    renderSelection({ updateUrl: false });
    getToKnow.className = 'city-rental-feed__editorial';
    const editorialCards = [
      ['Renting guide', 'Before you rent', 'A clear place to start.', '/tenant/tenant-protection'],
      ['CasaPay basics', 'Understand your payments', 'Simple guidance for everyday renting.', '/tenant/offers'],
    ];
    getToKnow.innerHTML = `
      <div class="city-rental-editorial__header">
        <h2>Get to know us!</h2>
        <div class="city-rental-editorial__controls">
          <button type="button" class="city-rental-editorial__control city-rental-editorial__control--previous" aria-label="Show previous guides"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg></button>
          <button type="button" class="city-rental-editorial__control city-rental-editorial__control--next" aria-label="Show more guides"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button>
        </div>
      </div>
      <div class="city-rental-editorial__viewport">
        <ol class="city-rental-editorial__track">
          ${editorialCards.map(([eyebrow, title, description, href], index) => `<li><a href="${href}"><span class="city-rental-editorial__media city-rental-editorial__media--${index + 1}"><img src="/assets/generated/tenant-protection/casapay-tenant-move-in.png" alt="" aria-hidden="true" width="800" height="450"></span><span class="city-rental-editorial__copy"><small>${eyebrow}</small><strong>${title}</strong><span>${description}</span></span></a></li>`).join('')}
        </ol>
      </div>`;
    const editorialViewport = $('.city-rental-editorial__viewport', getToKnow);
    const previousEditorial = $('.city-rental-editorial__control--previous', getToKnow);
    const nextEditorial = $('.city-rental-editorial__control--next', getToKnow);
    let editorialScrollFrame = null;
    const updateEditorialControls = () => {
      if (editorialScrollFrame) cancelAnimationFrame(editorialScrollFrame);
      editorialScrollFrame = requestAnimationFrame(() => {
        const maximumScroll = Math.max(0, editorialViewport.scrollWidth - editorialViewport.clientWidth);
        previousEditorial.hidden = maximumScroll < 2 || editorialViewport.scrollLeft <= 1;
        nextEditorial.hidden = maximumScroll < 2 || editorialViewport.scrollLeft >= maximumScroll - 1;
      });
    };
    const scrollEditorial = direction => editorialViewport.scrollBy({
      left: direction * Math.max(editorialViewport.clientWidth * .78, 260),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
    previousEditorial.addEventListener('click', () => scrollEditorial(-1));
    nextEditorial.addEventListener('click', () => scrollEditorial(1));
    editorialViewport.addEventListener('scroll', updateEditorialControls, { passive: true });
    window.addEventListener('resize', updateEditorialControls, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(updateEditorialControls).observe(editorialViewport);
    updateEditorialControls();
    const rentalFeedScroll = $('.city-rental-feed__scroll', discoverySplit);
    rentalFeedScroll?.append(getToKnow);

    let resultsShell = discoverySplit.parentElement;
    while (resultsShell && resultsShell.parentElement !== main) resultsShell = resultsShell.parentElement;
    resultsShell?.classList.add('city-rental-results-shell');

    const globalFooter = $('footer');
    globalFooter?.classList.add('city-rental-workspace-footer');

    const updateWorkspaceMetrics = () => requestAnimationFrame(() => {
      const headerShell = $('.offline-consumer-header-shell') || $('header');
      const headerHeight = Math.ceil(headerShell?.getBoundingClientRect().height || 72);
      const filterHeight = Math.ceil(filterBar?.getBoundingClientRect().height || 176);
      document.documentElement.style.setProperty('--city-rental-header-height', `${headerHeight}px`);
      document.documentElement.style.setProperty('--city-rental-filter-height', `${filterHeight}px`);
    });
    updateWorkspaceMetrics();
    document.fonts?.ready.then(updateWorkspaceMetrics);
    window.addEventListener('resize', updateWorkspaceMetrics, { passive: true });
    if ('ResizeObserver' in window && filterBar) new ResizeObserver(updateWorkspaceMetrics).observe(filterBar);

    const newStores = sectionForHeading('New stores on CasaPay');
    newStores?.remove();
    const discoveryHeading = $('h1', main);
    if (discoveryHeading?.textContent.trim() === 'Discovery') discoveryHeading.textContent = `Rent in ${rentalData.city}`;
  };

  const TENANT_HERO_FALLBACK = {
    mission: {
      fixedLine: 'RENTING.',
    },
    values: [
      { id: 'trusted', label: 'TRUSTED', status: 'active', order: 1 },
      { id: 'flexible', label: 'FLEXIBLE', status: 'active', order: 2 },
      { id: 'affordable', label: 'AFFORDABLE', status: 'active', order: 3 },
      { id: 'no-deposit', label: 'NO-DEPOSIT', status: 'active', order: 4 },
    ],
    rotation: {
      displayMs: 3200,
      transitionMs: 260,
    },
    accessibility: {
      headingLabel: 'Trusted, flexible, affordable and no-deposit renting.',
    },
  };

  const setupTenantHeroNarrative = async () => {
    const title = $('main h1.wpt-ui-AnimatedTitle_StyledTitle_s1gjtw5l');
    if (!title || title.dataset.offlineTenantHeroReady === 'true') return;
    title.dataset.offlineTenantHeroReady = 'true';

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let activeConfig = TENANT_HERO_FALLBACK;
    let rotationTimer = null;
    let transitionTimer = null;
    let activeIndex = 0;

    const normalized = config => {
      const values = (Array.isArray(config?.values) ? config.values : [])
        .filter(value => value?.status === 'active' && typeof value.label === 'string' && value.label.trim())
        .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
      if (!values.length || typeof config?.mission?.fixedLine !== 'string') return null;
      return {
        values,
        fixedLine: config.mission.fixedLine.trim(),
        displayMs: Math.max(1600, Number(config.rotation?.displayMs) || 3200),
        transitionMs: Math.max(0, Math.min(600, Number(config.rotation?.transitionMs) || 260)),
        headingLabel: config.accessibility?.headingLabel || `${values.map(value => value.label.toLowerCase()).join(', ')} renting.`,
      };
    };

    const render = config => {
      const data = normalized(config) || normalized(TENANT_HERO_FALLBACK);
      activeConfig = config;
      activeIndex = 0;
      window.clearInterval(rotationTimer);
      window.clearTimeout(transitionTimer);

      title.classList.add('offline-tenant-hero-title');
      title.setAttribute('aria-label', data.headingLabel);
      title.setAttribute('translate', 'no');
      title.innerHTML = `
        <span class="offline-tenant-hero-value-row" aria-hidden="true">
          <span class="offline-tenant-hero-value is-current"></span>
          <span class="offline-tenant-hero-value is-next"></span>
        </span>
        <span class="offline-tenant-hero-fixed-row" aria-hidden="true"></span>`;

      const valueRow = $('.offline-tenant-hero-value-row', title);
      let currentNode = $('.offline-tenant-hero-value.is-current', title);
      let nextNode = $('.offline-tenant-hero-value.is-next', title);
      const fixedNode = $('.offline-tenant-hero-fixed-row', title);
      currentNode.textContent = data.values[0].label;
      currentNode.dataset.valueId = data.values[0].id;
      fixedNode.textContent = data.fixedLine;
      title.dataset.activeTenantValue = data.values[0].id;
      title.style.setProperty('--offline-tenant-hero-transition', `${data.transitionMs}ms`);

      if (motionQuery.matches || data.values.length < 2) {
        title.dataset.rotation = 'static';
        return;
      }

      title.dataset.rotation = 'active';
      rotationTimer = window.setInterval(() => {
        const nextIndex = (activeIndex + 1) % data.values.length;
        nextNode.textContent = data.values[nextIndex].label;
        nextNode.dataset.valueId = data.values[nextIndex].id;
        valueRow.classList.add('is-transitioning');
        transitionTimer = window.setTimeout(() => {
          activeIndex = nextIndex;
          title.dataset.activeTenantValue = data.values[activeIndex].id;
          valueRow.classList.add('is-settling');
          currentNode.classList.replace('is-current', 'is-next');
          nextNode.classList.replace('is-next', 'is-current');
          [currentNode, nextNode] = [nextNode, currentNode];
          valueRow.classList.remove('is-transitioning');
          valueRow.getBoundingClientRect();
          valueRow.classList.remove('is-settling');
        }, data.transitionMs);
      }, data.displayMs);
    };

    const handleMotionChange = () => render(activeConfig);
    motionQuery.addEventListener?.('change', handleMotionChange);
    render(TENANT_HERO_FALLBACK);

    try {
      const response = await fetch('/data/tenant-hero.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`Tenant hero config HTTP ${response.status}`);
      const config = await response.json();
      if (!normalized(config)) throw new Error('Tenant hero config is invalid');
      title.dataset.configSource = 'local-json';
      render(config);
    } catch (error) {
      title.dataset.configSource = 'fallback';
      console.warn('Using tenant hero fallback:', error.message);
    }
  };

  const setupHeroLogoMarquee = async () => {
    const maxWidth = $('.wpt-ui-Scroller_MaxWidthContainer_m1y6csz6');
    if (!maxWidth || maxWidth.dataset.offlineMarqueeReady === 'true') return;
    let data;
    try {
      const response = await fetch('/data/operator-logos.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`Operator logo registry HTTP ${response.status}`);
      data = await response.json();
      if (!data.fictional || data.count !== 20 || !Array.isArray(data.logos) || data.logos.length !== 20) {
        throw new Error('Operator logo registry must contain 20 fictional brands');
      }
    } catch (error) {
      console.warn('Removing captured logo strip because the CasaPay operator registry could not load:', error.message);
      maxWidth.replaceChildren();
      maxWidth.dataset.offlineMarqueeReady = 'failed';
      maxWidth.closest('.wpt-ui-HeroIconScroller_ScrollerContainer_s14u0i8')?.classList.add('offline-logo-marquee-host', 'offline-logo-marquee-host--empty');
      setupHowItWorks();
      setupTenantProtectionPromo();
      return;
    }

    const logoItems = data.logos.map(logo => {
      const item = document.createElement('li');
      item.className = 'offline-operator-logo-item';
      item.dataset.operatorLogoId = logo.id;
      item.dataset.region = logo.region;
      item.dataset.segment = logo.segment;
      item.dataset.typeStyle = logo.typeStyle;
      item.style.setProperty('--offline-operator-logo-background', logo.background);
      item.style.setProperty('--offline-operator-logo-color', logo.color);
      item.style.setProperty('--offline-operator-logo-accent', logo.accent);
      const image = document.createElement('img');
      image.src = logo.symbolSrc;
      image.alt = '';
      image.width = 118;
      image.height = 118;
      image.loading = 'eager';
      image.draggable = false;
      image.setAttribute('aria-hidden', 'true');
      const name = document.createElement('span');
      name.className = 'offline-operator-logo-name';
      name.textContent = logo.name;
      item.append(image, name);
      return item;
    });

    const createGroup = duplicate => {
      const group = document.createElement('ul');
      group.className = 'offline-logo-marquee-group';
      group.dataset.duplicate = String(duplicate);
      group.setAttribute('aria-hidden', 'true');
      group.inert = true;
      logoItems.forEach(item => {
        const clone = item.cloneNode(true);
        $$('img', clone).forEach(image => {
          image.draggable = false;
          image.alt = '';
        });
        group.appendChild(clone);
      });
      return group;
    };

    const marquee = document.createElement('div');
    marquee.className = 'offline-logo-marquee';
    marquee.dataset.paused = 'false';
    marquee.dataset.logoSource = 'fictional-operator-registry';
    marquee.style.setProperty('--offline-marquee-duration', `${data.marqueeDurationSeconds}s`);
    const track = document.createElement('div');
    track.className = 'offline-logo-marquee-track';
    track.setAttribute('aria-hidden', 'true');
    track.append(createGroup(false), createGroup(true));
    const roster = document.createElement('ul');
    roster.className = 'offline-operator-logo-roster';
    roster.setAttribute('aria-label', 'Fictional rental operator concept roster');
    data.logos.forEach(logo => {
      const entry = document.createElement('li');
      entry.textContent = `${logo.name} — ${logo.segment} — ${logo.region}`;
      roster.appendChild(entry);
    });
    marquee.append(track, roster);
    maxWidth.replaceChildren(marquee);
    maxWidth.dataset.offlineMarqueeReady = 'true';
    maxWidth.closest('.wpt-ui-HeroIconScroller_ScrollerContainer_s14u0i8')?.classList.add('offline-logo-marquee-host');

    const root = maxWidth.closest('.wpt-ui-HeroIconScroller_Root_rjmtlw1');
    $('.wpt-ui-HeroIconScroller_UnderScroller_u1sbbp6m', root || document)?.remove();
    marquee.dataset.paused = String(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setupHowItWorks();
    setupTenantProtectionPromo();
  };

  const setupHowItWorks = () => {
    if ($('.tenant-how-it-works')) return;
    const marqueeHost = $('.offline-logo-marquee-host');
    if (!marqueeHost) return;
    const section = document.createElement('section');
    section.className = 'tenant-how-it-works';
    section.setAttribute('aria-labelledby', 'tenant-how-it-works-title');
    section.innerHTML = `
      <div class="tenant-how-it-works__inner">
        <h2 id="tenant-how-it-works-title">How it works</h2>
        <ol class="tenant-how-it-works__grid">
          <li class="tenant-how-it-works__card" style="--tenant-how-card-bg:#eef9fc">
            <a class="tenant-how-it-works__link" href="/tenant/en/est/tallinn">
              <figure class="tenant-how-it-works__media tenant-how-it-works__media--offers">
                <img src="/assets/how-it-works/tallinn-offers-page.jpg" alt="CasaPay rental offers and map for Tallinn" width="1280" height="720" loading="lazy" decoding="async">
              </figure>
              <span class="tenant-how-it-works__number" aria-hidden="true">1</span>
              <h3>Check verified partner offers</h3>
              <p>Browse homes from CasaPay partners and compare options that fit your city and needs.</p>
              <span class="tenant-how-it-works__action">Explore Tallinn offers</span>
            </a>
          </li>
          <li class="tenant-how-it-works__card" style="--tenant-how-card-bg:#f8f2fa">
            <a class="tenant-how-it-works__link" href="https://pertonliving.ee/en/" target="_blank" rel="noopener">
              <figure class="tenant-how-it-works__media tenant-how-it-works__media--partner">
                <img src="/assets/how-it-works/perton-booking-page.jpg" alt="A CasaPay partner page for choosing a home and rental dates" width="1280" height="720" loading="lazy" decoding="async">
              </figure>
              <span class="tenant-how-it-works__number" aria-hidden="true">2</span>
              <h3>Choose your home on the partner site</h3>
              <p>Select what you want to rent and when you want to move in, directly with the operator.</p>
              <span class="tenant-how-it-works__action">See a partner experience</span>
            </a>
          </li>
          <li class="tenant-how-it-works__card" style="--tenant-how-card-bg:#fff7df">
            <a class="tenant-how-it-works__link" href="/tenant/casapay-plus">
              <figure class="tenant-how-it-works__media tenant-how-it-works__media--move-in">
                <img src="/assets/generated/tenant-protection/casapay-tenant-move-in.png" alt="Tenants settling into their new home" width="1536" height="1024" loading="lazy" decoding="async">
              </figure>
              <span class="tenant-how-it-works__number" aria-hidden="true">3</span>
              <h3>Pay with CasaPay in seconds</h3>
              <p>Complete your payment and opt in to CasaPay+ where available to reduce eligible move-in costs.</p>
              <span class="tenant-how-it-works__action">Discover CasaPay+</span>
            </a>
          </li>
        </ol>
      </div>`;
    marqueeHost.insertAdjacentElement('afterend', section);
  };

  const setupTenantProtectionPromo = () => {
    if ($('.tenant-protection-promo')) return;
    const marqueeHost = $('.offline-logo-marquee-host');
    if (!marqueeHost) return;
    const section = document.createElement('section');
    section.className = 'tenant-protection-promo';
    section.setAttribute('aria-labelledby', 'tenant-protection-promo-title');
    section.innerHTML = `
      <div class="tenant-protection-promo__copy">
        <span class="tenant-protection-promo__eyebrow">CasaPay for tenants</span>
        <h2 id="tenant-protection-promo-title">Tenant Protection</h2>
        <ul class="tenant-protection-promo__list">
          <li><img src="/assets/icons/heroicons/check-circle.svg" alt="" aria-hidden="true" width="24" height="24"><div><strong>Protection when plans change</strong><p>Eligible workflows can help when a move-in changes. Availability and remedies depend on the rental terms.</p></div></li>
          <li><img src="/assets/icons/heroicons/check-circle.svg" alt="" aria-hidden="true" width="24" height="24"><div><strong>Quick support</strong><p>Rental and payment context stay connected so support can start with the information that matters.</p></div></li>
          <li><img src="/assets/icons/heroicons/check-circle.svg" alt="" aria-hidden="true" width="24" height="24"><div><strong>Move in with confidence</strong><p>Track the operator, amount, due date and payment status from RentLink to reconciliation.</p></div></li>
        </ul>
        <a class="tenant-protection-promo__action" href="/tenant/tenant-protection">CasaPay for Tenants</a>
        <p class="tenant-protection-promo__boundary">Protection and no-deposit options are subject to availability, eligibility and applicable terms.</p>
      </div>
      <figure class="tenant-protection-promo__media">
        <img src="/assets/generated/tenant-protection/casapay-tenant-move-in.png" alt="Two tenants unpacking together in a bright new apartment" width="1536" height="1024" loading="lazy" decoding="async">
      </figure>`;
    const howItWorks = $('.tenant-how-it-works');
    (howItWorks || marqueeHost).insertAdjacentElement('afterend', section);
  };

  const setupFooterControls = () => {
    const settings = $('.wpt-ui-Footer_Settings_sx6tisl');
    if (!settings || $('#offline-footer-popover')) return;

    let activeButton = null;
    const panel = createOfflineModal({
      id: 'offline-footer-popover',
      titleId: 'offline-modal-title',
    });

    const closePanel = (restoreFocus = false) => {
      panel.hidden = true;
      panel.inert = true;
      activeButton?.setAttribute('aria-expanded', 'false');
      if (restoreFocus) activeButton?.focus();
      activeButton = null;
    };

    const openPanel = (button, title, body) => {
      closePanel(false);
      activeButton = button;
      button.setAttribute('aria-expanded', 'true');
      panel.innerHTML = `
        <button class="offline-modal__close" type="button" aria-label="Close ${title}"></button>
        <h2 class="offline-modal__title" id="offline-modal-title">${title}</h2>
        ${body}`;
      panel.hidden = false;
      panel.inert = false;
      $('.offline-modal__close', panel)?.addEventListener('click', () => closePanel(true));
      $('[data-offline-select]', panel)?.addEventListener('click', () => closePanel(true));
      $('.offline-modal__close', panel)?.focus();
    };

    localStorage.removeItem('casapay-offline-theme');
    document.documentElement.setAttribute('data-al-theme', 'light');
    document.documentElement.setAttribute('data-cb-theme', 'light');

    [...settings.children].forEach(item => {
      const label = item.textContent.trim();
      if (/theme/i.test(label)) {
        item.remove();
        return;
      }
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'offline-footer-control';
      button.setAttribute('aria-expanded', 'false');
      while (item.firstChild) button.appendChild(item.firstChild);
      item.removeAttribute('role');
      item.removeAttribute('tabindex');
      item.appendChild(button);

      if (/country/i.test(label)) {
        button.setAttribute('aria-haspopup', 'dialog');
        button.setAttribute('aria-controls', panel.id);
        button.setAttribute('aria-label', 'Choose country, Estonia selected');
        button.addEventListener('click', () => openPanel(button, 'Choose country', `
          <div class="offline-country-list" role="listbox" aria-label="Countries">
            <button class="offline-footer-option offline-country-row" type="button" data-offline-select role="option" aria-selected="true">
              <span class="offline-country-row__name"><b aria-hidden="true">🇪🇪</b> Estonia</span><strong>Available offline</strong>
            </button>
            <div class="offline-country-row offline-country-row--soon" role="option" aria-disabled="true"><span class="offline-country-row__name"><b aria-hidden="true">🇫🇮</b> Finland</span><strong>Coming soon</strong></div>
            <div class="offline-country-row offline-country-row--soon" role="option" aria-disabled="true"><span class="offline-country-row__name"><b aria-hidden="true">🇱🇻</b> Latvia</span><strong>Coming soon</strong></div>
            <div class="offline-country-row offline-country-row--soon" role="option" aria-disabled="true"><span class="offline-country-row__name"><b aria-hidden="true">🇱🇹</b> Lithuania</span><strong>Coming soon</strong></div>
            <div class="offline-country-row offline-country-row--soon" role="option" aria-disabled="true"><span class="offline-country-row__name"><b aria-hidden="true">🇸🇪</b> Sweden</span><strong>Coming soon</strong></div>
            <div class="offline-country-row offline-country-row--soon" role="option" aria-disabled="true"><span class="offline-country-row__name"><b aria-hidden="true">🇩🇪</b> Germany</span><strong>Coming soon</strong></div>
            <div class="offline-country-row offline-country-row--soon" role="option" aria-disabled="true"><span class="offline-country-row__name"><b aria-hidden="true">🇵🇱</b> Poland</span><strong>Coming soon</strong></div>
            <div class="offline-country-row offline-country-row--soon" role="option" aria-disabled="true"><span class="offline-country-row__name"><b aria-hidden="true">🇬🇧</b> United Kingdom</span><strong>Coming soon</strong></div>
            <div class="offline-country-row offline-country-row--soon" role="option" aria-disabled="true"><span class="offline-country-row__name"><b aria-hidden="true">🇺🇸</b> United States</span><strong>Coming soon</strong></div>
            <div class="offline-country-row offline-country-row--soon" role="option" aria-disabled="true"><span class="offline-country-row__name"><b aria-hidden="true">🇨🇦</b> Canada</span><strong>Coming soon</strong></div>
          </div>
          <p>Only Estonia is bundled in this offline demo. No internet request is made.</p>`));
      } else if (/english|language/i.test(label)) {
        button.setAttribute('aria-haspopup', 'dialog');
        button.setAttribute('aria-controls', panel.id);
        button.setAttribute('aria-label', 'Choose language, English selected');
        button.addEventListener('click', () => openPanel(button, 'Choose language', `
          <button class="offline-footer-option" type="button" data-offline-select aria-current="true">
            <span>English</span><strong>Available offline</strong>
          </button>
          <p>This demo includes English content only. No internet request is made.</p>`));
      } else if (/cookies/i.test(label)) {
        button.setAttribute('aria-haspopup', 'dialog');
        button.setAttribute('aria-controls', panel.id);
        button.setAttribute('aria-label', 'Cookie information');
        button.addEventListener('click', () => openPanel(button, 'Cookies', `
          <div class="offline-footer-status"><strong>No tracking</strong><span>Local preferences</span></div>
          <p>This static demo makes no analytics or advertising requests and does not store a theme preference.</p>`));
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !panel.hidden) closePanel(true);
    });
    document.addEventListener('click', event => {
      if (!panel.hidden && !panel.contains(event.target) && !event.target.closest('.offline-footer-control')) closePanel(false);
    });
  };

  const improveAccessibility = () => {
    const logo = $('header a[href="/tenant"], header a[href="/en/discovery"], header a[href="/"]');
    if (logo && !logo.getAttribute('aria-label')) logo.setAttribute('aria-label', 'Tenant home');
    $$('a.leaflet-control-zoom-in, a.leaflet-control-zoom-out').forEach(control => {
      control.removeAttribute('href');
      control.setAttribute('role', 'button');
      control.tabIndex = 0;
      control.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        control.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      });
    });
    $$('a').forEach(link => {
      if (!link.getAttribute('aria-label') && !link.textContent.trim() && link.querySelector('svg')) {
        const title = link.getAttribute('title');
        if (title) link.setAttribute('aria-label', title);
      }
      if (!link.getAttribute('aria-label') && !link.textContent.trim()) {
        const imageAlt = link.querySelector('img[alt]')?.getAttribute('alt')?.trim();
        const cardTitle = link.closest('article,section,[class*="Card"]')?.querySelector('h2,h3,h4')?.textContent?.trim();
        link.setAttribute('aria-label', imageAlt || cardTitle || 'Open linked page');
      }
      if (link.getAttribute('role') === 'menuitem' && !link.closest('[role="menu"], [role="menubar"]')) link.removeAttribute('role');
    });
    $$('.wpt-ui-Footer_Settings_sx6tisl > [role="button"]').forEach(node => {
      node.setAttribute('role', 'listitem');
      node.removeAttribute('tabindex');
    });
    $$('[class*="Carousel__Track"]').forEach(node => {
      if (!node.hasAttribute('tabindex')) node.tabIndex = 0;
      if (!node.getAttribute('aria-label')) node.setAttribute('aria-label', 'Scrollable content');
    });
    $$('a').forEach(link => {
      if (!(link.getAttribute('aria-label') || link.textContent || '').trim()) link.setAttribute('aria-label', 'Open CasaPay content');
      if (link.getAttribute('href') === '#offline-external' && !link.getAttribute('aria-label')) {
        const label = link.textContent.trim() || 'External content';
        link.setAttribute('aria-label', `${label} (coming soon)`);
      }
    });
    $$('[aria-hidden="true"]').forEach(node => {
      if (node.querySelector('a,button,input,[tabindex]')) node.inert = true;
    });
  };

  const removeTenantPlatformPromotion = () => {
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    if (path !== '/' && path !== '/tenant') return;

    const platformHeading = $$('h1,h2,h3,h4').find(heading =>
      heading.textContent.replace(/\s+/g, ' ').trim().toLowerCase() === 'embed rent payments in your platform'
    );
    platformHeading?.closest('section')?.remove();
  };

  const setupPlatformPartnerSurfaces = () => {
    $$('a[href="/partner/platforms"], a[data-offline-external*="/couriers"]')
      .forEach(link => {
        link.href = '/partner/platforms';
        link.removeAttribute('target');
        link.removeAttribute('rel');
        link.removeAttribute('data-offline-external');
        if (link.querySelector('img')) {
          link.classList.add('offline-platform-partner-link');
          link.setAttribute('aria-label', 'Explore RentLink for platform partners');
          $$('img', link).forEach(image => {
            const cleanImage = document.createElement('img');
            cleanImage.className = image.className;
            cleanImage.src = '/assets/generated/platform-partner-photo/openai-gpt-image-2/platform-partner-human-life-landscape.png';
            cleanImage.alt = '';
            cleanImage.width = 1536;
            cleanImage.height = 1024;
            cleanImage.loading = image.loading || 'lazy';
            cleanImage.decoding = 'async';
            cleanImage.setAttribute('aria-hidden', 'true');
            cleanImage.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;color:transparent';
            image.parentElement?.replaceChildren(cleanImage);
          });
        }
      });
  };

  const setupOperatorSurfaces = () => {
    $$('a[data-offline-external*="partners.casapay.com"], a[href*="partners.casapay.com"]')
      .forEach(link => {
        const card = link.closest('.wpt-ui-PhotoCard_Root_rz6fyam');
        link.href = '/partner/operator';
        link.removeAttribute('target');
        link.removeAttribute('rel');
        link.removeAttribute('data-offline-external');
        link.classList.add('offline-operator-partner-link');
        link.setAttribute('aria-label', 'Explore CasaPay for rental operators');
        if (!card || card.dataset.offlineOperatorReady === 'true') return;
        card.dataset.offlineOperatorReady = 'true';
        const image = $('img', card);
        if (!image) return;
        const cleanImage = document.createElement('img');
        cleanImage.className = image.className;
        cleanImage.src = '/assets/generated/platform-partner-photo/openai-gpt-image-2/audiences/pms-platform.png';
        cleanImage.alt = '';
        cleanImage.width = 1536;
        cleanImage.height = 1024;
        cleanImage.loading = image.loading || 'lazy';
        cleanImage.decoding = 'async';
        cleanImage.setAttribute('aria-hidden', 'true');
        cleanImage.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;color:transparent';
        image.parentElement?.replaceChildren(cleanImage);
      });
  };

  const setupCasaPayPlusSurface = () => {
    const heading = $$('h1,h2,h3,h4').find(node => node.textContent.replace(/\s+/g, ' ').trim() === '0 € rental fees with CasaPay+');
    if (!heading) return;
    heading.textContent = '0 € no-deposit with CasaPay+';
    const card = heading.closest('.wpt-ui-PhotoCard_Root_rz6fyam') || heading.parentElement;
    const description = card && $('p', card);
    if (description) description.textContent = 'Choose a no-deposit option for eligible homes and keep more money available when you move.';
    const legacyBadge = card && $('img[src*="CasaPay__pill_logo"]', card);
    if (legacyBadge) {
      const badge = document.createElement('span');
      badge.className = 'offline-casapay-plus-badge';
      badge.textContent = 'CasaPay+';
      badge.setAttribute('aria-label', 'CasaPay+');
      badge.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:9px 16px;border:2px solid #fff;border-radius:999px;background:#006d99;color:#fff;box-shadow:0 2px 8px rgba(0,0,0,.18);font-size:18px;font-weight:850;line-height:1;letter-spacing:-.02em';
      legacyBadge.parentElement?.replaceWith(badge);
    }
  };

  const adaptHomepageCards = () => {
    $$('img[src*="CasaPayMarket.png"], img[src*="CasaPayForWork.png"]')
      .forEach(image => image.closest('[class*="BottomCornerLabelElement"]')?.remove());

    $$('h1,h2,h3,h4').forEach(heading => {
      const text = heading.textContent.replace(/\s+/g, ' ').trim();
      if (text === 'Delivering happiness to your workplace') heading.textContent = 'Rent support that stays connected';
    });

    $$('a').forEach(link => {
      const text = link.textContent.replace(/\s+/g, ' ').trim();
      if (text === 'Check out CasaPay Market') link.textContent = 'Explore tenant rent payments';
      if (text === 'Check out CasaPay for Work') link.textContent = 'Explore CasaPay tenant support';
    });
  };

  const removeBrokenLinks = () => {
    const operatorExperience = window.location.pathname.startsWith('/partner');
    const plusDestination = operatorExperience ? '/partner/operator/casapay-plus' : '/tenant/casapay-plus';
    const destinations = [
      [/free month of casapay\+|^casapay\+$/i, plusDestination],
      [/tenant rent payments/i, '/tenant/offers'],
    ];

    const removeLink = link => {
      const listItem = link.closest('li');
      if (listItem) {
        listItem.remove();
        return;
      }

      const replacement = document.createElement('span');
      replacement.className = link.className;
      replacement.append(...link.childNodes);
      link.replaceWith(replacement);
    };

    $$('a[data-disabled-link], a[href="#offline-external"], a[href="#offline-coming-soon"]').forEach(link => {
      const currentHref = link.getAttribute('href');
      if (currentHref && !currentHref.startsWith('#offline-')) {
        link.removeAttribute('data-disabled-link');
        return;
      }

      const label = link.textContent.replace(/\s+/g, ' ').trim();
      const destination = destinations.find(([pattern]) => pattern.test(label))?.[1];
      if (destination) {
        link.href = destination;
        link.removeAttribute('data-disabled-link');
        link.removeAttribute('data-offline-external');
        link.removeAttribute('target');
        link.removeAttribute('rel');
        return;
      }

      removeLink(link);
    });

    $$('a[href^="/"]').forEach(link => {
      const url = new URL(link.getAttribute('href'), window.location.origin);
      const canonicalPath = canonicalPathFor(url.pathname);
      if (canonicalPath !== url.pathname) {
        url.pathname = canonicalPath;
        link.href = `${url.pathname}${url.search}${url.hash}`;
      }
      if (!VALID_LOCAL_PATHS.has(canonicalPath)) removeLink(link);
    });
  };

  const setup = async () => {
    setupConsumerNavigation();
    setupTenantBrand();
    setupTenantFooterBrand();
    setupNativeAppStoreLinks();
    setupTenantFooterNavigation();
    setupAddressPicker();
    setupDiscoveryCategoryStrip();
    setupCityRentals();
    setupTenantHeroNarrative();
    await setupHeroLogoMarquee();
    setupCityExplorer();
    setupFooterControls();
    removeTenantPlatformPromotion();
    setupPlatformPartnerSurfaces();
    setupOperatorSurfaces();
    setupCasaPayPlusSurface();
    adaptHomepageCards();
    removeBrokenLinks();
    improveAccessibility();
    requestAnimationFrame(() => requestAnimationFrame(() => {
      $('#offline-boot-shell')?.remove();
      document.documentElement.removeAttribute('aria-busy');
    }));
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, { once: true });
  else setup();
})();
