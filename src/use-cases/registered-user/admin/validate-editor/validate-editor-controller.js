export default function buildValidateEditorController({ validateEditor }) {
  return async function validateEditorController(httpRequest) {
    try {
      const { editorId } = httpRequest.params;
      const { userToken } = httpRequest;
      await validateEditor({ editorId, userToken });
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
