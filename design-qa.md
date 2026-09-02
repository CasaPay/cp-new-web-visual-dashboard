# Homepage design QA

## Scope

- Reference: `web-proto-wolt`, branch `prelive`, commit `1eb0ae7d05358ba95c1be1209622143dbefe5374`
- Reference preview: `http://127.0.0.1:4174/`
- Next.js implementation: `http://127.0.0.1:3000/`
- Side-by-side comparison: `http://127.0.0.1:3000/homepage-comparison.html`
- Surfaces checked: global header, complete tenant homepage, global footer

## Viewports and evidence

| Surface | Reference viewport | Implementation viewport | Result |
| --- | ---: | ---: | --- |
| Desktop hero | 1280 × 720 | 1280 × 720 | Matched |
| Desktop footer | 1280 × 720 | 1280 × 720 | Matched |
| Mobile hero/navigation | 390 × 844 | 390 × 844 | Matched |

The desktop comparison page loads both origins simultaneously into fixed 1280 × 720 frames so the animated hero state, viewport, and scaling can be judged together. Browser screenshots and measured bounding boxes matched for the 69 px header, tenant/partner selector, hero title, search input, operator rail, content boundary, and footer.

## Fidelity checklist

- Typography: original font files, sizing, weights, line heights, casing, and line breaks retained.
- Spacing and geometry: original responsive CSS and document structure retained.
- Color and effects: original colors, glass header treatment, shadows, radii, map wash, and dark section treatment retained.
- Assets: original `prelive` raster, SVG, font, map, app-store, and operator assets are served locally.
- Copy: original homepage copy and labels retained.
- Content: full source homepage retained from header through footer; no redesigned or substituted sections remain on `/`.

## Interaction checks

- Mobile burger opens and closes the source navigation.
- Tenant/Partner selector opens the source partner menu and exposes Operators, Platforms, and Marketplaces states.
- City/university search accepts input and opens its source suggestion state. Its remote place lookup retains the source's offline behavior.
- Internal tenant and partner calls to action retain their original route targets.
- No broken images were detected on the homepage.
- No browser console errors or warnings were detected after the final desktop pass.

## Fix history

The earlier custom reconstruction was a P1 source-fidelity failure, most visibly in the hero. It was removed. The root route now serves the exact `prelive` homepage shell and local source assets through the Next.js App Router, eliminating the reinterpretation rather than approximating it further.

## Final result

passed
