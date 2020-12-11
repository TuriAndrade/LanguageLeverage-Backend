export default function buildGetFeed({
  Article,
  Subject,
  Editor,
  User,
  Like,
  Comment,
  sequelize,
}) {
  return async function getFeed({
    subjects,
    offset = 0,
    limit = 15,
    userToken,
    email,
  }) {
    if (subjects && !Array.isArray(subjects)) {
      throw new Error("Invalid type for subjects!");
    }

    if (offset && typeof offset !== "number") {
      throw new Error("Invalid type for offset!");
    }

    if (offset && typeof limit !== "number") {
      throw new Error("Invalid type for limit!");
    }

    let user = null;

    if (userToken) {
      user = await User.findOne({
        where: {
          id: userToken.userId,
        },
      });

      if (!user) {
        throw new Error("No user found with this id!");
      }
    }

    let filteredArticles, rowsInfo;

    if (subjects && subjects.length > 0) {
      [filteredArticles, rowsInfo] = await sequelize.query(
        "SELECT DISTINCT articles.id, articles.created_at FROM articles JOIN subjects ON articles.id = subjects.article_id WHERE articles.is_published = TRUE AND subjects.subject IN(:subjects) ORDER BY articles.created_at DESC LIMIT :limit OFFSET :offset",
        {
          replacements: { subjects, limit, offset },
        }
      );
    } else {
      [filteredArticles, rowsInfo] = await sequelize.query(
        "SELECT articles.id FROM articles WHERE is_published = TRUE ORDER BY created_at DESC LIMIT :limit OFFSET :offset",
        {
          replacements: { limit, offset },
        }
      );
    }

    /*
      Limit does't work well with sequelize includes, so I'm using raw queries
    */

    const articles = await Promise.all(
      filteredArticles.map((article) => {
        return Article.findOne({
          where: {
            id: article.id,
          },
          include: [
            { model: Subject },
            { model: Like },
            {
              model: Editor,
              include: { model: User, attributes: ["picture", "login"] },
            },
          ],
        }).then((article) => {
          if (!user && !email) {
            return {
              ...article.dataValues,
              isLiked: false,
            };
          } else {
            return Like.findOne({
              where: {
                articleId: article.id,
                email: user && user.email ? user.email : email,
              },
            }).then((like) => {
              return {
                ...article.dataValues,
                isLiked: !!like,
              };
            });
          }
        });
      })
    );

    const articlesWithComments = await Promise.all(
      articles.map((article) => {
        return Comment.findAll({
          order: [["createdAt", "ASC"]],
          where: {
            articleId: article.id,
            replyTo: null,
          },
        }).then((comments) => {
          return Promise.all(
            comments.map((comment) => {
              return Comment.findAll({
                order: [["createdAt", "ASC"]],
                where: {
                  replyTo: comment.id,
                },
              }).then((replies) => ({
                ...comment.dataValues,
                replies,
              }));
            })
          ).then((commentsWithReplies) => ({
            ...article,
            Comments: commentsWithReplies,
          }));
        });
      })
    );

    return { articles: articlesWithComments };
  };
}
