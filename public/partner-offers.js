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
        <span class="operator-offers__eyebrow">Why CasaPay Offers?</span>
        <h2>More occupancy. Still your relationship.</h2>
        <p>Reach CasaPay members while they are actively choosing where to live, then bring them into the direct journey you already own.</p>
      </div>
      <div class="operator-offers__value-grid">
        <article><span>01</span><h3>Boost occupancy without extra cost</h3><p>Put available homes in front of relevant tenant demand without adding another paid acquisition channel.</p></article>
        <article><span>02</span><h3>Keep your own direct channel</h3><p>CasaPay introduces the tenant, then sends them to your website to choose, book and build a direct relationship with you.</p></article>
        <article><span>03</span><h3>Convert high-intent demand</h3><p>Meet members at the moment they are comparing cities, homes and move-in options—not months before they are ready.</p></article>
      </div>
    </section>

    <section class="operator-offers__manifesto">
      <div>
        <span class="operator-offers__eyebrow">The CasaPay advantage</span>
        <h2>Our members are your tenants.</h2>
      </div>
      <p>CasaPay already supports people through rent payments and the moments around a move. Offers turns that trusted member relationship into an operator discovery channel—without turning personal data into a commodity.</p>
    </section>

    <section class="operator-offers__section operator-offers__requirements">
      <div class="operator-offers__section-heading operator-offers__section-heading--left">
        <span class="operator-offers__eyebrow">Operator requirements</span>
        <h2>Built for professional rental operators.</h2>
        <p>CasaPay Offers is designed for professionally managed buildings and a customer journey that can move from interest to action online.</p>
      </div>
      <div class="operator-offers__requirements-grid">
        <article>
          <span class="operator-offers__requirement-icon" aria-hidden="true">25+</span>
          <div><h3>At least 25 units per building</h3><p>We are building for professional operators with managed inventory—not individual, single-unit landlords.</p></div>
        </article>
        <article>
          <span class="operator-offers__requirement-icon" aria-hidden="true">↗</span>
          <div><h3>An online customer journey</h3><p>Your website should let tenants explore availability and take the next step online. A hybrid online-and-human journey is also welcome.</p></div>
        </article>
      </div>
    </section>

    <section class="operator-offers__enablement">
      <div class="operator-offers__enablement-copy">
        <span class="operator-offers__eyebrow">Need the digital layer?</span>
        <h2>Our integration partners can help.</h2>
        <p>Don’t have an operator website or connected property stack yet? Explore specialists that can help create the tenant-facing journey or connect it to your PMS.</p>
        <small>Illustrative partner directory for the prelive experience.</small>
      </div>
      <div class="operator-offers__partner-groups">
        <section aria-labelledby="offers-web-partners">
          <h3 id="offers-web-partners"><span>01</span> Websites &amp; booking</h3>
          <ul><li><strong>LeaseCanvas</strong><small>Operator websites</small></li><li><strong>Homeflow Studio</strong><small>Availability and booking</small></li><li><strong>Stayfront</strong><small>Resident conversion</small></li></ul>
        </section>
        <section aria-labelledby="offers-pms-partners">
          <h3 id="offers-pms-partners"><span>02</span> Property management</h3>
          <ul><li><strong>UnitStack</strong><small>Rental PMS</small></li><li><strong>Keyline</strong><small>Inventory operations</small></li><li><strong>ResidentOS</strong><small>Resident lifecycle</small></li></ul>
        </section>
      </div>
    </section>

    <section class="operator-offers__showcase">
      <div class="operator-offers__showcase-media">
        <div class="operator-offers__browser-bar" aria-hidden="true"><i></i><i></i><i></i><span>pertonliving.ee</span></div>
        <img src="/assets/how-it-works/perton-booking-page.jpg" alt="Perton Living online room search and booking journey" width="1600" height="1000">
      </div>
      <div class="operator-offers__showcase-copy">
        <img class="operator-offers__showcase-logo" src="/assets/tallinn-rentals/logos/perton-living.svg" alt="Perton Living" width="220" height="72">
        <span class="operator-offers__eyebrow">Direct journey showcase</span>
        <h2>A move-in path designed to take five minutes.</h2>
        <p>Perton Living shows what a modern operator journey can feel like: choose the city and dates, compare room types, book online and continue directly with the operator.</p>
        <ol><li><span>1</span>Choose dates</li><li><span>2</span>Select a home</li><li><span>3</span>Book online</li></ol>
        <a class="operator-offers__text-link" href="https://pertonliving.ee/en" target="_blank" rel="noopener">Explore Perton Living <span aria-hidden="true">↗</span></a>
        <small>Journey time depends on the operator’s checks, availability and applicant details.</small>
      </div>
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
