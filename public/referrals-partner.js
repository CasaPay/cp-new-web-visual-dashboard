(() => {
  const form = document.querySelector('#referral-form');
  if (!form || form.dataset.ready === 'true') return;
  form.dataset.ready = 'true';

  const fields = [
    { id: 'referral-business', message: 'Enter the business name.' },
    { id: 'referral-email', message: 'Enter a valid work email.' },
    { id: 'referral-operator-type', message: 'Choose the operator type.' },
    { id: 'referral-channel', message: 'Choose the primary tenant channel.' },
    { id: 'referral-volume', message: 'Choose an approximate introduction range.' },
    { id: 'referral-context', message: 'Briefly describe how you would introduce CasaPay.' },
    { id: 'referral-acknowledgement', message: 'Confirm that you understand the programme boundary.' },
  ];
  const status = document.querySelector('#referral-form-status');

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
    const eventName = control.type === 'checkbox' || control.tagName === 'SELECT' ? 'change' : 'input';
    control.addEventListener(eventName, () => validate(field));
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    status.hidden = true;
    const validity = fields.map(validate);
    if (validity.some(valid => !valid)) {
      document.getElementById(fields[validity.indexOf(false)].id).focus();
      return;
    }
    status.innerHTML = '<strong>Local application prepared.</strong><br>No information was sent or saved. A production programme requires approved commercial terms, consented first-party submission and verified attribution before promising follow-up or rewards.';
    status.hidden = false;
    status.focus();
  });
})();
