import createLike from "../../entities/like";
import createFakeLike from "../../../__tests__/fixtures/fakeLike";
import truncate from "../../../__tests__/fixtures/utils/truncate";
import { insertArticles } from "../../../__tests__/fixtures/utils/seedDb";
import { Like } from "./index";

describe("Like database", () => {
  let articles = [];

  beforeEach(async () => {
    await truncate();
    articles = await insertArticles();
  });

  it("should create like", async () => {
    const random = Math.floor(Math.random() * articles.length);

    const articleId = articles[random].id;

    const like = createLike(createFakeLike({ articleId }));

    const createdLike = await Like.create({
      email: like.getEmail(),
      articleId: like.getArticleId(),
    });

    expect(createdLike).toBeInstanceOf(Like);
  });

  it("should update like", async () => {
    const random = Math.floor(Math.random() * articles.length);

    const articleId = articles[random].id;

    const like = createLike(createFakeLike({ articleId }));

    const createdLike = await Like.create({
      email: like.getEmail(),
      articleId: like.getArticleId(),
    });

    const update = createLike(createFakeLike({ articleId }));

    const [numberOfUpdatedLikes, updatedLikes] = await Like.update(
      {
        email: update.getEmail(),
      },
      {
        where: {
          id: createdLike.id,
        },
        individualHooks: true,
      }
    );

    expect(numberOfUpdatedLikes).toBe(1);
    expect(updatedLikes[0].email).toBe(update.getEmail());
  });

  it("should delete like", async () => {
    const random = Math.floor(Math.random() * articles.length);

    const articleId = articles[random].id;

    const like = createLike(createFakeLike({ articleId }));

    const createdLike = await Like.create({
      email: like.getEmail(),
      articleId: like.getArticleId(),
    });

    const numberOfDestroyedLikes = await Like.destroy({
      where: {
        id: createdLike.id,
      },
    });

    expect(numberOfDestroyedLikes).toBe(1);
  });

  it("should find likes by id", async () => {
    const random = Math.floor(Math.random() * articles.length);

    const articleId = articles[random].id;

    const like = createLike(createFakeLike({ articleId }));

    const createdLike = await Like.create({
      email: like.getEmail(),
      articleId: like.getArticleId(),
    });

    const findOne = await Like.findOne({
      where: {
        id: createdLike.id,
      },
    });

    expect(findOne).toBeInstanceOf(Like);
  });

  it("should find all likes", async () => {
    const likes = [];

    articles.map((article) => {
      for (let i = 0; i < 3; i++) {
        likes.push(createLike(createFakeLike({ articleId: article.id })));
      }
      return null;
    });

    await Promise.all(
      likes.map((like) => {
        return Like.create({
          email: like.getEmail(),
          articleId: like.getArticleId(),
        });
      })
    );

    const findAll = await Like.findAll();

    findAll.map((like) => expect(like).toBeInstanceOf(Like));
  });
});
