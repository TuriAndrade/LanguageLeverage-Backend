import buildGetCommentsNumber from "./get-comments-number";
import buildGetCommentsNumberController from "./get-comments-number-controller";
import { Comment } from "../../../database/models";

const getCommentsNumber = buildGetCommentsNumber({ Comment });

const getCommentsNumberController = buildGetCommentsNumberController({
  getCommentsNumber,
});

module.exports = {
  getCommentsNumber,
  getCommentsNumberController,
};
