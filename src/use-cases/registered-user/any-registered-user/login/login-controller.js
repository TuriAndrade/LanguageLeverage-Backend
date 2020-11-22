export default function buildLoginController({ login }) {
  return async function loginController(httpRequest) {
    try {
      const loginInfo = httpRequest.body;
      const reqIp = httpRequest.ip;
      const {
        token,
        firstAdmin,
        isAdmin,
        isEditor,
        isValidated,
        hasFullPermission,
      } = await login({
        ...loginInfo,
        reqIp,
      });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          firstAdmin,
          isAdmin,
          isEditor,
          isValidated,
          hasFullPermission,
        },
        cookie: {
          name: "authToken",
          data: token,
          options: {
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
