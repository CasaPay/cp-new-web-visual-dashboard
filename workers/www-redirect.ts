const wwwRedirectWorker = {
  fetch(request: Request): Response {
    const destination = new URL(request.url);
    destination.hostname = "casapay.app";
    destination.protocol = "https:";
    destination.port = "";

    return Response.redirect(destination.toString(), 308);
  },
};

export default wwwRedirectWorker;