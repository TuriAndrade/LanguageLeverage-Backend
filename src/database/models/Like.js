module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("Like", {
    email: DataTypes.STRING,
    date: DataTypes.DATE,
  });

  Like.associate = (models) => {
    Like.belongsTo(models.Article, {
      foreignKey: "articleId",
    });
  };

  return Like;
};
