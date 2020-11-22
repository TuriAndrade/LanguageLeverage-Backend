import buildAuthenticate from "./authenticate";
import buildAuthenticateController from "./authenticate-controller";
import { createToken } from "../../../../utils/JWT";

const authenticate = buildAuthenticate({
  createToken,
});

const authenticateController = buildAuthenticateController({
  authenticate,
});

module.exports = {
  authenticate,
  authenticateController,
};
