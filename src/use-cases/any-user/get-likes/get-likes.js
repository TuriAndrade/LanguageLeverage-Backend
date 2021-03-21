export default function buildGetLikes({ Like, User }) {
  return async function getLikes({ articleId, userToken, email }) {
    if (!articleId) {
      throw new Error("Article id is required!");
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

    const nLikes = await Like.count({
      where: {
        articleId,
      },
    });

    let isLiked = false;

    if ((user && user.email) || email) {
      isLiked = await Like.findOne({
        where: {
          articleId,
          email: (user && user.email) || email,
        },
      });
    }

    return {
      nLikes,
      isLiked: !!isLiked,
    };
  };
}
