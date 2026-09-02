# codex-cp-web-v2

CasaPay's CasaBlue tenant and partner website rebuilt in Next.js from the approved `prelive` prototype contracts.

The homepage is currently preserved exactly from `prelive`—including its markup, styles, scripts, media, header, hero, content sections, and footer—and is served by the Next.js App Router. The other scoped routes remain staged for the same source-faithful migration process after homepage approval.

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

For local visual QA, [http://localhost:3000/homepage-comparison.html](http://localhost:3000/homepage-comparison.html) places the original `prelive` homepage and the Next.js version side by side. It expects the temporary source reference server on port `4174`.

Source baseline: `ristok33/web-proto-wolt` branch `prelive`, commit `1eb0ae7d05358ba95c1be1209622143dbefe5374`.
