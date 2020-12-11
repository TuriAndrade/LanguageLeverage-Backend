import createFakeLike from "../../../../__tests__/fixtures/fakeLike";
import { likePost } from "./index";
import truncate from "../../../../__tests__/fixtures/utils/truncate";
import { insertArticles } from "../../../../__tests__/fixtures/utils/seedDb";

describe("like on post  test", () => {
  let articles = [];

  beforeEach(async () => {
    await truncate();
    articles = await insertArticles();
  });

  it("should like on post", async () => {
    const random = Math.floor(Math.random() * articles.length);

    const articleId = articles[random].id;

    const like = createFakeLike({ articleId });

    await expect(likePost(like)).resolves.toEqual(
      expect.objectContaining({
        like: expect.any(Object),
      })
    );
  });

  it("should throw error for invalid articleId", async () => {
    const like = createFakeLike({ articleId: null });

    await expect(likePost(like)).rejects.toThrowError();
  });
});
