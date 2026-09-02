# Scoped site design QA

## Scope

- Reference: `web-proto-wolt`, branch `prelive`, commit `1eb0ae7d05358ba95c1be1209622143dbefe5374`
- Reference preview: `http://127.0.0.1:4175/`
- Next.js implementation: `http://127.0.0.1:3000/`
- Side-by-side comparison: `http://127.0.0.1:3000/homepage-comparison.html?path=/en/est/tallinn`
- Surfaces checked: global header/footer, homepage, Tallinn/London, tenant product pages, all partner modes, RentLink, and all 20 partner navigation destinations

## Viewports and evidence

| Surface | Reference viewport | Implementation viewport | Result |
| --- | ---: | ---: | --- |
| Homepage hero and footer | 1280 × 720 | 1280 × 720 | Matched |
| Tallinn and London city pages | 1280 × 720 | 1280 × 720 | Matched |
| Offers and Tenant Protection | 1280 × 720 | 1280 × 720 | Matched |
| Operator and Platform partner pages | 1280 × 720 | 1280 × 720 | Matched |
| Partner navigation destination | 1280 × 720 | 1280 × 720 | Matched |
| Tallinn mobile/filter state | 390 × 844 | 390 × 844 | Matched |

The comparison page loads both origins simultaneously at identical fixed viewports. Side-by-side browser captures matched across the representative route families. In addition, the HTTP response body SHA-256 hashes matched the source for every one of the 32 scoped routes.

## Fidelity checklist

- Typography: original font files, sizing, weights, line heights, casing, and line breaks retained.
- Spacing and geometry: original responsive CSS and document structure retained.
- Color and effects: original colors, glass header treatment, shadows, radii, map wash, and dark section treatment retained.
- Assets: original `prelive` raster, SVG, font, map, app-store, city rental, and partner assets are served locally. A static-reference audit found zero missing assets across all snapshots.
- Copy: original copy and labels retained on all scoped routes.
- Content: the complete requested source scope is retained; no redesigned or substituted sections remain.

## Interaction checks

- Mobile burger opens and closes the source navigation; partner destination navigation retains its source links.
- Tenant/Partner selector opens the source partner menu and exposes Operators, Platforms, and Marketplaces states.
- Tallinn mobile filters open and close correctly; listing photo controls advance the gallery state.
- The Platform Partner earnings slider updates 20 activations to 20 earning events and €5,000.
- Internal tenant and partner calls to action retain their original route targets.
- No broken images were detected in the final rendered route checks.
- No browser console errors or warnings were detected after the final pass.

## Fix history

The earlier custom reconstruction was removed. Every scoped Next.js route now serves the exact `prelive` response snapshot and its local source assets, eliminating reinterpretation across the tenant, city, partner, and burger-page families.

## Final result

passed
