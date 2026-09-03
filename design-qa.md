# CasaPay site QA

## Scope

- Tenant-focused homepage with shared header and footer
- Tallinn and London active-city experiences
- Unsupported-city redirects
- Tenant product pages
- Partner landing page, operator, platform, RentLink, and partner product pages
- CasaPay Offers operator acquisition landing page
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
- All published pages render without placeholder links, broken internal links, broken images, or browser console errors.
- The rendered link crawl followed 29 unique internal destinations successfully.
- Public crawling is enabled through `robots.txt`, with the CasaPay sitemap and host configured.
- Baseline security headers and production output tracing are configured in Next.js.

## Result

Passed.

---

# Homepage “How it works” visual QA — 2026-09-03

## Comparison target

- Source visual truth: `/Users/risto/Desktop/Screenshots/Screenshot 2026-09-03 at 09.16.21.png`
- Rendered implementation: `/Users/risto/Documents/ChatGPT/CP-Web-V2/.qa-how-it-works-section.jpg`
- Combined comparison: `/Users/risto/Documents/ChatGPT/CP-Web-V2/.qa-how-it-works-comparison.jpg`
- Viewport and state: desktop homepage, 1442 × 1044 CSS px, section aligned to its top edge, default interaction state.
- Density normalization: source was 2784 × 1478 px and was scaled to 1442 × 766 px, then centered on a 1442 × 1044 white canvas. The implementation was captured at 1442 × 1044 px. Both sides were compared at equal rendered width.

## Evidence

- Full-view comparison: both designs use one centered heading followed by three equal-width, softly tinted cards with a large photographic or product image, centered title, supporting copy and generous white space.
- Focused region comparison: card imagery, rounded corners, title hierarchy, pastel differentiation and centered content rhythm were readable in the equal-width combined comparison; no additional crop was needed.
- Fonts and typography: the implementation uses CasaPay’s existing DD Scoop/system stack, with hierarchy and wrapping comparable to the reference while retaining CasaPay’s brand voice.
- Spacing and layout rhythm: the three-column grid, card gutters, media inset, radii and vertical spacing match the reference structure. The sticky CasaPay header is expected product chrome and is outside the reference section.
- Colors and visual tokens: pale cyan, lavender and warm yellow preserve the reference’s three-step differentiation while using the existing CasaPay palette.
- Image quality and asset fidelity: step one is a browser capture of the real Tallinn offers page; step two is a browser capture of a real listed operator’s selection page; step three reuses CasaPay’s existing tenant move-in photography. All assets are sharp and correctly cropped.
- Copy and content: the flow is tenant-focused and maps directly to discovery, operator selection and CasaPay payment/CasaPay+ opt-in.

## Comparison history

- Initial P2: the first heading read “How renting with CasaPay works,” which was less direct than the requested “How it works” label and the reference’s compact title.
- Fix: shortened the heading to “How it works.”
- Post-fix evidence: `.qa-how-it-works-section.jpg` and `.qa-how-it-works-comparison.jpg` show the corrected compact heading and balanced three-card composition.

## Interaction checks

- Step one resolves to `/en/est/tallinn`.
- Step two resolves to the operator’s live booking experience in a new tab.
- Step three resolves to `/casapay-plus`; the destination loaded successfully in the in-app browser.
- All three cards expose descriptive link names in the accessibility tree and retain visible keyboard focus styles.

## Findings

- No actionable P0, P1 or P2 issues remain.

## Follow-up polish

- P3: a dedicated CasaPay payment-confirmation product image could replace the move-in photograph when final payment UI artwork is available.

final result: passed
