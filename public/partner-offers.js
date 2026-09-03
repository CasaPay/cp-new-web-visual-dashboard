(() => {
  const main = document.querySelector('main');
  if (!main) return;

  main.className = 'operator-offers';
  main.innerHTML = `
    <section class="operator-offers__hero">
      <div class="operator-offers__hero-copy">
        <span class="operator-offers__eyebrow">CasaPay Offers</span>
        <h1><span>Our members.</span><span>Your tenants.</span></h1>
        <p>Put your properties and rental offers in front of CasaPay members when they are actively deciding where—and how—to live.</p>
        <div class="operator-offers__actions">
          <a class="operator-offers__button operator-offers__button--primary" href="#request-access">Request access</a>
          <a class="operator-offers__button operator-offers__button--secondary" href="#how-it-works">See how it works</a>
        </div>
      </div>
      <div class="operator-offers__network" aria-label="CasaPay connects members with rental operators">
        <div class="operator-offers__network-ring" aria-hidden="true"></div>
        <figure class="operator-offers__member-card">
          <img src="/assets/generated/tenant-protection/casapay-tenant-move-in.png" alt="Two CasaPay members moving into a bright apartment" width="1536" height="1024">
          <figcaption><strong>CasaPay members</strong><span>Searching, moving, renting</span></figcaption>
        </figure>
        <div class="operator-offers__signal operator-offers__signal--one"><span>01</span>Looking in Tallinn</div>
        <div class="operator-offers__signal operator-offers__signal--two"><span>02</span>Move-in ready</div>
        <div class="operator-offers__signal operator-offers__signal--three"><span>03</span>Interested in your offer</div>
      </div>
    </section>

    <section class="operator-offers__ribbon" aria-label="CasaPay Offers principles">
      <span>Rental intent</span><i></i><span>Member choice</span><i></i><span>Operator inventory</span><i></i><span>Consent-led introductions</span>
    </section>

    <section class="operator-offers__section operator-offers__intro">
      <div class="operator-offers__section-heading">
        <span class="operator-offers__eyebrow">A warmer route to demand</span>
        <h2>Meet tenants inside the rental journey.</h2>
        <p>CasaPay Offers helps operators become relevant before a member has chosen a home, not after the relationship has already started.</p>
      </div>
      <div class="operator-offers__value-grid">
        <article><span>01</span><h3>Show the right offer</h3><p>Publish eligible homes, incentives or move-in propositions with clear availability and terms.</p></article>
        <article><span>02</span><h3>Reach the right moment</h3><p>Appear to participating members exploring a city, comparing homes or preparing to move.</p></article>
        <article><span>03</span><h3>Receive chosen interest</h3><p>A member decides whether to enquire. The operator receives the introduction only after that choice.</p></article>
      </div>
    </section>

    <section class="operator-offers__manifesto">
      <div>
        <span class="operator-offers__eyebrow">The CasaPay advantage</span>
        <h2>Our members are your tenants.</h2>
      </div>
      <p>CasaPay already supports people through rent payments and the moments around a move. Offers turns that trusted member relationship into an operator discovery channel—without turning personal data into a commodity.</p>
    </section>

    <section class="operator-offers__section" id="how-it-works">
      <div class="operator-offers__section-heading operator-offers__section-heading--left">
        <span class="operator-offers__eyebrow">How it works</span>
        <h2>From inventory to an interested tenant.</h2>
      </div>
      <ol class="operator-offers__steps">
        <li><span>1</span><div><h3>Create an offer</h3><p>Define the home, audience, availability, value and applicable terms.</p></div></li>
        <li><span>2</span><div><h3>CasaPay presents it</h3><p>Eligible participating members see the offer in relevant rental moments.</p></div></li>
        <li><span>3</span><div><h3>The member opts in</h3><p>The tenant chooses whether to express interest or continue to your approved journey.</p></div></li>
        <li><span>4</span><div><h3>Your team follows up</h3><p>Receive the agreed lead context and continue the conversation in your workflow.</p></div></li>
      </ol>
    </section>

    <section class="operator-offers__audience">
      <div class="operator-offers__audience-copy">
        <span class="operator-offers__eyebrow">Built for rental operators</span>
        <h2>One channel. Many ways to rent.</h2>
        <p>CasaPay Offers can support operator-led acquisition across professionally managed rental categories.</p>
      </div>
      <div class="operator-offers__audience-tags" aria-label="Supported operator categories">
        <span>Build to rent</span><span>PBSA</span><span>Co-living</span><span>Property managers</span><span>Letting agents</span><span>Serviced apartments</span>
      </div>
    </section>

    <section class="operator-offers__request" id="request-access">
      <div class="operator-offers__request-copy">
        <span class="operator-offers__eyebrow">Early operator access</span>
        <h2>Bring your next tenant closer.</h2>
        <p>Join the CasaPay operator journey to discuss your market, inventory and the offers you want members to discover.</p>
      </div>
      <a class="operator-offers__button operator-offers__button--light" href="https://op.test.casapay.com/">Request CasaPay Offers access <span aria-hidden="true">↗</span></a>
      <p class="operator-offers__boundary">Participation, member reach, placement, lead criteria, attribution and availability depend on the approved operator setup and applicable terms.</p>
    </section>`;

  document.querySelectorAll('a[href="#request-access"], a[href="#how-it-works"]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  });
})();
