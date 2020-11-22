export default function buildGetGenericCsrfTokenController({
  getGenericCsrfToken,
}) {
  return async function getGenericCsrfTokenController(httpRequest) {
    try {
      const token = getGenericCsrfToken();
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
