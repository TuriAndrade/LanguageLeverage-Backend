export default function buildCreateFakeSubject({ randomString, randomNumber }) {
  return function createFakeSubject(overrides) {
    const fakeSubject = {
      subject: randomString.generate(10),
      articleId: randomNumber.int(1, 10000),
      withNoArticleId: false,
    };

    return {
      ...fakeSubject,
      ...overrides,
    };
  };
}
