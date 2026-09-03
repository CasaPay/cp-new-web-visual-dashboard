import { inactiveCityResponse } from "@/lib/site-page";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  return inactiveCityResponse(new URL(request.url).pathname);
}
