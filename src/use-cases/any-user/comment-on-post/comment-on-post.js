export default function buildCommentOnPost({
  Article,
  User,
  Admin,
  Editor,
  Comment,
  createComment,
}) {
  return async function commentOnPost({
    name,
    email,
    text,
    replyTo,
    articleId,
    userToken,
  }) {
    const article = await Article.findOne({
      where: {
        id: articleId,
      },
    });

    if (!article) {
      throw new Error("No article found with this id!");
    }

    if (userToken) {
      const user = await User.findOne({
        where: {
          id: userToken.userId,
        },
      });

      if (!user) {
        throw new Error("No user found with this id!");
      }

      const admin = await Admin.findOne({
        where: {
          userId: userToken.userId,
        },
      });

      const editor = await Editor.findOne({
        where: {
          userId: userToken.userId,
        },
      });

      const comment = createComment({
        name: user.name,
        email: user.email,
        text,
        replyTo,
        userType: admin ? "admin" : editor ? "editor" : null,
        articleId,
      });

      const createdComment = await Comment.create({
        name: comment.getName(),
        email: comment.getEmail(),
        text: comment.getText(),
        replyTo: comment.getReplyTo(),
        articleId: comment.getArticleId(),
        userType: comment.getUserType(),
      });

      return {
        comment: createdComment,
      };
    } else {
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
        userType: comment.getUserType(),
      });

      return {
        comment: createdComment,
      };
    }
  };
}
