import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { validateEditorController } from "./index";
import { notFullyPermittedAdminLogin } from "../../../../../__tests__/fixtures/utils/login";
import { User, Editor } from "../../../../database/models";
import createFakeEditor from "../../../../../__tests__/fixtures/fakeEditor";

describe("invalidate editor controller test", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should invalidate editor", async () => {
    const loggedUser = await notFullyPermittedAdminLogin();

    const editor = createFakeEditor();

    const createdUser = await User.create({
      login: editor.user.getLogin(),
      password: editor.user.getPassword(),
      name: editor.user.getName(),
      email: editor.user.getEmail(),
    });

    const createdEditor = await Editor.create({
      userId: createdUser.id,
      description: editor.description,
      isValidated: false,
    });

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        editorId: createdEditor.id,
      },
      userToken: loggedUser.decodedToken,
    };

    const actualResponse = await validateEditorController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 204,
      })
    );
  });

  it("should return an error response", async () => {
    const loggedUser = await notFullyPermittedAdminLogin();

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        editorId: null,
      },
      userToken: loggedUser.decodedToken,
    };

    const actualResponse = await validateEditorController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          error: expect.any(String),
        },
        statusCode: 400,
      })
    );
  });
});
