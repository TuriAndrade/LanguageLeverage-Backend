module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    text: DataTypes.TEXT,
    userType: DataTypes.STRING,
    replyTo: DataTypes.INTEGER,
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Article, {
      foreignKey: "articleId",
    });
  };

  return Comment;
};
