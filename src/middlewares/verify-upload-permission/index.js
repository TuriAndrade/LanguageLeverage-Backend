import buildVerifyUploadPermission from "./verify-upload-permission";
import buildVerifyUploadPermissionMiddleware from "./verify-upload-permission-middleware";
import { Admin, Editor } from "../../database/models";

const verifyUploadPermission = buildVerifyUploadPermission({ Admin, Editor });

const verifyUploadPermissionMiddleware = buildVerifyUploadPermissionMiddleware({
  verifyUploadPermission,
});

module.exports = {
  verifyUploadPermission,
  verifyUploadPermissionMiddleware,
};
