"use strict";
export default (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      total_amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("pending", "completed", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
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
      tableName: "Orders",
      timestamps: true,
    }
  );

  Order.associate = function (models) {
    Order.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    Order.belongsTo(models.Carts, {
      foreignKey: "cart_id",
      as: "cart",
    });

    Order.hasMany(models.OrderItem, {
      foreignKey: "order_id",
      as: "orderItems",
    });

    Order.hasOne(models.Payments, {
      foreignKey: "order_id",
      as: "payments",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Order;
};
