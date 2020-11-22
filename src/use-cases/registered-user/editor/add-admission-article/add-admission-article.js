export default function buildAddAdmissionArticle({
  Article,
  Editor,
  createArticle,
}) {
  return async function addAdmissionArticle({
    userToken,
    title,
    html,
    delta,
    cover,
    isPublished = false,
    isAdmissionArticle = true,
  }) {
    if (!userToken) {
      throw new Error("User token required!");
    }

    const editor = await Editor.findOne({
      where: {
        id: userToken.editorId,
      },
    });

    if (!editor) {
      throw new Error("No editor found with this id!");
    }

    const admissionArticle = await Article.findOne({
      where: {
        editor_id: userToken.editorId,
        isAdmissionArticle: true,
      },
    });

    if (admissionArticle) {
      throw new Error("This editor already has an admission article!");
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
      date: article.getDate(),
      isAdmissionArticle: article.getIsAdmissionArticle(),
      editorId: article.getEditorId(),
    });

    return {
      articleId: createdArticle.id,
    };
  };
}
