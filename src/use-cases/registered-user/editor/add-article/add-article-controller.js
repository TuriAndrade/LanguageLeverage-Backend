export default function buildAddArticleController({ addArticle }) {
  return async function addArticleController(httpRequest) {
    try {
      const articleInfo = httpRequest.body;
      const { userToken } = httpRequest;
      const articleResult = await addArticle({ ...articleInfo, userToken });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: articleResult,
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
