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

const offlineConsumerRoutes = [
  "/en/est/kohtla-jarve",
  "/en/est/kuressaare",
  "/en/est/narva",
  "/en/est/parnu",
  "/en/est/rakvere",
  "/en/est/tallinn",
  "/en/est/tartu",
  "/en/est/viljandi",
];

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
      character
    ] ?? character,
  );

export function inactiveCityResponse(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const links = offlineConsumerRoutes
    .map((route) => `<li><a href="${route}">${route}</a></li>`)
    .join("");
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>CasaPay city availability</title><style>body{margin:0;background:#f5f5f5;font:16px system-ui;color:#202125}main{max-width:760px;margin:8vh auto;background:white;border-radius:20px;padding:32px;box-shadow:0 10px 40px #0001}a{color:#009de0}code{word-break:break-all}li{margin:8px}</style></head><body><main><h1>CasaPay is not active in this city yet</h1><p><code>${escapeHtml(path)}</code> is not currently available. Return home to join the pilot-city list.</p><p><a href="/">← CasaPay home</a> · <a href="/partner/operator">For operators</a></p><ul>${links}</ul></main></body></html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-CasaPay-Source": "casapay-site",
    },
  });
}
