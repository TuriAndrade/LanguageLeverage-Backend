export default function buildDeleteUserController({ deleteUser }) {
  return async function deleteUserController(httpRequest) {
    try {
      const { userId } = httpRequest.params;
      const { userToken } = httpRequest;
      await deleteUser({ userId, userToken });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 204,
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
