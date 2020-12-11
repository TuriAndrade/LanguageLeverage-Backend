export default function buildGetSubjects({ Subject, Op }) {
  return async function getSubjects({ offset, limit, excludeArray = [] }) {
    let subjects = await Subject.aggregate("subject", "DISTINCT", {
      plain: false,
      offset,
      limit: limit || 15,
      order: [["subject", "ASC"]],
      where: {
        subject: { [Op.notIn]: excludeArray },
      },
    });

    subjects = subjects.map((subject) => subject.DISTINCT);

    return { subjects };
  };
}
