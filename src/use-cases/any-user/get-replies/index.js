import buildGetReplies from "./get-replies";
import buildGetRepliesController from "./get-replies-controller";
import { Comment } from "../../../database/models";

const getReplies = buildGetReplies({ Comment });

const getRepliesController = buildGetRepliesController({ getReplies });

module.exports = {
  getReplies,
  getRepliesController,
};
