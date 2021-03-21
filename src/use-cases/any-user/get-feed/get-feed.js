export default function buildGetFeed({ sequelize }) {
  return async function getFeed({ subjects, offset = 0, limit = 10 }) {
    if (subjects && !Array.isArray(subjects)) {
      throw new Error("Invalid type for subjects!");
    }

    if (offset && typeof offset !== "number") {
      throw new Error("Invalid type for offset!");
    }

    if (limit && typeof limit !== "number") {
      throw new Error("Invalid type for limit!");
    }

    let articles, rowsInfo;

    if (subjects && subjects.length > 0) {
      [articles, rowsInfo] = await sequelize.query(
        "SELECT DISTINCT articles.id, articles.title, articles.html, articles.cover, articles.created_at, users.login as editor_login, users.picture as editor_picture FROM articles JOIN subjects ON articles.id = subjects.article_id JOIN editors ON articles.editor_id = editors.id JOIN users ON editors.user_id = users.id WHERE articles.is_published = TRUE AND subjects.subject IN(:subjects) ORDER BY articles.created_at DESC LIMIT :limit OFFSET :offset",
        {
          replacements: { subjects, limit, offset },
        }
      );
    } else {
      [articles, rowsInfo] = await sequelize.query(
        "SELECT articles.id, articles.title, articles.html, articles.cover, articles.created_at, users.login as editor_login, users.picture as editor_picture FROM articles JOIN editors ON articles.editor_id = editors.id JOIN users ON editors.user_id = users.id WHERE is_published = TRUE ORDER BY created_at DESC LIMIT :limit OFFSET :offset",
        {
          replacements: { limit, offset },
        }
      );
    }

    /*
      Limit does't work well with sequelize includes, so I'm using raw queries
    */

    return { articles };
  };
}
