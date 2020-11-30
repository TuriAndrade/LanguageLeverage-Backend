export default function buildGetEditors({ User, Editor, Admin }) {
  return async function getEditors({ userToken }) {
    if (!userToken) {
      throw new Error("User token is required!");
    }

    const admin = await Admin.findOne({
      where: {
        id: userToken.adminId,
      },
    });

    if (!admin) {
      throw new Error("No admin found with this id!");
    }

    const editors = await Editor.findAll({
      include: {
        model: User,
        attributes: ["login", "name", "email", "picture", "id"],
      },
    });

    return { editors };
  };
}
