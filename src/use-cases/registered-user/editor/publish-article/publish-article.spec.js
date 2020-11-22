import createFakeArticle from "../../../../../__tests__/fixtures/fakeArticle";
import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { publishArticle } from "./index";
import { addArticle } from "../add-article";
import { Editor } from "../../../../database/models";
import { validatedEditorLogin } from "../../../../../__tests__/fixtures/utils/login";

describe("Publish article", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should publish an article", async () => {
    const loggedUser = await validatedEditorLogin();

    const article = createFakeArticle({
      editorId: loggedUser.decodedToken.editorId,
      isPublished: false,
    });

    const createdArticle = await addArticle({
      userToken: loggedUser.decodedToken,
      title: article.title,
      cover: article.cover,
      isPublished: article.isPublished,
      html: article.html,
      delta: article.delta,
    });

    const numberOfUpdatedArticles = await publishArticle({
      userToken: loggedUser.decodedToken,
      articleId: createdArticle.articleId,
    });

    expect(numberOfUpdatedArticles).toBe(1);
  });

  it("should throw error for article already published", async () => {
    const loggedUser = await validatedEditorLogin();

    const article = createFakeArticle({
      editorId: loggedUser.decodedToken.editorId,
      isPublished: true,
    });

    const createdArticle = await addArticle({
      userToken: loggedUser.decodedToken,
      title: article.title,
      cover: article.cover,
      isPublished: article.isPublished,
      html: article.html,
      delta: article.delta,
    });

    await expect(
      publishArticle({
        userToken: loggedUser.decodedToken,
        articleId: createdArticle.articleId,
      })
    ).rejects.toThrowError();
  });

  it("should throw error for not validated editor", async () => {
    const loggedUser = await validatedEditorLogin();

    const article = createFakeArticle({
      editorId: loggedUser.decodedToken.editorId,
      isPublished: false,
    });

    const createdArticle = await addArticle({
      userToken: loggedUser.decodedToken,
      title: article.title,
      cover: article.cover,
      isPublished: article.isPublished,
      html: article.html,
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
      publishArticle({
        userToken: loggedUser.decodedToken,
        articleId: createdArticle.articleId,
      })
    ).rejects.toThrowError();
  });

  it("should throw error for invalid editor id", async () => {
    const loggedUser1 = await validatedEditorLogin();
    const loggedUser2 = await validatedEditorLogin();

    const article = createFakeArticle({
      editorId: loggedUser1.decodedToken.editorId,
      isPublished: false,
    });

    const createdArticle = await addArticle({
      userToken: loggedUser1.decodedToken,
      title: article.title,
      cover: article.cover,
      isPublished: article.isPublished,
      html: article.html,
      delta: article.delta,
    });

    await expect(
      publishArticle({
        userToken: loggedUser2.decodedToken,
        articleId: createdArticle.articleId,
      })
    ).rejects.toThrowError();
  });
});
