import { preliveInactiveCityResponse } from "@/lib/prelive-page";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  return preliveInactiveCityResponse(new URL(request.url).pathname);
}
