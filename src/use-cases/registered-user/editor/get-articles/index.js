import buildGetArticles from "./get-articles";
import buildGetArticlesController from "./get-articles-controller";
import { Editor, Article, Subject } from "../../../../database/models";

const getArticles = buildGetArticles({ Editor, Article, Subject });

const getArticlesController = buildGetArticlesController({ getArticles });

module.exports = {
  getArticles,
  getArticlesController,
};
