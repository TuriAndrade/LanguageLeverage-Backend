import createFile from "../../entities/file";
import createFakeFile from "../../../__tests__/fixtures/fakeFile";
import truncate from "../../../__tests__/fixtures/utils/truncate";
import { insertUsers } from "../../../__tests__/fixtures/utils/seedDb";
import { File } from "./index";

describe("File database", () => {
  let users = [];

  beforeEach(async () => {
    await truncate();
    users = await insertUsers();
  });

  it("should create file", async () => {
    const random = Math.floor(Math.random() * users.length);

    const userId = users[random].id;

    const file = createFile(createFakeFile({ userId }));

    const createdFile = await File.create({
      path: file.getPath(),
      name: file.getName(),
      userId: file.getUserId(),
      key: file.getKey(),
      toBeDeleted: file.getToBeDeleted(),
    });

    expect(createdFile).toBeInstanceOf(File);
  });

  it("should update file", async () => {
    const random = Math.floor(Math.random() * users.length);

    const userId = users[random].id;

    const file = createFile(createFakeFile({ userId, path: "/teste1" }));

    const createdFile = await File.create({
      path: file.getPath(),
      name: file.getName(),
      userId: file.getUserId(),
      key: file.getKey(),
      toBeDeleted: file.getToBeDeleted(),
    });

    const update = createFile(
      createFakeFile({
        userId,
        path: "/teste2",
        name: "newName",
        toBeDeleted: false,
      })
    );

    const [numberOfUpdatedFiles, updatedFiles] = await File.update(
      {
        path: update.getPath(),
        name: update.getName(),
        toBeDeleted: update.getToBeDeleted(),
      },
      {
        where: {
          id: createdFile.id,
        },
        individualHooks: true,
      }
    );

    expect(numberOfUpdatedFiles).toBe(1);
    expect(updatedFiles[0].path).toBe(update.getPath());
    expect(updatedFiles[0].name).toBe(update.getName());
  });

  it("should delete file", async () => {
    const random = Math.floor(Math.random() * users.length);

    const userId = users[random].id;

    const file = createFile(createFakeFile({ userId }));

    const createdFile = await File.create({
      path: file.getPath(),
      name: file.getName(),
      userId: file.getUserId(),
      toBeDeleted: file.getToBeDeleted(),
      key: file.getKey(),
    });

    const numberOfDestroyedFiles = await File.destroy({
      where: {
        id: createdFile.id,
      },
    });

    expect(numberOfDestroyedFiles).toBe(1);
  });

  it("should find files by id", async () => {
    const random = Math.floor(Math.random() * users.length);

    const userId = users[random].id;

    const file = createFile(createFakeFile({ userId }));

    const createdFile = await File.create({
      path: file.getPath(),
      name: file.getName(),
      toBeDeleted: file.getToBeDeleted(),
      userId: file.getUserId(),
      key: file.getKey(),
    });

    const findOne = await File.findOne({
      where: {
        id: createdFile.id,
      },
    });

    expect(findOne).toBeInstanceOf(File);
  });

  it("should find all files", async () => {
    const files = [];

    users.map((user) => {
      for (let i = 0; i < 3; i++) {
        files.push(createFile(createFakeFile({ userId: user.id })));
      }
      return null;
    });

    await Promise.all(
      files.map((file) => {
        return File.create({
          path: file.getPath(),
          toBeDeleted: file.getToBeDeleted(),
          name: file.getName(),
          userId: file.getUserId(),
          key: file.getKey(),
        });
      })
    );

    const findAll = await File.findAll();

    findAll.map((file) => expect(file).toBeInstanceOf(File));
  });
});
