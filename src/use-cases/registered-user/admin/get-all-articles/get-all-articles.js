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

    const articles = await Article.findAll({
      include: Subject,
    });

    return { articles };
  };
}
