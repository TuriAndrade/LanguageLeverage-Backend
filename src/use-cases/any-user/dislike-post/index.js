import buildDislikePost from "./dislike-post";
import buildDislikePostController from "./dislike-post-controller";
import { Article, Like, User } from "../../../database/models";

const dislikePost = buildDislikePost({ Article, Like, User });

const dislikePostController = buildDislikePostController({ dislikePost });

module.exports = {
  dislikePost,
  dislikePostController,
};
