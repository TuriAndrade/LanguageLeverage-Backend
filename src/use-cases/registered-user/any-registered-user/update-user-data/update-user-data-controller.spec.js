import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { updateUserDataController } from "./index";
import { userLogin } from "../../../../../__tests__/fixtures/utils/login";

describe("update user data controller test", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should update user data", async () => {
    const loggedUser = await userLogin();

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        login: loggedUser.user.login,
        email: loggedUser.user.email,
        name: loggedUser.user.name,
      },
      userToken: loggedUser.decodedToken,
    };

    const actualResponse = await updateUserDataController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 204,
      })
    );
  });

  it("should return an error response", async () => {
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        login: "anything",
        email: "anything",
        name: "anything",
      },
    };

    const actualResponse = await updateUserDataController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: expect.any(String),
        },
      })
    );
  });
});
