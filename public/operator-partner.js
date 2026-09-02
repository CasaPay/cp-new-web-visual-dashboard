(() => {
  const form = document.querySelector('#operator-signup-form');
  if (!form || form.dataset.ready === 'true') return;
  form.dataset.ready = 'true';

  const COUNTRIES = Object.freeze(["Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bonaire, Sint Eustatius and Saba","Bosnia and Herzegovina","Botswana","Bouvet Island","Brazil","British Indian Ocean Territory","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands","Colombia","Comoros","Congo","Cook Islands","Costa Rica","Croatia","Cuba","Curaçao","Cyprus","Czechia","Côte d'Ivoire","Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Falkland Islands (Malvinas)","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","French Southern Territories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Heard Island and McDonald Islands","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macao","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","North Korea","North Macedonia","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Romania","Russia","Rwanda","Réunion","Saint Barthélemy","Saint Helena, Ascension and Tristan da Cunha","Saint Kitts and Nevis","Saint Lucia","Saint Martin (French part)","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Sint Maarten (Dutch part)","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the South Sandwich Islands","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Svalbard and Jan Mayen","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkmenistan","Turks and Caicos Islands","Tuvalu","Türkiye","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands, British","Virgin Islands, U.S.","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe","Åland Islands"]);
  const COUNTRY_SET = new Set(COUNTRIES);
  const CUSTOM_SELECTS = Object.freeze([
    Object.freeze({
      id: 'operator-type',
      options: Object.freeze(['Letting agent', 'Property manager', 'BTR operator', 'PBSA operator', 'Co-living operator', 'Institutional landlord', 'Other rental operator']),
    }),
    Object.freeze({
      id: 'operator-portfolio',
      options: Object.freeze(['1–50 units', '51–250 units', '251–1,000 units', '1,001+ units', 'Not sure yet']),
    }),
  ]);
  const countryRoot = document.querySelector('[data-country-combobox]');
  const countryInput = document.querySelector('#operator-country');
  const countryList = document.querySelector('#operator-country-list');
  const countryToggle = document.querySelector('.operator-country-combobox__toggle');
  countryRoot.dataset.countryCount = String(COUNTRIES.length);

  const fields = [
    { id: 'operator-first-name', message: 'Enter your first name.' },
    { id: 'operator-last-name', message: 'Enter your last name.' },
    { id: 'operator-email', message: 'Enter a valid work email.', valid: input => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()) },
    { id: 'operator-mobile', message: 'Enter your mobile number.' },
    { id: 'operator-company', message: 'Enter your company name.' },
    { id: 'operator-country', message: 'Choose a country from the list.', valid: input => COUNTRY_SET.has(input.value.trim()) },
    { id: 'operator-type', message: 'Choose an operator type.' },
    { id: 'operator-portfolio', message: 'Choose a portfolio size.' },
    { id: 'operator-consent', message: 'Confirm that CasaPay may contact you.' },
  ];

  const setError = (input, message = '') => {
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    const error = document.querySelector(`#${input.id}-error`);
    if (error) error.textContent = message;
  };

  const isValid = field => {
    const input = document.querySelector(`#${field.id}`);
    const present = input.type === 'checkbox' ? input.checked : Boolean(input.value.trim());
    const valid = present && (!field.valid || field.valid(input));
    setError(input, valid ? '' : field.message);
    return valid;
  };

  let filteredCountries = COUNTRIES;
  let activeCountryIndex = -1;
  const customSelectControllers = [];

  const positionChoiceList = (control, list) => {
    const rect = control.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const preferredHeight = Number(list.dataset.maxHeight || 280);
    const openAbove = spaceBelow < Math.min(preferredHeight, 260) && spaceAbove > spaceBelow;
    const available = Math.max(160, Math.min(preferredHeight, (openAbove ? spaceAbove : spaceBelow) - 12));
    list.style.left = `${rect.left}px`;
    list.style.width = `${rect.width}px`;
    list.style.maxHeight = `${available}px`;
    if (openAbove) {
      list.style.top = 'auto';
      list.style.bottom = `${window.innerHeight - rect.top + 8}px`;
    } else {
      list.style.top = `${rect.bottom + 8}px`;
      list.style.bottom = 'auto';
    }
  };
  const positionCountryList = () => positionChoiceList(countryInput, countryList);

  const setCountryOpen = open => {
    countryList.hidden = !open;
    countryInput.setAttribute('aria-expanded', String(open));
    countryToggle.setAttribute('aria-expanded', String(open));
    countryToggle.setAttribute('aria-label', open ? 'Hide countries' : 'Show countries');
    if (open) positionCountryList();
    if (!open) {
      activeCountryIndex = -1;
      countryInput.removeAttribute('aria-activedescendant');
    }
  };

  const setActiveCountry = index => {
    const options = [...countryList.querySelectorAll('[role="option"]')];
    if (!options.length) return;
    activeCountryIndex = Math.max(0, Math.min(index, options.length - 1));
    options.forEach((option, optionIndex) => option.setAttribute('aria-selected', String(optionIndex === activeCountryIndex)));
    const active = options[activeCountryIndex];
    countryInput.setAttribute('aria-activedescendant', active.id);
    active.scrollIntoView({ block: 'nearest' });
  };

  const chooseCountry = country => {
    countryInput.value = country;
    setCountryOpen(false);
    const field = fields.find(item => item.id === 'operator-country');
    if (field) isValid(field);
    countryInput.focus();
  };

  const renderCountries = (query = '') => {
    customSelectControllers.forEach(controller => controller.close());
    const normalizedQuery = query.trim().toLocaleLowerCase();
    filteredCountries = normalizedQuery
      ? COUNTRIES.filter(country => country.toLocaleLowerCase().includes(normalizedQuery))
      : COUNTRIES;
    countryList.replaceChildren();
    if (!filteredCountries.length) {
      const empty = document.createElement('p');
      empty.className = 'operator-country-list__empty';
      empty.textContent = 'No countries found.';
      countryList.append(empty);
    } else {
      filteredCountries.forEach((country, index) => {
        const option = document.createElement('button');
        option.id = `operator-country-option-${index}`;
        option.className = 'operator-country-option';
        option.type = 'button';
        option.setAttribute('role', 'option');
        option.setAttribute('aria-selected', 'false');
        option.textContent = country;
        option.addEventListener('pointerdown', event => event.preventDefault());
        option.addEventListener('click', () => chooseCountry(country));
        countryList.append(option);
      });
    }
    activeCountryIndex = -1;
    countryInput.removeAttribute('aria-activedescendant');
    setCountryOpen(true);
  };

  countryInput.addEventListener('focus', () => renderCountries(countryInput.value));
  countryInput.addEventListener('input', () => renderCountries(countryInput.value));
  countryInput.addEventListener('keydown', event => {
    const options = countryList.querySelectorAll('[role="option"]');
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (countryList.hidden) renderCountries('');
      setActiveCountry(activeCountryIndex + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (countryList.hidden) renderCountries('');
      setActiveCountry(activeCountryIndex < 0 ? options.length - 1 : activeCountryIndex - 1);
    } else if (event.key === 'Enter' && activeCountryIndex >= 0) {
      event.preventDefault();
      chooseCountry(filteredCountries[activeCountryIndex]);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setCountryOpen(false);
    } else if (event.key === 'Tab') {
      setCountryOpen(false);
    }
  });
  countryToggle.addEventListener('click', () => {
    if (countryList.hidden) {
      countryInput.focus({ preventScroll: true });
      renderCountries('');
    } else {
      setCountryOpen(false);
      countryInput.focus({ preventScroll: true });
    }
  });
  document.addEventListener('pointerdown', event => {
    if (!countryRoot.contains(event.target)) setCountryOpen(false);
  });
  window.addEventListener('resize', () => {
    if (!countryList.hidden) positionCountryList();
  });
  window.addEventListener('scroll', event => {
    if (!countryList.hidden && event.target !== countryList) {
      window.requestAnimationFrame(() => {
        const rect = countryInput.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) setCountryOpen(false);
        else positionCountryList();
      });
    }
  }, true);

  const setupCustomSelect = config => {
    const root = document.querySelector(`[data-operator-select="${config.id}"]`);
    const trigger = document.querySelector(`#${config.id}`);
    const list = document.querySelector(`#${config.id}-list`);
    const hiddenInput = document.querySelector(`#${config.id}-value`);
    const valueNode = trigger.querySelector('.operator-custom-select__value');
    let activeIndex = -1;

    config.options.forEach((optionValue, index) => {
      const option = document.createElement('button');
      option.id = `${config.id}-option-${index}`;
      option.className = 'operator-country-option operator-custom-select__option';
      option.type = 'button';
      option.setAttribute('role', 'option');
      option.setAttribute('aria-selected', 'false');
      option.textContent = optionValue;
      option.addEventListener('pointerdown', event => event.preventDefault());
      option.addEventListener('click', () => choose(optionValue));
      list.append(option);
    });

    const setOpen = open => {
      list.hidden = !open;
      trigger.setAttribute('aria-expanded', String(open));
      if (open) positionChoiceList(trigger, list);
      if (!open) {
        activeIndex = -1;
        trigger.removeAttribute('aria-activedescendant');
      }
    };

    const setActive = index => {
      const options = [...list.querySelectorAll('[role="option"]')];
      activeIndex = Math.max(0, Math.min(index, options.length - 1));
      options.forEach((option, optionIndex) => option.setAttribute('aria-selected', String(optionIndex === activeIndex)));
      const active = options[activeIndex];
      trigger.setAttribute('aria-activedescendant', active.id);
      active.scrollIntoView({ block: 'nearest' });
    };

    function choose(optionValue) {
      trigger.value = optionValue;
      hiddenInput.value = optionValue;
      valueNode.textContent = optionValue;
      trigger.dataset.selected = 'true';
      [...list.querySelectorAll('[role="option"]')]
        .forEach(option => option.setAttribute('aria-selected', String(option.textContent === optionValue)));
      setOpen(false);
      const field = fields.find(item => item.id === config.id);
      if (field) isValid(field);
      trigger.focus();
    }

    const open = () => {
      setCountryOpen(false);
      customSelectControllers.forEach(controller => {
        if (controller.id !== config.id) controller.close();
      });
      setOpen(true);
      const selectedIndex = config.options.indexOf(trigger.value);
      if (selectedIndex >= 0) setActive(selectedIndex);
    };

    trigger.addEventListener('click', () => {
      if (list.hidden) open();
      else setOpen(false);
    });
    trigger.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (list.hidden) open();
        setActive(event.key === 'ArrowDown'
          ? activeIndex + 1
          : (activeIndex < 0 ? config.options.length - 1 : activeIndex - 1));
      } else if ((event.key === 'Enter' || event.key === ' ') && !list.hidden && activeIndex >= 0) {
        event.preventDefault();
        choose(config.options[activeIndex]);
      } else if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === 'Home' && !list.hidden) {
        event.preventDefault();
        setActive(0);
      } else if (event.key === 'End' && !list.hidden) {
        event.preventDefault();
        setActive(config.options.length - 1);
      } else if (event.key === 'Tab') {
        setOpen(false);
      }
    });
    document.addEventListener('pointerdown', event => {
      if (!root.contains(event.target)) setOpen(false);
    });
    window.addEventListener('resize', () => {
      if (!list.hidden) positionChoiceList(trigger, list);
    });
    window.addEventListener('scroll', event => {
      if (!list.hidden && event.target !== list) {
        window.requestAnimationFrame(() => {
          const rect = trigger.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > window.innerHeight) setOpen(false);
          else positionChoiceList(trigger, list);
        });
      }
    }, true);

    customSelectControllers.push({ id: config.id, close: () => setOpen(false) });
  };

  CUSTOM_SELECTS.forEach(setupCustomSelect);

  fields.forEach(field => {
    const input = document.querySelector(`#${field.id}`);
    input.addEventListener(input.tagName === 'SELECT' || input.type === 'checkbox' ? 'change' : 'input', () => {
      if (input.getAttribute('aria-invalid') === 'true') isValid(field);
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const results = fields.map(isValid);
    const firstInvalid = fields.find((_, index) => !results[index]);
    if (firstInvalid) {
      document.querySelector(`#${firstInvalid.id}`).focus();
      return;
    }

    const status = document.querySelector('#operator-signup-status');
    status.hidden = false;
    status.textContent = 'Request prepared. This private prototype does not send or store your information.';
    status.focus();
  });
})();
