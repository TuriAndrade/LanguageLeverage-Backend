export default function buildLikePost({ Article, Like, createLike, User }) {
  return async function likePost({ email, articleId, userToken }) {
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

      const alreadyExists = await Like.findOne({
        where: {
          email: user.email,
          articleId,
        },
      });

      if (alreadyExists) {
        throw new Error("You've already liked this post!");
      }

      const like = createLike({
        email: user.email,
        articleId,
      });

      const createdLike = await Like.create({
        email: like.getEmail(),
        articleId: like.getArticleId(),
      });

      return {
        like: createdLike,
      };
    } else {
      const alreadyExists = await Like.findOne({
        where: {
          email,
          articleId,
        },
      });

      if (alreadyExists) {
        throw new Error("You've already liked this post!");
      }

      const like = createLike({
        email,
        articleId,
      });

      const createdLike = await Like.create({
        email: like.getEmail(),
        articleId: like.getArticleId(),
      });

      return {
        like: createdLike,
      };
    }
  };
}
