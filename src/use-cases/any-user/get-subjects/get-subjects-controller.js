export default function buildGetSubjectsController({ getSubjects }) {
  return async function getSubjectsController(httpRequest) {
    try {
      const subjectsInfo = httpRequest.body;
      const subjects = await getSubjects({ ...subjectsInfo });
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
