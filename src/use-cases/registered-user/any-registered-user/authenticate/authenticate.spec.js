import { authenticate } from "./index";
import {
  notValidatedEditorLogin,
  notFullyPermittedAdminLogin,
} from "../../../../../__tests__/fixtures/utils/login";

require("../../../../config/dotenv");

describe("authenticate test", () => {
  it("should authenticate editor", async () => {
    const loggedUser = await notValidatedEditorLogin();

    const { token, isEditor } = await authenticate({
      userToken: loggedUser.decodedToken,
    });

    expect(token).toEqual(expect.any(String));
    expect(isEditor).toBeTruthy();
  });

  it("should authenticate admin", async () => {
    const loggedUser = await notFullyPermittedAdminLogin();

    const { token, isAdmin } = await authenticate({
      userToken: loggedUser.decodedToken,
    });

    expect(token).toEqual(expect.any(String));
    expect(isAdmin).toBeTruthy();
  });

  it("should throw error for invalid user token", async () => {
    await expect(authenticate({ userToken: null })).rejects.toThrowError();
  });
});
