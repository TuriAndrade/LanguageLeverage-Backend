import buildGetUser from "./get-user";
import buildGetUserController from "./get-user-controller";
import { User, Admin, Editor } from "../../../../database/models";

const getUser = buildGetUser({ User, Admin, Editor });

const getUserController = buildGetUserController({ getUser });

module.exports = {
  getUser,
  getUserController,
};
