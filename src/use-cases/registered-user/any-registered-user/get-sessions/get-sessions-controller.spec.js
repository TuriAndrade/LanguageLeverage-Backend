import { getSessionsController } from "./index";
import { userLogin } from "../../../../../__tests__/fixtures/utils/login";

require("../../../../config/dotenv");

describe("get sessions teste", () => {
  it("should get sessions", async () => {
    const loggedUser = await userLogin();

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      userToken: loggedUser.decodedToken,
    };

    const actualResponse = await getSessionsController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          sessions: expect.any(Array),
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

    const actualResponse = await getSessionsController(request);

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
