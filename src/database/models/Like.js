module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("Like", {
    email: DataTypes.STRING,
  });

  Like.associate = (models) => {
    Like.belongsTo(models.Article, {
      foreignKey: "articleId",
    });
  };

  return Like;
};
