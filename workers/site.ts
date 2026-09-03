interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  RELEASE_SHA?: string;
}

const pages: Record<string, string> = {
  "/": "home.html",
  "/offers": "offers.html",
  "/tenant-protection": "tenant-protection.html",
  "/en/est/tallinn": "city-tallinn.html",
  "/en/gbr/london": "city-london.html",
  "/rentlink": "rentlink.html",
  "/partner/operator": "partner-operator.html",
  "/partner/platforms": "partner-platforms.html",
  "/partner/marketplaces": "partner-marketplaces.html",
  "/partner/capital": "partner-capital.html",
  "/partner/referrals": "partner-referrals.html",
  "/partner/en/est": "partner-burger--index.html",
  "/partner/en/est/product/casapay-app": "partner-burger--product--casapay-app.html",
  "/partner/en/est/rentlink": "partner-burger--rentlink.html",
  "/partner/en/est/product/storefront": "partner-burger--product--storefront.html",
  "/partner/en/est/solution/integrations": "partner-burger--solution--integrations.html",
  "/partner/en/est/solution/analytics": "partner-burger--solution--analytics.html",
  "/partner/en/est/operator-tools": "partner-burger--operator-tools.html",
  "/partner/en/est/solution/promotions": "partner-burger--solution--promotions.html",
  "/partner/en/est/solution/casapay-plus": "partner-burger--solution--casapay-plus.html",
  "/partner/en/est/solution/capital": "partner-burger--solution--capital.html",
  "/partner/en/est/business/restaurants": "partner-burger--business--restaurants.html",
  "/partner/en/est/business/retailers": "partner-burger--business--retailers.html",
  "/partner/en/est/business/pet-stores": "partner-burger--business--pet-stores.html",
  "/partner/en/est/business/flower-shop": "partner-burger--business--flower-shop.html",
  "/partner/en/est/business/convenience": "partner-burger--business--convenience.html",
  "/partner/en/est/business/grocery": "partner-burger--business--grocery.html",
  "/partner/en/est/business/alcohol": "partner-burger--business--alcohol.html",
  "/partner/en/est/learning-center": "partner-burger--learning-center.html",
  "/partner/en/est/blog": "partner-burger--blog.html",
  "/partner/en/est/blog/success-story-home": "partner-burger--blog--success-story-home.html",
};

interface PageVariant {
  filename: string;
  title: string;
  stylesheet: string;
  script: string;
}

const pageVariants: Record<string, PageVariant> = {
  "/casapay-plus": {
    filename: "home.html",
    title: "CasaPay+ for tenants",
    stylesheet: "/tenant-plus.css?v=1",
    script: "/tenant-plus.js?v=1",
  },
  "/partner/offers": {
    filename: "partner-operator.html",
    title: "CasaPay Offers for rental operators",
    stylesheet: "/partner-offers.css?v=1",
    script: "/partner-offers.js?v=1",
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
    const location = path === "/" ? "https://casapay.app/" : `https://casapay.app${path}`;
    const priority = path === "/" ? "1" : "0.8";
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

  const canonicalUrl = pathname === "/" ? "https://casapay.app/" : `https://casapay.app${pathname}`;
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
    if (pathname === "/partner") return redirect(new URL(`/partner/operator${url.search}`, url).toString(), 308, env.RELEASE_SHA);
    if (pathname === "/help") return redirect(new URL(`/${url.search}`, url).toString(), 307, env.RELEASE_SHA);

    const filename = pages[pathname];
    if (filename) return pageResponse(request, env, pathname, filename);

    const variant = pageVariants[pathname];
    if (variant) return pageResponse(request, env, pathname, variant.filename, variant);

    if (/^\/en\/[^/]+\/[^/]+$/.test(pathname)) {
      return redirect(new URL(`/${url.search}`, url).toString(), 307, env.RELEASE_SHA);
    }
    if (pathname.startsWith("/partner/en/est/") || pathname.startsWith("/site-pages/")) {
      return addHeaders(new Response("Not found", { status: 404 }), env.RELEASE_SHA);
    }

    return addHeaders(await env.ASSETS.fetch(request), env.RELEASE_SHA);
  },
};

export default siteWorker;