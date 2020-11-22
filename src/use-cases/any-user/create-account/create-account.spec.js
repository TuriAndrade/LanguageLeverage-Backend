import createFakeUser from "../../../../__tests__/fixtures/fakeUser";
import { createAccount } from "./index";
import truncate from "../../../../__tests__/fixtures/utils/truncate";
import { User } from "../../../database/models";

describe("Create account", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should create account", async () => {
    const user = createFakeUser();

    const createdAccount = await createAccount({
      login: user.login,
      password: user.password,
      name: user.name,
      email: user.email,
      description: "I'm a description!",
    });

    expect(createdAccount.userId).toEqual(expect.any(Number));
  });

  it("should throw error for existext login", async () => {
    const user = createFakeUser();

    await User.create({
      login: user.login,
      password: user.password,
      name: user.name,
      email: user.email,
    });

    await expect(
      createAccount({
        login: user.login,
        password: user.password,
        name: user.name,
        email: user.email,
        description: "I'm a description!",
      })
    ).rejects.toThrowError();
  });

  it("should throw error for existext email", async () => {
    const user = createFakeUser();

    await User.create({
      login: user.login,
      password: user.password,
      name: user.name,
      email: user.email,
    });

    await expect(
      createAccount({
        login: "newlogin",
        password: user.password,
        name: user.name,
        email: user.email,
        description: "I'm a description!",
      })
    ).rejects.toThrowError();
  });
});
