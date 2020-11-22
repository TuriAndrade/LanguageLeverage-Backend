import buildGetSessions from "./get-sessions";
import geoIp from "geoip-lite";
import buildGetSessionsController from "./get-sessions-controller";
import sessionsDb from "../../../../database/sessions-db";

const getSessions = buildGetSessions({ sessionsDb, geoIp });

const getSessionsController = buildGetSessionsController({ getSessions });

module.exports = {
  getSessions,
  getSessionsController,
};
