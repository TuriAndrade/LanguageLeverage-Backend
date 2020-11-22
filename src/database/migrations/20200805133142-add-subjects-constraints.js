module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("subjects", {
      fields: ["subject", "article_id"],
      type: "unique",
      name: "unique_subject_and_article_id",
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "subjects",
      "unique_subject_and_article_id",
      {}
    );
  },
};
