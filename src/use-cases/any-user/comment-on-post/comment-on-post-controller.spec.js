import createFakeComment from "../../../../__tests__/fixtures/fakeComment";
import { commentOnPostController } from "./index";
import truncate from "../../../../__tests__/fixtures/utils/truncate";
import { insertArticles } from "../../../../__tests__/fixtures/utils/seedDb";

describe("comment on post controller test", () => {
  let articles = [];

  beforeEach(async () => {
    await truncate();
    articles = await insertArticles();
  });

  it("should comment on post", async () => {
    const random = Math.floor(Math.random() * articles.length);

    const articleId = articles[random].id;

    const comment = createFakeComment({ articleId });

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        ...comment,
      },
    };

    const actualResponse = await commentOnPostController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          commentId: expect.any(Number),
        },
      })
    );
  });

  it("should return error response", async () => {
    const random = Math.floor(Math.random() * articles.length);

    const articleId = articles[random].id;

    const comment = createFakeComment({ articleId, name: null });

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        ...comment,
      },
    };

    const actualResponse = await commentOnPostController(request);

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
