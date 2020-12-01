export default function buildGetFeed({ Article, Subject, Op }) {
  return async function getFeed({
    subjects,
    offsetStart = null,
    offsetEnd = null,
  }) {
    if (subjects && !Array.isArray(subjects)) {
      throw new Error("Invalid type for subjects!");
    }

    if (subjects) {
      const articles = await Article.findAll({
        where: {
          isPublished: true,
        },
        include: Subject,
      });

      return articles;
    } else {
      const articles = await Article.findAll({
        where: {
          isPublished: true,
        },
      });

      return { articles };
    }
  };
}
