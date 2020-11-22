module.exports = (sequelize, DataTypes) => {
  const Editor = sequelize.define("Editor", {
    description: DataTypes.STRING,
    isValidated: DataTypes.BOOLEAN,
  });

  Editor.associate = (models) => {
    Editor.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Editor;
};
