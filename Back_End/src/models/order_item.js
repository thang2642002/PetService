"use strict";
export default (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      order_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      item_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: "order_item",
      timestamps: true,
    }
  );

  OrderItem.associate = function (models) {
    OrderItem.belongsTo(models.Products, {
      foreignKey: "item_id",
      as: "product_item",
    });
    OrderItem.belongsTo(models.Order, {
      foreignKey: "order_id",
      as: "order",
    });

    OrderItem.belongsTo(models.Pets, {
      foreignKey: "item_id",
      constraints: false,
      as: "pet_item",
    });
  };

  return OrderItem;
};
