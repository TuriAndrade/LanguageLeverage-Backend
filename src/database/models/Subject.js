module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define("Subject", {
    subject: DataTypes.STRING,
  });

  Subject.associate = (models) => {
    Subject.belongsTo(models.Article, {
      foreignKey: "articleId",
    });
  };

  return Subject;
};
