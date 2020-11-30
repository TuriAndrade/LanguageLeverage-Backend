import buildGetAnyArticle from "./get-any-article";
import buildGetAnyArticleController from "./get-any-article-controller";
import { Admin, Article, Subject } from "../../../../database/models";

const getAnyArticle = buildGetAnyArticle({ Admin, Article, Subject });

const getAnyArticleController = buildGetAnyArticleController({ getAnyArticle });

module.exports = {
  getAnyArticle,
  getAnyArticleController,
};
