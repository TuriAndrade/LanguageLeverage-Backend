import createSubject from "./index";
import createFakeSubject from "../../../__tests__/fixtures/fakeSubject";

describe("Subject", () => {
  it("should create subject", () => {
    const subject = createFakeSubject();

    expect(createSubject(subject)).toEqual(
      expect.objectContaining({
        getSubject: expect.any(Function),
        getArticleId: expect.any(Function),
        hasArticleId: expect.any(Function),
      })
    );
  });

  it("should set article id", () => {
    const subjectWithoutArticleId = createSubject(
      createFakeSubject({ articleId: null, withNoArticleId: true })
    );

    expect(subjectWithoutArticleId.getArticleId()).toBeFalsy();

    subjectWithoutArticleId.setArticleId(1);

    expect(subjectWithoutArticleId.getArticleId()).toBe(1);
  });

  it("should throw errors for invalid article ids", () => {
    const subject = createSubject(createFakeSubject());

    expect(() => subject.setArticleId(null)).toThrowError();

    expect(() => subject.setArticleId("I'm not a number!")).toThrowError();

    expect(() =>
      createSubject(createFakeSubject({ articleId: null }))
    ).toThrowError();
  });

  it("should throw errors for invalid subjects", () => {
    const undefinedSubject = createFakeSubject({ subject: undefined });

    expect(() => createSubject(undefinedSubject)).toThrowError();
  });

  it("should throw errors for invalid article ids", () => {
    const nonNumericArticleId = createFakeSubject({
      articleId: "Im not a number",
    });

    expect(() => createSubject(nonNumericArticleId)).toThrowError();
  });
});
