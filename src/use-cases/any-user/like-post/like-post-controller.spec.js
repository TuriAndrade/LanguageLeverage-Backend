import createFakeLike from "../../../../__tests__/fixtures/fakeLike";
import { likePostController } from "./index";
import truncate from "../../../../__tests__/fixtures/utils/truncate";
import { insertArticles } from "../../../../__tests__/fixtures/utils/seedDb";

describe("like on post controller test", () => {
  let articles = [];

  beforeEach(async () => {
    await truncate();
    articles = await insertArticles();
  });

  it("should like on post", async () => {
    const random = Math.floor(Math.random() * articles.length);

    const articleId = articles[random].id;

    const like = createFakeLike({ articleId });

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        ...like,
      },
    };

    const actualResponse = await likePostController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          like: expect.any(Object),
        },
      })
    );
  });

  it("should return error response", async () => {
    const random = Math.floor(Math.random() * articles.length);

    const articleId = articles[random].id;

    const like = createFakeLike({ articleId, email: null });

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        ...like,
      },
    };

    const actualResponse = await likePostController(request);

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
