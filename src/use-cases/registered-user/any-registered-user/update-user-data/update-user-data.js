export default function buildUpdateUserData({ User, createUser }) {
  return async function updateUserData({
    userToken,
    login,
    email,
    name,
    picture,
  }) {
    if (!userToken) {
      throw new Error("User token required!");
    }

    if (!login && !email && !name && !picture && picture !== null) {
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

    if (login) {
      const loginAlreadyExists = await User.findOne({
        where: {
          login,
        },
      });

      if (loginAlreadyExists && login !== user.login) {
        throw new Error("Login already exists!");
      }
    }

    if (email) {
      const emailAlreadyExists = await User.findOne({
        where: {
          email,
        },
      });

      if (emailAlreadyExists && email !== user.email) {
        throw new Error("Email already exists!");
      }
    }

    const newUser = createUser({
      login: login || user.login,
      email: email || user.email,
      name: name || user.name,
      picture: !picture && picture !== null ? user.picture : picture,
      withNoPassword: true,
    });

    const [numberOfUpdatedUsers, updatedUsers] = await User.update(
      {
        login: newUser.getLogin(),
        name: newUser.getName(),
        email: newUser.getEmail(),
        picture: newUser.getPicture(),
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
