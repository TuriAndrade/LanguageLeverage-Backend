import createArticle from "./index";
import createFakeArticle from "../../../__tests__/fixtures/fakeArticle";

describe("Article", () => {
  it("should create article", () => {
    const article = createFakeArticle();

    expect(createArticle(article)).toEqual(
      expect.objectContaining({
        getTitle: expect.any(Function),
        getHtml: expect.any(Function),
        getCover: expect.any(Function),
        getIsPublished: expect.any(Function),
        getIsAdmissionArticle: expect.any(Function),
        getEditorId: expect.any(Function),
        getDate: expect.any(Function),
      })
    );
  });

  it("should set editor id", () => {
    const articleWithoutEditorId = createArticle(
      createFakeArticle({ editorId: null, withNoEditorId: true })
    );

    expect(articleWithoutEditorId.getEditorId()).toBeFalsy();

    articleWithoutEditorId.setEditorId(1);

    expect(articleWithoutEditorId.getEditorId()).toBe(1);
  });

  it("should publish article", () => {
    const unpublishedArticle = createArticle(
      createFakeArticle({ isPublished: false })
    );

    expect(unpublishedArticle.getIsPublished()).toBeFalsy();

    unpublishedArticle.publish();

    expect(unpublishedArticle.getIsPublished()).toBeTruthy();
  });

  it("should unpublish article", () => {
    const publishedArticle = createArticle(
      createFakeArticle({ isPublished: true })
    );

    expect(publishedArticle.getIsPublished()).toBeTruthy();

    publishedArticle.unpublish();

    expect(publishedArticle.getIsPublished()).toBeFalsy();
  });

  it("should throw errors for invalid editor ids", () => {
    const article = createArticle(createFakeArticle());

    expect(() => article.setEditorId(null)).toThrowError();

    expect(() => article.setEditorId("I'm not a number!")).toThrowError();

    expect(() =>
      createArticle(createFakeArticle({ editorId: null }))
    ).toThrowError();
  });

  it("should throw error for invalid cover", () => {
    const undefinedCover = createFakeArticle({
      cover: undefined,
    });

    expect(() => createArticle(undefinedCover)).toThrowError();
  });

  it("should throw errors for invalid editor ids", () => {
    const nonNumericEditorId = createFakeArticle({
      editorId: "Im not a number",
    });

    expect(() => createArticle(nonNumericEditorId)).toThrowError();
  });
});
