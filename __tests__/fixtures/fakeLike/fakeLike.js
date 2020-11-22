export default function buildCreateFakeLike({ randomNumber, faker }) {
  return function createFakeLike(overrides) {
    const fakeLike = {
      email: faker.internet.email(),
      articleId: randomNumber.int(1, 10000),
      date: Date.now(),
    };

    return {
      ...fakeLike,
      ...overrides,
    };
  };
}
