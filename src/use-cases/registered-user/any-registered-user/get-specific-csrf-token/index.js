import buildGetSpecificCsrfToken from "./get-specific-csrf-token";
import buildGetSpecificCsrfTokenController from "./get-specific-csrf-token-controller";
import { createToken } from "../../../../utils/JWT";

const getSpecificCsrfToken = buildGetSpecificCsrfToken({ createToken });

const getSpecificCsrfTokenController = buildGetSpecificCsrfTokenController({
  getSpecificCsrfToken,
});

module.exports = {
  getSpecificCsrfToken,
  getSpecificCsrfTokenController,
};
