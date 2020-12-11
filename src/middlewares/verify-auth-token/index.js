import buildVerifyAuthTokenMiddleware from "./verify-auth-token-middleware";
import buildVerifyOptionalAuthTokenMiddleware from "./verify-optional-auth-token-middleware";
import buildVerifyAuthToken from "./verify-auth-token";
import sessionsDb from "../../database/sessions-db";

const jwt = require("jsonwebtoken");

const verifyAuthToken = buildVerifyAuthToken({ sessionsDb, jwt });

const verifyAuthTokenMiddleware = buildVerifyAuthTokenMiddleware({
  verifyAuthToken,
});

const verifyOptionalAuthTokenMiddleware = buildVerifyOptionalAuthTokenMiddleware(
  {
    verifyAuthToken,
  }
);

module.exports = {
  verifyAuthToken,
  verifyAuthTokenMiddleware,
  verifyOptionalAuthTokenMiddleware,
};
