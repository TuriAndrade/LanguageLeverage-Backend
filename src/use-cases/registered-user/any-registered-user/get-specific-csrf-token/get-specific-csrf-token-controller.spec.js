import { getSpecificCsrfTokenController } from "./index";
import { userLogin } from "../../../../../__tests__/fixtures/utils/login";

require("../../../../config/dotenv");

describe("specific token controller teste", () => {
  it("should get specific token", async () => {
    const loggedUser = await userLogin();

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      userToken: loggedUser.decodedToken,
    };

    const actualResponse = await getSpecificCsrfTokenController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          token: expect.any(String),
        },
      })
    );
  });

  it("should throw an error response", async () => {
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const actualResponse = await getSpecificCsrfTokenController(request);

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
