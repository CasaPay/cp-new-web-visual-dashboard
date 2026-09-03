(() => {
  const main = document.querySelector('main');
  if (!main) return;

  main.className = 'tenant-plus';
  main.innerHTML = `
    <section class="tenant-plus__hero">
      <div class="tenant-plus__hero-copy">
        <span class="tenant-plus__eyebrow">CasaPay+ for tenants</span>
        <h1>Move in.<br><em>Keep more.</em></h1>
        <p>CasaPay+ gives eligible tenants a no-deposit route and clearer support through the moments that make moving expensive.</p>
        <div class="tenant-plus__actions">
          <a class="tenant-plus__button tenant-plus__button--primary" href="#check-eligibility">Check eligibility</a>
          <a class="tenant-plus__button tenant-plus__button--secondary" href="#how-plus-works">How CasaPay+ works</a>
        </div>
      </div>
      <div class="tenant-plus__portrait">
        <div class="tenant-plus__halo" aria-hidden="true"></div>
        <figure>
          <img src="/assets/generated/tenant-protection/casapay-tenant-move-in.png" alt="Two tenants settling into their new apartment" width="1536" height="1024">
        </figure>
        <div class="tenant-plus__benefit tenant-plus__benefit--deposit"><small>Eligible homes</small><strong>€0 deposit</strong></div>
        <div class="tenant-plus__benefit tenant-plus__benefit--support"><span aria-hidden="true">✓</span><strong>Tenant support</strong></div>
      </div>
    </section>

    <section class="tenant-plus__ticker" aria-label="CasaPay Plus tenant benefits">
      <span>No-deposit options</span><i></i><span>Clear eligibility</span><i></i><span>Move-in support</span><i></i><span>Member benefits</span>
    </section>

    <section class="tenant-plus__section">
      <div class="tenant-plus__heading">
        <span class="tenant-plus__eyebrow">More room to move</span>
        <h2>Your new home should not freeze your finances.</h2>
        <p>CasaPay+ helps eligible members keep money available for the life that starts after the keys arrive.</p>
      </div>
      <div class="tenant-plus__cards">
        <article><span>01</span><h3>Keep cash available</h3><p>An eligible no-deposit option can reduce the amount locked away at move-in.</p></article>
        <article><span>02</span><h3>Know what applies</h3><p>See the property, payment expectations and applicable eligibility before choosing.</p></article>
        <article><span>03</span><h3>Stay supported</h3><p>Keep rental and payment context connected when you need help with the journey.</p></article>
      </div>
    </section>

    <section class="tenant-plus__statement">
      <div class="tenant-plus__statement-mark" aria-hidden="true">+</div>
      <div>
        <span class="tenant-plus__eyebrow">Made for real moves</span>
        <h2>A deposit should not put life on pause.</h2>
      </div>
      <p>Moving already comes with furniture, travel, utilities and everyday costs. Where an approved CasaPay+ option is available, more of your money can stay with you.</p>
    </section>

    <section class="tenant-plus__section" id="how-plus-works">
      <div class="tenant-plus__heading tenant-plus__heading--left">
        <span class="tenant-plus__eyebrow">How CasaPay+ works</span>
        <h2>Clear steps before you commit.</h2>
      </div>
      <ol class="tenant-plus__steps">
        <li><span>1</span><div><h3>Find an eligible home</h3><p>Look for CasaPay+ availability while exploring participating rental homes.</p></div></li>
        <li><span>2</span><div><h3>Review your option</h3><p>Check eligibility, costs, responsibilities and applicable terms before proceeding.</p></div></li>
        <li><span>3</span><div><h3>Choose with confidence</h3><p>Accept the option only if it fits your move and you understand what applies.</p></div></li>
        <li><span>4</span><div><h3>Move with more flexibility</h3><p>Keep the rental and payment journey visible in one connected experience.</p></div></li>
      </ol>
    </section>

    <section class="tenant-plus__membership">
      <div class="tenant-plus__membership-copy">
        <span class="tenant-plus__eyebrow">Your tenant membership</span>
        <h2>Useful before, during and after the move.</h2>
        <p>CasaPay+ brings eligible rental options, tenant-first information and member benefits into the same journey.</p>
      </div>
      <ul>
        <li><span>+</span><div><strong>No-deposit availability</strong><small>Where the home, tenant and operator setup qualify.</small></div></li>
        <li><span>+</span><div><strong>Rental context that stays connected</strong><small>Keep the home, operator and payment journey easier to understand.</small></div></li>
        <li><span>+</span><div><strong>Member offers</strong><small>Discover relevant offers made available to participating CasaPay members.</small></div></li>
      </ul>
    </section>

    <section class="tenant-plus__cta" id="check-eligibility">
      <div>
        <span class="tenant-plus__eyebrow">CasaPay+ eligibility</span>
        <h2>Ready for a lighter move-in?</h2>
        <p>Sign in to explore available homes and see whether a CasaPay+ option is available for your rental journey.</p>
      </div>
      <a class="tenant-plus__button tenant-plus__button--light" href="https://tnt.test.casapay.com/">Explore CasaPay+ <span aria-hidden="true">↗</span></a>
      <p class="tenant-plus__boundary">No-deposit and member benefits are subject to availability, eligibility, operator participation, jurisdiction and applicable terms. CasaPay+ does not guarantee approval or availability for every home.</p>
    </section>`;

  document.querySelectorAll('a[href="#check-eligibility"], a[href="#how-plus-works"]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  });
})();
