import buildGetPublishedArticle from "./get-published-article";
import buildGetPublishedArticleController from "./get-published-article-controller";
import {
  Editor,
  Article,
  Subject,
  Comment,
  User,
  Like,
} from "../../../database/models";

const getPublishedArticle = buildGetPublishedArticle({
  Editor,
  Article,
  Subject,
  Comment,
  User,
  Like,
});

const getPublishedArticleController = buildGetPublishedArticleController({
  getPublishedArticle,
});

module.exports = {
  getPublishedArticle,
  getPublishedArticleController,
};
