import buildCreateSubscriber from "./subscriber";
import isValidEmail from "../../utils/isValidEmail";

const createSubscriber = buildCreateSubscriber({ isValidEmail });

export default createSubscriber;
