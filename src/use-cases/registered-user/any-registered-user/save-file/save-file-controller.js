export default function buildSaveFileController({ saveFile }) {
  return async function saveFileController(httpRequest) {
    try {
      const { key } = httpRequest.params;
      const { userToken } = httpRequest;
      await saveFile({ userToken, key });
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
