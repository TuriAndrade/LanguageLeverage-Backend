export default function buildDeleteAccountController({ deleteAccount }) {
  return async function deleteAccountController(httpRequest) {
    try {
      const deleteAccountInfo = httpRequest.body;
      const { userToken } = httpRequest;
      await deleteAccount({ ...deleteAccountInfo, userToken });
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
