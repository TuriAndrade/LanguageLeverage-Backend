export default function buildCommentOnPost({
  Article,
  Comment,
  createComment,
}) {
  return async function commentOnPost({
    name,
    email,
    text,
    replyTo,
    articleId,
  }) {
    const article = await Article.findOne({
      where: {
        id: articleId,
      },
    });

    if (!article) {
      throw new Error("No article found with this id!");
    }

    const comment = createComment({
      name,
      email,
      text,
      replyTo,
      articleId,
    });

    const createdComment = await Comment.create({
      name: comment.getName(),
      email: comment.getEmail(),
      text: comment.getText(),
      replyTo: comment.getReplyTo(),
      articleId: comment.getArticleId(),
    });

    return {
      commentId: createdComment.id,
    };
  };
}
