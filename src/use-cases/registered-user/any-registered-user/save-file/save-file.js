export default function buildSaveFile({ File, User }) {
  return async function saveFile({ userToken, key }) {
    if (!userToken) {
      throw new Error("User token required!");
    }

    const userExists = await User.findOne({
      where: {
        id: userToken.userId,
      },
    });

    if (!userExists) {
      throw new Error("No user found with this id!");
    }

    const fileExists = await File.findOne({
      where: {
        key,
        toBeDeleted: true,
        userId: userToken.userId,
      },
    });

    if (!fileExists) {
      throw new Error("No unsaved file found with this key and user id!");
    }

    // eslint-disable-next-line no-unused-vars
    const [numberOfUpdatedFiles, updatedUsers] = await User.update(
      {
        toBeDeleted: false,
      },
      {
        where: {
          key,
        },
        individualHooks: true,
      }
    );

    return numberOfUpdatedFiles;
  };
}
