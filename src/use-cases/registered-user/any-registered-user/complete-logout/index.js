import buildCompleteLogout from "./complete-logout";
import buildCompleteLogoutController from "./complete-logout-controller";
import sessionsDb from "../../../../database/sessions-db";
import { User } from "../../../../database/models";

const bcrypt = require("bcryptjs");

const completeLogout = buildCompleteLogout({
  sessionsDb,
  User,
  bcrypt,
});

const completeLogoutController = buildCompleteLogoutController({
  completeLogout,
});

module.exports = {
  completeLogout,
  completeLogoutController,
};
