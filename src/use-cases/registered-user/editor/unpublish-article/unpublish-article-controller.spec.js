import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { unpublishArticleController } from "./index";
import { validatedEditorLogin } from "../../../../../__tests__/fixtures/utils/login";
import { Article } from "../../../../database/models";

describe("unpublish article controller test", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should unpublish article", async () => {
    const loggedUser = await validatedEditorLogin();

    const createdArticle = await Article.create({
      cover: "link/to/cover",
      isPublished: true,
      title: "title",
      date: Date.now(),
      editorId: loggedUser.decodedToken.editorId,
      isAdmissionArticle: false,
      html: "<p>teste</p>",
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

    const actualResponse = await unpublishArticleController(request);

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

    const actualResponse = await unpublishArticleController(request);

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
