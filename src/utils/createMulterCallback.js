const multer = require("multer");

export default function createMulterCallback(upload) {
  return (req, res, next) => {
    upload(req, res, (error) => {
      if (error instanceof multer.MulterError) {
        res.status(400).send({ error: error.message });
      } else if (req.mimetypeError) {
        res.status(400).send({ error: req.mimetypeError });
      } else if (error) {
        res.status(500).send({ error: "An unkown error occurred!" });
      } else {
        next();
      }
    });
  };
}
