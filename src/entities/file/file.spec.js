import createFile from "./index";
import createFakeFile from "../../../__tests__/fixtures/fakeFile";

describe("File", () => {
  it("should create file", () => {
    const file = createFakeFile();

    expect(createFile(file)).toEqual(
      expect.objectContaining({
        getPath: expect.any(Function),
        getName: expect.any(Function),
        getUserId: expect.any(Function),
      })
    );
  });

  it("should set user id", () => {
    const fileWithNoUserId = createFile(
      createFakeFile({ userId: null, withNoUserId: true })
    );

    expect(fileWithNoUserId.getUserId()).toBeFalsy();

    fileWithNoUserId.setUserId(1);

    expect(fileWithNoUserId.getUserId()).toBe(1);
  });

  it("should throw errors for invalid user ids", () => {
    const file = createFile(createFakeFile());

    expect(() => file.setUserId(null)).toThrowError();

    expect(() => file.setUserId("I'm not a number!")).toThrowError();

    expect(() => createFile(createFakeFile({ userId: null }))).toThrowError();
  });

  it("should throw errors for invalid paths", () => {
    const undefinedPath = createFakeFile({ path: undefined });

    expect(() => createFile(undefinedPath)).toThrowError();
  });
});
