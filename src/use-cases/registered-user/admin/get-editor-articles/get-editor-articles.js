export default function buildGetEditorArticles({
  Editor,
  Article,
  Subject,
  Admin,
}) {
  return async function getEditorArticles({ userToken, editorId }) {
    if (!userToken) {
      throw new Error("User token is required!");
    }

    if (!editorId) {
      throw new Error("Editor id is required!");
    }

    const admin = await Admin.findOne({
      where: {
        id: userToken.adminId,
      },
    });

    if (!admin) {
      throw new Error("No admin found with this id!");
    }

    const editor = await Editor.findOne({
      where: {
        id: editorId,
      },
    });

    if (!editor) {
      throw new Error("No editor found with this id!");
    }

    const articles = await Article.findAll({
      where: {
        editorId: editorId,
      },
    });

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
