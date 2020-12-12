import buildGetAnyArticle from "./get-any-article";
import buildGetAnyArticleController from "./get-any-article-controller";
import {
  Admin,
  Article,
  Subject,
  Editor,
  User,
} from "../../../../database/models";

const getAnyArticle = buildGetAnyArticle({
  Admin,
  Article,
  Subject,
  Editor,
  User,
});

const getAnyArticleController = buildGetAnyArticleController({ getAnyArticle });

module.exports = {
  getAnyArticle,
  getAnyArticleController,
};
