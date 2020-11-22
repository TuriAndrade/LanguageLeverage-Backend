export default function buildCreateFakeSubscriber({ faker }) {
  return function createFakeSubscriber(overrides) {
    const fakeSubscriber = {
      name: faker.name.findName(),
      email: faker.internet.email(),
    };

    return {
      ...fakeSubscriber,
      ...overrides,
    };
  };
}
