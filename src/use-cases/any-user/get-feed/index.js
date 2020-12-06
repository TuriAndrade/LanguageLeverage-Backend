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
import { Op } from "sequelize";

const getFeed = buildGetFeed({
  Article,
  Subject,
  Editor,
  User,
  Like,
  Comment,
  Op,
});
const getFeedController = buildGetFeedController({ getFeed });

module.exports = {
  getFeed,
  getFeedController,
};
