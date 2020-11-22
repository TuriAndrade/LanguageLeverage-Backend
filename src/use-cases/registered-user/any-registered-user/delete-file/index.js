import buildDeleteFile from "./delete-file";
import buildDeleteFileController from "./delete-file-controller";
import { File, User } from "../../../../database/models";

const { promisify } = require("util");
const path = require("path");
const fs = require("fs");
const aws = require("aws-sdk");

const deleteFile = buildDeleteFile({ aws, path, promisify, fs, File, User });

const deleteFileController = buildDeleteFileController({ deleteFile });

module.exports = {
  deleteFile,
  deleteFileController,
};
