import type { MetadataRoute } from "next";

const routes = ["", "/offers", "/tenant-protection", "/casapay-plus", "/help", "/en/est/tallinn", "/en/gbr/london", "/rentlink", "/partner/operator", "/partner/platforms", "/partner/marketplaces", "/partner/casapay-plus", "/partner/capital", "/partner/referrals"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `https://casapay.com${route}`, changeFrequency: "weekly", priority: route === "" ? 1 : .8 }));
}
