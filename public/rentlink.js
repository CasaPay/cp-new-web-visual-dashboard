(() => {
  const form = document.querySelector('#rentlink-form');
  if (!form || form.dataset.ready === 'true') return;
  form.dataset.ready = 'true';

  const fields = [
    { id: 'rentlink-business', message: 'Enter the business name.' },
    { id: 'rentlink-email', message: 'Enter a valid work email.' },
    { id: 'rentlink-path', message: 'Choose a preferred creation path.', radio: true },
    { id: 'rentlink-consent', message: 'Confirm that CasaPay may contact you.' },
  ];
  const status = document.querySelector('#rentlink-form-status');

  const validate = field => {
    if (field.radio) {
      const controls = [...form.querySelectorAll('input[name="creationPath"]')];
      const error = document.querySelector('#rentlink-path-error');
      const valid = controls.some(control => control.checked);
      controls.forEach(control => {
        control.setAttribute('aria-invalid', String(!valid));
        control.setAttribute('aria-describedby', error.id);
      });
      error.textContent = valid ? '' : field.message;
      return valid;
    }
    const control = document.getElementById(field.id);
    const error = document.getElementById(`${field.id}-error`);
    const valid = control.checkValidity();
    control.setAttribute('aria-invalid', String(!valid));
    control.setAttribute('aria-describedby', error.id);
    error.textContent = valid ? '' : field.message;
    return valid;
  };

  fields.forEach(field => {
    if (field.radio) {
      form.querySelectorAll('input[name="creationPath"]').forEach(control => control.addEventListener('change', () => validate(field)));
      return;
    }
    const control = document.getElementById(field.id);
    control.addEventListener(control.type === 'checkbox' ? 'change' : 'input', () => validate(field));
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    status.hidden = true;
    const validity = fields.map(validate);
    if (validity.some(valid => !valid)) {
      const invalidField = fields[validity.indexOf(false)];
      const target = invalidField.radio
        ? form.querySelector('input[name="creationPath"]')
        : document.getElementById(invalidField.id);
      target.focus();
      return;
    }
    status.innerHTML = '<strong>Local RentLink request prepared.</strong><br>No information was sent or saved. A production version requires a consented first-party submission flow before promising follow-up or access.';
    status.hidden = false;
    status.focus();
  });
})();
