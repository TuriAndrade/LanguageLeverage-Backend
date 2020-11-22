import buildLikePost from "./like-post";
import buildLikePostController from "./like-post-controller";
import { Article, Like } from "../../../database/models";
import createLike from "../../../entities/like";

const likePost = buildLikePost({ Article, Like, createLike });

const likePostController = buildLikePostController({ likePost });

module.exports = {
  likePost,
  likePostController,
};
