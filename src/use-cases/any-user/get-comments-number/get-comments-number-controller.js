export default function buildGetCommentsNumberController({
  getCommentsNumber,
}) {
  return async function getCommentsNumberController(httpRequest) {
    try {
      const { articleId } = httpRequest.params;
      const nComments = await getCommentsNumber({
        articleId,
      });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: nComments,
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
