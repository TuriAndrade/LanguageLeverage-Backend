import buildUpdateArticle from "./update-article";
import buildUpdateArticleController from "./update-article-controller";
import { Editor, Article } from "../../../../database/models";
import createArticle from "../../../../entities/article";

const { Op } = require("sequelize");

const updateArticle = buildUpdateArticle({
  Editor,
  Article,
  createArticle,
  Op,
});

const updateArticleController = buildUpdateArticleController({
  updateArticle,
});

module.exports = {
  updateArticle,
  updateArticleController,
};
