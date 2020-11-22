export default function buildDeleteArticle({ Article }) {
  return async function deleteArticle({ userToken, articleId }) {
    if (!userToken) {
      throw new Error("User token required!");
    }

    if (!articleId) {
      throw new Error("Article id is required!");
    }

    const article = await Article.findOne({
      where: {
        editorId: userToken.editorId,
        id: articleId,
      },
    });

    if (!article) {
      throw new Error("No article found with this id and editor id!");
    }

    const numberOfDestroyedArticles = await Article.destroy({
      where: {
        id: articleId,
      },
    });

    if (numberOfDestroyedArticles === 0) {
      throw new Error("Data error!");
    }

    return numberOfDestroyedArticles;
  };
}
