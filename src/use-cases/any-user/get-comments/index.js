import buildGetComments from "./get-comments";
import buildGetCommentsController from "./get-comments-controller";
import { Comment } from "../../../database/models";

const getComments = buildGetComments({ Comment });

const getCommentsController = buildGetCommentsController({ getComments });

module.exports = {
  getComments,
  getCommentsController,
};
