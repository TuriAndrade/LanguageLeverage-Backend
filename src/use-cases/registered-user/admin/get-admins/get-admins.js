export default function buildGetAdmins({ User, Admin }) {
  return async function getAdmins({ userToken }) {
    if (!userToken) {
      throw new Error("User token is required!");
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

    const admins = await Admin.findAll();

    const handledAdmins = await Promise.all(
      admins.map((admin) => {
        return User.findOne({
          where: {
            id: admin.userId,
          },
        }).then((user) => {
          return {
            ...admin.dataValues,
            isYou: user.id === userToken.userId,
            User: {
              email: user.email,
              id: user.id,
              name: user.name,
              picture: user.picture,
              login: user.login,
            },
          };
        });
      })
    );

    return { admins: handledAdmins };
  };
}
