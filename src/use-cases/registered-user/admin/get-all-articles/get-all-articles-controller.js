export default function buildGetAllArticlesController({ getAllArticles }) {
  return async function getAllArticlesController(httpRequest) {
    try {
      const { userToken } = httpRequest;
      const articles = await getAllArticles({ userToken });
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
