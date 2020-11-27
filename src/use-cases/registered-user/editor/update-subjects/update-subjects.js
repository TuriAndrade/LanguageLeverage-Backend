export default function buildUpdateSubjects({
  Article,
  Subject,
  Editor,
  createSubject,
}) {
  return async function updateSubjects({ userToken, articleId, subjects }) {
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

    const existentSubjects = await Subject.findAll({
      where: {
        articleId: articleId,
      },
    });

    const createdSubjects = [
      ...new Set(
        subjects.map((subject) => {
          return createSubject({
            subject,
            articleId,
          });
        })
      ),
    ];

    return Promise.all(
      existentSubjects.map((existentSubject) => {
        if (!createdSubjects.includes(existentSubject)) {
          return Subject.destroy({
            where: {
              id: existentSubject.id,
            },
          });
        }

        return null;
      }),
      createdSubjects.map((createdSubject) => {
        if (!existentSubjects.includes(createdSubject)) {
          return Subject.create({
            subject: createdSubject.getSubject(),
            articleId: createdSubject.getArticleId(),
          });
        }

        return null;
      })
    );
  };
}
