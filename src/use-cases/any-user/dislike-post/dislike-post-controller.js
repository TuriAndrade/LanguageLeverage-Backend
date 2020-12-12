export default function buildDislikePostController({ dislikePost }) {
  return async function dislikePostController(httpRequest) {
    try {
      const dislikeInfo = httpRequest.body;
      const { userToken } = httpRequest;
      const dislikeResult = await dislikePost({
        userToken,
        ...dislikeInfo,
      });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: dislikeResult,
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
