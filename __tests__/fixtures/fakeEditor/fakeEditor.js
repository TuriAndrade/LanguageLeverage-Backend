export default function buildCreateFakeEditor({
  randomNumber,
  randomString,
  faker,
}) {
  return function createFakeEditor(overrides) {
    const user = {
      getLogin: () =>
        randomString.generate({
          capitalization: "lowercase",
          length: 10,
        }),
      getPassword: () => randomString.generate(10),
      getName: () => faker.name.findName(),
      getEmail: () => faker.internet.email(),
      hasPassword: () => true,
    };

    const fakeEditor = {
      user,
      description: randomString.generate(10),
      userId: randomNumber.int(1, 10000),
      isValidated: false,
      withNoUser: false,
      withNoUserId: false,
    };

    return {
      ...fakeEditor,
      ...overrides,
    };
  };
}
