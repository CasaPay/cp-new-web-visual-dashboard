import type { MetadataRoute } from "next";

const routes = [
  "",
  "/offers",
  "/tenant-protection",
  "/help",
  "/en/est/tallinn",
  "/en/gbr/london",
  "/rentlink",
  "/partner/operator",
  "/partner/platforms",
  "/partner/marketplaces",
  "/partner/capital",
  "/partner/referrals",
  "/partner/en/est",
  "/partner/en/est/product/casapay-app",
  "/partner/en/est/rentlink",
  "/partner/en/est/product/storefront",
  "/partner/en/est/solution/integrations",
  "/partner/en/est/solution/analytics",
  "/partner/en/est/operator-tools",
  "/partner/en/est/solution/promotions",
  "/partner/en/est/solution/casapay-plus",
  "/partner/en/est/solution/capital",
  "/partner/en/est/business/restaurants",
  "/partner/en/est/business/retailers",
  "/partner/en/est/business/pet-stores",
  "/partner/en/est/business/flower-shop",
  "/partner/en/est/business/convenience",
  "/partner/en/est/business/grocery",
  "/partner/en/est/business/alcohol",
  "/partner/en/est/learning-center",
  "/partner/en/est/blog",
  "/partner/en/est/blog/success-story-home",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `https://casapay.com${route}`, changeFrequency: "weekly", priority: route === "" ? 1 : .8 }));
}
