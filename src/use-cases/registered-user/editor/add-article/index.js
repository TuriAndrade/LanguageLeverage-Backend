import buildAddArticle from "./add-article";
import buildAddArticleController from "./add-article-controller";
import { Article, Editor } from "../../../../database/models";
import createArticle from "../../../../entities/article";

const addArticle = buildAddArticle({
  Article,
  Editor,
  createArticle,
});

const addArticleController = buildAddArticleController({
  addArticle,
});

module.exports = {
  addArticle,
  addArticleController,
};
