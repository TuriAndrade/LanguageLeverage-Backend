export default function buildDeleteAnyArticleController({ deleteAnyArticle }) {
  return async function deleteAnyArticleController(httpRequest) {
    try {
      const { articleId } = httpRequest.params;
      const { userToken } = httpRequest;
      await deleteAnyArticle({ articleId, userToken });
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
