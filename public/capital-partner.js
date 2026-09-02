(() => {
  const form = document.querySelector('#capital-form');
  if (!form || form.dataset.ready === 'true') return;
  form.dataset.ready = 'true';

  const fields = [
    { id: 'capital-business', message: 'Enter the business name.' },
    { id: 'capital-email', message: 'Enter a valid work email.' },
    { id: 'capital-need', message: 'Choose what the operation is planning.' },
    { id: 'capital-context', message: 'Briefly describe the need and timing.' },
    { id: 'capital-acknowledgement', message: 'Confirm that you understand the eligibility boundary.' },
  ];
  const status = document.querySelector('#capital-form-status');

  const validate = field => {
    const control = document.getElementById(field.id);
    const error = document.getElementById(`${field.id}-error`);
    const valid = control.checkValidity();
    control.setAttribute('aria-invalid', String(!valid));
    control.setAttribute('aria-describedby', error.id);
    error.textContent = valid ? '' : field.message;
    return valid;
  };

  fields.forEach(field => {
    const control = document.getElementById(field.id);
    control.addEventListener(control.type === 'checkbox' || control.tagName === 'SELECT' ? 'change' : 'input', () => validate(field));
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    status.hidden = true;
    const validity = fields.map(validate);
    if (validity.some(valid => !valid)) {
      document.getElementById(fields[validity.indexOf(false)].id).focus();
      return;
    }
    status.innerHTML = '<strong>Local enquiry prepared.</strong><br>No information was sent or saved. A production version would require a consented first-party submission flow before promising follow-up.';
    status.hidden = false;
    status.focus?.();
  });
})();
