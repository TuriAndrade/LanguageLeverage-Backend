import createComment from "./index";
import createFakeComment from "../../../__tests__/fixtures/fakeComment";

describe("Comment", () => {
  it("should create comment", () => {
    const comment = createFakeComment();

    expect(createComment(comment)).toEqual(
      expect.objectContaining({
        getName: expect.any(Function),
        getEmail: expect.any(Function),
        getUserType: expect.any(Function),
        getReplyTo: expect.any(Function),
        getText: expect.any(Function),
        getArticleId: expect.any(Function),
      })
    );
  });

  it("should throw errors for invalid email", () => {
    const undefinedEmail = createFakeComment({ email: undefined });

    expect(() => createComment(undefinedEmail)).toThrowError();
  });

  it("should throw errors for invalid article ids", () => {
    const nonNumericArticleId = createFakeComment({
      articleId: "Im not a number",
    });

    expect(() => createComment(nonNumericArticleId)).toThrowError();
  });
});
