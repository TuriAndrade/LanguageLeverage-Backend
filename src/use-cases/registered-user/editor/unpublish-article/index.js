import buildUnpublishArticle from "./unpublish-article";
import buildUnpublishArticleController from "./unpublish-article-controller";
import { Editor, Article } from "../../../../database/models";

const unpublishArticle = buildUnpublishArticle({
  Article,
  Editor,
});

const unpublishArticleController = buildUnpublishArticleController({
  unpublishArticle,
});

module.exports = {
  unpublishArticle,
  unpublishArticleController,
};
