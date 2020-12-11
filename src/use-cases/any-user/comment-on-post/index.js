import buildCommentOnPost from "./comment-on-post";
import buildCommentOnPostController from "./comment-on-post-controller";
import {
  Article,
  Comment,
  User,
  Admin,
  Editor,
} from "../../../database/models";
import createComment from "../../../entities/comment";

const commentOnPost = buildCommentOnPost({
  Article,
  Comment,
  createComment,
  User,
  Admin,
  Editor,
});

const commentOnPostController = buildCommentOnPostController({ commentOnPost });

module.exports = {
  commentOnPost,
  commentOnPostController,
};
