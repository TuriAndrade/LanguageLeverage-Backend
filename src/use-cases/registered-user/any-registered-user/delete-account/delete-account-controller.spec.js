import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { deleteAccountController } from "./index";
import { userLogin } from "../../../../../__tests__/fixtures/utils/login";

describe("delete account controller test", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should delete account", async () => {
    const loggedUser = await userLogin();

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        password: loggedUser.user.password,
      },
      userToken: loggedUser.decodedToken,
    };

    const actualResponse = await deleteAccountController(request);

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
        password: "inexistentpassword",
      },
    };

    const actualResponse = await deleteAccountController(request);

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
