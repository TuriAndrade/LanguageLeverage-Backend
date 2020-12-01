export default function buildGetFeedController({ getFeed }) {
  return async function getFeedController(httpRequest) {
    try {
      const feedInfo = httpRequest.body;
      const feed = await getFeed({
        ...feedInfo,
      });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: feed,
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
