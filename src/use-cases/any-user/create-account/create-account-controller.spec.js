import createFakeEditor from "../../../../__tests__/fixtures/fakeEditor";
import truncate from "../../../../__tests__/fixtures/utils/truncate";
import { createAccountController } from "./index";

describe("create editor controller", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should create editor", async () => {
    const editor = createFakeEditor();
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        login: editor.user.getLogin(),
        password: editor.user.getPassword(),
        name: editor.user.getName(),
        email: editor.user.getEmail(),
        description: editor.description,
      },
    };

    const expectedResponse = {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 204,
    };

    const actualResponse = await createAccountController(request);

    expect(expectedResponse).toEqual(actualResponse);
  });

  it("should return an error response", async () => {
    const editor = createFakeEditor();
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        login: "INVALIDLOGIN",
        password: editor.user.getPassword(),
        name: editor.user.getName(),
        email: editor.user.getEmail(),
        description: editor.description,
      },
    };

    const actualResponse = await createAccountController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: expect.any(String),
        },
      })
    );
  });
});
