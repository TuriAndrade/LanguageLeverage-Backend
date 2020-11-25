export default function buildCreateFakeComment({
  randomString,
  randomNumber,
  faker,
}) {
  return function createFakeComment(overrides) {
    const fakeComment = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      text: randomString.generate(10),
      replyTo: null,
      articleId: randomNumber.int(1, 10000),
    };

    return {
      ...fakeComment,
      ...overrides,
    };
  };
}
