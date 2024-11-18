// models/User.js
"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM("customer", "manager"),
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING(255),
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
      tableName: "User",
      timestamps: true,
    }
  );

  User.associate = function (models) {
    // Định nghĩa mối quan hệ với bảng Service_Review
    User.hasMany(models.Service_Review, {
      foreignKey: "user_id",
      as: "service_reviews", // Đặt alias cho quan hệ
    });

    User.hasMany(models.Product_Review, {
      foreignKey: "user_id",
      as: "reviews",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    // Mối quan hệ giữa User và Order
    User.hasMany(models.Order, {
      foreignKey: "user_id",
      as: "orders",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    // Mối quan hệ giữa User và UserPet
    User.hasMany(models.UserPet, {
      foreignKey: "user_id",
      as: "pets", // Tên cho mối quan hệ này
      onDelete: "SET NULL", // Khi user bị xóa, user_id trong user_pet sẽ được đặt thành NULL
      onUpdate: "CASCADE", // Khi user được cập nhật, các user_pet liên quan sẽ được cập nhật theo
    });
  };

  return User;
};
