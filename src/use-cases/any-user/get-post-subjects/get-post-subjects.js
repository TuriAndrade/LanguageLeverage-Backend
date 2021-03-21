export default function buildGetSubjects({ Subject }) {
  return async function getSubjects({ articleId }) {
    const subjects = await Subject.findAll({
      where: {
        articleId,
      },
    });

    return { subjects };
  };
}
