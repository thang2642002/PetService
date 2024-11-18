// models/Product_Review.js
"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product_Review = sequelize.define(
    "Product_Review",
    {
      product_review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
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
      tableName: "Product_Review",
      timestamps: true,
    }
  );

  Product_Review.associate = function (models) {
    // Mối quan hệ với User
    Product_Review.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // Mối quan hệ với Products
    Product_Review.belongsTo(models.Products, {
      foreignKey: "product_id",
      as: "product",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Product_Review;
};
