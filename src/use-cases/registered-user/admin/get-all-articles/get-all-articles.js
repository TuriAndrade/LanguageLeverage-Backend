export default function buildGetAllArticles({ Admin, Article, Subject }) {
  return async function getAllArticles({ userToken }) {
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

    const articles = await Article.findAll();

    return Promise.all(
      articles.map((article) => {
        return Subject.findAll({
          where: {
            articleId: article.id,
          },
        }).then((subjects) => ({
          article,
          subjects,
        }));
      })
    );
  };
}
