export default function buildInvalidateEditorController({ invalidateEditor }) {
  return async function invalidateEditorController(httpRequest) {
    try {
      const { editorId } = httpRequest.params;
      const { userToken } = httpRequest;
      await invalidateEditor({ editorId, userToken });
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
