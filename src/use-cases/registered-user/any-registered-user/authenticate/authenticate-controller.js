export default function buildAuthenticateController({ authenticate }) {
  return async function authenticateController(httpRequest) {
    try {
      const { userToken } = httpRequest;
      const {
        token,
        isAdmin,
        isEditor,
        isValidated,
        hasFullPermission,
      } = await authenticate({ userToken });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          isAdmin,
          isEditor,
          isValidated,
          hasFullPermission,
        },
        cookie: {
          name: "authToken",
          data: token,
          options: {
            sameSite: "None",
            secure: true,
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000), // one week in miliseconds
          },
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
