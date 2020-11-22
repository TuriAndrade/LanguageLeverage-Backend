export default function buildInvalidateEditor({ Admin, Editor }) {
  return async function invalidateEditor({ userToken, editorId }) {
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
        isValidated: true,
      },
    });

    if (!editor) {
      throw new Error("No validated editor found with this id!");
    }

    const [numberOfUpdatedEditors, updatedEditors] = await Editor.update(
      {
        isValidated: false,
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
