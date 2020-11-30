export default function buildGetEditorArticlesController({
  getEditorArticles,
}) {
  return async function getEditorArticlesController(httpRequest) {
    try {
      const { userToken } = httpRequest;
      const { editorId } = httpRequest.params;
      const articles = await getEditorArticles({ userToken, editorId });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: articles,
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
