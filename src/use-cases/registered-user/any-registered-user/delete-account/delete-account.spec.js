import { deleteAccount } from "./index";
import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import createFakeAdmin from "../../../../../__tests__/fixtures/fakeAdmin";
import createFakeEditor from "../../../../../__tests__/fixtures/fakeEditor";
import { userLogin } from "../../../../../__tests__/fixtures/utils/login";
import { Admin, Editor } from "../../../../database/models";

describe("Delete account test", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should delete account", async () => {
    const loggedUser = await userLogin();

    await expect(
      deleteAccount({
        userToken: loggedUser.decodedToken,
        password: loggedUser.user.password,
      })
    ).resolves.toBe(1);
  });

  it("should throw error for incorret password", async () => {
    const loggedUser = await userLogin();

    await expect(
      deleteAccount({
        userToken: loggedUser.decodedToken,
        password: "wrongpass",
      })
    ).rejects.toThrowError();
  });

  it("should throw error for falsy user token", async () => {
    await expect(
      deleteAccount({
        userToken: undefined,
        password: "anypass",
      })
    ).rejects.toThrowError();
  });

  it("should throw error for nonexistent user id", async () => {
    await expect(
      deleteAccount({
        userToken: {},
        password: "anypass",
      })
    ).rejects.toThrowError();
  });

  it("should delete admin and editor on cascade", async () => {
    const loggedUser = await userLogin();

    const admin = createFakeAdmin({ userId: loggedUser.decodedToken.userId });
    const editor = createFakeEditor({ userId: loggedUser.decodedToken.userId });

    const createdAdmin = await Admin.create({
      hasFullPermission: admin.hasFullPermission,
      userId: admin.userId,
    });

    const createdEditor = await Editor.create({
      description: editor.description,
      isValidated: editor.isValidated,
      userId: editor.userId,
    });

    const shouldFindAdmin = await Admin.findOne({
      where: {
        id: createdAdmin.id,
      },
    });

    const shouldFindEditor = await Editor.findOne({
      where: {
        id: createdEditor.id,
      },
    });

    expect(shouldFindAdmin).toBeInstanceOf(Admin);
    expect(shouldFindEditor).toBeInstanceOf(Editor);

    await deleteAccount({
      userToken: loggedUser.decodedToken,
      password: loggedUser.user.password,
    });

    const shouldNotFindAdmin = await Admin.findOne({
      where: {
        id: createdAdmin.id,
      },
    });

    const shouldNotFindEditor = await Editor.findOne({
      where: {
        id: createdEditor.id,
      },
    });

    expect(shouldNotFindAdmin).toBeFalsy();
    expect(shouldNotFindEditor).toBeFalsy();
  });
});
