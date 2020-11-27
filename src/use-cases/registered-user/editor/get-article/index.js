import buildGetArticle from "./get-article";
import buildGetArticleController from "./get-article-controller";
import { Editor, Article, Subject } from "../../../../database/models";

const getArticle = buildGetArticle({ Editor, Article, Subject });

const getArticleController = buildGetArticleController({ getArticle });

module.exports = {
  getArticle,
  getArticleController,
};
