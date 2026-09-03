import { siteResponse, siteVariantResponse } from "@/lib/site-page";

const pages: Record<string, string> = {
  "rentlink": "rentlink.html",
  "capital": "partner-capital.html",
  "referrals": "partner-referrals.html",
  "product/casapay-app": "partner-burger--product--casapay-app.html",
  "product/storefront": "partner-burger--product--storefront.html",
  "solution/integrations": "partner-burger--solution--integrations.html",
  "solution/analytics": "partner-burger--solution--analytics.html",
  "operator-tools": "partner-burger--operator-tools.html",
  "solution/promotions": "partner-burger--solution--promotions.html",
  "business/restaurants": "partner-burger--business--restaurants.html",
  "business/retailers": "partner-burger--business--retailers.html",
  "business/pet-stores": "partner-burger--business--pet-stores.html",
  "business/flower-shop": "partner-burger--business--flower-shop.html",
  "business/convenience": "partner-burger--business--convenience.html",
  "business/grocery": "partner-burger--business--grocery.html",
  "business/alcohol": "partner-burger--business--alcohol.html",
  "learning-center": "partner-burger--learning-center.html",
  "blog": "partner-burger--blog.html",
  "blog/success-story-home": "partner-burger--blog--success-story-home.html",
};

export async function GET(_request: Request, context: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await context.params;
  const path = slug.join("/");

  if (path === "offers") {
    return siteVariantResponse(
      "partner-operator.html",
      "/partner/operator/offers",
      "CasaPay Offers for rental operators",
      "/partner-offers.css?v=2",
      "/partner-offers.js?v=2",
    );
  }

  if (path === "casapay-plus") {
    return siteResponse("partner-burger--solution--casapay-plus.html", "/partner/operator/casapay-plus");
  }

  const filename = pages[path];
  return filename
    ? siteResponse(filename, `/partner/operator/${path}`)
    : new Response("Not found", { status: 404 });
}
