import { siteResponse, siteVariantResponse } from "@/lib/site-page";

const pages: Record<string, string> = {
  "offers": "offers.html",
  "tenant-protection": "tenant-protection.html",
  "en/est/tallinn": "city-tallinn.html",
  "en/gbr/london": "city-london.html",
};

export async function GET(request: Request, context: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await context.params;
  const path = slug.join("/");

  if (path === "casapay-plus") {
    return siteVariantResponse(
      "home.html",
      "/tenant/casapay-plus",
      "CasaPay+ for tenants",
      "/tenant-plus.css?v=1",
      "/tenant-plus.js?v=1",
    );
  }

  const filename = pages[path];
  if (filename) return siteResponse(filename, `/tenant/${path}`);

  const supportedCity = path.match(/^(en\/(?:est\/tallinn|gbr\/london))\//);
  if (supportedCity) {
    return Response.redirect(new URL(`/tenant/${supportedCity[1]}`, request.url), 307);
  }

  if (/^en\/[^/]+\/[^/]+$/.test(path)) {
    return Response.redirect(new URL("/tenant", request.url), 307);
  }

  return new Response("Not found", { status: 404 });
}
