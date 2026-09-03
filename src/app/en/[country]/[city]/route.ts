export const dynamic = "force-dynamic";

export function GET(request: Request) {
  return Response.redirect(new URL("/tenant", request.url), 307);
}
