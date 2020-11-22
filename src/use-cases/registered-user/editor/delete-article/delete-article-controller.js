export default function buildDeleteArticleController({ deleteArticle }) {
  return async function deleteArticleController(httpRequest) {
    try {
      const { articleId } = httpRequest.params;
      const { userToken } = httpRequest;
      await deleteArticle({ articleId, userToken });
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
