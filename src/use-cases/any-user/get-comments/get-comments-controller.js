export default function buildGetCommentsController({ getComments }) {
  return async function getCommentsController(httpRequest) {
    try {
      const commentsInfo = httpRequest.body;
      const { articleId } = httpRequest.params;
      const comments = await getComments({
        articleId,
        ...commentsInfo,
      });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: comments,
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
