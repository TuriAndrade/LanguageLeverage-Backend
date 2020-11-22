import createComment from "../../entities/comment";
import createFakeComment from "../../../__tests__/fixtures/fakeComment";
import truncate from "../../../__tests__/fixtures/utils/truncate";
import { insertArticles } from "../../../__tests__/fixtures/utils/seedDb";
import { Comment } from "./index";

describe("Comment database", () => {
  let articles = [];

  beforeEach(async () => {
    await truncate();
    articles = await insertArticles();
  });

  it("should create comment", async () => {
    const random = Math.floor(Math.random() * articles.length);

    const articleId = articles[random].id;

    const comment = createComment(createFakeComment({ articleId }));

    const createdComment = await Comment.create({
      name: comment.getName(),
      email: comment.getEmail(),
      text: comment.getText(),
      date: comment.getDate(),
      replyTo: comment.getReplyTo(),
      articleId: comment.getArticleId(),
    });

    expect(createdComment).toBeInstanceOf(Comment);
  });

  it("should update comment", async () => {
    const random = Math.floor(Math.random() * articles.length);

    const articleId = articles[random].id;

    const comment = createComment(createFakeComment({ articleId }));

    const createdComment = await Comment.create({
      name: comment.getName(),
      email: comment.getEmail(),
      text: comment.getText(),
      date: comment.getDate(),
      replyTo: comment.getReplyTo(),
      articleId: comment.getArticleId(),
    });

    const update = createComment(createFakeComment({ articleId }));

    const [numberOfUpdatedComments, updatedComments] = await Comment.update(
      {
        text: update.getText(),
      },
      {
        where: {
          id: createdComment.id,
        },
        individualHooks: true,
      }
    );

    expect(numberOfUpdatedComments).toBe(1);
    expect(updatedComments[0].text).toBe(update.getText());
  });

  it("should delete comment", async () => {
    const random = Math.floor(Math.random() * articles.length);

    const articleId = articles[random].id;

    const comment = createComment(createFakeComment({ articleId }));

    const createdComment = await Comment.create({
      name: comment.getName(),
      email: comment.getEmail(),
      text: comment.getText(),
      date: comment.getDate(),
      replyTo: comment.getReplyTo(),
      articleId: comment.getArticleId(),
    });

    const numberOfDestroyedComments = await Comment.destroy({
      where: {
        id: createdComment.id,
      },
    });

    expect(numberOfDestroyedComments).toBe(1);
  });

  it("should find comments by id", async () => {
    const random = Math.floor(Math.random() * articles.length);

    const articleId = articles[random].id;

    const comment = createComment(createFakeComment({ articleId }));

    const createdComment = await Comment.create({
      name: comment.getName(),
      email: comment.getEmail(),
      text: comment.getText(),
      date: comment.getDate(),
      replyTo: comment.getReplyTo(),
      articleId: comment.getArticleId(),
    });

    const findOne = await Comment.findOne({
      where: {
        id: createdComment.id,
      },
    });

    expect(findOne).toBeInstanceOf(Comment);
  });

  it("should find all comments", async () => {
    const comments = [];

    articles.map((article) => {
      for (let i = 0; i < 3; i++) {
        comments.push(
          createComment(createFakeComment({ articleId: article.id }))
        );
      }
      return null;
    });

    await Promise.all(
      comments.map((comment) => {
        return Comment.create({
          name: comment.getName(),
          email: comment.getEmail(),
          text: comment.getText(),
          date: comment.getDate(),
          replyTo: comment.getReplyTo(),
          articleId: comment.getArticleId(),
        });
      })
    );

    const findAll = await Comment.findAll();

    findAll.map((comment) => expect(comment).toBeInstanceOf(Comment));
  });
});
