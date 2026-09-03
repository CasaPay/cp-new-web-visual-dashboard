export const dynamic = "force-dynamic";

export function GET(request: Request) {
  return Response.redirect(new URL("/partner/operator", request.url), 307);
}
