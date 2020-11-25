export default function buildCreateArticle() {
  return function createArticle({
    title,
    html,
    cover,
    delta,
    isPublished = false,
    isAdmissionArticle = false,
    editorId,
    withNoEditorId = false,
  } = {}) {
    if (!title) {
      throw new Error("Title is required!");
    } else if (title.length > 100) {
      throw new Error("Title must have at most 100 characters!");
    }

    if (!html) {
      throw new Error("Html is required!");
    }

    if (!delta) {
      throw new Error("Delta is required!");
    }

    if (!cover) {
      throw new Error("Cover is required!");
    }

    if (!withNoEditorId) {
      if (!editorId) {
        throw new Error("Editor id is required!");
      } else if (typeof editorId !== "number") {
        throw new Error("Invalid editor id!");
      }
    }

    return Object.freeze({
      getTitle: () => title,
      getCover: () => cover,
      getHtml: () => html,
      getDelta: () => delta,
      getIsPublished: () => isPublished,
      getIsAdmissionArticle: () => isAdmissionArticle,
      getEditorId: () => editorId,
      setEditorId: (newEditorId) => {
        if (!newEditorId) {
          throw new Error("Editor id is required!");
        } else if (typeof newEditorId !== "number") {
          throw new Error("Invalid editor id!");
        }

        withNoEditorId = false;
        editorId = newEditorId;
      },
      publish: () => {
        isPublished = true;
      },
      unpublish: () => {
        isPublished = false;
      },
      hasEditorId: () => !withNoEditorId,
    });
  };
}
