module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define("Article", {
    title: DataTypes.STRING,
    html: DataTypes.TEXT,
    cover: DataTypes.STRING,
    isPublished: DataTypes.BOOLEAN,
    isAdmissionArticle: DataTypes.BOOLEAN,
    delta: DataTypes.JSON,
  });

  Article.associate = (models) => {
    Article.belongsTo(models.Editor, {
      foreignKey: "editorId",
    });
    Article.hasMany(models.Comment);
    Article.hasMany(models.Like);
    Article.hasMany(models.Subject);
  };

  return Article;
};
