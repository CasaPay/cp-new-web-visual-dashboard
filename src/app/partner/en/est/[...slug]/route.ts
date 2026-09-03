import { siteResponse } from "@/lib/site-page";

const pages: Record<string, string> = {
  "product/casapay-app": "partner-burger--product--casapay-app.html",
  "rentlink": "partner-burger--rentlink.html",
  "product/storefront": "partner-burger--product--storefront.html",
  "solution/integrations": "partner-burger--solution--integrations.html",
  "solution/analytics": "partner-burger--solution--analytics.html",
  "operator-tools": "partner-burger--operator-tools.html",
  "solution/promotions": "partner-burger--solution--promotions.html",
  "solution/casapay-plus": "partner-burger--solution--casapay-plus.html",
  "solution/capital": "partner-burger--solution--capital.html",
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

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await context.params;
  const filename = pages[slug.join("/")];

  if (!filename) {
    return new Response("Not found", { status: 404 });
  }

  return siteResponse(filename);
}
