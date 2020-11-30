export default function buildGetAdminsController({ getAdmins }) {
  return async function getAdminsController(httpRequest) {
    try {
      const { userToken } = httpRequest;
      const admins = await getAdmins({ userToken });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: admins,
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
