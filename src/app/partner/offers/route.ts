import { siteHtml } from "@/lib/site-page";

export const dynamic = "force-static";

export function GET() {
  const html = siteHtml("partner-operator.html")
    .replace(/<title[^>]*>.*?<\/title>/i, "<title>CasaPay Offers for rental operators</title>")
    .replace(
      "</head>",
      '<link rel="stylesheet" href="/partner-offers.css?v=2"></head>',
    )
    .replace(
      "</body>",
      '<script defer src="/partner-offers.js?v=2"></script></body>',
    );

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "X-CasaPay-Source": "casapay-site",
    },
  });
}
