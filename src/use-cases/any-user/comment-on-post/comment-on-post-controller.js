export default function buildCommentOnPostController({ commentOnPost }) {
  return async function commentOnPostController(httpRequest) {
    try {
      const commentInfo = httpRequest.body;
      const { userToken } = httpRequest;
      const commentResult = await commentOnPost({
        userToken,
        ...commentInfo,
      });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: commentResult,
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
