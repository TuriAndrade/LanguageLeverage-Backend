export default function buildCreateSubject() {
  return function createSubject({
    subject,
    articleId,
    withNoArticleId = false,
  } = {}) {
    if (!subject) {
      throw new Error("Subject is required!");
    } else if (subject.length > 50) {
      throw new Error("Subject must have at most 50 characters!");
    }

    if (!withNoArticleId) {
      if (!articleId) {
        throw new Error("Article id is required!");
      } else if (typeof articleId !== "number") {
        throw new Error("Invalid article id!");
      }
    }

    return Object.freeze({
      getSubject: () => subject,
      getArticleId: () => articleId,
      setArticleId: (newArticleId) => {
        if (!newArticleId) {
          throw new Error("Article id is required!");
        } else if (typeof newArticleId !== "number") {
          throw new Error("Invalid article id!");
        }

        withNoArticleId = false;
        articleId = newArticleId;
      },
      hasArticleId: () => !withNoArticleId,
    });
  };
}
