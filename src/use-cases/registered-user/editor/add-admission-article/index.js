import buildAddAdmissionArticle from "./add-admission-article";
import buildAddAdmissionArticleController from "./add-admission-article-controller";
import { Article, Editor } from "../../../../database/models";
import createArticle from "../../../../entities/article";

const addAdmissionArticle = buildAddAdmissionArticle({
  Article,
  Editor,
  createArticle,
});

const addAdmissionArticleController = buildAddAdmissionArticleController({
  addAdmissionArticle,
});

module.exports = {
  addAdmissionArticle,
  addAdmissionArticleController,
};
