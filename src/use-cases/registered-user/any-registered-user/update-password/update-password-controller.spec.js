import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { updatePasswordController } from "./index";
import { userLogin } from "../../../../../__tests__/fixtures/utils/login";

describe("update password controller test", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should update password", async () => {
    const loggedUser = await userLogin();

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        oldPassword: loggedUser.user.password,
        newPassword: "newsuperpassword",
      },
      userToken: loggedUser.decodedToken,
    };

    const actualResponse = await updatePasswordController(request);

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
        oldPassword: "inexistentpassword",
        newPassword: "newsuperpassword",
      },
    };

    const actualResponse = await updatePasswordController(request);

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
