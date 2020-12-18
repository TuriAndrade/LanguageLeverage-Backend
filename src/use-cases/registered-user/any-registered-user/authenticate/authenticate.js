export default function buildAuthenticate({ createToken, Editor, Admin }) {
  return async function authenticate({ userToken }) {
    if (!userToken) throw new Error("User token is required!");

    const editor = await Editor.findOne({
      where: {
        userId: userToken.userId,
      },
    });

    const admin = await Admin.findOne({
      where: {
        userId: userToken.userId,
      },
    });

    const tokenData = {
      userId: userToken.userId,
      adminId: userToken.adminId,
      editorId: userToken.editorId,
      isValidated: editor ? editor.isValidated : undefined,
      hasFullPermission: admin ? admin.hasFullPermission : undefined,
      reqInfo: userToken.reqInfo,
    };

    const token = createToken(
      tokenData,
      process.env.JWT_AUTHENTICATION,
      60 * 60 * 24 * 7 // one week
    );

    return {
      token,
      isAdmin: userToken.adminId ? true : undefined,
      isEditor: userToken.editorId ? true : undefined,
      isValidated: userToken.isValidated,
      hasFullPermission: userToken.hasFullPermission,
    };
  };
}
