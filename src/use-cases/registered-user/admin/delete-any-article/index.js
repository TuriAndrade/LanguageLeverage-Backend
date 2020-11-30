import buildDeleteAnyArticle from "./delete-any-article";
import buildDeleteAnyArticleController from "./delete-any-article-controller";
import { Admin, Article } from "../../../../database/models";

const deleteAnyArticle = buildDeleteAnyArticle({ Admin, Article });
const deleteAnyArticleController = buildDeleteAnyArticleController({
  deleteAnyArticle,
});

module.exports = {
  deleteAnyArticle,
  deleteAnyArticleController,
};
