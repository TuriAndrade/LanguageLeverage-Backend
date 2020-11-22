import { getSpecificCsrfToken } from "./index";
import { userLogin } from "../../../../../__tests__/fixtures/utils/login";

require("../../../../config/dotenv");

describe("get specific token test", () => {
  it("should get specific token", async () => {
    const loggedUser = await userLogin();

    const token = getSpecificCsrfToken({ userToken: loggedUser.decodedToken });

    expect(token).toEqual(expect.any(String));
  });

  it("should throw error for invalid user token", async () => {
    expect(() => getSpecificCsrfToken({ userToken: null })).toThrowError();
  });
});
