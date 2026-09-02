"use client";

import { useState } from "react";

export function EarningsCalculator() {
  const [operators, setOperators] = useState(10);
  const total = operators * 250;
  return (
    <div className="earnings-card">
      <span className="eyebrow">Operator activations</span>
      <output htmlFor="operator-slider" style={{ display: "block", font: "760 54px/1 var(--display)", margin: "12px 0 24px" }}>{operators}</output>
      <input id="operator-slider" type="range" min="1" max="50" value={operators} onChange={(event) => setOperators(Number(event.target.value))} aria-label="Number of operators integrated with RentLink" />
      <span className="earnings-total">€{total.toLocaleString("en")}</span>
      <strong>Total possible earnings</strong>
      <p className="form-note">€250 × {operators} operator activations. Payout terms are defined in the applicable Platform Partner agreement.</p>
    </div>
  );
}
