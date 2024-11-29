"use strict";

module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      cart_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      item_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      item_type: {
        type: DataTypes.ENUM("pet", "product"),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
    },
    {
      tableName: "CartItems",
      timestamps: true,
    }
  );

  CartItem.associate = function (models) {
    // Liên kết với bảng Carts
    CartItem.belongsTo(models.Carts, {
      foreignKey: "cart_id",
      as: "cart",
    });

    // Liên kết với bảng Products và Pets dựa trên item_type
    CartItem.belongsTo(models.Products, {
      foreignKey: "item_id",
      constraints: false,
      as: "product_item",
    });

    CartItem.belongsTo(models.Pets, {
      foreignKey: "item_id",
      constraints: false,
      as: "pet_item",
    });
  };

  return CartItem;
};
