# CasaPay Web V2

CasaPay's production tenant and partner website, built with Next.js App Router.

The repository contains the approved CasaPay pages, interactions, global header and footer, city rental data, fonts, and locally hosted media required by the supported routes.

## Included routes

- Tenant homepage, Tallinn and London city pages
- Worldwide city and university discovery with the prototype's curated popular locations
- Tallinn and London selections open their city pages; all other locations collect pilot interest in place
- Unsupported legacy city URLs redirect to the homepage
- Tenant Offers, Tenant Protection, and CasaPay+ pages
- Partner Operator, Platforms, Marketplaces, Capital, Referrals, and RentLink pages
- CasaPay Offers operator acquisition landing page
- Separate tenant and operator CasaPay+ experiences with audience-correct navigation
- All 20 `/partner/en/est` partner navigation destinations
- Only links with live local destinations are rendered

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

The production site is deployed to Cloudflare Workers at `https://casapay.app`; `https://www.casapay.app` permanently redirects to the apex. The separate legacy `casapay.com` deployment is not managed by this repository.

Validate the Cloudflare Workers with `npm run check:cloudflare`, preview the site Worker with `npm run preview:cloudflare`, and deploy both the apex and `www` redirect Workers with `npm run deploy:production`.

Forms currently validate locally and intentionally transmit or persist nothing. Connect approved production form endpoints before enabling submissions.
