export default function buildCreateEditor({ isValidUser }) {
  return function createEditor({
    user,
    description,
    isValidated = false,
    userId,
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

    if (!description) {
      throw new Error("Description is required!");
    } else if (description.length > 200) {
      throw new Error("Description must have at most 200 characters!");
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
      getDescription: () => description,
      getIsValidated: () => isValidated,
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
      validate: () => {
        isValidated = true;
      },
      invalidate: () => {
        isValidated = false;
      },
      hasUser: () => !withNoUser,
      hasUserId: () => !withNoUserId,
    });
  };
}
