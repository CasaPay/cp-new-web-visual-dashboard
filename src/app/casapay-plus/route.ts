import { siteHtml } from "@/lib/site-page";

export const dynamic = "force-static";

export function GET() {
  const html = siteHtml("home.html")
    .replace(/<title[^>]*>.*?<\/title>/i, "<title>CasaPay+ for tenants</title>")
    .replace(
      "</head>",
      '<link rel="stylesheet" href="/tenant-plus.css?v=1"></head>',
    )
    .replace(
      "</body>",
      '<script defer src="/tenant-plus.js?v=1"></script></body>',
    );

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "X-CasaPay-Source": "casapay-site",
    },
  });
}
