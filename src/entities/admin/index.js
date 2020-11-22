import buildCreateAdmin from "./admin";
import isValidUser from "../../utils/isValidUser";

const createAdmin = buildCreateAdmin({ isValidUser });

export default createAdmin;
