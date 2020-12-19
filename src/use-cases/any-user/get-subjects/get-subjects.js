export default function buildGetSubjects({ Subject }) {
  return async function getSubjects({ offset, limit }) {
    let subjects = await Subject.aggregate("subject", "DISTINCT", {
      plain: false,
      offset,
      limit: limit || 15,
      order: [["subject", "ASC"]],
    });

    subjects = subjects.map((subject) => subject.DISTINCT);

    return { subjects };
  };
}
