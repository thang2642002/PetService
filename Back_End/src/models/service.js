"use strict";
module.exports = (sequelize, DataTypes) => {
  const Services = sequelize.define(
    "Services",
    {
      service_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "Services",
      timestamps: true,
    }
  );

  Services.associate = function (models) {
    // Định nghĩa mối quan hệ với bảng Service_Review
    Services.hasMany(models.Service_Review, {
      foreignKey: "service_id",
      as: "service_reviews", // Đặt alias cho quan hệ
    });
    // Mối quan hệ với Appointments
    Services.hasMany(models.Appointments, {
      foreignKey: "service_id",
      as: "appointments",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  };

  return Services;
};
