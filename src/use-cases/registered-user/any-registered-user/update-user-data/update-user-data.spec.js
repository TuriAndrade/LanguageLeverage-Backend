import createFakeUser from "../../../../../__tests__/fixtures/fakeUser";
import { updateUserData } from "./index";
import { login } from "../login";
import { User } from "../../../../database/models";
import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { userLogin } from "../../../../../__tests__/fixtures/utils/login";

const jwt = require("jsonwebtoken");

describe("Update user data", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should update user data", async () => {
    const loggedUser = await userLogin();

    await updateUserData({
      userToken: loggedUser.decodedToken,
      login: "newlogin",
      email: "newemail@valid.com",
      name: "New Name",
      picture: "Link/To/Picture",
    });

    const user = await User.findOne({
      where: {
        id: loggedUser.decodedToken.userId,
      },
    });

    expect(user.login).toBe("newlogin");
    expect(user.email).toBe("newemail@valid.com");
    expect(user.name).toBe("New Name");
  });

  it("should update only one of the user attributes", async () => {
    const loggedUser = await userLogin();

    await updateUserData({
      userToken: loggedUser.decodedToken,
      name: "New Name",
    });

    const user = await User.findOne({
      where: {
        id: loggedUser.decodedToken.userId,
      },
    });

    expect(user.name).toBe("New Name");
  });

  it("should throw error for existent login", async () => {
    const user = createFakeUser();

    await User.create({
      login: user.login,
      email: user.email,
      name: user.name,
      password: user.password,
    });

    const result = await login({
      login: user.login,
      password: user.password,
      reqIp: "127.0.0.1",
    });

    const user2 = createFakeUser();

    await User.create({
      login: user2.login,
      name: user2.name,
      password: user2.password,
      email: user2.email,
    });

    await expect(
      jwt.verify(
        result.token,
        process.env.JWT_AUTHENTICATION,
        async (error, result) => {
          if (error) {
            console.log(error);
          }

          return updateUserData({
            userToken: result,
            login: user2.login,
          });
        }
      )
    ).rejects.toThrowError();
  });

  it("should add and delete picture", async () => {
    const user = createFakeUser();

    const createdUser = await User.create({
      login: user.login,
      email: user.email,
      name: user.name,
      password: user.password,
    });

    let findOne = await User.findOne({
      where: {
        id: createdUser.id,
      },
    });

    expect(findOne.picture).toBeFalsy();

    const result = await login({
      login: user.login,
      password: user.password,
      reqIp: "127.0.0.1",
    });

    await expect(
      jwt.verify(
        result.token,
        process.env.JWT_AUTHENTICATION,
        async (error, result) => {
          if (error) {
            console.log(error);
          }

          await updateUserData({
            userToken: result,
            picture: "link/to/picture",
          });

          findOne = await User.findOne({
            where: {
              id: createdUser.id,
            },
          });

          return findOne.picture;
        }
      )
    ).resolves.toBe("link/to/picture");

    await expect(
      jwt.verify(
        result.token,
        process.env.JWT_AUTHENTICATION,
        async (error, result) => {
          if (error) {
            console.log(error);
          }

          await updateUserData({
            userToken: result,
            picture: null,
          });

          findOne = await User.findOne({
            where: {
              id: createdUser.id,
            },
          });

          return findOne.picture;
        }
      )
    ).resolves.toBeFalsy();
  });

  it("should not delete picture", async () => {
    const user = createFakeUser();

    const createdUser = await User.create({
      login: user.login,
      email: user.email,
      name: user.name,
      password: user.password,
    });

    const findOne = await User.findOne({
      where: {
        id: createdUser.id,
      },
    });

    expect(findOne.picture).toBeFalsy();

    const result = await login({
      login: user.login,
      password: user.password,
      reqIp: "127.0.0.1",
    });

    await expect(
      jwt.verify(
        result.token,
        process.env.JWT_AUTHENTICATION,
        async (error, result) => {
          if (error) {
            console.log(error);
          }

          await updateUserData({
            userToken: result,
            picture: "link/to/picture",
          });

          const findOne = await User.findOne({
            where: {
              id: createdUser.id,
            },
          });

          return findOne.picture;
        }
      )
    ).resolves.toBe("link/to/picture");

    await expect(
      jwt.verify(
        result.token,
        process.env.JWT_AUTHENTICATION,
        async (error, result) => {
          if (error) {
            console.log(error);
          }

          await updateUserData({
            userToken: result,
            picture: undefined,
            login: "anything",
          });

          const findOne = await User.findOne({
            where: {
              id: createdUser.id,
            },
          });

          return findOne.picture;
        }
      )
    ).resolves.toBe("link/to/picture");
  });

  it("should throw error for existent email", async () => {
    const user = createFakeUser();

    await User.create({
      login: user.login,
      email: user.email,
      name: user.name,
      password: user.password,
    });

    const result = await login({
      login: user.login,
      password: user.password,
      reqIp: "127.0.0.1",
    });

    const user2 = createFakeUser();

    await User.create({
      login: user2.login,
      name: user2.name,
      password: user2.password,
      email: user2.email,
    });

    await expect(
      jwt.verify(
        result.token,
        process.env.JWT_AUTHENTICATION,
        async (error, result) => {
          if (error) {
            console.log(error);
          }

          return updateUserData({
            userToken: result,
            email: user2.email,
          });
        }
      )
    ).rejects.toThrowError();
  });

  it("should throw error for no value provided", async () => {
    await expect(updateUserData()).rejects.toThrowError();
  });
});
