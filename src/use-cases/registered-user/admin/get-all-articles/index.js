import buildGetAllArticles from "./get-all-articles";
import buildGetAllArticlesController from "./get-all-articles-controller";
import { Admin, Article, Subject } from "../../../../database/models";

const getAllArticles = buildGetAllArticles({ Admin, Article, Subject });

const getAllArticlesController = buildGetAllArticlesController({
  getAllArticles,
});

module.exports = {
  getAllArticles,
  getAllArticlesController,
};
