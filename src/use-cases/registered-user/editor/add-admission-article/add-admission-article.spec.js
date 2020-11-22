import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { addAdmissionArticle } from "./index";
import { notValidatedEditorLogin } from "../../../../../__tests__/fixtures/utils/login";

describe("Add article", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should add a new article", async () => {
    const loggedUser = await notValidatedEditorLogin();

    const createdArticle = await addAdmissionArticle({
      userToken: loggedUser.decodedToken,
      title: "title for this article",
      cover: "link/to/cover",
      delta: {
        ops: [{ img: "anything" }],
      },
      html: "<p>teste</p>",
    });

    expect(createdArticle.articleId).toEqual(expect.any(Number));
  });

  it("should throw error for editor that already has an admission article", async () => {
    const loggedUser = await notValidatedEditorLogin();

    await addAdmissionArticle({
      userToken: loggedUser.decodedToken,
      title: "title for this article",
      cover: "link/to/cover",
      delta: {
        ops: [{ img: "anything" }],
      },
      html: "<p>teste</p>",
    });

    await expect(
      addAdmissionArticle({
        userToken: loggedUser.decodedToken,
        title: "title",
        cover: "link/to/cover",
        delta: {
          ops: [{ img: "anything" }],
        },
        html: "<p>teste</p>",
      })
    ).rejects.toThrowError();
  });
});
