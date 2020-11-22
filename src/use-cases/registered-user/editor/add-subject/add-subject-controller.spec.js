import truncate from "../../../../../__tests__/fixtures/utils/truncate";
import { addSubjectController } from "./index";
import { validatedEditorLogin } from "../../../../../__tests__/fixtures/utils/login";
import { Article } from "../../../../database/models";

describe("add subject controller test", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should add subject", async () => {
    const loggedUser = await validatedEditorLogin();

    const createdArticle = await Article.create({
      editorId: loggedUser.decodedToken.editorId,
      title: "title for this article",
      isPublished: true,
      date: Date.now(),
      delta: { ops: [{ img: "teste" }] },
      isAdmissionArticle: false,
      cover: "https://link_to_image",
      html: "<p>teste</p>",
    });

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        articleId: createdArticle.id,
        subject: "Lorem ipsum dolor sit amet.",
      },
      userToken: loggedUser.decodedToken,
    };

    const actualResponse = await addSubjectController(request);

    expect(actualResponse).toEqual(
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          subjectId: expect.any(Number),
        },
      })
    );
  });

  it("should return an error response", async () => {
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        articleId: null,
        subject: "Lorem ipsum, dolor sit amet.",
      },
    };

    const actualResponse = await addSubjectController(request);

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
