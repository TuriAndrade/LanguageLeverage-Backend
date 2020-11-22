import createEditor from "../../entities/editor";
import createFakeEditor from "../../../__tests__/fixtures/fakeEditor";
import truncate from "../../../__tests__/fixtures/utils/truncate";
import { insertUsers } from "../../../__tests__/fixtures/utils/seedDb";
import { Editor } from "./index";

describe("Editor database", () => {
  let users = [];

  beforeEach(async () => {
    await truncate();
    users = await insertUsers();
  });

  it("should create editor", async () => {
    const random = Math.floor(Math.random() * users.length);

    const userId = users[random].id;

    const editor = createEditor(createFakeEditor({ userId }));

    const createdEditor = await Editor.create({
      isValidated: editor.getIsValidated(),
      description: editor.getDescription(),
      userId: editor.getUserId(),
    });

    expect(createdEditor).toBeInstanceOf(Editor);
  });

  it("should update editor", async () => {
    const random = Math.floor(Math.random() * users.length);

    const userId = users[random].id;

    const editor = createEditor(
      createFakeEditor({ userId, isValidated: false })
    );

    const createdEditor = await Editor.create({
      isValidated: editor.getIsValidated(),
      description: editor.getDescription(),
      userId: editor.getUserId(),
    });

    const update = createEditor(
      createFakeEditor({ userId, isValidated: true })
    );

    const [numberOfUpdatedEditors, updatedEditors] = await Editor.update(
      {
        isValidated: update.getIsValidated(),
        description: update.getDescription(),
      },
      {
        where: {
          id: createdEditor.id,
        },
        individualHooks: true,
      }
    );

    expect(numberOfUpdatedEditors).toBe(1);
    expect(updatedEditors[0].isValidated).toBe(update.getIsValidated());
    expect(updatedEditors[0].description).toBe(update.getDescription());
  });

  it("should delete editor", async () => {
    const random = Math.floor(Math.random() * users.length);

    const userId = users[random].id;

    const editor = createEditor(createFakeEditor({ userId }));

    const createdEditor = await Editor.create({
      isValidated: editor.getIsValidated(),
      description: editor.getDescription(),
      userId: editor.getUserId(),
    });

    const numberOfDestroyedEditors = await Editor.destroy({
      where: {
        id: createdEditor.id,
      },
    });

    expect(numberOfDestroyedEditors).toBe(1);
  });

  it("should find editors by id", async () => {
    const random = Math.floor(Math.random() * users.length);

    const userId = users[random].id;

    const editor = createEditor(createFakeEditor({ userId }));

    const createdEditor = await Editor.create({
      isValidated: editor.getIsValidated(),
      description: editor.getDescription(),
      userId: editor.getUserId(),
    });

    const findOne = await Editor.findOne({
      where: {
        id: createdEditor.id,
      },
    });

    expect(findOne).toBeInstanceOf(Editor);
  });

  it("should find all editors", async () => {
    const editors = users.map((user) => {
      const editor = createEditor(createFakeEditor({ userId: user.id }));
      return editor;
    });

    await Promise.all(
      editors.map((editor) => {
        return Editor.create({
          isValidated: editor.getIsValidated(),
          description: editor.getDescription(),
          userId: editor.getUserId(),
        });
      })
    );

    const findAll = await Editor.findAll();

    findAll.map((editor) => expect(editor).toBeInstanceOf(Editor));
  });
});
