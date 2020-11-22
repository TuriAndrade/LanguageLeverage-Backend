export default function buildCreateLike({ isValidEmail }) {
  return function createLike({ email, articleId, date = Date.now() } = {}) {
    if (!email) {
      throw new Error("Email is required!");
    } else if (!isValidEmail(email)) {
      throw new Error("Invalid email!");
    }

    if (!date) {
      throw new Error("Date is required!");
    }

    if (!articleId) {
      throw new Error("Article id is required!");
    } else if (typeof articleId !== "number") {
      throw new Error("Invalid article id!");
    }

    return Object.freeze({
      getEmail: () => email,
      getArticleId: () => articleId,
      getDate: () => date,
    });
  };
}
