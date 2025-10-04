"use strict";
export default (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
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
      tableName: "Category",
      timestamps: true,
    }
  );

  Category.associate = function (models) {
    // Mối quan hệ giữa Category và Product
    Category.hasMany(models.Products, {
      foreignKey: "category_id",
      as: "products", // Tên cho mối quan hệ này
      onDelete: "SET NULL", // Khi category bị xóa, category_id trong product sẽ được đặt thành NULL
      onUpdate: "CASCADE", // Khi category được cập nhật, các sản phẩm liên quan sẽ được cập nhật theo
    });
  };

  return Category;
};
