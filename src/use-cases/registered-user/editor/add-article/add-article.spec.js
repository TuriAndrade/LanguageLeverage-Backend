import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { addArticle } from "./index";
import {
  validatedEditorLogin,
  notValidatedEditorLogin,
} from "../../../../../__tests__/fixtures/utils/login";

describe("Add article", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should add a new article", async () => {
    const loggedUser = await validatedEditorLogin();

    const createdArticle = await addArticle({
      userToken: loggedUser.decodedToken,
      title: "title for this article",
      cover: "link/to/cover",
      delta: {
        ops: [{ img: "anything" }],
      },
      isPublished: true,
      html: "<p>teste</p>",
    });

    expect(createdArticle.articleId).toEqual(expect.any(Number));
  });

  it("should throw error for not validated editor", async () => {
    const loggedUser = await notValidatedEditorLogin();

    await expect(
      addArticle({
        userToken: loggedUser.decodedToken,
        title: "title for this article",
        cover: "link/to/cover",
        delta: {
          ops: [{ img: "anything" }],
        },
        isPublished: false,
        html: "<p>teste</p>",
      })
    ).rejects.toThrowError();
  });
});
