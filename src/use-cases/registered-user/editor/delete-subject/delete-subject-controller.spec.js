import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { deleteSubjectController } from "./index";
import { validatedEditorLogin } from "../../../../../__tests__/fixtures/utils/login";
import { Article, Subject } from "../../../../database/models";

describe("delete subject controller test", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should delete subject", async () => {
    const loggedUser = await validatedEditorLogin();

    const createdArticle = await Article.create({
      cover: "link/teste",
      isPublished: true,
      editorId: loggedUser.decodedToken.editorId,
      date: Date.now(),
      isAdmissionArticle: false,
      title: "title",
      html: "<p>teste</p>",
      delta: { ops: [{ img: "teste" }] },
    });

    const createdSubject = await Subject.create({
      subject: "Lorem ipsum dolor sit amet.",
      articleId: createdArticle.id,
    });

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        subjectId: createdSubject.id,
      },
      userToken: loggedUser.decodedToken,
    };

    const actualResponse = await deleteSubjectController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 204,
      })
    );
  });

  it("should return an error response", async () => {
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        subjectId: null,
      },
    };

    const actualResponse = await deleteSubjectController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: expect.any(String),
        },
      })
    );
  });
});
