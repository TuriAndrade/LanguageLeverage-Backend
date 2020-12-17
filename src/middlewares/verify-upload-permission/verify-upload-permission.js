export default function buildVerifyUploadPermission({ Admin, Editor }) {
  return async function verifyUploadPermisison({ userToken }) {
    if (!userToken) {
      throw new Error("User token required!");
    }

    if (userToken.adminId) {
      const admin = await Admin.findOne({
        where: {
          id: userToken.adminId,
        },
      });

      if (!admin) {
        throw new Error("No admin found with this id!");
      }
    } else {
      const editor = await Editor.findOne({
        where: {
          id: userToken.editorId,
          isValidated: true,
        },
      });

      if (!editor) {
        throw new Error("No validated editor found with this id!");
      }
    }

    return null;
  };
}
