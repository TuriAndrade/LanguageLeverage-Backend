export default function buildUnpublishAnyArticleController({
  unpublishAnyArticle,
}) {
  return async function unpublishAnyArticleController(httpRequest) {
    try {
      const { articleId } = httpRequest.params;
      const { userToken } = httpRequest;
      await unpublishAnyArticle({ articleId, userToken });
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
