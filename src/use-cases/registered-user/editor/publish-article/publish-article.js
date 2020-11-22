export default function buildPublishArticle({ Editor, Article }) {
  return async function publishArticle({ userToken, articleId }) {
    if (!userToken) {
      throw new Error("User token required!");
    }

    if (!articleId) {
      throw new Error("Article id is required!");
    }

    const isValidated = await Editor.findOne({
      where: {
        id: userToken.editorId,
        isValidated: true,
      },
    });

    if (!isValidated) {
      throw new Error("No validated editor found with this id!");
    }

    const article = await Article.findOne({
      where: {
        editorId: userToken.editorId,
        id: articleId,
        isPublished: false,
      },
    });

    if (!article) {
      throw new Error(
        "No unpublished article found with this id and editor id!"
      );
    }

    const [numberOfUpdatedArticles, updatedArticles] = await Article.update(
      {
        isPublished: true,
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
