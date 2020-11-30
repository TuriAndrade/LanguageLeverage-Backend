import buildGetEditorArticles from "./get-editor-articles";
import buildGetEditorArticlesController from "./get-editor-articles-controller";
import { Editor, Article, Subject, Admin } from "../../../../database/models";

const getEditorArticles = buildGetEditorArticles({
  Editor,
  Article,
  Subject,
  Admin,
});

const getEditorArticlesController = buildGetEditorArticlesController({
  getEditorArticles,
});

module.exports = {
  getEditorArticles,
  getEditorArticlesController,
};
