export default function buildDeleteSubjectController({ deleteSubject }) {
  return async function deleteSubjectController(httpRequest) {
    try {
      const { subjectId } = httpRequest.params;
      const { userToken } = httpRequest;
      await deleteSubject({ subjectId, userToken });
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
