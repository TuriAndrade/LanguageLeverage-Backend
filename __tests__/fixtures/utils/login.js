import { login } from "../../../src/use-cases/registered-user/any-registered-user/login";
import { User, Admin, Editor } from "../../../src/database/models";
import createFakeUser from "../fakeUser";
import createFakeEditor from "../fakeEditor";
import createFakeAdmin from "../fakeAdmin";

const jwt = require("jsonwebtoken");

require("../../../src/config/dotenv");

async function notValidatedEditorLogin() {
  const user = createFakeUser();

  const createdUser = await User.create({
    login: user.login,
    password: user.password,
    name: user.name,
    email: user.email,
  });

  const editor = createFakeEditor({
    userId: createdUser.id,
    isValidated: false,
  });

  await Editor.create({
    isValidated: editor.isValidated,
    description: editor.description,
    userId: editor.userId,
  });

  const result = await login({
    login: user.login,
    password: user.password,
    reqIp: "187.73.73.86",
  });

  const decodedToken = jwt.verify(result.token, process.env.JWT_AUTHENTICATION);

  return {
    decodedToken,
    user,
    editor,
  };
}

async function validatedEditorLogin() {
  const user = createFakeUser();

  const createdUser = await User.create({
    login: user.login,
    password: user.password,
    name: user.name,
    email: user.email,
  });

  const editor = createFakeEditor({
    userId: createdUser.id,
    isValidated: true,
  });

  await Editor.create({
    isValidated: editor.isValidated,
    description: editor.description,
    userId: editor.userId,
  });

  const result = await login({
    login: user.login,
    password: user.password,
    reqIp: "187.73.73.86",
  });

  const decodedToken = jwt.verify(result.token, process.env.JWT_AUTHENTICATION);

  return {
    decodedToken,
    user,
    editor,
  };
}

async function fullyPermittedAdminLogin() {
  const user = createFakeUser();

  const createdUser = await User.create({
    login: user.login,
    password: user.password,
    name: user.name,
    email: user.email,
  });

  const admin = createFakeAdmin({
    userId: createdUser.id,
    hasFullPermission: true,
  });

  await Admin.create({
    hasFullPermission: admin.hasFullPermission,
    userId: admin.userId,
  });

  const result = await login({
    login: user.login,
    password: user.password,
    reqIp: "187.73.73.86",
  });

  const decodedToken = jwt.verify(result.token, process.env.JWT_AUTHENTICATION);

  return {
    decodedToken,
    user,
    admin,
  };
}

async function notFullyPermittedAdminLogin() {
  const user = createFakeUser();

  const createdUser = await User.create({
    login: user.login,
    password: user.password,
    name: user.name,
    email: user.email,
  });

  const admin = createFakeAdmin({
    userId: createdUser.id,
    hasFullPermission: false,
  });

  await Admin.create({
    hasFullPermission: admin.hasFullPermission,
    userId: admin.userId,
  });

  const result = await login({
    login: user.login,
    password: user.password,
    reqIp: "187.73.73.86",
  });

  const decodedToken = jwt.verify(result.token, process.env.JWT_AUTHENTICATION);

  return {
    decodedToken,
    user,
    admin,
  };
}

async function userLogin() {
  const user = createFakeUser();

  await User.create({
    login: user.login,
    password: user.password,
    name: user.name,
    email: user.email,
  });

  const result = await login({
    login: user.login,
    password: user.password,
    reqIp: "187.73.73.86",
  });

  const decodedToken = jwt.verify(result.token, process.env.JWT_AUTHENTICATION);

  return {
    decodedToken,
    user,
  };
}

module.exports = {
  notValidatedEditorLogin,
  validatedEditorLogin,
  fullyPermittedAdminLogin,
  notFullyPermittedAdminLogin,
  userLogin,
};
