import { updatePassword } from "./index";
import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { userLogin } from "../../../../../__tests__/fixtures/utils/login";
import { User } from "../../../../database/models";

const bcrypt = require("bcryptjs");

describe("Update user data", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should update user password", async () => {
    const loggedUser = await userLogin();

    await updatePassword({
      userToken: loggedUser.decodedToken,
      oldPassword: loggedUser.user.password,
      newPassword: "newpassword",
    });

    const findUser = await User.findOne({
      where: {
        id: loggedUser.decodedToken.userId,
      },
    });

    await expect(
      bcrypt.compare("newpassword", findUser.passwordHash)
    ).resolves.toBeTruthy();
  });

  it("should throw error for incorrect password", async () => {
    const loggedUser = userLogin();

    await expect(
      updatePassword({
        userToken: loggedUser.decodedToken,
        oldPassword: "wrongpassword",
        newPassword: "newpassword",
      })
    ).rejects.toThrowError();
  });

  it("should throw error for no value provided", async () => {
    await expect(updatePassword()).rejects.toThrowError();
  });
});
