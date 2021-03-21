export default function buildGetReplies({ Comment }) {
  return async function getReplies({ commentId, offset = 0, limit = 10 }) {
    if (!commentId) {
      throw new Error("Comment id is required!");
    }

    if (offset && typeof offset !== "number") {
      throw new Error("Invalid type for offset!");
    }

    if (limit && typeof limit !== "number") {
      throw new Error("Invalid type for limit!");
    }

    const replies = await Comment.findAll({
      order: [["createdAt", "DESC"]],
      offset,
      limit,
      where: {
        replyTo: commentId,
      },
    });

    const repliesCount = await Comment.count({
      where: {
        replyTo: commentId,
      },
    });

    return { replies, hasMore: repliesCount > offset + replies.length };
  };
}
