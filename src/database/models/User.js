const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      login: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      passwordHash: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      picture: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.passwordHash = await bcrypt.hash(user.password, 8);
          }
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            user.passwordHash = await bcrypt.hash(user.password, 8);
          }
        },
      },
    }
  );

  User.associate = (models) => {
    User.hasOne(models.Admin);
    User.hasOne(models.Editor);
    User.hasMany(models.File);
  };

  return User;
};
