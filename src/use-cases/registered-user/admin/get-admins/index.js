import buildGetAdmins from "./get-admins";
import buildGetAdminsController from "./get-admins-controller";
import { User, Admin } from "../../../../database/models";

const getAdmins = buildGetAdmins({ User, Admin });
const getAdminsController = buildGetAdminsController({ getAdmins });

module.exports = {
  getAdmins,
  getAdminsController,
};
