import buildCommentOnPost from "./comment-on-post";
import buildCommentOnPostController from "./comment-on-post-controller";
import { Article, Comment } from "../../../database/models";
import createComment from "../../../entities/comment";

const commentOnPost = buildCommentOnPost({ Article, Comment, createComment });

const commentOnPostController = buildCommentOnPostController({ commentOnPost });

module.exports = {
  commentOnPost,
  commentOnPostController,
};
