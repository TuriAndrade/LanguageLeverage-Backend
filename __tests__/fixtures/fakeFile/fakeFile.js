export default function buildCreateFakeFile({ randomNumber, randomString }) {
  return function createFakeFile(overrides) {
    const fakeFile = {
      path: `/${randomString.generate(10)}/${randomString.generate(5)}`,
      userId: randomNumber.int(1, 100),
      name: randomString.generate(20),
      withNoEditorId: false,
      withNoPath: false,
      key: randomString.generate(10),
      withNoKey: false,
      toBeDeleted: true,
    };

    return {
      ...fakeFile,
      ...overrides,
    };
  };
}
