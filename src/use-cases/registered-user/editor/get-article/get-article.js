export default function buildGetArticle({ Editor, Article, Subject, User }) {
  return async function getArticle({ userToken, articleId }) {
    if (!userToken) {
      throw new Error("User token required!");
    }

    const editor = await Editor.findOne({
      where: {
        id: userToken.editorId,
      },
    });

    if (!editor) {
      throw new Error("No validated editor found with this id!");
    }

    const article = await Article.findOne({
      where: {
        editorId: userToken.editorId,
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
      throw new Error("No article found with this id and editor id!");
    }

    return { article };
  };
}
