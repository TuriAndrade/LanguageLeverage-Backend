import buildGetLikes from "./get-likes";
import buildGetLikesController from "./get-likes-controller";
import { Like, User } from "../../../database/models";

const getLikes = buildGetLikes({ Like, User });

const getLikesController = buildGetLikesController({ getLikes });

module.exports = {
  getLikes,
  getLikesController,
};
