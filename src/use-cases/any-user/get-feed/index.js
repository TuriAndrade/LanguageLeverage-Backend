import buildGetFeed from "./get-feed";
import buildGetFeedController from "./get-feed-controller";
import {
  Article,
  Subject,
  Editor,
  User,
  Like,
  Comment,
} from "../../../database/models";
import Sequelize from "sequelize";
import config from "../../../config/database";

const sequelize = new Sequelize(config);

const getFeed = buildGetFeed({
  Article,
  Subject,
  Editor,
  User,
  Like,
  Comment,
  sequelize,
});
const getFeedController = buildGetFeedController({ getFeed });

module.exports = {
  getFeed,
  getFeedController,
};
