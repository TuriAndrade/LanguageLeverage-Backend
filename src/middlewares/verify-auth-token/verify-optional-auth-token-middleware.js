export default function buildVerifyOptionalAuthTokenMiddleware({
  verifyAuthToken,
}) {
  return async function verifyOptionalAuthTokenMiddleware(httpRequest) {
    try {
      const { authToken } = httpRequest.cookies;
      const decodedToken = await verifyAuthToken({ token: authToken });

      httpRequest.userToken = decodedToken;

      return null;
    } catch (error) {
      return null;
    }
  };
}
