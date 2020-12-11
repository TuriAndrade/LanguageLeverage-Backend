import buildLikePost from "./like-post";
import buildLikePostController from "./like-post-controller";
import { Article, Like, User } from "../../../database/models";
import createLike from "../../../entities/like";

const likePost = buildLikePost({ Article, Like, createLike, User });

const likePostController = buildLikePostController({ likePost });

module.exports = {
  likePost,
  likePostController,
};
