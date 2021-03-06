export default function buildUnpublishArticleController({ unpublishArticle }) {
  return async function unpublishArticleController(httpRequest) {
    try {
      const { articleId } = httpRequest.params;
      const { userToken } = httpRequest;
      const unpublishInfo = httpRequest.body;
      await unpublishArticle({ ...unpublishInfo, articleId, userToken });
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
