import { verifyCsrfTokenMiddleware } from "./index";
import { createToken } from "../../utils/JWT";
import { userLogin } from "../../../__tests__/fixtures/utils/login";

require("../../config/dotenv");

describe("verify csrf token controller teste", () => {
  it("should verify csrf token token", async () => {
    const loggedUser = await userLogin();

    const request = {
      headers: {
        "Content-Type": "application/json",
        csrftoken: createToken(
          {
            userId: loggedUser.decodedToken.userId,
          },
          process.env.JWT_ANTICSRF,
          60 * 15
        ),
      },
      userToken: loggedUser.decodedToken,
    };

    const actualResponse = await verifyCsrfTokenMiddleware(request);

    expect(actualResponse).toBeFalsy();
  });

  it("should return an error response", async () => {
    const loggedUser = await userLogin();

    const request = {
      headers: {
        "Content-Type": "application/json",
        csrftoken: createToken(
          {
            userId: loggedUser.decodedToken.userId,
          },
          "wrongsecret",
          60 * 15
        ),
      },
      userToken: loggedUser.decodedToken,
    };

    const actualResponse = await verifyCsrfTokenMiddleware(request);

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
