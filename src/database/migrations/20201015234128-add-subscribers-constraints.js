module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("subscribers", {
      fields: ["email"],
      type: "unique",
      name: "unique_email",
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("subscribers", "unique_email", {});
  },
};
