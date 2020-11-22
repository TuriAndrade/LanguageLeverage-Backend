import { logout } from "./index";
import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { userLogin } from "../../../../../__tests__/fixtures/utils/login";

describe("Logout test", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should logout", async () => {
    const loggedUser = await userLogin();

    await expect(
      logout({
        userToken: loggedUser.decodedToken,
      })
    ).resolves.toBeFalsy();
  });

  it("should throw error for falsy user token", async () => {
    await expect(
      logout({
        userToken: undefined,
        password: "anypass",
      })
    ).rejects.toThrowError();
  });

  it("should throw error for nonexistent user id", async () => {
    await expect(
      logout({
        userToken: {},
      })
    ).rejects.toThrowError();
  });
});
