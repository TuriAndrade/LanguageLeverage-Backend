import buildLogin from "./login";
import buildLoginController from "./login-controller";
import { createToken } from "../../../../utils/JWT";
import { User, Admin, Editor } from "../../../../database/models";
import sessionsDb from "../../../../database/sessions-db";

const crypto = require("crypto");

const bcrypt = require("bcryptjs");

const login = buildLogin({
  createToken,
  User,
  Admin,
  Editor,
  sessionsDb,
  bcrypt,
  crypto,
});

const loginController = buildLoginController({
  login,
});

module.exports = {
  login,
  loginController,
};
