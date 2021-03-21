export default function buildGetPublishedArticle({ Article, Editor, User }) {
  return async function getPublishedArticle({ articleId }) {
    const article = await Article.findOne({
      where: {
        id: articleId,
        isPublished: true,
      },
      include: {
        model: Editor,
        include: { model: User, attributes: ["picture", "login"] },
      },
    });

    if (!article) {
      throw new Error("No published article found with this id!");
    }

    return { article };
  };
}
