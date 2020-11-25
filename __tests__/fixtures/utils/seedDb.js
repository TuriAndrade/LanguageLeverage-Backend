import createUser from "../../../src/entities/user";
import createFakeUser from "../fakeUser";

import createAdmin from "../../../src/entities/admin";
import createFakeAdmin from "../fakeAdmin";

import createEditor from "../../../src/entities/editor";
import createFakeEditor from "../fakeEditor";

import createArticle from "../../../src/entities/article";
import createFakeArticle from "../fakeArticle";

import createSubject from "../../../src/entities/subject";
import createFakeSubject from "../fakeSubject";

const {
  User,
  Admin,
  Editor,
  Article,
  Subject,
} = require("../../../src/database/models");

export async function insertUsers() {
  const users = [];

  for (let i = 0; i < 10; i++) {
    users.push(createUser(createFakeUser()));
  }

  return Promise.all(
    users.map((user) => {
      return User.create({
        login: user.getLogin(),
        password: user.getPassword(),
        email: user.getEmail(),
        name: user.getName(),
        picture: user.getPicture(),
      });
    })
  );
}

export async function insertAdmins() {
  const users = await insertUsers();

  const admins = users.map((user) =>
    createAdmin(createFakeAdmin({ userId: user.id }))
  );

  return Promise.all(
    admins.map((admin) => {
      return Admin.create({
        hasFullPermission: admin.getHasFullPermission(),
        userId: admin.getUserId(),
      });
    })
  );
}

export async function insertEditors() {
  const users = await insertUsers();

  const editors = users.map((user) =>
    createEditor(createFakeEditor({ userId: user.id }))
  );

  return Promise.all(
    editors.map((editor) => {
      return Editor.create({
        description: editor.getDescription(),
        isValidated: editor.getIsValidated(),
        userId: editor.getUserId(),
      });
    })
  );
}

export async function insertArticles() {
  const editors = await insertEditors();

  const articles = [];

  editors.map((editor) => {
    for (let i = 0; i < 3; i++) {
      articles.push(createArticle(createFakeArticle({ editorId: editor.id })));
    }
    return null;
  });

  return Promise.all(
    articles.map((article) => {
      return Article.create({
        title: article.getTitle(),
        cover: article.getCover(),
        delta: article.getDelta(),
        html: article.getHtml(),
        isAdmissionArticle: article.getIsAdmissionArticle(),
        isPublished: article.getIsPublished(),
        editorId: article.getEditorId(),
      });
    })
  );
}

export async function insertSubjects() {
  const articles = await insertArticles();

  const subjects = [];

  articles.map((article) => {
    for (let i = 0; i < 3; i++) {
      subjects.push(
        createSubject(createFakeSubject({ articleId: article.id }))
      );
    }
    return null;
  });

  return Promise.all(
    subjects.map((subject) => {
      return Subject.create({
        subject: subject.getSubject(),
        articleId: subject.getArticleId(),
      });
    })
  );
}
