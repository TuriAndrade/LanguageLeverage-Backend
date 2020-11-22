import createFakeSubject from "../../../../../__tests__/fixtures/fakeSubject";
import { addSubject } from "./index";
import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { validatedEditorLogin } from "../../../../../__tests__/fixtures/utils/login";
import { addArticle } from "../add-article";
import createFakeArticle from "../../../../../__tests__/fixtures/fakeArticle";

describe("add subject test", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should add subject", async () => {
    const loggedUser = await validatedEditorLogin();

    const article = createFakeArticle();

    const createdArticle = await addArticle({
      title: article.title,
      userToken: loggedUser.decodedToken,
      isPublished: article.isPublished,
      cover: article.cover,
      html: article.html,
      delta: article.delta,
    });
    const subject = createFakeSubject({ articleId: createdArticle.articleId });

    const createdSubject = await addSubject({
      userToken: loggedUser.decodedToken,
      articleId: subject.articleId,
      subject: subject.subject,
    });

    expect(createdSubject.subjectId).toEqual(expect.any(Number));
  });

  it("should throw error for invalid articleId", async () => {
    const loggedUser = await validatedEditorLogin();

    const subject = createFakeSubject();

    await expect(
      addSubject({
        userToken: loggedUser.decodedToken,
        articleId: subject.articleId,
        subject: subject.subject,
      })
    ).rejects.toThrowError();
  });

  it("should throw error for existent subject", async () => {
    const loggedUser = await validatedEditorLogin();

    const article = createFakeArticle();

    const createdArticle = await addArticle({
      title: article.title,
      userToken: loggedUser.decodedToken,
      isPublished: article.isPublished,
      cover: article.cover,
      delta: article.delta,
      html: article.html,
    });
    const subject = createFakeSubject({ articleId: createdArticle.articleId });

    await addSubject({
      userToken: loggedUser.decodedToken,
      articleId: subject.articleId,
      subject: subject.subject,
    });

    await expect(
      addSubject({
        userToken: loggedUser.decodedToken,
        articleId: subject.articleId,
        subject: subject.subject,
      })
    ).rejects.toThrowError();
  });
});
