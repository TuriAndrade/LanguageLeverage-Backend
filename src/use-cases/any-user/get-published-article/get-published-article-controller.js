export default function buildGetPublishedArticleController({
  getPublishedArticle,
}) {
  return async function getPublishedArticleController(httpRequest) {
    try {
      const { articleId } = httpRequest.params;
      const article = await getPublishedArticle({
        articleId,
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
