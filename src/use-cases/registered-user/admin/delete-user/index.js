import buildDeleteUser from "./delete-user";
import buildDeleteUserController from "./delete-user-controller";
import { User, Admin } from "../../../../database/models";

const deleteUser = buildDeleteUser({ User, Admin });
const deleteUserController = buildDeleteUserController({ deleteUser });

module.exports = {
  deleteUser,
  deleteUserController,
};
