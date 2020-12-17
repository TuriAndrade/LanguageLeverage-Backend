import createExpressCallback from "./utils/createExpressCallback";
import createMulterCallback from "./utils/createMulterCallback";

// ANY USER CONTROLLERS
import { commentOnPostController } from "./use-cases/any-user/comment-on-post";
import { createAccountController } from "./use-cases/any-user/create-account";
import { dislikePostController } from "./use-cases/any-user/dislike-post";
import { getFeedController } from "./use-cases/any-user/get-feed";
import { getPublishedArticleController } from "./use-cases/any-user/get-published-article";
import { getGenericCsrfTokenController } from "./use-cases/any-user/get-generic-csrf-token";
import { getSubjectsController } from "./use-cases/any-user/get-subjects";
import { likePostController } from "./use-cases/any-user/like-post";
import { subscribeToNewsletterController } from "./use-cases/any-user/subscribe-to-newsletter";

// ANY REGISTERED USER CONTROLLERS
import { authenticateController } from "./use-cases/registered-user/any-registered-user/authenticate";
import { completeLogoutController } from "./use-cases/registered-user/any-registered-user/complete-logout";
import { deleteAccountController } from "./use-cases/registered-user/any-registered-user/delete-account";
import { deleteFileController } from "./use-cases/registered-user/any-registered-user/delete-file";
import { getSessionsController } from "./use-cases/registered-user/any-registered-user/get-sessions";
import { getUserController } from "./use-cases/registered-user/any-registered-user/get-user";
import { getSpecificCsrfTokenController } from "./use-cases/registered-user/any-registered-user/get-specific-csrf-token";
import { loginController } from "./use-cases/registered-user/any-registered-user/login";
import { logoutController } from "./use-cases/registered-user/any-registered-user/logout";
import { updatePasswordController } from "./use-cases/registered-user/any-registered-user/update-password";
import { updateUserDataController } from "./use-cases/registered-user/any-registered-user/update-user-data";
import { uploadFileController } from "./use-cases/registered-user/any-registered-user/upload-file";

// ADMIN CONTROLLERS
import { deleteAnyArticleController } from "./use-cases/registered-user/admin/delete-any-article";
import { deleteUserController } from "./use-cases/registered-user/admin/delete-user";
import { getAdminsController } from "./use-cases/registered-user/admin/get-admins";
import { getAllArticlesController } from "./use-cases/registered-user/admin/get-all-articles";
import { getAnyArticleController } from "./use-cases/registered-user/admin/get-any-article";
import { getEditorArticlesController } from "./use-cases/registered-user/admin/get-editor-articles";
import { getEditorsController } from "./use-cases/registered-user/admin/get-editors";
import { invalidateEditorController } from "./use-cases/registered-user/admin/invalidate-editor";
import { validateEditorController } from "./use-cases/registered-user/admin/validate-editor";
import { unpublishAnyArticleController } from "./use-cases/registered-user/admin/unpublish-any-article";

// EDITOR CONTROLLERS
import { addAdmissionArticleController } from "./use-cases/registered-user/editor/add-admission-article";
import { addArticleController } from "./use-cases/registered-user/editor/add-article";
import { addSubjectController } from "./use-cases/registered-user/editor/add-subject";
import { deleteArticleController } from "./use-cases/registered-user/editor/delete-article";
import { deleteSubjectController } from "./use-cases/registered-user/editor/delete-subject";
import { getArticleController } from "./use-cases/registered-user/editor/get-article";
import { getArticlesController } from "./use-cases/registered-user/editor/get-articles";
import { publishArticleController } from "./use-cases/registered-user/editor/publish-article";
import { unpublishArticleController } from "./use-cases/registered-user/editor/unpublish-article";
import { updateArticleController } from "./use-cases/registered-user/editor/update-article";
import { updateDescriptionController } from "./use-cases/registered-user/editor/update-description";
import { updateSubjectsController } from "./use-cases/registered-user/editor/update-subjects";

