export default function buildAuthenticate({ createToken }) {
  return function authenticate({ userToken }) {
    if (!userToken) throw new Error("User token is required!");

    const tokenData = {
      userId: userToken.userId,
      adminId: userToken.adminId,
      editorId: userToken.editorId,
      isValidated: userToken.isValidated,
      hasFullPermission: userToken.hasFullPermission,
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
