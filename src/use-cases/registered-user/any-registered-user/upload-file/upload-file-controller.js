export default function buildUploadFileController({ uploadFile }) {
  return async function uploadFileController(httpRequest) {
    try {
      const { key, originalname, location } = httpRequest.file;
      const { userToken } = httpRequest;
      const file = await uploadFile({
        userToken,
        key,
        name: originalname,
        path: location,
      });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: file,
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
