import buildUploadFileController from "./upload-file-controller";
import buildUploadFile from "./upload-file";
import { File, User } from "../../../../database/models";
import createFile from "../../../../entities/file";

const uploadFile = buildUploadFile({ File, User, createFile });

const uploadFileController = buildUploadFileController({ uploadFile });

module.exports = {
  uploadFileController,
  uploadFile,
};
