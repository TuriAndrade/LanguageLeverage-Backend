export default function buildCreateFakeUser({ randomString, faker }) {
  return function createFakeUser(overrides) {
    const fakeUser = {
      login: randomString.generate({
        capitalization: "lowercase",
        length: 10,
      }),
      password: randomString.generate(10),
      name: faker.name.findName(),
      email: faker.internet.email(),
      picture: randomString.generate(4) + "/" + randomString.generate(10),
    };

    return {
      ...fakeUser,
      ...overrides,
    };
  };
}
