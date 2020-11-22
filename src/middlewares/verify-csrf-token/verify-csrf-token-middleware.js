export default function buildVerifyCsrfTokenMiddleware({ verifyCsrfToken }) {
  return async function verifyCsrfTokenMiddleware(httpRequest) {
    try {
      const { userToken } = httpRequest;
      const { csrftoken } = httpRequest.headers;
      await verifyCsrfToken({ token: csrftoken, userToken });

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