// MIDDLEWARES
import {
  verifyAuthTokenMiddleware,
  verifyOptionalAuthTokenMiddleware,
} from "./middlewares/verify-auth-token";
import { verifyCsrfTokenMiddleware } from "./middlewares/verify-csrf-token";
import { verifyUploadPermissionMiddleware } from "./middlewares/verify-upload-permission";

const express = require("express");

const multer = require("multer");

const multerConfig = require("./config/multer");

const routes = express.Router();

routes.post(
  "/comment",
  createExpressCallback(verifyOptionalAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(commentOnPostController)
);

routes.post(
  "/editor",
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(createAccountController)
);

routes.post(
  "/dislike",
  createExpressCallback(verifyOptionalAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(dislikePostController)
);

routes.post(
  "/get/feed",
  createExpressCallback(verifyOptionalAuthTokenMiddleware),
  createExpressCallback(getFeedController)
);

routes.post(
  "/get/published/article/:articleId",
  createExpressCallback(verifyOptionalAuthTokenMiddleware),
  createExpressCallback(getPublishedArticleController)
);

routes.get(
  "/generic/csrf/token",
  createExpressCallback(getGenericCsrfTokenController)
);

routes.post("/get/subjects", createExpressCallback(getSubjectsController));

routes.post(
  "/like",
  createExpressCallback(verifyOptionalAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(likePostController)
);

routes.post(
  "/subscribe",
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(subscribeToNewsletterController)
);

routes.get(
  "/authenticate",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(authenticateController)
);

routes.post(
  "/delete/session",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(completeLogoutController)
); // it's a post because it needs a req body

routes.delete(
  "/user",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(deleteAccountController)
);

routes.delete(
  "/delete/file/:key",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(deleteFileController)
);

routes.get(
  "/specific/csrf/token",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(getSpecificCsrfTokenController)
);

routes.get(
  "/sessions",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(getSessionsController)
);

routes.get(
  "/user",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(getUserController)
);

routes.post(
  "/session",
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(loginController)
);

routes.delete(
  "/session",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(logoutController)
);

routes.patch(
  "/user/password",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(updatePasswordController)
);

routes.patch(
  "/user/data",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(updateUserDataController)
);

routes.post(
  "/upload/file",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(verifyUploadPermissionMiddleware),
  createMulterCallback(multer(multerConfig).single("file")),
  createExpressCallback(uploadFileController)
);

routes.delete(
  "/any/article/:articleId",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(deleteAnyArticleController)
);

routes.delete(
  "/any/user/:userId",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(deleteUserController)
);

routes.get(
  "/admins",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(getAdminsController)
);

routes.get(
  "/all/articles",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(getAllArticlesController)
);

routes.get(
  "/any/article/:articleId",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(getAnyArticleController)
);

routes.get(
  "/editor/articles/:editorId",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(getEditorArticlesController)
);

routes.get(
  "/editors",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(getEditorsController)
);

routes.patch(
  "/invalidate/editor/:editorId",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(invalidateEditorController)
);

routes.patch(
  "/validate/editor/:editorId",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(validateEditorController)
);

routes.patch(
  "/unpublish/any/article/:articleId",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(unpublishAnyArticleController)
);

routes.post(
  "/admission/article",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(addAdmissionArticleController)
);

routes.post(
  "/article",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(addArticleController)
);

routes.post(
  "/subject",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(addSubjectController)
);

routes.patch(
  "/subjects",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(updateSubjectsController)
);

routes.delete(
  "/article/:articleId",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(deleteArticleController)
);

routes.delete(
  "/subject/:subjectId",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(deleteSubjectController)
);

routes.get(
  "/editor/article/:articleId",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(getArticleController)
);

routes.get(
  "/editor/articles",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(getArticlesController)
);

routes.patch(
  "/publish/article/:articleId",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(publishArticleController)
);

routes.patch(
  "/unpublish/article/:articleId",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(unpublishArticleController)
);

routes.patch(
  "/article/:articleId",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(updateArticleController)
);

routes.patch(
  "/editor/description",
  createExpressCallback(verifyAuthTokenMiddleware),
  createExpressCallback(verifyCsrfTokenMiddleware),
  createExpressCallback(updateDescriptionController)
);

module.exports = routes;
