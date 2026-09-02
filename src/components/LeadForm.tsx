"use client";

import { FormEvent, useState } from "react";

export function LeadForm({ audience = "operator", title = "Tell us about your rental workflow." }: { audience?: string; title?: string }) {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSent(true);
  };

  if (sent) return <div className="success-panel" role="status" tabIndex={-1}>Thanks—your details were validated locally for this private demonstration. Nothing was sent or saved.</div>;
  return (
    <form className="form-card" onSubmit={submit}>
      <span className="eyebrow">Request a conversation</span>
      <h2 style={{ font: "760 clamp(36px,5vw,54px)/1 var(--display)", margin: "12px 0 28px" }}>{title}</h2>
      <div className="form-grid">
        <div className="field"><label htmlFor={`${audience}-name`}>Name</label><input id={`${audience}-name`} required autoComplete="name" /></div>
        <div className="field"><label htmlFor={`${audience}-email`}>Work email</label><input id={`${audience}-email`} type="email" required autoComplete="email" /></div>
        <div className="field full"><label htmlFor={`${audience}-company`}>Company or organisation</label><input id={`${audience}-company`} required autoComplete="organization" /></div>
        <div className="field full"><label htmlFor={`${audience}-context`}>What would you like to solve?</label><textarea id={`${audience}-context`} required /></div>
      </div>
      <button className="button primary" type="submit">Continue</button>
      <p className="form-note">Availability, onboarding and product terms may vary. This private demo does not transmit or store form data.</p>
    </form>
  );
}
