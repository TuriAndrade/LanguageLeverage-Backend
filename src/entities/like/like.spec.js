import createLike from "./index";
import createFakeLike from "../../../__tests__/fixtures/fakeLike";

describe("Like", () => {
  it("should create like", () => {
    const comment = createFakeLike();

    expect(createLike(comment)).toEqual(
      expect.objectContaining({
        getEmail: expect.any(Function),
        getArticleId: expect.any(Function),
        getDate: expect.any(Function),
      })
    );
  });

  it("should throw errors for invalid email", () => {
    const undefinedEmail = createFakeLike({ email: undefined });

    expect(() => createLike(undefinedEmail)).toThrowError();
  });

  it("should throw errors for invalid article ids", () => {
    const nonNumericArticleId = createFakeLike({
      articleId: "Im not a number",
    });

    expect(() => createLike(nonNumericArticleId)).toThrowError();
  });
});
