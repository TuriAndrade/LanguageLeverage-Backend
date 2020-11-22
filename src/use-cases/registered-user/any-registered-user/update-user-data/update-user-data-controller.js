export default function buildUpdateUserDataController({ updateUserData }) {
  return async function updateUserDataController(httpRequest) {
    try {
      const updateInfo = httpRequest.body;
      const { userToken } = httpRequest;
      await updateUserData({ ...updateInfo, userToken });
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
