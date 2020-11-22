import buildUpdatePassword from "./update-password";
import buildUpdatePasswordController from "./update-password-controller";
import createUser from "../../../../entities/user";
import { User } from "../../../../database/models";

const bcrypt = require("bcryptjs");

const updatePassword = buildUpdatePassword({
  User,
  createUser,
  bcrypt,
});

const updatePasswordController = buildUpdatePasswordController({
  updatePassword,
});

module.exports = {
  updatePassword,
  updatePasswordController,
};
