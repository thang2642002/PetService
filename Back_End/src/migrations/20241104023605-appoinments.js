"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Appointments", {
      appointment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      appointment_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      end_date_appointment: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      time_date: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("pending", "completed", "cancelled"),
        allowNull: false,
      },
      service_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Services",
          key: "service_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      user_pet_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "user_pet",
          key: "user_pet_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      appointment_code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Đảm bảo mã này là duy nhất
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Appointments");
  },
};
