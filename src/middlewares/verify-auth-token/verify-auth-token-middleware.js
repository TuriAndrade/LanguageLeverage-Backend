export default function buildVerifyAuthTokenMiddleware({ verifyAuthToken }) {
  return async function verifyAuthTokenMiddleware(httpRequest) {
    try {
      const { authToken } = httpRequest.cookies;
      const decodedToken = await verifyAuthToken({ token: authToken });

      httpRequest.userToken = decodedToken;

      return null;
    } catch (error) {
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: { error: error.message },
      };
    }
  };
}
