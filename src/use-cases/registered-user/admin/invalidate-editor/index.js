import buildInvalidateEditor from "./invalidate-editor";
import buildInvalidateEditorController from "./invalidate-editor-controller";
import { Admin, Editor } from "../../../../database/models";

const invalidateEditor = buildInvalidateEditor({
  Admin,
  Editor,
});

const invalidateEditorController = buildInvalidateEditorController({
  invalidateEditor,
});

module.exports = {
  invalidateEditor,
  invalidateEditorController,
};
