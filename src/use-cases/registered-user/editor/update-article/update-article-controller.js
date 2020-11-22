export default function buildUpdateArticleController({ updateArticle }) {
  return async function updateArticleController(httpRequest) {
    try {
      const updateInfo = httpRequest.body;
      const { articleId } = httpRequest.params;
      const { userToken } = httpRequest;
      await updateArticle({ ...updateInfo, userToken, articleId });
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
