export default function buildUnpublishArticle({ Editor, Article }) {
  return async function unpublishArticle({
    userToken,
    articleId,
    confirmation = false,
  }) {
    if (!userToken) {
      throw new Error("User token required!");
    }

    if (!articleId) {
      throw new Error("Article id is required!");
    }

    const editor = await Editor.findOne({
      where: {
        id: userToken.editorId,
      },
    });

    if (!editor) {
      throw new Error("No editor found with this id!");
    }

    const isValidated = await Editor.findOne({
      where: {
        id: userToken.editorId,
        isValidated: true,
      },
    });

    if (!isValidated) {
      if (!confirmation) {
        throw new Error("Confirmation required!");
      }
    }

    const article = await Article.findOne({
      where: {
        editorId: userToken.editorId,
        id: articleId,
        isPublished: true,
      },
    });

    if (!article) {
      throw new Error("No published article found with this id and editor id!");
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
