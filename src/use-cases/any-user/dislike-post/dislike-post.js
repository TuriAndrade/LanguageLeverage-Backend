export default function buildDislikePost({ Article, Like, User }) {
  return async function dislikePost({ email, articleId, userToken }) {
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

      const like = await Like.findOne({
        where: {
          email: user.email,
          articleId,
        },
      });

      if (!like) {
        throw new Error("You have not liked this post!");
      }

      await Like.destroy({
        where: {
          id: like.id,
        },
      });

      return { likeId: like.id };
    } else {
      const like = await Like.findOne({
        where: {
          email: email,
          articleId,
        },
      });

      if (!like) {
        throw new Error("You have not liked this post!");
      }

      await Like.destroy({
        where: {
          id: like.id,
        },
      });

      return { likeId: like.id };
    }
  };
}
