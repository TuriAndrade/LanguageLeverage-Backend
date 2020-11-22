export default function buildGetArticles({ Editor, Article }) {
  return async function getArticles({ userToken }) {
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

    const articles = await Article.findAll({
      where: {
        editorId: userToken.editorId,
      },
    });

    return { articles };
  };
}
