import siteWorker from "./site";

interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  RELEASE_SHA?: string;
}

const preliveWorker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const response = await siteWorker.fetch(request, env);
    const headers = new Headers(response.headers);
    headers.set("X-CasaPay-Environment", "prelive");
    headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};

export default preliveWorker;
