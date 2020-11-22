import { getGenericCsrfTokenController } from "./index";

require("../../../config/dotenv");

describe("generic token controller teste", () => {
  it("should get generic token", async () => {
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const actualResponse = await getGenericCsrfTokenController(request);

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
});
