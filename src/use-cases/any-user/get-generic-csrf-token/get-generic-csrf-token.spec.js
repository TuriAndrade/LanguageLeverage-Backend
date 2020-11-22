import { getGenericCsrfToken } from "./index";

require("../../../config/dotenv");

describe("get generic token test", () => {
  it("should get generic token", () => {
    const token = getGenericCsrfToken();

    expect(token).toEqual(expect.any(String));
  });
});
