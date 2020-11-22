export default function buildUpdateDescriptionController({
  updateDescription,
}) {
  return async function updateDescriptionController(httpRequest) {
    try {
      const updateInfo = httpRequest.body;
      const { userToken } = httpRequest;
      await updateDescription({ ...updateInfo, userToken });
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
