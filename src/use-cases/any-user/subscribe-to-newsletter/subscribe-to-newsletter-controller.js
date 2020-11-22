export default function buildSubscribeToNewsletterController({
  subscribeToNewsletter,
}) {
  return async function subscribeToNewsletterController(httpRequest) {
    try {
      const subscriptionInfo = httpRequest.body;
      const subscriptionResult = await subscribeToNewsletter({
        ...subscriptionInfo,
      });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: subscriptionResult,
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
