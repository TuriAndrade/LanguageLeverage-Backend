export default function buildGetLikesController({ getLikes }) {
  return async function getLikesController(httpRequest) {
    try {
      const likesInfo = httpRequest.body;
      const { articleId } = httpRequest.params;
      const { userToken } = httpRequest;
      const likes = await getLikes({
        ...likesInfo,
        articleId,
        userToken,
      });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: likes,
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
