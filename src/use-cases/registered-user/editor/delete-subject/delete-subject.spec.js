import createFakeArticle from "../../../../../__tests__/fixtures/fakeArticle";
import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { addArticle } from "../add-article";
import { addSubject } from "../add-subject";
import { deleteSubject } from "./index";
import { Editor } from "../../../../database/models";
import createFakeSubject from "../../../../../__tests__/fixtures/fakeSubject";
import { validatedEditorLogin } from "../../../../../__tests__/fixtures/utils/login";

describe("Delete subject", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should delete a subject", async () => {
    const loggedUser = await validatedEditorLogin();

    const article = createFakeArticle({
      editorId: loggedUser.decodedToken.editorId,
    });

    const createdArticle = await addArticle({
      userToken: loggedUser.decodedToken,
      title: article.title,
      cover: article.cover,
      html: article.html,
      delta: article.delta,
    });

    const subject = createFakeSubject({ articleId: createdArticle.articleId });

    const createdSubject = await addSubject({
      userToken: loggedUser.decodedToken,
      subject: subject.subject,
      articleId: subject.articleId,
    });

    const numberOfDeletedSubjects = await deleteSubject({
      userToken: loggedUser.decodedToken,
      subjectId: createdSubject.subjectId,
    });

    expect(numberOfDeletedSubjects).toBe(1);
  });

  it("should throw error for not validated editor", async () => {
    const loggedUser = await validatedEditorLogin();

    const article = createFakeArticle({
      editorId: loggedUser.decodedToken.editorId,
    });

    const createdArticle = await addArticle({
      userToken: loggedUser.decodedToken,
      title: article.title,
      cover: article.cover,
      html: article.html,
      delta: article.delta,
    });

    const subject = createFakeSubject({ articleId: createdArticle.articleId });

    const createdSubject = await addSubject({
      userToken: loggedUser.decodedToken,
      subject: subject.subject,
      articleId: subject.articleId,
    });

    await Editor.update(
      {
        isValidated: false,
      },
      {
        where: {
          id: loggedUser.decodedToken.editorId,
        },
      }
    );

    await expect(
      deleteSubject({
        userToken: loggedUser.decodedToken,
        subjectId: createdSubject.subjectId,
      })
    ).rejects.toThrowError();
  });

  it("should throw error for invalid editor id", async () => {
    const loggedUser = await validatedEditorLogin();
    const loggedUser2 = await validatedEditorLogin();

    const article = createFakeArticle({
      editorId: loggedUser.decodedToken.editorId,
    });

    const createdArticle = await addArticle({
      userToken: loggedUser.decodedToken,
      title: article.title,
      cover: article.cover,
      html: article.html,
      delta: article.delta,
    });

    const subject = createFakeSubject({ articleId: createdArticle.articleId });

    const createdSubject = await addSubject({
      userToken: loggedUser.decodedToken,
      subject: subject.subject,
      articleId: subject.articleId,
    });

    await expect(
      deleteSubject({
        userToken: loggedUser2.decodedToken,
        subjectId: createdSubject.subjectId,
      })
    ).rejects.toThrowError();
  });
});
