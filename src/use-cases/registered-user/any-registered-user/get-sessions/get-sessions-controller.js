export default function buildGetSessionsController({ getSessions }) {
  return async function getSessionsController(httpRequest) {
    try {
      const { userToken } = httpRequest;
      const sessions = await getSessions({ userToken });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          sessions,
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
