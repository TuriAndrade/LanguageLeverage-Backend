export default function buildGetFeed({ Article, Subject, Editor, User, Op }) {
  return async function getFeed({ subjects, offset }) {
    if (subjects && !Array.isArray(subjects)) {
      throw new Error("Invalid type for subjects!");
    }

    if (offset && typeof offset !== "number") {
      throw new Error("Invalid type for offset!");
    }

    if (subjects) {
      const filteredArticles = await Article.findAll({
        attributes: ["id"],
        order: [["createdAt", "DESC"]],
        offset,
        limit: 2,
        subQuery: false, // limit and offset only work with sequelize include if subQuery is set to false
        where: {
          isPublished: true,
        },
        include: {
          model: Subject,
          where: {
            [Op.or]: subjects.map((subject) => ({ subject })),
          },
        },
      });

      const articles = await Promise.all(
        filteredArticles.map((article) => {
          return Article.findOne({
            where: {
              id: article.id,
            },
            include: Subject,
          });
        })
      );

      return { articles };
    } else {
      const filteredArticles = await Article.findAll({
        attributes: ["id"],
        order: [["createdAt", "DESC"]],
        offset,
        limit: 2,
        subQuery: false,
        where: {
          isPublished: true,
        },
      });

      /* 
        using limit with joins doesn't work properly, specially when the result of the join is an array,
        because some of the results may be chopped, so I separated the queries
      */

      const articles = await Promise.all(
        filteredArticles.map((article) => {
          return Article.findOne({
            where: {
              id: article.id,
            },
            include: [
              { model: Subject },
              {
                model: Editor,
                include: { model: User, attributes: ["picture", "login"] },
              },
            ],
          });
        })
      );

      return { articles };
    }
  };
}
