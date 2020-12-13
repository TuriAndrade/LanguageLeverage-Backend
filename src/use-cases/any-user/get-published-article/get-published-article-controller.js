export default function buildGetPublishedArticleController({
  getPublishedArticle,
}) {
  return async function getPublishedArticleController(httpRequest) {
    try {
      const { articleId } = httpRequest.params;
      const { userToken } = httpRequest;
      const articleInfo = httpRequest.body;
      const article = await getPublishedArticle({
        articleId,
        userToken,
        ...articleInfo,
      });
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
