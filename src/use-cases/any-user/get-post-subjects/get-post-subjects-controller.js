export default function buildGetPostSubjectsController({ getPostSubjects }) {
  return async function getPostSubjectsController(httpRequest) {
    try {
      const { articleId } = httpRequest.params;
      const subjects = await getPostSubjects({ articleId });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: subjects,
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
