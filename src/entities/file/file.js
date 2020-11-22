export default function buildCreateFile() {
  return function createFile({
    path,
    userId,
    name,
    withNoUserId = false,
    key,
    toBeDeleted = true,
  } = {}) {
    if (!path) {
      throw new Error("Path is required!");
    }

    if (name && typeof name !== "string") {
      throw new Error("Name must be a string!");
    }

    if (!withNoUserId) {
      if (!userId) {
        throw new Error("User id is required!");
      } else if (typeof userId !== "number") {
        throw new Error("Invalid user id!");
      }
    }

    if (!key) {
      throw new Error("Key is required!");
    }

    return Object.freeze({
      getKey: () => key,
      getPath: () => path,
      getUserId: () => userId,
      getName: () => name,
      getToBeDeleted: () => toBeDeleted,
      setUserId: (newUserId) => {
        if (!newUserId) {
          throw new Error("User id is required!");
        } else if (typeof newUserId !== "number") {
          throw new Error("Invalid user id!");
        }

        withNoUserId = false;
        userId = newUserId;
      },
      hasUserId: () => !withNoUserId,
    });
  };
}
