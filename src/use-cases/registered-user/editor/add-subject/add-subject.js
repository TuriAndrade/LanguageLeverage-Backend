export default function buildAddSubjects({
  Article,
  Subject,
  Editor,
  createSubject,
}) {
  return async function addSubjects({ userToken, articleId, subject }) {
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
      throw new Error("No editor found with this id!");
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

    const alreadyExists = await Subject.findOne({
      where: {
        subject,
        articleId,
      },
    });

    if (alreadyExists) {
      throw new Error("Subject already exists!");
    }

    const sub = createSubject({
      subject,
      articleId,
    });

    const createdSubject = await Subject.create({
      subject: sub.getSubject(),
      articleId: sub.getArticleId(),
    });

    return {
      subjectId: createdSubject.id,
    };
  };
}
