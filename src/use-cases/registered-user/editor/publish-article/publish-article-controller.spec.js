import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { publishArticleController } from "./index";
import { validatedEditorLogin } from "../../../../../__tests__/fixtures/utils/login";
import { Article } from "../../../../database/models";

describe("publish article controller test", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should publish article", async () => {
    const loggedUser = await validatedEditorLogin();

    const createdArticle = await Article.create({
      title: "title",
      cover: "link/to/cover",
      isPublished: false,
      date: Date.now(),
      isAdmissionArticle: false,
      editorId: loggedUser.decodedToken.editorId,
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

    const actualResponse = await publishArticleController(request);

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

    const actualResponse = await publishArticleController(request);

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
