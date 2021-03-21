export default function buildGetComments({ Comment }) {
  return async function getComments({
    articleId,
    offset = 0,
    limit = 10,
    replyLimit = 2,
  }) {
    if (!articleId) {
      throw new Error("Article id is required!");
    }

    if (offset && typeof offset !== "number") {
      throw new Error("Invalid type for offset!");
    }

    if (limit && typeof limit !== "number") {
      throw new Error("Invalid type for limit!");
    }

    const comments = await Comment.findAll({
      order: [["createdAt", "DESC"]],
      offset,
      limit,
      where: {
        articleId,
        replyTo: null,
      },
    });

    const commentsWithReplies = await Promise.all(
      comments.map((comment) => {
        return Comment.findAll({
          order: [["createdAt", "DESC"]],
          limit: replyLimit,
          where: {
            replyTo: comment.id,
          },
        }).then((replies) => {
          return Comment.count({
            where: {
              replyTo: comment.id,
            },
          }).then((count) => ({
            ...comment.dataValues,
            replies,
            hasMoreReplies: count > replies.length,
          }));
        });
      })
    );

    const commentsCount = await Comment.count({
      where: {
        articleId,
        replyTo: null,
      },
    });

    return {
      comments: commentsWithReplies,
      hasMore: commentsCount > offset + comments.length,
    };
  };
}
