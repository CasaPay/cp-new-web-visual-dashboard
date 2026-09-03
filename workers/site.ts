interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  RELEASE_SHA?: string;
}

const pages: Record<string, string> = {
  "/tenant": "home.html",
  "/tenant/offers": "offers.html",
  "/tenant/tenant-protection": "tenant-protection.html",
  "/tenant/en/est/tallinn": "city-tallinn.html",
  "/tenant/en/gbr/london": "city-london.html",
  "/partner/operator": "partner-operator.html",
  "/partner/operator/rentlink": "rentlink.html",
  "/partner/operator/casapay-plus": "partner-burger--solution--casapay-plus.html",
  "/partner/operator/capital": "partner-capital.html",
  "/partner/operator/referrals": "partner-referrals.html",
  "/partner/platforms": "partner-platforms.html",
  "/partner/operator/product/casapay-app": "partner-burger--product--casapay-app.html",
  "/partner/operator/product/storefront": "partner-burger--product--storefront.html",
  "/partner/operator/solution/integrations": "partner-burger--solution--integrations.html",
  "/partner/operator/solution/analytics": "partner-burger--solution--analytics.html",
  "/partner/operator/operator-tools": "partner-burger--operator-tools.html",
  "/partner/operator/solution/promotions": "partner-burger--solution--promotions.html",
  "/partner/operator/business/restaurants": "partner-burger--business--restaurants.html",
  "/partner/operator/business/retailers": "partner-burger--business--retailers.html",
  "/partner/operator/business/pet-stores": "partner-burger--business--pet-stores.html",
  "/partner/operator/business/flower-shop": "partner-burger--business--flower-shop.html",
  "/partner/operator/business/convenience": "partner-burger--business--convenience.html",
  "/partner/operator/business/grocery": "partner-burger--business--grocery.html",
  "/partner/operator/business/alcohol": "partner-burger--business--alcohol.html",
  "/partner/operator/learning-center": "partner-burger--learning-center.html",
  "/partner/operator/blog": "partner-burger--blog.html",
  "/partner/operator/blog/success-story-home": "partner-burger--blog--success-story-home.html",
};

interface PageVariant {
  filename: string;
  title: string;
  stylesheet: string;
  script: string;
}

const pageVariants: Record<string, PageVariant> = {
  "/tenant/casapay-plus": {
    filename: "home.html",
    title: "CasaPay+ for tenants",
    stylesheet: "/tenant-plus.css?v=1",
    script: "/tenant-plus.js?v=1",
  },
  "/partner/operator/offers": {
    filename: "partner-operator.html",
    title: "CasaPay Offers for rental operators",
    stylesheet: "/partner-offers.css?v=2",
    script: "/partner-offers.js?v=2",
  },
};

const securityHeaders: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

function addHeaders(response: Response, releaseSha?: string): Response {
  const secured = new Response(response.body, response);
  for (const [name, value] of Object.entries(securityHeaders)) {
    secured.headers.set(name, value);
  }
  if (releaseSha) secured.headers.set("X-CasaPay-Release", releaseSha);
  return secured;
}

function redirect(location: string, status: 307 | 308, releaseSha?: string): Response {
  return addHeaders(new Response(null, { status, headers: { Location: location } }), releaseSha);
}

function robots(releaseSha?: string): Response {
  const body = "User-Agent: *\nAllow: /\n\nHost: https://casapay.app\nSitemap: https://casapay.app/sitemap.xml\n";
  return addHeaders(new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } }), releaseSha);
}

