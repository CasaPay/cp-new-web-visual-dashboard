import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "next-env.d.ts",
    // Bundled site assets are generated or third-party code, not project source.
    "public/assets/vendor/**",
    "public/_local_assets/**",
  ]),
]);
