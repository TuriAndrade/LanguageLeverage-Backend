import createAdmin from "../../entities/admin";
import createFakeAdmin from "../../../__tests__/fixtures/fakeAdmin";
import truncate from "../../../__tests__/fixtures/utils/truncate";
import { insertUsers } from "../../../__tests__/fixtures/utils/seedDb";
import { Admin } from "./index";

describe("Admin database", () => {
  let users = [];

  beforeEach(async () => {
    await truncate();
    users = await insertUsers();
  });

  it("should create admin", async () => {
    const random = Math.floor(Math.random() * users.length);

    const userId = users[random].id;

    const admin = createAdmin(createFakeAdmin({ userId }));

    const createdAdmin = await Admin.create({
      hasFullPermission: admin.getHasFullPermission(),
      userId: admin.getUserId(),
    });

    expect(createdAdmin).toBeInstanceOf(Admin);
  });

  it("should update admin", async () => {
    const random = Math.floor(Math.random() * users.length);

    const userId = users[random].id;

    const admin = createAdmin(
      createFakeAdmin({ userId, hasFullPermission: false })
    );

    const createdAdmin = await Admin.create({
      hasFullPermission: admin.getHasFullPermission(),
      userId: admin.getUserId(),
    });

    const update = createAdmin(
      createFakeAdmin({ userId, hasFullPermission: true })
    );

    const [numberOfUpdatedAdmins, updatedAdmins] = await Admin.update(
      {
        hasFullPermission: update.getHasFullPermission(),
      },
      {
        where: {
          id: createdAdmin.id,
        },
        individualHooks: true,
      }
    );

    expect(numberOfUpdatedAdmins).toBe(1);
    expect(updatedAdmins[0].hasFullPermission).toBe(
      update.getHasFullPermission()
    );
  });

  it("should delete admin", async () => {
    const random = Math.floor(Math.random() * users.length);

    const userId = users[random].id;

    const admin = createAdmin(createFakeAdmin({ userId }));

    const createdAdmin = await Admin.create({
      hasFullPermission: admin.getHasFullPermission(),
      userId: admin.getUserId(),
    });

    const numberOfDestroyedAdmins = await Admin.destroy({
      where: {
        id: createdAdmin.id,
      },
    });

    expect(numberOfDestroyedAdmins).toBe(1);
  });

  it("should find admins by id", async () => {
    const random = Math.floor(Math.random() * users.length);

    const userId = users[random].id;

    const admin = createAdmin(createFakeAdmin({ userId }));

    const createdAdmin = await Admin.create({
      hasFullPermission: admin.getHasFullPermission(),
      userId: admin.getUserId(),
    });

    const findOne = await Admin.findOne({
      where: {
        id: createdAdmin.id,
      },
    });

    expect(findOne).toBeInstanceOf(Admin);
  });

  it("should find all admins", async () => {
    const admins = users.map((user) => {
      const admin = createAdmin(createFakeAdmin({ userId: user.id }));
      return admin;
    });

    await Promise.all(
      admins.map((admin) => {
        return Admin.create({
          hasFullPermission: admin.getHasFullPermission(),
          userId: admin.getUserId(),
        });
      })
    );

    const findAll = await Admin.findAll();

    findAll.map((admin) => expect(admin).toBeInstanceOf(Admin));
  });
});
