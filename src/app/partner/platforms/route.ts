import { siteResponse } from "@/lib/site-page";

export const dynamic = "force-static";

export function GET() {
  return siteResponse("partner-platforms.html", "/partner/platforms");
}
