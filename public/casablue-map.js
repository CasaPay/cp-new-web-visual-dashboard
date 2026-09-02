(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('casablue-map') === 'off') {
    document.documentElement.dataset.casablueMap = 'off';
    return;
  }

  const stage = document.querySelector('.wpt-ui-HeroIconScroller_ColorContainer_c1xwo2kq');
  const content = document.querySelector('.wpt-ui-HeroIconScroller_ContentContainer_c1w5m0xo');
  if (!stage || !content || stage.querySelector('.offline-casablue-map')) return;

  const tones = [
    { top: '#8DD7EE', left: '#5BB5D4', right: '#A9E4F5', accent: '#007FAE' },
    { top: '#B7D8F0', left: '#82B8DA', right: '#D5EAF7', accent: '#006D99' },
    { top: '#C9C2EC', left: '#9E96CD', right: '#E3DFF7', accent: '#62589A' },
    { top: '#FFD0C4', left: '#E8A897', right: '#FFE6DF', accent: '#B75F4E' },
  ];

  const desktopBuildings = [
    { x: 64, y: 78, scale: 0.88, tone: 0, type: 'terrace', sequence: 0 },
    { x: 218, y: 332, scale: 0.78, tone: 2, type: 'house', sequence: 1 },
    { x: 404, y: 400, scale: 0.68, tone: 1, type: 'courtyard', sequence: 2 },
    { x: 892, y: 400, scale: 0.7, tone: 3, type: 'terrace', sequence: 3 },
    { x: 1080, y: 62, scale: 0.78, tone: 1, type: 'tower', sequence: 4 },
    { x: 1230, y: 284, scale: 0.82, tone: 0, type: 'courtyard', sequence: 5 },
    { x: 1350, y: 104, scale: 0.66, tone: 2, type: 'house', sequence: 6 },
  ];

  const tabletBuildings = [
    { x: 350, y: 86, scale: 0.72, tone: 0, type: 'terrace', sequence: 0 },
    { x: 442, y: 350, scale: 0.72, tone: 2, type: 'courtyard', sequence: 1 },
    { x: 900, y: 368, scale: 0.74, tone: 3, type: 'terrace', sequence: 2 },
    { x: 1040, y: 74, scale: 0.72, tone: 1, type: 'tower', sequence: 3 },
    { x: 1080, y: 270, scale: 0.66, tone: 0, type: 'house', sequence: 4 },
  ];

  const mobileBuildings = [
    { x: 426, y: 92, scale: 0.7, tone: 0, type: 'terrace', sequence: 0 },
    { x: 968, y: 96, scale: 0.62, tone: 2, type: 'tower', sequence: 1 },
    { x: 440, y: 296, scale: 0.72, tone: 1, type: 'courtyard', sequence: 2 },
  ];

  const buildingMarkup = (building, variant) => {
    const tone = tones[building.tone];
    const shells = {
      house: `
          <ellipse class="offline-map-building-shadow" cx="34" cy="77" rx="39" ry="12" />
          <path class="offline-map-building-left" d="M2 22 34 39 34 76 2 58Z" />
          <path class="offline-map-building-right" d="M66 22 34 39 34 76 66 58Z" />
          <path class="offline-map-building-top" d="M2 22 34 4 66 22 34 39Z" />
          <path class="offline-map-building-accent" d="M34 39 66 22 66 28 34 45Z" />
          <path class="offline-map-window" d="M9 35 18 40 18 50 9 45ZM22 43 29 47 29 57 22 53ZM41 45 49 41 49 51 41 55ZM53 38 60 34 60 44 53 48Z" />`,
      terrace: `
          <ellipse class="offline-map-building-shadow" cx="44" cy="70" rx="49" ry="12" />
          <path class="offline-map-building-left" d="M2 25 44 47 44 69 2 47Z" />
          <path class="offline-map-building-right" d="M86 25 44 47 44 69 86 47Z" />
          <path class="offline-map-building-top" d="M2 25 23 13 44 24 65 13 86 25 44 47Z" />
          <path class="offline-map-building-accent" d="M44 47 86 25 86 31 44 53Z" />
          <path class="offline-map-window" d="M8 39 17 44 17 52 8 47ZM22 46 31 51 31 59 22 54ZM53 45 62 40 62 48 53 53ZM68 37 78 32 78 41 68 46Z" />`,
      tower: `
          <ellipse class="offline-map-building-shadow" cx="30" cy="101" rx="35" ry="11" />
          <path class="offline-map-building-left" d="M6 20 30 33 30 98 6 85Z" />
          <path class="offline-map-building-right" d="M54 20 30 33 30 98 54 85Z" />
          <path class="offline-map-building-top" d="M6 20 30 7 54 20 30 33Z" />
          <path class="offline-map-building-accent" d="M30 33 54 20 54 28 30 41Z" />
          <path class="offline-map-window" d="M11 35 18 39 18 47 11 43ZM21 41 27 44 27 52 21 49ZM11 54 18 58 18 66 11 62ZM21 60 27 63 27 71 21 68ZM35 40 42 36 42 44 35 48ZM45 34 51 31 51 39 45 42ZM35 58 42 54 42 62 35 66ZM45 52 51 49 51 57 45 60Z" />`,
      courtyard: `
          <ellipse class="offline-map-building-shadow" cx="45" cy="82" rx="50" ry="13" />
          <path class="offline-map-building-left" d="M2 23 31 39 31 75 2 59Z" />
          <path class="offline-map-building-right" d="M60 23 31 39 31 75 60 59Z" />
          <path class="offline-map-building-top" d="M2 23 31 7 60 23 31 39Z" />
          <path class="offline-map-building-left" d="M45 55 67 67 67 83 45 71Z" />
          <path class="offline-map-building-right" d="M89 55 67 67 67 83 89 71Z" />
          <path class="offline-map-building-top" d="M45 55 67 43 89 55 67 67Z" />
          <path class="offline-map-building-accent" d="M31 39 60 23 60 30 31 46ZM67 67 89 55 89 61 67 73Z" />
          <path class="offline-map-window" d="M8 36 16 40 16 49 8 45ZM20 43 27 47 27 56 20 52ZM37 45 44 41 44 50 37 54ZM49 38 56 34 56 43 49 47ZM52 65 59 69 59 76 52 72ZM72 67 80 63 80 70 72 74Z" />`,
    };
    return `
      <g class="offline-map-building-position offline-map-building-position--${variant}"
         transform="translate(${building.x} ${building.y}) scale(${building.scale})"
         data-sequence="${building.sequence}" data-building-type="${building.type}">
        <g class="offline-map-building offline-map-building--${building.type}"
           style="--map-building-top:${tone.top};--map-building-left:${tone.left};--map-building-right:${tone.right};--map-building-accent:${tone.accent}">
          ${shells[building.type]}
        </g>
      </g>`;
  };

  const buildings = [
    ...desktopBuildings.map(item => buildingMarkup(item, 'desktop')),
    ...tabletBuildings.map(item => buildingMarkup(item, 'tablet')),
    ...mobileBuildings.map(item => buildingMarkup(item, 'mobile')),
  ].join('');

  const host = document.createElement('div');
  host.className = 'offline-casablue-map';
  host.setAttribute('aria-hidden', 'true');
  host.dataset.sequence = 'pending';
  host.innerHTML = `
    <svg class="offline-casablue-map__svg" viewBox="-120 -45 1680 610" preserveAspectRatio="xMidYMid slice" focusable="false" aria-hidden="true">
      <g class="offline-map-blocks">
        <rect x="-30" y="52" width="210" height="112" rx="24" transform="rotate(-8 75 108)" />
        <rect x="198" y="36" width="240" height="130" rx="28" transform="rotate(7 318 101)" />
        <rect x="472" y="14" width="220" height="118" rx="26" transform="rotate(-5 582 73)" />
        <rect x="742" y="28" width="258" height="126" rx="26" transform="rotate(8 871 91)" />
        <rect x="1042" y="24" width="230" height="118" rx="25" transform="rotate(-7 1157 83)" />
        <rect x="1294" y="46" width="190" height="108" rx="24" transform="rotate(6 1389 100)" />
        <rect x="22" y="234" width="248" height="150" rx="30" transform="rotate(5 146 309)" />
        <rect x="306" y="220" width="230" height="152" rx="28" transform="rotate(-7 421 296)" />
        <rect x="574" y="218" width="276" height="154" rx="30" transform="rotate(5 712 295)" />
        <rect x="894" y="218" width="248" height="150" rx="30" transform="rotate(-6 1018 293)" />
        <rect x="1180" y="226" width="244" height="148" rx="28" transform="rotate(7 1302 300)" />
        <rect x="116" y="420" width="250" height="108" rx="28" transform="rotate(-5 241 474)" />
        <rect x="414" y="414" width="270" height="118" rx="28" transform="rotate(6 549 473)" />
        <rect x="748" y="414" width="262" height="116" rx="28" transform="rotate(-6 879 472)" />
        <rect x="1068" y="416" width="254" height="112" rx="28" transform="rotate(5 1195 472)" />
        <path d="M506 151 670 132 702 194 650 218 636 262 496 240Z" />
        <path d="M836 158 990 168 1030 206 986 247 842 231 810 193Z" />
        <path d="M274 382 398 378 436 422 392 466 270 449 244 408Z" />
        <path d="M1118 359 1248 342 1302 388 1264 435 1132 432 1090 394Z" />
      </g>
      <g class="offline-map-roads offline-map-roads--bed">
        <path d="M-40 194C184 134 314 210 520 176S878 115 1068 184s286 12 430-50" />
        <path d="M146-42C188 86 164 202 230 296s166 130 166 278" />
        <path d="M720-42c-24 126-82 182-72 300s90 168 74 314" />
        <path d="M1218-38c-22 116-82 188-62 294s120 170 116 304" />
        <path d="M-40 404c212-48 382-22 552 8s350 66 518 16 312-42 462 18" />
      </g>
      <g class="offline-map-roads offline-map-roads--line">
        <path d="M-40 194C184 134 314 210 520 176S878 115 1068 184s286 12 430-50" />
        <path d="M146-42C188 86 164 202 230 296s166 130 166 278" />
        <path d="M720-42c-24 126-82 182-72 300s90 168 74 314" />
        <path d="M1218-38c-22 116-82 188-62 294s120 170 116 304" />
        <path d="M-40 404c212-48 382-22 552 8s350 66 518 16 312-42 462 18" />
      </g>
      <g class="offline-map-minor-roads">
        <path d="M20 78 340 472M346 14 612 516M962 8 824 520M1398 26 1018 516" />
        <path d="M-20 292c210-46 398 22 570 2s382-46 544 4 264 30 374-10" />
      </g>
      <path class="offline-map-route-accent" d="M-34 424C222 356 420 396 600 338S910 240 1110 226s272-84 366-154" />
      <g class="offline-map-buildings">${buildings}</g>
    </svg>`;

  stage.classList.add('offline-casablue-map-stage');
  content.classList.add('offline-casablue-map-content');
  stage.prepend(host);
  document.documentElement.dataset.casablueMap = 'on';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const buildingNodes = [...host.querySelectorAll('.offline-map-building-position')];
  const revealAll = () => {
    buildingNodes.forEach(node => node.classList.add('is-visible'));
    host.dataset.sequence = 'complete';
  };

  if (reducedMotion.matches) {
    host.dataset.motion = 'reduced';
    revealAll();
  } else {
    host.dataset.motion = 'active';
    host.dataset.sequence = 'running';
    buildingNodes.forEach(node => {
      const sequence = Number(node.dataset.sequence || 0);
      window.setTimeout(() => node.classList.add('is-visible'), 220 + sequence * 330);
    });
    window.setTimeout(() => { host.dataset.sequence = 'complete'; }, 2640);
  }

  let frame = 0;
  const clearNearest = () => {
    host.querySelectorAll('.offline-map-building.is-near').forEach(node => node.classList.remove('is-near'));
  };
  const updateNearest = event => {
    frame = 0;
    if (reducedMotion.matches || event.pointerType === 'touch' || host.dataset.sequence !== 'complete') {
      clearNearest();
      return;
    }
    const visible = buildingNodes.filter(node => {
      const rect = node.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });
    let nearest = null;
    let nearestDistance = 150;
    visible.forEach(node => {
      const rect = node.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy);
      if (distance < nearestDistance) {
        nearest = node.querySelector('.offline-map-building');
        nearestDistance = distance;
      }
    });
    clearNearest();
    nearest?.classList.add('is-near');
  };
  stage.addEventListener('pointermove', event => {
    if (frame) return;
    frame = window.requestAnimationFrame(() => updateNearest(event));
  }, { passive: true });
  stage.addEventListener('pointerleave', clearNearest, { passive: true });
})();
