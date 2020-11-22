export default function buildLogoutController({ logout }) {
  return async function logoutController(httpRequest) {
    try {
      const { userToken } = httpRequest;
      await logout({ userToken });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 204,
        clearCookie: {
          name: "authToken",
        },
      };
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
