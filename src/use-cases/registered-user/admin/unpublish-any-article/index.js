import buildUnpublishAnyArticle from "./unpublish-any-article";
import buildUnpublishAnyArticleController from "./unpublish-any-article-controller";
import { Admin, Article } from "../../../../database/models";

const unpublishAnyArticle = buildUnpublishAnyArticle({ Admin, Article });
const unpublishAnyArticleController = buildUnpublishAnyArticleController({
  unpublishAnyArticle,
});

module.exports = {
  unpublishAnyArticle,
  unpublishAnyArticleController,
};
