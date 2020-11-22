module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define("Article", {
    title: DataTypes.STRING,
    html: DataTypes.TEXT,
    cover: DataTypes.STRING,
    isPublished: DataTypes.BOOLEAN,
    isAdmissionArticle: DataTypes.BOOLEAN,
    date: DataTypes.DATE,
    delta: DataTypes.JSON,
  });

  Article.associate = (models) => {
    Article.belongsTo(models.Editor, {
      foreignKey: "editorId",
    });
  };

  return Article;
};
