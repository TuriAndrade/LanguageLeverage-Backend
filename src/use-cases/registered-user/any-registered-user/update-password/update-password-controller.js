export default function buildUpdatePasswordController({ updatePassword }) {
  return async function updatePasswordControler(httpRequest) {
    try {
      const updateInfo = httpRequest.body;
      const { userToken } = httpRequest;
      await updatePassword({ ...updateInfo, userToken });
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
