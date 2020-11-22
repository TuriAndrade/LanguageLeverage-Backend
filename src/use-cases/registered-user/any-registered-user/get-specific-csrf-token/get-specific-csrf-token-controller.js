export default function buildGetSpecificCsrfTokenController({
  getSpecificCsrfToken,
}) {
  return async function getSpecificCsrfTokenController(httpRequest) {
    try {
      const { userToken } = httpRequest;
      const token = getSpecificCsrfToken({ userToken });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          token,
        },
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
