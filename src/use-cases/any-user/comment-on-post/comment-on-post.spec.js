import createFakeComment from "../../../../__tests__/fixtures/fakeComment";
import { commentOnPost } from "./index";
import truncate from "../../../../__tests__/fixtures/utils/truncate";
import { insertArticles } from "../../../../__tests__/fixtures/utils/seedDb";

describe("comment on post  test", () => {
  let articles = [];

  beforeEach(async () => {
    await truncate();
    articles = await insertArticles();
  });

  it("should comment on post", async () => {
    const random = Math.floor(Math.random() * articles.length);

    const articleId = articles[random].id;

    const comment = createFakeComment({ articleId });

    await expect(commentOnPost(comment)).resolves.toEqual(
      expect.objectContaining({
        commentId: expect.any(Number),
      })
    );
  });

  it("should throw error for invalid articleId", async () => {
    const comment = createFakeComment({ articleId: null });

    await expect(commentOnPost(comment)).rejects.toThrowError();
  });
});
