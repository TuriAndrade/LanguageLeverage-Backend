export default function buildLikePostController({ likePost }) {
  return async function likePostController(httpRequest) {
    try {
      const likeInfo = httpRequest.body;
      const likeResult = await likePost({
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
