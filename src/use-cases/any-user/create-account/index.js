import buildCreateAccount from "./create-account";
import buildCreateAccountController from "./create-account-controller";
import createUser from "../../../entities/user";
import createEditor from "../../../entities/editor";
import { User, Editor } from "../../../database/models";

const createAccount = buildCreateAccount({
  User,
  Editor,
  createUser,
  createEditor,
});

const createAccountController = buildCreateAccountController({
  createAccount,
});

module.exports = {
  createAccount,
  createAccountController,
};
