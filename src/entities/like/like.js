export default function buildCreateLike({ isValidEmail }) {
  return function createLike({ email, articleId } = {}) {
    if (!email) {
      throw new Error("Email is required!");
    } else if (!isValidEmail(email)) {
      throw new Error("Invalid email!");
    }
    if (!articleId) {
      throw new Error("Article id is required!");
    } else if (typeof articleId !== "number") {
      throw new Error("Invalid article id!");
    }

    return Object.freeze({
      getEmail: () => email,
      getArticleId: () => articleId,
    });
  };
}
