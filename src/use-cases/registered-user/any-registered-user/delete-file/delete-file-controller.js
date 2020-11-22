export default function buildDeleteFileController({ deleteFile }) {
  return async function deleteFileController(httpRequest) {
    try {
      const { key } = httpRequest.params;
      const { userToken } = httpRequest;
      await deleteFile({ userToken, key });
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
