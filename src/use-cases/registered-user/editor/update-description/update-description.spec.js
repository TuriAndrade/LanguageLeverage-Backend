import createUser from "../../../../entities/user";
import createFakeUser from "../../../../../__tests__/fixtures/fakeUser";
import createEditor from "../../../../entities/editor";
import createFakeEditor from "../../../../../__tests__/fixtures/fakeEditor";
import { login } from "../../any-registered-user/login";
import { updateDescription } from "./index";
import { User, Editor } from "../../../../database/models";
import truncate from "../../../../../__tests__/fixtures/utils/truncate";

const jwt = require("jsonwebtoken");

describe("Update editor description", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should update description", async () => {
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

    const newEditor = createEditor(
      createFakeEditor({ userId: createdUser.id })
    );

    const numberOfUpdatedEditors = await jwt.verify(
      result.token,
      process.env.JWT_AUTHENTICATION,
      async (error, result) => {
        if (error) {
          console.log(error);
        }

        const number = await updateDescription({
          userToken: result,
          description: newEditor.getDescription(),
        });

        return number;
      }
    );

    expect(numberOfUpdatedEditors).toBe(1);
  });
});
