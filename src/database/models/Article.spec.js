import createArticle from "../../entities/article";
import createFakeArticle from "../../../__tests__/fixtures/fakeArticle";
import truncate from "../../../__tests__/fixtures/utils/truncate";
import { insertEditors } from "../../../__tests__/fixtures/utils/seedDb";
import { Article } from "./index";

describe("Article database", () => {
  let editors = [];

  beforeEach(async () => {
    await truncate();
    editors = await insertEditors();
  });

  it("should create article", async () => {
    const random = Math.floor(Math.random() * editors.length);

    const editorId = editors[random].id;

    const article = createArticle(createFakeArticle({ editorId }));

    const createdArticle = await Article.create({
      title: article.getTitle(),
      html: article.getHtml(),
      delta: article.getDelta(),
      isPublished: article.getIsPublished(),
      isAdmissionArticle: article.getIsAdmissionArticle(),
      cover: article.getCover(),
      editorId: article.getEditorId(),
    });

    expect(createdArticle).toBeInstanceOf(Article);
  });

  it("should update article", async () => {
    const random = Math.floor(Math.random() * editors.length);

    const editorId = editors[random].id;

    const article = createArticle(
      createFakeArticle({ editorId, isPublished: false })
    );

    const createdArticle = await Article.create({
      title: article.getTitle(),
      html: article.getHtml(),
      delta: article.getDelta(),
      isPublished: article.getIsPublished(),
      isAdmissionArticle: article.getIsAdmissionArticle(),
      cover: article.getCover(),
      editorId: article.getEditorId(),
    });

    const update = createArticle(
      createFakeArticle({ editorId, isPublished: true })
    );

    const [numberOfUpdatedArticles, updatedArticles] = await Article.update(
      {
        title: update.getTitle(),
        html: update.getHtml(),
        cover: update.getCover(),
        isPublished: update.getIsPublished(),
      },
      {
        where: {
          id: createdArticle.id,
        },
        individualHooks: true,
      }
    );

    expect(numberOfUpdatedArticles).toBe(1);
    expect(updatedArticles[0].title).toBe(update.getTitle());
    expect(updatedArticles[0].html).toBe(update.getHtml());
    expect(updatedArticles[0].cover).toBe(update.getCover());
    expect(updatedArticles[0].isPublished).toBe(update.getIsPublished());
  });

  it("should delete article", async () => {
    const random = Math.floor(Math.random() * editors.length);

    const editorId = editors[random].id;

    const article = createArticle(createFakeArticle({ editorId }));

    const createdArticle = await Article.create({
      title: article.getTitle(),
      html: article.getHtml(),
      delta: article.getDelta(),
      cover: article.getCover(),
      isAdmissionArticle: article.getIsAdmissionArticle(),
      isPublished: article.getIsPublished(),
      editorId: article.getEditorId(),
    });

    const numberOfDestroyedArticles = await Article.destroy({
      where: {
        id: createdArticle.id,
      },
    });

    expect(numberOfDestroyedArticles).toBe(1);
  });

  it("should find articles by id", async () => {
    const random = Math.floor(Math.random() * editors.length);

    const editorId = editors[random].id;

    const article = createArticle(createFakeArticle({ editorId }));

    const createdArticle = await Article.create({
      title: article.getTitle(),
      html: article.getHtml(),
      delta: article.getDelta(),
      cover: article.getCover(),
      isAdmissionArticle: article.getIsAdmissionArticle(),
      isPublished: article.getIsPublished(),
      editorId: article.getEditorId(),
    });

    const findOne = await Article.findOne({
      where: {
        id: createdArticle.id,
      },
    });

    expect(findOne).toBeInstanceOf(Article);
  });

  it("should find all articles", async () => {
    const articles = [];

    editors.map((editor) => {
      for (let i = 0; i < 3; i++) {
        articles.push(
          createArticle(createFakeArticle({ editorId: editor.id }))
        );
      }
      return null;
    });

    await Promise.all(
      articles.map((article) => {
        return Article.create({
          title: article.getTitle(),
          html: article.getHtml(),
          delta: article.getDelta(),
          cover: article.getCover(),
          isAdmissionArticle: article.getIsAdmissionArticle(),
          isPublished: article.getIsPublished(),
          editorId: article.getEditorId(),
        });
      })
    );

    const findAll = await Article.findAll();

    findAll.map((article) => expect(article).toBeInstanceOf(Article));
  });
});
