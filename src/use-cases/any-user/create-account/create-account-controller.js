export default function buildCreateAccountController({ createAccount }) {
  return async function createAccountController(httpRequest) {
    try {
      const editorInfo = httpRequest.body;
      await createAccount(editorInfo);
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
