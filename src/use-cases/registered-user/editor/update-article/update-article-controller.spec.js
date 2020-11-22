import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { updateArticleController } from "./index";
import { validatedEditorLogin } from "../../../../../__tests__/fixtures/utils/login";
import { Article } from "../../../../database/models";

describe("update article controller test", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should update article", async () => {
    const loggedUser = await validatedEditorLogin();

    const createdArticle = await Article.create({
      title: "title",
      html: "<p>teste</p>",
      cover: "link/to/cover",
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
      body: {
        title: "newTitle",
        html: "<p>teste2</p>",
        cover: "link/to/cover",
      },
      userToken: loggedUser.decodedToken,
    };

    const actualResponse = await updateArticleController(request);

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
      body: {
        html: "<p>teste</p>",
        cover: "link/to/cover",
      },
    };

    const actualResponse = await updateArticleController(request);

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
