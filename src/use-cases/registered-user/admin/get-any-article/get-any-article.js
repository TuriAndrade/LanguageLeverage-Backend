export default function buildGetAnyArticle({
  Admin,
  Article,
  Subject,
  Editor,
  User,
}) {
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
      include: [
        { model: Subject },
        {
          model: Editor,
          include: { model: User, attributes: ["picture", "login"] },
        },
      ],
    });

    if (!article) {
      throw new Error("No article found with this id!");
    }

    return { article };
  };
}
