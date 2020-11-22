export default function buildUpdateArticle({
  Editor,
  Article,
  createArticle,
  Op,
}) {
  return async function updateArticle({
    userToken,
    articleId,
    title,
    cover,
    html,
    delta,
    isPublished,
  }) {
    if (!userToken) {
      throw new Error("User token required!");
    }

    if (!articleId) {
      throw new Error("Article id is required!");
    }

    if (
      !cover &&
      (!html || !delta) &&
      !isPublished &&
      isPublished !== false &&
      !title
    ) {
      throw new Error("Values must be provided!");
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
      },
    });

    if (!article) {
      throw new Error("No article found with this id and editor id!");
    }

    const existentTitle = await Article.findOne({
      where: {
        editor_id: userToken.editorId,
        title,
        [Op.not]: [
          {
            title: article.title,
          },
        ],
      },
    });

    if (existentTitle) {
      throw new Error(
        "An editor can't have two or more articles with the same title!"
      );
    }

    const newArticle = createArticle({
      html: html || article.html,
      title: title || article.title,
      delta: delta || article.delta,
      cover: cover || article.cover,
      isPublished:
        !isPublished && isPublished !== false
          ? article.isPublished
          : isPublished,
      withNoEditorId: true,
    });

    // eslint-disable-next-line no-unused-vars
    const [numberOfUpdatedArticles, updatedArticles] = await Article.update(
      {
        title: newArticle.getTitle(),
        html: newArticle.getHtml(),
        delta: newArticle.getDelta(),
        cover: newArticle.getCover(),
        isPublished: newArticle.getIsPublished(),
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
