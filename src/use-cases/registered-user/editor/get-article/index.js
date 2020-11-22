import buildGetArticle from "./get-article";
import buildGetArticleController from "./get-article-controller";
import { Editor, Article } from "../../../../database/models";

const getArticle = buildGetArticle({ Editor, Article });

const getArticleController = buildGetArticleController({ getArticle });

module.exports = {
  getArticle,
  getArticleController,
};
