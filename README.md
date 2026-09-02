# codex-cp-web-v2

CasaPay's tenant and partner website rebuilt in Next.js from the approved `prelive` prototype contracts.

The complete approved scope is preserved from `prelive`, including the original markup, styles, scripts, media, interactions, global header, and global footer. Next.js App Router route handlers serve the source-faithful pages directly.

## Included routes

- Tenant homepage, Tallinn and London city pages
- City search behavior for active cities, pilot-mode cities, and legacy inactive-city fallbacks
- Tenant Offers, Tenant Protection, and Help pages
- Partner Operator, Platforms, Marketplaces, Capital, Referrals, and RentLink pages
- All 20 `/partner/en/est` partner navigation destinations

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validate

```bash
npm run typecheck
npm run lint
npm run build
```

The project is private and contains only the selected CasaPay content, datasets, fonts, and local media required by the supported routes. Forms validate locally and intentionally transmit or persist nothing.

For local visual QA, [http://localhost:3000/homepage-comparison.html](http://localhost:3000/homepage-comparison.html) places the original `prelive` route and the Next.js version side by side. Pass a route with `?path=/en/est/tallinn`; add `&mobile=1` for the fixed mobile comparison. It expects the temporary source reference server on port `4175`.

Source baseline: `ristok33/web-proto-wolt` branch `prelive`, commit `1eb0ae7d05358ba95c1be1209622143dbefe5374`.
