export default function buildLikePost({ Article, Like, createLike }) {
  return async function likePost({ email, articleId }) {
    const article = await Article.findOne({
      where: {
        id: articleId,
      },
    });

    if (!article) {
      throw new Error("No article found with this id!");
    }

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
      date: like.getDate(),
    });

    return {
      likeId: createdLike.id,
    };
  };
}
