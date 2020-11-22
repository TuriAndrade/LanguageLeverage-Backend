module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define("File", {
    path: DataTypes.STRING,
    key: DataTypes.STRING,
    name: DataTypes.STRING,
    toBeDeleted: DataTypes.BOOLEAN,
  });

  File.associate = (models) => {
    File.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };

  return File;
};
