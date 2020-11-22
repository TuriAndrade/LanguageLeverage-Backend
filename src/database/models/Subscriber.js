module.exports = (sequelize, DataTypes) => {
  const Subscriber = sequelize.define("Subscriber", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
  });

  return Subscriber;
};
