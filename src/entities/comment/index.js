import buildCreateComment from "./comment";
import isValidEmail from "../../utils/isValidEmail";

const createComment = buildCreateComment({ isValidEmail });

export default createComment;
