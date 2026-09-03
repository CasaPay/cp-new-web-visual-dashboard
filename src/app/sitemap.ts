import type { MetadataRoute } from "next";

const routes = [
  "/tenant",
  "/tenant/offers",
  "/tenant/tenant-protection",
  "/tenant/casapay-plus",
  "/tenant/en/est/tallinn",
  "/tenant/en/gbr/london",
  "/partner/operator",
  "/partner/operator/rentlink",
  "/partner/operator/offers",
  "/partner/operator/casapay-plus",
  "/partner/operator/capital",
  "/partner/operator/referrals",
  "/partner/platforms",
  "/partner/operator/product/casapay-app",
  "/partner/operator/product/storefront",
  "/partner/operator/solution/integrations",
  "/partner/operator/solution/analytics",
  "/partner/operator/operator-tools",
  "/partner/operator/solution/promotions",
  "/partner/operator/business/restaurants",
  "/partner/operator/business/retailers",
  "/partner/operator/business/pet-stores",
  "/partner/operator/business/flower-shop",
  "/partner/operator/business/convenience",
  "/partner/operator/business/grocery",
  "/partner/operator/business/alcohol",
  "/partner/operator/learning-center",
  "/partner/operator/blog",
  "/partner/operator/blog/success-story-home",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `https://casapay.app${route}`, changeFrequency: "weekly", priority: route === "/tenant" ? 1 : .8 }));
}
