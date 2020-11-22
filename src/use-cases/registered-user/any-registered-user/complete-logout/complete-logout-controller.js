export default function buildCompleteLogoutController({ completeLogout }) {
  return async function completeLogoutController(httpRequest) {
    try {
      const logoutInfo = httpRequest.body;
      const { userToken } = httpRequest;
      const { thisSessionIncluded } = await completeLogout({
        ...logoutInfo,
        userToken,
      });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          thisSessionIncluded,
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
