import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { deleteArticleController } from "./index";
import { validatedEditorLogin } from "../../../../../__tests__/fixtures/utils/login";
import { Article } from "../../../../database/models";

describe("delete article controller test", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should delete article", async () => {
    const loggedUser = await validatedEditorLogin();

    const createdArticle = await Article.create({
      html: "<p>teste</p>",
      cover: "https://link_to_article",
      title: "title",
      isPublished: true,
      date: Date.now(),
      isAdmissionArticle: false,
      editorId: loggedUser.decodedToken.editorId,
      delta: { ops: [{ img: "teste" }] },
    });

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        articleId: createdArticle.id,
      },
      userToken: loggedUser.decodedToken,
    };

    const actualResponse = await deleteArticleController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 204,
      })
    );
  });

  it("should return an error response", async () => {
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        articleId: null,
      },
    };

    const actualResponse = await deleteArticleController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: expect.any(String),
        },
      })
    );
  });
});
