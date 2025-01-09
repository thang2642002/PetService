"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pet_scores", {
      score_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      symptoms: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      disease_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      care_suggestions: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"), // Sử dụng Sequelize.fn để đảm bảo tương thích
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Pet_scores");
  },
};
