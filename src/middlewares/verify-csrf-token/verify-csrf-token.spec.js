import { verifyCsrfToken } from "./index";
import { verifyAuthToken } from "../verify-auth-token";
import { login } from "../../use-cases/registered-user/any-registered-user/login";
import { getSpecificCsrfToken } from "../../use-cases/registered-user/any-registered-user/get-specific-csrf-token";
import { getGenericCsrfToken } from "../../use-cases/any-user/get-generic-csrf-token";
import { User, Admin } from "../../database/models";
import createFakeUser from "../../../__tests__/fixtures/fakeUser";
import createFakeAdmin from "../../../__tests__/fixtures/fakeAdmin";
import truncate from "../../../__tests__/fixtures/utils/truncate";

require("../../config/dotenv");

describe("verify csrf token teste", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should verify specific csrf token", async () => {
    const user = createFakeUser();

    const createdUser = await User.create({
      login: user.login,
      password: user.password,
      name: user.name,
      email: user.email,
    });

    const admin = createFakeAdmin({ userId: createdUser.id });

    await Admin.create({
      hasFullPermission: admin.hasFullPermission,
      userId: admin.userId,
    });

    const userToken = await login({
      login: user.login,
      password: user.password,
      reqIp: "127.0.0.1",
      reqDevice: "PHONE",
    });

    const decodedToken = await verifyAuthToken({ token: userToken.token });

    const csrfToken = await getSpecificCsrfToken({
      userToken: decodedToken,
    });

    await expect(
      verifyCsrfToken({
        userToken: decodedToken,
        token: csrfToken,
      })
    ).resolves.toBeFalsy();
  });

  it("should verify generic csrf token", async () => {
    const token = getGenericCsrfToken();

    await expect(
      verifyCsrfToken({
        token,
      })
    ).resolves.toBeFalsy();
  });

  it("should throw error for user not authenticated", async () => {
    const user = createFakeUser();

    const createdUser = await User.create({
      login: user.login,
      password: user.password,
      name: user.name,
      email: user.email,
    });

    const admin = createFakeAdmin({ userId: createdUser.id });

    await Admin.create({
      hasFullPermission: admin.hasFullPermission,
      userId: admin.userId,
    });

    const user2 = createFakeUser();

    const createdUser2 = await User.create({
      login: user2.login,
      password: user2.password,
      name: user2.name,
      email: user2.email,
    });

    const admin2 = createFakeAdmin({ userId: createdUser2.id });

    await Admin.create({
      hasFullPermission: admin2.hasFullPermission,
      userId: admin2.userId,
    });

    // user
    const userToken1 = await login({
      login: user.login,
      password: user.password,
      reqIp: "127.0.0.1",
      reqDevice: "PHONE",
    });

    // user2
    const userToken2 = await login({
      login: user2.login,
      password: user2.password,
      reqIp: "127.0.0.1",
      reqDevice: "PHONE",
    });

    const decodedToken1 = await verifyAuthToken({ token: userToken1.token }); // user
    const decodedToken2 = await verifyAuthToken({ token: userToken2.token }); // user2

    // user2
    const csrfToken2 = await getSpecificCsrfToken({
      userToken: decodedToken2,
    });

    await expect(
      verifyCsrfToken({
        userToken: decodedToken1,
        token: csrfToken2,
      })
    ).rejects.toThrowError();

    // authtoken from one user and csrf token from the other should throw error
  });

  it("should throw error for generic csrf token", async () => {
    const user = createFakeUser();

    const createdUser = await User.create({
      login: user.login,
      password: user.password,
      name: user.name,
      email: user.email,
    });

    const admin = createFakeAdmin({ userId: createdUser.id });

    await Admin.create({
      hasFullPermission: admin.hasFullPermission,
      userId: admin.userId,
    });

    const userToken = await login({
      login: user.login,
      password: user.password,
      reqIp: "127.0.0.1",
      reqDevice: "PHONE",
    });

    const csrfToken = await getGenericCsrfToken();

    const decodedToken = await verifyAuthToken({ token: userToken.token });

    await expect(
      verifyCsrfToken({
        userToken: decodedToken,
        token: csrfToken,
      })
    ).rejects.toThrowError();

    // when auth token is passed, the csrf token must be specific, not generic
  });

  it("should throw error for missing auth token", async () => {
    const user = createFakeUser();

    const createdUser = await User.create({
      login: user.login,
      password: user.password,
      name: user.name,
      email: user.email,
    });

    const admin = createFakeAdmin({ userId: createdUser.id });

    await Admin.create({
      hasFullPermission: admin.hasFullPermission,
      userId: admin.userId,
    });

    const userToken = await login({
      login: user.login,
      password: user.password,
      reqIp: "127.0.0.1",
      reqDevice: "PHONE",
    });

    const decodedToken = await verifyAuthToken({ token: userToken.token });

    const csrfToken = await getSpecificCsrfToken({
      userToken: decodedToken,
    });

    await expect(
      verifyCsrfToken({
        token: csrfToken,
      })
    ).rejects.toThrowError();

    // when specific csrf token is passed, auth token is required
  });
});
