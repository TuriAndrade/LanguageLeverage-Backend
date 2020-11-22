export default function buildGetArticlesController({ getArticles }) {
  return async function getArticlesController(httpRequest) {
    try {
      const { userToken } = httpRequest;
      const articles = await getArticles({ userToken });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: articles,
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
