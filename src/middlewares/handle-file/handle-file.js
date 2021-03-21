export default function buildHandleFile({ sharp, aws, promisify, crypto }) {
  return async function handleFile({ file }) {
    if (!file) {
      throw new Error("File is required!");
    }

    const imageMimes = ["image/jpeg", "image/png", "image/gif"]; // no need to include webp here

    const s3 = new aws.S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      region: process.env.AWS_S3_DEFAULT_REGION,
      sslEnabled: true,
    });

    if (imageMimes.includes(file.mimetype)) {
      const input = await sharp(file.buffer);

      const handledFile = await input
        .metadata()
        .then((metadata) =>
          metadata.width > 640
            ? input.resize({ width: 640 }).toFormat("webp").toBuffer()
            : input.toFormat("webp").toBuffer()
        );

      const randomBytes = promisify(crypto.randomBytes);

      const hash = await randomBytes(16);

      file.key = `${hash.toString("hex")}-${
        file.originalname.slice(0, -file.mimetype.split("/")[1].length) + "webp"
      }`;

      file.originalname =
        file.originalname.slice(0, -file.mimetype.split("/")[1].length) +
        "webp";

      const uploadInfo = await s3
        .upload({
          Body: handledFile,
          Bucket: "language-leverage-files",
          Key: file.key,
          ACL: "public-read",
          ContentType: "image/webp",
        })
        .promise();

      return {
        key: uploadInfo.Key,
        location: uploadInfo.Location,
        originalname: file.originalname,
      };
    } else {
      const randomBytes = promisify(crypto.randomBytes);

      const hash = await randomBytes(16);

      file.key = `${hash.toString("hex")}-${file.originalname}`;

      const uploadInfo = await s3
        .upload({
          Body: file.buffer,
          Bucket: "language-leverage-files",
          Key: file.key,
          ACL: "public-read",
          ContentType: file.mimetype,
        })
        .promise();

      return {
        key: uploadInfo.Key,
        location: uploadInfo.Location,
        originalname: file.originalname,
      };
    }
  };
}
