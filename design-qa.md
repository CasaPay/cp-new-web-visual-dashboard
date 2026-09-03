# CasaPay site QA

## Scope

- Tenant-focused homepage with shared header and footer
- Tallinn and London active-city experiences
- Inactive-city pilot signup and fallback states
- Tenant product pages
- Partner landing page, operator, platform, RentLink, and partner product pages
- Desktop and mobile navigation

## Verified behavior

- Homepage search routes Tallinn and London to their active city pages.
- Inactive cities stay in the pilot flow, validate an email address, and show the confirmation state.
- Tallinn and London rental cards, filters, sorting, map markers, and photo controls work locally.
- Tenant and partner navigation links resolve to their intended local routes.
- Mobile menus, filter controls, footer accordions, and gallery controls are keyboard accessible.
- The original icon font is bundled locally; gallery, filter, booking, and amenity icons render correctly.
- All assets requested by the rendered scoped pages resolve; no broken rendered images were detected.

## Production checks

- Next.js production build passes.
- TypeScript and ESLint checks pass.
- The brand-cleanliness check scans both paths and text content.
- All scoped routes return successful responses.
- Representative homepage, active city, inactive city, tenant, and partner pages render without broken images or browser console errors.
- Public crawling is enabled through `robots.txt`, with the CasaPay sitemap and host configured.
- Baseline security headers and production output tracing are configured in Next.js.

## Result

Passed.
