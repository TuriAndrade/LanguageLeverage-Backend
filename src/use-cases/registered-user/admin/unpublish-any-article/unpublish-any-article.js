export default function buildUnpublishAnyArticle({ Admin, Article }) {
  return async function unpublishAnyArticle({ userToken, articleId }) {
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
        isPublished: true,
      },
    });

    if (!article) {
      throw new Error("No published article found with this id!");
    }

    const [numberOfUpdatedArticles, updatedArticles] = await Article.update(
      {
        isPublished: false,
      },
      {
        where: {
          id: articleId,
        },
      }
    );

    return numberOfUpdatedArticles;
  };
}
