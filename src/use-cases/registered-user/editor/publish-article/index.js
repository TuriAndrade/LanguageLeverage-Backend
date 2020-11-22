import buildPublishArticle from "./publish-article";
import buildPublishArticleController from "./publish-article-controller";
import { Editor, Article } from "../../../../database/models";

const publishArticle = buildPublishArticle({
  Article,
  Editor,
});

const publishArticleController = buildPublishArticleController({
  publishArticle,
});

module.exports = {
  publishArticle,
  publishArticleController,
};
