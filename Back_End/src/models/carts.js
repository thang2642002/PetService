// models/Carts.js
"use strict";
module.exports = (sequelize, DataTypes) => {
  const Carts = sequelize.define(
    "Carts",
    {
      cart_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_amount: {
        type: DataTypes.FLOAT,
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
      tableName: "Carts",
      timestamps: true,
    }
  );

  Carts.associate = function (models) {
    Carts.belongsTo(models.User, {
      foreignKey: {
        name: "user_id",  
        allowNull: false,
      },
      as: "user",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Carts.hasMany(models.CartItem, {
      foreignKey: "cart_id",
      as: "cartItems", // Alias cho mối quan hệ này
    });

    Carts.hasOne(models.Order, {
      foreignKey: "cart_id",
      as: "order", // Alias cho mối quan hệ này
    });
  };

  return Carts;
};
