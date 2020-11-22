export default function buildDeleteAccount({ User, bcrypt }) {
  return async function deleteAccount({ userToken, password }) {
    if (!userToken) {
      throw new Error("User token required!");
    }

    const user = await User.findOne({
      where: {
        id: userToken.userId,
      },
    });

    if (!user) {
      throw new Error("No user found with this id!");
    }

    const correctPassword = await bcrypt.compare(password, user.passwordHash);

    if (!correctPassword) {
      throw new Error("Incorrect password!");
    }

    const numberOfDestroyedUsers = await User.destroy({
      where: {
        id: userToken.userId,
      },
    });

    if (numberOfDestroyedUsers === 0) {
      throw new Error("Data error!");
    }

    return numberOfDestroyedUsers;
  };
}
