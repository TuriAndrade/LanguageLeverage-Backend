export default function buildCreateAccount({
  User,
  Editor,
  createUser,
  createEditor,
}) {
  return async function createAccount({
    login,
    password,
    name,
    email,
    description,
  }) {
    const loginAlreadyExists = await User.findOne({
      where: {
        login,
      },
    });

    if (loginAlreadyExists) {
      throw new Error("Login already exists!");
    }

    const emailAlreadyExists = await User.findOne({
      where: {
        email,
      },
    });

    if (emailAlreadyExists) {
      throw new Error("Email already exists!");
    }

    const user = createUser({ login, password, name, email });

    const editor = createEditor({ user, description, withNoUserId: true });

    const createdUser = await User.create({
      login: user.getLogin(),
      password: user.getPassword(),
      email: user.getEmail(),
      name: user.getName(),
    });

    editor.setUserId(createdUser.id);

    await Editor.create({
      description: editor.getDescription(),
      isValidated: editor.getIsValidated(),
      userId: editor.getUserId(),
    });

    return {
      userId: editor.getUserId(),
    };
  };
}