function sitemap(releaseSha?: string): Response {
  const urls = [...Object.keys(pages), ...Object.keys(pageVariants)].map((path) => {
    const location = `https://casapay.app${path}`;
    const priority = path === "/tenant" ? "1" : "0.8";
    return `<url><loc>${location}</loc><changefreq>weekly</changefreq><priority>${priority}</priority></url>`;
  });
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>\n`;
  return addHeaders(new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } }), releaseSha);
}

async function pageResponse(
  request: Request,
  env: Env,
  pathname: string,
  filename: string,
  variant?: PageVariant,
): Promise<Response> {
  const assetUrl = new URL(request.url);
  assetUrl.pathname = `/site-pages/${filename}`;
  const assetRequest = new Request(assetUrl, request);
  const asset = await env.ASSETS.fetch(assetRequest);
  if (!asset.ok || request.method === "HEAD") return addHeaders(asset, env.RELEASE_SHA);

  const canonicalUrl = `https://casapay.app${pathname}`;
  const releaseMeta = env.RELEASE_SHA ? `<meta name="x-casapay-release" content="${env.RELEASE_SHA}">` : "";
  let html = await asset.text();
  if (variant) {
    html = html
      .replace(/<title[^>]*>.*?<\/title>/i, `<title>${variant.title}</title>`)
      .replace("</head>", `<link rel="stylesheet" href="${variant.stylesheet}"></head>`)
      .replace("</body>", `<script defer src="${variant.script}"></script></body>`);
  }
  if (!/rel=["']canonical["']/i.test(html)) {
    html = html.replace(/<\/head>/i, `<link rel="canonical" href="${canonicalUrl}">${releaseMeta}</head>`);
  }

  const headers = new Headers(asset.headers);
  headers.set("Content-Type", "text/html; charset=utf-8");
  headers.set("Cache-Control", variant ? "public, max-age=0, must-revalidate" : "no-store");
  headers.set("X-CasaPay-Source", "casapay-site");
  return addHeaders(new Response(html, { status: asset.status, headers }), env.RELEASE_SHA);
}

const siteWorker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return addHeaders(new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } }), env.RELEASE_SHA);
    }

    const url = new URL(request.url);
    const pathname = url.pathname.length > 1 && url.pathname.endsWith("/")
      ? url.pathname.slice(0, -1)
      : url.pathname;

    if (pathname === "/robots.txt") return robots(env.RELEASE_SHA);
    if (pathname === "/sitemap.xml") return sitemap(env.RELEASE_SHA);
    const exactRedirects: Record<string, string> = {
      "/": "/tenant",
      "/offers": "/tenant/offers",
      "/tenant-protection": "/tenant/tenant-protection",
      "/casapay-plus": "/tenant/casapay-plus",
      "/en/discovery": "/tenant",
      "/en/est": "/tenant",
      "/en/est/tallinn": "/tenant/en/est/tallinn",
      "/en/gbr/london": "/tenant/en/gbr/london",
      "/rentlink": "/partner/operator/rentlink",
      "/partner": "/partner/operator",
      "/partner/offers": "/partner/operator/offers",
      "/partner/capital": "/partner/operator/capital",
      "/partner/referrals": "/partner/operator/referrals",
      "/partner/marketplaces": "/partner/operator",
      "/partner/en/est": "/partner/operator",
      "/partner/en/est/rentlink": "/partner/operator/rentlink",
      "/partner/en/est/solution/casapay-plus": "/partner/operator/casapay-plus",
      "/partner/en/est/solution/capital": "/partner/operator/capital",
      "/partner/operator/solution/casapay-plus": "/partner/operator/casapay-plus",
      "/partner/operator/solution/capital": "/partner/operator/capital",
    };
    const exactDestination = exactRedirects[pathname];
    if (exactDestination) return redirect(new URL(`${exactDestination}${url.search}`, url).toString(), 308, env.RELEASE_SHA);
    if (pathname === "/help") return redirect(new URL(`/tenant${url.search}`, url).toString(), 307, env.RELEASE_SHA);
    if (pathname.startsWith("/et/discovery/")) {
      return redirect(new URL(`/tenant${url.search}`, url).toString(), 307, env.RELEASE_SHA);
    }
    if (pathname.startsWith("/partner/en/est/")) {
      const suffix = pathname.slice("/partner/en/est/".length);
      return redirect(new URL(`/partner/operator/${suffix}${url.search}`, url).toString(), 308, env.RELEASE_SHA);
    }

    const filename = pages[pathname];
    if (filename) return pageResponse(request, env, pathname, filename);

    const variant = pageVariants[pathname];
    if (variant) return pageResponse(request, env, pathname, variant.filename, variant);

    if (/^\/en\/[^/]+\/[^/]+$/.test(pathname)) {
      return redirect(new URL(`/tenant${pathname}${url.search}`, url).toString(), 308, env.RELEASE_SHA);
    }
    if (/^\/tenant\/en\/[^/]+\/[^/]+$/.test(pathname)) {
      return redirect(new URL(`/tenant${url.search}`, url).toString(), 307, env.RELEASE_SHA);
    }
    const supportedCityChild = pathname.match(/^\/tenant\/(en\/(?:est\/tallinn|gbr\/london))\//);
    if (supportedCityChild) {
      return redirect(new URL(`/tenant/${supportedCityChild[1]}${url.search}`, url).toString(), 307, env.RELEASE_SHA);
    }
    if (pathname.startsWith("/site-pages/")) {
      return addHeaders(new Response("Not found", { status: 404 }), env.RELEASE_SHA);
    }

    return addHeaders(await env.ASSETS.fetch(request), env.RELEASE_SHA);
  },
};

export default siteWorker;
