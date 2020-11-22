export default function buildAddAdmissionArticleController({
  addAdmissionArticle,
}) {
  return async function addAdmissionArticleController(httpRequest) {
    try {
      const articleInfo = httpRequest.body;
      const { userToken } = httpRequest;
      const articleResult = await addAdmissionArticle({
        ...articleInfo,
        userToken,
      });
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
