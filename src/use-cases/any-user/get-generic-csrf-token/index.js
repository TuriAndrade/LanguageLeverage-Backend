import buildGetGenericCsrfToken from "./get-generic-csrf-token";
import buildGetGenericCsrfTokenController from "./get-generic-csrf-token-controller";
import { createToken } from "../../../utils/JWT";

const getGenericCsrfToken = buildGetGenericCsrfToken({ createToken });

const getGenericCsrfTokenController = buildGetGenericCsrfTokenController({
  getGenericCsrfToken,
});

module.exports = {
  getGenericCsrfToken,
  getGenericCsrfTokenController,
};
