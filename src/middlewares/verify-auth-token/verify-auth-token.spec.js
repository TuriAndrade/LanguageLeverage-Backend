import { verifyAuthToken } from "./index";
import { login } from "../../use-cases/registered-user/any-registered-user/login";
import { completeLogout } from "../../use-cases/registered-user/any-registered-user/complete-logout";
import { User, Editor, Admin } from "../../database/models";
import createFakeUser from "../../../__tests__/fixtures/fakeUser";
import createFakeEditor from "../../../__tests__/fixtures/fakeEditor";
import createFakeAdmin from "../../../__tests__/fixtures/fakeAdmin";
import truncate from "../../../__tests__/fixtures/utils/truncate";
import { getSessions } from "../../use-cases/registered-user/any-registered-user/get-sessions";

require("../../config/dotenv");

describe("verify auth token teste", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should verify admin auth token", async () => {
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

    const { token } = await login({
      login: user.login,
      password: user.password,
      reqIp: "127.0.0.1",
    });

    const decodedToken = await verifyAuthToken({ token });

    expect(decodedToken).toEqual(
      expect.objectContaining({
        userId: expect.any(Number),
        adminId: expect.any(Number),
      })
    );
  });

  it("should verify editor auth token", async () => {
    const user = createFakeUser();

    const createdUser = await User.create({
      login: user.login,
      password: user.password,
      name: user.name,
      email: user.email,
    });

    const editor = createFakeEditor({ userId: createdUser.id });

    await Editor.create({
      isValidated: editor.isValidated,
      description: editor.description,
      userId: editor.userId,
    });

    const { token } = await login({
      login: user.login,
      password: user.password,
      reqIp: "127.0.0.1",
    });

    const decodedToken = await verifyAuthToken({ token });

    expect(decodedToken).toEqual(
      expect.objectContaining({
        userId: expect.any(Number),
        editorId: expect.any(Number),
      })
    );
  });

  it("should throw error for token no longer valid", async () => {
    const user = createFakeUser();

    const createdUser = await User.create({
      login: user.login,
      password: user.password,
      name: user.name,
      email: user.email,
    });

    const editor = createFakeEditor({ userId: createdUser.id });

    await Editor.create({
      isValidated: editor.isValidated,
      description: editor.description,
      userId: editor.userId,
    });

    const { token } = await login({
      login: user.login,
      password: user.password,
      reqIp: "127.0.0.1",
    });

    const decodedToken = await verifyAuthToken({ token });

    expect(decodedToken).toEqual(
      expect.objectContaining({
        userId: expect.any(Number),
        editorId: expect.any(Number),
      })
    );

    const sessionObjects = await getSessions({
      userToken: decodedToken,
    });

    const sessions = sessionObjects.map((session) => {
      return session.id;
    });

    await completeLogout({
      userToken: decodedToken,
      password: user.password,
      sessions,
    });

    await expect(verifyAuthToken({ token })).rejects.toThrowError();
  });
});
