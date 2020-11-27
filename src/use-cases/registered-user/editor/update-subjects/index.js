import buildUpdateSubjects from "./update-subjects";
import buildUpdateSubjectsController from "./update-subjects-controller";
import createSubject from "../../../../entities/subject";
import { Article, Subject, Editor } from "../../../../database/models";

const updateSubjects = buildUpdateSubjects({
  Article,
  Subject,
  Editor,
  createSubject,
});

const updateSubjectsController = buildUpdateSubjectsController({
  updateSubjects,
});

module.exports = {
  updateSubjects,
  updateSubjectsController,
};
