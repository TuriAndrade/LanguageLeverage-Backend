import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { addArticleController } from "./index";
import { validatedEditorLogin } from "../../../../../__tests__/fixtures/utils/login";

describe("add article controller test", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should add article", async () => {
    const loggedUser = await validatedEditorLogin();

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        title: "title for this article",
        html: "<p>teste</p>",
        delta: {
          ops: [{ img: "anything" }],
        },
        cover: "link/to/cover",
        isPublished: false,
        isAdmissionArticle: false,
      },
      userToken: loggedUser.decodedToken,
    };

    const actualResponse = await addArticleController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          articleId: expect.any(Number),
        },
      })
    );
  });

  it("should return an error response", async () => {
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        title: "title for this article",
        html: "<p>teste</p>",
        cover: "link/to/cover",
        delta: {
          ops: [{ img: "anything" }],
        },
        isPublished: false,
        isAdmissionArticle: false,
      },
    };

    const actualResponse = await addArticleController(request);

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
