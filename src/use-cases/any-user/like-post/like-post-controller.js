export default function buildLikePostController({ likePost }) {
  return async function likePostController(httpRequest) {
    try {
      const likeInfo = httpRequest.body;
      const { userToken } = httpRequest;
      const likeResult = await likePost({
        userToken,
        ...likeInfo,
      });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: likeResult,
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
