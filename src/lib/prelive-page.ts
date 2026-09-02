import { readFileSync } from "node:fs";
import { join } from "node:path";

export function preliveHtml(filename: string) {
  return readFileSync(join(process.cwd(), "public", "prelive-pages", filename), "utf8");
}

export function preliveResponse(filename: string) {
  return new Response(preliveHtml(filename), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-CasaPay-Source": "web-proto-wolt/prelive",
    },
  });
}

const offlineConsumerRoutes = [
  "/en/discovery",
  "/en/est",
  "/en/est/kohtla-jarve",
  "/en/est/kohtla-jarve/brand/alexela",
  "/en/est/kohtla-jarve/restaurant/aragvi",
  "/en/est/kuressaare",
  "/en/est/kuressaare/brand/benu-apteek",
  "/en/est/kuressaare/restaurant/classic-kohvik-and-pizza",
  "/en/est/narva",
  "/en/est/narva/brand/benu-apteek",
  "/en/est/narva/restaurant/break-time-burger-wrap",
  "/en/est/parnu",
  "/en/est/parnu/brand/alexela",
  "/en/est/parnu/restaurant/babu-juures",
  "/en/est/rakvere",
  "/en/est/rakvere/brand/benu-apteek",
  "/en/est/rakvere/restaurant/bamboo-gardenn",
  "/en/est/tallinn",
  "/en/est/tallinn/brand/a-flowers",
  "/en/est/tallinn/restaurant/bahus-burger",
  "/en/est/tallinn/venue/roses/gerbera-1-vars-itemid-46fdcc93084260d72d010c08",
  "/en/est/tartu",
  "/en/est/tartu/brand/alexela",
  "/en/est/tartu/restaurant/12-tooli",
  "/en/est/viljandi",
  "/en/est/viljandi/brand/alexela",
  "/en/est/viljandi/restaurant/has-kebabs-viljandi",
];

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
      character
    ] ?? character,
  );

export function preliveInactiveCityResponse(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const links = offlineConsumerRoutes
    .map((route) => `<li><a href="${route}">${route}</a></li>`)
    .join("");
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Offline route</title><style>body{margin:0;background:#f5f5f5;font:16px system-ui;color:#202125}main{max-width:760px;margin:8vh auto;background:white;border-radius:20px;padding:32px;box-shadow:0 10px 40px #0001}a{color:#009de0}code{word-break:break-all}li{margin:8px}</style></head><body><main><h1>This route stays offline</h1><p><code>${escapeHtml(path)}</code> is outside the selected consumer demo bundle. No internet request was made.</p><p><a href="/">← Consumer home</a> · <a href="/partner">Partner/CasaPay Ads</a> · <a href="/_clone-map">Route map</a></p><ul>${links}</ul></main></body></html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-CasaPay-Source": "web-proto-wolt/prelive",
    },
  });
}
