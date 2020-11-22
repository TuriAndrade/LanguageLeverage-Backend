export default function buildDeleteSubject({ Article, Editor, Subject }) {
  return async function deleteSubject({ userToken, subjectId }) {
    if (!userToken) {
      throw new Error("User token required!");
    }

    if (!subjectId) {
      throw new Error("Subject id is required!");
    }

    const isValidated = await Editor.findOne({
      where: {
        id: userToken.editorId,
        isValidated: true,
      },
    });

    if (!isValidated) {
      throw new Error("No validated editor with this id!");
    }

    const subject = await Subject.findOne({
      where: {
        id: subjectId,
      },
    });

    if (!subject) {
      throw new Error("No subject found with this id!");
    }

    const article = await Article.findOne({
      where: {
        editorId: userToken.editorId,
        id: subject.articleId,
      },
    });

    if (!article) {
      throw new Error("No article found with this id and editor id!");
    }

    const numberOfDestroyedSubjects = await Subject.destroy({
      where: {
        id: subjectId,
      },
    });

    return numberOfDestroyedSubjects;
  };
}
