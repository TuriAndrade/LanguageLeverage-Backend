import buildGetArticles from "./get-articles";
import buildGetArticlesController from "./get-articles-controller";
import { Editor, Article } from "../../../../database/models";

const getArticles = buildGetArticles({ Editor, Article });

const getArticlesController = buildGetArticlesController({ getArticles });

module.exports = {
  getArticles,
  getArticlesController,
};
