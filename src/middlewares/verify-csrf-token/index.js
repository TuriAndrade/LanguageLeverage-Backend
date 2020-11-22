import buildVerifyCsrfTokenMiddleware from "./verify-csrf-token-middleware";
import buildVerifyCsrfToken from "./verify-csrf-token";

const jwt = require("jsonwebtoken");

const verifyCsrfToken = buildVerifyCsrfToken({ jwt });

const verifyCsrfTokenMiddleware = buildVerifyCsrfTokenMiddleware({
  verifyCsrfToken,
});

module.exports = {
  verifyCsrfToken,
  verifyCsrfTokenMiddleware,
};
