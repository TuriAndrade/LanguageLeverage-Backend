module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("articles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      html: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      delta: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      cover: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_published: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      is_admission_article: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      editor_id: {
        type: Sequelize.INTEGER,
        references: { model: "editors", key: "id" },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("articles");
  },
};
