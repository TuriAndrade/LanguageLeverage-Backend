import buildGetPublishedArticle from "./get-published-article";
import buildGetPublishedArticleController from "./get-published-article-controller";
import { Article, Editor, User } from "../../../database/models";

const getPublishedArticle = buildGetPublishedArticle({
  Article,
  Editor,
  User,
});

const getPublishedArticleController = buildGetPublishedArticleController({
  getPublishedArticle,
});

module.exports = {
  getPublishedArticle,
  getPublishedArticleController,
};
