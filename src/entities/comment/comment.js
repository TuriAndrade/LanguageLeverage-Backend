export default function buildCreateComment({ isValidEmail }) {
  return function createComment({
    name,
    email,
    text,
    replyTo = null,
    articleId,
    userType = null,
  } = {}) {
    if (!name) {
      throw new Error("Name is required!");
    } else if (name.length > 50) {
      throw new Error("Name must have at most 50 characters!");
    }

    if (!text) {
      throw new Error("Text is required!");
    } else if (text.length > 200) {
      throw new Error("Text must have at most 200 characters!");
    }

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

    if (replyTo && typeof replyTo !== "number") {
      throw new Error("Invalid reply id!");
    }

    return Object.freeze({
      getName: () => name,
      getUserType: () => userType,
      getReplyTo: () => replyTo,
      getEmail: () => email,
      getText: () => text,
      getArticleId: () => articleId,
    });
  };
}
