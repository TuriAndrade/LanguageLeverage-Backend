import { completeLogout } from "./index";
import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { userLogin } from "../../../../../__tests__/fixtures/utils/login";
import { getSessions } from "../get-sessions";

describe("Logout test", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should logout", async () => {
    const loggedUser = await userLogin();

    const sessionObjects = await getSessions({
      userToken: loggedUser.decodedToken,
    });

    const sessions = sessionObjects.map((session) => {
      return session.id;
    });

    await expect(
      completeLogout({
        userToken: loggedUser.decodedToken,
        password: loggedUser.user.password,
        sessions,
      })
    ).resolves.toEqual(
      expect.objectContaining({
        thisSessionIncluded: true,
      })
    );
  });

  it("should throw error for incorret password", async () => {
    const loggedUser = await userLogin();

    await expect(
      completeLogout({
        userToken: loggedUser.decodedToken,
        password: "wrongpass",
      })
    ).rejects.toThrowError();
  });

  it("should throw error for falsy user token", async () => {
    await expect(
      completeLogout({
        userToken: undefined,
        password: "anypass",
      })
    ).rejects.toThrowError();
  });

  it("should throw error for nonexistent user id", async () => {
    await expect(
      completeLogout({
        userToken: {},
        password: "anypass",
      })
    ).rejects.toThrowError();
  });
});
