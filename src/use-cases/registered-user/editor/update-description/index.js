import buildUpdateDescription from "./update-description";
import buildUpdateDescriptionController from "./update-desciption-controller";
import { Editor } from "../../../../database/models";
import createEditor from "../../../../entities/editor";

const updateDescription = buildUpdateDescription({
  Editor,
  createEditor,
});

const updateDescriptionController = buildUpdateDescriptionController({
  updateDescription,
});

module.exports = {
  updateDescription,
  updateDescriptionController,
};
