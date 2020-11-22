import buildValidateEditor from "./validate-editor";
import buildValidateEditorController from "./validate-editor-controller";
import { Admin, Editor } from "../../../../database/models";

const validateEditor = buildValidateEditor({
  Admin,
  Editor,
});

const validateEditorController = buildValidateEditorController({
  validateEditor,
});

module.exports = {
  validateEditor,
  validateEditorController,
};
