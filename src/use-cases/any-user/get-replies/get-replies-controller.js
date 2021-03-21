export default function buildGetRepliesController({ getReplies }) {
  return async function getRepliesController(httpRequest) {
    try {
      const repliesInfo = httpRequest.body;
      const { commentId } = httpRequest.params;
      const replies = await getReplies({
        commentId,
        ...repliesInfo,
      });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: replies,
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
