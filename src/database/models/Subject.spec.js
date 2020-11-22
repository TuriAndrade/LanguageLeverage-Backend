import createSubject from "../../entities/subject";
import createFakeSubject from "../../../__tests__/fixtures/fakeSubject";
import truncate from "../../../__tests__/fixtures/utils/truncate";
import { insertArticles } from "../../../__tests__/fixtures/utils/seedDb";
import { Subject } from "./index";

describe("Subject database", () => {
  let articles = [];

  beforeEach(async () => {
    await truncate();
    articles = await insertArticles();
  });

  it("should create subject", async () => {
    const random = Math.floor(Math.random() * articles.length);

    const articleId = articles[random].id;

    const subject = createSubject(createFakeSubject({ articleId }));

    const createdSubject = await Subject.create({
      subject: subject.getSubject(),
      articleId: subject.getArticleId(),
    });

    expect(createdSubject).toBeInstanceOf(Subject);
  });

  it("should update subject", async () => {
    const random = Math.floor(Math.random() * articles.length);

    const articleId = articles[random].id;

    const subject = createSubject(createFakeSubject({ articleId }));

    const createdSubject = await Subject.create({
      subject: subject.getSubject(),
      articleId: subject.getArticleId(),
    });

    const update = createSubject(createFakeSubject({ articleId }));

    const [numberOfUpdatedSubjects, updatedSubjects] = await Subject.update(
      {
        subject: update.getSubject(),
      },
      {
        where: {
          id: createdSubject.id,
        },
        individualHooks: true,
      }
    );

    expect(numberOfUpdatedSubjects).toBe(1);
    expect(updatedSubjects[0].subject).toBe(update.getSubject());
  });

  it("should delete subject", async () => {
    const random = Math.floor(Math.random() * articles.length);

    const articleId = articles[random].id;

    const subject = createSubject(createFakeSubject({ articleId }));

    const createdSubject = await Subject.create({
      subject: subject.getSubject(),
      articleId: subject.getArticleId(),
    });

    const numberOfDestroyedSubjects = await Subject.destroy({
      where: {
        id: createdSubject.id,
      },
    });

    expect(numberOfDestroyedSubjects).toBe(1);
  });

  it("should find subjects by id", async () => {
    const random = Math.floor(Math.random() * articles.length);

    const articleId = articles[random].id;

    const subject = createSubject(createFakeSubject({ articleId }));

    const createdSubject = await Subject.create({
      subject: subject.getSubject(),
      articleId: subject.getArticleId(),
    });

    const findOne = await Subject.findOne({
      where: {
        id: createdSubject.id,
      },
    });

    expect(findOne).toBeInstanceOf(Subject);
  });

  it("should find all subjects", async () => {
    const subjects = [];

    articles.map((article) => {
      for (let i = 0; i < 3; i++) {
        subjects.push(
          createSubject(createFakeSubject({ articleId: article.id }))
        );
      }
      return null;
    });

    await Promise.all(
      subjects.map((subject) => {
        return Subject.create({
          subject: subject.getSubject(),
          articleId: subject.getArticleId(),
        });
      })
    );

    const findAll = await Subject.findAll();

    findAll.map((subject) => expect(subject).toBeInstanceOf(Subject));
  });
});
