import createUser from "../../entities/user";
import createFakeUser from "../../../__tests__/fixtures/fakeUser";
import truncate from "../../../__tests__/fixtures/utils/truncate";
import { User } from "./index";

const bcrypt = require("bcryptjs");

describe("User database", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should create user", async () => {
    const user = createUser(createFakeUser());

    const createdUser = await User.create({
      login: user.getLogin(),
      password: user.getPassword(),
      name: user.getName(),
      email: user.getEmail(),
      picture: user.getPicture(),
    });

    expect(createdUser).toBeInstanceOf(User);
  });

  it("should update user", async () => {
    const user = createUser(createFakeUser());

    const createdUser = await User.create({
      login: user.getLogin(),
      password: user.getPassword(),
      name: user.getName(),
      email: user.getEmail(),
    });

    const update = createUser(createFakeUser());

    const [numberOfUpdatedUsers, updatedUsers] = await User.update(
      {
        login: update.getLogin(),
        password: update.getPassword(),
        name: update.getName(),
        email: update.getEmail(),
      },
      {
        where: {
          id: createdUser.id,
        },
        individualHooks: true,
        /* 
          This method updates many rows, so hooks are not fired on the updates for performance reasons
          However, if you are updating only one row or wants the hooks to be called on every update,
          you can pass individualHooks:true
        */
      }
    );

    expect(numberOfUpdatedUsers).toBe(1);
    expect(updatedUsers[0].login).toBe(update.getLogin());
    expect(
      await bcrypt.compare(update.getPassword(), updatedUsers[0].passwordHash)
    ).toBeTruthy();
    expect(updatedUsers[0].name).toBe(update.getName());
    expect(updatedUsers[0].email).toBe(update.getEmail());
  });

  it("should delete user", async () => {
    const user = createUser(createFakeUser());

    const createdUser = await User.create({
      login: user.getLogin(),
      password: user.getPassword(),
      name: user.getName(),
      email: user.getEmail(),
    });

    const numberOfDestroyedUsers = await User.destroy({
      where: {
        id: createdUser.id,
      },
    });

    expect(numberOfDestroyedUsers).toBe(1);
  });

  it("should find users by id", async () => {
    const user = createUser(createFakeUser());

    const createdUser = await User.create({
      login: user.getLogin(),
      password: user.getPassword(),
      name: user.getName(),
      email: user.getEmail(),
    });

    const findOne = await User.findOne({
      where: {
        id: createdUser.id,
      },
    });

    expect(findOne).toBeInstanceOf(User);
  });

  it("should find all users", async () => {
    const users = [];

    for (let i = 0; i < 10; i++) {
      users.push(createUser(createFakeUser()));
    }

    await Promise.all(
      users.map((user) => {
        return User.create({
          login: user.getLogin(),
          password: user.getPassword(),
          name: user.getName(),
          email: user.getEmail(),
        });
      })
    );

    const findAll = await User.findAll();

    findAll.map((user) => expect(user).toBeInstanceOf(User));
  });
});
