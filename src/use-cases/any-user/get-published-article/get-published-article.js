export default function buildGetPublishedArticle({
  Editor,
  Article,
  Subject,
  Comment,
  User,
  Like,
}) {
  return async function getPublishedArticle({ articleId, userToken, email }) {
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

    const article = await Article.findOne({
      where: {
        id: articleId,
        isPublished: true,
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
      if (!article) throw new Error("No published article found with this id!");

      if (userToken) {
        return Like.findOne({
          where: {
            articleId: article.id,
            email: user.email,
          },
        }).then((like) => {
          return {
            ...article.dataValues,
            isLiked: !!like,
          };
        });
      } else if (email) {
        return Like.findOne({
          where: {
            articleId: article.id,
            email: email,
          },
        }).then((like) => {
          return {
            ...article.dataValues,
            isLiked: !!like,
          };
        });
      } else {
        return {
          ...article.dataValues,
          isLiked: false,
        };
      }
    });

    const articlesWithComments = await Comment.findAll({
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

    return { article: articlesWithComments };
  };
}
