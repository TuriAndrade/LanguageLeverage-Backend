export default function buildGetUserController({ getUser }) {
  return async function getUserController(httpRequest) {
    try {
      const { userToken } = httpRequest;

      const user = await getUser({ userToken });

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          user,
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
