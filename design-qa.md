# CasaPay site QA

## Scope

- Tenant-focused homepage with shared header and footer
- Tallinn and London active-city experiences
- Unsupported-city redirects
- Tenant product pages
- Partner landing page, operator, platform, RentLink, and partner product pages
- Desktop and mobile navigation

## Verified behavior

- Homepage search routes Tallinn and London to their active city pages.
- The location picker contains only Tallinn, London, TalTech, and University College London.
- Unsupported legacy city URLs redirect to the homepage without rendering a fallback route list.
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
- All 31 published pages render without placeholder links, broken internal links, broken images, or browser console errors.
- The rendered link crawl followed 29 unique internal destinations successfully.
- Public crawling is enabled through `robots.txt`, with the CasaPay sitemap and host configured.
- Baseline security headers and production output tracing are configured in Next.js.

## Result

Passed.
