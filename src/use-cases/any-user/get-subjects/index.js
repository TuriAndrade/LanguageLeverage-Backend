import buildGetSubjects from "./get-subjects";
import buildGetSubjectsController from "./get-subjects-controller";
import { Subject } from "../../../database/models";

const getSubjects = buildGetSubjects({ Subject });

const getSubjectsController = buildGetSubjectsController({ getSubjects });

module.exports = {
  getSubjects,
  getSubjectsController,
};
