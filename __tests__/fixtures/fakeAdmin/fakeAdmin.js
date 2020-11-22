export default function buildCreateFakeAdmin({
  randomNumber,
  randomString,
  faker,
}) {
  return function createFakeAdmin(overrides) {
    const user = {
      getLogin: () => randomString.generate(10),
      getPassword: () => randomString.generate(10),
      getName: () => faker.name.findName(),
      getEmail: () => faker.internet.email(),
      hasPassword: () => true,
    };

    const fakeAdmin = {
      user,
      hasFullPermission: false,
      userId: randomNumber.int(1, 10000),
      withNoUser: false,
      withNoUserId: false,
    };

    return {
      ...fakeAdmin,
      ...overrides,
    };
  };
}
