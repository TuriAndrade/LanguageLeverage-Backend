export default function buildUploadFile({ File, User, createFile }) {
  return async function uploadFile({ userToken, key, name, path }) {
    if (!userToken) {
      throw new Error("User token required!");
    }

    const exists = await User.findOne({
      where: {
        id: userToken.userId,
      },
    });

    if (!exists) {
      throw new Error("No user found with this id!");
    }

    const file = createFile({
      userId: userToken.userId,
      key,
      name,
      path,
    });

    const createdFile = await File.create({
      path: file.getPath(),
      key: file.getKey(),
      name: file.getName(),
      userId: file.getUserId(),
    });

    return {
      key: createdFile.key,
      originalname: createdFile.name,
      link: createdFile.path,
    };
  };
}
