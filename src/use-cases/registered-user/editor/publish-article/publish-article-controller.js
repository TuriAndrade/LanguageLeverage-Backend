export default function buildPublishArticleController({ publishArticle }) {
  return async function publishArticleController(httpRequest) {
    try {
      const { articleId } = httpRequest.params;
      const { userToken } = httpRequest;
      await publishArticle({ articleId, userToken });
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
