import buildUpdateUserData from "./update-user-data";
import buildUpdateUserDataController from "./update-user-data-controller";
import { User } from "../../../../database/models";
import createUser from "../../../../entities/user";

const updateUserData = buildUpdateUserData({
  User,
  createUser,
});

const updateUserDataController = buildUpdateUserDataController({
  updateUserData,
});

module.exports = {
  updateUserData,
  updateUserDataController,
};
