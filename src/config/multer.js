const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

const storageOptions = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve("tmp", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        file.key = `${hash.toString("hex")}-${file.originalname}`;

        file.location = `${process.env.APP_URL}/files/${file.key}`;

        cb(null, file.key);
      });
    },
  }),

  s3: multerS3({
    s3: new aws.S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      region: process.env.AWS_S3_DEFAULT_REGION,
      sslEnabled: true,
    }),
    bucket: "language-leverage-files",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),

  memory: multer.memoryStorage(),
};

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  // storage: storageOptions[process.env.FILE_STORAGE_TYPE],
  storage: storageOptions.memory,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "video/mp4",
      "video/mpeg",
      "video/avi",
      "video/webm",
      "audio/mp3",
      "audio/mpeg",
      "audio/opus",
      "audio/m4a",
      "audio/webm",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      req.mimetypeError = "Invalid type!";
      cb(new Error("Invalid type!"));
      /*
        If I only throw the error, I can't identify exactly what happened.
        So, I add the mimetypeError property to the request
      */
    }
  },
};
