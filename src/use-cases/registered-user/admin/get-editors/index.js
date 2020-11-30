import buildGetEditors from "./get-editors";
import buildGetEditorsController from "./get-editors-controller";
import { User, Editor, Admin } from "../../../../database/models";

const getEditors = buildGetEditors({ User, Editor, Admin });
const getEditorsController = buildGetEditorsController({ getEditors });

module.exports = {
  getEditors,
  getEditorsController,
};
