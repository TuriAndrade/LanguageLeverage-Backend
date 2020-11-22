import createFakeArticle from "../../../../../__tests__/fixtures/fakeArticle";
import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { updateArticle } from "./index";
import { addArticle } from "../add-article";
import { Editor } from "../../../../database/models";
import { validatedEditorLogin } from "../../../../../__tests__/fixtures/utils/login";

describe("Update article", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should update an article", async () => {
    const loggedUser = await validatedEditorLogin();

    const article = createFakeArticle({
      editorId: loggedUser.decodedToken.editorId,
    });

    const createdArticle = await addArticle({
      title: article.title,
      userToken: loggedUser.decodedToken,
      cover: article.cover,
      html: article.html,
      delta: article.delta,
    });

    await expect(
      updateArticle({
        userToken: loggedUser.decodedToken,
        articleId: createdArticle.articleId,
        html: "<p>teste</p",
        cover: "new/link",
        title: "newTitle",
      })
    ).resolves.toBe(1);

    await expect(
      updateArticle({
        userToken: loggedUser.decodedToken,
        articleId: createdArticle.articleId,
        title: "newTitle",
      })
    ).resolves.toBe(1);
  });

  it("should throw error for existent title", async () => {
    const loggedUser = await validatedEditorLogin();

    const article = createFakeArticle({
      editorId: loggedUser.decodedToken.editorId,
    });

    await addArticle({
      title: "title2",
      userToken: loggedUser.decodedToken,
      cover: article.cover,
      html: article.html,
      delta: article.delta,
    });

    const createdArticle = await addArticle({
      title: article.title,
      userToken: loggedUser.decodedToken,
      cover: article.cover,
      html: article.html,
      delta: article.delta,
    });

    await expect(
      updateArticle({
        userToken: loggedUser.decodedToken,
        articleId: createdArticle.articleId,
        title: "title2",
      })
    ).rejects.toThrowError();

    await expect(
      updateArticle({
        userToken: loggedUser.decodedToken,
        articleId: createdArticle.articleId,
        title: article.title,
      })
    ).resolves.toBe(1);
  });

  it("should throw error for not validated editor", async () => {
    const loggedUser = await validatedEditorLogin();

    const article = createFakeArticle({
      editorId: loggedUser.decodedToken.editorId,
    });

    const createdArticle = await addArticle({
      userToken: loggedUser.decodedToken,
      title: article.title,
      html: article.html,
      cover: article.cover,
      delta: article.delta,
    });

    await Editor.update(
      {
        isValidated: false,
      },
      {
        where: {
          id: loggedUser.decodedToken.editorId,
        },
      }
    );

    await expect(
      updateArticle({
        userToken: loggedUser.decodedToken,
        articleId: createdArticle.articleId,
        html: "<p>teste</p>",
        cover: "new/link",
      })
    ).rejects.toThrowError();
  });

  it("should throw error for invalid editor id", async () => {
    const loggedUser1 = await validatedEditorLogin();
    const loggedUser2 = await validatedEditorLogin();

    const article = createFakeArticle({
      editorId: loggedUser1.decodedToken.editorId,
    });

    const createdArticle = await addArticle({
      userToken: loggedUser1.decodedToken,
      html: article.html,
      title: article.title,
      cover: article.cover,
      delta: article.delta,
    });

    await expect(
      updateArticle({
        userToken: loggedUser2.decodedToken,
        articleId: createdArticle.articleId,
        html: "<p>teste</p",
        cover: "new/link",
      })
    ).rejects.toThrowError();
  });
});
