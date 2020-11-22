export default function buildGetUser({ User, Admin, Editor }) {
  return async function getUser({ userToken }) {
    if (!userToken) throw new Error("User token is required!");

    const user = await User.findOne({
      where: {
        id: userToken.userId,
      },
    });

    if (!user) {
      throw new Error("No user found with this id!");
    }

    const editor = userToken.editorId
      ? await Editor.findOne({
          where: {
            id: userToken.editorId,
          },
        })
      : undefined;

    const admin = userToken.adminId
      ? await Admin.findOne({
          where: {
            id: userToken.adminId,
          },
        })
      : undefined;

    return {
      login: user.login,
      name: user.name,
      email: user.email,
      picture: user.picture,
      editor: editor
        ? {
            isValidated: editor.isValidated,
            description: editor.description,
          }
        : undefined,
      admin: admin
        ? {
            hasFullPermission: admin.hasFullPermission,
          }
        : undefined,
    };
  };
}
