export default function buildUpdateDescription({ Editor, createEditor }) {
  return async function updateDescription({ userToken, description }) {
    if (!userToken) {
      throw new Error("User token is required!");
    }

    if (!description) {
      throw new Error("Values must be provided!");
    }

    const editor = Editor.findOne({
      where: {
        id: userToken.editorId,
      },
    });

    if (!editor) {
      throw new Error("No editor found with this id!");
    }

    const newEditor = createEditor({
      description,
      withNoUser: true,
      withNoUserId: true,
    });

    const [numberOfUpdatedEditors, updatedEditor] = await Editor.update(
      {
        description: newEditor.getDescription(),
      },
      {
        where: {
          id: userToken.editorId,
        },
        individualHooks: true,
      }
    );

    return numberOfUpdatedEditors;
  };
}
