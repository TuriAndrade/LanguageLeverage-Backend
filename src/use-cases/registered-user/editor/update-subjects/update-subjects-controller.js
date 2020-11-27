export default function buildUpdateSubjectsController({ updateSubjects }) {
  return async function updateSubjectsController(httpRequest) {
    try {
      const subjectInfo = httpRequest.body;
      const { userToken } = httpRequest;
      await updateSubjects({
        ...subjectInfo,
        userToken,
      });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 204,
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
