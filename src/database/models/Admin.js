module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define("Admin", {
    hasFullPermission: DataTypes.BOOLEAN,
  });

  Admin.associate = (models) => {
    Admin.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Admin;
};
