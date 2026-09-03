# CasaPay Web V2

CasaPay's production tenant and partner website, built with Next.js App Router.

The repository contains the approved CasaPay pages, interactions, global header and footer, city rental data, fonts, and locally hosted media required by the supported routes.

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
npm run check:brand
```

Run the complete production check with:

```bash
npm run check
```

## Production

The application builds with the standard Next.js production workflow and can be deployed to a Node-compatible Next.js host. The canonical site URL is `https://casapay.com`; update the metadata, sitemap, and robots host together if the production domain changes.

Forms currently validate locally and intentionally transmit or persist nothing. Connect approved production form endpoints before enabling submissions.
