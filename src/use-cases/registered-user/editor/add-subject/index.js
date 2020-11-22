import buildAddSubject from "./add-subject";
import buildAddSubjectController from "./add-subject-controller";
import createSubject from "../../../../entities/subject";
import { Article, Subject, Editor } from "../../../../database/models";

const addSubject = buildAddSubject({
  Article,
  Subject,
  Editor,
  createSubject,
});

const addSubjectController = buildAddSubjectController({
  addSubject,
});

module.exports = {
  addSubject,
  addSubjectController,
};
