import buildLogout from "./logout";
import buildLogoutController from "./logout-controller";
import sessionsDb from "../../../../database/sessions-db";

const logout = buildLogout({ sessionsDb });

const logoutController = buildLogoutController({ logout });

module.exports = {
  logout,
  logoutController,
};
