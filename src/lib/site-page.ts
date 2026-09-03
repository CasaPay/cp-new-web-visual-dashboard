import { readFileSync } from "node:fs";
import { join } from "node:path";

export function siteHtml(filename: string) {
  return readFileSync(join(process.cwd(), "public", "site-pages", filename), "utf8");
}

export function siteResponse(filename: string) {
  return new Response(siteHtml(filename), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-CasaPay-Source": "casapay-site",
    },
  });
}
