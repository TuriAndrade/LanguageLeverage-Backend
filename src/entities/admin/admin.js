export default function buildCreateAdmin({ isValidUser }) {
  return function createAdmin({
    user,
    hasFullPermission,
    userId = null,
    withNoUser = false,
    withNoUserId = false,
  } = {}) {
    if (!withNoUser) {
      if (!user) {
        throw new Error("User is required!");
      } else if (!isValidUser(user)) {
        throw new Error("Invalid user!");
      }
    }

    if (!hasFullPermission && hasFullPermission !== false) {
      throw new Error("Setting permissions is required!");
    } else if (typeof hasFullPermission !== "boolean") {
      throw new Error("Invalid value for permissions!");
    }

    if (!withNoUserId) {
      if (!userId) {
        throw new Error("User id is required!");
      } else if (typeof userId !== "number") {
        throw new Error("Invalid user id!");
      }
    }

    return Object.freeze({
      ...user,
      getHasFullPermission: () => hasFullPermission,
      getUserId: () => userId,
      setUserId: (newUserId) => {
        if (!newUserId) {
          throw new Error("User id is required!");
        } else if (typeof newUserId !== "number") {
          throw new Error("Invalid user id!");
        }

        withNoUserId = false;
        userId = newUserId;
      },
      grantFullPermission: () => {
        hasFullPermission = true;
      },
      removeFullPermission: () => {
        hasFullPermission = false;
      },
      hasUser: () => !withNoUser,
      hasUserId: () => !withNoUserId,
    });
  };
}
