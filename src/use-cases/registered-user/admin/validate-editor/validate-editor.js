export default function buildValidateEditor({ Admin, Editor }) {
  return async function validateEditor({ userToken, editorId }) {
    if (!userToken) {
      throw new Error("User token is required!");
    }

    if (!editorId) {
      throw new Error("Editor id is required!");
    }

    const admin = await Admin.findOne({
      where: {
        id: userToken.adminId,
      },
    });

    if (!admin) {
      throw new Error("No admin found with this id!");
    }

    const editor = await Editor.findOne({
      where: {
        id: editorId,
        isValidated: false,
      },
    });

    if (!editor) {
      throw new Error("No invalidated editor found with this id!");
    }

    const [numberOfUpdatedEditors, updatedEditors] = await Editor.update(
      {
        isValidated: true,
      },
      {
        where: {
          id: editorId,
        },
      }
    );

    return numberOfUpdatedEditors;
  };
}
