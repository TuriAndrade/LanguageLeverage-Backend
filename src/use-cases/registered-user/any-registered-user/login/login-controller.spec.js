import createFakeUser from "../../../../../__tests__/fixtures/fakeUser";
import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { loginController } from "./index";
import { User } from "../../../../database/models";

require("../../../../config/dotenv");

describe("login controller teste", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should login", async () => {
    const user = createFakeUser();

    await User.create({
      login: user.login,
      password: user.password,
      email: user.email,
      name: user.name,
    });

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        login: user.login,
        password: user.password,
      },
      ip: "127.0.0.1",
    };

    const actualResponse = await loginController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        cookie: {
          name: expect.any(String),
          data: expect.any(String),
          options: expect.any(Object),
        },
      })
    );
  });

  it("should login as default admin", async () => {
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        login: process.env.DEFAULT_LOGIN,
        password: process.env.DEFAULT_PASSWORD,
      },
      ip: "127.0.0.1",
    };

    const actualResponse = await loginController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          isAdmin: true,
          firstAdmin: true,
          hasFullPermission: true,
        },
        cookie: {
          name: expect.any(String),
          data: expect.any(String),
          options: expect.any(Object),
        },
      })
    );
  });

  it("should return an error response", async () => {
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        login: "inexistentlogin",
        password: "inexistentpassword",
      },
    };

    const actualResponse = await loginController(request);

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
