import { readFileSync } from "node:fs";
import { join } from "node:path";

export function preliveHtml(filename: string) {
  return readFileSync(join(process.cwd(), "public", "prelive-pages", filename), "utf8");
}

export function preliveResponse(filename: string) {
  return new Response(preliveHtml(filename), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-CasaPay-Source": "web-proto-wolt/prelive",
    },
  });
}
