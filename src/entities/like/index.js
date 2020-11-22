import buildCreateLike from "./like";
import isValidEmail from "../../utils/isValidEmail";

const createLike = buildCreateLike({ isValidEmail });

export default createLike;
