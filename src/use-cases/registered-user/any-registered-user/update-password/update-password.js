export default function buildUpdatePassword({ User, createUser, bcrypt }) {
  return async function updatePassword({
    userToken,
    oldPassword,
    newPassword,
  }) {
    if (!userToken) {
      throw new Error("User token required!");
    }

    if (!newPassword) {
      throw new Error("Values must be provided!");
    }

    const user = await User.findOne({
      where: {
        id: userToken.userId,
      },
    });

    if (!user) {
      throw new Error("No user found with this id!");
    }

    const checkPassword = await bcrypt.compare(oldPassword, user.passwordHash);

    if (!checkPassword) {
      throw new Error("Incorrect password!");
    }

    const newUser = createUser({
      login: user.login,
      password: newPassword,
      email: user.email,
      name: user.name,
    });

    const [numberOfUpdatedUsers, updatedUsers] = await User.update(
      {
        password: newUser.getPassword(),
      },
      {
        where: {
          id: userToken.userId,
        },
        individualHooks: true,
      }
    );

    return numberOfUpdatedUsers;
  };
}
