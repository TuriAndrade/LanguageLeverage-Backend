export default function buildAddSubjectController({ addSubject }) {
  return async function addSubjectController(httpRequest) {
    try {
      const subjectInfo = httpRequest.body;
      const { userToken } = httpRequest;
      const subjectResult = await addSubject({
        ...subjectInfo,
        userToken,
      });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: subjectResult,
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
