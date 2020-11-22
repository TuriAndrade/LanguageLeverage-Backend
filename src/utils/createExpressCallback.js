export default function createExpressCallback(middleware) {
  return (req, res, next) => {
    middleware(req)
      .then((httpResponse) => {
        if (httpResponse) {
          if (httpResponse.headers) {
            res.set(httpResponse.headers);
          }
          if (httpResponse.cookie) {
            res.cookie(
              httpResponse.cookie.name,
              httpResponse.cookie.data,
              httpResponse.cookie.options
            );
          }
          if (httpResponse.clearCookie) {
            res.clearCookie(httpResponse.clearCookie.name);
          }
          res.type("json");
          res.status(httpResponse.statusCode).send(httpResponse.body);
        } else next();
      })
      .catch((e) =>
        res.status(500).send({ error: "An unkown error occurred!" })
      );
  };
}
