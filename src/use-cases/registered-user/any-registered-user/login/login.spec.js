import { login } from "./index";
import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import createUser from "../../../../entities/user";
import createFakeUser from "../../../../../__tests__/fixtures/fakeUser";
import createAdmin from "../../../../entities/admin";
import createFakeAdmin from "../../../../../__tests__/fixtures/fakeAdmin";
import createEditor from "../../../../entities/editor";
import createFakeEditor from "../../../../../__tests__/fixtures/fakeEditor";

import { User, Admin, Editor } from "../../../../database/models";

require("../../../../config/dotenv");

const jwt = require("jsonwebtoken");

describe("Login test", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should login as admin", async () => {
    const user = createUser(createFakeUser());

    const createdUser = await User.create({
      login: user.getLogin(),
      password: user.getPassword(),
      name: user.getName(),
      email: user.getEmail(),
    });

    const admin = createAdmin(createFakeAdmin({ userId: createdUser.id }));

    const createdAdmin = await Admin.create({
      hasFullPermission: admin.getHasFullPermission(),
      userId: admin.getUserId(),
    });

    const result = await login({
      login: user.getLogin(),
      password: user.getPassword(),
      reqIp: "127.0.0.1",
    });

    jwt.verify(result.token, process.env.JWT_AUTHENTICATION, (error, admin) => {
      if (error) {
        console.log(error);
      }
      expect(admin.adminId).toBe(createdAdmin.id);
    });
  });

  it("should login as editor", async () => {
    const user = createUser(createFakeUser());

    const createdUser = await User.create({
      login: user.getLogin(),
      password: user.getPassword(),
      name: user.getName(),
      email: user.getEmail(),
    });

    const editor = createEditor(createFakeEditor({ userId: createdUser.id }));

    const createdEditor = await Editor.create({
      isValidated: editor.getIsValidated(),
      description: editor.getDescription(),
      userId: editor.getUserId(),
    });

    const result = await login({
      login: user.getLogin(),
      password: user.getPassword(),
      reqIp: "127.0.0.1",
    });

    expect(result.isEditor).toBeTruthy();

    jwt.verify(
      result.token,
      process.env.JWT_AUTHENTICATION,
      (error, editor) => {
        if (error) {
          console.log(error);
        }
        expect(editor.editorId).toBe(createdEditor.id);
      }
    );
  });

  it("should throw an error for nonexistent login", async () => {
    await expect(
      login({
        login: "I dont't exist",
        password: "whatever",
        reqIp: "127.0.0.1",
      })
    ).rejects.toThrowError();
  });

  it("should throw an error for incorrect password", async () => {
    const user = createUser(createFakeUser());

    await User.create({
      login: user.getLogin(),
      password: user.getPassword(),
      name: user.getName(),
      email: user.getEmail(),
    });

    await expect(
      login({
        login: user.getLogin(),
        password: "whatever",
        reqIp: "127.0.0.1",
      })
    ).rejects.toThrowError();
  });

  it("should create default admin", async () => {
    const result = await login({
      login: process.env.DEFAULT_LOGIN,
      password: process.env.DEFAULT_PASSWORD,
      reqIp: "127.0.0.1",
    });

    expect(result.firstAdmin).toBeTruthy();
    expect(result.isAdmin).toBeTruthy();
    expect(result.token).toEqual(expect.any(String));
  });
});
