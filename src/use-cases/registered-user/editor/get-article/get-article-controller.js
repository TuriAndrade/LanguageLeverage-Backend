export default function buildGetArticleController({ getArticle }) {
  return async function getArticleController(httpRequest) {
    try {
      const { userToken } = httpRequest;
      const { articleId } = httpRequest.params;
      const article = await getArticle({ userToken, articleId });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: article,
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
