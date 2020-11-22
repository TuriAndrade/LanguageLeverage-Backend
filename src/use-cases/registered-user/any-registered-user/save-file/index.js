import buildSaveFileController from "./save-file-controller";
import buildSaveFile from "./save-file";
import { File, User } from "../../../../database/models";

const saveFile = buildSaveFile({ File, User });

const saveFileController = buildSaveFileController({ saveFile });

module.exports = {
  saveFileController,
  saveFile,
};
