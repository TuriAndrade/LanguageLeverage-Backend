import { authenticateController } from "./index";
import {
  notValidatedEditorLogin,
  notFullyPermittedAdminLogin,
} from "../../../../../__tests__/fixtures/utils/login";

require("../../../../config/dotenv");

describe("authenticate controller teste", () => {
  it("should authenticate editor", async () => {
    const loggedUser = await notValidatedEditorLogin();

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      userToken: loggedUser.decodedToken,
    };

    const actualResponse = await authenticateController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          isEditor: true,
          isValidated: false,
        },
        cookie: {
          name: expect.any(String),
          data: expect.any(String),
          options: expect.any(Object),
        },
      })
    );
  });

  it("should authenticate admin", async () => {
    const loggedUser = await notFullyPermittedAdminLogin();

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      userToken: loggedUser.decodedToken,
    };

    const actualResponse = await authenticateController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          isAdmin: true,
          hasFullPermission: false,
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
    };

    const actualResponse = await authenticateController(request);

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
