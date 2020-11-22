export default function buildDeleteFile({
  aws,
  path,
  promisify,
  fs,
  File,
  User,
}) {
  return async function deleteFile({ userToken, key }) {
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
        userId: userToken.userId,
      },
    });

    if (!fileExists) {
      throw new Error("No file found with this key and user id!");
    }

    if (process.env.FILE_STORAGE_TYPE === "s3") {
      const S3 = new aws.S3({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
        region: process.env.AWS_S3_DEFAULT_REGION,
        sslEnabled: true,
      });

      return S3.deleteObject({
        Bucket: "language-leverage-files",
        Key: key,
      }).promise();
    } else if (process.env.FILE_STORAGE_TYPE === "local") {
      return promisify(fs.unlink)(
        path.resolve(
          __dirname,
          "..",
          "..",
          "..",
          "..",
          "..",
          "tmp",
          "uploads",
          key
        )
      );
    }

    const numberOfDestroyedFiles = await File.destroy({
      where: {
        key,
      },
    });

    return numberOfDestroyedFiles;
  };
}
