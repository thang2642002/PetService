"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "Products",
    {
      product_id: {
        type: DataTypes.UUID, // Chuyển thành UUID
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4, // Tự động sinh UUID
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      images: {
        type: DataTypes.JSON, // Dùng JSON để lưu danh sách URL ảnh
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
      tableName: "Products", // Tên bảng trong DB
      timestamps: true,
    }
  );

  Products.associate = function (models) {
    Products.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Products.hasMany(models.Product_Review, {
      foreignKey: "product_id",
      as: "reviews",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Products.hasMany(models.OrderItem, {
      foreignKey: "item_id",
      constraints: false,
      as: "orderItems",
    });

    Products.hasMany(models.CartItem, {
      foreignKey: "item_id",
      constraints: false,
      as: "product",
    });

    Products.hasMany(models.Product_Image, {
      foreignKey: "product_id",
      as: "product_images",
    });
  };

  return Products;
};
