import buildDeleteAccount from "./delete-account";
import buildDeleteAccountController from "./delete-account-controller";
import { User } from "../../../../database/models";

const bcrypt = require("bcryptjs");

const deleteAccount = buildDeleteAccount({
  User,
  bcrypt,
});

const deleteAccountController = buildDeleteAccountController({
  deleteAccount,
});

module.exports = {
  deleteAccount,
  deleteAccountController,
};
