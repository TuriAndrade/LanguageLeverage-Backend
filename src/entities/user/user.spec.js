import createUser from "./index";
import createFakeUser from "../../../__tests__/fixtures/fakeUser";

const randomString = require("randomstring");

describe("User", () => {
  it("should create user", () => {
    const user = createFakeUser();

    expect(createUser(user)).toEqual(
      expect.objectContaining({
        getLogin: expect.any(Function),
        getPassword: expect.any(Function),
        getName: expect.any(Function),
        getEmail: expect.any(Function),
        hasPassword: expect.any(Function),
        getPicture: expect.any(Function),
      })
    );
  });

  it("should create user with no password", () => {
    const user = createFakeUser({ password: undefined, withNoPassword: true });

    expect(createUser(user)).toEqual(
      expect.objectContaining({
        getLogin: expect.any(Function),
        getPassword: expect.any(Function),
        getName: expect.any(Function),
        getEmail: expect.any(Function),
        getPicture: expect.any(Function),
        hasPassword: expect.any(Function),
      })
    );
  });

  it("should throw errors for invalid usernames", () => {
    const undefinedLogin = createFakeUser({ login: undefined });

    expect(() => createUser(undefinedLogin)).toThrowError();

    const shortLogin = createFakeUser({ login: "abc" });

    expect(() => createUser(shortLogin)).toThrowError();

    const longLogin = createFakeUser({
      login: "superlongloginwithmorethan16characters",
    });

    expect(() => createUser(longLogin)).toThrowError();

    const invalidLogin = createFakeUser({ login: "invalid login" });

    expect(() => createUser(invalidLogin)).toThrowError();
  });

  it("should throw errors for invalid passwords", () => {
    const undefinedPassword = createFakeUser({ password: undefined });

    expect(() => createUser(undefinedPassword)).toThrowError();

    const shortPassword = createFakeUser({ password: "abcde" });

    expect(() => createUser(shortPassword)).toThrowError();

    const longPassword = createFakeUser({
      password: "superlongpasswordwithmorethan24characters",
    });

    expect(() => createUser(longPassword)).toThrowError();

    const invalidPassword = createFakeUser({ password: "invalid password" });

    expect(() => createUser(invalidPassword)).toThrowError();
  });

  it("should throw errors for invalid names", () => {
    const undefinedName = createFakeUser({ name: undefined });

    expect(() => createUser(undefinedName)).toThrowError();

    const longName = createFakeUser({
      name: randomString.generate(101),
    });

    expect(() => createUser(longName)).toThrowError();
  });

  it("should throw errors for invalid email adresses", () => {
    const undefinedEmail = createFakeUser({ email: undefined });

    expect(() => createUser(undefinedEmail)).toThrowError();

    const invalidEmail = createFakeUser({
      email: "invalid@email",
    });

    expect(() => createUser(invalidEmail)).toThrowError();
  });
});
