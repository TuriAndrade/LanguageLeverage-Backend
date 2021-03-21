export default function buildHandleFileMiddleware({ handleFile }) {
  return async function handleFileMiddleware(httpRequest) {
    try {
      const { file } = httpRequest;
      httpRequest.file = await handleFile({ file });

      return null;
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
