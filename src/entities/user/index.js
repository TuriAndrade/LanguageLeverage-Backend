import buildCreateUser from "./user";
import isValidEmail from "../../utils/isValidEmail";
import isValidLogin from "../../utils/isValidLogin";
import isValidPassword from "../../utils/isValidPassword";

const createUser = buildCreateUser({
  isValidLogin,
  isValidEmail,
  isValidPassword,
});

export default createUser;
