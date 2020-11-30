export default function buildDeleteAnyArticle({ Admin, Article }) {
  return async function deleteAnyArticle({ userToken, articleId }) {
    if (!userToken) {
      throw new Error("User token required!");
    }

    if (!articleId) {
      throw new Error("Article id is required!");
    }

    const admin = await Admin.findOne({
      where: {
        id: userToken.adminId,
      },
    });

    if (!admin) {
      throw new Error("No admin found with this id!");
    }

    const article = await Article.findOne({
      where: {
        id: articleId,
      },
    });

    if (!article) {
      throw new Error("No article found with this id!");
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
