import buildDeleteArticle from "./delete-article";
import buildDeleteArticleController from "./delete-article-controller";
import { Article } from "../../../../database/models";

const deleteArticle = buildDeleteArticle({
  Article,
});

const deleteArticleController = buildDeleteArticleController({
  deleteArticle,
});

module.exports = {
  deleteArticle,
  deleteArticleController,
};
