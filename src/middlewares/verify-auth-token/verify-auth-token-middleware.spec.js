import { verifyAuthTokenMiddleware } from "./index";
import { login } from "../../use-cases/registered-user/any-registered-user/login";
import { User } from "../../database/models";
import createFakeUser from "../../../__tests__/fixtures/fakeUser";

require("../../config/dotenv");

describe("verify auth token middleware teste", () => {
  it("should verify auth token", async () => {
    const user = createFakeUser();

    await User.create({
      login: user.login,
      password: user.password,
      name: user.name,
      email: user.email,
    });

    const { token } = await login({
      login: user.login,
      password: user.password,
      reqIp: "127.0.0.1",
      reqDevice: "PHONE",
    });

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      cookies: {
        authToken: token,
      },
    };

    const actualResponse = await verifyAuthTokenMiddleware(request);

    expect(actualResponse).toBeFalsy();
  });

  it("should return an error response", async () => {
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      cookies: {
        authToken: "nonExistent",
      },
    };

    const actualResponse = await verifyAuthTokenMiddleware(request);

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
