import buildGetFeed from "./get-feed";
import buildGetFeedController from "./get-feed-controller";
import Sequelize from "sequelize";
import config from "../../../config/database";

const sequelize = new Sequelize(config);

const getFeed = buildGetFeed({
  sequelize,
});
const getFeedController = buildGetFeedController({ getFeed });

module.exports = {
  getFeed,
  getFeedController,
};
