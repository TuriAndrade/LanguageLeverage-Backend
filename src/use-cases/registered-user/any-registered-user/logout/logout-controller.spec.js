import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { logoutController } from "./index";
import { userLogin } from "../../../../../__tests__/fixtures/utils/login";

describe("logout controller test", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should logout", async () => {
    const loggedUser = await userLogin();

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      userToken: loggedUser.decodedToken,
    };

    const actualResponse = await logoutController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 204,
        clearCookie: {
          name: "authToken",
        },
      })
    );
  });

  it("should throw error response", async () => {
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      userToken: null,
    };

    const actualResponse = await logoutController(request);

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
