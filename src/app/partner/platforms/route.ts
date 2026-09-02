import { preliveResponse } from "@/lib/prelive-page";

export const dynamic = "force-static";

export function GET() {
  return preliveResponse("partner-platforms.html");
}
