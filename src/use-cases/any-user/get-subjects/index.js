import buildGetSubjects from "./get-subjects";
import buildGetSubjectsController from "./get-subjects-controller";
import { Subject } from "../../../database/models";
import { Op } from "sequelize";

const getSubjects = buildGetSubjects({ Subject, Op });

const getSubjectsController = buildGetSubjectsController({ getSubjects });

module.exports = {
  getSubjects,
  getSubjectsController,
};
