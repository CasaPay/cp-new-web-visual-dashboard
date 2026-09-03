import { siteResponse } from "@/lib/site-page";

export async function GET() {
  return siteResponse("home.html", "/tenant");
}
