import buildDeleteSubject from "./delete-subject";
import buildDeleteSubjectController from "./delete-subject-controller";
import { Article, Editor, Subject } from "../../../../database/models";

const deleteSubject = buildDeleteSubject({
  Article,
  Editor,
  Subject,
});

const deleteSubjectController = buildDeleteSubjectController({
  deleteSubject,
});

module.exports = {
  deleteSubject,
  deleteSubjectController,
};
