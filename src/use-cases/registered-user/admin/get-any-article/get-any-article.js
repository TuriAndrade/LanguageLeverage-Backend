export default function buildGetAnyArticle({ Admin, Article, Subject }) {
  return async function getAnyArticle({ userToken, articleId }) {
    if (!userToken) {
      throw new Error("User token required!");
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

    return Subject.findAll({
      where: {
        articleId: article.id,
      },
    }).then((subjects) => ({
      article,
      subjects,
    }));
  };
}
