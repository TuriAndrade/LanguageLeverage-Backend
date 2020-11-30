export default function buildDeleteUser({ User, Admin }) {
  return async function deleteUser({ userToken, userId }) {
    if (!userToken) {
      throw new Error("User token is required!");
    }

    if (!userId) {
      throw new Error("User id is required!");
    }

    const admin = await Admin.findOne({
      where: {
        id: userToken.adminId,
        hasFullPermission: true,
      },
    });

    if (!admin) {
      throw new Error("No full admin found with this id!");
    }

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("No user found with this id!");
    }

    const hasFullPermission = await Admin.findOne({
      where: {
        userId,
        hasFullPermission: true,
      },
    });

    if (hasFullPermission) {
      throw new Error("You can't delete a fully permitted admin!");
    }

    const numberOfDestroyedUsers = await User.destroy({
      where: {
        id: userId,
      },
    });

    return numberOfDestroyedUsers;
  };
}
