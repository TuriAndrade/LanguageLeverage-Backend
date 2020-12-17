export default function buildVerifyUploadPermissionMiddleware({
  verifyUploadPermission,
}) {
  return async function verifyUploadPermissionMiddleware(httpRequest) {
    try {
      const { userToken } = httpRequest;
      await verifyUploadPermission({ userToken });

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
