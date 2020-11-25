export default function buildAddArticle({ Article, Editor, createArticle }) {
  return async function addArticle({
    userToken,
    title,
    html,
    delta,
    cover,
    isPublished,
    isAdmissionArticle,
  }) {
    if (!userToken) {
      throw new Error("User token required!");
    }

    const editor = await Editor.findOne({
      where: {
        id: userToken.editorId,
        isValidated: true,
      },
    });

    if (!editor) {
      throw new Error("No validated editor found with this id!");
    }

    const existentTitle = await Article.findOne({
      where: {
        editor_id: userToken.editorId,
        title,
      },
    });

    if (existentTitle) {
      throw new Error(
        "An editor can't have two or more articles with the same title!"
      );
    }

    const article = createArticle({
      title,
      html,
      cover,
      delta,
      isPublished,
      isAdmissionArticle,
      editorId: editor.id,
    });

    const createdArticle = await Article.create({
      title: article.getTitle(),
      html: article.getHtml(),
      cover: article.getCover(),
      delta: article.getDelta(),
      isPublished: article.getIsPublished(),
      isAdmissionArticle: article.getIsAdmissionArticle(),
      editorId: article.getEditorId(),
    });

    return {
      articleId: createdArticle.id,
    };
  };
}
