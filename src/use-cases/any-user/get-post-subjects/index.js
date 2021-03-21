import buildGetPostSubjects from "./get-post-subjects";
import buildGetPostSubjectsController from "./get-post-subjects-controller";
import { Subject } from "../../../database/models";

const getPostSubjects = buildGetPostSubjects({ Subject });

const getPostSubjectsController = buildGetPostSubjectsController({
  getPostSubjects,
});

module.exports = {
  getPostSubjects,
  getPostSubjectsController,
};
