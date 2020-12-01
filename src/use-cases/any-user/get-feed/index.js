import buildGetFeed from "./get-feed";
import buildGetFeedController from "./get-feed-controller";
import { Article, Subject } from "../../../database/models";
import { Op } from "sequelize";

const getFeed = buildGetFeed({ Article, Subject, Op });
const getFeedController = buildGetFeedController({ getFeed });

module.exports = {
  getFeed,
  getFeedController,
};
