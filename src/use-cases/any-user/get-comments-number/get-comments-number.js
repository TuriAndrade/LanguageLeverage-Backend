export default function buildGetCommentsNumber({ Comment }) {
  return async function getCommentsNumber({ articleId }) {
    if (!articleId) {
      throw new Error("Article id is required!");
    }

    const nComments = await Comment.count({
      where: {
        articleId,
      },
    });

    return {
      nComments,
    };
  };
}
