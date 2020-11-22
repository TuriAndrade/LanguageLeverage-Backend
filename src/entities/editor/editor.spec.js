import createEditor from "./index";
import createFakeEditor from "../../../__tests__/fixtures/fakeEditor";

const randomString = require("randomstring");

describe("Editor", () => {
  it("should create editor", () => {
    const editor = createFakeEditor();

    expect(createEditor(editor)).toEqual(
      expect.objectContaining({
        getLogin: expect.any(Function),
        getPassword: expect.any(Function),
        getName: expect.any(Function),
        getEmail: expect.any(Function),
        hasPassword: expect.any(Function),
        getDescription: expect.any(Function),
        getIsValidated: expect.any(Function),
        getUserId: expect.any(Function),
        validate: expect.any(Function),
        invalidate: expect.any(Function),
        hasUser: expect.any(Function),
      })
    );
  });

  it("should validate editor", () => {
    const invalidatedEditor = createEditor(
      createFakeEditor({ isValidated: false })
    );

    expect(invalidatedEditor.getIsValidated()).toBe(false);

    invalidatedEditor.validate();

    expect(invalidatedEditor.getIsValidated()).toBe(true);
  });

  it("should invalidate editor", () => {
    const validatedEditor = createEditor(
      createFakeEditor({ isValidated: true })
    );

    expect(validatedEditor.getIsValidated()).toBe(true);

    validatedEditor.invalidate();

    expect(validatedEditor.getIsValidated()).toBe(false);
  });

  it("should set user id", () => {
    const editorWithoutUserId = createEditor(
      createFakeEditor({ userId: null, withNoUserId: true })
    );

    expect(editorWithoutUserId.getUserId()).toBeFalsy();

    editorWithoutUserId.setUserId(1);

    expect(editorWithoutUserId.getUserId()).toBe(1);
  });

  it("should create editor with no user", () => {
    const editorWithNoUser = createEditor(
      createFakeEditor({ user: undefined, withNoUser: true })
    );

    expect(editorWithNoUser).toEqual(
      expect.objectContaining({
        getDescription: expect.any(Function),
        getIsValidated: expect.any(Function),
        getUserId: expect.any(Function),
        validate: expect.any(Function),
        invalidate: expect.any(Function),
        hasUser: expect.any(Function),
      })
    );
  });

  it("should throw errors for invalid user ids", () => {
    const editor = createEditor(createFakeEditor());

    expect(() => editor.setUserId(null)).toThrowError();

    expect(() => editor.setUserId("I'm not a number!")).toThrowError();

    expect(() =>
      createEditor(createFakeEditor({ userId: null }))
    ).toThrowError();
  });

  it("should throw errors for invalid users", () => {
    const editorWithNoUser = createFakeEditor({ user: {} });

    expect(() => createEditor(editorWithNoUser)).toThrowError();

    const editorWithNoLogin = createFakeEditor({
      user: {
        getLogin: null,
        getPassword: () => "12345678",
        getEmail: () => "email@email.com",
        getName: () => "name",
      },
    });

    expect(() => createEditor(editorWithNoLogin)).toThrowError();

    const editorWithNoPass = createFakeEditor({
      user: {
        getLogin: () => "login",
        getPassword: null,
        getEmail: () => "email@email.com",
        getName: () => "name",
      },
    });

    expect(() => createEditor(editorWithNoPass)).toThrowError();

    const editorWithNoEmail = createFakeEditor({
      user: {
        getLogin: () => "login",
        getPassword: () => "12345678",
        getEmail: null,
        getName: () => "name",
      },
    });

    expect(() => createEditor(editorWithNoEmail)).toThrowError();

    const editorWithNoName = createFakeEditor({
      user: {
        getLogin: () => "login",
        getPassword: () => "12345678",
        getEmail: () => "email@email.com",
        getName: null,
      },
    });

    expect(() => createEditor(editorWithNoName)).toThrowError();
  });

  it("should throw errors for invalid descriptions", () => {
    const undefinedDescription = createFakeEditor({
      description: undefined,
    });

    expect(() => createEditor(undefinedDescription)).toThrowError();

    const longDescription = createFakeEditor({
      description: randomString.generate(201),
    });

    expect(() => createEditor(longDescription)).toThrowError();
  });

  it("should throw errors for invalid user ids", () => {
    const nonNumericUserId = createFakeEditor({
      userId: "Im not a number",
    });

    expect(() => createEditor(nonNumericUserId)).toThrowError();
  });
});
