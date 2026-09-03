import { readFileSync } from "node:fs";
import { join } from "node:path";

export function siteHtml(filename: string) {
  return readFileSync(join(process.cwd(), "public", "site-pages", filename), "utf8");
}

export function siteResponse(filename: string, canonicalPath?: string) {
  let html = siteHtml(filename);
  if (canonicalPath && !/rel=["']canonical["']/i.test(html)) {
    html = html.replace(/<\/head>/i, `<link rel="canonical" href="https://casapay.app${canonicalPath}"></head>`);
  }
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-CasaPay-Source": "casapay-site",
    },
  });
}

export function siteVariantResponse(
  filename: string,
  canonicalPath: string,
  title: string,
  stylesheet: string,
  script: string,
) {
  const html = siteHtml(filename)
    .replace(/<title[^>]*>.*?<\/title>/i, `<title>${title}</title>`)
    .replace("</head>", `<link rel="canonical" href="https://casapay.app${canonicalPath}"><link rel="stylesheet" href="${stylesheet}"></head>`)
    .replace("</body>", `<script defer src="${script}"></script></body>`);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-CasaPay-Source": "casapay-site",
    },
  });
}
