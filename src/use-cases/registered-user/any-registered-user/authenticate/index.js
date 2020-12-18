import buildAuthenticate from "./authenticate";
import buildAuthenticateController from "./authenticate-controller";
import { createToken } from "../../../../utils/JWT";
import { Editor, Admin } from "../../../../database/models";

const authenticate = buildAuthenticate({
  createToken,
  Editor,
  Admin,
});

const authenticateController = buildAuthenticateController({
  authenticate,
});

module.exports = {
  authenticate,
  authenticateController,
};
