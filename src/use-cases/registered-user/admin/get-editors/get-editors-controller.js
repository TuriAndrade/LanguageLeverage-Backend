export default function buildGetEditorsController({ getEditors }) {
  return async function getEditorsController(httpRequest) {
    try {
      const { userToken } = httpRequest;
      const editors = await getEditors({ userToken });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: editors,
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
