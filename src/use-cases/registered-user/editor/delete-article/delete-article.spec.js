import createFakeArticle from "../../../../../__tests__/fixtures/fakeArticle";
import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { addArticle } from "../add-article";
import { deleteArticle } from "./index";
import { validatedEditorLogin } from "../../../../../__tests__/fixtures/utils/login";

describe("Delete article", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should delete an article", async () => {
    const loggedUser = await validatedEditorLogin();

    const article = createFakeArticle({
      editorId: loggedUser.decodedToken.editorId,
    });

    const createdArticle = await addArticle({
      userToken: loggedUser.decodedToken,
      title: article.title,
      cover: article.cover,
      html: article.html,
      delta: article.delta,
    });

    const deletedArticle = await deleteArticle({
      userToken: loggedUser.decodedToken,
      articleId: createdArticle.articleId,
    });

    expect(deletedArticle).toBe(1);
  });

  it("should throw error for invalid editor id", async () => {
    const loggedUser1 = await validatedEditorLogin();
    const loggedUser2 = await validatedEditorLogin();

    const article = createFakeArticle({
      editorId: loggedUser1.decodedToken.editorId,
    });

    const createdArticle = await addArticle({
      userToken: loggedUser1.decodedToken,
      title: article.title,
      cover: article.cover,
      html: article.html,
      delta: article.delta,
    });

    await expect(
      deleteArticle({
        userToken: loggedUser2.decodedToken,
        articleId: createdArticle.articleId,
      })
    ).rejects.toThrowError();
  });
});
