module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("articles", {
      fields: ["title", "editor_id"],
      type: "unique",
      name: "unique_title_and_editor_id",
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "articles",
      "unique_title_and_editor_id",
      {}
    );
  },
};
