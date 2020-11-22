import { notFullyPermittedAdminLogin } from "../../../../../__tests__/fixtures/utils/login";
import createFakeEditor from "../../../../../__tests__/fixtures/fakeEditor";
import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { User, Editor } from "../../../../database/models";
import { invalidateEditor } from "./index";

describe("Editor invalidation test", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should invalidate editor", async () => {
    const loggedUser = await notFullyPermittedAdminLogin();

    const editor = createFakeEditor();

    const createdUser = await User.create({
      login: editor.user.getLogin(),
      password: editor.user.getPassword(),
      email: editor.user.getEmail(),
      name: editor.user.getName(),
    });

    const createdEditor = await Editor.create({
      description: editor.description,
      isValidated: true,
      userId: createdUser.id,
    });

    const numberOfUpdatedEditors = await invalidateEditor({
      userToken: loggedUser.decodedToken,
      editorId: createdEditor.id,
    });

    expect(numberOfUpdatedEditors).toBe(1);
  });

  it("should throw error for invalid user token", async () => {
    const editor = createFakeEditor();

    const createdUser = await User.create({
      login: editor.user.getLogin(),
      password: editor.user.getPassword(),
      email: editor.user.getEmail(),
      name: editor.user.getName(),
    });

    const createdEditor = await Editor.create({
      description: editor.description,
      isValidated: true,
      userId: createdUser.id,
    });

    await expect(
      invalidateEditor({
        userToken: null,
        editorId: createdEditor.id,
      })
    ).rejects.toThrowError();
  });

  it("should throw error for invalid editor id", async () => {
    const loggedUser = await notFullyPermittedAdminLogin();

    await expect(
      invalidateEditor({
        userToken: loggedUser.decodedToken,
        editorId: null,
      })
    ).rejects.toThrowError();
  });
});
